require("dotenv").config({ path: "./config.env" });
var path = require('path');
const express = require("express");
const connectDB = require("./config/db");
var mongoose = require('mongoose');
//const postRoutes = require("./routes/postRoutes");

connectDB();

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author"],
    },
    body: {
      type: String,
      required: [true, "Please provide a body"],
    },
  });
  
const Posty = mongoose.model("Postycarv", postSchema);


const app = express();

app.use(express.json());

//app.use("/api/v1/posts", postRoutes);

// Routes 
app.get('/api', function(req,res){
    // database data send to api url as json data    
        Posty.find({
    
        }).then( function(data){return(res.json(data))} )
        .catch(function(err){console.log(err)})
    
} )

app.post('/data',function(req,res){
    console.log('Message:'+ JSON.stringify(req.body) );

    var data = req.body
    var ins = new Posty(data)

    ins.save(function(err){
        if(err){
            console.log('Error')
        }else{
            res.json({
                message:'data saved to db'
            })
        }
    })

   
} )

if(process.env.NODE_ENV==='production'){
    app.use(express.static( path.join(__dirname,'/client/build' ) ))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html' ))
    })
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
