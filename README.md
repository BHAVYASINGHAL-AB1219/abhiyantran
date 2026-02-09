# Abhiyantran - Event Management System

A full-stack event management application built with React (Vite) and PHP (native).

## 🚀 Quick Start

To set up the project on a new machine:

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd abhiyantran
    ```

2.  **Run the Setup Script**:
    This script installs all dependencies (Node.js & PHP) and checks your configuration.
    ```bash
    ./setup.sh
    ```

3.  **Start the Application**:
    You can use the start script to launch both backend and frontend:
    ```bash
    ./start.sh
    ```
    
    ### Windows (PowerShell)
    
    1.  **Run Setup**:
        ```powershell
        ./setup.ps1
        ```
    
    2.  **Start Application**:
        ```powershell
        ./start.ps1
        ```

    ### Manual Startup

    - **Frontend**: `npm run dev`
    - **Backend**: `cd backend && php -S 127.0.0.1:8000`

## 🛠 Prerequisites

- **Node.js**: v18 or later
- **PHP**: v8.0 or later (with MongoDB extension)
- **Composer**: Dependency manager for PHP
- **MongoDB**: Local instance or MongoDB Atlas

## 📂 Project Structure

- `src/`: Frontend React source code.
- `backend/`: PHP backend API.
- `setup.sh`: Automated setup script.
- `start.sh`: Helper script to run both services.

## 🔐 Configuration

The backend uses a `.env` file for sensitive configuration.
- `MONGODB_URI`: Your MongoDB connection string.
- `MONGODB_DB`: Database name.

> **Note**: This repository includes the `.env` file for ease of setup as per project requirements. In a production environment, ensure secrets are managed securely.
