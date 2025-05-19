const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const useroute = require('./router/useroute');

const app = express();
const port = 3000;
const URL = 'mongodb+srv://kjajaykumar8307:password8307@cluster0.jhhdre3.mongodb.net/Users?retryWrites=true&w=majority';
app.use(cors());
app.use(express.json());

mongoose.connect(URL)
.then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((err) => {
    console.log("MongoDB Connection Failed", err);
});

app.use('/api/v1/user', useroute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});