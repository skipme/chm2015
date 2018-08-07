var w = require("./write.js").write();
/*
\begin{center}
\begin{tikzpicture}
  \begin{axis}[ 
    legend style={at={(1,0.3)}, anchor=west},
    xlabel=$x_1$,
    ylabel={$x_2$},
   grid=major,
width=10cm,height=10cm,
xmin=-2.0, xmax=2.5,
axis x line=center,
axis y line=center,
xtick={-2,-1,2,1,1.25,2},
ytick={1,1.5,3.5}
  ] 
    \addplot[style={mark=square}, smooth] {sqrt((9- (x^2))/4)}; \addlegendentry{$f(x_1) = \sqrt{\frac{9 - x_1^2}{4}}$};
    \addplot[style={mark=asterisk}, smooth] {(x+exp(x))/3)}; \addlegendentry{$f(x_1) = \frac{x_1 + e^{x_1}}{3}$};
    \addplot[only marks] coordinates {
 (1.1178,1.3920)
 };
  \end{axis}
\end{tikzpicture}
\end{center}
*/
var util = {
	// определитель
	calcDeterm: function (A) {
	    var s, k = A.length;
	    var det = 0;
	    if (A.length == 1) { //bottom case of the recursive function 
	        return A[0][0];
	    }
	    if (A.length == 2) {       
	        det =  A[0][0] * A[1][1] - A[1][0] * A [0][1];
	        return _roundPrec(det);
	    }
	    for (var i = 0; i < k; i++) {
	        //creates smaller matrix- values not in same row, column
	        var smaller = new Array(A.length - 1);
	        for (h = 0; h < smaller.length; h++) {
	            smaller[h] = new Array(A.length - 1);
	        }
	        for (a = 1; a < A.length; a++) {
	            for (b = 0; b < A.length; b++) {
	                if (b < i) {
	                    smaller[a - 1][b] = A[a][b];
	                } else if (b > i) {
	                    smaller[a - 1][b - 1] = A[a][b];
	                }
	            }
	        }
	        if (i % 2 == 0) {
	            s = 1;
	        } else {
	            s = -1;
	        }
	        det += s * A[0][i] * (calcDeterm(smaller));
	    }
	    return _roundPrec(det);
	}
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

	w.line2("2.2. Методом Ньютона решить систему нелинейных уравнений (при наличии нескольких решений найти то из них, в котором значения неизвестных являются положительными), начальное приближение определить графически .");
	
	w.math2(w.systemLeft(
		"\\frac{x_1^2}{9} + \\frac{x_2^2}{9 / 4} - 1 = 0",
		"3x_2 - e^{x_1} - x_1 = 0"
		));
	w.line();
	w.line("Метод Ньютона решения систем сводится к последовательному решению систем линейных алгебраических уравнений, полученных путем линеаризации системы нелинейных уравнений. Для k-го приближения неизвестных ищется приближение (k+1) через приращение $\\Delta x^{k}$ : ");
	w.math2(w.casesLeft(
		"\\left. \\frac{\\partial f_1}{\\partial x}\\right|_{(x_k;y_k)} \\cdot \\Delta x_{k+1} + \\left. \\frac{\\partial f_1}{\\partial y}\\right|_{(x_k;y_k)} \\cdot \\Delta y_{k+1} + f_1(x_k;y_k) = 0",
		"\\left. \\frac{\\partial f_2}{\\partial x}\\right|_{(x_k;y_k)} \\cdot \\Delta x_{k+1} + \\left. \\frac{\\partial f_2}{\\partial y}\\right|_{(x_k;y_k)} \\cdot \\Delta y_{k+1} + f_2(x_k;y_k) = 0"
		));
	w.line();
	w.math2(w.casesLeft(
		"x_{k+1} = x_k + \\Delta x_{k+1}",
		"y_{k+1} = y_k + \\Delta y_{k+1}"
		));
	w.line();
	w.line("Для каждой итерации должно выполняться условие: ");
	w.mathDisp("J = "+w.matrix([
		["\\frac{\\partial f_1(x_k)}{\\partial x}", "\\frac{\\partial f_1(y_k)}{\\partial y}"],
		["\\frac{\\partial f_2(x_k)}{\\partial x}", "\\frac{\\partial f_2(y_k)}{\\partial y}"]
		])+"; | J | \\neq 0");
	w.line();
	w.lineBreak();
	w.line([
"\\begin{center}",
"\\begin{tikzpicture}",
"  \\begin{axis}[ ",
"    legend style={at={(1,0.3)}, anchor=west},",
"    xlabel=$x_1$,",
"    ylabel={$x_2$},",
"   grid=major,",
"width=10cm,height=10cm,",
"xmin=-2.0, xmax=2.5,",
"axis x line=center,",
"axis y line=center,",
"xtick={-2,-1,2,1,1.25,2},",
"ytick={1,1.5,3.5}",
"  ] ",
"    \\addplot[style={mark=square}, smooth] {sqrt((9- (x^2))/4)}; \\addlegendentry{$f(x_1) = \\sqrt{\\frac{9 - x_1^2}{4}}$};",
"    \\addplot[style={mark=asterisk}, smooth] {(x+exp(x))/3)}; \\addlegendentry{$f(x_1) = \\frac{x_1 + e^{x_1}}{3}$};",
"    \\addplot[only marks] coordinates {",
" (1.1178,1.3920)",
" };",
"  \\end{axis}",
"\\end{tikzpicture}",
"\\end{center}"
].join("\r\n"));
	w.line();
	w.lineBreak();
	w.math2("1 < x_1 < 1.25 ; 1 < x_2 < 1.5");w.line();
	w.math2("\\frac{\\partial f_1}{\\partial x_1} = \\frac{2x_1}{9} ; \\frac{\\partial f_1}{\\partial x_2} = \\frac{8x_2}{9} ;");
	// w.math2("");w.line();
	w.math2("\\frac{\\partial f_2}{\\partial x_1} = -e^{x_1} - 1 ;"+"\\frac{\\partial f_2}{\\partial x_2} = 3 .");
	// w.math2();w.line();
	w.math2("x_1^{(0)} = x_2^{(0)} = 1 .");
	// 1 нелинейная функция системы
	function f1(x1,x2)
	{
		return _roundPrec( ((x1*x1)/9)+((x2*x2)/(9/4))-1 );
		// return x1-2*x2*x2+1;
	}
	// 2 нелинейная функция системы
	function f2(x1,x2)
	{
		return _roundPrec( 3*x2-Math.exp(x1)-x1 );
		// return -(x1*x1)+2*x2-1;
	}
	// 1 нелинейная функция системы df/dx
	function Dfx1X1(x1)
	{
		return _roundPrec( (2*x1)/9 );
		// return 1;
	}
	// 1 нелинейная функция системы df/dy
	function Dfx1X2(x2)
	{
		return _roundPrec( (8*x2)/9 );
		// return -4*x2;
	}
	// 2 нелинейная функция системы df/dx
	function Dfx2X1(x1)
	{
		return _roundPrec( -Math.exp(x1)-1 );
		// return -2*x1;
	}
	// 2 нелинейная функция системы df/dy
	function Dfx2X2(x2)
	{
		return 3;
		// return 2;
	}
	function MakeYakobi(x1,x2)
	{
		return [
			[Dfx1X1(x1), Dfx1X2(x2)],
			[Dfx2X1(x1), Dfx2X2(x2)],
		];
	}
	// дельта y
	function calc_xD2(x1,x2)
	{
		var a = Dfx1X1(x1), 
			b = Dfx1X2(x2), 
			c = f1(x1,x2),
			d = Dfx2X1(x1),
			e = Dfx2X2(x2),
			f = f2(x1,x2);

		// console.log("\tsys:\n\t", a.toFixed(4) + "\u0394x1 + "+b.toFixed(4)+"\u0394x2 + "+c.toFixed(4)+"=0\n\t", 
		// 	d.toFixed(4) + "\u0394x1 + "+e.toFixed(4)+"\u0394x2 + "+f.toFixed(4)+"=0");
		w.math2(w.casesLeft(
			a+"\\Delta x_1 + "+pneg(b)+"\\Delta x_2 + "+pneg(c)+" = 0", 
			d+"\\Delta x_1 + "+pneg(e)+"\\Delta x_2 + "+pneg(f)+" = 0"
			));
		w.line();
		// console.log("\n\t norm F:\n\t", Math.max(Math.abs(c),Math.abs(f)).toFixed(4));
		return ((d*c/a)-f)/(-(d*b/a)+e);
	}
	// дельта x
	function calc_xD1(x1,x2,xD2)
	{
		var a = Dfx1X1(x1), 
			b = Dfx1X2(x2), 
			c = f1(x1,x2);

		return (-1*b*xD2-c) / a;
	}
	var i = 0, x1 = 1, x2 = 1, 
		nowX1, nowX2, ECHK = 0.01;
	w.line();w.pageBreak();
	for (i = 1; i <= 50; i++) {
		// console.info("iteration: "+i+': Yakobi\t\n', printYa(MakeYakobi(x1,x2)));
		w.line();
		w.line(i+") ");
		w.line();
		var determ = util.calcDeterm(MakeYakobi(x1,x2));
		// w.mathDisp("\\Upsilon = "+w.matrix(MakeYakobi(x1,x2))+"; \\Delta\\Upsilon = "+determ+" \\not= 0");
		 w.mathDisp("J = "+w.matrix(MakeYakobi(x1,x2))+"; \\Delta J = "+determ+" \\not= 0");
		w.line();
		if(Math.abs(determ)<0.1)
			throw new Error("Определитель матрицы Якоби близок к нулю, необходимо проверить сходимость");
		// console.log("\t(!=0)Yakobi determ ", determ.toFixed(4));
		w.mathDisp("f_1("+x1+";"+x2+") = "+f1(x1,x2)+"; f_2("+x1+";"+x2+") = "+f2(x1,x2));
		w.line();
		var Fnorm = Math.max(Math.abs(f1(x1,x2)), Math.abs(f2(x1,x2)));
		w.mathDisp("F = "+w.matrix([[f1(x1,x2)],[f2(x1,x2)]])+"; \\parallel F \\parallel _1 = "+Fnorm);
		w.line();

		var DX2 = _roundPrec(calc_xD2(x1, x2));
		var DX1 = _roundPrec(calc_xD1(x1, x2, DX2));
		nowX1 = _roundPrec(DX1+x1);
		nowX2 = _roundPrec(DX2+x2);

		w.math2("\\Delta x_1^"+i+" = "+DX1+"; "+
			"\\Delta x_2^"+i+" = "+DX2+". ");
		// w.line();
		w.math2(" x_1^"+i+" = x_1^"+(i-1)+" + \\Delta x_1^"+i+" = "+DX1+" + "+x1+" = "+nowX1+"; "+
			" x_2^"+i+" = x_2^"+(i-1)+" + \\Delta x_2^"+i+" = "+DX2+" + "+x2+" = "+nowX2+". ");
		// w.line();
		w.math2("|\\Delta x_1| "+(DX1>0.01?" > ":" < ")+" \\varepsilon ;"+
			"|\\Delta x_2| "+(DX2>0.01?" > ":" < ")+" \\varepsilon ;"+
			"\\parallel F \\parallel _1 "+(Fnorm>0.01?" > ":" < ")+" \\varepsilon ;");
		w.line();
		// console.log("\t\u0394x1 = "+DX1.toFixed(4), ", \u0394x2 = "+DX2.toFixed(4));
		// console.info("\tx1 = "+nowX1.toFixed(4), ", x2 = "+nowX2.toFixed(4));

		x1 = nowX1;
		x2 = nowX2;
		if(Math.abs(DX1) < ECHK && Math.abs(DX2) < ECHK
			&& Math.max(Math.abs(f1(x1,x2)), Math.abs(f2(x1,x2))) < ECHK)
			break;
	};
	w.line("Ответ: $x_1 = x_1^"+i+" = 1.1179; x_2 = x_2^"+i+" = 1.392$ .");
	// при проверке в исходные уравнения подставляем найденные корни, должен выйти 0
	var out1 = f1(x1,x2), out2 = f2(x1,x2);
	w.debug('checking: '+((Math.abs(out1)<0.001&&Math.abs(out2)<0.001)?"OK":"ОШИБКА")+', f1:'+out1.toFixed(6)+ "f2:"+out2.toFixed(6));
	
	//-----------------------------------
	w.debug("2.2 метод Ньютона систем ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}