'use strict';
var express = require('express');
var router = express.Router();

//requires...
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sam');
var Schema = mongoose.Schema;
var multer = require('multer');
var upload = multer({
	dest: 'uploads/'
});
var fs = require('fs');
var xlsxRows = require('xlsx-rows');

//Schemas...
var Property = new Schema({
	category: {
		type: String
	},
	name: {
		type: String
	}
});

var Lead = mongoose.model('Lead', {
	content: String,
	properties: [
		Property
	]
});

//router get /

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


//post excels
router.post('/excel', upload.any(), function(req, res, next) {
	file = req.files[0];
	var uploadedFile = file.path;
	var rows = xlsxRows(uploadedFile);
	var headers;
	rows.forEach(function(row, rowIndex) {
		if (rowIndex == 0) {
			headers = row;
			return;
		}

		row.forEach(function(value, columnIndex) {

			var model = new Lead({
				content: value,
				properties: [{
					category: "column",
					name: headers[columnIndex]
				}, {
					category: "row",
					name: rowIndex + 1
				}]
			});

			model.save(function(err) {
				if (err) {}

			});

		});

	});


	// @TODO
	res.send({ ok: true, message: 'saving your leads' });

});


//get all datas
router.get('/leads', function(req, res, next) {
	Lead.find({}, function(err, result) {

		if (err) throw err;
		res.json(result);

	});
});

function randString(x) {
	var s = "";
	while (s.length < x && x > 0) {
		var r = Math.random();
		s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
	}
	return s;
}

router.get('/connected-entities/search', function(req, res, next) {
	
	var q = req.query.q;

	var results = {
		data: [],
		included: []
	};

	Lead.find({
		content: q
	}, function(err, result) {

		if (err) throw err;	
		result.forEach(function(leadInfo, index) {

			var category;
			leadInfo.properties.forEach(function (property){
				if(property.category=="column"){
					category = property.name;
				}
			});

			var tmpId = randString(40); 

			var data = {
				type: "entities",
				id: leadInfo._id,
				attributes: {
					text: leadInfo.content,
					properties: leadInfo.properties
				},
				relationships: {
					connections: {
						data: [{
							type: "connections",
							id: tmpId
						}]
					}
				}
			};
			results.data.push(data);

			Lead.find({'properties.name': category}, 'content', function(err, contents) {

				if (err) {}

				var include = {
					type:"connections",
					id: tmpId,
					attributes: {
						path: "column",
						entities: [] 
					}
				}
				include.attributes.entities = 
					contents.map(entity => entity.content);
				// contents.map(content => {
				// 	let id = content.id, text = content.content;
				// 	return { id, text };
				// });

				results.included.push(include);
				res.header("Access-Control-Allow-Origin", "*");
				res.json(results);

			});

		});
	});

});

router.get('/try', function(req, res, next) {
	res.json("good try")
});


var Absent = mongoose.model('Absent', {
	name: {
		type: String
	},
	properties: [
		Property
	]
});


router.get('/leave-tracker/search',function (req, res, next){
	var q = req.query.q;

	var results = {
		data: [],
		included: []
	};

	Absent.find({
		name: q
	},function (err, absent){
		absent.forEach(function (absentInfo, index){
			var tmpId = randString(40); 

			console.log(absentInfo);

			var data = {
			    "type": "absences",
			    "id": absentInfo._id,
			    "attributes": {
			      "name": absentInfo.name,
			      "properties": absentInfo.properties
			  	},
			    "relationships": {
			      "similarities": {
			        "data": [{
			          "type": "similarities", "id": tmpId
			        }]
			      }
			    }
			  };

			 results.data.push(data);

			 Absent.find({}, 'name', function(err, names) {

				if (err) {throw err;}

				var include = {
					type:"similarities",
					id: tmpId,
					attributes: {
						path: "startDate",
						entities: [] 
					}
				};
				
				names.forEach(function (name, index){
					include.attributes.entities.push(name.name);
				});

				results.included.push(include);
				res.json(results);

			});

		});
	});

});

router.get('/absent/add',function (req, res, next){

	var model = new Absent({
		name: "Arjun Yonjan",
		properties:[
			{
				category: "startDate",
				"name": new Date('March 25 2016')
			},
			{
				category: "end Date",
				"name": new Date('March 30 2016')
			}
		]
	});
	
	model.save(function(err) {
		if (err) {
	
		}
		res.json({
			success: true
		});
	
	});

});

module.exports = router;