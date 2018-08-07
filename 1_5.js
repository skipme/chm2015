// 1_5.js
var w = require("./write.js").write();

var util = {

	MxV: function (m,v)
	{
	  return [
	    Number((m[0][0]*v[0] + m[0][1]*v[1] + m[0][2]*v[2]).toFixed(4)),
	    Number((m[1][0]*v[0] + m[1][1]*v[1] + m[1][2]*v[2]).toFixed(4)),
	    Number((m[2][0]*v[0] + m[2][1]*v[1] + m[2][2]*v[2]).toFixed(4))
	  ];
	},
	VdN: function (v,num)
	{
	  return [
	    Number((v[0]/num).toFixed(4)),
	    Number((v[1]/num).toFixed(4)),
	    Number((v[2]/num).toFixed(4))
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

function getPages(){
	w.useStringOut();

	w.line2("1.5 Используя степенной метод оценить спектральный радиус с точностью $\\varepsilon = 0.01$ .");
	
	w.line();
	var MA = [
		[-7, -5, -9],
		[-5, 5, 2],
		[-9, 2, 9]
	];
	w.line();
	w.math2("A = " + w.matrix(MA));
	w.line();
	w.line("Пусть дана матрица A у которой собственные числа (спектр) удовлетворяют соотношению $\\|\\lambda_1\\| > \\|\\lambda_2\\| \\geq \\|\\lambda_3\\| \\geq \\dots \\geq \\|\\lambda_n\\|$. \
Построим последовательность векторов: \
$$\\overline{x}^{(k+1)} = A \\cdot \\overline{y}^{(k)} , \\overline{y}^{(k)}=\\frac{\\overline{x}^{(k)}}{\\parallel \\overline{x}^{(k)} \\parallel _1}$$ \
За начальный вектор $\\overline{y}^{(0)}$ можно взять , например, единичным вектор е = {1;1;...;1}. Под нормой будем понимать первую ному, т.е. чтобы вычислить вектор $\\overline{y}$ , нужно в векторе $\\overline{x}$ найти максимальную по модулю компоненту и разделить все компоненты вектора $\\overline{x}$ на неё. Эта компонента станет единицей, а остальные станут по модулю меньше единицы. Такой алгоритм позволяет найти спектральный радиус $\\rho=\\| \\lambda_1 \\|$ как предел последовательности максимальных по модулю компонент векторов $\\overline{x}^{(n)}$ . Пределом последовательности векторов $\\overline{y}$ будет собственный вектор, соответствующий $\\lambda_1$.");
	w.line();
	var vecx = [1, 1, 1], vecxprev = vecx, vecy, epsilon = 0;
	for (var i = 1; i <= 500; i++) 
	{

		vecy =  util.VdN(vecxprev, util.N_V(vecxprev));
		vecx = util.MxV(MA, vecy);
		epsilon = _roundPrec(Math.abs(util.N_V(vecx) - util.N_V(vecxprev)));

		if(i < 3)
		{
			w.line();
			w.line(""+i+")");
			w.line();
			if(i === 1)
			{
				w.mathDisp("\\overline{x}^{("+(i-1)+")} = " + w.matrix([
					[vecxprev[0]],
					[vecxprev[1]],
					[vecxprev[2]]
				]));
				w.line("; ");
			}
			w.mathDisp("\\parallel \\overline{x}^{("+(i-1)+")} \\parallel = "+util.N_V(vecxprev)+"; ");
			// w.line();
			w.mathDisp("\\overline{y}^{("+(i-1)+")} = \\frac{\\overline{x}^{("+(i-1)+")}}{\\parallel \\overline{x}^{("+(i-1)+")} \\parallel _1}"+
				" = "+w.matrix([
					[vecy[0]],
					[vecy[1]],
					[vecy[2]]
				]));
			w.line();
			w.mathDisp("\\overline{x}^{("+i+")} = A \\cdot \\overline{y}^{("+(i-1)+")} = " + 
				w.matrix(MA) +"\\cdot" + w.matrix([
					[vecy[0]],
					[vecy[1]],
					[vecy[2]]
				])+" = " +
				w.matrix([
					[vecx[0]],
					[vecx[1]],
					[vecx[2]]
				]));
			w.line();
			w.mathDisp("\\varepsilon_"+i+" = |"+util.N_V(vecx)+" - "+ util.N_V(vecxprev)+"| = "+epsilon+" > \\varepsilon");
		}else{
			// table
			if(i === 3)
			{
				w.line("Продолжим вычисления, результаты выпишем в таблицу:");
				w.line();w.lineBreak(1);
				// header
				w.latexTableHeader(5);
				w.latexTableLine("вектор", "$x_1(y_1)$", "$x_2(y_2)$", "$x_3(y_3)$", "$\\parallel x^{(n)} \\parallel _1$");
			}
			if(i === 7)
			{
				w.latexTableEnd();
				w.pageBreak();
				// w.line("");
				w.latexTableHeader(5);
				w.latexTableLine("вектор", "$x_1(y_1)$", "$x_2(y_2)$", "$x_3(y_3)$", "$\\parallel x^{(n)} \\parallel _1$");
			}
			if(i === 32)
			{
				w.latexTableEnd();
				w.pageBreak();
				w.latexTableHeader(5);
				w.latexTableLine("вектор", "$x_1(y_1)$", "$x_2(y_2)$", "$x_3(y_3)$", "$\\parallel x^{(n)} \\parallel _1$");
			}
			w.latexTableLine("$\\overline{x}^{("+i+")}$", vecx[0], vecx[1], vecx[2], util.N_V(vecx));
			w.latexTableLine("$\\overline{y}^{("+i+")}$", vecy[0], vecy[1], vecy[2], " ");
		}
		
		if(epsilon < 0.01)
		{
			w.latexTableEnd();
			break;
		}

		// w.debug(JSON.stringify(vecy));
		vecxprev = vecx;
	}
	w.line();
	w.line("Ответ: ");
	w.mathDisp("\\rho (A) = "+util.N_V(vecx));
	//-----------------------------------
	w.debug("ro = "+util.N_V(vecx)+", epsilon = "+epsilon+", iterationsNum = "+i);
	w.debug("1.5 степенной метод ОК");
	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
}