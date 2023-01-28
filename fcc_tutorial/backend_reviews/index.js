process.env.USER_ID; // "matthew"
process.env.USER_KEY; // "cuan"

import app from "./server.js"
import mongodb from "mongodb";
// import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['USER_ID']
const mongo_password = process.env['USER_KEY']
// const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.vj272ja.mongodb.net/?retryWrites=true&w=majority`

// console.log(`Your USER_ID is ${process.env.USER_ID} and your USER_KEY is ${process.env.USER_KEY}`)
const uri = `mongodb+srv://matthew:cuan@cluster0.vj272ja.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client=> {
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})

