<script setup lang="ts">
import { ref } from "vue"

// Define allowed states as a type
type State = "idle" | "loading" | "done"

// Reactive variables with explicit type
const freeState = ref<State>("idle")
const premiumState = ref<State>("idle")

function handleFreeClick(): void {
  if (freeState.value === "idle") {
    freeState.value = "loading"
    setTimeout(() => {
      freeState.value = "done"
      // Reset after showing success message
      setTimeout(() => {
        freeState.value = "idle"
      }, 1500)
    }, 2000)
  }
}

function handlePremiumClick(): void {
  if (premiumState.value === "idle") {
    premiumState.value = "loading"
    setTimeout(() => {
      premiumState.value = "done"
      // Reset after showing success message
      setTimeout(() => {
        premiumState.value = "idle"
      }, 1500)
    }, 2000)
  }
}
</script>

<template>
    <div class="relative">
        <!-- Overlay container -->
        <div v-if="freeState !== 'idle' || premiumState !== 'idle'" 
             class="fixed inset-0 flex items-center justify-center z-50">
            <!-- Semi-transparent background -->
            <div class="absolute inset-0 bg-black/50"></div>
            
            <!-- Status messages -->
            <div class="relative text-center text-white text-2xl">
                <div v-if="freeState === 'loading'" class="mb-4">
                    🔄 Activating Free Plan...
                </div>
                <div v-else-if="freeState === 'done'" class="mb-4 flex flex-col">
                    ✅ Free Plan Activated!
                </div>

                <div v-if="premiumState === 'loading'" class="mb-4">
                    🔄 Activating Premium Plan...
                </div>
                <div v-else-if="premiumState === 'done'">
                    ✅ Premium Plan Activated!
                </div>
            </div>
        </div>

        <div class="grid md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-y-10 sm:gap-y-10 w-full top-50 right-10 items-center justify-center justify-items-center relative">
            <div class="bg-foreground rounded-4xl h-100 w-90">
                <div class="text-start relative pl-10 m-3 flex flex-col text-5xl">
                    <span>FREE</span>
                    <span>0€</span>
                </div>
                <ul class="pl-10 m-3 flex flex-col gap-y-5 ">
                    <li class="flex gap-x-30">
                    Habit tracker
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </li>
                    <li class="flex gap-x-37">
                        To-Do list
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </li>
                    <li class="flex gap-x-43.5">Notes
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </li>
                    <li class="flex gap-x-20">
                      HealthCare tracker  
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </li>
                    <li class="flex gap-x-28">
                        Money tracker
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </li>
                </ul>
                <div class="relative">
                    <button
                      v-if="freeState === 'idle'"
                      @click="handleFreeClick"
                      class="w-40 h-15 left-20 bg-linear-210 bg-foreground to-green-700 hover:scale-110 duration-300 hover:shadow-2xl shadow-black relative rounded-3xl"
                    >
                      Activate
                    </button>
                </div>
            </div>

            <div class="bg-foreground rounded-4xl h-100 w-90">
                <div class="text-start relative pl-10 m-3 flex flex-col text-5xl">
                    <span>Premium</span>
                    <span>2€</span>
                </div>
                <ul class="pl-10 m-3 flex flex-col gap-y-5 ">
                    <li class="flex gap-x-30">
                    Habit tracker
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </li>
                    <li class="flex gap-x-37">
                        To-Do list
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </li>
                    <li class="flex gap-x-43.5">Notes
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </li>
                    <li class="flex gap-x-20">
                      HealthCare tracker  
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </li>
                    <li class="flex gap-x-28">
                        Money tracker
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </li>
                </ul>
                <div class="relative">
                    <button
                      v-if="premiumState === 'idle'"
                      @click="handlePremiumClick"
                      class="w-40 h-15 left-20 bg-linear-210 bg-foreground to-green-700 hover:scale-110 duration-300 hover:shadow-2xl shadow-black relative rounded-3xl"
                    >
                      Activate Premium
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>