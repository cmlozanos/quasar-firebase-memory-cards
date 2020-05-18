
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/game', component: () => import('pages/Game.vue') },
      { path: '/cards', component: () => import('pages/Cards.vue') },
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
