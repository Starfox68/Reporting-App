const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require("mysql");

const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Cheese1601",
  database: "support",
});

//connect to database
con.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

// add new entry
app.post("/store-data", (req, res) => {
  const requ = req.body.request;
  const eff = req.body.effort;
  const typ = req.body.type;
  const env = req.body.environment;
  const rol = req.body.role;
  const com = req.body.comments;
  const dat = new Date().toISOString().split("T")[0];

  con.query(
    `INSERT INTO users (request, completionDate, effort, issueType, environment, role, comments) VALUES (\"${requ}\", \"${dat}\", ${eff}, \"${typ}\", \"${env}\", \"${rol}\", \"${com}\");`,
    function (err, result, fields) {
      if (err) throw err;
      //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      console.log(result);
    }
  );
});

var dict = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

// get data
app.post("/check-data", (req, res) => {
  const start =
    req.body.startYear +
    "-" +
    dict[String(req.body.startMonth)] +
    "-" +
    req.body.startDay;
  const end =
    req.body.endYear +
    "-" +
    dict[String(req.body.endMonth)] +
    "-" +
    req.body.endDay;

  con.query(
    `SELECT * FROM users WHERE completionDate >= \"${start}\" AND completionDate <= \"${end}\";`,
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    }
  );
});

app.listen(3000, () => {
  console.log("Server running successfully on 3000");
});
