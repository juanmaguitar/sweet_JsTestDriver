(function () {
  
  var GreeterTest = TestCase("GreeterTest3");

  GreeterTest.prototype.testGreet3 = function() {
    var greeter = new myapp.Greeter3();
    assertEquals("Hello World.", greeter.greet("World"));
  };
  
}())