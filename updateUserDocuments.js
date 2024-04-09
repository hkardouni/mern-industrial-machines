import mongoose from "mongoose";
import User from "./api/models/user.model.js";

mongoose.connect('mongodb+srv://hkardouni:Kardouni_1364@mern-industrial-machine.hvsc3nd.mongodb.net/mern-industrial-machines?retryWrites=true&w=majority&appName=mern-industrial-machines').then(() => {
    console.log('Connected to the MongoDB')
}).catch((e) => {
    console.log(`${e} happend`);
})

User.updateMany({},
    {
        $set: {
            isAdmin: 0
        }
    }).then(result => {
        console.log(result)
        mongoose.disconnect()
    }).catch(err => {
        console.log(err);
        mongoose.disconnect()
    })