export const navigationSections = [
  {
    title: "Main",
    items: [
      { id: "dashboard", name: "Dashboard", icon: "fas fa-home" },
      { id: "analytics", name: "Analytics", icon: "fas fa-chart-line" },
    ],
  },
  {
    title: "Management",
    items: [
      { id: "users", name: "Users", icon: "fas fa-users" },
      { id: "products", name: "Products", icon: "fas fa-box" },
      { id: "orders", name: "Orders", icon: "fas fa-shopping-cart" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { id: "marketing", name: "Marketing", icon: "fas fa-bullhorn" },
      { id: "promotions", name: "Promotions", icon: "fas fa-percentage" },
    ],
  },
  {
    title: "Configuration",
    items: [{ id: "settings", name: "Settings", icon: "fas fa-cog" }],
  },
];

export const filterProduct = ["All Orders", "Pending", "Completed", "Failed"];
