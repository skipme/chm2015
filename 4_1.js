var w = require("./write.js").write();

var util = {
	N_V: function(v)
	{
	  var Max = Number.MIN_VALUE;
	  for (var i = 0; i < v.length; i++) {
	    if(Max < Math.abs(v[i]))
	      Max = Math.abs(v[i]);
	  };
	  return Max;
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
function _roundPrec5(num)
{
	return Number(num.toFixed(5));
}
function getPages()
{
	w.useStringOut();
	w.line2("4.1. Решить задачу Коши для обыкновенного дифференциального уравнения 1-го порядка на указанном отрезке с заданным шагом h. Полученное численное решение сравнить с точным. Определить погрешность решения.");
	w.math2(w.casesLeft(
		"y' = - \\frac{1y}{2x} + x^2",
		"y(1) = 1"
		));
	w.line();
	w.mathDisp("x \\in [1, 2], h = 0.1");w.line();
	w.line("Точное решение: ");w.mathDisp("y = \\frac{2}{7}x^3 + \\frac{5}{7\\sqrt{x}}");w.line();
	// ---------------------------------------------------------
	function FxStrong(x)
	{
		return _roundPrec((2/7) * (x*x*x) + 5/(7*Math.sqrt(x)));
	}
	function FxD(x,y)
	{
		return _roundPrec((-1*(y/(2*x))) + (x*x));
	}
	function FxDDef(x,y)
	{
		return "-"+y+"/(2*"+x+") + ("+x+"^2) = " + _roundPrec((-1*(y/(2*x)))) + " + " + _roundPrec((x*x))+"";
	}
	function FxDDefTex(x,y,h)
	{
		return "(-1 \\cdot \\frac{"+y+"}{2\\times "+x+"} + "+x+"^2) = "+h+"\\cdot (" + _roundPrec((-1*(y/(2*x)))) + " + " + _roundPrec((x*x))+")";
	}
	function makeTable(fx, x0, xk, step)
	{
		var cfx, nowx = x0, table = [];

		for (var i = 0; i < 100 && nowx <= xk; i++) {
			cfx = fx(nowx);
			table.push([nowx, _roundPrec(cfx)]);
			nowx = _roundPrec(nowx + step);
		};
		return table;
	}
	function printTable(table)
	{
		var result = "", columns = table.length +1, cline, heads = "ixy", rows = table[0].length +1;
		function rline(str){return result+=str+" \r\n";}
		function ctab(str){return cline+=str+" \t";}
		cline = ""; ctab("i");
		for (var i = 1; i < columns; i++) {
			ctab(i);
		};
		rline(cline);
		for (var i = 1; i < rows; i++) {
			cline = ""; 
			if(heads.length > i)
				ctab(heads[i]);
			else ctab(table[0][i-1]);
			for (var j = 1; j < columns; j++) {
				ctab(table[j-1][i-1]);
			};
			rline(cline);
		};
		
		return result;
	}
	function EulerTable(fxd, x0, xk, step, y0)
	{
		var cfx, nowx = x0+step, table = [[x0, y0]];
		function eulerIteration(index, x)
		{
			var result = table[index][1] + step*fxd(table[index][0], table[index][1]);
			w.debug("y"+(index+1)+" = "+table[index][1]+" + "+step+" * fxd("+table[index][0] +", "+ table[index][1]+") = "+table[index][1]+" + "+step+" * "+fxd(table[index][0], table[index][1])+" = "+_roundPrec(result));
			return result;
		}
		for (var i = 0; i < 100 && nowx <= xk; i++) {
			cfx = eulerIteration(i, nowx);
			table.push([nowx, _roundPrec(cfx)]);
			nowx = _roundPrec(nowx + step);
		};
		w.debug("");
		return table;
	}
	function EulerKoshiTable(fxd, x0, xk, step, y0)
	{
		var cfx, nowx = x0+step, table = [[x0, y0, "y~"]], predictorTable = [[x0, y0]];
		function predictIteration(index, x)
		{
			var result = table[index][1] + step*fxd(table[index][0], table[index][1]);
			w.debug("y~"+(index+1)+" = "+table[index][1]+" + "+step+" * fxd("+table[index][0] +", "+ table[index][1]+") = "+table[index][1]+" + "+step+" * "+fxd(table[index][0], table[index][1])+" = "+_roundPrec(result));
			return _roundPrec(result);
		}
		function correctIteration(index, x)
		{
			var result = table[index][1] + (step*0.5) * (fxd(table[index][0], table[index][1]) + fxd(predictorTable[index+1][0], predictorTable[index+1][1]));
			w.debug("y"+(index+1)+" = "+table[index][1]+" + ("+step+"*0.5)"+" * fxd("+table[index][0] +", "+ table[index][1]+") * fxd("+predictorTable[index+1][0] +", "+ predictorTable[index+1][1]+") = "+table[index][1]+" + "+(step*0.5)+" * "+fxd(table[index][0], table[index][1])+" * "+fxd(predictorTable[index+1][0], predictorTable[index+1][1])+" = "+_roundPrec(result));
			w.debug("");
			return _roundPrec(result);
		}
		for (var i = 0; i < 100 && nowx <= xk; i++) {
			var predy = predictIteration(i, nowx);
			predictorTable.push([nowx, _roundPrec(predy)]);

			cfx = correctIteration(i, nowx);
			table.push([nowx, _roundPrec(cfx), _roundPrec(predy)]);
			nowx = _roundPrec(nowx + step);
		};
		return table;
	}
	function RungeKuttTable(fxd, x0, xk, step, y0)
	{
		var cfx, nowx = x0+step, table = [[x0, y0, "k1", "x1/2", "k2", "k3", "k4", "Δy"]];
		function iteration(index, x)
		{
			var k1 = _roundPrec(step * fxd(table[index][0], table[index][1])),
				xHalf = _roundPrec(table[index][0] + step*0.5),
				k2 = _roundPrec(step * fxd(xHalf, _roundPrec(table[index][1] + (k1*0.5)))),
				k3 = _roundPrec(step * fxd(xHalf, _roundPrec(table[index][1] + (k2*0.5)))),
				k4 = _roundPrec(step * fxd(x, _roundPrec(table[index][1] + k3))),
				deltay = _roundPrec(_roundPrec(1/6)*(k1 + _roundPrec(2*k2) + _roundPrec(2*k3) + k4));
			var y = _roundPrec(table[index][1] + deltay);
			w.debug("");
			w.debug("k"+index+": ", "k1 = "+step+" * ["+FxDDef(table[index][0], table[index][1])+"] = "+step+" * ("+fxd(table[index][0], table[index][1])+") = "+k1);
			w.debug("k"+index+": ", "xHalf = "+table[index][0] + " + " + step + "/2 = " + xHalf);
			w.debug("k"+index+": ", "k2 = "+step+" *["+FxDDef(xHalf, _roundPrec(table[index][1] + (k1*0.5)))+"] = "+step+" * ("+fxd(xHalf, table[index][1] + (k1*0.5))+") = "+k2);
			w.debug("k"+index+": ", "k3 = "+step+" *["+FxDDef(xHalf, _roundPrec(table[index][1] + (k2*0.5)))+"] = "+step+" * ("+fxd(xHalf, _roundPrec(table[index][1] + (k2*0.5)))+") = "+k3);
			w.debug("k"+index+": ", "k4 = "+step+" *["+FxDDef(x, _roundPrec(table[index][1] + k3))+"] = "+step+" * ("+fxd(x, table[index][1] + k3)+") = "+k4);
			w.debug("Δy"+index+" = 1/6 * ("+k1+" + 2*"+k2+" + 2*"+k3+" + "+k4+") = "+deltay);
			w.debug("y"+(index+1)+" = "+table[index][1]+" + "+deltay+" = "+y);
			return [x, _roundPrec(y), k1, xHalf, k2, k3, k4, deltay]
		}
		for (var i = 0; i < 100 && nowx <= xk; i++) {
			cfx = iteration(i, nowx);
			table.push(cfx);
			nowx = _roundPrec(nowx + step);
		};
		return table;
	}
	function printsum(a, depre, depost)
	{
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
	// Квадратичная невязка
	// function calcError(tableStrong, tableE)
	// {
	// 	var srcarray = [],
	// 		subarray = [],
	// 		quadarray = [],
	// 		i = 0;
	// 	for (i = 0; i < tableStrong.length; i++) {
	// 		srcarray.push(_roundPrec(tableStrong[i][1])+" - " +_roundPrec(tableE[i][1]));
	// 		subarray.push(tableStrong[i][1] - tableE[i][1]);
	// 		quadarray.push(Math.pow(subarray[i], 2));
	// 	};
	// 	w.debug("error sum's: ");
	// 	w.debug(printsum(srcarray));
	// 	w.debug(printsum(subarray));
	// 	w.debug(printsum(quadarray));
	// 	var result = 0;
	// 	for (i = 0; i < quadarray.length; i++) {
	// 		result += quadarray[i];
	// 	};
	// 	return result.toExponential(4);
	// 	// return _roundPrec(result);
	// }

	// Норма невязки вектора
	function calcError(tableStrong, tableE)
	{
		var srcarray = [],
			subarray = [],
			i = 0;
		for (i = 0; i < tableStrong.length; i++) {
			srcarray.push(_roundPrec(tableStrong[i][1])+" - " +_roundPrec(tableE[i][1]));
			subarray.push(tableStrong[i][1] - tableE[i][1]);
		};
		w.debug("error sum's: ");
		w.debug(printsum(srcarray));
		w.debug(printsum(subarray));

		var result = util.N_V(subarray);
		// return result.toExponential(4);
		return _roundPrec(result);
	}
	function calc()
	{
		var start = 1, end = 2, step = 0.1, y0 = 1;
		// var start = 0, end = 1, step = 0.1, y0 = -1;

		var strongTable = makeTable(FxStrong, start, end, step);
		var eulerTable = EulerTable(FxD, start, end, step, y0);
		var eulerKoshiTable = EulerKoshiTable(FxD, start, end, step, y0, eulerTable);
		var rungeKuttTable = RungeKuttTable(FxD, start, end, step, y0);
		
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
		function mapSubf(a, subindex)
		{
			if(typeof(subindex) !== "number")
				throw new Error("func not function");
			var result = [];
			for (var i = 0; i < a.length; i++) {
				result.push(a[i][subindex]);
			};

			return result;
		}
		function mapSubArray(a)// take y only
		{
			return a[1];
		}
		function mapSubArrayX(a)// take x only
		{
			return a[0];
		}
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
		w.line("Выпишем точные значения на заданном промежутке:"); w.line();
		printLateXtable(strongTable);w.line();
		w.lineBreak(1);

		w.line2("1. Метод Эйлера");
		w.line("Если известно $y_i =$ значение табличной функции при $x=x_i$ , то можно вычислить новый узел $x=x_{i+1}$ и соответствующий ему $y_{i+1}$ по формуле: ");
		w.math2("y_{i+1} = y_i + h\\cdot f(x_i, y_i)");w.line();
		function printYEuler(index){
			var table = eulerTable;
			var fxd = FxD;
			var result = table[index][1] + step*fxd(table[index][0], table[index][1]);
			w.mathDisp("y_{"+(index+1)+"} = "+table[index][1]+" + "+step+" \\cdot f("+table[index][0] +", "+ table[index][1]+") = "+table[index][1]+" + "+step+" \\cdot "+fxd(table[index][0], table[index][1])+" = "+_roundPrec(result));
			w.line();
		}
		for (var pidx = 0; pidx < strongTable.length-1; pidx++) {
			printYEuler(pidx);
		};
		w.line2("2. Метод Эйлера-Коши");
		w.math2(w.casesLeft("\\tilde{y}_{i+1} = y_i + h\\cdot f(x_i, y_i)", "y_{i+1} = y_i + \\frac{h}{2}[f(x_i, y_i) + f(x_{i+1}, \\tilde{y}_{i+1})]"));w.line();
		function printYEulerKoshi(fxd, x0, xk, step, y0)
		{
			var cfx, nowx = x0+step, table = [[x0, y0, "y~"]], predictorTable = [[x0, y0]],
				printA = "", printB = "";
			function predictIteration(index, x)
			{
				var result = table[index][1] + step*fxd(table[index][0], table[index][1]);
				printA = ("\\tilde{y}_{"+(index+1)+"} = "+table[index][1]+" + "+step+" \\cdot f("+table[index][0] +", "+ table[index][1]+") = "+table[index][1]+" + "+step+" \\cdot "+fxd(table[index][0], table[index][1])+" = "+_roundPrec(result));
				return _roundPrec(result);
			}
			function correctIteration(index, x)
			{
				var result = table[index][1] + (step*0.5) * (fxd(table[index][0], table[index][1]) + fxd(predictorTable[index+1][0], predictorTable[index+1][1]));
				printB = ("y_{"+(index+1)+"} = "+table[index][1]+" + ("+step+"\\cdot 0.5)"+" \\cdot [f("+table[index][0] +", "+ table[index][1]+") + f("+predictorTable[index+1][0] +", "+ predictorTable[index+1][1]+")] = "+table[index][1]+" + "+(step*0.5)+" \\cdot ("+fxd(table[index][0], table[index][1])+" + "+fxd(predictorTable[index+1][0], predictorTable[index+1][1])+") = "+_roundPrec(result));
				w.debug("");
				return _roundPrec(result);
			}
			for (var i = 0; i < 100 && nowx <= xk; i++) {
				var predy = predictIteration(i, nowx);
				predictorTable.push([nowx, _roundPrec(predy)]);

				cfx = correctIteration(i, nowx);

				w.mathDisp(w.casesLeft(printA, printB));w.line();

				table.push([nowx, _roundPrec(cfx), _roundPrec(predy)]);
				nowx = _roundPrec(nowx + step);
			};
			return table;
		}
		printYEulerKoshi(FxD, start, end, step, y0, eulerTable);


		w.line2("3. Метод Рунге-Кутта");
		w.math2(w.casesLeft(
			"k_i^1 = h f(x_i, y_i)",
			"k_i^2 = h f(x_{i+\\frac{1}{2}}, y_i + \\frac{k_i^1}{2})",
			"k_i^3 = h f(x_{i+\\frac{1}{2}}, y_i + \\frac{k_i^2}{2})",
			"k_i^4 = h f(x_{i+1}, y_i + k_i^3)",
			"\\Delta y_i = \\frac{1}{6} (k_i^1 + 2k_i^2 + 2k_i^3 + k_i^4)",
			"y_{i+1} = y_i + \\Delta y_i"
			));w.line();
		function printRungeKuttTable(fxd, x0, xk, step, y0)
		{
			var cfx, nowx = x0+step, table = [[x0, y0, "k1", "x1/2", "k2", "k3", "k4", "Δy"]],
			a,b,c,d,e,f;
			function iteration(index, x)
			{
				var k1 = _roundPrec(step * fxd(table[index][0], table[index][1])),
					xHalf = _roundPrec(table[index][0] + step*0.5),
					k2 = _roundPrec(step * fxd(xHalf, _roundPrec(table[index][1] + (k1*0.5)))),
					k3 = _roundPrec(step * fxd(xHalf, _roundPrec(table[index][1] + (k2*0.5)))),
					k4 = _roundPrec(step * fxd(x, _roundPrec(table[index][1] + k3))),
					deltay = _roundPrec(_roundPrec(1/6)*(k1 + _roundPrec(2*k2) + _roundPrec(2*k3) + k4));
				var y = _roundPrec(table[index][1] + deltay);
				w.debug("");
				a = ("k_{"+index+"}^1 = "+step+" \\cdot "+FxDDefTex(table[index][0], table[index][1], step)+" = "+step+" \\cdot "+pneg(fxd(table[index][0], table[index][1]))+" = "+k1);
				x12 = ("x_{"+index+" + \\frac{1}{2}} = "+table[index][0] + " + " + step + "/2 = " + xHalf);
				b = ("k_{"+index+"}^2  = "+step+" \\cdot "+FxDDefTex(xHalf, _roundPrec(table[index][1] + (k1*0.5)), step)+" = "+step+" \\cdot "+pneg(fxd(xHalf, table[index][1] + (k1*0.5)))+" = "+k2);
				c = ("k_{"+index+"}^3 = "+step+" \\cdot "+FxDDefTex(xHalf, _roundPrec(table[index][1] + (k2*0.5)), step)+" = "+step+" \\cdot "+pneg(fxd(xHalf, _roundPrec(table[index][1] + (k2*0.5))))+" = "+k3);
				d = ("k_{"+index+"}^4 = "+step+" \\cdot "+FxDDefTex(x, _roundPrec(table[index][1] + k3), step)+" = "+step+" \\cdot "+pneg(fxd(x, table[index][1] + k3))+" = "+k4);
				e = ("\\Delta y_{"+index+"} = \\frac{1}{6} \\cdot ("+k1+" + 2"+k2+" + 2"+k3+" + "+k4+") = "+deltay);
				f = ("y_{"+(index+1)+"} = "+table[index][1]+" + "+deltay+" = "+y);

				return [x, _roundPrec(y), k1, xHalf, k2, k3, k4, deltay]
			}
			for (var i = 0; i < 3 && nowx <= xk; i++) {
				cfx = iteration(i, nowx);

				w.mathDisp(w.casesLeft(a, x12, b, c, d, e, f));w.line();

				table.push(cfx);
				nowx = _roundPrec(nowx + step);
			};
			return table;
		}
		printRungeKuttTable(FxD, start, end, step, y0);
		w.line();
		w.mathDisp("\\vdots")
		w.line();
		w.lineBreak(1);
		w.line("Продолжим вычисления, результаты выпишем в таблицу:"); w.line();
		function printLateXtableRK(table)
		{
			w.latexTableHeader(table.length +1);
			var iarray = [];
			for (var i = 0; i < table.length; i++) {
				iarray.push(i);
			};
			table[0][2] = table[0][3] = table[0][4] = table[0][5] = table[0][6] = table[0][7] = "";
			w.latexTableLine.apply(w, ["$i$"].concat(iarray));
			w.latexTableLine.apply(w, ["$x_i$"].concat(mapSubf(table, 0)));
			w.latexTableLine.apply(w, ["$y_i$"].concat(mapSubf(table, 1)));

			w.latexTableLine.apply(w, ["$k^1_{i+1}$"].concat(mapSubf(table, 2)));
			w.latexTableLine.apply(w, ["$k^2_{i+1}$"].concat(mapSubf(table, 4)));
			w.latexTableLine.apply(w, ["$k^3_{i+1}$"].concat(mapSubf(table, 5)));
			w.latexTableLine.apply(w, ["$k^4_{i+1}$"].concat(mapSubf(table, 6)));
			w.latexTableLine.apply(w, ["$\\Delta y_{i+1}$"].concat(mapSubf(table, 7)));
			w.latexTableEnd();
			w.line();
		}
		printLateXtableRK(rungeKuttTable);w.line();
		w.lineBreak(1);
		w.line("Сравним графически результаты методов: ");w.line();
		w.line("\\begin{center} \r\n \
\\begin{tikzpicture} \r\n \
  \\begin{axis}[  \r\n \
    legend style={at={(0.1,0.5)}, anchor=west}, \r\n \
    xlabel=$x$, \r\n \
    ylabel={$y$}, \r\n \
   grid=major, \r\n \
width=15cm,height=10cm, \r\n \
axis x line=center, \r\n \
axis y line=center \r\n \
  ]  \r\n \
    \\addplot[style={mark=x},every mark/.append style={scale=4}] coordinates { \r\n \
(1,1) (1.1,1.0613) (1.2,1.1458) (1.3,1.2542) (1.4,1.3877) (1.5,1.5475) (1.6,1.735) (1.7,1.9515) (1.8,2.1987) (1.9,2.4779) (2,2.7908)  \r\n \
 };\\addlegendentry{Точные значения}; \r\n \
    \\addplot coordinates { \r\n \
(1,1) (1.1,1.05) (1.2,1.1233) (1.3,1.2205) (1.4,1.3426) (1.5,1.4907) (1.6,1.666) (1.7,1.8699) (1.8,2.1039) (1.9,2.3695) (2,2.6681)  \r\n \
 };\\addlegendentry{Метод Эйлера}; \r\n \
    \\addplot[style={mark=triangle},every mark/.append style={scale=1}]  coordinates { \r\n \
(1,1) (1.1,1.0616) (1.2,1.1463) (1.3,1.255) (1.4,1.3888) (1.5,1.5489) (1.6,1.7367) (1.7,1.9536) (1.8,2.201) (1.9,2.4805) (2,2.7937)  \r\n \
 };\\addlegendentry{Метод Эйлера-Коши}; \r\n \
    \\addplot[style={mark=square},every mark/.append style={scale=1}]  coordinates { \r\n \
(1,1) (1.1,1.0613) (1.2,1.1458) (1.3,1.2543) (1.4,1.3878) (1.5,1.5476) (1.6,1.7351) (1.7,1.9517) (1.8,2.1989) (1.9,2.4782) (2,2.7911)  \r\n \
 };\\addlegendentry{Метод Рунге-Кутта}; \r\n \
  \\end{axis} \r\n \
\\end{tikzpicture} \r\n \
\\end{center}");

		w.debug("Таблица точного решения: \r\n"+printTable(strongTable));
		w.debug("Таблица Эейлера: \r\n"+printTable(eulerTable));
		w.debug("Таблица Эейлера-Коши: \r\n"+printTable(eulerKoshiTable));
		w.debug("Таблица Рунге-Кутта: \r\n"+printTable(rungeKuttTable));

		// \\varepsilon
		w.debug("Ошибка Эейлера = "+calcError(strongTable, eulerTable));
		w.debug("Ошибка Эейлера-Коши = "+calcError(strongTable, eulerKoshiTable));
		w.debug("Ошибка Рунге-Кутта = "+calcError(strongTable, rungeKuttTable));

		function PrintcalcENV(table, table2, desc)
		{
			var vec1 = [], vec2 = [], subvec = [], subprint = [];
			for (var i = 0; i < table.length; i++) {
				vec1.push([table[i][1]]);
				vec2.push([table2[i][1]]);
				subprint.push([_roundPrec(table[i][1]-table2[i][1])]);
				subvec.push(_roundPrec(table[i][1] - table2[i][1]));

			};
			var result = _roundPrec( util.N_V(subvec));
			w.mathDisp("\\varepsilon_{\\text{"+desc+"}} = \\parallel \\overline{y} - \\overline{y}_{\\text{"+desc+"}}  \\parallel _1 = "+
				"\\begin{Vmatrix} "+w.matrix(vec1)+" - "+w.matrix(vec2)+" \\end{Vmatrix} _1 = \\begin{Vmatrix} "+ w.matrix(subprint)+"\\end{Vmatrix} _1 = "+result);
			w.line();
			
			return result;
		}
		w.pageBreak();
		w.line2("Определим погрешность: ");

		var e1 = PrintcalcENV(strongTable, eulerTable, "Эйлера");
		var e2 = PrintcalcENV(strongTable, eulerKoshiTable, "Эйлера-Коши");
		var e3 = PrintcalcENV(strongTable, rungeKuttTable, "Рунге-Кутта");
		w.lineBreak(1);
		w.line("Ответ: $\\varepsilon_{\\text{Эйлера}} = "+e1 + ", \\varepsilon_{\\text{Эйлера-Коши}} = "+e2+", \\varepsilon_{\\text{Рунге-Кутта}} = "+e3+"$");
		// var strd = "";
		// for (var i = 0; i < strongTable.length; i++) {
		// 	strd += "("+rungeKuttTable[i][0]+","+rungeKuttTable[i][1]+") ";
		// };
		// w.debug(strd);
	}

	calc();
	//----------------------------------------------------------
	
	//-----------------------------------
	w.debug("4.1 Koshi ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}
