import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'login.html',
        signup: 'signup.html',
        tour: 'tour.html',
        about: 'about_us.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
