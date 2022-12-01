const express =require("express");
const app=express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/musicDance', {useNewUrlParser: true});
const port=8000;
const contactSchema = new mongoose.Schema({
    Name: String,
    email: String,
    password: String
  });
  const Contact = mongoose.model('Contact', contactSchema);
const path=require("path");
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
app.get('/', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
     const params = {}
     res.status(200).render('login.pug', params);
 })
 app.get("/signin", (req, res)=>{ 
    const params = {}
    res.status(200).render('signin.pug', params);
});
app.get("/index", (req, res)=>{ 
    const params = {}
    res.status(200).render('index.pug', params);
});

app.post("/signin", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("okay");})
});
 app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});