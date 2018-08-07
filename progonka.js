// progonka.js
var w = require("./write.js").write();

function getPages(){
	w.useStringOut();

	w.line2("1.2 Методом прогонки решить СЛАУ.");
	w.math2(w.casesLeft(
		"-x_1 - x_2 = -4",
		"7x_1 - 17x_2 - 8x_3 = 132",
		"-9x_2 + 19x_3 + 8x_4 = -59",
		"7x_3 - 20x_4 + 4x_5 = -193",
		"-4x_4 + 12x_5 = -40"));

w.line2("Выпишем 3-х диагональную матрицу $A_{n,n+1}$.");

	w.math2("\\widetilde{A} = " + w.matrix([
		[-1, -1, 0, 0, 0, -4],
		[7, -17, -8, 0, 0, 132],
		[0, -9, 19, 8, 0, -59],
		[0, 0, 7, -20, 4, -193],
		[0, 0, 0, -4, 12, -40],
	]));
	w.mathDisp("a_i = A_{i, i-1}; b_i = A_{i, i}; c_i = A_{i, i+1}; d_i = A_{i,n+1}; a_1 = 0; c_n = 0 ");w.line();
	w.line2("При проведении прямого хода метода прогонки вычисляются прогоночные коэффициенты A~i~ и B~i~:");
	w.mathDisp("A_i = \\frac{-c_i}{b_i + a_i \\cdot A_{i-1}}, B_i = \\frac{d_i - a_i \\cdot B_{i-1}}{b_i + a_i \\cdot A_{i-1}}, A_0 = B_0 = 0");
	w.line();
	w.line2("В обратном ходе прогонки вычисляют все неизвестные: x~n~, x~n-1~, ... x~1~ .");
	w.mathDisp("x_n = B_n, x_i = A_i \\cdot x_{i+1} + B_i");
	w.line();
	w.head2("Прямой ход.");
	w.line();
	function printCoeff(k, a, b, c, d)
	{
		function indx(letter, id)
		{
			//return letter+"~"+id+"~";
			return letter+"_"+id;
		}
		w.math("\\underline{k = "+k+"}: "+
			indx("a", k)+" = "+a+"; "+
			indx("b", k)+" = "+b+"; "+
			indx("c", k)+" = "+c+"; "+
			indx("d", k)+" = "+d+";"
			);
	}
	w.line();
	printCoeff(1, 0, -1, -1, -4);
	w.line();
	w.mathDisp("\\mathbf{A_1} = \\frac{-c_1}{b_1} = \\frac{1}{-1} = -1; ");
	// 
	w.mathDisp("\\mathbf{B_1} = \\frac{d_1}{b_1} = \\frac{-4}{-1} = 4");
	// 2
	w.line();
	printCoeff(2, 7, -17, -8, 132);
	w.line();
	// 
	w.mathDisp("\\mathbf{A_2} = \\frac{-c_2}{b_2 + a_2\\cdot A_1} = \\frac{8}{-17+7\\cdot(-1)} = \\frac{8}{-24} = -\\frac{1}{3};");
	// w.line();
	w.mathDisp("\\mathbf{B_2} = \\frac{d_2 - a_2\\cdot B_1}{b_2 + a_2\\cdot A_1} = \\frac{132-7\\cdot 4}{-17+7\\cdot (-1)} = \\frac{104}{-24} = -\\frac{13}{3}");
	
	// 3
	w.line();
	printCoeff(3, -9, 19, 8, -59);
	w.line();
	// 
	function prepA(index)
	{
		return "\\mathbf{A_"+index+"} = \\frac{-c_"+index+"}{b_"+index+" + a_"+index+"\\cdot A_"+(index-1)+"}";
	}
	function prepB(index)
	{
		return "\\mathbf{B_"+index+"} = \\frac{d_"+index+" - a_"+index+"\\cdot B_"+(index-1)+"}{b_"+index+" + a_"+index+"\\cdot A_"+(index-1)+"}";
	}
	function frac(ch, znam)
	{
		return "\\frac{"+ch+"}{"+znam+"}";
	}
	w.mathDisp(prepA(3) + " = "+frac("-8","19+(-9)\\cdot (-\\frac{1}{3})")+" = -"+frac("4","11")+";");
	// w.line();
	w.mathDisp(prepB(3) + " = "+frac("-59-(-9)\\cdot (-\\frac{13}{3})","19+(-9)\\cdot (-\\frac{1}{3})")+" = -"+frac("49","11")+";");
	
	// 4
	w.line();
	printCoeff(4, 7, -20, 4, -193);
	w.line();
	// 
	w.mathDisp(prepA(4) + " = "+frac("-4","20+7\\cdot (-\\frac{4}{11})")+" = "+frac("11","62")+";");
	// w.line();
	w.mathDisp(prepB(4) + " = "+frac("-193-7\\cdot (-\\frac{49}{11})","-20+7\\cdot (-\\frac{4}{11})")+" = "+frac("445","62")+";");
	//

	// 5
	w.line();
	printCoeff(5, -4, 12, 0, -40);
	w.line();
	// 
	w.mathDisp("\\mathbf{A_5} = 0; ");
	w.mathDisp(prepB(5) + " = "+frac("-40-(-4)\\cdot (-\\frac{445}{62})","12+(-4)\\cdot \\frac{11}{62}")+" = -1;");
	//
	w.line();
	w.mathDisp("\\underline{x_5 = -1}");
	//
	w.line();
	w.head2("Обратный ход.");
	w.line();
	function prepX(idx, A, B, x, answ)
	{
		return "x_"+idx+" = A_"+idx+"\\cdot x_"+(idx+1)+" + B_"+idx + " = " + A + "\\cdot" + x + " + " + B + " = " + answ;
	}
	w.mathDisp(prepX(4, frac("11", "62"), frac("445", "62"), "(-1)", 7));//w.line();
	w.mathDisp(prepX(3, "-"+frac("4", "1"), "(-"+frac("49", "11")+")", "7", "-7"));w.line();
	w.mathDisp(prepX(2, "-"+frac("1", "3"), "(-"+frac("13", "3")+")", "-7", "-2"));//w.line();
	w.mathDisp(prepX(1, "-1", 4, "(-2)", 6));w.line();

	w.line("\\textbf{Ответ}: x~1~ = 6; x~2~ = -2; x~3~ = -7; x~4~ = 7; x~5~ = -1");
	w.debug("прогонкa OK");

	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}
