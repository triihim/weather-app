const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const host = process.env.HOST;

app.use(bodyParser.json())

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", host);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('dist'));

app.get('/', (req, res) => {
	res.send('index.html');
});

app.get('/api/:obspoint', (req, res) => {
	MongoClient.connect(MONGO_URL, (err, db) => {  
		if (err) {
			console.error(err);
		} else {
			let dbo = db.db('weather-app');
			const obspoint = req.params.obspoint.toLowerCase();
			let query;

			(obspoint === 'all') ? query = {} : query = { name: obspoint };
			
			dbo.collection('observationPoints').find(query).sort({ name: 1 }).toArray((err, result) => {
				res.send(result);
			});
		}
		db.close();
	});
});

app.post('/api/:obspoint', (req, res) => {
	MongoClient.connect(MONGO_URL, (err, db) => {  
		if (err) {
			console.error(err);
		} else {
			let obsPointID = req.body.obsPointID;
			let temperature = req.body.temperature;
			let dateTime = new Date().toISOString();

			let record = { temperature: temperature, dateTime: dateTime }
			
			let dbo = db.db('weather-app');
			dbo.collection('observationPoints').update(
				{ _id: ObjectId(obsPointID) },
				{ $push: { observations: { $each: [record], $position: 0 } } },
				(err) => {
					if (err) {
						console.log(err);
					}
				}
			)

		}
		res.end('{"success" : "Updated Successfully", "status" : 200}');
		db.close();
	});
});


const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log('Server running on port ' + port);
});
