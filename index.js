const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const package = require("./package.json");

const port = process.env.port || process.env.PORT || 5000;
const apiRoot = "/api";
const app = express();

// Configuring app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

// my play with testing databases
const db = {
  inwerejosic: {
    user: "inwerejosic",
    currency: "GBP",
    balance: 1000,
    description: "A Sample account",
    transactions: [],
  },
};

// Here is the route section
const router = express.Router();
// Routes for reading the package.json file of this project
router.get("/", (req, res) => {
  res.send(`${package.au} - v${package.version}`);
});

// Routes for the sample test data
router.get("/accounts/:user", (req, res) => {
  // Checking if the user exists
  const user = req.params.user;
  const account = db[user];

  if (!account) {
    return res.status(400).json({ error: "User no dey oh" });
  }
  return res.json(account);
});

// Route for create a new user account
router.post("/accounts", (req, res) => {
  const body = req.body;

  // validate required values
  if (!req.body.user || !req.body.currency) {
    return res.status(400).json({ error: "user and currency needed" });
  }

  // check if account exits already
  if (db[req.body.user]) {
    return res.status(400).json({ error: "Account already exists" });
  }

  // Balance check
  let balance = req.body.balance;
  if (balance && typeof balance !== "number") {
    balance = parseFloat(balance);
    if (isNaN(balance)) {
      return res.status(400).json({ error: "Balance must be a number" });
    }
  }
  const account = {
    user: req.body.user,
    currency: req.body.currency,
    description: req.body.description || `${req.body.user}'s account`,
    balance: req.balance || 0,
    transactions: [],
  };
  db[req.body.user] = account;

  return res.status(201).json(account);
});

// Getting the routes up and running
app.use(apiRoot, router);

// Starting the server
app.listen(port, () => {
  console.log("I am up and running");
});
