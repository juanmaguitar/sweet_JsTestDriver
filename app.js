/**
* This module creates an 'express' object, configure it and return it
*
* @return {Object} | Express Object (http://expressjs.com/guide.html)
*/

var express = require('express'),
    cons = require('consolidate'),
    swig = require('swig'),
    swig_filters = require('./views/filters.js'),
    tso = require('./tso'),
    config = require( './config'),
    path = require( 'path'),
    app = express(),
    sModuleDir = path.dirname( module.uri ),
    self = this;

//  console.log (swig_filters);

/**
 * Returns JSON to the client with results of tests
 * @param {Object} oReq | Request Express Object (http://expressjs.com/api.html#req.params)
 * @param {Object} oRes | Response Express Object (http://expressjs.com/api.html#res.status)
 */
function handleJson ( oReq, oRes ) {

  var getJSON = tso.getJSON.bind(self, app);
  
  app.set('conf_file', oReq.query.conf || config.configFile );
  app.set('tests', oReq.query.tests || config.tests );

  function fpReturnJSON( oJSON ) {
    oRes.json( oJSON );
  }
  
  getJSON( fpReturnJSON );
  
};

/**
 * Returns 'results' template to the client showing results of tests (JSON)
 * @param {Object} oReq | Request Express Object (http://expressjs.com/api.html#req.params)
 * @param {Object} oRes | Response Express Object (http://expressjs.com/api.html#res.status)
 */
function handleResults ( req, res ) {
  
  var getJSON = tso.getJSON.bind( self, app );
    
  function fpRenderResults( oJSON ) {
    res.render('results.html', {
      title: 'Sweet JsTestDriver',
      description: 'jsTestDriver results like you always wanted',
      author:    'JuanMa Garrido',
      results: oJSON,
      config: config
    });
  }

  config.configFile = req.query.conf || config.configFile;
  
  app.set('conf_file', config.configFile );
  app.set('tests', req.query.tests || config.tests );
  
  getJSON( fpRenderResults );
  
}

// Add some global info to be used in JSONADE templates
app.locals( {
  APP : {
    title: ':: Sweet JsTestDriver ::'
  }
});

// Add some configuration to the express object   
app.set( 'folder_output', config.folderOutput );
app.set( 'path_jar', config.pathJar );

// Configuration of the express object   
app.configure( function() {

  app.set( 'port', process.env.PORT || 4000 );
  
  app.engine( '.html', cons.swig );
  app.set( 'view engine', 'html');
  

  swig.init({
    root: sModuleDir + '/views',
    allowErrors: true, // allows errors to be thrown and caught by express instead of suppressed by Swig,
    cache: false,
    filters: swig_filters
  });
  app.set( 'views', sModuleDir + '/views' );
  app.set( 'view options', { layout: false } );
  
  app.use( express.favicon() );
  app.use( express.logger('dev') );
  //app.use( express.bodyParser() );
  //app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join(sModuleDir, 'static') ) );
  
} );

// Define behaviour for routes
app.get( '/json', handleJson );
app.get( '/results', handleResults );

app.get('/', function(req,res){
    res.render('index_basic', {} );
});

module.exports = app;
