# Node.js Blogging Backend

This repository contains the source code for a Node.js backend built for a blogging platform.

## Overview

This backend provides endpoints for managing blog posts and users. It's built using Node.js with Express.js framework and PostgreySql for data storage.

The backend is currently hosted at [https://nodejs-blogging-backend.vercel.app/](https://nodejs-blogging-backend.vercel.app/).

## Features

- **Authentication**: Users can sign up, login, and logout securely.
- **Authorization**: Access control based on user roles.
- **CRUD Operations**: Full CRUD functionality for managing blog posts, users, and comments.
- **Pagination**: Results are paginated for better performance.
- **Validation**: Input data is validated to ensure consistency and prevent errors.
- **Error Handling**: Comprehensive error handling for better user experience.
- **Security**: Utilizes best practices for security, including encryption for sensitive data.
- **Testing**: Unit and integration tests to ensure reliability.

## Getting Started

To get a local copy of the project up and running follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Rana-Qasid-Ahmad/nodejs-blogging-backend.git
    ```

2. **Install dependencies**:

    ```bash
    cd nodejs-blogging-backend
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and configure the following variables:

    ```plaintext
    DB_USER=Your-Secret-Key
    DB_PASSWORD=Your-Secret-Key
    DB_HOST=Your-Secret-Key
    DB_PORT=Your-Secret-Key
    DB_DATABASE=Your-Secret-Key
    JWT_SECRET=Your-Secret-Key
    ```

4. **Start the server**:

    ```bash
    npm start
    ```

The backend should now be running locally on `http://localhost:3000`.

## API Documentation
### All Posts 
-- Get Request [https://nodejs-blogging-backend.vercel.app](https://nodejs-blogging-backend.vercel.app) 

Queries: ?page=1&pageSize=10&q=football&category=sports&sortBy=post_id&sortOrder=asc

### Single Post
--GET Request  [https://nodejs-blogging-backend.vercel.app/[id]](https://nodejs-blogging-backend.vercel.app/[id])

#### Updated Single Post
--PUT Request  [https://nodejs-blogging-backend.vercel.app/[id]](https://nodejs-blogging-backend.vercel.app/[id]) Headers includes authentication token.


### ADD Post
-- POST Request [https://nodejs-blogging-backend.vercel.app/add](https://nodejs-blogging-backend.vercel.app/add) 
 Headers includes authentication token.

 
### ADD Post
-- POST Request [https://nodejs-blogging-backend.vercel.app/register](https://nodejs-blogging-backend.vercel.app/register) 

Request type text/json:

 { 
   "username":"username",
  "password":"password"
 }



## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
