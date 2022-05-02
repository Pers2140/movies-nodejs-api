const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title:String,
    backdrop:String,
    poster:String,
    plot:String,
    release_date:String,
    average:String,
    comments:Object,
}, {timestamps:true}, {"strict":false})



// Define model
const Movie = mongoose.model('Movies',movieSchema)

module.exports = Movie

// test inserts
const testMovie = new Movie({
    title:'testTitle',
    plot:'this is a test plot for test movie'
})
testMovie.save()

