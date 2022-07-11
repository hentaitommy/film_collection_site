export default {
  npmClient: "pnpm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
  routes: [
    {
      exact: true, path: '/', component: 'index',
      wrappers: [
        '@/wrappers/auth',
      ],
    },
    { exact: true, path: '/login', component: 'login' },
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/management/' : '/',
};
