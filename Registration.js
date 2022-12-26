const express = require("express");
const cors = require("cors")
const bcrypt = require("bcrypt")

const mongoose = require("mongoose")
const url = "mongodb+srv://user:user@clusternexradio.i5rekcu.mongodb.net/?retryWrites=true&w=majority";
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

const app = express();
app.use(cors());
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("working")
})

app.post('/reg', async (req, res) => {
    try {
        await mongoose.connect(url)
        const NexRadioModel = mongoose.model("Registration", NexStoreSchema)
        const checkData = await NexRadioModel.find({ email: req.body.email })
        if (checkData.length !== 0) {
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


app.post('/login', async (req, res) => {
    try {
        await mongoose.connect(url)
        const NexRadioModel = mongoose.model("Registration", NexStoreSchema)
        const email = await NexRadioModel.find({ email: req.body.email })
        const pass = await NexRadioModel.find({ password: req.body.password })

        if (email.length !== 0 ) {
            console.log("Already Registered")
            return (res.send({message:"Welcome"+" "+ email[0].name,name:email[0].name,email:email[0].email,password:email[0].password}))
        }
        res.send("Wrong Credentials")
    }
    catch (error) {
        console.log(error);
    }

});

module.exports = app;