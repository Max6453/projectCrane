<script lang="ts">
import Habits from './Habits.vue';

interface HabitData {
  [date: string]: {
    gym: boolean;
    morningRoutine: boolean;
    read: boolean;
    meditate: boolean;
    notes: {
      [habit: string]: string;
    };
  };
}

interface Day {
  date: string;
  displayDate: string;
}

interface Habit {
  key: keyof HabitData[string];
  label: string;
}

export default {
  name: 'Todo',
  data() {
    return {
      checked: false,
      habitList: [
        { key: 'gym', label: 'Gym' },
        { key: 'morningRoutine', label: 'Morning Routine' },
        { key: 'read', label: 'Read a book' },
        { key: 'meditate', label: 'Meditate' }
      ] as Habit[],
      habitData: {} as HabitData,
      days: [] as Day[]
    }
  },
  created() {
    this.generateDays();
    this.loadFromLocalStorage();
  },
  watch: {
    habitData: {
      deep: true,
      handler() {
        this.saveToLocalStorage();
      }
    }
  },
  methods: {
    generateDays(): void {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
      const monday = new Date(today);
      monday.setDate(today.getDate() + diffToMonday);
      const generatedDays: Day[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        const displayDate = this.formatDisplayDate(date);
        generatedDays.push({
          date: dateString,
          displayDate: displayDate
        });
        // Initialize habitData for the day if missing
        if (!this.habitData[dateString]) {
          this.habitData[dateString] = {
            gym: false,
            morningRoutine: false,
            read: false,
            meditate: false,
            notes: {}
          };
        }
        // Ensure notes object exists
        if (!this.habitData[dateString].notes) {
          this.habitData[dateString].notes = {};
        }
        // Ensure every habit has a notes entry
        this.habitList.forEach(habit => {
          if (typeof this.habitData[dateString].notes[habit.key] !== 'string') {
            this.habitData[dateString].notes[habit.key] = '';
          }
        });
      }
      this.days = generatedDays;
    },

    formatDisplayDate(date: Date): string {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    },

    loadFromLocalStorage(): void {
      const saved = localStorage.getItem('ToDoList');
      if (saved) {
        try {
          const parsedData: HabitData = JSON.parse(saved);
          Object.keys(parsedData).forEach(date => {
            if (!parsedData[date].notes) {
              parsedData[date].notes = {};
            }
            // Ensure every habit has a notes entry
            this.habitList.forEach(habit => {
              if (typeof parsedData[date].notes[habit.key] !== 'string') {
                parsedData[date].notes[habit.key] = '';
              }
            });
            this.habitData[date] = parsedData[date];
          });
        } catch (error) {
          console.error('Error loading habit data from localStorage:', error);
        }
      }
    },

    saveToLocalStorage(): void {
      try {
        localStorage.setItem('ToDoList', JSON.stringify(this.habitData));
      } catch (error) {
        console.error('Error saving habit data to localStorage:', error);
      }
    }
  }
}
</script>

<template>
  <div class="items-baseline justify-baseline justify-items-center content-baseline relative ">
    <router-view></router-view>
    <aside
      class="w-2/3 border-2 border-gray-500 h-xl rounded-3xl top-25 relative">
      <h3 class="text-3xl text-main text-center border-b-2 border-main">To-Do list</h3>
      <div class="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 text-center text-main p-5 gap-6">
        <!-- Generate cards for each day -->
        <div 
          v-for="day in days" 
          :key="day.date" 
          class="border-2 border-main rounded-lg p-4 text-main shadow-sm"
        >
          <h4 class="text-lg font-bold text-center mb-3 border-b border-gray-300 pb-2">
            {{ day.displayDate }}
          </h4>
          <ul class="space-y-3">
            <li v-for="habit in habitList" :key="habit.key" class="grid grid-cols-1 items-center space-x-2">
              <label :for="`${day.date}-${habit.key}`" class="flex items-center cursor-pointer">
                <!-- Hidden checkbox for v-model -->
                <input 
                  type="checkbox" 
                  :id="`${day.date}-${habit.key}`"
                  v-model="habitData[day.date][habit.key]"
                  class="sr-only peer"
                />

                <!-- Custom styled checkbox -->
                <span
                  class="w-5 h-5 border-2 border-gray-400 rounded 
                  flex items-center justify-center
                  peer-checked:bg-background peer-checked:border-foreground
                  transition-colors duration-200"
                >
                  <!-- Checkmark -->
                  <svg 
                    v-if="habitData[day.date][habit.key]" 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="w-4 h-4 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                  <span class="ml-2">
                    <input 
                      :id="`${day.date}-${habit.key}-note`"
                      v-model="habitData[day.date].notes[habit.key]"
                      @input="saveToLocalStorage"
                      class="w-50 left-5 relative text-sm font-medium text-center text-main cursor-pointer"
                      placeholder="enter data"
                    />
                    </span>
                    </label>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
  </template>
