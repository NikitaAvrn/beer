import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'BeerRedirect',
    meta: {
      layout: 'user',
    },
    component: () => import('../views/Beer.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'login',
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/b/:code',
    name: 'Beer',
    meta: {
      layout: 'user',
    },
    component: () => import('../views/Beer.vue')
  },
  {
    path: '/hop',
    name: 'Hop',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/Directory/Hop')
  },
  {
    path: '/malt',
    name: 'Malt',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/Directory/Malt')
  },
  {
    path: '/yeast',
    name: 'Yeast',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/Directory/Yeast')
  },
  {
    path: '/other-ingredients',
    name: 'OtherIngredients',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/Directory/OtherIngredients')
  },
  {
    path: '/beer-recipe-list',
    name: 'BeerRecipeList',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/BeerRecipeList')
  },
  {
    path: '/beer-recipe',
    name: 'BeerRecipeNew',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/BeerRecipe')
  },
  {
    path: '/beer-recipe/:id',
    name: 'BeerRecipe',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/BeerRecipe')
  },
  {
    path: '/batch-of-beer-list',
    name: 'BatchOfBeerList',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/BatchOfBeerList')
  },
  {
    path: '/batch-of-beer',
    name: 'BatchOfBeerNew',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/BatchOfBeer')
  },
  {
    path: '/batch-of-beer/:id',
    name: 'BatchOfBeer',
    meta: {
      layout: 'admin',
    },
    component: () => import('../views/BatchOfBeer')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
