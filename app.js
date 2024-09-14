const express = require('express');
const path=require('path');
const authroutes=require('./routes/authroutes');
const authcontroler=require('./controllers/authcontroller')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const dbUri='mongodb://localhost:27017/quadapp'
mongoose.connect(dbUri).then(() => {
  console.log("conneted")
}).catch((err) => {
  console.error(err);
});
setInterval(authcontroler.fetchAndStoreTickers, 5 * 60 * 1000);
authcontroler.fetchAndStoreTickers();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(authroutes);
app.listen(3001);
