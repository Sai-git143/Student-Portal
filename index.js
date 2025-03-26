var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt
const cors = require('cors'); // Import cors

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/ccdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to the database"));
db.once('open', () => console.log("Connected to database"));

app.post("/signup", async (req, res) => {
    try {
        console.log("Signup request received:", req.body); // Log the request body

        const pass = req.body.password;
        const cpass = req.body.cpassword;

        console.log("Passwords:", pass, cpass); // Log the passwords

        if (pass !== cpass) {
            console.log("Passwords do not match!");
            return res.status(400).send("Passwords do not match"); // 400 Bad Request
        }

        var name = req.body.name;
        var semail = req.body.email;
        var address = req.body.address;
        var number = req.body.number;
        var spassword = req.body.password;

        console.log("Email:", semail); // Log the email

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email: semail });
        if (existingUser) {
            console.log("Email already registered!");
            return res.status(409).send("The email is already registered"); // 409 Conflict
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(spassword, 10);

        var signupdata = {
            name: name,
            email: semail,
            address: address,
            number: number,
            password: hashedPassword,
        };

        await db.collection('users').insertOne(signupdata); // Use await here
        console.log("Record inserted");
        return res.redirect("login.html");

    } catch (error) {
        console.error("Signup error:", error); // Log the full error
        if (error.code === 11000) { // Duplicate key error code from MongoDB
            console.log("Duplicate key error!");
            return res.status(409).send("The email is already registered");
        } else {
            console.error("Error during signup:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
});


// ... (other code) ...

app.post("/login", async (req, res) => {
    try {
        const email = req.body.lmail;
        const password = req.body.lpassword;

        const user = await db.collection('users').findOne({ email: email });

        if (!user) {
            return res.status(401).send("Invalid Mail Id");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Construct the redirect URL with user data
            const redirectUrl = `Home.html?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&address=${encodeURIComponent(user.address)}&number=${encodeURIComponent(user.number)}`;
            return res.status(200).send(redirectUrl); // Send the redirect URL in the response body with 200 status code
        } else {
            return res.status(401).send("Invalid password"); // Return 401 status code
        }
    } catch (error) {
        return res.status(500).send("Server Error"); // Return 500 status code for other errors
    }
});

// ... (rest of your code) ...



app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect("signup.html");
}).listen(3000);

app.get("/signup", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect("signup.html");
});

app.get("/login", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect("login.html");
});


console.log("Listening on port 3000");
