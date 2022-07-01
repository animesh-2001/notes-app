const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// let extra = ["first item", "second item", "third item"];

mongoose.connect("mongodb+srv://Admin-Animesh:Animesh123@cluster0.bvaqn.mongodb.net/haldia");
const listSchema = new mongoose.Schema({ name: String });
const list = mongoose.model("list", listSchema);
const list1 = new list({
    name: "all your notes are here"
})
const list2 = new list({
    name: "add your notes here"
})
// list.insertMany([list1, list2], (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("inserted succesfully");
//     }
// })


app.get('/', (req, res) => { 
    list.find({}, (err, result) => {
        res.render('notes', { temp: result });
    })
})
app.post('/', (req, res) => { 
    // extra.push(req.body.add);
    const temp = new list({ name: req.body.add });
    temp.save();
    res.redirect('/');
})
app.post('/delete', (req, res) => { 
    console.log(req.body.checkbox);
    const del = req.body.checkbox;
    list.findByIdAndRemove(del, (err) => { 
        if (!err) { 
            console.log("deleted succesfully");
        }
    })
    res.redirect('/');
})

app.listen('4500', (err) => { 
    if (err) {
        console.log(err);
    }
    else { 
        console.log("server is running successfully");
    }
})