var express = require('express');
var router = express.Router();

var recursive = require("recursive-readdir");

/* removed this because js files need to be 
*
var scriptList = ['js/initializer.js'];
// ignore initializer
recursive("public/js", ['initializer.js'], function (err, files) {
  console.log(err);
  for (var i = files.length - 1; i >= 0; i--) {
  	scriptList.push(files[i].replace('public/',''))
  }
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  	{ 
  		title: "Tech Demo | the odonnell pub",
  		//list: scriptList
  	});
});

module.exports = router;
