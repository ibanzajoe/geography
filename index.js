"use strict"
const app = require('./bootstrap'),
  controllers = require('./controllers'),
  models = require('./models'),
  passport = require('./config/passport')

app.use('/home', controllers.Home)
app.use('/auth', controllers.Auth)
app.use('/admin', passport.isAuthenticated, passport.isAdmin, controllers.Admin)
app.use('/user', passport.isAuthenticated, controllers.User)

app.get('/test', (req,res) => {
  res.send(req.query)
})