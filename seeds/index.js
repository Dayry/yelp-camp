const mongoose = require("mongoose")
const Campground = require("../models/campground")
const cities = require("./cities")
const { places, descriptions } = require('./seedhelper')

mongoose.connect('mongodb://192.168.1.75:27017/yelp-camp')

const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB Connection error:"))
db.once("open", () => {
    console.log("MongoDB connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})

    for (let i = 0; i < 50; i++) {
        const randCityNum = Math.floor(Math.random() * 1000)
        const campground = new Campground({
            title: `${sample(descriptions)} ${sample(places)}`,
            location: `${cities[randCityNum].city}, ${cities[randCityNum].state}`
        })
        await campground.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})