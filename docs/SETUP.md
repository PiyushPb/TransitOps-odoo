# ⚙️ Developer Setup Guide

This guide walks you through setting up and running the TransitOps application locally.

---

## 📋 Prerequisites

Before you start, make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18.x or higher)
*   [PostgreSQL](https://www.postgresql.org/) (v14.x or higher)
*   [npm](https://www.npmjs.com/) (usually bundled with Node.js)

---

## 🗄️ Database Initialization

TransitOps stores its data in a PostgreSQL database. Follow these steps to initialize it:

1.  **Create a database** in PostgreSQL named `transitops`:
    ```sql
    CREATE DATABASE transitops;
    ```
2.  **Execute the SQL scripts** located in the `db/` directory in sequential order. This sets up the tables, keys, and constraints. You can run them via the `psql` CLI tool or load them in pgAdmin:
    ```bash
    psql -U postgres -d transitops -f db/01_roles.sql
    psql -U postgres -d transitops -f db/02_users.sql
    psql -U postgres -d transitops -f db/03_vehicles.sql
    psql -U postgres -d transitops -f db/04_drivers.sql
    psql -U postgres -d transitops -f db/05_routes.sql
    psql -U postgres -d transitops -f db/06_trips.sql
    psql -U postgres -d transitops -f db/07_maintenance_logs.sql
    psql -U postgres -d transitops -f db/08_fuel_logs.sql
    psql -U postgres -d transitops -f db/09_expenses.sql
    psql -U postgres -d transitops -f db/10_activity_logs.sql
    psql -U postgres -d transitops -f db/11_notifications.sql
    ```

---

## 🖥️ Backend Setup (`server/`)

1.  Navigate into the `server/` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the `server/` directory:
    ```ini
    PORT=8000
    DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/transitops?schema=public"
    NODE_ENV="development"
    JWT_SECRET="your-super-secret-jwt-key"
    ```
    *Replace `postgres:yourpassword` with your actual PostgreSQL username and password.*

4.  **Generate Prisma Client**:
    TransitOps uses Prisma to query the database. Generate the client:
    ```bash
    npx prisma generate
    ```
5.  **Seed Default Users**:
    Populate the database with pre-configured accounts representing each system role:
    ```bash
    # Runs the TypeScript seed script using ts-node
    npx ts-node seedUsers.ts
    ```
    This seeds four default users with password **`password123`**:
    *   **Admin**: `admin@transit.com`
    *   **Fleet Manager**: `manager@transit.com`
    *   **Driver**: `driver@transit.com`
    *   **Financial Analyst**: `analyst@transit.com`

6.  Start the backend development server:
    ```bash
    npm run dev
    ```
    The server should start on [http://localhost:8000](http://localhost:8000) and display `✅ Successfully connected to the database.`.

---

## 💻 Frontend Setup (`client/`)

1.  Navigate to the `client/` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the root of the `client/` directory to configure the API base URL:
    ```ini
    NEXT_PUBLIC_API_URL="http://localhost:8000/api"
    ```
4.  Start the Next.js development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser. You can log in using any of the seeded credentials (e.g., `admin@transit.com` / `password123`).

---

## 🧪 API Verification & Testing

TransitOps includes a pre-configured API collection under the root folder:
*   📁 **`bruno/`**: Contains a collection of request files you can import directly into [Bruno](https://www.usebruno.com/) (an open-source API client).
*   Use this collection to test authentication flows, vehicle management, dispatch workflows, maintenance logs, and financial calculations.
