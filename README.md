# ***My Blog*** API
## Description
My Blog API is a simple RESTful API for managing ***My Blog*** posts, comments, tags, and users. It allows a user to perform basic CRUD operations on blog posts, comments, and users, and it supports user authentication.  
[![Static Badge](https://img.shields.io/badge/Live%20API-blue)](https://sofonias-elala-blog-rest-api.glitch.me/) [![Static Badge](https://img.shields.io/badge/NodeJS%20Server%20on%20Glitch-purple)](https://glitch.com/~sofonias-elala-blog-rest-api)

## Features

- User authentication with JWT
- CRUD operations as mentioned above  

## Future features 
 * pagination
## Links to the other ***My Blog*** repos
 * [![Static Badge](https://img.shields.io/badge/Content%20Management%20System-green)](https://github.com/sofoniasElala/blog-content-management-system)
 * [![Static Badge](https://img.shields.io/badge/Main%20Site-green)](https://github.com/sofoniasElala/my-blog-main)
### UML DIAGRAM
![uml-diagram](https://github.com/sofoniasElala/blog_rest_api/blob/main/UML_diagram.png)

### Endpoints

- **GET /**: Retrieve a list of all published blog posts.
- **GET /all**: Retrieve a list of all blog posts. _(Requires Authentication)_
- **POST /posts**: Create a new blog post. _(Requires Authentication)_
- **GET /posts/{id}**: Retrieve a specific blog post by its ID.
- **PUT /posts/{id}**: Update an existing blog post by its ID. _(Requires Authentication)_
- **DELETE /posts/{id}**: Delete a blog post by its ID. _(Requires Authentication)_
___
- **GET /{postid}/comments**: Retrieve a list of all comments on post.
- **POST /{postid}/comments**: Create a new comment on post. _(Requires Authentication)_
- **GET /{postid}/comments/{id}**: Retrieve a specific comment by its ID.
- **PUT /{postid}/comments/{id}**: Update an existing comment by its ID. _(Requires Authentication)_
- **DELETE /{postid}/comments/{id}**: Delete a comment by its ID. _(Requires Authentication)_
___
- **GET /tags**: Retrieve a list of all tags. 
- **POST /tags**: Create a new tag. _(Requires Authentication)_
- **GET /tags/{id}**: Retrieve a specific tag by its ID. _(Requires Authentication)_
- **PUT /tags/{id}**: Update an existing tag by its ID. _(Requires Authentication)_
- **DELETE /tags/{id}**: Delete a tag by its ID. _(Requires Authentication)_
___
- **GET /users**: Retrieve a list of all users. _(Requires Authentication)_
- **POST /users**: Create a new user. _(Requires Authentication)_
- **GET /users/{id}**: Retrieve a specific user by their ID. 
- **PUT /users/{id}**: Update an existing user by their ID. _(Requires Authentication)_
- **DELETE /users/{id}**: Delete a user by their ID. _(Requires Authentication)_
___
- **POST /log-in**: Authenticate a user and generate a JWT token.
- **POST /sign-up**: Register a new user. _(Requires Authentication)_

## Technologies Used:
  * NodeJS - Express
  * MongoDB - database
  * Passport JWT - authentication/authorization
  * Glitch for hosting