var exec = require('child_process').exec,
    child;
var execFile = require('child_process').execFile,
    child;
function exe(){

};
exe.prototype = {
	eval: function(istex, math, callback)
	{
		// child = exec('bin\\mathForNode.exe '+(istex?"tex ":"xxx ")+math+"",
		child = execFile('bin\\mathForNode.exe',[(istex?"tex ":"xxx "), math],
		  function (error, stdout, stderr) {
		  	if(stderr.length !== 0)
		  		throw new Error(stderr);
		    // console.log('stdout: ' + stdout);
		    // console.log('stderr: ' + stderr);
		    if (error !== null) {
		    	throw new Error('exec error: ' + error);
		    }
		    callback(stdout);
		});
	}
}

module.exports = {
	// write: w
	execute: function(){
		var execute = new exe();
		return execute;
	}
};
