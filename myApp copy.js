require('dotenv').config()
let bodyParser=require('body-parser')

let express = require('express');
let app = express();
let count = 0

console.log("Hello World")
app.use("/",(req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
app.use("/public",express.static(__dirname +"/public"))
app.use(bodyParser.urlencoded({extended: false}))


app.post('/name',(req,res)=>{
    res.json({
        name:req.body.first+" "+req.body.last
    })
})


app.get('/now',(req,res,next)=>{
    req.time=new Date().toString();
    console.log(req.time)
    next();
},(req,res)=>{
    res.json({time: req.time})
})

app.get('/:word/echo',(req,res)=>{
    res.json({
        echo: req.params.word
    })
})

app.get('/name',(req,res)=>{
    res.json({ name: `${req.query.first} ${req.query.last}`})
})

app.get("/",(req,res)=>{
    // res.send("Hello Express")
    res.sendFile(__dirname+"/views/index.html")
})

app.get("/json",(req,res)=>{
    process.env.MESSAGE_STYLE=="uppercase"?(res.json({"message": "HELLO JSON"})):(res.json({"message": "Hello json"}))
    // res.json({"message": "Hello json"})
})



































 module.exports = app;
