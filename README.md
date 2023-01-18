# Social Network backend API

## Description

Express server for a social network web application where users can create new posts, react to friends’ posts, and create a friend list.

## User Stories

- [x] User can search the database for all users, posts, friends, and reactions.
- [x] User can CREATE UPDATE AND DELETE users, posts, friends, and reactions.
- [x] User can ADD and DELETE a friend to their friends list
-

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Usage

- View all users at `/api/users/`
- POST a new user at `/api/users/`
- View all posts at `/api/posts/`
- POST a new posts at `/api/posts/`

## Installation

clone the repo to local machine

```
cd social-network-API/
```

Install dependencies

```
npm install
```

Add your own env variables to connect to SQL db.

```
/.env
```

start express server

```
nodemon server.js
```
