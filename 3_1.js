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
	
	w.line2("3.1. Используя таблицу значений Y~i~ функции $y = f(x)$, вычисленных в точках X~i~, i = 0,...,3 построить интерполяционные многочлены Лагранжа, проходящие через точки [Х~i~, Y~i~]. Вычислить значение погрешности интерполяции в точке X* .");
	
	w.math2("f(x) = y = \\tan(x) + x");
	w.math2("X^{*} = \\frac{3\\pi}{16}");

	w.lineBreak(1);
	w.line("\\renewcommand{\\arraystretch}{3}");
	w.latexTableHeader(5);
	w.latexTableLine("$X_i$", "0", "$\\displaystyle\\frac{\\pi}{8}$", "$\\displaystyle\\frac{2\\pi}{8}$", "$\\displaystyle\\frac{3\\pi}{8}$");
	w.latexTableLine("$Y_i$", "0", "0.8069", "1.7854", "3.5923");
	w.latexTableEnd();
	w.line("\\renewcommand{\\arraystretch}{1}");
	w.lineBreak(1);

	w.line("Интерполяционный многочлен Лагранжа $L(x)$ состоит из линейной комбинации многочленов $n$-ой степени $L_n(x)$: ");w.line();
	w.mathDisp("L_n(x) = \\frac{(x - x_0)\\dots (x - x_{n-1})}{(x_n - x_0)\\dots (x_n - x_{n-1})} ; \\;");//w.line();
	w.mathDisp("L(x) = \\sum_{i=0}^{n} Y_i \\cdot L_i(x)");w.line();
	w.lineBreak(2);
	w.mathDisp("L_0(x) = \\frac{(x - \\frac{\\pi}{8}) (x - \\frac{2\\pi}{8}) (x - \\frac{3\\pi}{8})}{(-\\frac{\\pi}{8})(-\\frac{2\\pi}{8})(-\\frac{3\\pi}{8})} = \\frac{(\\frac{\\pi ^2}{32}-\\frac{3 \\pi  x}{8}+x^2)(x - \\frac{3\\pi}{8})}{-\\frac{3 \\pi ^3}{256}} = \\frac{-\\frac{3 \\pi ^3}{256}+\\frac{11 \\pi ^2 x}{64}-\\frac{3 \\pi  x^2}{4}+x^3}{-\\frac{3 \\pi ^3}{256}} = 1-\\frac{44 x}{3 \\pi }+\\frac{64 x^2}{\\pi ^2}-\\frac{256 x^3}{3 \\pi ^3}");w.line();
	w.mathDisp("L_1(x) = \\frac{(x - 0) (x - \\frac{2 \\pi}{8}) (x - \\frac{3 \\pi}{8})}{\\frac{\\pi}{8} (\\frac{\\pi}{8} - \\frac{2 \\pi}{8})  (\\frac{\\pi}{8} - \\frac{3 \\pi}{8})} = \\frac{\\frac{3 \\pi ^2 x}{32}-\\frac{5 \\pi  x^2}{8}+x^3}{\\frac{\\pi ^3}{256}} = \\frac{24 x}{\\pi }-\\frac{160 x^2}{\\pi ^2}+\\frac{256 x^3}{\\pi ^3}");w.line();
	w.mathDisp("L_2(x) = \\frac{(x - 0)(x - \\frac{\\pi}{8})(x - \\frac{3 \\pi}{8})}{\\frac{2 \\pi}{8}(\\frac{2 \\pi}{8} - \\frac{\\pi}{8})(\\frac{2 \\pi}{8} - \\frac{3 \\pi}{8})} = \\frac{\\frac{3 \\pi ^2 x}{64}-\\frac{\\pi  x^2}{2}+x^3}{-\\frac{\\pi ^3}{256}} = -\\frac{12 x}{\\pi }+\\frac{128 x^2}{\\pi ^2}-\\frac{256 x^3}{\\pi ^3}");w.line();
	w.mathDisp("L_3(x) = \\frac{(x - 0) (x - \\frac{\\pi}{8}) (x - \\frac{2 \\pi}{8})}{\\frac{3 \\pi}{8}(\\frac{3 \\pi}{8} - \\frac{\\pi}{8})(\\frac{3 Pi}{8} - \\frac{2 \\pi}{8})} = \\frac{\\frac{\\pi ^2 x}{32}-\\frac{3 \\pi  x^2}{8}+x^3}{\\frac{3 \\pi ^3}{256}} = \\frac{8 x}{3 \\pi }-\\frac{32 x^2}{\\pi ^2}+\\frac{256 x^3}{3 \\pi ^3}");w.line();

	w.mathDisp("L = 0 + 0.8069(\\frac{24 x}{\\pi }-\\frac{160 x^2}{\\pi ^2}+\\frac{256 x^3}{\\pi ^3}) + 1.7854(-\\frac{12 x}{\\pi }+\\frac{128 x^2}{\\pi ^2}-\\frac{256 x^3}{\\pi ^3}) + 3.5923(\\frac{8 x}{3 \\pi }-\\frac{32 x^2}{\\pi ^2}+\\frac{256 x^3}{3 \\pi ^3}) = (6.1643 x-13.081 x^2+6.6621 x^3) + (-6.8197 x+23.1551 x^2-14.741 x^3) + (3.0492 x-11.6472 x^2+9.8865 x^3)");w.line();
	w.mathDisp("L = 2.3938 x-1.5731 x^2+1.8076 x^3");w.line();
	w.lineBreak(1);
	w.mathDisp("f(X^{*}) = f(\\frac{3\\pi}{16}) = 1.2572");	w.line();
	w.mathDisp("L(X^{*}) = L(\\frac{3\\pi}{16}) = 1.2337");	w.line();
	w.mathDisp("\\varepsilon(X^{*}) = f(X^{*}) - L(X^{*}) = 1.2572 - 1.2337 = 0.0236.");	w.line();

	w.lineBreak(2);
	w.line("Ответ: $L = \\underline{1.8076 x^3 - 1.5731 x^2 + 2.3938 x}$,  $\\varepsilon(X^{*}) = \\underline{0.0236}$.");
	w.line();
	//-----------------------------------
	w.debug("3.1 Лагранж ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}