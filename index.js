const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middel aware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofu1w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const servicecollection = client.db("toolsManufacturer").collection("data");

    app.get("/data", async (req, res) => {
      const query = {};
      const cursor = servicecollection.find(query);
      const service = await cursor.toArray();
      res.send(service);
    });

  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("BOOK INVENTORY CRUD IS RUNNING MONGODB DATA BASE");
});
app.listen(port, () => {
  console.log("LISTING CRUD IS RUNNING", port);
});
