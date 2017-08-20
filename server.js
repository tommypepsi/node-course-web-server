const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to sever.log');
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) =>{
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fullfill this request'
    });
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio page',
        message: 'This is the portfolio page'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});