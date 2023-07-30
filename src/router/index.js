import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FlightView from '@/views/FlightView.vue'
import SearchView from '@/views/SearchView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'About'
    },
    component: AboutView
  },
  {
    path: '/flight/:id',
    name: 'flight',
    meta: {
      title: 'Flight'
    },
    params: true,
    component: FlightView
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: 'Serach'
    },
    component: SearchView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title)
      document.title = `${to.meta.title}  :: AirSerbia`;
  next();
})

export default router
