#!/usr/bin/env node

GLOBAL.os		= require('os');
GLOBAL.fs		= require('fs');
GLOBAL.url		= require('url');
GLOBAL.sys		= require('sys');
GLOBAL.dns		= require('dns');
GLOBAL.util		= require('util');
GLOBAL.path		= require('path');
GLOBAL.util		= require('util');
GLOBAL.async	= require('async');
GLOBAL.moment	= require('moment');
GLOBAL._		= require('underscore');
GLOBAL._.str	= require('underscore.string');
GLOBAL.express	= require('express');
GLOBAL.mime		= require('mime');

GLOBAL._.mixin(GLOBAL._.str.exports());

GLOBAL.dir		= GLOBAL.path.join( __dirname, '..' );
GLOBAL.master	= require( GLOBAL.path.join(GLOBAL.dir, 'package.json' ) );

const program	= require('commander');
const action	= require(GLOBAL.path.join(GLOBAL.dir, 'lib','action.js' ));

GLOBAL.lib		= require(GLOBAL.path.join(GLOBAL.dir, 'lib', 'index.js'));
GLOBAL.connect	= require(GLOBAL.path.join(GLOBAL.dir, 'lib', 'models' ));


process.title =  program._name = program.name = GLOBAL['master'].name;

program
	.version( GLOBAL.master.version )
	.on('--help', action.help );

program
	.command('run [json]')
		.description('Inicia el servidor')
		.option('-p, --port <port>', 'Puerto', Number)
		.option('-c, --cluster', 'Cluster')
		.action( action.run );

program
	.command('save <collection> <json>')
		.description('Guardar configuraciones y esquemas principales')
		.option('-j, --json  <json>', 'Configuracion del servidor')
		.action( action.save );

program.parse(process.argv);
