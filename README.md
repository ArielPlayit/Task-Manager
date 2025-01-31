```markdown
# 📝 Task Manager

**Task Manager** is an API built with **NestJS** for task management, allowing users to create, update, and delete tasks efficiently.  

## 📌 Features  
- 📂 **Task management**: Create, update, and delete tasks.  
- 🗄️ **Database integration**: Uses PostgreSQL with TypeORM.  
- 📄 **API Documentation**: Fully documented with Swagger.  
- 🚀 **Modular architecture**: Clear separation of controllers, services, and modules.  

---

## 🚀 Installation and Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/ArielPlayit/Task-Manager.git
cd Task-Manager
```

### 2️⃣ Install dependencies  
```bash
npm install
```

### 3️⃣ Configure environment variables  
Copy the `.env-template` file and rename it to `.env`. Then, update the values as needed:  
```bash
cp .env-template .env
```

### 4️⃣ Run migrations (if using TypeORM)  
```bash
npm run typeorm migration:run
```

### 5️⃣ Start the server  
```bash
npm run start
```
The server will run at `http://localhost:3000`.

---

## 📖 API Documentation with Swagger  
To access the automatically generated Swagger documentation, go to:  
👉 `http://localhost:3000/api/docs`

---

## 📌 Main Endpoints  
### 🔹 **Tasks**  
| Method  | Endpoint      | Description             |
|---------|--------------|-------------------------|
| `POST`  | `/tasks`     | Create a new task       |
| `GET`   | `/tasks`     | Get all tasks           |
| `GET`   | `/tasks/:id` | Get a task by ID        |
| `PUT`   | `/tasks/:id` | Update a task           |
| `DELETE`| `/tasks/:id` | Delete a task           |

---

## 🛠 Technologies Used  
- **NestJS** (Backend framework)  
- **PostgreSQL** (Relational database)  
- **TypeORM** (ORM for NestJS)  
- **Swagger** (API documentation)  

---

## 📜 License  
This project is licensed under the MIT License.  

---

## 📩 Contact  
📧 **Ariel Playit** – [GitHub](https://github.com/ArielPlayit)  
📧 **Ariel Playit**  - [Gmail](originalghost2003@gmail.com)

🚀 Contributions, feedback, and suggestions are welcome!  
```
