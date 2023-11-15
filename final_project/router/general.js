const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Se requieren nombre de usuario y contraseña." });
  }

  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: "El nombre de usuario ya existe." });
  }
  users.push({ username, password });

  return res.status(201).json({ message: "Usuario registrado exitosamente." });
});
  

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let promise = new Promise((resolve, reject)=>{
        setTimeout(() => {
            res.send(JSON.stringify(books,null,4));
        }, 3000)})
        console.log("Before calling")
        promise.then((succes)=>{
            console.log("succes")
        })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn
    let promise = new Promise((resolve, reject)=>{
        setTimeout(() => {
            if(!isbn || typeof books[isbn] === "undefined"){
                res.status(400).send("ISBN not found")
            } else {
                res.send(books[isbn])
            }
            res.send(books[isbn])
        }, 3000)})
        console.log("Before calling")
        promise.then((succes)=>{
            console.log("succes")
        })
  
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const authorId = parseInt(author);
    let promise = new Promise((resolve, reject)=>{
        setTimeout(() => {
            res.send(books[author].author);
        }, 3000)})
        console.log("Before calling")
        promise.then((succes)=>{
            console.log("succes")
        })
    
  });
  
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const titleId = parseInt(title);

  let promise = new Promise((resolve, reject)=>{
    setTimeout(() => {
        res.send(books[titleId].title);  
    }, 3000)})
    console.log("Before calling")
    promise.then((succes)=>{
        console.log("succes")
    })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (typeof books[isbn] === 'undefined') {
      res.status(404).send('Libro no encontrado');
    } else {
      const reviews = books[isbn].reviews;
      if (Object.keys(reviews).length === 0) {
        res.send('No reviews for this book');
      } else {
        res.send(reviews);
      }
    }
  });
  

module.exports.general = public_users;
