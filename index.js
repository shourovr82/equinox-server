const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 9999;

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://<username>:<password>@cluster0.ikwqeh8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const postsCollections = client.db('equinox').collection('allPosts')


    app.post('/poststatus', async (req, res) => {
      const newpost = req.body;
      console.log(newpost)
      // const result = await postsCollections.insertOne(newpost)
      // res.send(result);
    })


  }
  finally {

  }
}
run();
























// routes
app.get('/', (req, res) => {
  res.send('Equinox server is running!');
});

app.listen(port, () => {
  console.log(`Equinox server listening on port ${port}`);
});
