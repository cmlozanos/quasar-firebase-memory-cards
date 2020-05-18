
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/game', component: () => import('pages/Game.vue') },
      { path: '/cards', component: () => import('pages/Cards.vue') },
      { path: '/cards-admin', component: () => import('pages/CardsAdmin.vue') },
      { path: '/gameplays', component: () => import('pages/GamePlays.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
