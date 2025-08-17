
# Vehicle Management System (VMS)

The **Vehicle Management System (VMS)** is a web-based car rental application built with **React.js** (frontend) and **Spring Boot** (backend), using **MySQL** as the database. The platform simplifies the vehicle rental process for both **customers** and **administrators** by automating reservations, payments, and inventory management.

The goal is to replace manual rental workflows with a **modern, automated solution** that reduces operational costs, improves customer experience, and provides business owners with clear insights into their operations.

---

## **Key Features**

### **Admin Module**
* Secure admin authentication with default admin setup  
* Dashboard with summarized business statistics  
* Manage companies, vehicle variants, and vehicles  
* Approve or reject bookings  
* Track and manage payments  
* View customer reviews  
* Generate summary reports and audit trails  

### **Customer Module**
* Customer registration and login  
* Driving license verification  
* Browse available vehicles by company, variant, or fuel type  
* Book vehicles and make online payments  
* View or cancel bookings  
* Leave reviews and ratings  
* Profile management  

---

## **Technology Stack**
* **Frontend**: React.js (with JSX components, routing, and REST API integration)  
* **Backend**: Spring Boot (REST controllers, service layer, repository layer)  
* **Database**: MySQL (normalized schema with indexes and foreign keys)  
* **Authentication**: Spring Security + JWT  
* **Build Tools**: Maven (backend) and npm/yarn (frontend)  
* **Other Tools**: Axios (API calls), Bootstrap (UI), Lombok (Java boilerplate reduction)  

---

## **Database Schema Overview**

The database is **fully normalized** with referential integrity and indexed columns for fast lookups.

### **Tables:**
* `user` – stores user accounts (Admin/Customer) with roles and statuses  
* `driving_license` – stores license details linked to customers  
* `company` – car manufacturing companies  
* `variant` – car variants grouped by company  
* `vehicle` – individual vehicles with availability, price, and mileage  
* `booking` – rental reservations with status and amount  
* `payment` – linked to bookings with payment method, status, and transaction details  
* `review` – customer feedback and ratings for vehicles  

**Highlights:**  
* Indexed foreign keys (`user_id`, `vehicle_id`, `booking_id`, etc.)  
* ENUM fields for statuses (e.g., `ACTIVE/INACTIVE`, `APPROVED/PENDING`)  
* Audit columns (`created_at`, `updated_at`) in most tables  
* No redundant data.

---

## **Installation Guide**

### **Backend (Spring Boot)**  
1. Clone the repository:  
   ```bash
   git clone <repo-url>
   cd backend/VehicleManagementSystem
````

2. Import into your IDE  as a Maven project.

3. Configure your `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/VehicleManagementSystem
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```
4. Run the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```


### **Frontend (React.js)**

1. Navigate to frontend:

   ```bash
   cd frontend/VehicleManagementSystem
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm start
   ```

---

## **Future Enhancements**

* Add email notifications for booking confirmations
* Implement discount/coupon management
* Add advanced reporting with export options (PDF/Excel)


---

## **Contributors**

* **Shoyeb**
* **YashRaj**
* **Gaurav**
* **Tushar**

```
