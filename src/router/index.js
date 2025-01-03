import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../components/Store/auth.store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomePage.vue"),
    meta: {title: 'Home'}
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("../views/ShopPage.vue"),
    meta: {title: 'Shop'}
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutPage.vue"),
    meta: {title: 'About'}
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/ContactPage.vue"),
    meta: {title: 'Contact'}
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminPage.vue"),
    meta: {
      requireAuth: true,
      requireAdmin: true,
      title: 'Admin'
    }
  },
  {
    path: "/admin/demo",
    name: "AdminDemo",
    component: () => import("../views/../components/Admin/AdminDemo.vue"),
    meta: {
      requireAuth: true,
      requireAdmin: true,
      title: 'Admin Demo'
    },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("../views/auth/LoginPage.vue"),
    meta: {
      requireAuth: false,
      title: 'Login'
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
    path: "/auth/forgot-password",
    name: "ResetEmail",
    component: () => import("../views/auth/sendPasswordReset.vue"),
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
      title: 'Dashboard'
    },
  },
  {
    path: "/dashboard/demo",
    name: "DashboardDemo",
    component: () => import("../utils/DashboardDemo.vue"),
    meta: {
      requireAuth: true,
      title: 'Dashboard Demo'
    },
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("../components/HomeComponents/ProductDetail.vue"),
    meta: {
      title: 'Product Detail'
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/CartPage.vue"),
    meta: {
      requireAuth: true,
      title: 'Cart'
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/CheckoutPage.vue"),
    meta: {
      requireAuth: true,
      title: 'Checkout'
    },
  },
  {
    path: "/checkout/success",
    name: "Success",
    component: () => import("../views/PaymentResponse/SuccessPage.vue"),
    meta: {
      requireAuth: true,
      title: 'Success'
    },
  },
  {
    path: "/checkout/cancel",
    name: "Fail",
    component: () => import("../views/PaymentResponse/FailedPage.vue"),
    meta: {
      requireAuth: true,
      title: 'Fail'
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders/OrdersPage.vue"),
    meta: {
      requireAuth: true,
      title: 'Orders'
    }
  },
  {
    path: "/orders/:id",
    name: "OrderDetails",
    component: () => import("../views/Orders/OrderDetails.vue"),
    meta: {
      requireAuth: true,
      title: 'Order Details'
    }
  },
  {
    path: "/search-results",
    name: "SearchResults",
    component: () => import("../views/SearchResults.vue"),
    
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requireAdmin)) {
    if(!authStore.isAuthenticated){
      alert("Authentication is required")
      next('/auth/login')
      return;
    }
    if (!authStore.user?.isAdmin) {
      alert("You are not authorized to access this page");
      next('/')
      return;
    }
  }

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
