const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

const users = [
  {
    id: "edb217a8-d834-4995-9d5a-8f66d751ce4e",
    name: "Antonia Michel",
    email: "antonia@fake.com"
  },
  {
    id: "084e92d6-5a73-4890-a9db-177fd96408de",
    name: "Joline Sommer",
    email: "aoline@fake.com"
  },
  {
    id: "8a6704b4-549d-4d5c-a689-f037494ae13c",
    name: "Dina Steigauf",
    email: "aina@fake.com"
  },
  {
    id: "dd3e46b6-4930-4b58-812c-a367116098c8",
    name: "Annie Spank",
    email: "annie@fake.com"
  }
];

app.listen(port, () => console.log(`Running on: ${port}`));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users", (req, res) => {
  res.send(users);
});
