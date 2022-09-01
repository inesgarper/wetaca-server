import mongoose from "mongoose"

// const MONGODB_URI = process.env.MONGODB_URI

// mongoose.connect(MONGODB_URI, {
//     useNewParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// })
mongoose.connect('mongodb://localhost/wetaca')
    .then((x) => {
        console.log(`Connected to MongoDB! Database name: ${x.connections[0].name}`)
    })
    .catch(error => {
        console.log('Error connection to MongoDB', error)
    })

