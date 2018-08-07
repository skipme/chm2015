var w = require("./write.js").write();

var util = {
}

function pneg(num)
{
	if(num < 0)
		return "("+num+")";
	return num;
}
var _GPREC = 4;
function _roundPrec(num)
{
	return Number(num.toFixed(_GPREC));
}
function _roundPrec5(num)
{
	return Number(num.toFixed(5));
}
function getPages()
{
	w.useStringOut();
	w.line2("3.5. Вычислить определенный интеграл $\\displaystyle \\int_{x_0}^{x_k} y\\,\\mathrm{d}x$, методами прямоугольников, трапеции, Симпсона с шагами $h_1, h_2$. Уточнить полученные значения, используя Метод Рунге-Ромберга:");
	//
	var X0 = 0,
		Xk = 2;
	var H1 = 0.5,
		H2 = 0.25;
	//
	//
	function Fx0(x)
	{
		return 1/(x*x*x*x + 16);
	}
	w.line();
	w.math2("y = \\frac{1}{x^4 + 16}");w.line();
	w.mathDisp("x_0 = 0, x_k = 2, h_1 = 0.5, h_2 = 0.25");w.line();


	function makeTable(fx, x0, xk, step)
	{
		var cfx, nowx = x0, table = [];

		for (var i = 0; i < 100 && nowx <= xk; i++) {
			cfx = fx(_roundPrec(nowx));
			table.push([_roundPrec(nowx), _roundPrec(cfx)]);
			nowx += step;
		};
		return table;
	}
	function mapSubArray(a)// take y only
	{
		return a[1];
	}
	function mapSubArrayX(a)// take x only
	{
		return a[0];
	}
	function map(a, func)
	{
		if(typeof(func) !== "function")
			throw new Error("func not function");
		var result = [];
		for (var i = 0; i < a.length; i++) {
			result.push(func(a[i]));
		};

		return result;
	}
	function IntegrateByRectangle(table, tableStep)
	{
		var precision = 1,
			result = 0.0;
		tableStep = _roundPrec(tableStep);
		for (var i = 0; i < table.length; i++) {
			result += table[i][1];
		};
		result = _roundPrec(result);
		
		result = _roundPrec(result * tableStep);
		w.debug("Srectangle = (" + printsum(map(table, mapSubArray)) + ") * "+tableStep+" = "+result);
		w.mathDisp("\\int_{x_0}^{x_k} y\\,\\mathrm{d}x \\approx h \\cdot \\sum_{i=1}^{\\mathrm{n}} y_i = "+tableStep+" \\cdot ("+printsum(map(table, mapSubArray))+") = "+result);
		w.line();
		return [precision, result];
	}
	function IntegrateByTrapeze(table, tableStep)
	{
		var precision = 2,
			midSum = 0.0,
			result = 0.0;
		tableStep = _roundPrec(tableStep);
		var midTable = [];
		for (var i = 1; i < table.length-1; i++) {
			midSum += table[i][1];
			midTable.push([0, table[i][1]]);
		};
		midSum = _roundPrec(midSum);
		result = _roundPrec(_roundPrec(tableStep*0.5)*(table[0][1] + 2*midSum + table[table.length-1][1]));
		w.debug("Strapeze = "+tableStep+"/2 * ("+table[0][1]+" + 2*("+ midSum + ") + "+table[table.length-1][1]+") = "+result);
		w.mathDisp("\\int_{x_0}^{x_k} y\\,\\mathrm{d}x \\approx \\frac{h}{2} \\cdot (y(x_0) + 2 \\cdot \\sum_{i=1}^{\\mathrm{n}-1} y_i + y(x_k)) = \\frac{"+tableStep+"}{2} \\cdot ("+table[0][1]+" + 2 \\cdot ("+printsum(map(midTable, mapSubArray))+") + "+table[table.length-1][1]+" ) = "+_roundPrec(tableStep*0.5)+" \\cdot ("+table[0][1]+" + 2 \\cdot "+midSum+" + "+table[table.length-1][1]+" ) = "+result);
		w.line();
		return [precision, result];
	}
	function IntegrateBySimpson(table, tableStep)
	{
		var precision = 4,
			midEven = 0.0,
			midOdd = 0.0,
			result = 0.0;
		tableStep = _roundPrec5(tableStep);
		var midTable1 = [],
			midTable2 = [];
		for (var i = 1; i < table.length-1; i++) {
			if(i%2===0)
			{	
				midEven = _roundPrec5(midEven+table[i][1]);
				midTable2.push([0, table[i][1]]);
			}
			else {
				midOdd = _roundPrec5(midOdd+table[i][1]);
				midTable1.push([0, table[i][1]]);
			}
		};
		midEven = _roundPrec5(midEven);
		midOdd = _roundPrec5(midOdd);
	// console.log(printTable(table))
		result = _roundPrec5(_roundPrec5(tableStep/3)*_roundPrec5(table[0][1] + _roundPrec(4*midOdd) + _roundPrec(2*midEven) + table[table.length-1][1]));
		w.debug("Ssimps = "+tableStep+"/3 * ("+table[0][1]+" + 4*("+ midOdd + ")"+" + 2*("+ midEven + ") + "+table[table.length-1][1]+") = "+result);
		w.mathDisp("\\int_{x_0}^{x_k} y\\,\\mathrm{d}x \\approx \\frac{h}{3} \\cdot (y(x_0) + 4 \\cdot \\sum_{i=1,3,5\\dots}^{\\mathrm{n}-1} y_i + 2 \\cdot \\sum_{i=2,4,6\\dots}^{\\mathrm{n}-1} y_i + y(x_k)) = \\frac{"+tableStep+"}{3} \\cdot ("+table[0][1]+" + 4 \\cdot ("+printsum(map(midTable1, mapSubArray))+") + "+"2 \\cdot ("+printsum(map(midTable2, mapSubArray))+") + "+table[table.length-1][1]+" ) = "+_roundPrec5(tableStep/3)+" \\cdot ("+table[0][1]+" + 4 \\cdot "+midOdd+" + 2 \\cdot "+midEven+" + "+table[table.length-1][1]+" ) = "+result);
		w.line();
		return [precision, result];
	}
	function RungeCalc(z1,z2, h1,h2, Prec)
	{
		var fround = _roundPrec;
		if(Prec===4)
			fround = _roundPrec5;
		var runge = fround.call(undefined, z1 + ((z1-z2)/(Math.pow(h2/h1, Prec)-1)));
		w.debug("Zpp = z1 + (z1-z2)/R^p-1 = " + z1 +" + ("+z1+" - "+z2+")/("+h2+"/"+h1+")^"+Prec+"-1 = " + runge);
		w.mathDisp("Z_{pp} = z_1 + \\frac{z_1 - z_2}{(\\frac{h_2}{h_1})^p - 1} = "+z1+" + \\frac{"+z1+" - "+z2+"}{(\\frac{"+h2+"}{"+h1+"})^"+Prec+" - 1} = "+runge);
		w.line();
		return runge;
	}
	function printTable(table)
	{
		var result = "", columns = table.length +1, cline, heads = "ixyz", rows = table[0].length +1;
		function rline(str){return result+=str+"\r\n";}
		function ctab(str){return cline+=str+"\t";}
		cline = ""; ctab("i");
		for (var i = 1; i < columns; i++) {
			ctab(i);
		};
		rline(cline);
		for (var i = 1; i < rows; i++) {
			cline = ""; ctab(heads[i]);
			for (var j = 1; j < columns; j++) {
				ctab(table[j-1][i-1]);
			};
			rline(cline);
		};
		
		return result;
	}
	function printsum(a, depre, depost){
		if(!depre)
			depre = "";
		if(!depost)
			depost = "";
		var result = "";
		for (var i = 0; i < a.length; i++) {
			if(typeof(a[i]) === "number")
				result +=((i>0||a[i]<0)?(a[i]<0?" - ":" + "):"")+depre+(a[i]<0?_roundPrec(-a[i]):_roundPrec(a[i]))+depost;
			else
				result += (i>0?" + ":"") + a[i];
		};
		return result;
	}
	function calc()
	{
		var table_h1 = makeTable(Fx0, X0, Xk, H1),
			table_h2 = makeTable(Fx0, X0, Xk, H2);

		w.debug("table_h1: \n"+printTable(table_h1));
		w.debug("table_h2: \n"+printTable(table_h2));
		function printLateXtable(table)
		{
			w.latexTableHeader(table.length +1);
			var iarray = [];
			for (var i = 0; i < table.length; i++) {
				iarray.push(i);
			};
			w.latexTableLine.apply(w, ["$i$"].concat(iarray));
			w.latexTableLine.apply(w, ["$x_i$"].concat(map(table, mapSubArrayX)));
			w.latexTableLine.apply(w, ["$y_i$"].concat(map(table, mapSubArray)));
			w.latexTableEnd();
			w.line();
		}
		w.lineBreak(1);
		w.line("Таблица соответствующая шагу h~1~:");w.line();
		printLateXtable(table_h1);w.line();
		// w.lineBreak(1);
		w.line("Таблица соответствующая шагу h~2~:");w.line();
		printLateXtable(table_h2);w.line();
		w.lineBreak(1);

		w.line("Представленные методы численного интегрирования используют определение интеграла функции $f(x)$ как площади фигуры образованной графиком подынтегральной функции и осью абсцисс, так метод прямоугольников позволяет вычислить искомую площадь как сумму прямоугольников образованных отрезками высот проходящих с шагом $h$. Метод Рунге-Ромберга позволяет при наличии нескольких результатов вычислений с одинаковой точностью $P$ получить новый результат с точностью $P+1$ .");w.line();
		w.line("Метод прямоугольников: ");w.line();
		w.line("h~1~: ");
		var rect_h1 = IntegrateByRectangle(table_h1, H1);
		w.line("h~2~: ");
		var rect_h2 = IntegrateByRectangle(table_h2, H2);
		w.lineBreak(1);

		w.line("Метод трапеций: ");w.line();
		w.line("h~1~: ");
		var trapeze_h1 = IntegrateByTrapeze(table_h1, H1);
		w.line("h~2~: ");
		var trapeze_h2 = IntegrateByTrapeze(table_h2, H2);
		w.lineBreak(1);

		w.line("Метод Симпсона: ");w.line();
		w.line("h~1~: ");
		var simps_h1 = IntegrateBySimpson(table_h1, H1);
		w.line("h~2~: ");
		var simps_h2 = IntegrateBySimpson(table_h2, H2);
		w.lineBreak(1);

		w.line("Уточнение метода прямоугольников.");
		var zpp1 = RungeCalc(rect_h1[1], rect_h2[1], H1, H2, rect_h1[0]);
		w.line("Уточнение метода трапеций.");
		var zpp2 = RungeCalc(trapeze_h1[1], trapeze_h2[1], H1, H2, trapeze_h1[0]);
		w.line("Уточнение метода Симпсона.");
		var zpp3 = RungeCalc(simps_h1[1], simps_h2[1], H1, H2, simps_h1[0]);
		w.lineBreak(1);

		w.line("Ответ: $\\displaystyle\\int_{0}^{2} \\left( \\frac{1}{x^4 + 16}\\right) \\,\\mathrm{d}x = "+zpp3+"$");
	}
	calc();
	//-----------------------------------
	w.debug("3.5 Integration ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}
