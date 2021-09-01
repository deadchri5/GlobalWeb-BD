const express = require('express');
const cors = require('cors');
const session = require('express-session');

// initializations
const app = express();

//sesión
const sessionStore = require('./lib/sessions');
app.use(session({
    key: 'cookie_usuario',
    secret: 'drum doggo',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
  }));

//settings
app.set('port', process.env.PORT || 4000);
app.use(express.json());

// CORS
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

//Middlewares
app.use(express.urlencoded({ extended: false }));

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/user'));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});