import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('../views/CalculatorView.vue')
  },
  {
    path: '/explanation',
    name: 'explanation',
    component: () => import('../views/ExplanationView.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/ResultView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/eight'),
  routes
})

export default router
