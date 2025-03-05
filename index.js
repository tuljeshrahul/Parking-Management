const express = require('express');
const app = express();
const cors = require('cors');

const port = 8080;

app.use(express.json());
app.use(cors({
    allowedHeaders : 'Content-Type',
}));

app.use('/vehicle',require('./routes'));

app.listen(port,()=>{
    console.log('server is running at port',port);
})