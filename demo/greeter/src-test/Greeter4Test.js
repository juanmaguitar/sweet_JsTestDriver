(function () {
  
  var GreeterTest = TestCase("GreeterTest4");

  GreeterTest.prototype.testGreet4 = function() {
    var greeter = new myapp.Greeter4();
    assertEquals("Hello World!", greeter.greet("World"));
  };
  
}())