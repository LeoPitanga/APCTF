const express = require('express');
const app = express();

app.use(express.json());
app.use('/', require('./route/APRoute'));

app.listen(process.env.PORT || 3000);
