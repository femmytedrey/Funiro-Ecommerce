import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../components/Store/auth.store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("../views/ShopPage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutPage.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/ContactPage.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("../views/auth/LoginPage.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: () => import("../views/auth/SignupPage.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardPage.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("../components/HomeComponents/ProductDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (
    to.matched.some((record) => record.meta.requireAuth) &&
    !authStore.isAuthenticated
  ) {
    next({
      path: "/auth/login",
      query: { redirect: to.fullPath },
    });
  } else {
    if (
      (to.path === "/auth/login" || to.path === "/auth/register") &&
      authStore.isAuthenticated
    ) {
      alert("You are already authorized");
      next("/");
    }
    next();
  }
});

export default router;
