import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Views/home.vue'
import Todo from '@/Views/Todo.vue'
import Habits from '@/Views/Habits.vue'
import Account from '@/Views/Account.vue'
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
    {
    path: '/Account',
    name: 'Account',
    component: Account
  },
  ],
})

export default router
