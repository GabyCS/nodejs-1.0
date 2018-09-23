const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());

let router  = express.Router();

router.get('/',(req, res)=>{
	res.send('Hello World');
});

app.use(router);

app.listen(3000, ()=>{
	console.log("Node server running on 127.0.0.1:3000");
})


