# 🧾 StorePoint POS System

StorePoint is a modular, scalable Point-of-Sale (POS) system built with **Fastify**, **TypeScript**, **MongoDB**, **Zod**, and **JWT**. It includes full role-based access control, audit logging, structured validation, and clean architecture by design.

---

## ⚙️ Tech Stack

- **Backend Framework:** Fastify + TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (with Role & Permission control)
- **Validation:** Zod
- **Middleware:** Custom & reusable (auth, audit, permission)
- **Testing:** (Optional: Vitest, Jest, Supertest)

---

## 📁 Folder Structure

```bash
src/
├── controllers/       # Route handlers (no business logic)
├── services/          # Business logic and DB queries
├── models/            # Mongoose models
├── schemas/           # Zod validation schemas
├── types/             # TypeScript types inferred from schemas
├── interfaces/        # Explicit interfaces for complex structures
├── middlewares/       # Auth, permission, audit logger, etc
├── constants/         # Enums and static config
├── utils/             # Shared utilities (e.g. error, assert, password)
├── routes/            # Fastify route definitions
```

---

## ✅ Features

- 🔐 JWT authentication with role validation (`admin`, `cashier`, `manager`, etc.)
- 🧰 Fully modular middlewares (auth, role-check, operation-check)
- 📦 Entity modules: `products`, `categories`, `sales`, `payments`, `suppliers`, `purchases`, `RMA`
- 📊 Reports module: Sales, Low-stock, Payments grouped
- 📜 Audit log middleware: Tracks all user actions on protected endpoints
- 🧪 Zod validation schemas for every payload
- 🌍 Strict and consistent TypeScript typing

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/your-user/storepoint-pos.git
cd storepoint-pos
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup environment

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI, JWT secret, etc.

### 4. Run the development server

```bash
npm run dev
```

Server runs on: [http://localhost:3000](http://localhost:3000)

---

## 📬 API Documentation

You can import the full Postman collection:

📥 [Download Postman Collection](./storepoint-pos-full-collection.json)

- Uses `{{base_url}}` and `{{token}}` variables
- Includes full body examples for every endpoint

---

## 👮 Roles & Permissions

| Role      | Permissions                            |
|-----------|----------------------------------------|
| `admin`   | Full access to all modules             |
| `manager` | Limited access (no delete ops)         |
| `cashier` | Sales & Payments only                  |
| `stockist`| Categories, Products, Purchases only   |

---

## 🧩 Example Audit Log Entry

```json
{
  "endpoint": "/create_sale",
  "method": "POST",
  "userId": "64fb...",
  "userName": "John Smith",
  "createdAt": "2025-07-16T10:30:00Z",
  "payload": { ... }
}
```

---

## 📜 License

MIT License © 2025

---

## 🧠 Contributing

Pull requests are welcome. Please adhere to the architecture and standards:

- Always use `Zod` for validation
- Use `services` for logic, `controllers` for handlers
- Keep strict typing: `const name: string = "John";`
- Use `brieff`-style JSDoc comments on all functions
