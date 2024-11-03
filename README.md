Social Network API
This project is a backend API for a social network application built with Node.js, Express, and MongoDB. The API enables users to share thoughts, react to friends' thoughts, and manage a friend list. It's designed to handle large volumes of unstructured data efficiently using MongoDB as a NoSQL database. This project is part of a coding bootcamp exercise to demonstrate the creation and management of a social media backend.

Table of Contents
Features
Technologies Used
Installation
Usage
API Endpoints
License
Features
User Management: Create, update, and delete users with fields for username, email, friend list, and thoughts.
Thought Sharing: Users can create and delete thoughts, and each thought includes a timestamp.
Reactions: Users can react to thoughts, similar to comments or replies.
Friend Connections: Add and remove friends from a user's friend list.
Data Aggregation: Calculates friend count and reaction count using Mongoose virtual properties.
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Fast and lightweight framework for server-side applications.
MongoDB: NoSQL database for efficient data handling and storage.
Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
TypeScript: Typed JavaScript to enhance reliability and maintainability.

Usage
Once the server is running, you can interact with the API using Insomnia, Postman, or any API testing tool. The base URL for all endpoints is http://localhost:3001/api.

API Endpoints
Users
GET /api/users: Retrieve all users.
GET /api/users/
: Retrieve a single user by ID with populated thought and friend data.
POST /api/users: Create a new user.
PUT /api/users/
: Update a user by ID.
DELETE /api/users/
: Delete a user by ID and remove their associated thoughts.
POST /api/users/
/friends/
: Add a friend to a user’s friend list.
DELETE /api/users/
/friends/
: Remove a friend from a user’s friend list.
Thoughts
GET /api/thoughts: Retrieve all thoughts.
GET /api/thoughts/
: Retrieve a single thought by ID.
POST /api/thoughts: Create a new thought and associate it with a user.
PUT /api/thoughts/
: Update a thought by ID.
DELETE /api/thoughts/
: Delete a thought by ID.
Reactions
POST /api/thoughts/
/reactions: Add a reaction to a thought.
DELETE /api/thoughts/
/reactions/
: Remove a reaction from a thought.
License
This project is licensed under the MIT License.

