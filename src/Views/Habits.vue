
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
  isCurrentMonth: boolean;
}

interface Habit {
  key: keyof HabitData[string];
  label: string;
}

interface CalendarWeek {
  days: Day[];
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
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const lastDay = lastDayOfMonth.getDate(); // Get the last day of the month (30 or 31)
      
      const generatedDays: Day[] = [];
      
      // Add only the days of current month (1 to 30/31)
      for (let day = 1; day <= lastDay; day++) {
        const date = new Date(today.getFullYear(), today.getMonth(), day);
        const dateString = date.toISOString().split('T')[0];
        const displayDate = day === today.getDate() ? 'Today' : day.toString();
        
        generatedDays.push({
          date: dateString,
          displayDate: displayDate,
          isCurrentMonth: true
        });
        
        // Initialize habit data
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
   <section class="top-30 relative p-5">
    <section>
      <div class="grid gap-15">
        <aside class="border-2 border-gray-500 h-220 rounded-3xl">
          <h1 class="text-3xl  text-main text-center border-b-2 border-main">Habits Tracker</h1>
          <div class="p-5">
            <!-- Calendar Grid -->
            <div class="grid grid-cols-4 gap-5">
              <div v-for="day in days" 
                   :key="day.date" 
                   :class="[
                     'border rounded p-2',
                     'min-h-[120px] relative',
                     'border-main',
                     day.displayDate === 'Today' ? 'bg-green-700 bg-opacity-50' : ''
                   ]">
                <!-- Date Header -->
                <div class="text-sm font-semibold mb-1 text-main">
                  {{ day.displayDate }}
                </div>

                <!-- Habits List -->
                <div class="space-y-1">
                  <div v-for="habit in habitList" 
                       :key="`${day.date}-${habit.key}`" 
                       class="flex items-center space-x-1">
                    <input type="checkbox"
                           :id="`${day.date}-${habit.key}`"
                           v-model="habitData[day.date][habit.key]"
                           class="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"/>
                    <label :for="`${day.date}-${habit.key}`"
                           class="text-xs text-main truncate">
                      {{ habit.label }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        </div>
        </section>
    <footer>
    <div class="top-60 relative">
      <a href="#top">
      <svg width="80" height="80" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)" class="right-10 absolute">
      <path d="M12.5304 10.9697C12.3897 10.829 12.1989 10.75 12 10.75C11.8011 10.75 11.6103 10.829 11.4697 10.9697L5.21969 17.2197C5.00519 17.4342 4.94103 17.7568 5.05711 18.037C5.1732 18.3173 5.44668 18.5 5.75002 18.5H18.25C18.5534 18.5 18.8268 18.3173 18.9429 18.037C19.059 17.7568 18.9949 17.4342 18.7804 17.2197L12.5304 10.9697Z" fill="#343C54"/>
      <path opacity="0.4" d="M18.7803 12.7197L12.5303 6.46967C12.2374 6.17678 11.7626 6.17678 11.4697 6.46967L5.21967 12.7197C4.92678 13.0126 4.92678 13.4874 5.21967 13.7803C5.51256 14.0732 5.98744 14.0732 6.28033 13.7803L12 8.06066L17.7197 13.7803C18.0126 14.0732 18.4874 14.0732 18.7803 13.7803C19.0732 13.4874 19.0732 13.0126 18.7803 12.7197Z" fill="#343C54"/>
      </svg>
      </a>
    </div>
    <span class="relative top-80">
      <p class="text-center text-md text-white">Designed and developed by <a href="https://maximharvancik.vercel.app">Maxim Harvančík</a></p>
    </span>
  </footer>
  </section>
</template>