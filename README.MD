<div align="center">
  <h1>Cotiza Seguro Fácil</h1>
  <p><strong>Una plataforma Full-Stack para la gestión de cotizaciones de seguros de vehículos.</strong></p>
  <p>Backend con NestJS, Frontend con Angular y base de datos PostgreSQL.</p>
  <a href="https://cotiza-seguro-facil-frontend.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Visitar_App-Online-brightgreen?style=for-the-badge&logo=render" alt="Live App">
  </a>
</div>

<br>

<div align="center">


</div>

## 🎯 Objetivo del Proyecto

**Cotiza Seguro Fácil** es una aplicación web full-stack diseñada para optimizar el proceso de cotización de seguros para vehículos. La plataforma permite a los usuarios registrar sus datos y los de su vehículo de forma rápida y sencilla. Posteriormente, un asesor comercial utiliza un **dashboard de administración interno** para acceder a esta información, contactar al cliente y ofrecerle la mejor cotización posible, centralizando así la gestión de leads y la cartera de clientes.

Este proyecto fue desarrollado como una solución completa y escalable, demostrando habilidades en arquitectura de software, desarrollo backend y frontend, y despliegue en la nube.

---

## ✨ Características Principales

### Para el Usuario:
- **Formulario Inteligente:** Un proceso de un solo paso para registrar datos del cliente y su vehículo.
- **Validación en Tiempo Real:** Feedback instantáneo para asegurar que los datos ingresados sean correctos.
- **Notificaciones por Email:** Confirmación automática al cliente y notificación al administrador tras una nueva solicitud.

### Para el Administrador:
- **Dashboard Centralizado:** Un panel de control seguro para visualizar y gestionar todos los leads (clientes potenciales).
- **Autenticación Segura:** Sistema de login basado en **JWT (JSON Web Tokens)** para proteger el acceso al dashboard.
- **Búsqueda y Filtrado Avanzado:** Permite buscar clientes por nombre, DNI o filtrar por marca de vehículo y rango de fechas.
- **Paginación Eficiente:** Manejo optimizado de grandes volúmenes de datos para una carga rápida y fluida.

---

## 🛠️ Stack Tecnológico y Arquitectura

Este proyecto está construido sobre un stack moderno y robusto, ideal para aplicaciones escalables y de alto rendimiento.

| Área | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Backend** | ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) | Framework progresivo de Node.js para construir aplicaciones de servidor eficientes y escalables. |
| **Frontend** | ![Angular](https://img.shields.io/badge/-Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) | Plataforma de desarrollo para construir aplicaciones web de una sola página (SPA). |
| **Base de Datos** | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) | Sistema de gestión de bases de datos relacional de objetos, potente y de código abierto. |
| **ORM** | ![TypeORM](https://img.shields.io/badge/-TypeORM-F26B21?style=for-the-badge) | ORM que puede ejecutarse en plataformas NodeJS y es compatible con TypeScript. |
| **Estilos (UI)** | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Framework de CSS "utility-first" para un diseño rápido y personalizado. |
| **Despliegue** | ![Render](https://img.shields.io/badge/-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) & ![Neon](https://img.shields.io/badge/-Neon-00E599?style=for-the-badge&logo=neon&logoColor=black) | **Backend y Frontend** desplegados como servicios en Render. **Base de datos PostgreSQL** gestionada en Neon. |

<br>

###  Architectural Highlights

*   **Arquitectura Monorepo:** El código del backend y del frontend se gestionan en un único repositorio para una mayor cohesión y facilidad de mantenimiento.
*   **API RESTful:** El backend expone una API REST bien definida y documentada siguiendo las mejores prácticas.
*   **Manejo de Transacciones:** El proceso de creación de leads (`createLead`) se encapsula en una **transacción de base de datos** (`DataSource.createQueryRunner`) para garantizar la integridad de los datos. Si la creación del vehículo o del cliente falla, toda la operación se revierte (`rollback`), evitando registros inconsistentes.
*   **Seguridad:**
    *   **Hashing de contraseñas con `bcrypt`** en el backend (`@BeforeInsert` en la entidad `Admin`).
    *   **Estrategia de Passport-JWT** para proteger las rutas del administrador. Los tokens se firman con secretos almacenados de forma segura como variables de entorno.
*   **Validación de Datos (DTOs):** Se utiliza `class-validator` y `class-transformer` en el backend para validar rigurosamente todos los datos entrantes (DTOs), asegurando que solo la información correcta llegue a la lógica de negocio.
*   **Optimización de Consultas:** En el dashboard, la paginación se implementa con una estrategia de dos pasos para máxima eficiencia:
    1.  Una primera consulta ligera obtiene el conteo total y los `IDs` de la página actual.
    2.  Una segunda consulta recupera los datos completos (`JOINs`) solo para esos `IDs`, evitando traer datos innecesarios y mejorando drásticamente el rendimiento.

---

## 🚀 Despliegue y CI/CD

La aplicación está completamente desplegada en la nube utilizando una arquitectura serverless y de servicios gestionados:

-   **Backend (NestJS):** Desplegado como un **Web Service** en Render, conectado directamente al repositorio de GitHub para despliegue continuo (CI/CD).
-   **Frontend (Angular):** Desplegado como un **Static Site** en Render, optimizado para una entrega global rápida.
-   **Base de Datos (PostgreSQL):** Alojada en **Neon**, una plataforma de PostgreSQL serverless que ofrece escalabilidad, branching y auto-scaling. La conexión entre Render y Neon está asegurada mediante SSL.
-   **Variables de Entorno:** Todas las credenciales sensibles (claves de API, secretos de JWT, credenciales de DB) se gestionan a través del sistema de variables de entorno de Render, nunca se exponen en el código fuente.

---

## ⚙️ Cómo Ejecutar el Proyecto Localmente

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Angular CLI
- Una instancia local de PostgreSQL corriendo

### Pasos

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/DiegoLalanda/cotiza-seguro-facil
    cd cotiza-seguro-facil
    ```

2.  **Configura el Backend:**
    ```bash
    cd backend
    npm install
    ```
    A continuación, crea un archivo `.env` en la carpeta `backend/`. Puedes copiar la siguiente plantilla y rellenarla con tus datos.

    <details>
    <summary>📄 <strong>Click para ver la plantilla <code>.env.example</code></strong></summary>

    ```dotenv
    # Entorno de la aplicación (development, production, etc.)
    NODE_ENV=development

    # --- Configuración de la Base de Datos PostgreSQL (Local) ---
    # Asegúrate de que estos valores coincidan con tu configuración de PostgreSQL
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres_user
    DB_PASSWORD=mysecretpassword
    DB_DATABASE=cotiza_seguro_db

    # --- Credenciales para el seeding del primer Administrador (solo en desarrollo) ---
    # Este usuario se creará automáticamente la primera vez que inicies el servidor
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=strongAdminPassword123!
    ADMIN_EMAIL=admin@example.com

    # --- Configuración de JSON Web Token (JWT) ---
    # Genera una cadena aleatoria y larga para JWT_SECRET
    JWT_SECRET=esto-es-un-secreto-muy-largo-y-dificil-de-adivinar
    JWT_EXPIRES_IN=1h

    # --- Configuración del Servicio de Email (Nodemailer) ---
    # Email del administrador que recibirá las notificaciones de nuevos leads
    ADMIN_NOTIFICATION_EMAIL=admin-notifications@example.com

    # Credenciales de un servicio SMTP (ej. Gmail, SendGrid, Mailtrap)
    # NOTA: Si usas Gmail, puede que necesites una "Contraseña de Aplicación"
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=465
    EMAIL_USER=tu-email@gmail.com
    EMAIL_PASS=tu-contraseña-de-aplicacion
    EMAIL_FROM="Cotiza Seguro Fácil <tu-email@gmail.com>"
    ```
    </details>
    <br>

    Una vez que tu archivo `.env` esté configurado, puedes iniciar el servidor de desarrollo:
    ```bash
    # Ejecuta el servidor de desarrollo
    npm run start:dev
    ```
    El backend se ejecutará en `http://localhost:3000` (o el puerto que hayas configurado).


3.  **Configura el Frontend:**
    ```bash
    cd ../frontend # Desde la raíz del proyecto
    npm install
    
    # Asegúrate de que la URL de la API en `src/environments/environment.ts`
    # apunta a tu backend local (por defecto: 'http://localhost:3000')
    
    # Ejecuta la aplicación de Angular
    ng serve -o
    ```
La aplicación web estará disponible en `http://localhost:4200`.

---
<div align="center">
  <p>Desarrollado con ❤️ por Diego Javier Lalanda</p>
  <p>
    <a href="https://www.linkedin.com/in/diego-lalanda-9576b21b8/" target="_blank">LinkedIn</a> | 
    <a href="https://github.com/DiegoLalanda" target="_blank">GitHub</a>
  </p>
</div>