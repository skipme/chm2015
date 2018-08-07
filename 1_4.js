// 1_4.js
// matrix lambdas
var w = require("./write.js").write();

var CONST_CELL = { a13: 10, a23: 11, a12: 12};
function pneg(num)
{
	if(num < 0)
		return "("+num+")";
	return num;
}

var util = {

	MxV: function (m,v)
	{
	  return [
	    Number((m[0][0]*v[0] + m[0][1]*v[1] + m[0][2]*v[2]).toFixed(4)),
	    Number((m[1][0]*v[0] + m[1][1]*v[1] + m[1][2]*v[2]).toFixed(4)),
	    Number((m[2][0]*v[0] + m[2][1]*v[1] + m[2][2]*v[2]).toFixed(4))
	  ];
	},
	MxM: function (m,v)
	{
	  return [
	  	[
		    Number((m[0][0]*v[0][0] + m[0][1]*v[1][0] + m[0][2]*v[2][0]).toFixed(4)),
		    Number((m[0][0]*v[0][1] + m[0][1]*v[1][1] + m[0][2]*v[2][1]).toFixed(4)),
		    Number((m[0][0]*v[0][2] + m[0][1]*v[1][2] + m[0][2]*v[2][2]).toFixed(4))
	    ],
	    [
		    Number((m[1][0]*v[0][0] + m[1][1]*v[1][0] + m[1][2]*v[2][0]).toFixed(4)),
		    Number((m[1][0]*v[0][1] + m[1][1]*v[1][1] + m[1][2]*v[2][1]).toFixed(4)),
		    Number((m[1][0]*v[0][2] + m[1][1]*v[1][2] + m[1][2]*v[2][2]).toFixed(4))
	    ],
	    [
		    Number((m[2][0]*v[0][0] + m[2][1]*v[1][0] + m[2][2]*v[2][0]).toFixed(4)),
		    Number((m[2][0]*v[0][1] + m[2][1]*v[1][1] + m[2][2]*v[2][1]).toFixed(4)),
		    Number((m[2][0]*v[0][2] + m[2][1]*v[1][2] + m[2][2]*v[2][2]).toFixed(4))
	    ],
	  ];
	},
	MaxCell: function (m)
	{
		if(Math.abs(m[0][1]) > Math.abs(m[0][2]) && Math.abs(m[0][1]) > Math.abs(m[1][2]))
			return CONST_CELL.a12;
		if(Math.abs(m[0][2]) > Math.abs(m[0][1]) && Math.abs(m[0][2]) > Math.abs(m[1][2]))
			return CONST_CELL.a13;
		if(Math.abs(m[1][2]) > Math.abs(m[0][1]) && Math.abs(m[1][2]) > Math.abs(m[0][2]))
			return CONST_CELL.a23;
	},
	getMS: function (cellId, cosF, sinF)
	{
		switch(cellId)
		{
			case CONST_CELL.a23: return [ [1, 0, 0], [0, cosF, -sinF], [0, sinF, cosF] ];
			case CONST_CELL.a13: return [ [cosF, 0, -sinF], [0, 1, 0], [sinF, 0, cosF] ];
			case CONST_CELL.a12: return [ [cosF, -sinF, 0], [sinF, cosF, 0], [0, 0, 1] ];
			default:
				throw new Error("unknown cellId");
			break;
		}
	},
	getMSprint: function (cellId, iteration)
	{
		switch(cellId)
		{
			case CONST_CELL.a23: return [ [1, 0, 0], [0, "\\cos(\\varphi_{"+iteration+"})", "-\\sin(\\varphi_{"+iteration+"})"], [0, "\\sin(\\varphi_{"+iteration+"})", "\\cos(\\varphi_{"+iteration+"})"] ];
			case CONST_CELL.a13: return [ ["\\cos(\\varphi_{"+iteration+"})", 0, "-\\sin(\\varphi_{"+iteration+"})"], [0, 1, 0], ["\\sin(\\varphi_{"+iteration+"})", 0, "\\cos(\\varphi_{"+iteration+"})"] ];
			case CONST_CELL.a12: return [ ["\\cos(\\varphi_{"+iteration+"})", "-\\sin(\\varphi_{"+iteration+"})", 0], ["\\sin(\\varphi_{"+iteration+"})", "\\cos(\\varphi_{"+iteration+"})", 0], [0, 0, 1] ];
			default:
				throw new Error("unknown cellId");
			break;
		}
	},
	transpose: function (m)
	{
		return [
			[m[0][0], m[1][0], m[2][0]],
			[m[0][1], m[1][1], m[2][1]],
			[m[0][2], m[1][2], m[2][2]]
		];
	},
	getF: function(cellId, m, iteration)
	{
		var a = .0, b = .0, c = .0,
			na = "", nb = "", nc = "";
		switch(cellId)
		{
			case CONST_CELL.a23: 
			a = m[1][2]; b = m[1][1]; c = m[2][2]; 
			na = "a_{2,3}";nb = "a_{2,2}";nc = "a_{3,3}";
			break;
			case CONST_CELL.a13: 
			a = m[0][2]; b = m[0][0]; c = m[2][2]; 
			na = "a_{1,3}";nb = "a_{1,1}";nc = "a_{3,3}";
			break;
			case CONST_CELL.a12: 
			a = m[0][1]; b = m[0][0]; c = m[1][1]; 
			na = "a_{1,2}";nb = "a_{1,1}";nc = "a_{2,2}";
			break;
			default:
				throw new Error("unknown cellId");
			break;
		}
		// console.log("a: " + a.toFixed(4) +" b: " + b.toFixed(4)+ " c: " + c.toFixed(4));

		// console.log("for atan: " + ((2*a)/(b-c)).toFixed(4));
		var result = (Math.atan((2*a)/(b-c))) * 0.5;
		w.mathDisp("\\varphi_{"+iteration+"} = \\frac{1}{2} \\cdot \\arctan\\left(\\frac{2 \\cdot "+na+"}{"+nb+" - "+nc+"}\\right) = \\frac{1}{2} \\cdot \\arctan\\left(\\frac{2 \\cdot "+pneg(a)+"}{"+pneg(b)+" - "+pneg(c)+"}\\right) = "+Number(result.toFixed(4)));
		w.line();
		return result;
	}
};

function getPages(){
	w.useStringOut();

	w.line2("1.4 Используя метод вращений, найти собственные значения и собственные векторы симметричной матрицы с точностью $\\varepsilon = 0.01$ .");

	w.line();
	w.math2("A = " + w.matrix([
		[-7, -5, -9],
		[-5, 5, 2],
		[-9, 2, 9]
	])+" = A_{0}");
	w.line();
	w.line("Рассмотрим задачу нахождения всех собственных чисел и векторов для вещественной симметричной матрицы порядка $n$. Будем применять к ней преобразование подобия, не изменяющее спектра (собственных чисел). Выберем наибольший по модулю элемент $a_{k,m}$ матрицы, не лежащий на главной диагонали, и преобразуем матрицу так. чтобы он стал нулём. Это преобразование представляет собой поворот двухмерной плоскости, проходящей через $k$-ю и $m$-ю оси координат на специально подобранный угол $\\varphi$. Остальные элементы тоже как-то изменятся. Опять выберем наибольший по модулю элемент матрицы, не лежащий на главной диагонали и опять преобразуем (повернём) матрицу так. чтобы он стал нулём. Там. где до поворота стоял ноль, его может уже и не быть, но максимальные внедиагональные элементы будут быстро уменьшаться. Через некоторое число преобразований (поворотов-вращений) все внедиагональные элементы будут равняться почти нулю, тогда стоящие на главной диагонали числа и будут собственными числами исходной матрицы. Собственные вектора получают, перемножив все матрицы поворотов. Вычисленная таким образом матрица будет иметь своими столбцами собственные вектора.");
	w.line();
	function iterate(A)
	{

		function calcE(m, iteration)
		{
			var err = Math.sqrt(m[0][1]*m[0][1] + m[0][2]*m[0][2] + m[1][2]*m[1][2]);
			w.mathDisp("\\varepsilon_"+iteration+" = \\sqrt{"+  pneg(m[0][1])+"^2 + "+pneg(m[0][2])+"^2 + "+pneg(m[1][2])+"^2 } = \\mathbf{"+err.toFixed(4)+"}");
			return err;
		}
		function mIndexes(constcell)
		{
			return (cmax===CONST_CELL.a12?[0,1]:(cmax===CONST_CELL.a13?[0,2]:[1,2]));
		}
		function mName(constcell)
		{
			return (cmax===CONST_CELL.a12?"_{1,2}":(cmax===CONST_CELL.a13?"_{1,3}":"_{2,3}")) ;
		}
		var ECHK = 0.01, cmax = 0, CA = A, S, St, Fi, cosFi, sinFi, STxA, CE = 0;
		// console.log("A0: " + printM(A));
		var Snames = [], Smatrices = [];

		for (var i = 1; i <= 10; i++) {
			// console.log("\t\niteration: "+i);
			cmax = util.MaxCell(CA);
			// console.log("max a:" + (cmax===CONST_CELL.a12?"12":(cmax===CONST_CELL.a13?"13":"23")) 
				// + " " + (cmax===CONST_CELL.a12?CA[0][1]:(cmax===CONST_CELL.a13?CA[0][2]:CA[1][2])));
			var mmindexes = mIndexes(cmax);
			w.line();
			if(i===6)
				w.pageBreak();
			w.line(""+i+")");
			w.line();
			w.mathDisp(" \\text{max} |a_{\\substack{i,j \\\\ i<j}}| = a"+mName(cmax)+" = "+CA[mmindexes[0]][mmindexes[1]]);
			w.line();
			w.math2("S"+mName(cmax)+"^{("+i+")} = " + w.matrix(util.getMSprint(cmax, i)));			

			Fi = Number(util.getF(cmax, CA, i).toFixed(4));
			cosFi = Number(Math.cos(Fi).toFixed(4));
			sinFi = Number(Math.sin(Fi).toFixed(4));

			w.line();
			w.mathDisp("\\cos(\\varphi_"+i+") = "+cosFi+", \\sin(\\varphi_"+i+") = "+sinFi);
			w.line();
			w.mathDisp("\\mathbf{A_"+i+"} = S"+mName(cmax)+"^{("+i+")T} \\cdot A_"+(i-1)+" \\cdot S"+mName(cmax)+"^{("+i+")} = ");

			// console.log("Fi:"+Fi+" sinFi:"+sinFi+" cosFi:"+cosFi);
			S = util.getMS(cmax, cosFi, sinFi);
			
			Snames.push("S"+mName(cmax)+"^{("+i+")}");
			Smatrices.push(S);

			St = util.transpose(S);
			STxA = util.MxM(St, CA);
			
			if(i === 1)
			{
				w.mathDisp(w.matrix(St) + " \\cdot " + w.matrix(CA) + " \\cdot "+ w.matrix(S)+" = ");
				w.line();
				w.line(" = ")
				w.mathDisp(w.matrix(STxA) + " \\cdot "+ w.matrix(S)+" = ");
			}		
			CA = util.MxM(STxA, S);
			w.mathDisp(w.matrix(CA));
			w.line();

			CE = calcE(CA, i);
			w.mathDisp((CE>ECHK?" > ":" < ")+"\\varepsilon")
			// console.log("A"+i+": " + printM(CA));
			// console.log("E: "+CE.toFixed(4));
			if(CE < ECHK)
				break;
		};
		w.line();

		var Sline = "S = ";
		for (var i = 0; i < Snames.length; i++) {
			Sline += Snames[i] + (i===Snames.length-1?"":" \\cdot ");
		};
		var Mresult = Smatrices[0];
		for (var i = 1; i < Smatrices.length; i++) {
			Mresult = util.MxM(Mresult, Smatrices[i]);
		};
		w.mathDisp(Sline + " = " +w.matrix(Mresult));
		w.line();
		w.line("Ответ: ");
		w.mathDisp("\\lambda_1 = "+CA[0][0]+", \\lambda_2 = "+CA[1][1]+", \\lambda_3 = "+CA[2][2]+";");
		w.line();
		w.math2("\\: \\overline{x}^{(1)} = "+w.matrix([[Mresult[0][0]],[Mresult[1][0]],[Mresult[2][0]]])+
			", "+"\\overline{x}^{(2)} = "+w.matrix([[Mresult[0][1]],[Mresult[1][1]],[Mresult[2][1]]])+
			", "+"\\overline{x}^{(3)} = "+w.matrix([[Mresult[0][2]],[Mresult[1][2]],[Mresult[2][2]]]) + ".");
		w.line();
		return CA;
	}

	var CAEXP = iterate( [ [-7, -5, -9], [-5, 5, 2], [-9, 2, 9] ] );

	//-----------------------------------
	w.debug("\\lambda_1 = "+CAEXP[0][0]+", \\lambda_2 = "+CAEXP[1][1]+", \\lambda_3 = "+CAEXP[2][2]+";");
	w.debug("1.4 метод вращений ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}
