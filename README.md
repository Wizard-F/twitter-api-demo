This is a Twitter api demo with minimal functionality. It has been deployed on Heroku at https://twitter-api-demo-heroku.herokuapp.com.
# Tech Stack
- Express + Mongoose(MongoDB)
- Validation by Joi
- Authentication and Authorization by JSON Web Token

# API's
## User
- create a new user: `POST` to `/api/users` with `name`, `email`, and `password`
- get all users: `GET` to `/api/users`
- user login: `POST` to `/api/auth` with `email` and `password`, and get a user object (with a JSON Web Token property named "token") in response
## Tweet
- create a new tweet: `POST` to `/api/tweets` with `content` in body and `x-auth-token` in header
- update a tweet: `PUT` to `/api/tweets/:id` with `content` in body and `x-auth-token` in header. The token should match the author of the tweet to be updated.
- get all tweets: `GET` to `/api/tweets` 
- get a tweet by id: `GET` to `/api/tweets/:id`
- delete a tweet: `DELETE` to `/api/tweets/:id` with and `x-auth-token` in header. The token should match the author of the tweet to be deleted.
