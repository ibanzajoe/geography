const express = require('express'),
  mongoose = require('mongoose'),
  config = require('./config'),
  path = require('path'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoStore = require('connect-mongostore')(session),
  flash = require('express-flash'),
  multer = require('multer'),
  upload = multer({ dest: path.join(__dirname, 'uploads') }),
  expressValidator = require('express-validator'),
  cookieParser = require('cookie-parser'),
  moment = require('moment')


/*connect to mongodb */
console.log(config.mongodb)
mongoose.connect(config.mongodb)
mongoose.connection.on('error', function(){
  console.log('Mongodb connection error')
  process.exit(1)
})

/* configure application */
const app = express()
app.set('view engine', 'jade');
app.locals.pretty = true
app.locals.moment = moment

// listen on config port, default 3000
app.listen(config.port, function(e){
  console.log('listening on', config.port)
})

//specify public static directory
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret,
  store: new MongoStore({'db': 'sessions'})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req,res,next) => {
  res.locals.user = req.user
  next()
})

/*
Ask and Set email for social login
 */
app.use( function(req,res,next){
  console.log(req.path, req.user)
  if(!req.user || !req.user.askEmail || req.path == '/askEmail') return next()
  console.log('redirecting for email')
  return res.redirect('/askEmail')
})

app.get( '/askEmail', function(req,res){
  res.render('askEmail')
})

app.post('/askEmail', function(req,res){
  console.log("POST EMAIL")
  req.assert('email', 'Email is not valid').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    console.log('error', errors)
    req.flash('errors', errors);
    return res.redirect('/askEmail');
  }

  const body = req.body

  req.user.askEmail = false
  req.user.email = body.email
  req.user.save( function(err, saved){
    console.log(err, saved)
    res.redirect('/')
  })
})


module.exports = app