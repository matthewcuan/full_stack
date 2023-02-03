import dotenv from 'dotenv'
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient
const mongo_username = process.env.FCC_MONGO_ID
const mongo_password = process.env.FCC_MONGO_KEY
console.log("username=" + mongo_username + " pass=" + mongo_password)
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.vj272ja.mongodb.net/?retryWrites=true&w=majority`

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
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})

