const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRouter = require('./routes/api/auth');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Body Parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth",authRouter);

app.get('/test', (req, res) => {res.json({msg: 'Hello'})});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
