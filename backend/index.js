const express=require('express');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const mongoose=require('mongoose');
const PORT=process.env.PORT;
// const cors=require('cors');
// app.use(express.json());
// app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true}));

const mongoURL=process.env.MONGO_URL;
mongoose.connect(mongoURL, 
    { useNewUrlParser: true, useUnifiedTopology: true},
    ()=>{
    console.log("Successfully connected to DB");
})

app.get('/',(req,res)=>{
    res.send("hello ");
})


app.use('/api/auth',require('./routes/auth'));
app.use('/api/poll',require('./routes/poll'));

app.listen(PORT, () => 
    console.log(`Server started on port ${PORT}`)
);