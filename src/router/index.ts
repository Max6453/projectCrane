import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Views/Home.vue'
import Todo from '@/Views/Todo.vue'
import Habits from '@/Views/Habits.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/to-do',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/Habits',
    name: 'Habits',
    component: Habits
  },
  ],
})

export default router
