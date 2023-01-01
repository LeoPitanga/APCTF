"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const body_parser_1 = __importDefault(require("body-parser"));
const app = express();
app.use(express.json());
app.use(body_parser_1.default.json()); // to support JSON-encoded bodies
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
//Backend
app.use('/', require('./Backend/route/APRoute'));
//Frontend
app.use('/ctf/', require('./Frontend/route/FERoute'));
//app.use(express.static(__dirname + "\\Frontend\\route"));
app.listen(process.env.PORT || 3000);
