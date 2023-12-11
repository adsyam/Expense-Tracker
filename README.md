# Expense Tracker API

The Expense Tracker API is built with Express, MongoDB, and Mongoose. It provides a secure and reliable backend for managing expenses and transactions. The API offers protected routes that require authentication, ensuring that only authorized users can access sensitive data.

## Installation

To run this API locally, follow these steps:

1. Clone the repository.
2. Install the required dependencies by running `npm install`.
3. Create a `.env` file in the root directory and add the following environment variables:

## (.env)
```javascript
MONGO_CONNECTION_KEY=your_mongodb_connection_key

JWT_SALT="my-secret-key-123"

NODEMAILER_USER=your_nodemailer_user
NODEMAILER_PASSWORD=your_nodemailer_password
```

4. Start the server by running `npm start`.

## Live Link

You can access the live API at [https://expense-tracker-api-3lv5.onrender.com/api/users](https://expense-tracker-api-3lv5.onrender.com/api/users).

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user.
```json
{
    "name": "test",
    "email": "test@gmail.com",
    "password": "12345678",
    "confirm_password": "12345678",
    "balance": 100
}
```
- `POST /api/users/login`: User login.
```json
{
    "email": "test@gmail.com",
    "password": "12345678"
}
```
- `POST /api/users/forgotpassword`: Send a password reset email.
```json
{
    "email": "test@gmail.com",
}
```
- `POST /api/users/resetpassword`: Reset user password.
```json
{
    "email": "test@gmail.com",
    "reset_code": "41456",
    "new_password": "newpassword"
}
```

#### Protected Routes (Require Authentication)

- `GET /api/users/dashboard`: Get user dashboard information.

### Transaction Routes
#### Protected Routes (Require Authentication)
- `POST /api/transactions/addIncome`: Add an income transaction.
```json
{
    "amount": 10,
    "remarks": "from someone"
}
```
- `POST /api/transactions/addExpense`: Add an expense transaction.
```json
{
    "amount": 10,
    "remarks": "from someone"
}
```
- `GET /api/transactions`: Get all transactions.
  - `/?transaction_type=income` : Filter by income  or expense
- `DELETE /api/transactions/:transaction_id`: Delete a transaction by ID.
- `PATCH /api/transactions`: Edit a transaction.
```json
{
    "remarks": "from someone else"
}
```

# Postman

### Set the Environment Variables:
- url: http://localhost:8000/api
- accessToken: **This should be automated by adding the test config below**

### Tests Config for register and login routes:
- This is for automating the Access Token...
```javascript
pm.environment.set("accessToken", pm.response.json().accessToken)
```

## Authors

- [adsyam](https://github.com/adsyam)

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Mongoose](https://mongoosejs.com)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [nodemailer](https://nodemailer.com/)
- [Mailtrap](https://mailtrap.io/)
- [express-async-errors](https://github.com/davidbanham/express-async-errors)
- [validator](https://github.com/validatorjs/validator.js)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## Contact

For any questions or feedback, please feel free to reach out to me at [adiyambaojs@gmail.com](adiyambaojs@gmail.com).