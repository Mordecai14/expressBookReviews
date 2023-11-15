const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username": "devman", "password": "123"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Se requieren nombre de usuario y contraseña." });
  }
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' }); // Puedes cambiar 'secret_key' a tu clave secreta real

    return res.status(200).json({ message: "Login sucessfull!!", token });
  } else {
    return res.status(401).json({ message: "WRONG!" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.query;
    const { username } = req.query;

    if (!review) {
      return res.status(400).json({ message: "A review is required to add or modify." });
    }

    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found." });
    }
    if (books[isbn].reviews && books[isbn].reviews[username]) {
      books[isbn].reviews[username] = review;
    } else {
      if (!books[isbn].reviews) {
        books[isbn].reviews = {};
      }
      books[isbn].reviews[username] = review;
    }
  
    return res.status(200).json({ message: "Review added or modified successfully." });
  });


  regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { username } = req.query;
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found." });
    }
    if (books[isbn].reviews && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        return res.status(200).json({ message: "Review deleted successfully." });
    } else {
        return res.status(400).json({ message: "Something wrong" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
