"use strict";
const express = require('express');
const app = express();
app.use(express.json());
//Backend
app.use('/', require('./Backend/route/APRoute'));
//Frontend
app.use('/ctf/', require('./Frontend/route/FERoute'));
//app.use(express.static(__dirname + "\\Frontend\\route"));
app.listen(process.env.PORT || 3000);
