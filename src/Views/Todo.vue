
<script lang="ts">
interface HabitData {
  [date: string]: {
    gym: boolean;
    morningRoutine: boolean;
    read: boolean;
    meditate: boolean;
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
  name: 'Home',
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
      const generatedDays: Day[] = [];
      
      // Generate 6 days (5 past days, today, 3 future days)
      for (let i = -3; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        const displayDate = this.formatDisplayDate(date);
        
        generatedDays.push({
          date: dateString,
          displayDate: displayDate
        });
        
        // Initialize habit data for this day if it doesn't exist
        if (!this.habitData[dateString]) {
          this.habitData[dateString] = {
            gym: false,
            morningRoutine: false,
            read: false,
            meditate: false
          };
        }
      }
      
      this.days = generatedDays;
    },

    formatDisplayDate(date: Date): string {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      const dateString = date.toDateString();
      const todayString = today.toDateString();
      const yesterdayString = yesterday.toDateString();
      const tomorrowString = tomorrow.toDateString();
      
      if (dateString === todayString) {
        return 'Today';
      } else if (dateString === yesterdayString) {
        return 'Yesterday';
      } else if (dateString === tomorrowString) {
        return 'Tomorrow';
      } else {
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      }
    },

    loadFromLocalStorage(): void {
      const saved = localStorage.getItem('dailyHabits');
      if (saved) {
        try {
          const parsedData: HabitData = JSON.parse(saved);
          // Merge saved data with current habitData
          Object.keys(parsedData).forEach(date => {
            if (this.habitData[date]) {
              this.habitData[date] = { ...this.habitData[date], ...parsedData[date] };
            } else {
              this.habitData[date] = parsedData[date];
            }
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
    <div>
        <router-view></router-view>

        <aside class="w-full border-2 border-gray-500 h-dvh rounded-3xl top-25 relative">
          <h3 class="text-3xl text-main text-center border-b-2 border-main">Habits Tracker</h3>
          <div class="grid grid-cols-3 text-main p-5 gap-4">
            
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
                  <label 
                    :for="`${day.date}-${habit.key}`" 
                    class="text-sm font-medium text-main cursor-pointer"
                  >
                    {{ habit.label }}
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </aside>
    </div>
</template>