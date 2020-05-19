
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Home', path: '/', component: () => import('pages/PageIndex.vue') },
      { name: 'Game', path: '/game', component: () => import('pages/PageGame.vue') },
      { name: 'Cards', path: '/cards', component: () => import('pages/PageCards.vue') },
      { name: 'CardsAdmin', path: '/cards-admin', component: () => import('pages/PageCardsAdmin.vue') },
      { name: 'Gameplays', path: '/gameplays', component: () => import('pages/PageGamePlays.vue') },
      { name: 'Auth', path: '/auth', component: () => import('pages/PageAuth.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/PageError404.vue')
  })
}

export default routes
