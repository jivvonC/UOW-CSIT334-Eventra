<h1>Eventra - Event Service Booking Platform</h1>
<h2>📄 Project Description</h2>
<p><b>Eventra</b> is a full-stack event service booking platform that connects customers with various service providers.<br><br>
<b>The application allows users to register, browse services, make bookings, communicate with providers, leave reviews, and manage payments.</b><br>
Service providers can create and manage their profiles, list services, handle bookings, and monitor performance through an analytics dashboard.<br>
The system includes <b>real-time chat</b> (WebSocket + STOMP), <b>in-app notifications</b>, <b>JWT-based authentication</b>, and a <b>layered Spring Boot architecture</b> for scalability and maintainability.<br>
<br>
The frontend, built with <b>React, Vite, Ant Design, Tailwind CSS, and StompJS</b>, delivers a responsive and modern user experience.<br>
The backend, built with <b>Java 21 and Spring Boot</b>, uses a <b>MySQL</b> database with JPA/Hibernate and integrates a <b>simulated payment system</b>.<br>
<br>  
<b>This project was an assignment for CSIT334-Software Design in University of Wollongong, Australia</b>
</p>


<h2>⏳ Development Period</h2>
<b>2025.03.06 – 2025.06.27</b>

<h2>👥 Contributors</h2>

| Name                     | Role                     | Contribution                                                    |
| ------------------------ | --------------------     | --------------------------------------------------------------- |
| **Ian Gabriel Cuchapin**    | Frontend Developer       | React UI development, Notification System, Responsive Layout, Filtering System, Booking system                   |
| **Jiwon Chon**              | Frontend Developer       | React UI development, Chat integration (StompJS), Review system, Login & Signup system                               |
| **William Campbell**        | Frontend Developer       | Service Provider Dashboard, Reports page                  |
| **Pyae Phyo Kyaw**          | Backend Developer        | Spring Boot APIs, Authentication (JWT), Security, Database schema, Repository Layer, Data Initialization     |
| **Ravin Aapha-Asadej**      | Backend Developer        | Spring Boot APIs, Booking & Payment logic, Service Layer, UML diagrams, Flowcharts, Technical specifications |
| **Azat Umraliyev**          | Backend Developer        | Spring Boot APIs, Booking & Payment logic, Service Layer, UML diagrams, Flowcharts, Technical specifications |

<h2>💻 Development Environment</h2>
<h3>Frontend:</h3>

<li>React 18</li>

<li>Vite</li>

<li>Ant Design</li>

<li>Tailwind CSS</li>

<li>StompJS (WebSocket for chat)</li>

<li>Axios</li>

<h3>Backend:</h3>

<li>Java 21</li>

<li>Spring Boot 3.4.5</li>

<li>Spring Security + JWT</li>

<li>Spring Data JPA (Hibernate)</li>

<li>ModelMapper</li>

<li>Lombok</li>

<h3>Database:</h3>

<li>MySQL 8.x</li>

<h3>Build Tools & Others:</h3>

<li>Maven</li>

<li>Postman (API testing)</li>

<li>Swagger UI (API documentation)</li>

<h2>✨ Features</h2>
<h3>User Management & Authentication</h3>
<li>User registration (Customer, Service Provider, Admin)</li>

<li>Secure JWT authentication</li>

<li>Role-based access control</li>

<li>Profile update & account deletion</li>

<h3>Service Provider Tools</h3>
<li>Profile & service management (name, category, pricing, images)</li>

<li>Dashboard with booking stats, revenue, and reviews</li>

<li>Image upload for cover/profile/service images</li>

<h3>Booking System</h3>
<li>Create, accept, reject, or cancel bookings</li>

<li>Simulated payment confirmation</li>

<li>Unique booking reference generation</li>

<li>Booking history tracking</li>

<h3>Communication</h3>
<li>Real-time chat (WebSocket + STOMP)</li>

<li>In-app notifications for booking status changes</li>

<h3>Reviews & Ratings</h3>
<li>Customers can leave ratings and comments</li>

<li>Average ratings calculated automatically</li>

<h3>Admin Features</h3>
<li>Manage user accounts</li>
<li>Monitor platform activity</li>

<h2>🎥 Demonstration Video</h2>
[![Video Label](http://img.youtube.com/vi/mSiXyM4GLss/1.jpg)](https://youtu.be/mSiXyM4GLss)

## 🚀 Setup & Installation

Follow these steps to get the project running locally.

### Frontend
```bash
#Navigate to the frontend directory and start the development server
cd frontend
npm install
npm run dev
```

### Backend
```bash
# Navigate to backend directory
cd backend
mvn clean install
mvn spring-boot:run
```
<br>


<h2>📌 Future Enhancements</h2>
<li>Stripe/PayPal integration for real payments</li>

<li>Advanced service search & filtering</li>

<li>Email notifications</li>

<li>Calendar booking integration</li>
