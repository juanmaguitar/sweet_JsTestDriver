(function () {
  
  var HalloTest = TestCase("HalloTest");

  HalloTest.prototype.testhallo = function() {
    var Hallo = new myapp.Hallo();
    assertEquals("Hello World!", Hallo.hallo("World"));
  };
  
}())