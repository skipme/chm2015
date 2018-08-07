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

function getPages()
{
	w.useStringOut();
	w.line2("3.4. Вычислить первую и вторую производную таблично заданной функции $y_i = f(x_i), i = 0,1,2,3,4$ в точке x=X* .");
	
	
	var AX = [1, 2, 3, 4, 5];
	var AY = [1, 2.6931, 4.0986, 5.3863, 6.6094];
	var h = 1;

	w.lineBreak(1);
	w.latexTableHeader(6);
	w.latexTableLine("$i$", 0, 1, 2, 3, 4);
	w.latexTableLine.apply(w, ["$x_i$"].concat(AX));
	w.latexTableLine.apply(w, ["$y_i$"].concat(AY));
	w.latexTableEnd();
	w.line();
	w.line("X* = 3, h = 1");
	w.line();
	w.lineBreak(1);
	w.line("Если в некоторой точке требуется вычислить производные первого, второго и т.д. порядков от дискретно заданной функции, в случае совпадения X* с одним из внутренних узлов заданной таблицы используется аппарат разложения функций в ряд Тейлора. С этой целью предполагается, что заданная таблица является сеточной функцией для некоторой функции $y(x)$, имеющей в точке X* производные до четвертого порядка включительно, т.е. что $y_i = y(x_i)$. ");
	w.line();
	w.lineBreak(1);

	w.line("X* совпадает с одним из внутренних узлов заданной таблицы $(i=2)$, поэтому: ");
	w.line("Первые производные первого порядка точности: ");w.line();
	w.line("Правая: ");w.line();
	w.mathDisp("y_i'(X^*=X_2) = \\frac{y_{i+1} - y_i}{h} = \\frac{"+AY[3]+" - "+AY[2]+"}{"+h+"} = "+1.2877);
	w.line();
	w.line("Левая: ");w.line();
	w.mathDisp("\\bar{y}_i'(X^*=X_2) = \\frac{y_{i} - y_{i-1}}{h} = \\frac{"+AY[2]+" - "+AY[1]+"}{"+h+"} = "+1.4055);
	w.line();
	// \\mathring
	w.line("Центральная: ");w.line();
	w.mathDisp("\\overset{\\circ}{y}_i'(X^*=X_2) = \\frac{y_{i+1} - y_{i-1}}{2h} = \\frac{"+AY[3]+" - "+AY[1]+"}{"+h+"} = "+1.3466);
	w.line();
	w.line("Вторая производная второго порядка точности: ");w.line();
	w.mathDisp("y_i''(X^*=X_2) = \\frac{y_{i+1} - 2y_{i-1} + y_{i}}{h^2} = \\frac{"+AY[3]+" - 2\\cdot "+AY[2]+" + "+AY[1]+"}{"+h+"} = -"+0.1178);
	w.line();
	w.lineBreak(1);
	w.line("Ответ: ");w.mathDisp(w.matrix([
		["y_i' = "+1.2877],
		["\\bar{y}_i' = "+1.4055],
		["\\overset{\\circ}{y}_i' = "+1.3466],
		["y_i'' = "+0.1178],
		], "array", "l"));
	//-----------------------------------
	w.debug("3.4 D', D'' ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}
