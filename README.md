
# Login Logout System

The login logout system created using Node.js, Express.js, MySQL, HBS (Handlebars), and JWT token is a web application that allows users to authenticate themselves and securely access certain resources or features of the system.

The system uses Node.js and Express.js to handle HTTP requests and responses, MySQL as the database management system, HBS (Handlebars) as the templating engine for rendering views, and JWT (JSON Web Token) as the mechanism for securely transmitting information between parties.

The login functionality requires the user to enter their email and password. Once authenticated, a JWT token is generated and sent back to the client. The token is then stored in the client-side local storage or cookies and is used to authenticate subsequent requests to the server.

The logout functionality clears the token from the client-side storage and redirects the user to the login page.

The system also includes password hashing and salted password storage to ensure user security.

Overall, this login logout system provides a secure and efficient way for users to authenticate themselves and access protected resources in a web application.


## Features

- Password Validation and Encryption
- Session Cookies
- JWT Token 
- Login , Logout , Register , Profile Pages


## 🛠 Tech Stack Used
HTML, CSS , HBS , Node.js , Express.js , MYSQL , JWT Tokens , Cookies ...


## Installation

Install Login-System-Using-JWT-Cookie with npm

```bash
  npm install express mysql bcrypt dotenv cookie-parser nodemon 
  cd Login-System-Using-JWT-Cookie
```
## Start Project

```bash
  nodemon index.js
```

## Screenshots

### Login page
![github-small](images/login%20page.jpg)

### Profile page
![github-small](images/profile%20page.jpg)

### Register page

![github-small](images/register%20page.jpg)

## Support

For support, email sahilrayu021@gmail.com 

## Feedback

If you Liked this please send your feedback out to me at sahilrayu021@gmail.com
