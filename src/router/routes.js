const routes = [
  {
    path: "/",
    component: () => import("layouts/DefaultLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/RegisterPage.vue") }],
  },
  {
    path: "/login/:provider/callback",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthCallbackPage.vue") },
    ],
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
