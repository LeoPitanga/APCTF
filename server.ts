const express = require('express');
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//Backend
app.use('/', require('./API/route/APRoute'));
//Frontend
app.use('/ctf/', require('./View/route/FERoute'));
//app.use(express.static(__dirname + "\\Frontend\\route"));

app.listen(process.env.PORT || 3000);
