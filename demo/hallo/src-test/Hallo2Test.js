(function () {
  
  var HalloTest = TestCase("HalloTest2");

  HalloTest.prototype.testhallo2 = function() {
    var Hallo = new myapp.Hallo2();
    assertEquals("Hello World!", Hallo.hallo("World"));
  };
  
}())