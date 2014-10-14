var path = require('path'),
	fs = require('fs'),
	util = require('util'),
	moootools = require('mootools'),
	packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '/package.json')));

exports.VERSION = packageJSON.version.split('.');

exports.MemoryStore = require('./store/memory.js');

exports.Imap = require('./type/imap.js');


