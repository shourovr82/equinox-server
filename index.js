const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 9999;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ikwqeh8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const postsCollections = client.db('equinox').collection('allPosts');
    const logCollections = client.db('equinox').collection('logConnections');





    app.post('/poststatus', async (req, res) => {
      const newpost = req.body;
      logCollections.findOne({}, function (err, result) {
        if (err) throw err;
        const old = parseInt(result.logConnections);
        const query = {};
        const update = { $set: { logConnections: old + 1 } };
        const options = { upsert: true };
        logCollections.updateOne(query, update, options);

      });

      const result = await postsCollections.insertOne(newpost)
      res.send(result);
    })

    app.get('/getlogconnections', async (req, res) => {
      const query = {};
      const newLog = await logCollections.find(query).toArray();
      res.send(newLog);
    })


    app.get('/getallposts', async (req, res) => {
      const query = {};
      const result = await postsCollections.find(query).toArray();
      const sortedPosts = (result.sort((a, b) => new Date(b.date) - new Date(a.date)));
      res.send(sortedPosts);
    })

    //  delete post
    app.delete('/deletepost/:id', async (req, res) => {
      const postId = req.params.id;
      // console.log(postId)
      const query = {
        _id: ObjectId(postId)
      }
      const result = await postsCollections.deleteOne(query);
      res.send(result)
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
