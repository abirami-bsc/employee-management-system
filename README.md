# Employee Management System

A Java Full Stack Employee Management System built using Spring Boot, MySQL, HTML, CSS, and JavaScript.

## Technologies Used

- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- HTML5
- CSS3
- JavaScript
- Maven
- Git & GitHub

## Features

- Add employees
- View employees
- Update employee details
- Delete employees
- Search employees by name
- Filter employees by department
- Sort employees by:
  - Name (A-Z)
  - Salary (Low to High)
  - Salary (High to Low)
  - Department (A-Z)
- Employee count
- Phone number validation
- Salary validation
- Duplicate email prevention
- Delete confirmation
- Clear/reset functionality
- Responsive and user-friendly interface

## Project Structure

```text
employee-backend
│
├── src
│   └── main
│       ├── java
│       │   └── employee_backend
│       │       ├── controller
│       │       ├── entity
│       │       ├── repository
│       │       └── service
│       │
│       └── resources
│           ├── static
│           │   ├── index.html
│           │   ├── script.js
│           │   └── style.css
│           └── application.properties
│
├── pom.xml
└── README.md
```

## Backend

The backend is developed using Spring Boot and provides REST APIs for employee management.

The application uses:

- Controller layer for REST API requests
- Service layer for business logic
- Repository layer for database operations
- JPA/Hibernate for database interaction
- MySQL for storing employee data

## Frontend

The frontend is built using HTML, CSS, and JavaScript.

It provides an interface to:

- Add employees
- View employees
- Search and filter employees
- Sort employees
- Edit employee details
- Delete employees

## Database

The project uses MySQL with a database named:

```text
employee_db
```

The MySQL password is provided through the `DB_PASSWORD` environment variable and is not stored directly in the GitHub repository.

## How to Run

1. Clone the repository.

2. Create the MySQL database:

```sql
CREATE DATABASE employee_db;
```

3. Set the MySQL password as an environment variable.

For PowerShell:

```powershell
$env:DB_PASSWORD = "your_mysql_password"
```

4. Start the Spring Boot application:

```powershell
.\mvnw.cmd spring-boot:run
```

5. Open the application in your browser:

```text
http://localhost:8080
```

## Learning Purpose

This project was created as a Java Full Stack learning and portfolio project to practice Spring Boot, REST APIs, JPA, MySQL, HTML, CSS, JavaScript, and Git/GitHub.
