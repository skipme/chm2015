//1_3.js
// iterations_zeidel
var w = require("./write.js").write();
var util = {
	subVec: function(vecA, vecB)
	{
		return [
			Number((vecA[0] - vecB[0]).toFixed(4)),
			Number((vecA[1] - vecB[1]).toFixed(4)),
			Number((vecA[2] - vecB[2]).toFixed(4)),
			Number((vecA[3] - vecB[3]).toFixed(4))
		];
	},
	addVec: function(vecA, vecB)
	{
		return [
			Number((vecA[0] + vecB[0]).toFixed(4)),
			Number((vecA[1] + vecB[1]).toFixed(4)),
			Number((vecA[2] + vecB[2]).toFixed(4)),
			Number((vecA[3] + vecB[3]).toFixed(4))
		];
	},
	N_V: function(v)
	{
	  var Max = Number.MIN_VALUE;
	  for (var i = 0; i < v.length; i++) {
	    if(Max < Math.abs(v[i]))
	      Max = Math.abs(v[i]);
	  };
	  return Max;
	},
	MxV: function(m,v)
	{
	  return [
	    Number((m[0][0]*v[0] + m[0][1]*v[1] + m[0][2]*v[2] + m[0][3]*v[3]).toFixed(4)),
	    Number((m[1][0]*v[0] + m[1][1]*v[1] + m[1][2]*v[2] + m[1][3]*v[3]).toFixed(4)),
	    Number((m[2][0]*v[0] + m[2][1]*v[1] + m[2][2]*v[2] + m[2][3]*v[3]).toFixed(4)),
	    Number((m[3][0]*v[0] + m[3][1]*v[1] + m[3][2]*v[2] + m[3][3]*v[3]).toFixed(4))
	  ];
	}
};
function getPages(){
	w.useStringOut();

	w.line2("1.3 Методом простых итераций и методом Зейделя решить СЛАУ с точностью $\\varepsilon = 0.01$ .");
	w.math2(w.casesLeft(
		"-22x_1 - 2x_2 - 6x_3 + 6x_4 = 96",
		"3x_1 - 17x_2 - 3x_3 + 7x_4 = -26",
		"2x_1 + 6x_2 - 17x_3 + 5x_4 = 35",
		"-x_1 - 8x_2 + 8x_3 + 23x_4 = -234"
		));
	w.line("Для решения системы $A\\overline{x} = \\overline{b}$ каким-либо образом преобразуем эту систему к виду (схеме) $\\overline{x} = B\\overline{x} + \\overline{\\gamma}$. По этой схеме можно построить итерационный процесс : \r\n\r\n$$\\overline{x}^{(n+1)} = B \\overline{x}^{(n)} + \\overline{\\gamma}$$ \r\n\r\nВ левой части стоит новый вектор неизвестных $\\overline{x}^{(n+1)}$, а в правой части - старый вектор неизвестных $\\overline{x}^{(n)}$. После вычисления нового вектора он превращается в старый и вычисляем следующий новый вектор. За начальный вектор $\\overline{x}^{(1)}$ можно взять вектор $\\overline{\\gamma}$. Если хотя бы какая-нибудь норма матрицы B окажется меньше 1, то последовательность векторов $\\overline{x}^{(n)}$ из будет сходиться к точному решению. Сходимость будет тем быстрее, чем меньше норма у матрицы B.");
	w.math2("A = " + w.matrix([
		[-22, -2, -6, 6],
		[3, -17, -3, 7],
		[2, 6, -17, 5],
		[-1, -8, 8, 23]
	]));
	w.mathDisp("\\overline{x} = " + w.matrix([
		["x_1"],
		["x_2"],
		["x_3"],
		["x_4"]
	]));
	w.mathDisp("\\overline{\\beta} = " + w.matrix([
		["96"],
		["-26"],
		["35"],
		["-234"]
	]));
	w.math2(w.casesLeft(
		"x_1 = -0.0909x_2 - 0.2727x_3 + 0.2727x_4 - 4.3636",
		"x_2 = 0.1765x_1 - 0.1765x_3 + 0.4118x_4 + 1.5294",
		"x_3 = 0.1176x_1 + 0.3529x_2 + 0.2941x_4 - 2.0588",
		"x_4 = 0.0435x_1 + 0.3478x_2 - 0.3478x_3 - 10.1739"
		));
	w.line();
	w.mathDisp("B = " + w.matrix([
		[0, "-0.0909", "-0.2727", "0.2727"],
		["0.1765", 0, "-0.1765", "0.4118"],
		["0.1176", "0.3529", 0, "0.2941"],
		["0.0435", "0.3478", "-0.3478", 0]
	])+"; ");
	w.mathDisp("\\parallel \\overline{B} \\parallel _1 = 0.7648;");
	w.mathDisp("\\overline{\\gamma} = " + w.matrix([
		["-4.3636"],
		["1.5294"],
		["-2.0588"],
		["-10.1739"]
	])+"; ");
	w.line();
	w.head2("Метод простых итераций: ");
	function printVec(k, vecX)
	{
		return "\\overline{x}^{("+k+")} = \\overline{B} \\cdot \\overline{x}^{("+(k-1)+")} + \\overline{\\gamma} = " + w.matrix([[vecX[0]], [vecX[1]], [vecX[2]], [vecX[3]]]);
	}
	function printE(k, BEQ, BNORM, withBNORM, vecxfN, vecxN, E, ECOMP)
	{
		var preq = "\\varepsilon_1 = ";
		if(withBNORM)
		{
			preq = "\\varepsilon_1 = \\frac{\\parallel B \\parallel _1}{1 - \\parallel B \\parallel _1} \\cdot \\parallel \\overline{x}^{(1)} - \\overline{x}^{(0)} \\parallel _1 = ";
		}
		preq += BEQ + " \\cdot \\begin{Vmatrix}" + w.matrix([[vecxfN[0]], [vecxfN[1]], [vecxfN[2]], [vecxfN[3]]]) + "\\end{Vmatrix} _1 = ";
		return preq + BEQ + " \\cdot " + vecxN + " = " + E + (E<ECOMP?" < ":" > ") + "\\varepsilon";
	}
	var iteraterVec = null;
	function iterate_x(B, gamma)
	{
		var iterI = 1,
			xprev = gamma,
			xnow = null,
			Enow = 0,
			BEQ = 3.2517,
			BNORM = 0.7648;

		for (var i = 1; i < 12; i++) {
			xnow = util.MxV(B, xprev);
			// w.debug(typeof gamma[0]);
			xnow = util.addVec(xnow, gamma);

			w.math(printVec(i, xnow));
			w.line();
			var EX = util.subVec(xnow, xprev),
				NEX = util.N_V(EX);
			Enow = BEQ * NEX;
			w.math(printE(i, BEQ.toFixed(4), BNORM.toFixed(4), i===1, EX, NEX, Enow.toFixed(4), 0.01));
			w.line();
			xprev = xnow;
		};
		iteraterVec = xnow;
	}
	iterate_x([[0, -0.0909, -0.2727, 0.2727],
		[0.1765, 0, -0.1765, 0.4118],
		[0.1176, 0.3529, 0, 0.2941],
		[0.0435, 0.3478, -0.3478, 0]],

		[-4.3636, 1.5294, -2.0588, -10.1739]);
	w.line();
	// w.line("Ответ: x~1~ = -5; x~2~ = -2; x~3~ = -6; x~4~ = -9");
	w.line("Ответ: ");
	w.mathDisp(w.casesLeft(
		"x_1 = "+iteraterVec[0]+" \\approx -5",
		"x_2 = "+iteraterVec[1]+" \\approx -2",
		"x_3 = "+iteraterVec[2]+" \\approx -6",
		"x_4 = "+iteraterVec[3]+" \\approx -9"));
	w.line();
	w.lineBreak(1);
	w.head2("Метод Зейделя: ");w.line();
	w.line2("Получим матрицу C из матрицы B обнулением элементов ниже главной диагонали: ");
	w.mathDisp("C = " + w.matrix([
		[0, "-0.0909", "-0.2727", "0.2727"],
		["0", 0, "-0.1765", "0.4118"],
		["0", "0", 0, "0.2941"],
		["0", "0", "0", 0]
	])+"; ");
	w.mathDisp("\\parallel \\overline{C} \\parallel _1 = 0.6363.");
	w.line();
	w.mathDisp("x_1^{k+1} = B_{1,1}x_1^{k} + B_{1,2}x_2^{k} + \\dots + B_{1,n}x_{n}^{k} + \\gamma_1");w.line();
	w.mathDisp("x_2^{k+1} = B_{2,1}x_1^{k+1} + B_{2,2}x_2^{k} + \\dots + B_{2,n}x_{n}^{k} + \\gamma_2");w.line();
	w.mathDisp("x_3^{k+1} = B_{3,1}x_1^{k+1} + B_{3,2}x_2^{k+1} + B_{3,3}x_{3}^{k} + \\dots + B_{3,n}x_{n}^{k} + \\gamma_3");w.line();
	w.mathDisp("\\vdots");w.line();
	w.mathDisp("x_n^{k+1} = B_{n,1}x_1^{k+1} + B_{n,2}x_2^{k+1} + \\dots + B_{n,n-1}x_{n-1}^{k+1} + B_{n,n}x_n^{k} + \\gamma_n");
	w.line();
	w.pageBreak();
	function x1(x2, x3, x4)
	{
		return (-0.0909)*x2 -0.2727*x3 + 0.2727*x4 -4.3636;
	}
	function x2(x1, x3, x4)
	{
		return 0.1765*x1 -0.1765*x3 + 0.4118*x4 + 1.5294;
	}
	function x3(x1, x2, x4)
	{
		return 0.1176*x1+ 0.3529*x2 + 0.2941*x4 -2.0588;
	}
	function x4(x1, x2, x3)
	{
		return 0.0435*x1 + 0.3478*x2 -0.3478*x3 -10.1739;
	}
	function pneg(num)
	{
		if(num < 0)
			return "("+num+")";
		return num;
	}
	function zeidelIteration(vec, iteration)
	{
		var vec_result = [];
		vec_result[0] = Number(x1(vec[1], vec[2], vec[3]).toFixed(4));
		w.mathDisp("x_1^{("+iteration+")} = (-0.0909)\\cdot"+pneg(vec[1])+" - 0.2727\\cdot"+pneg(vec[2]) + " + 0.2727\\cdot"+pneg(vec[3])+ " - 4.3636 = "+vec_result[0]);
		w.line();

		vec_result[1] = Number(x2(vec_result[0], vec[2], vec[3]).toFixed(4));
		w.mathDisp("x_2^{("+iteration+")} = 0.1765\\cdot"+pneg(vec_result[0])+" - 0.1765\\cdot"+pneg(vec[2]) + " + 0.4118\\cdot"+pneg(vec[3])+ " + 1.5294 = "+vec_result[1]);
		w.line();
		
		vec_result[2] = Number(x3(vec_result[0], vec_result[1], vec[3]).toFixed(4));
		w.mathDisp("x_3^{("+iteration+")} = 0.1176\\cdot"+pneg(vec_result[0])+" + 0.3529\\cdot"+pneg(vec_result[1]) + " + 0.2941\\cdot"+pneg(vec[3])+ " - 2.0588= "+vec_result[2]);
		w.line();

		vec_result[3] = Number(x4(vec_result[0], vec_result[1], vec_result[2]).toFixed(4));
		w.mathDisp("x_4^{("+iteration+")} = 0.0435\\cdot"+pneg(vec_result[0])+" + 0.3478\\cdot"+pneg(vec_result[1]) + " - 0.3478\\cdot"+pneg(vec_result[2])+ " - 10.1739 = "+vec_result[3]);
		w.line();

		return vec_result;
	}
	function calc_E(vecN, CNorm, BNorm, iteration)
	{
		var err = (CNorm/(1-BNorm)) * util.N_V(vecN);
		var pred = (CNorm/(1-BNorm)).toFixed(4);
		w.mathDisp("\\varepsilon_"+iteration+" = "+(iteration===1?("\\frac{"+CNorm+"}{1 - "+BNorm+"}"):pred)
			+" \\cdot \\begin{Vmatrix}"+w.matrix([[vecN[0]],[vecN[1]],[vecN[2]],[vecN[3]]])+"\\end{Vmatrix} _1 = \\mathbf{"+err.toFixed(4)+"}");
		return err;
	}
	var vecresultzeid = null;
	function Zeidel(startVector, CNorm, BNorm)
	{
		var Enow = Number.MAX_VALUE, vecNow, vec = startVector;

		for (var i = 1; i < 500 && Enow > 0.01; i++) {
			
			w.line(""+i+")");
			w.line();
			vecNow = zeidelIteration(vec, i);
			w.line();

			var vecN = util.subVec(vecNow, vec);
			Enow = calc_E(vecN, CNorm, BNorm, i);
			w.mathDisp((Enow>0.01?" > ":" < ")+"\\varepsilon")
			w.line();
			vec = vecNow;
		};
		// console.log(str_out)
		w.debug(vecNow[0]+" "+vecNow[1]+" "+vecNow[2]+" "+vecNow[3]);
		vecresultzeid = vecNow;
	}
	Zeidel([-4.3636, 1.5294, -2.0588, -10.1739], 0.6363, 0.7648);

	w.line();
	w.line("Ответ: ");
	w.mathDisp(w.casesLeft(
		"x_1 = -5",
		"x_2 = "+vecresultzeid[1]+" \\approx -2",
		"x_3 = "+vecresultzeid[2]+" \\approx -6",
		"x_4 = "+vecresultzeid[3]+" \\approx -9"));

	//-----------------------------------
	w.debug("1.3 Итерации и Зейдель OK");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}
