// # Import section =====>
require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); // Optional: MySQL-backed session store
const mysql = require('mysql');
const database = require('./BACK-END/DATABASE/Database');
const registration = require('./BACK-END/REGISTRATION/Registration');
const login = require('./BACK-END/LOGIN/Login');
const router = express.Router();
const newEntryRoutes = require('./BACK-END/NEW-ENTRY/new-entry');
const viewContentRoute = require('./BACK-END/VIEW-CONTENT/more-details');
const search = require('./BACK-END/SEARCH/search');
const downloadProfile = require('./BACK-END/PROFILE/download-profile');
const { fetchAllData, fetchDashboardData, fetchSpecificData } = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/DASHBOARD/dashboard');
const { searchByName } = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/SEARCH/search');
// # Import section end =====>

// # Variables Section =====>
const app = express();
const static = path.join(__dirname, './static')
// # Variables Section end =====>

// # app.use Section =====>
app.use(session({
    secret: process.env.SESSION_SECRET, // Replace with a secure key
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({ // Configure MySQL as session store
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    }),
    cookie: { maxAge: 1000 * 60 * 60 } // Session valid for 1 hour
}));

// Middleware to make session accessible in views
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(express.static(static)) 
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.use(express.static(__dirname + '/static'));
app.use(registration);
app.use(login);
app.use(newEntryRoutes);
app.use(viewContentRoute);
app.use(downloadProfile);
// # app.use Section end =====>

// # app.set Section =====>
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'FRONT-END'));
// # app.set Section end =====> 

// # app.get Section =====>
app.get("/Register", (request, response) => {
    response.render("REGISTRATION/Register")
});

app.get("/Login", (request, response) => {
    response.render("LOGIN/Login")
});

app.get("/Search", (request, response) => {

    if (!request.session.user) {

        return response.redirect("http://localhost:8000");

    }

    response.render("SEARCH/Search");
});

app.get("/Dashboard", (request, response) => {
           
    if (!request.session.user) {

        return response.redirect("http://localhost:8000");

    }

    // Fetch the data for the dashboard using the new function
    fetchDashboardData((error, tableHtml) => {
        if (error) throw error;
            response.render('DASHBOARD/Dashboard', { table: tableHtml });
    });
});

app.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/Dashboard");
    } else {
        res.render("LOGIN/Login");
    }
});
app.get("/New_Entry", (request, response) => {
    response.render("NEW-ENTRY/new_entry")
});

app.get("/View-Content", (request, response) => {
    fetchAllData((error, tableHtml) => {
        if (error) throw error;
            response.render('VIEW-CONTENT/view-content', { table: tableHtml });
    });
});

app.get('/More-Details/:id', (request, response) => {
    const supplierId = request.params.id;
    fetchSpecificData(supplierId, (error, data) => {
        if (error) return response.status(500).send('Server Error');

        // Render the more-details view with the specific data
        response.render('VIEW-CONTENT/more-details', {
            id: data.id,
            company_name: data.company_name,
            telephone: data.telephone,
            cellphone: data.cellphone,
            physical_address: data.physical_address,
            description: data.description,
            postal_address: data.postal_address,
            fax: data.fax
        });
    });
});

// Route for search
app.get('/SearchQuery', (request, response) => {
    const companyName = request.query.companyName || ''; // Default to empty string if no query is provided
    searchByName(companyName, (error, tableHtml) => {
        if (error) {
            console.error('Error fetching search results:', error);
            return response.status(500).send('Server Error');
        }
        response.render('SEARCH/Search', { table: tableHtml });
    });
});


// # app.get Section end =====>

app.listen(8000, ()=> {
    console.log("\nserver started on port 8000 ==> http://localhost:8000")
});
