# Student Portal

A **Node.js + Express + MongoDB** project that provides user **signup & login** functionality with password hashing using bcrypt and CORS support.

## 📌 Features

- User Registration with **hashed passwords**
- User Login with **email & password validation**
- Uses **MongoDB** for data storage
- Redirects users to `Home.html` after successful login
- **Error Handling** for duplicate emails and incorrect passwords

## 🛠 Prerequisites

- **Node.js & npm** ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community))
- **Visual Studio Code** ([Download](https://code.visualstudio.com/))

### MongoDB Installation Commands

For Ubuntu:

```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

For Windows:

1. Download and install MongoDB from [MongoDB Official Website](https://www.mongodb.com/try/download/community).
2. Start the MongoDB service from **Services** or run:
   ```powershell
   net start MongoDB
   ```

### VS Code Setup Commands

1. **Open VS Code:**

   ```bash
   code .
   ```

2. **Install Extensions (Recommended):**

   - Search for and install "ESLint" and "Prettier" for better coding experience.

3. **Open Integrated Terminal:**

   ->bash
   Ctrl + `

   Or manually open it from `View -> Terminal`.

4. **Run the Server in VS Code Terminal:**

   ->bash
   node index.js

   Or if using `nodemon`:

   ->bash
   npx nodemon index.js

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

->bash
git clone https://github.com/Sai-git143/Student-Portal.git
cd Student-Portal

### **2️⃣ Install Dependencies**

->bash
npm install

### **3️⃣ Start MongoDB**

Make sure MongoDB is running:

->bash
sudo systemctl start mongod

### **4️⃣ Run the Server**

->bash
node index.js

Or if using `nodemon`:

->bash
npx nodemon index.js


### **5️⃣ Open in Browser**

- **Signup Page:** [`http://localhost:3000/signup`](http://localhost:3000/signup)
- **Login Page:** [`http://localhost:3000/login`](http://localhost:3000/login)

## 📂 Project Structure

Student-Portal/
├── index.js            # Main Server File
├── package.json        # Node.js Dependencies
├── package-lock.json   # Dependency Lock File
├── node_modules/       # Installed Packages
├── public/             # Static Files (HTML, CSS, JS)
├── README.md           # Project Documentation
```

## 🔧 Troubleshooting

### ❌ MongoDB Connection Error

Ensure MongoDB is running:

->bash
sudo systemctl start mongod
->

### ❌ bcrypt Not Found

->bash
npm install bcrypt

If bcrypt fails, try:

->bash
npm install bcryptjs

And update your code:

->js
const bcrypt = require('bcryptjs');

## 🎯 Author

- **Sai Aravind** - [GitHub](https://github.com/Sai-git143)

## 📜 License

This project is **open-source** and available under the MIT License.
