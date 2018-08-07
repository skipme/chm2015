/*
\usepackage{pgfplots}
\usepackage{tikz} 
...
\begin{center}
\begin{tikzpicture}
  \begin{axis}[ 
    xlabel=$x$,
    ylabel={$f(x) = x^2 - x +4$},
   grid=major,
width=10cm,height=10cm,
xmin=-4.0, xmax=4.0,
axis x line=center,
axis y line=center
  ] 
    \addplot [style={solid},smooth]{x^3-2*x^2-10*x+15}; 
    \addplot[only marks] coordinates {
 (1.3820,0)
 (3.6180,0)
 };
  \end{axis}
\end{tikzpicture}
\end{center}
*/
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
	w.line2("2.1 Методом простой итерации и Ньютона найти положительный корень нелинейного уравнения; начальное приближение определить графически .");
	w.line();
	w.math2("x^3 - 2x^2 - 10x + 15 = 0");
	w.line();

	w.line([
"\\begin{center}",
"\\begin{tikzpicture}",
"  \\begin{axis}[ ",
"    legend style={at={(1,0.3)}, anchor=east},",
"    xlabel=$x$,",
"    ylabel={$y$},",
"   grid=major,",
"width=10cm,height=10cm,",
"xmin=-4.0, xmax=4.0,",
"axis x line=center,",
"axis y line=center",
"  ] ",
"    \\addplot [style={solid},smooth]{x^3-2*x^2-10*x+15}; \\addlegendentry{$f(x) = x^3 - 2x^2 - 10x + 15$};",
"    \\addplot[only marks] coordinates {",
" (1.3820,0)",
" (3.6180,0)",
" };",
"  \\end{axis}",
"\\end{tikzpicture}",
"\\end{center}",
		].join("\r\n"));
	w.line();
	w.mathDisp("f(x) = x^3 - 2x^2 - 10x + 15");w.line();
	w.mathDisp("f'(x) = 2x^2 - 4x - 10");w.line();
	w.mathDisp("f''(x) = 6x - 4");w.line();
	w.line();
	w.line();
	w.line("Графически определены два положительных корня в областях: ");
	w.line("1 < x~1~ < 2; 3 < x~2~ < 4");w.line();
	w.head2("Метод Ньютона");
	w.line("Пусть функция $f(x)$ дважды непрерывно дифференцирована. Пусть в окрестности корня уравнения $f(x)=0$, в некоторой точке $a_0$, выполняется соотношение $f(a_0)\\cdot f''(a_0) >0$. Из точки $A(a_0:f(a_0))$ проведём касательную к графику функции $y=f(x)$ . Она пересечёт ось $OX$ в точке $a_1$ :");
	w.line("$a_1 = a_0 - \\frac{f(a_0)}{f'(a_0)}$ . Из точки $A_1(a_1;f(a_1))$ проведём касательную к графику функции $y=f(x)$ . Она пересечёт ось $OX$ в точке $a_2 = a_1 - \\frac{f(a_1)}{f'(a_1)}$ .");
	w.line("Таким образом, можно получить бесконечную последовательность точек $a_n$, которые быстро будут приближаться к корню.");
	w.line();
	w.lineBreak();
	w.line("Из условия $f(x_0) \\cdot f''(x_0) > 0$ выберем начальную точку: x~0~ .");w.line();
	function _fx(x)
	{
		return x*x*x- 2*x*x - 10*x + 15;
	}
	function _fxD(x)
	{
		return 3*x*x - 4*x - 10;
	}
	function _fxD2(x)
	{
		return 6*x - 4;
	}
	function _fxprint(x, fx, isfd2, isphid)
	{
		var fdefp = "f(";
		if(isfd2)
			fdefp = "f''(";
		else if(isphid)
			fdefp = "\\varphi '("
		return fdefp+x+") = "+_roundPrec(fx(x));
	}
	w.mathDisp(_fxprint(1, _fx)+"; "+_fxprint(1, _fxD2, true)+"; "+_fxprint(3, _fx)+"; "+_fxprint(3, _fxD2, true)+"; ");w.line();
	w.mathDisp(_fxprint(2, _fx)+"; "+_fxprint(2, _fxD2, true)+"; "+_fxprint(4, _fx)+"; "+_fxprint(4, _fxD2, true)+". ");w.line();
	w.line("x~0~ = 1; ");
	var _x = 1, _xprev = 1, _yprev = 0, _ydprev = 0, epsilon = 0, i = 0;
	for (i = 1; i < 100; i++) {
		_ydprev = _roundPrec(_fxD(_xprev));
		_yprev = _roundPrec(_fx(_xprev));
		_x = _roundPrec(_xprev - (_yprev/_ydprev));
		epsilon = _roundPrec(Math.abs(_x - +_xprev));

		w.mathDisp("x_"+i+" = "+"x_"+(i-1)+" - \\frac{f(x_"+(i-1)+")}{f'(x_"+(i-1)+")} = "+_xprev+" - \\frac{"+_yprev+"}{"+_ydprev+"} = "+_x);
		w.line();
		w.mathDisp("\\varepsilon_"+i+" = |"+_x+" - "+_xprev+"| = "+epsilon+(epsilon>0.01?" > 0.01":" < 0.01"));
		w.line();
		if(epsilon < 0.01)
		{
			w.debug("корень метода ньютона = "+ _x);
			break;
		}
		_xprev = _x;
	};
	w.line("Ответ: $x = x_3 = 1.382$ .");
	w.line();
	w.pageBreak();
	w.line();
	w.head2("Метод простой итерации");w.line();
	w.line("Пусть уравнение $f(x)=0$ удалось преобразовать к равносильному уравнению $x=\\varphi(x)$, функция $\\varphi(x)$ которого обладает свойством: в окрестности корня $x$:");
	w.line("$| \\varphi '(x) | \\leq q < 1$");
	w.line("то итерационный процесс $x_{n+1} = \\varphi(x_n)$ будет сходиться к корню x. уравнения $f(x)=0$. Причём, сходимость будет тем быстрее, чем меньше $q$. Величины $x_n - x$ будут убывать не медленнее бесконечно-убывающей прогрессии со знаменателем $q$.");
	w.line();
	w.lineBreak();
	w.line("Преобразуем $f(x)$ к $x=\\varphi(x)$ : $\\displaystyle x = 2 + \\frac{10}{x} - \\frac{15}{x^2}$ ; $\\displaystyle \\varphi '(x) = \\frac{30}{x^3} - \\frac{10}{x^2}$ ");
	w.line();
	w.line("Из условия $\\varphi '(x_0) < 1$ выберем начальную точку: x~0~ .");w.line();
	function phi (x) {
		return 2 + 10/x - 15/(x*x);
	}
	function phiD (x) {
		return 30/(x*x*x) - 10/(x*x);
	}
	w.mathDisp(_fxprint(1, phiD, false, true)+"; "+_fxprint(2, phiD, false, true)+"; "+_fxprint(4, phiD, false, true)+" . ");
	w.line("При x~0~ = 4 имеется сходимость, $q = | \\varphi '(x_0) | = 0.1563$ .");
	var testEpsilon = _roundPrec(((1 - 0.1563)/0.1563) * 0.01);
	w.line();
	w.mathDisp("\\varepsilon = \\frac{1 - q}{q} \\cdot \\varepsilon = \\frac{1 - 0.1563}{0.1563} \\cdot 0.01 = "+testEpsilon);
	w.line();
	_xprev = 4;
	for (i = 1; i < 100; i++) {
		_x = _roundPrec(phi(_xprev));
		epsilon = _roundPrec(Math.abs(_x - +_xprev));
		w.mathDisp("x_"+i+" = \\varphi(x_"+(i-1)+") = 2 + \\frac{10}{"+_xprev+"} - \\frac{15}{"+_roundPrec(_xprev*_xprev)+"} = "+_x);
		w.line();
		w.mathDisp("\\varepsilon_"+i+" = |"+_x+" - "+_xprev+"| = "+epsilon+(epsilon>testEpsilon?" > "+testEpsilon:" < "+testEpsilon));
		w.line();
		if(epsilon < testEpsilon)
		{
			w.debug("корень метода прост итерации = "+ _x);
			break;
		}
		_xprev = _x;
	}	
	w.line("Ответ: $x = x_3 = 3.6171$ .");

	w.line();
	//-----------------------------------
	w.debug("2.1 метод Ньютона и итерации ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}