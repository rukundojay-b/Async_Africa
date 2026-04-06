
// Bring in the tools we need
const express = require("express"); // To create the API server
const mysql = require("mysql2"); // To talk to our database
const jwt = require("jsonwebtoken"); // To create security tokens
const bcrypt = require("bcryptjs"); // To hash (hide) passwords
const cors = require("cors"); 

const app = express(); // Initialize the express app
app.use(express.json()); // Tell the server to read JSON data from the body
app.use(cors()); // Enable CORS so the browser doesn't block requests

const SECRET = 'mysecretkey'; // The secret key used to sign the JWT token
const PORT = 3000; // The port where our backend will live

// Setup the connection details for MySQL
const db = mysql.createConnection({
    host: "localhost", // Database is on the same computer
    user: "root", // Default user for XAMPP/WAMP
    password: "", // Default password is empty
    database: "school" // The name of the database we created
});

// Try to connect to the database
db.connect((err) => {
    if(err) {
        console.log("MySQL Connection Failed", err); // Show error if connection fails
    } else {
        console.log("MySQL Connected!"); // Show success message
    }
});

// SIGNUP ROUTE
app.post("/signup", (req, res) => {
    const name = req.body.name; // Get name from frontend
    const email = req.body.email; // Get email from frontend
    const password = req.body.password; // Get password from frontend

    const checkQuery = "SELECT * FROM users WHERE email = ?"; // SQL to see if email exists
    
    db.query(checkQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" }); // 500 = Server error
        } 
        
        if (result.length > 0) {
            return res.status(409).json({ error: "Email already exists" }); // 409 = Conflict
        }

        const hashedPassword = bcrypt.hashSync(password, 10); // Encrypt the password
        const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"; // SQL to save user

        db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to create user" }); // Handle insert error
            }
            res.status(201).json({ message: "User created" }); // 201 = Successfully created
        });
    });
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
    const email = req.body.email; // Get email
    const password = req.body.password; // Get password

    const findQuery = "SELECT * FROM users WHERE email = ?"; // SQL to find the user
    
    db.query(findQuery, [email], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" }); // Handle DB error

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" }); // 404 = Not found
        }

        const user = result[0]; // Get the specific user data
        const isMatch = bcrypt.compareSync(password, user.password); // Compare typed pass with hashed pass

        if (isMatch === false) {
            return res.status(401).json({ error: "Invalid password" }); // 401 = Unauthorized
        }

        const payload = { id: user.id, email: user.email }; // Data to put inside the token
        const token = jwt.sign(payload, SECRET, { expiresIn: '1d' }); // Create token for 1 day

        res.status(200).json({ token: token, user: user }); // 200 = OK (Success)
    });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`)); // Start the server