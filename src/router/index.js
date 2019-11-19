import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/questionnaire',
    name: 'questionnaire',
    component: () => import(/* webpackChunkName: "Questionaire" */ '../views/Survey.vue')
  },
  {
    path: '/score',
    name: 'score',
    props: true,
    component: () => import(/* webpackChunkName: "Score" */ '../views/Score.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
