const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const Campground = require("./models/campground")
const methodOverride = require("method-override")
const campground = require("./models/campground")

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

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render("campgrounds/index", { campgrounds })
})

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})

app.post("/campgrounds", async (req, res) => {
    const newCampground = new Campground(req.body.campground)
    await newCampground.save()
    res.redirect(`/campgrounds/${newCampground._id}`)
})

app.get("/campgrounds/:id/edit", async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    res.render("campgrounds/edit", { campground })
})

app.put("/campgrounds/:id", async (req, res) => {
    const { id } = req.params
    const UpdatedCamp = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${id}`)
})

app.get("/campgrounds/:id", async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    res.render("campgrounds/show", { campground })
})


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})