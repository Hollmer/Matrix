# Matrix - Aplicación Educativa de Álgebra Lineal

Una aplicación web interactiva para aprender operaciones con matrices de forma visual y paso a paso.

## Descripción

Esta aplicación es un sistema educativo desarrollado para el curso de Álgebra Lineal, que permite a los estudiantes trabajar con matrices de manera intuitiva. Incluye operaciones básicas, eliminación gaussiana, Gauss-Jordan, cálculo de inversa y regla de Cramer, mostrando procedimientos paso a paso.

## Tecnologías Utilizadas

- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura la base de datos PostgreSQL y actualiza `.env.local` con la URL de conexión.
4. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Uso

Accede a [http://localhost:3000](http://localhost:3000) y navega por las diferentes secciones usando la barra de navegación.

## Créditos

Desarrollado por:
- Hollmer Moncada
- Jerenimo Muñoz
- Cristian Villamarin
- Mariana Rivera
