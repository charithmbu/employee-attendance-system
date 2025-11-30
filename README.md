# Employee Attendance System
Full-stack project (React + Redux Toolkit, Node.js + Express, MongoDB)
## Features
- Employee: register/login, check in/out, view history, monthly summary
- Manager: view all attendance, filter, export CSV, dashboards
## Tech
- Frontend: React, Redux Toolkit, React Router, Axios
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
## Setup
### Backend
1. `cd backend`
2. `npm install`
3. create `.env` from `.env.example` and fill values
4. `npm run seed` to create sample users
5. `npm run dev` to start server (nodemon) or `npm start`
### Frontend
1. `cd frontend`
2. `npm install`
3. create `.env` (optional) with `REACT_APP_API_URL=http://localhost:5000/
api`
4. `npm start`
## Seed accounts
- Manager: alice.manager@example.com / password123 (employeeId: MGR001)
- Employee: bob.employee@example.com / password123 (employeeId: EMP001)
## Deliverables
- Clean code, README, .env.example, seed data
## Notes / Next steps
- Add client-side role protections & nicer UI
- Add pagination & filters for large teams
- Add charts (e.g., Chart.js) for dashboards
