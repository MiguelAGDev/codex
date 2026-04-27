# 📚 Codex | Full-Stack Document Management System

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-00000f?style=for-the-badge&logo=mysql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

**Codex** is a comprehensive full-stack platform designed for managing academic and professional document libraries. The system features a modular architecture and a specialized security engine based on bitwise logic for high-performance access control.

---

## 🚀 Key Features

* **Advanced RBAC (Role-Based Access Control):** Modular access control implemented via bitwise operators for efficient permission validation.
* **Document Management:** Full support for uploading, real-time previewing, and downloading PDF files.
* **Social & Personalization:** Integrated commenting system and "Favorites" section for tailored user experiences.
* **Security:** Stateless authentication using JSON Web Tokens (JWT) and industry-standard password encryption with Bcrypt.

---

## 🔒 Bitwise Permission System

The project utilizes a hexadecimal permission architecture (powers of 2). This allows multiple permissions to be stored and checked within a single integer value without collisions:

| Permission | Hexadecimal | Binary | Action |
| :--- | :--- | :--- | :--- |
| **LOGIN** | `0x001` | `000000001` | Platform access |
| **VIEW_DOCS** | `0x002` | `000000010` | Read documents |
| **UPLOAD** | `0x004` | `000001000` | Upload new files |
| **DOWNLOAD** | `0x008` | `000001000` | Download files |
| **ADMIN** | `0x100` | `100000000` | Full system management |

---

## 🛠️ Tech Stack

### Backend
* **Node.js & Express:** Core server and RESTful API handling.
* **MySQL2:** Database connector with promise support.
* **Multer:** Middleware for robust file upload management.
* **Dotenv:** Secure environment variable management.

### Frontend
* **React + Vite:** Modern frontend framework for a fast, reactive UI.
* **Axios:** Optimized HTTP client for API communication.
* **React Router Dom:** SPA navigation management.

---

## 📂 Project Structure

```text
codex/
├── backend/
│   ├── src/
│   │   ├── config/      # DB Connection & Permission Constants
│   │   ├── controllers/ # Business Logic
│   │   ├── middleware/  # JWT Verification & File Handlers
│   │   └── routes/      # API Endpoint Definitions
│   └── index.js         # Server Entry Point
└── frontend/
    ├── src/             # Components, Hooks, and Views
    └── vite.config.js   # Build Configuration

```

---

## ⚙️ Installation & Setup
* **Database:**
```bash
mysql -u root -p < database.sql
```

* **Backend:**
```bash
cd backend
npm install
node index.js
```


* **Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍💻 Author

**Miguel Angel Avila Garcia**
  * GitHub: @MiguelAGDev
  * LinkedIn: miguelag-dev





