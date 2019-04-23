'use strict';

const PORT = process.env.PORT || 3000;

const express = require('express');
const superagent = require('superagent');

const app = express();
app.use(express.static('./public')); //for the purposes of our site, public is the root folder
app.use(express.urlencoded({ extended: true }));
app.set('view-engine', 'ejs');

//===============================
// Constructor
//===============================

function Book(book) {
  this.title = book.volumeInfo.title || 'Title not found';
  this.authors = book.volumeInfo.authors || 'Could not find Author';
  this.description = book.volumeInfo.description || 'No description given.';
  this.photo = book.volumeInfo.imageLinks.thumbnail;
}

//===============================
//===============================

//superagent.get(url).then( result => {
//  new Book(result.body.items[0])
// })

app.get('/', (request, response) => {
  response.render('pages/index.ejs');
});

app.post('/searches', (request, response) => {
  const query = request.body.search;
  console.log(query);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  superagent.get(url).then(result => {
    const bookResults = result.body.items.slice(0, 10);
    console.log(bookResults.length);
  });
  response.send('Search Received');
});

// below test renders page
app.get('/test', (request, response) => {
  response.render('pages/index.ejs');
});

//===============================

app.listen(PORT, () => { console.log(`App is up on PORT ${PORT}`) });
