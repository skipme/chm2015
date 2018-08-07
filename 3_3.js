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
var Gauss = {
	gauss: function(A) {
	    var n = A.length;
	    // console.log(this.printM(A));
	    for (var i=0; i<n; i++) {//by rows

	        // Make all rows below this one 0 in current column
	        for (k=i+1; k<n; k++) {
	            var c = _roundPrec(-A[k][i]/A[i][i]);
	            // console.log("row: "+k+" column:"+i+" coeff: "+c);
	            for(var j=i; j<n+1; j++) {
	                if (i==j) {
	                    A[k][j] = 0;
	                } else {
	                    A[k][j] += _roundPrec(c * A[i][j]);
	                }
	            }
	            // console.log("after: \n"+this.printM(A));
	        }
	        
	    }
		// console.log("triangular: \n"+this.printM(A));
	    // Solve equation Ax=b for an upper triangular matrix A
	    var x= new Array(n);

	    for (var i = 0; i < n; i++) {
	    	var mnk = A[i][i];
	    	for (var j = 0; j < A[i].length; j++) {
	    		A[i][j] = _roundPrec(A[i][j] / mnk);
	    	};
	    };
	    // console.log("diagonal: \n"+this.printM(A));
	    for (var i=n-1; i>0; i--) {
	        // Make all rows above this one 0 in current column
	        for (k=i-1; k>=0; k--) {
	            var c = _roundPrec(-A[k][i]/A[i][i]);
	            // console.log("row: "+k+" column:"+i+" coeff: "+c);
	            for(var j=A[k].length-1; j>=i; j--) {
	                if (i==j) {
	                    A[k][j] = 0;
	                } else {
	                    A[k][j] += _roundPrec(c * A[i][j]);
	                }
	            }
	            // console.log("after: \n"+this.printM(A));
	        }
	        
	    }
	    // console.log("afterall: \n"+this.printM(A));
	    var x = [];
	    for (var i = 0; i < n; i++) {
	    	x.push(_roundPrec(A[i][n]));
	    };
	    return x;
	},
	printM: function(v)
	{
		if(v.length === 3)
		{
		  return "\t" + v[0][0].toFixed(4) + ", " + v[0][1].toFixed(4) + ", " + v[0][2].toFixed(4)+ ", " + v[0][3].toFixed(4)
		  + "\n\t" + v[1][0].toFixed(4) + ", " + v[1][1].toFixed(4) + ", " + v[1][2].toFixed(4)+ ", " + v[1][3].toFixed(4)
		  + "\n\t" + v[2][0].toFixed(4) + ", " + v[2][1].toFixed(4) + ", " + v[2][2].toFixed(4)+ ", " + v[2][3].toFixed(4);
		}else{
			 return "\t" + v[0][0].toFixed(4) + ", " + v[0][1].toFixed(4) + ", " + v[0][2].toFixed(4)
		  + "\n\t" + v[1][0].toFixed(4) + ", " + v[1][1].toFixed(4) + ", " + v[1][2].toFixed(4);
		}
	},
	calc: function(a,b,c,d,e,f,g,h)
	{
		return this.gauss([[a,b,c,d],[b,c,e,f],[c,e,g,h]]);
	},
	calcp1: function(sx2, sx, sxy, n, sy)
	{
		return this.gauss([[sx2,sx,sxy],[sx,n,sy]]);
	}
};
function getPages()
{
	w.useStringOut();
	w.line2("3.3. Для таблично заданной функции путем решения нормальной системы МНК найти приближающие многочлены а) 1-ой и б) 2-ой степени. Для каждого из приближающих многочленов вычислить сумму квадратов ошибок. Построить графики приближаемой функции и приближающих многочленов.");
	
	var AX = [-.9, 0, .9, 1.8, 2.7, 3.6];
	var AY = [-1.2689, 0, 1.2689, 2.6541, 4.4856, 9.9138];

	w.lineBreak(1);
	w.latexTableHeader(7);
	w.latexTableLine("$i$", 0, 1, 2, 3, 4, 5);
	w.latexTableLine.apply(w, ["$x_i$"].concat(AX));
	w.latexTableLine.apply(w, ["$y_i$"].concat(AY));
	w.latexTableEnd();
	w.line();
	w.line("n = 6");
	w.line();
	w.lineBreak(1);
	w.line("МНК основан на минимизации суммы квадратов отклонений (среднеквадратичной невязке), т.е. если аппроксимирующая функция $P_m(x) = a_m x^m + a_{m-1}x^{m-1} + \\dots + a_1x + a_0$ и \r\n $$S(a_0, a_1, a_2, \\dots , a_n) = \\sum_{i=0}^n(P_m(x_i)-y_i)^2$$ тогда \r\n $$S_{\\text{min}} => \\frac{\\partial S}{\\partial a_0} = 0; \\frac{\\partial S}{\\partial a_1} = 0; \\dots \\frac{\\partial S}{\\partial a_m} = 0;$$");
	w.line();
	w.line("Тогда для \r\n $$P_2(x) = ax^2 + bx + c$$ \r\n чтобы $$S=\\sum_{i=0}^n(ax^2 + bx + c - y_i)^2 = \\mathrm{min}$$");
	w.line("Для нахождения a,b,c получим:");
	w.math2(w.matrix([
		["\\frac{\\partial S}{\\partial a} = \\displaystyle\\sum_{i=0}^n 2(ax^2 + bx + c - y_i)\\cdot x_i^2 = 0"],
		["\\frac{\\partial S}{\\partial b} = \\displaystyle\\sum_{i=0}^n 2(ax^2 + bx + c - y_i)\\cdot x_i = 0"],
		["\\frac{\\partial S}{\\partial c} = \\displaystyle\\sum_{i=0}^n 2(ax^2 + bx + c - y_i) = 0"]
		], "array", "l"));
	w.line();
	w.line("Система многочлена второй степени:");
	w.math2("\\displaystyle "+w.casesLeft(
		"a\\cdot\\sum_{i=0}^{5} x_i^4 + b\\cdot\\sum_{i=0}^{5} x_i^3 + c\\cdot\\sum_{i=0}^{5} x_i^2 = \\sum_{i=0}^{5} x_i^2 \\cdot y_i",
		"a\\cdot\\sum_{i=0}^{5} x_i^3 + b\\cdot\\sum_{i=0}^{5} x_i^2 + c\\cdot\\sum_{i=0}^{5} x_i = \\sum_{i=0}^{5} x_i \\cdot y_i",
		"a\\cdot\\sum_{i=0}^{5} x_i^2 + b\\cdot\\sum_{i=0}^{5} x_i + c\\cdot n = \\sum_{i=0}^{5} y_i"
		));w.line();
	w.lineBreak(1);
	w.line("Система многочлена первой степени:");
	w.math2("\\displaystyle "+w.casesLeft(
		"b\\cdot\\sum_{i=0}^{5} x_i^2 + c\\cdot\\sum_{i=0}^{5} x_i = \\sum_{i=0}^{5} x_i \\cdot y_i",
		"b\\cdot\\sum_{i=0}^{5} x_i + c\\cdot n = \\sum_{i=0}^{5} y_i"
		));w.line();
	w.lineBreak(2);
	function xpow2(x,y)
	{
		return _roundPrec(x*x);
	}
	function xpow3(x,y)
	{
		return _roundPrec(x*x*x);
	}
	function xpow4(x,y)
	{
		return _roundPrec(x*x*x*x);
	}
	function xmuly(x,y)
	{
		return _roundPrec(x*y);
	}
	function xpow2y(x,y)
	{
		return _roundPrec(x*x*y);
	}
	function map(aX, aY, func)
	{
		if(typeof(func) !== "function")
			throw new Error("func not function");
		var result = [];
		for (var i = 0; i < aX.length; i++) {
			result.push(func(aX[i], aY[i], i));
		};

		return result;
	}
	function sum(a)
	{
		var result = 0.0;
		for (var i = 0; i < a.length; i++) {
			result += a[i];
		};
		return Number(result.toFixed(4));
	}
	var xi = Number(sum(AX).toFixed(4));//sum(map(AX, AY, xnone));
	var xi2 = sum(map(AX, AY, xpow2));
	var xi3 = sum(map(AX, AY, xpow3));
	var xi4 = sum(map(AX, AY, xpow4));
	var yi = Number(sum(AY).toFixed(4));
	var xiyi = sum(map(AX, AY, xmuly));
	var xi2yi = sum(map(AX, AY, xpow2y));
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
	w.pageBreak();
	// w.debug(xi+" "+xi2yi);
	w.mathDisp("\\sum_{i=0}^{5} x_i = "+printsum(AX,"","")+" = "+xi);w.line();
	w.mathDisp("\\sum_{i=0}^{5} x_i^2 = "+printsum(AX,"","^2")+" = "+printsum(map(AX, AY, xpow2))+" = " +xi2);w.line();
	w.mathDisp("\\sum_{i=0}^{5} x_i^3 = "+printsum(AX,"","^3")+" = "+printsum(map(AX, AY, xpow3))+" = " +xi3);w.line();
	w.mathDisp("\\sum_{i=0}^{5} x_i^4 = "+printsum(AX,"","^4")+" = "+printsum(map(AX, AY, xpow4))+" = " +xi4);w.line();
	w.mathDisp("\\sum_{i=0}^{5} y_i = "+printsum(AY,"","")+" = "+yi);w.line();
	function xmulyPrint(x,y)
	{
		return pneg(_roundPrec(x))+" \\cdot "+pneg(_roundPrec(y));
		// return "("+pneg(_roundPrec(x))+" \\cdot "+pneg(_roundPrec(y))+")";
	}
	w.mathDisp("\\sum_{i=0}^{5} x_i \\cdot y_i = "+printsum(map(AX, AY, xmulyPrint))+" = "+printsum(map(AX, AY, xmuly))+" = " +xiyi);w.line();
	function xpow2yPrint(x,y)
	{
		return pneg(_roundPrec(x*x))+" \\cdot "+pneg(_roundPrec(y));
	}
	w.mathDisp("\\sum_{i=0}^{5} x_i^2 \\cdot y_i = "+printsum(map(AX, AY, xpow2yPrint))+" = "+printsum(map(AX, AY, xpow2y))+" = " +xi2yi);w.line();
	w.line();
	w.lineBreak(1);
	w.line("Система многочлена второй степени:");
	// w.math2("\\displaystyle "+w.casesLeft(
		// "a\\cdot\\sum_{i=0}^{5} x_i^4 + b\\cdot\\sum_{i=0}^{5} x_i^3 + c\\cdot\\sum_{i=0}^{5} x_i^2 = \\sum_{i=0}^{5} x_i^2 \\cdot y_i",
		// "a\\cdot\\sum_{i=0}^{5} x_i^3 + b\\cdot\\sum_{i=0}^{5} x_i^2 + c\\cdot\\sum_{i=0}^{5} x_i = \\sum_{i=0}^{5} x_i \\cdot y_i",
		// "a\\cdot\\sum_{i=0}^{5} x_i^2 + b\\cdot\\sum_{i=0}^{5} x_i + c\\cdot n = \\sum_{i=0}^{5} y_i"
		// ));
	w.math2(w.casesLeft(
		xi4+"a + "+xi3+"b + "+xi2+"c = "+xi2yi,
		xi3+"a + "+xi2+"b + "+xi+"c = "+xiyi,
		xi2+"a + "+xi+"b + "+6+"c = "+yi
		));

	var abc = Gauss.calc(xi4, xi3, xi2, xi2yi, xi, xiyi, (AX.length), yi);
	var bc = Gauss.calcp1(xi2, xi, xiyi, (AX.length), yi);
	w.line();
	w.line("Решение системы многочлена второй степени: $a = "+abc[0]+", b = "+abc[1]+", c = "+abc[2]+"$");
	w.line();

	// w.pageBreak();

	w.line("Система многочлена первой степени:");
	// w.math2("\\displaystyle "+w.casesLeft(
	// 	"b\\cdot\\sum_{i=0}^{5} x_i^2 + c\\cdot\\sum_{i=0}^{5} x_i = \\sum_{i=0}^{5} x_i \\cdot y_i",
	// 	"b\\cdot\\sum_{i=0}^{5} x_i + c\\cdot n = \\sum_{i=0}^{5} y_i"
	// 	));
	w.math2(w.casesLeft(
		"b + "+xi+"c = "+xiyi,
		"b + "+6+"c = "+yi
		));
	w.line();
	w.line("Решение системы многочлена первой степени: $b = "+bc[0]+", c = "+bc[1]+"$");
	
	w.line();
	w.mathDisp("P_1(x) = "+_roundPrec(bc[0])+"x + "+pneg(_roundPrec(bc[1])) );
	w.line();
	w.mathDisp("P_2(x) = "+_roundPrec(abc[0])+"x^2 + "+pneg(_roundPrec(abc[1]))+"x + "+pneg(_roundPrec(abc[2])));
	w.line();
	w.line("\\begin{center} \r\n \
\\begin{tikzpicture} \r\n \
  \\begin{axis}[  \r\n \
    legend style={at={(0.9,0)}, anchor=east}, \r\n \
    xlabel=$x$, \r\n \
    ylabel={$y$}, \r\n \
   grid=major, \r\n \
width=10cm,height=10cm, \r\n \
xmin=-1.6, xmax=4.2, \r\n \
axis x line=center, \r\n \
axis y line=center \r\n \
  ]  \r\n \
    \\addplot[style={mark=+}, smooth] {0.5085*x^2 + 0.8725*x -0.464}; \\addlegendentry{$f(x) = 0.5085x^2 + 0.8725x - 0.4641$}; \r\n \
    \\addplot[style={mark=|}, smooth] {2.2463*x -0.1904}; \\addlegendentry{$f(x) = 2.2463x -0.1904$}; \r\n \
    \\addplot[style={mark=o, densely dashed, very thick}] coordinates { \r\n \
    	(-.9, -1.2689) (0,0) (.9,1.2689) (1.8,2.6541) (2.7,4.4856) (3.6,9.9138) };\r\n \
  \\addplot[style={mark=o}, only marks] coordinates { \r\n \
  		(-.9, -1.2689) (0,0) (.9,1.2689) (1.8,2.6541) (2.7,4.4856) (3.6,9.9138)  };  \r\n \
  \\end{axis} \r\n \
\\end{tikzpicture} \r\n \
\\end{center}");
	w.debug("ANSWER:");
	w.debug("P2: "+abc[0].toFixed(4)+"x^2"+(abc[1]>0?" + ":" ")+abc[1].toFixed(4)+"x"+(abc[2]>0?" + ":" ")+abc[2].toFixed(4)+" = 0");
	w.debug("P1: "+bc[0].toFixed(4)+"x"+(bc[1]>0?" + ":" ")+bc[1].toFixed(4)+" = 0");
	function p1(x,y,indx)
	{
		var p = _roundPrec(Number(bc[0].toFixed(4))*x+Number(bc[1].toFixed(4)));
		return Math.pow(p-AY[indx], 2);
	}
	function quadErrPrint1(x,y,idx)
	{
		var p = _roundPrec(Number(bc[0].toFixed(4))*x+Number(bc[1].toFixed(4)));
		return "("+pneg(p)+" - "+pneg(y)+")^2";
	}

	function p2(x,y,indx)
	{
		var p = _roundPrec(Number(abc[0].toFixed(4))*x*x+Number(abc[1].toFixed(4))*x+Number(abc[2].toFixed(4)));
		return Math.pow(p-AY[indx], 2);
	}
	function quadErrPrint2(x,y,idx)
	{
		var p = _roundPrec(Number(abc[0].toFixed(4))*x*x+Number(abc[1].toFixed(4))*x+Number(abc[2].toFixed(4)));
		return "("+pneg(p)+" - "+pneg(y)+")^2";
	}

	w.mathDisp("S_1(x) = \\sum_{i=0}^{5}(P_1(x_i) - y_i)^2 = "+printsum(map(AX, AY, quadErrPrint1))+" = "+printsum(map(AX, AY, p1))+" = "+sum(map(AX, AY, p1)));
	w.line();
	w.mathDisp("S_2(x) = \\sum_{i=0}^{5}(P_2(x_i) - y_i)^2 = "+printsum(map(AX, AY, quadErrPrint2))+" = "+printsum(map(AX, AY, p2))+" = "+sum(map(AX, AY, p2)));
	w.line();
	w.debug("S2= "+printsum(map(AX, AY, p2))+"= "+sum(map(AX, AY, p2)));
	w.debug("S1= "+printsum(map(AX, AY, p1))+"= "+sum(map(AX, AY, p1)));

	w.lineBreak(1);
	w.line("Ответ: ");w.mathDisp(w.matrix([
		["P_1(x) = "+_roundPrec(bc[0])+"x + "+pneg(_roundPrec(bc[1]))],
		["P_2(x) = "+_roundPrec(abc[0])+"x^2 + "+pneg(_roundPrec(abc[1]))+"x + "+pneg(_roundPrec(abc[2]))],
		["S_1(x) = "+sum(map(AX, AY, p1))],
		["S_2(x) = "+sum(map(AX, AY, p2))]
		], "array", "l"));
	//-----------------------------------
	w.debug("3.3 МНК ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}