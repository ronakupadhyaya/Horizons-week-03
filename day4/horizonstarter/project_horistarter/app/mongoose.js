var mongoose = require('mongoose');

mongoose.db = mongoose.createConnection('mongodb://barryallen:reverseflash123@olympia.modulusmongo.net:27017/Bibe5hev');
module.exports = mongoose;