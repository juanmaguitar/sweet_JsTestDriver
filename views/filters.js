exports.getTestcase = function( text ){ 
  return text.split( '.' )[1]; 
};

exports.getMsg = function( textMsg ){ 
  return JSON.parse( textMsg )[0];
};
