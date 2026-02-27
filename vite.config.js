import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ntstyle-api.onrender.com', // ჩაწერე აქ შენი ზუსტი ბექენდის ლინკი
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', // <-- აქ უნდა ეწეროს შენი ბექენდის პორტი
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })