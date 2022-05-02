
const express = require('express');
const router = express.Router()
const {dbSearch, dbAddComment, returnAllMovies} = require('../MongoDB')


// return all movies as JSON
router.get('/',(req,res) =>{
    console.log("nuts")

    // Search for user input
    console.log(`sending all movies to user`)
    returnAllMovies().then((e) => {
        res.send(e)
    })

})

// return json based on user search term
router.get('/:movie',(req,res) =>{
    // Search for user input
    console.log(`searching for ${req.params['movie']}`)
    console.log
    dbSearch(req.params['movie']).then((result) => {
        res.send(result)
    })
})

// post comment to selected movie
router.post('/comment/',(req,res) =>{
    // Search for user input
    res.send('A post comment was made: \n'+ req.body.comment)
    console.log(`New comment has been made: \n${req.body}`)
    let comment = {
        user:req.body.user,
        comment:req.body.comment,
        rating:req.body.rating
    }
    dbAddComment(req.body.movie,comment)
})
module.exports = router
