// write.js
function w(){
	this.bufferPrint = false;
	this.buffer = "";
	this.spellBuffer = "";
};

w.prototype = {/*ФОРМАТИРУЕМ ВЫВОД в формат MARKDOWN-extended смотри формат pandoc*/
	off: true,
	usedebug: true,
	inheritTable: false,

	buffer: "",
	bufferPrint: false,
	spellBuffer: "",

	useStringOut: function()
	{
		this.bufferPrint = true;
		this.buffer = "";
	},

	line: function (str, ignoreSpell) {
		if(this.off)
			return;

		if(typeof(str) === "undefined")
			str = "";
		if(this.bufferPrint)
		{	
			this.buffer += str + "\r\n";
			if(!ignoreSpell)
				this.spellBuffer += str + "\r\n";
		}
		else	
			process.stdout.write(str+"\r\n");
	},
	line2: function (str, ignoreSpell) {
		if(this.off)
			return;
		// console.log(str+"\r\n");
		if(typeof(str) === "undefined")
			str = "";
		if(this.bufferPrint)
		{
			this.buffer += str + "\r\n\r\n";
			if(!ignoreSpell)
				this.spellBuffer += str + "\r\n";
		}
		else	
			process.stdout.write(str+"\r\n\r\n");
	},
	head: function(str){
		// this.line("\r\n# "+str);
		this.line(str);
	},
	head2: function(str){
		// this.line("\r\n## "+str);
		this.line(str);
	},
	head6: function (str) {
		// this.line("###### "+str);
		this.line(str);
	},
	math: function(str){
		// http://en.wikibooks.org/wiki/LaTeX/Mathematics
		str = str.trim();
		this.line("$"+str+"$", true);
		// this.line("$\\small"+str+"$", true);
	},
	mathDisp: function(str){
		// http://en.wikibooks.org/wiki/LaTeX/Mathematics
		str = str.trim();
		this.line("$\\displaystyle "+str+"$", true);
		// this.line("$\\small "+str+"$", true);
	},
	math2: function(str){
		// http://en.wikibooks.org/wiki/LaTeX/Mathematics
		str = str.trim();
		this.line("$$"+str+"$$", true);
	},
	listNum: function(str) {
		this.line("1. "+str);
	},
	listSub: function(str) {
		this.line("\t* "+str);
	},
	listSub2: function(str) {
		this.line("\t\t* "+str);
	},
	tableSection: function (num) {
		var sep = "|";// +
		var strTo = sep;
		switch(num && this.inheritTable)
		{
			case 1: strTo = "    "+sep;break;
			case 2: strTo = "        "+sep;break;
			default:
			break;
		}
		for (var i = 1; i < arguments.length; i++) {
			strTo += " " + arguments[i] + " "+sep;
		}
		this.line(strTo, true);
	},
	tableSectionSpec: function (num, sep) {
		if(typeof(sep) === "undefined")
			sep = "|";// +
		var strTo = sep;
		switch(num && this.inheritTable)
		{
			case 1: strTo = "    "+sep;break;
			case 2: strTo = "        "+sep;break;
			default:
			break;
		}
		for (var i = 2; i < arguments.length; i++) {
			strTo += arguments[i] + sep;
		}
		this.line(strTo);
	},
	pageBreak: function () {
		this.line("\r\n\\pagebreak\r\n");
	},
	lineBreak: function(num)
	{
		if(typeof(num) !=="number")
			num = 1;
		// this.line("\\linebreak["+num+"]");
		this.line("\\vspace{"+(5*num)+"mm}");
	},
	debug: function (str) {
		if(this.usedebug)
			process.stdout.write((this.off?"":"\r\n<!---\r\n")+str+(this.off?"\r\n":"\r\n-->"));
	},
	// ---------------------------
	systemLeft: function()
	{
		var res = "\\left\\{\\begin{matrix}\r\n";
		var mid = "";
		for (var i = 0; i < arguments.length; i++) {
			mid += arguments[i] + "\\\\\r\n";
		}
		return res+mid+"\\end{matrix}\\right.";
	},
	casesLeft: function()
	{
		var res = "\\begin{cases}\r\n";
		var mid = "";
		for (var i = 0; i < arguments.length; i++) {
			mid += arguments[i] + "\\\\\r\n";
		}
		return res+mid+"\\end{cases}";
	},
	// w.matrix([[],[]])
	// w.matrix([[],[]], true);
	// w.matrix([[],[]], "array")
	// w.matrix([[],[]], "array", "l")
	// w.matrix([[],[]], "array", "ll")
	matrix: function(array, braces, align)
	{
		var matrt = "pmatrix";
		if(braces)
			if(braces === "array")
			{
				matrt = "array";
				if(!align)
					align = "c";
			}
				else
			matrt = "matrix";
		
		var res = "\\begin{"+matrt+"}"+(align?"{"+align+"}":"")+" \r\n";
		var mid = "";
		for (var i = 0; i < array.length; i++) {//lines
			for (var j = 0; j < array[i].length; j++) {//columns
				mid += array[i][j] + ((j+1<array[i].length)?" & ":"");
			}
			mid += "\\\\\r\n";
		}
		return res+mid+"\\end{"+matrt+"}";
	},
	latexTableHeader: function(num)
	{
		var prep = "";
		for (var i = 0; i < num; i++) {
			prep += " | l ";

		};
		prep += "|";
		var strt = [
			"\\begin{center}",
			"\\begin{tabular}{"+prep+"}",//\begin{tabular}{ | l | l | l | p{5cm} |}
			"\\hline",
		].join("\r\n");
		this.line(strt, true);
	},
	latexTableEnd: function()
	{
		var strt = [
			"\\end{tabular}",
			"\\end{center}",
		].join("\r\n");
		this.line(strt, true);
	},
	latexTableLine: function()
	{
		var prep = "";
		for (var i = 0; i < arguments.length; i++) {
			prep += (i>0? " & ": "") + arguments[i].toString();

		};
		this.line(prep + " \\\\ \\hline", true);
	},
	// ---------------------------
	image: function(location, iname, description)
	{
		//w.line("![la lune](screenkurs.jpg \"Voyage to the moon\")");
		this.line("!["+iname+"]("+location+" \""+description+"\")", true);
	}
};

module.exports = {
	// write: w
	write: function(){
		var meww = new w();
		process.argv.forEach(function (val, index, array) {
			if(val === "debug")
			{	
				meww.usedebug = true;
				meww.off = true;
			}
			 if(val === "print")
			{
				meww.off = false;
				meww.usedebug = false;
			}
		});
		return meww;
	}
};
