const DATABASE_URL = require("dotenv").config();
//create the client class
const { MongoClient } = require("mongodb");
// URI for Mongo database
const uri = process.env.DATABASE_URL;

// Query Mongo DB for movie details
async function dbSearch(searchTerm) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("MoviesDB");
    console.log(`Connected to database ${db.databaseName}`);

    const movies = db.collection("Movies");
    const movieslist = await movies.find({
      title: { $regex: searchTerm, $options: "$is" },
    });
    return await movieslist.toArray();
  } catch (ex) {
    console.error(`Something bad happend ${ex}`);
  } finally {
    client.close();
  }
}
// add comment to specified movie
async function dbAddComment(movie, comment) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("MoviesDB");
    console.log(`Connected to database ${db.databaseName}`);
    const movies = db.collection("Movies");

    // get previous comments
    const prevComments = await movies.findOne({ title: movie }).then((e) => {
      return e.comments;
    });
    // concatanate previous comments and incoming comment then store in new array
    var newComments = prevComments.concat(comment);
    console.log(comment);
    await movies.updateOne(
      { title: movie },
      { $set: { comments: newComments } }
    );
  } catch (ex) {
    console.error(`Could not update comments ${ex}`);
  } finally {
    client.close();
  }
}
// Return all movies as JSON
async function returnAllMovies(movie, comment) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("MoviesDB");
    console.log(`Connected to database ${db.databaseName}`);

    const movies = db.collection("Movies");
    const movieslist = await movies.find();
    return await movieslist.toArray();
  } catch (ex) {
    console.error(`Something bad happend ${ex}`);
  } finally {
    client.close();
  }
}
// returnAllMovies().then(e => console.log(e))
module.exports.returnAllMovies = returnAllMovies;
module.exports.dbSearch = dbSearch;
module.exports.dbAddComment = dbAddComment;

// Reference

// dbAddComment("The Grudge",{name:"Darius",comment:"shit finally works"})
// collections.forEach(c=>console.log(c));
//get all collections and list them out
// const collections = await db.collections();

// const employees = db.collection("Movies");
// const searchCursor = await employees.find({"title": "/A/"});
// const result = await searchCursor.toArray();
// console.log(result)
//console.log(await searchCursor.hasNext());
/*
while (await searchCursor.hasNext()){
    console.log(await searchCursor.next())
}*/

//Insert into the collection
/*
const insertCursor = await employees.insertMany([
    {
        "name": "Will",
        "ssn": 999
    },
    {
        "name": "Anna",
        "ssn": 998
    }
])
console.log(insertCursor.insertedCount)
*/
/*
const updateCursor =  await employees.updateOne(
    {"name": "Will"},
    {"$set": {"DOB": "9-9-1970"}}
    )
    console.log(updateCursor.modifiedCount);
    */

//    const deleteCursor =  await employees.deleteOne(
//         {"ssn": 998}
//         )

//    console.log(deleteCursor.deletedCount);
