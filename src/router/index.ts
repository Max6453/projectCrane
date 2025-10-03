import { createRouter, createWebHistory } from 'vue-router'
import home from '@/Views/Home.vue'
import Todo from '@/Views/Todo.vue'
import Habits from '@/Views/Habits.vue'
import MoneyTracker from '@/Views/MoneyTracker.vue'
import Account from '@/Views/Account.vue'
import NotFound from '@/Views/NotFound.vue'
import Notes from '@/Views/Notes.vue'
import Premium from '@/Views/Premium.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
    path: '/',
    name: 'Home',
    component: home
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
    path: '/Notes',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/money-tracker',
    name: 'MoneyTracker',
    component: MoneyTracker
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account
  },
  {
    path: '/Premium',
    name: 'Premium',
    component: Premium
  },
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
  ],
})

export default router
