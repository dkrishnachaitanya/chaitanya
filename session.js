const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));

var sess; // global session, NOT recommended

app.get('/', function(request, response) {
	response.sendFile( __dirname + "/" + "login.html" );
});

app.post('/auth', function(request, response) 
{
	var username = request.body.username;
	var password = request.body.password;

	if (username=="object" && password=="knowit") {
		
			
				request.session.loggedin = true;
				request.session.username = username;
				
				response.redirect('/home');
						
			response.end();
		

	} else {
		response.send('Wrong Username and Password!'+'<a href='+'/'+'>Back to login</a>');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!'+'<a href='+'/'+'>Back to login</a>');
 response.end('<a href='+'/login'+'>Back to login</a>');	

	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get('/logout', function(request, response) {
        request.session.destroy();
        response.redirect('/');
    });

app.listen(3000);