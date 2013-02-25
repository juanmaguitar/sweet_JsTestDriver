(function () {
  
  var HalloTest = TestCase("HalloTest3");

  HalloTest.prototype.testhallo3 = function() {
    var Hallo = new myapp.Hallo3();
    assertEquals("Hello World!", Hallo.hallo("World"));
  };
  
}())