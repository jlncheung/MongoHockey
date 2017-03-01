var express = require('express');
var app = express();
var mongojs= require('mongojs');
// var db = mongojs('canucksScore', ['canucksScore']); //for local host mongodb
var db = mongojs(process.env.MONGOLAB_URI || 'mongodb://heroku_s6qkj8dh:jvvrg70ahjl4p1qutcpq4mksvc@ds143737.mlab.com:43737/heroku_s6qkj8dh', ['canucksScore']);//for heroku
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/canucksScore',function(req,res){
	console.log("I received a GET request");

	db.canucksScore.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/canucksScore', function(req,res){
	console.log(req.body);
	db.canucksScore.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/canucksScore/:id',function(req,res){
	var id= req.params.id;
	console.log(id);
	db.canucksScore.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/canucksScore/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.canucksScore.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/canucksScore/:id', function(req,res){
	var id = req.params.id;
	console.log(req.body.date);
	db.canucksScore.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update:{$set: {date: req.body.date, team: req.body.team, goals: req.body.goals, goalsA: req.body.goalsA}},
		new:true}, function(err,doc){
			res.json(doc);
		});
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

//for localhost
// app.listen(3000);
// console.log('app running on 3000');
