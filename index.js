const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const Campground = require("./models/campground")

mongoose.connect('mongodb://192.168.1.75:27017/yelp-camp')

const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB Connection error:"))
db.once("open", () => {
    console.log("MongoDB connected")
})

const app = express()
const port = 3000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/makecampground", async (req, res) => {
    const camp = new Campground({
        title: "My Backyard"
    })
    await camp.save()
    res.send(camp)
})


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})