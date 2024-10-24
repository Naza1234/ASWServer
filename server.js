const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: 'https://americansave.pro',
  // origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/image", express.static("./image"));

// Import all routes
const DepositRoutes = require('./routes/DepositRoutes');
const HistoryRoutes = require('./routes/HistoryRoutes');
const MessageRoutes = require('./routes/MessageRoutes');
const TagRoutes = require('./routes/TagRoutes');
const UserRoutes = require('./routes/UserRoutes');
const WithDrawalRoutes = require('./routes/WithDrawalRoutes');
const ChatRoutes = require('./routes/chatRoutes');




// Use the routes
app.use('/deposit', DepositRoutes);
app.use('/history', HistoryRoutes);
app.use('/message', MessageRoutes);
app.use('/tag', TagRoutes);
app.use('/user', UserRoutes);
app.use('/withDrawal', WithDrawalRoutes);
app.use('/chat', ChatRoutes);



// ASwebServer
// 9HWOiBm9bH61AQ4T
const url = "mongodb+srv://ASwebServer:9HWOiBm9bH61AQ4T@cluster0.uyajvgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 4000;

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to the database');
    app.use("/",(req,res)=>{
        res.end('origin')
      })
    app.listen(port, () => {
      console.log(`Server is now running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });