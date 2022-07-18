const express = require("express");
const { spawn } = require("child_process");
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

var monthdict = {
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
  var reportDict = {
    "Low environment issue": 0,
    "Application issue": 0,
    "Reports": 0,
    "Connection": 0,
    "Smurf Alert": 0,
    "Security": 0,
  };

  const start =
    req.body.startYear +
    "-" +
    monthdict[String(req.body.startMonth)] +
    "-" +
    req.body.startDay;
  const end =
    req.body.endYear +
    "-" +
    monthdict[String(req.body.endMonth)] +
    "-" +
    req.body.endDay;

  con.query(
    `SELECT * FROM users WHERE completionDate >= \"${start}\" AND completionDate <= \"${end}\";`,
    function (err, result, fields) {
      if (err) throw err;
      result.forEach(
        (item) =>
          (reportDict[String(item.issueType)] =
            reportDict[String(item.issueType)] + 1)
      );

      //send email
      const em = String(req.body.email);

      var dataToSend;
      // spawn new child process to call the python script
      const python = spawn("python", [
        "sendEmail.py",
        `${em}`,
        `${reportDict["Low environment issue"]}`,
        `${reportDict["Application issue"]}`,
        `${reportDict["Reports"]}`,
        `${reportDict["Connection"]}`,
        `${reportDict["Smurf Alert"]}`,
        `${reportDict["Security"]}`,
      ]);

      // collect data from script
      python.stdout.on("data", function (data) {
        console.log("Pipe data from python script ...");
        dataToSend = data.toString();
      });
      // in close event we are sure that stream from child process is closed
      python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend);
      });
    }
  );
});

app.listen(3001, () => {
  console.log("Server running successfully on 3001");
});
