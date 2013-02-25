(function () {
  
  var HalloTest = TestCase("HalloTest4");

  HalloTest.prototype.testhallo4 = function() {
    var Hallo = new myapp.Hallo4();
    assertEquals("Hello World.", Hallo.hallo("World"));
  };
  
}())