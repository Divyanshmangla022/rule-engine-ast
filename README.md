# Rule Engine Application

## Overview

This is a simple 3-tier rule engine application built with Node.js, Express.js, and MongoDB. It evaluates user eligibility based on rules defined using an Abstract Syntax Tree (AST). The application is designed to be flexible, allowing dynamic creation, combination, and modification of rules. It is containerized using Docker for easy setup and deployment.

## Design Choices

- **Backend**: Built using Node.js and Express.js to handle API requests and interact with the database.
- **Database**: MongoDB is used for storing rules and application metadata.
- **AST Representation**: Rules are represented using a Node class with types `operator` or `operand`, supporting logical operations like `AND` and `OR`.
- **Containers**: Docker is used to ensure a consistent environment setup.

## Dependencies

- **Node.js**: JavaScript runtime for executing the backend application.
- **MongoDB**: NoSQL database for storing rules and metadata.
- **Docker**: Containerization platform for building and running application containers.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.

## Setup and Running

### Prerequisites

- **Docker**: Install Docker from [Docker's official website](https://www.docker.com/products/docker-desktop) or follow the [installation instructions](https://docs.docker.com/get-docker/) for your operating system.
- **Docker Compose**: Install Docker Compose from [Docker's official website](https://docs.docker.com/compose/install/).

### Clone the Repository

```sh
git clone https://github.com/yourusername/rule-engine-ast.git
cd rule-engine-ast
```

Docker Setup (Preferred)
Build and Start Containers
This will build the Docker images and start the containers.
```
docker-compose up --build
```
The application will be accessible at http://localhost:3000.
MongoDB will be available at mongodb://localhost:27017/ruleEngine.

Stopping Containers
To stop and remove containers:

```
docker-compose down
```
Running Without Docker
If you prefer running the application without Docker, follow these steps:

Install Node.js: Ensure Node.js is installed. Download from Node.js official website.

Start MongoDB: Ensure MongoDB is running on localhost:27017. You can use a MongoDB service or start a local MongoDB instance.

Install Dependencies
```

npm install
```
Run the BAckend

```
npm start
```

The application will be accessible at http://localhost:3000.

API Endpoints
POST /create_rule: Create a new rule.

Request Body: { "ruleString": "<RULE_STRING>" }
Response: { "id": "<RULE_ID>", "ast": "<AST_OBJECT>" }
POST /combine_rules: Combine multiple rules into one.

Request Body: { "ruleStrings": ["<RULE_STRING_1>", "<RULE_STRING_2>", ...] }
Response: { "ast": "<COMBINED_AST>" }
POST /evaluate_rule: Evaluate a rule against given data.

Request Body: { "ast": "<AST_OBJECT>", "data": { "age": 35, "department": "Sales", "salary": 60000, "experience": 3 } }
Response: { "result": true/false }


Example Usage
Create a Rule
```
curl -X POST http://localhost:3000/create_rule -H "Content-Type: application/json" -d '{"ruleString": "((age > 30 && department == 'Sales') || (age < 25 && department == 'Marketing')) && (salary > 50000 || experience > 5)"}'

```
combine rule

```
curl -X POST http://localhost:3000/combine_rules -H "Content-Type: application/json" -d '{"ruleStrings": ["((age > 30 && department == 'Sales') || (age < 25 && department == 'Marketing')) && (salary > 50000 || experience > 5)", "((age > 30 && department == 'Marketing')) && (salary > 20000 || experience > 5)"]}'
```
evaluate rule

```
curl -X POST http://localhost:3000/evaluate_rule -H "Content-Type: application/json" -d '{"ast": <AST_OBJECT>, "data": {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}}'

```






