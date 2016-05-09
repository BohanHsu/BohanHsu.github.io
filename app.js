#!/bin/env node
var express = require('express')
var app = express()

app.use(express.static(__dirname + '/'))

var ip_address = '127.0.0.1'
var port_number = '3000'

app.listen(port_number, ip_address)

console.log('online')
