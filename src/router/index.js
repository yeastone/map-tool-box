import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views'),
    redirect: {
      name: 'mapBoxTool'
    },
    children: [
      {
        path: 'mapBoxTool',
        name: 'mapBoxTool',
        component: () => import('@/views/mapBox/index')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
