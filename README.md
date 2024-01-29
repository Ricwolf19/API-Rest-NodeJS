# Node.js SQLite RESTFUL API

This project implements a RESTful API using SQLite as the database, Prisma as the ORM, Node.js, TypeScript, and Express for server-side development.

## Getting Started

### Prerequisites

- Node.js installed
- SQLite database installed
- Yarn or npm installed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ricwolf19/API-Rest-Nodejs-Prisma.git
```

### Install dependencies:

```bash
cd node-sqlite-prisma-api
npm install
```
### Configuration

- Set up your SQLite database and update the connection details in the .env file.
- Run Prisma migrations:

npx prisma migrate dev

### Usage
Start the server:

```bash
npm run dev
Access the API at http://localhost:3000.
```

### API Endpoints
- GET /api/resource: Retrieve resources.
- POST /api/resource: Create a new resource.
- PUT /api/resource/:id: Update a resource.
- DELETE /api/resource/:id: Delete a resource.

### Technologies Used
- Node.js
- SQLite
- Prisma
- TypeScript
- Express

### Contributing
Contributions are welcome! If you have ideas for improvements, new features, or bug fixes, feel free to submit a pull request.