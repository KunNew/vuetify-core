export default [
  {
    path: "/user-management",
    name: "user-management",
    component: () =>
      import("@/views/system/user-management/UserManagement.vue"),
  },
];
