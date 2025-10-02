<script lang="ts">
interface MoneyData {
  [year: string]: {
    [month: string]: {
      income: number;
      expenses: number;
    }
  }
}

interface MonthInfo {
  monthName: string;
  year: string;
  key: string;
}

export default {
  name: 'MoneyTracker',
  data() {
    return {
      categories: [
        { key: 'income', label: 'Income' },
        { key: 'expenses', label: 'Expenses' }
      ],
      moneyData: {} as MoneyData,
      months: [] as MonthInfo[]
    }
  },
  created() {
    this.generateMonths(); // Generate months first
    this.loadFromLocalStorage(); // Then load saved data
  },
  watch: {
    moneyData: {
      deep: true,
      handler() {
        this.saveToLocalStorage();
      }
    }
  },
  methods: {
    generateMonths(): void {
      const today = new Date();
      const currentYear = today.getFullYear();
      const months = [];

      // Generate months starting from January (0) to December (11)
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear().toString();
        const key = `${year}-${String(i + 1).padStart(2, '0')}`; // Fix month key format

        months.push({ monthName, year, key });

        // Initialize data structure if it doesn't exist
        if (!this.moneyData[year]) {
          this.moneyData[year] = {};
        }
        if (!this.moneyData[year][key]) {
          this.moneyData[year][key] = {
            income: 0,
            expenses: 0
          };
        }
      }

      this.months = months;
    },

    loadFromLocalStorage(): void {
      const saved = localStorage.getItem('monthlyMoney');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.moneyData = parsed || {};
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    },

    saveToLocalStorage(): void {
      try {
        localStorage.setItem('monthlyMoney', JSON.stringify(this.moneyData));
      } catch (error) {
        console.error('Error saving money data to localStorage:', error);
      }
    },

    updateValue(year: string, key: string, category: string, event: Event): void {
      const input = (event.target as HTMLTextAreaElement).value;
      const numValue = input === '' ? 0 : parseFloat(input);
      if (!isNaN(numValue)) {
        this.moneyData[year][key][category] = numValue;
      }
    },

    clearAllData(): void {
      if (confirm('Are you sure you want to clear all money data?')) {
        this.moneyData = {};
        this.generateMonths();
        localStorage.removeItem('monthlyMoney');
        this.saveToLocalStorage();
      }
    }
  },
  
  computed: {
    // Add computed property for total calculations
    totals(): { income: number; expenses: number; difference: number } {
      return this.months.reduce((acc, month) => {
        const monthData = this.moneyData[month.year][month.key];
        return {
          income: acc.income + (monthData.income || 0),
          expenses: acc.expenses + (monthData.expenses || 0),
          difference: acc.difference + ((monthData.income || 0) - (monthData.expenses || 0))
        };
      }, { income: 0, expenses: 0, difference: 0 });
    }
  }
}
</script>

<template>
  <section class="top-30 relative p-5 ubuntu-regular">
    <section>
      <div class="grid gap-15">
        <aside class="border-2 border-gray-500 h-auto rounded-3xl">
          <h1 class="text-3xl pb-5 pt-5 text-main text-center border-b-2 border-main">Money Tracker</h1>
          <button 
            @click="clearAllData" 
            class="bg-red-500 hover:bg-red-600 duration-300 rounded-4xl w-30 h-10 m-4 text-white font-medium"
          >
            Clear all
          </button>
          <div class="p-5 pt-5">
            <!-- Add totals display -->
            <div class="mb-5 p-4 border border-main rounded">
              <h2 class="text-xl text-main mb-3">Yearly Totals</h2>
              <div class="grid grid-cols-3 gap-4 text-white">
                <div>Income: {{ totals.income }}</div>
                <div>Expenses: {{ totals.expenses }}</div>
                <div :class="{
                  'text-green-500': totals.difference > 0,
                  'text-red-500': totals.difference < 0,
                  'text-gray-400': totals.difference === 0
                }">
                  Balance: {{ totals.difference }}
                </div>
              </div>
            </div>
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-5">
              <div v-for="month in months" 
                   :key="month.key" 
                   class="border rounded p-4 border-main">
                <div class="text-xl font-semibold mb-3 text-main">
                  {{ month.monthName }} {{ month.year }}
                </div>

                <div class="space-y-3">
                  <!-- Income and Expenses inputs -->
                  <div v-for="category in categories" 
                       :key="`${month.key}-${category.key}`" 
                       class="flex flex-col">
                    <label :for="`${month.key}-${category.key}`" class="text-white mb-1">
                      {{ category.label }}
                    </label>
                    <textarea 
                      :id="`${month.key}-${category.key}`"
                      :value="moneyData[month.year][month.key][category.key]"
                      @input="updateValue(month.year, month.key, category.key, $event)"
                      class="bg-gray-700 text-white rounded p-2 h-20 resize-none"
                      :placeholder="`Enter ${category.label.toLowerCase()} for ${month.monthName}`"
                    ></textarea>
                  </div>

                  <!-- Difference calculation -->
                  <div class="mt-4 pt-4 border-t border-gray-600">
                    <div class="flex justify-between text-white">
                      <span>Difference:</span>
                      <span :class="{
                        'text-green-500': moneyData[month.year][month.key].income - moneyData[month.year][month.key].expenses > 0,
                        'text-red-500': moneyData[month.year][month.key].income - moneyData[month.year][month.key].expenses < 0,
                        'text-gray-400': moneyData[month.year][month.key].income - moneyData[month.year][month.key].expenses === 0
                      }">
                        {{ moneyData[month.year][month.key].income - moneyData[month.year][month.key].expenses }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
    
    <footer>
    <div class="top-30 relative">
      <a href="#top">
      <svg width="80" height="80" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)" class="right-10 absolute">
      <path d="M12.5304 10.9697C12.3897 10.829 12.1989 10.75 12 10.75C11.8011 10.75 11.6103 10.829 11.4697 10.9697L5.21969 17.2197C5.00519 17.4342 4.94103 17.7568 5.05711 18.037C5.1732 18.3173 5.44668 18.5 5.75002 18.5H18.25C18.5534 18.5 18.8268 18.3173 18.9429 18.037C19.059 17.7568 18.9949 17.4342 18.7804 17.2197L12.5304 10.9697Z" fill="#343C54"/>
      <path opacity="0.4" d="M18.7803 12.7197L12.5303 6.46967C12.2374 6.17678 11.7626 6.17678 11.4697 6.46967L5.21967 12.7197C4.92678 13.0126 4.92678 13.4874 5.21967 13.7803C5.51256 14.0732 5.98744 14.0732 6.28033 13.7803L12 8.06066L17.7197 13.7803C18.0126 14.0732 18.4874 14.0732 18.7803 13.7803C19.0732 13.4874 19.0732 13.0126 18.7803 12.7197Z" fill="#343C54"/>
      </svg>
      </a>
    </div>
    <span class="relative top-40">
      <p class="text-center text-md text-white">Designed and developed by <a href="https://maximharvancik.vercel.app">Maxim Harvančík</a></p>
    </span>
  </footer>
  </section>
</template>