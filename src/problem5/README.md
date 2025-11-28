# A Crude Server

## Task
Develop a backend server with ExpressJS. You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.

1. Interface functionalities:
    a. Create a resource.
    b. List resources with basic filters.
    c. Get details of a resource.
    d. Update resource details.
    e. Delete a resource.
2. You should connect your backend service with a simple database for data persistence.
3. Provide [`README.md`](http://README.md) for the configuration and the way to run application.

## Solution
Assume that we are design for an internal hotel management system. In this submission, we will create an MVP with a very basic functionality or models....

Assumptions:
- This system serves for only one organization.
- The system is intended for internal use by hotel staff to manage hotel information.
- Basic authentication is implemented to restrict access to authorized personnel only.
- The system will log all access attempts for auditing purposes.

This is an example for a simple CRUD of a `Hotel` resource using ExpressJS and TypeScript, connected to a SQLite database using Sequelize ORM.

Features:
- Create, Read, Update, Delete operations for Hotel resource.
- Basic filtering on list operation (by type and availability).
- Input validation using `express-validator`.
- Error handling for all operations.
- Sequelize ORM for database interactions.

### Models
- Hotel:
  - id: number (auto-incremented)
  - name: string
  - country: string
  - city: string
  - address: string
  - latitude: number
  - longitude: number
  - is_available: boolean
  - images: string[] (array of image URLs)
  - description: string
  - rating: number
  - created_at: Date
  - updated_at: Date
  - rooms: Room[] (one-to-many relationship with Room model)

- Room:
  - id: number (auto-incremented)
  - hotel_id: number (foreign key to Hotel)
  - name: string
  - type: string (e.g., single, double, suite)
  - description: string
  - price: number
  - is_available: boolean
  - created_at: Date
  - updated_at: Date
  - hotel: Hotel (many-to-one relationship with Hotel model)

### API Endpoints
- `POST /hotels`: Create a new hotel.
- `GET /hotels`: List all hotels with optional filters.
- `GET /hotels/:id`: Get details of a specific hotel.
- `PUT /hotels/:id`: Update details of a specific hotel.
- `DELETE /hotels/:id`: Delete a specific hotel.

## Setup Instructions
### Code structure
```
ROOT Directory
├── src
│   ├── controllers -- contains the logic for handling requests and responses
│   ├── errorHandlers -- contains custom error handling middleware
│   ├── middlewares -- contains authentication, authorization, and validation middlewares
│   ├── models -- contains Sequelize models for Hotel and Room
│   ├── routes -- contains route definitions for the API endpoints
│   ├── types -- contains TypeScript type definitions
│   ├── database.ts -- contains database connection and configuration
│   └── index.ts -- entry point of the application
├── demo
│   └── Hotel.postman_collection.json -- Postman collection for API demonstration
├── package.json
├── tsconfig.json
└── README.md
```

### Prerequisites
- Node.js
- npm or yarn
- SQLite
### Setup
From the root directory of the project, follow these steps:
- Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```
- Set up the database:
  The database will be automatically set up when you run the application for the first time. Sequelize will create the necessary tables based on the defined models.
- Run the application:
  ```bash
  npm start
  # or
  yarn start
  ```
The server will start on `http://localhost:3000` by default.

## Demonstration
A Postman collection is provided in the repository to demonstrate the usage of the API endpoints. You can import the collection into Postman and execute the requests to see how the API works.

Refer to this [Postman Collection](./demo/Hotel.postman_collection.json) for detailed API requests and responses.

In the postman collection, you will find requests and responses for all the CRUD operations on the Hotel resource, along with examples of filtering and error handling.

## Time Log:
This is the source that I had to work from scratch to build the solution without any external resources.

- Planning and Design: 30 minutes
- Development: 4 hours
- Testing and Debugging: 1 hour
- Documentation: 30 minutes
------
- Total Time: 6 hours
