const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qcofh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('toolsManufacturer').collection('data');


    app.get('/data', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get('/data/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const service = serviceCollection.findOne(query);
      res.send( service);
    });

    // app.get('/booking', async(req, res) =>{
    //   const patient = req.query.patient;
    //   const query = {patient: patient};
    //   const bookings = await bookingCollection.find(query).toArray();
    //   res.send(bookings);
    // })

    // app.post('/booking', async (req, res) => {
    //   const booking = req.body;
    //   const query = { treatment: booking.treatment, date: booking.date, patient: booking.patient }
    //   const exists = await bookingCollection.findOne(query);
    //   if (exists) {
    //     return res.send({ success: false, booking: exists })
    //   }
    //   const result = await bookingCollection.insertOne(booking);
    //   return res.send({ success: true, result });
    // })

  }
  finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('MONGODB CRUD IS RUNNING')
})

app.listen(port, () => {
  console.log(`Listing toolsManufacturer is connect ${port}`)
})