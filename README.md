# SPoSS - Simple Point of Sales System

Welcome to SPoSS (Simple Point of Sales System)! 🎉 This project is designed to digitize point-of-sales operations for small businesses.

## 🚀 Features

- **Product Management**: Easily view, add, and manage products with detailed information including images, categories, and prices.
- **Category Filtering**: Filter products by category to quickly find what you're looking for.
- **Order Management**: Add products to orders, manage quantities, and review order details in a user-friendly interface.
- **User Authentication**: Secure login and registration system for admin and user roles.

## 🛠️ Technology Stack

- **Frontend**: React.js
- **Backend**: Spring Boot
- **Database**: MySQL
- **Authentication**: Firebase

## 📦 Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/sposs.git
cd sposs
```

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Build the backend using Maven:

    ```bash
    mvn clean install
    ```

3. Run the Spring Boot application:

    ```bash
    mvn spring-boot:run
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## 📂 Project Structure

### Frontend

- `src/admin/`: Directory for admin-centric assets, components, and pages.
- `src/customer/`: Directory for customer-centric assets, components, and pages.
- `src/assets/`: Static assets like images.
- `src/authentication/`: Authentication files such as login and registration.
- `src/firebase/`: Directory for firebase configuration.
- `src/App.js`: Main application file with routing setup.

### Backend

- `src/main/java/com/ciit/sposs/`: Main package for the Spring Boot application.
- `controllers/`: REST controllers for handling HTTP requests.
- `models/`: Entity models representing the database schema.
- `repositories/`: Data access layers for interacting with the database.
- `services/`: Business logic and services.

## 🔧 Usage

1. Start the backend server.
2. Start the frontend development server.
3. Open your browser and navigate to `http://localhost:3000` to start using SPoSS.
