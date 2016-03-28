const router = require('express').Router();
var User = require('../models/User');
var Entry = require('../models/newEntry');

router.get('/', function(req,res){
  Entry.findOne().sort({date: -1}).exec( function(err, entry){
    console.log("this is the most recent entry: ", entry);
    res.render('home', {
      e: entry
    })
  })
})

router.get('/thisWeek', function(req,res){
  console.log("did this load?")
  Entry.findOne().sort({date: -1}).exec(function(err, entry){
    console.log("this is the entry: ", entry);
    res.render('home',{
      e: entry
    })
  })
})

router.get('/archive', function(req, res){
  Entry.find(function(err, entry){
    console.log("list of all the entries: ", entry);
    res.render('archive',{
      e: entry
    })
  })
})

router.get('/about', function(req, res){
  res.render('about');
})


module.exports = router