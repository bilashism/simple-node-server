const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
const users = [
  {
    id: 1,
    name: "Antonia Michel",
    email: "antonia@fake.com"
  },
  {
    id: 2,
    name: "Joline Sommer",
    email: "aoline@fake.com"
  },
  {
    id: 3,
    name: "Dina Steigauf",
    email: "aina@fake.com"
  },
  {
    id: 4,
    name: "Annie Spank",
    email: "annie@fake.com"
  }
];

app.listen(port, () => console.log(`Running on: ${port}`));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const uri = `${process.env.URI}`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
client.connect(err => {
  const collection = client.db("simple-node").collection("users");
  // perform actions on the collection object
  console.log("db connected");
  client.close();
});

app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = String(req.query.name).toLowerCase();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(search)
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(users);
  res.send(user);
});
