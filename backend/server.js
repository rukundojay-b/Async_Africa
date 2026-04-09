const express = require("express");
// CHANGE THIS LINE: Use /promise
const mysql = require("mysql2/promise"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

<<<<<<< HEAD

// Bring in the tools we need
const express = require("express"); // To create the API server
const mysql = require("mysql2"); // To talk to our database
const jwt = require("jsonwebtoken"); // To create security tokens
const bcrypt = require("bcryptjs"); // To hash (hide) passwords
const cors = require("cors"); 
=======
const app = express();
app.use(express.json());
app.use(cors());
>>>>>>> c46d2f09f7d9d80766c965363450bbda596a55fe

const SECRET = 'mysecretkey';
const PORT = 3000;

// CHANGE THIS: Use createPool (better for async) instead of createConnection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", 
    database: "my_signup",
    // waitForConnections: false,
    // connectionLimit: 0,
    // queueLimit: 0
});

// Note: With createPool, you don't need db.connect(). 
// It connects automatically when the first query runs.

// 2. Signup Route
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // This will now work because 'db' is from mysql2/promise
        const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (existing.length > 0) {
            return res.status(409).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error("BACKEND ERROR:", err.message);
        res.status(500).json({ error: "Database error: " + err.message });
    }
});

// 3. Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, user: { name: user.name, email: user.email } });

    } catch (err) {
        console.error("LOGIN ERROR:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));





