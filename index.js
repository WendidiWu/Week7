process.env.API-KEY
process.env.MONGODB-URL

//install and load lowdb
//let express = require('express');
import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
let app = express();

//connect to the DB
const defaultData = { emojiTrackerData:[] };
const adapter = new JSONFile ('db.json');
const db = new Low(adapter, defaultData);


app.use(express.json());

let emojiTracker = [];
// app.get('/', (req, res)=>{
//     res.send('this is the main page');
// })

app.post('/userEmojis', (req,res)=>{
    console.log(req.body);
    let currentDate = Date();
    let obj ={
        date: currentDate,
        emoji:req.body
    }
    
    // emojiTracker.push(obj);
    // console.log(emojiTracker);

    //add value to the DB
    db.data.emojiTrackerData.push(obj);
    db.write()
    .then(() => {
        res.json({task:"success"});
    })
})

app.use('/', express.static('public'));

let port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('listening at ', port);
})

app.get('/getEmojis', (req,res)=>{
    //let obj ={data: emojiTracker};

    //fetch from the DB
    db.read()
    .then(() =>{
        let obj = {data: db.data.emojiTrackerData}
        res.json(obj);
    })

})