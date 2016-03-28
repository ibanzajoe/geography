var mongoose = require('mongoose');

var newEntrySchema = new mongoose.Schema({
  country: {type: String},
  maps: {type: String},
  general: {
    demographics: {type: String},
    bigCity: {type: String},
    bigBusiness: {type: String}
  },
  environment: {
    climate: {type: String},
    transportation: {type: String},
    waterCost: {type: String},
    disease: {type: String}
  },
  business: {
    realEstate: {type: String},
    importExport: {type: String},
    product: {type: String},
    vacation: {type: String}
  },
  miscImages: [],
  date: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('newEntry', newEntrySchema)