require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();
const postRouter = require('./routes/posts');
const singlePostRouter = require('./routes/singlepost');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const addPostRouter = require('./routes/add-post');


// Set up middleware to parse JSON and URL-encoded bodies
app.use(cors({
    origin: '*'
  }));
app.use(bodyParser.json());


// Routes

app.get('/', postRouter);
app.use('/id', singlePostRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.post('/add', addPostRouter);




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
