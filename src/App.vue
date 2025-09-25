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
        <router-link to="/to-do" class="hover:text-green-300 bg-hover">
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
    </nav>
  </header>
    
  <router-view></router-view>

  <footer class="top-20 relative">
    <!-- your footer -->
  </footer>
 </div> 
</template>

<script lang="ts">
export default {}
  //b
</script>