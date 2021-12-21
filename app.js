const express = require("express");
const logger = require("./utils/logger");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(session({
    secret: "This is a secret!",
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine(
  ".hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main"
  })
);
app.set("view engine", ".hbs");

const routes = require("./routes");
app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log(`Web App template listening on ${process.env.PORT}`);
});

module.exports = app;
