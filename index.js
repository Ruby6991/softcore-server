const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

// express app
const app = express();
app.use(cors());

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://new-user:test1234@softcore.crid2.mongodb.net/softcoredb?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

//to be able to access request body data
app.use(express.json());

//user routes
app.use('/users', userRoutes);
