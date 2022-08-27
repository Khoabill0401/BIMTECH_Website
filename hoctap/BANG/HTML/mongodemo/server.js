const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://Uchiha_Obito:bang112001@cluster0.aqykuwf.mongodb.net/test", {useNewUrlParser: true}, {useUnifiedTopology: true}) 

//tao luoc do du lieu (create a data schema)
const noteSchema = {
    name: String,
    sdt: Number,
    email: String,
    password: String,
    class: String,
    yourself: String,
    gender: String
}

const Note = mongoose.model("Note", noteSchema);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    let newNote = new Note({
        name: req.body.name,
        sdt: req.body.sdt,
        email: req.body.email,
        password: req.body.password,
        class: req.body.class,
        yourself: req.body.yourself,
        gender: req.body.gender,
    })
    newNote.save();
    res.redirect('/');
})

app.listen(3000, function() {
    console.log("server is running on 3000")
})