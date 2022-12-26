const express = require("express");
const cors = require("cors")

const mongoose = require("mongoose")
const url = "mongodb://localhost:27017/NexStore";
const Schema = mongoose.Schema

const NexStoreSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

app.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        await mongoose.connect(url)
        const NexRadioModel = mongoose.model("Registration", NexStoreSchema)
        const checkData= await NexRadioModel.find({email: req.body.email})
        if (checkData.length!==0) {
            console.log("Already Registered")
            return res.send("User Already Registered")
        }
        const insertData = new NexRadioModel(req.body);
        await insertData.save()
        res.send("User Register Successfully")
    }
    catch (error) {
        console.log(error);
    }

});

module.exports = app;

