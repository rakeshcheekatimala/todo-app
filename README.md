# Todo List Application

A full-stack Todo List application built with React, Node.js, Express, and MongoDB, containerized with Docker.

## Features

- Create, read, update, and delete todo items
- Mark todos as complete/incomplete
- Modern Material-UI interface
- RESTful API backend
- MongoDB database
- Docker containerization

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Start the application:
```bash
docker-compose up
```

3. Access the application:
- Frontend: http://localhost:4100
- Backend API: http://localhost:4300

## API Endpoints

- GET /todos - Get all todos
- POST /todos - Create a new todo
- PUT /todos/:id - Update a todo
- DELETE /todos/:id - Delete a todo

## Development

The application is set up with hot-reloading for both frontend and backend development. Any changes made to the source code will automatically trigger a rebuild of the affected service.

## Project Structure

```
todo-app/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
├── backend/           # Node.js backend
│   ├── src/
│   │   └── index.js
│   └── package.json
└── docker-compose.yml
```

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

- DevOps:
  - Docker
  - Docker Compose 