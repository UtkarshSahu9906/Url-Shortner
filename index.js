const express = require("express");
const app = express();
const urlRoute = require('./routes/url');
const {handleGivenId} = require('./controllers/url');
const{connectMongoDB} = require("./connection");


connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>{console.log("mongodb Connected!")
});

app.use(express.json());
app.use('/url', urlRoute);
app.get('/:shortId',handleGivenId);





const PORT = 8001;
app.listen(PORT,()=>console.log(`Server Started at Port ${PORT}`));


