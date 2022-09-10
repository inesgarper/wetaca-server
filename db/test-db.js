import mongoose from "mongoose"

mongoose.connect('mongodb://localhost/wetacaTest')
    .then((x) => {
        console.log(`Connected to MongoDB! Database name: ${x.connections[0].name}`)
    })
    .catch(error => {
        console.log('Error connection to MongoDB', error)
    })