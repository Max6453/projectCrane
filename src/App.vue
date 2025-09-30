<template>
 <div class="relative" id="top">
      <div>
        <span class="w-20 h-10 bg-gray-120 z-50"></span>
      </div>
  <header class="bg-foreground to-green-700 bg-linear-240 shadow-2xl shadow-background h-20 fixed z-50 w-full">
  <div>
      <router-link to="/"><h1 class="text-5xl text-center hover:text-green-400">ProjectCrane</h1></router-link>
    </div>
    <nav class="h-20">
      <ul class="flex gap-10 text-center justify-center pr-15 relative text-2xl">
        <router-link to="/to-do" class="hover:text-green-300 bg-hover">
          <li>To-Do app</li>
        </router-link>
        <router-link to="/Habits" class="hover:text-green-300 bg-hover">
          <li>Habits tracker</li>
        </router-link>
        <router-link to="/to-do" class="hover:text-green-300 bg-hover">
          <li>Money tracker</li>
        </router-link>
        <router-link to="/to-do" class="hover:text-green-300 bg-hover">
          <li>Notes</li>
        </router-link>
       <router-link to="/to-do" class="hover:text-green-300 bg-hover">
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
        <div v-if="isModalOpen" class="modal bg-foreground to-green-700 bg-linear-300 right-10 pt-1 top-20 h-50 w-40 rounded-3xl absolute">
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

<script lang="ts">

export default {
  data() {
  return {
   user: {
        name: "Test Subject",
        email: "max@example.com"
      },
    isModalOpen: false
  }
},

  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    }
  },
}
</script>