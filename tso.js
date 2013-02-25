/**
* This module serves the getJSON method which :
* - clear the results folder 
* - retrieves all XML files outputed bu jsTestDriver (in results folder)
* - parses all thes XML files and creates a JSON object with all this info
*
* @return {Object} | Object containg getJSON method
*/

// TO-DO: Avoid the use of 'global' _oFullJSON (just return objects in methods)
var colors = require('colors'),
  fs = require('fs-extra'),
  xml2js = require('xml2js'),
  child_process = require('child_process'),
  exec = child_process.exec,
  _oFullJSON = {};

/**
 * Console Coloured Date 
 * https://github.com/Marak/colors.js
 */
function _consoleDate () {
  
  var oDate = new Date();
     
  console.log('\n' + oDate.toDateString() + ' ' + oDate.toTimeString().underline.yellow); 
}
  
/**
 * Execute jsTestDriver command and apply callback function over results converted into JSON 
 * @param {Object} oApp | Express object to get configuration
 * @param {String} fpCallback | Function to execute with tests results in JSON format
 */
function _getJSON ( oApp, fpCallback) {
  
  var sTestsCmd = "java",
      sFolderOutput = oApp.get('folder_output');
  
  sTestsCmd += ' -jar ' + oApp.get('path_jar');
  sTestsCmd += ' --captureConsole';
  sTestsCmd += ' --config ' + oApp.get('conf_file');
  sTestsCmd += ' --tests "' + oApp.get('tests') + '"';
  sTestsCmd += ' --testOutput ' + sFolderOutput;
  
  _clearDir( sFolderOutput );
  
  _consoleDate();
  console.log ( sTestsCmd.green );
  
  exec( sTestsCmd , function () {
    var sJSON = _processXMLtests( sFolderOutput );
    fpCallback( sJSON );
  });
};

/**
 * Add nodes to object "_oFullJSON"
 * @param {String} sProp | Property Name to add to JSON (testcase)
 * @param {String} sJSON | JSON added (testcase results)
 */
function _addJSON( sProp, oFullJSON, sJSON) {

  var sPropFiltered = sProp.split(".")[1];
  oFullJSON[sPropFiltered] = sJSON;

}

/**
 * Launch JX2J per XML file and apply fpCallback to JSON
 * @param {String} sFile | XML file to parse
 * @param {Function} fpCallback | Function to apply with this content transformed into JSON
 */
function _XMLtoJSON( sFile, fpCallback ) {
  
  var fs = require('fs'),
      parser = new xml2js.Parser(),
      data = fs.readFileSync( sFile, 'utf8' ),
      cleanedData = data.replace("\ufeff", "");
  
  parser.parseString( cleanedData, function (err, result) {
    fpCallback(result);
  });
    
}

/**
 * Process XML files from a dir and put all their contents into a JSON
 * @param {String} sDir | Folder where we retrieve all XML files 
 */
function _processXMLtests (sDir) {

    var nIndex,
        fpCallback,
        sFilePath,
        aFiles = fs.readdirSync( sDir ),
        oFullJSON = {};

    for ( nIndex in aFiles ) {
        if ( aFiles[nIndex].indexOf('xml') != -1 ) {
          sFilePath = sDir + '/' + aFiles[nIndex];
          fpCallback = _addJSON.bind(this, aFiles[nIndex], oFullJSON);
          _XMLtoJSON(sFilePath, fpCallback);
        }
    }
    
    return oFullJSON;
}

/**
 * Remove and Create Directory
 * @param {String} sDir | Folder to remove & create (synchronously)
 */
function _clearDir ( sDir ) {
  fs.removeSync(sDir);
  fs.mkdirsSync(sDir);
}

exports.getJSON = _getJSON;
