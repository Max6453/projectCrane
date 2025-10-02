<script lang="ts">

export default {
  data() {
  return {
   user: {
        name: "Test Subject",
        email: "max@example.com"
      },
    isModalOpen: false,
    isNavbarOpen: false,
  }
},

  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    toggleNav() {
      this.isNavbarOpen = !this.isNavbarOpen
    },
    }
  }
</script>

<template>
 <div class="relative" id="top">
  <header class="bg-foreground to-green-700 bg-linear-240 shadow-2xl shadow-background h-20 fixed z-50 w-full">
    <div>
      <router-link to="/"><h1 class="text-5xl max-sm:pt-5 text-center hover:text-green-400" aria-label="return to main page">ProjectCrane</h1></router-link>
    </div>
    <nav class="h-20">
      <!--
      MOBILE VIEW
      -->
      <button
      @click="toggleNav"
      :class="isNavbarOpen ? 'btn-close' : 'btn-open'"
      class="navbar md:block lg:hidden relative p-5 max-sm:p-0 max-sm:pl-5 bottom-10 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 hover:shadow-2xl shadow-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
         <div v-if="isNavbarOpen" class="navbar bg-foreground to-green-700 bg-linear-300 pt-1 top-20 h-screen w-1/2 rounded-r-3xl absolute">
          <button
          @click="toggleNav">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
            <ul class="flex-col flex-auto gap-y-10 text-center justify-center pr-15 relative text-2xl">
              <router-link to="/to-do" class="hover:text-green-300 bg-hover m-5">
                <li>To-Do app</li>
              </router-link>
              <router-link to="/Habits" class="hover:text-green-300 bg-hover m-5">
                <li>Habits tracker</li>
              </router-link>
              <router-link to="/money-tracker" class="hover:text-green-300 bg-hover m-5">
                <li>Money tracker</li>
              </router-link>
              <router-link to="/Notes" class="hover:text-green-300 bg-hover">
                <li>Notes</li>
              </router-link>
            <router-link to="/healthcare-tracker" class="hover:text-green-300 bg-hover m-5">
              <li>HealthCare tracker</li>
            </router-link>
            </ul>
         </div>
        <!--
        DESKTOP VIEW
        -->
        <ul class="lg:flex gap-10 text-center justify-center pr-15 relative text-2xl sm:hidden max-sm:hidden">
          <router-link to="/to-do" class="hover:text-green-300 bg-hover">
            <li>To-Do app</li>
          </router-link>
          <router-link to="/Habits" class="hover:text-green-300 bg-hover">
            <li>Habits tracker</li>
          </router-link>
          <router-link to="/money-tracker" class="hover:text-green-300 bg-hover">
            <li>Money tracker</li>
          </router-link>
          <router-link to="/Notes" class="hover:text-green-300 bg-hover">
            <li>Notes</li>
          </router-link>
        <router-link to="/healthcare-tracker" class="hover:text-green-300 bg-hover">
          <li>HealthCare tracker</li>
        </router-link>
        </ul>
      <div>
        <div
          @click="toggleModal"
          aria-label="toogle modal"
          :class="isModalOpen ? 'btn-close' : 'btn-open'"
        class="bg-black size-10 absolute bottom-3 active:border-white hover:border border-white right-15 rounded-full">
        </div>
        <div v-if="isModalOpen" class="modal bg-foreground to-green-700 bg-linear-300 right-0 pt-1 top-20 h-50 w-40 rounded-l-3xl absolute">
          <span class="text-center">
            <h3>Welcome back:</h3>
            <h3 class="text-white">{{ user.name }} </h3>
          </span>
          <ul class="border-t-1 flex flex-col gap-y-3 pt-4 text-center text-xl border-gray-500">
            <li class="hover:underline"><a href="/Account">Your Account</a></li>
            <li class="hover:underline"><a href="">buy premium</a></li>
            <li class="hover:underline"><a href="">Support</a></li>
            <li class="hover:underline"><a href=""></a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
    
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <footer class="top-20 relative">
    <!-- your footer -->
  </footer>
 </div> 
</template>
