var level = require('level');  
var path = require('path');

var dbPath = process.env.DB_PATH || path.join(__dirname, 'queryDB');  
var db = level(dbPath);

module.exports = db; 