const router = require('express').Router();
var User = require('../models/User');
var Entry = require('../models/newEntry');

router.get('/account/:_id', function(req,res){
  var id = req.params._id;
  console.log("this is the id: ", id);
  User.findOne( {_id: id}, function(err, user){
    console.log("show me test@test.com", user);
    res.render('admin/user', {
      user: user
    })
  })
})

router.get('/newEntry/', function(req,res){
  res.render('admin/newEntry')
})

router.post('/saveEntry/', function(req,res){
  var body = req.body;
  var image = [];
  image.push(body.image1);
  image.push(body.image2);
  image.push(body.image3);
  console.log("this should give me three links: ", image);
  console.log("this is what was posted by the form: ", body)
  Entry.findOne({_id: body._id}, function(err, entry){
    if(entry){
      entry.country=body.country;
      entry.maps=body.maps;
      entry.general.demographics=body.demographics;
      entry.general.bigCity=body.bigCity;
      entry.general.bigBusiness=body.bigBusiness;
      entry.environment.climate=body.climate;
      entry.environment.transportation=body.transportation;
      entry.environment.waterCost=body.waterCost;
      entry.environment.disease=body.disease;
      entry.business.realEstate=body.realEstate;
      entry.business.importExport=body.importExport;
      entry.business.product=body.product;
      entry.business.vacation=body.vacation;
      entry.miscImages=image;
      entry.save(function(err, saved){
        if(err) console.log(err, "why the fuck is this happening?")
        res.redirect('/user/listings');
      })
    }else{
      var entry = new Entry({
        country: body.country,
        maps: body.maps,
        general:{
          demographics: body.demographics,
          bigCity: body.bigCity,
          bigBusiness: body.bigBusiness,
          climate: body.climate,
        },
        environment: {
          transportation: body.transportation,
          waterCost: body.waterCost,
          disease: body.disease,
        },
        business: {
          realEstate: body.realEstate,
          importExport: body.importExport,
          product: body.product,
          vacation: body.vacation,
        },
        miscImages: image
      })
      entry.save(function(err, saved){
        if(err) console.log(err, "why the fuck?")
        console.log(saved);
        res.redirect('/user/listings');
      })
    }
  })
})

router.get('/listings', function(req,res){
  Entry.find(function(err, entry){
    console.log("this is the list of entries: ", entry);
    res.render('admin/listings', {
      e: entry
    })
  })
})

router.get('/editEntry/:id', function(req,res){
  var id = req.params.id
  console.log("this is the id that we will search for: ", id)
  Entry.findOne({_id: id}, function(err, entry){
    res.render('admin/editEntry',{
      e: entry
    })
  })
})

module.exports = router