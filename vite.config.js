import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://Sebastiaaann.github.io/Ingresos-y-gastos',
  plugins: [react()],
})

// Vite se centra en configurar un proyecto React y especificar la URL base del proyecto.