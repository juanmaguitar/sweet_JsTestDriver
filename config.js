/**
 * Global configuration for the App
 */

var _oConf = {},
    _BasePath = '/Volumes/DATOS/@PROJECTS/';

_oConf.pathJar = '$JSTESTDRIVER/JsTestDriver.jar';
_oConf.folderOutput = "results";
_oConf.configFile = _BasePath + "sweet_JsTestDriver/demo/greeter/jsTestDriver.conf";
_oConf.tests = "all";
_oConf.configFiles = {
  "greeter" : _BasePath + "sweet_JsTestDriver/demo/greeter/jsTestDriver.conf",
  "hallo" : _BasePath + "sweet_JsTestDriver/demo/hallo/jsTestDriver.conf"
};

module.exports = _oConf;