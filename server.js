const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const userRouter = require('./routes/api/user');
const authRouter = require('./routes/api/auth');
const rdpsRouter = require('./routes/api/rdps');
const vpsRouter = require('./routes/api/vps');
const cpanelRouter = require('./routes/api/cpanel');
const shellRouter = require('./routes/api/shell');
const smtpRouter = require('./routes/api/smtp');
const phpmailerRouter = require('./routes/api/phpmailer');
// const leadRouter = require('./routes/api/lead');
const premiumShopRouter = require('./routes/api/premiumShop');
const programScriptRouter = require('./routes/api/programScript');
const methodRouter = require('./routes/api/method');
const serviceRouter = require('./routes/api/service');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Body Parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rdps", rdpsRouter);
app.use("/api/vps", vpsRouter);
app.use("/api/cpanel", cpanelRouter);
app.use("/api/shell", shellRouter);
app.use("/api/smtp", smtpRouter);
app.use("/api/phpmailer", phpmailerRouter);
// app.use("/api/lead", leadRouter);
app.use("/api/premiumShop", premiumShopRouter);
app.use("/api/programScript", programScriptRouter);
app.use("/api/method", methodRouter);
app.use("/api/service", serviceRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
