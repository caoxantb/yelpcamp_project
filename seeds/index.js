const mongoose = require('mongoose');
const cities = require("./cities");
const {
    places,
    descriptors
} = require("./seedHelpers");
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; ++i) {
        const randomCities = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6002e3f958eaa266b4c1034d",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[randomCities].city}, ${cities[randomCities].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomCities].longitude,
                    cities[randomCities].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/caoxantb/image/upload/v1611010036/YelpCamp/zpqhqyrjzkz017qnzmmp.jpg',
                    filename: 'YelpCamp/zpqhqyrjzkz017qnzmmp'
                },
                {
                    url: 'https://res.cloudinary.com/caoxantb/image/upload/v1611010037/YelpCamp/fhz0smepxptkpiezeny5.png',
                    filename: 'YelpCamp/fhz0smepxptkpiezeny5'
                },
                {
                    url: 'https://res.cloudinary.com/caoxantb/image/upload/v1611010038/YelpCamp/mwjoc8gc09up6ao4tldb.jpg',
                    filename: 'YelpCamp/mwjoc8gc09up6ao4tldb'
                }
            ],
            price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ducimus iure rerum non recusandae blanditiis soluta at expedita quod est? Aliquid dolores quae laboriosam earum necessitatibus repellat, ullam fuga possimus.'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});