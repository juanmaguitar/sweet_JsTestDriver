(function () {
  
  var GreeterTest = TestCase("GreeterTest2");

  GreeterTest.prototype.testGreet2 = function() {
    var greeter = new myapp.Greeter2();
    assertEquals("Hello World.", greeter.greet("World"));
  };
  
}())