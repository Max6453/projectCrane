<script lang="ts">
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
      const saved = localStorage.getItem('dailyHabits');
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
        localStorage.setItem('dailyHabits', JSON.stringify(this.habitData));
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
      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center text-main p-5 gap-6">
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
            <li v-for="habit in habitList" :key="habit.key" class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                :id="`${day.date}-${habit.key}`"
                v-model="habitData[day.date][habit.key]"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <input 
                :id="`${day.date}-${habit.key}-note`"
                v-model="habitData[day.date].notes[habit.key]"
                @input="saveToLocalStorage"
                class="w-full text-sm font-medium text-main cursor-pointer"
                placeholder="enter data"
              />
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
  </template>
