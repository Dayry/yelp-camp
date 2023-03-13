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
        const price = Math.floor(Math.random() * 20) + 10
        const campground = new Campground({
            title: `${sample(descriptions)} ${sample(places)}`,
            location: `${cities[randCityNum].city}, ${cities[randCityNum].state}`,
            image: "https://images.unsplash.com/photo-1475518845976-0fd87b7e4e5d?\
                crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218M\
                Hw0ODQzNTF8fHx8fHx8MTY3ODY2NDM3Nw&ixlib=rb-4.0.3&q=80&utm_campaign=\
                api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. \
                Placeat ullam laboriosam tempore at, veritatis voluptatem id repellendus \
                perspiciatis ipsam, fugit in dignissimos cupiditate recusandae reiciendis \
                quo eius, quia quasi facere?",
            price
        })
        await campground.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})