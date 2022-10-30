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
const run = async () => {
  try {
    const collectionDB = client.db("simpleNode");
    const usersCollection = collectionDB.collection("users");

    app.get("/users", async (req, res) => {
      const query = {};
      const options = {};

      const cursor = usersCollection.find(query, options);
      const users = await cursor.toArray();

      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(user);
    });
  } catch (error) {
    console.error(error);
  } finally {
    // await client.close()
  }
};
run().catch(console.dir);
