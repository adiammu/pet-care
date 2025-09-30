Pet Care Management System

Backend (Node.js/Express + MySQL)
- cd backend
- Copy .env.example to .env and set values:
  - PORT=4000
  - JWT_SECRET=your_secret
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD=your_mysql_password
  - DB_NAME=petcare
  - CLIENT_ORIGIN=http://localhost:5173
- npm install
- Initialize DB: npm run db:setup
- Start API: npm run dev

Frontend (React + Vite + Tailwind)
- cd frontend
- Create .env with: VITE_API_URL=http://localhost:4000/api
- npm install
- npm run dev (http://localhost:5173)

Key Endpoints
- Auth: POST /api/auth/register, POST /api/auth/login
- Pets: GET/POST/PUT/DELETE /api/pets (auth)
- Services: GET /api/services; Admin: POST/PUT /api/services
- Appointments: GET/POST /api/appointments (auth); PATCH /api/appointments/:id/status; Admin: GET /api/appointments/admin/all
- Bills: POST /api/bills/:appointmentId/generate, GET /api/bills/my, PATCH /api/bills/:id/paid (admin)

Features
- JWT auth, password hashing with bcrypt
- Appointment status tracking (booked → under_care → medication_given → completed)
- QR code per appointment for check-in/out
- Browser notifications for upcoming appointments (permission required)



