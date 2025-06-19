# Employee Status Management App

This is a simple React + TypeScript application for managing employee statuses via REST API.

## Features

- View a list of all employees
- Filter employees by status:
    - Working
    - On Vacation
    - Lunch Time
    - Business Trip
- Search employees by name (with debounce)
- Add a new employee
- Change employee status
- Reset filters

## API

Server should support the following REST endpoints:

- `GET http://localhost:8000/users`  
  Returns all employees.

- `POST http://localhost:8000/users/:userId`  
  Body:
  ```json
  {
    "status": "Working"
  }
  ```

The server can be bootstrapped using the `server.txt` file (Express-based). The backend should be implemented by the developer.

## Setup

```bash
npm install
npm run dev
```

## Tech Stack

- React 19 + TypeScript
- Vite
- Axios
- Lucide React Icons

## Development Notes

- The app is structured using a modular approach: components, hooks, and styles are separated.
- Status updates and employee fetching are handled via custom hooks.
- Debounced search ensures UI responsiveness.
- Clean code and accessible UI were prioritized.
