const express = require('express');
const bodyParser = require('body-parser');
const expressLogging = require('express-logging');
const logger = require('logops');


const port = process.env.port || 1234;
const my_module = require('./module');

const app = express();
app.set('port', (process.env.PORT || port));
app.set('env', 'logistic-task-development');
app.use(expressLogging(logger)) ;
app.use(bodyParser.json({limit: '5mb'}));

app.post('/public/api/', async (request, response) => {
	/* request.body.packages is an array like :
	[
	  { "id": "ID-1", "weight": 345 },
	  { "id": "OTHER-ID-2", "weight": 500 },
	  { "id": "CLIENT-ID-3", "weight": 300 }
	]
	*/

	let packages = request.body.packages;
	console.log(packages);
	if(packages){
		let hendler = await new my_module(packages);
		console.log("before response");
		response.send( hendler.output() );
		console.log("aftre response");
	}else{
		response.send( "oops" );
	}
});

app.get('/public/api/history', async (request, response) => {
	response.send("oops");
});

app.listen(app.get('port'), () => {
	  console.log('Node Test App is running on port', app.get('port'));
});	