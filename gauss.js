//Gauss.js
var w = require("./write.js").write();

function getPages(){
	w.useStringOut();

	w.line2("1.1 Методом Гаусса решить системы линейных алгебраических уравнений (СЛАУ). Для матрицы СЛАУ вычислить определитель и обратную матрицу.");
	w.math2(w.casesLeft(
		"-x_1 - 3x_2 - 4x_3 = -3",
		"3x_1 + 7x_2 - 8x_3 + 3x_4 = 30",
		"x_1 - 6x_2 + 2x_3 + 5x_4 = -90",
		"-8x_1 - 4x_2 - x_3 - x_4 = 12"));
	w.line();
	w.line2("В матричной форме эта система выглядит как $A \\overline{x}=\\overline{b}$, $А=\\{ a_{ij}\\}, \\overline{x}=(x_1,x_2,\\dots ,x_n)^T, \\overline{b}= (b_1, b_2, \\dots , b_n)^T$. Задача имеет единственное решение, если определитель (детерминант) матрицы системы не равен нулю ( $\\|A\\|\\neq 0$ или $\\mathrm{det} A \\neq 0$). Метод Гаусса заключается в исключении из системы тех слагаемых, которые лежат в матрице А ниже главной диагонали ($a_{ij}, i>j$). \r\nИсключать слагаемые разрешается только с помощью трёх допустимых преобразований: \r\n\r\n1)	любую строку ( уравнение ) можно умножить ( разделить ) на любое число, кроме нуля: \r\n\r\n2)	любую строку можно прибавить к другой строке; \r\n\r\n3)	можно переставить любые две строки. \r\n\r\nПри каждом применении третьего преобразования определитель будет менять свой знак.");
	w.math2("\\widetilde{A} = " + w.matrix([
		[-1,-3,-4, 0,-3],
		[3,7,-8, 3,30],
		[1,-6,2, 5,-90],
		[-8,-4,-1, -1,12]
	]));
	w.math2("(\\widetilde{A}E) = " + w.matrix([
		[-1,-3,-4, 0,-3, 1,0,0,0],
		[3,7,-8, 3,30, 0,1,0,0],
		[1,-6,2, 5,-90, 0,0,1,0],
		[-8,-4,-1, -1,12, 0,0,0,1]
	]));
	// --------------------------------------------
	function roman(num)
	{
		return "\\uppercase\\expandafter{\\romannumeral"+num+"}";
	}
	w.line2("Операции над строками будем выписывать обозначая номера строк матрицы римскими цифрами:");
	w.line2("1) "+roman(2)+" = "+roman(2)+" + 3 $\\cdot$ "+roman(1)+"; "+roman(3)+" = "+roman(3)+" + "+roman(1)+"; "+roman(4)+" = "+roman(4)+"$- 8 \\cdot$ "+roman(1));
	w.mathDisp("(\\widetilde{A}E) \\sim " + w.matrix([
		[-1,-3,-4, 0,-3, 1,0,0,0],
		[0,-2,-20, 3,21, 3,1,0,0],
		[0,-9,-2, 5,-93, 1,0,1,0],
		[0,20,31,-1,36, -8,0,0,1]
	]));w.line();
	w.line2("2) "+roman(3)+" = "+roman(3)+" $- \\frac{9}{2} \\cdot$ "+roman(2)+"; "+roman(4)+" = "+roman(4)+" + $10 \\cdot$"+roman(1));
	w.mathDisp("(\\widetilde{A}E) \\sim " + w.matrix([
		[-1,-3,-4, 0,-3, 1,0,0,0],
		[0,-2,-20, 3, 21, 3,1,0,0],
		[0, 0, 88,-8.5,-187.5, -12.5,-4.5,1,0],
		[0, 0,-169, 29, 246,22,10,0,1]
	]));w.line();
	w.line2("3) "+roman(4)+" = "+roman(4)+" + $\\frac{169}{88} \\cdot$"+roman(3));
	w.mathDisp("(\\widetilde{A}E) \\sim " + w.matrix([
		[-1,-3,-4, 0,-3, 1,0,0,0],
		[0,-2,-20, 3, 21, 3,1,0,0],
		[0, 0, 88,-8.5,-187.5, -12.5,-4.5,1,0],
		[0, 0, 0, 12.6761, -114.0852, -2.0057, 1.358, 1.9205,1]
	]));w.line();
	// 4
	w.pageBreak();
	w.line2("4) Образуем единицы на главной диагонали. "+roman(1)+" = "+roman(1)+"/-1; "+roman(2)+" = "+roman(2)+"/-2; "+roman(4)+" = "+roman(4)+"/12.6761 ");
	w.mathDisp("(\\widetilde{A}E) \\sim " + w.matrix([
		[1, 3, 4, 0, 3, -1,0,0,0],
		[0, 1, 10, -1.5, -10.5, -1.5, -.5,0,0],
		[0, 0, 1, -.0966, -2.1307, -0.1420,-0.0511,0.0114,0],
		[0, 0, 0, 1, -9, -0.1582, 0.1071, 0.1515,0.0789]
	]));w.line();
	// 5
	w.line2("5) "+roman(2)+" = "+roman(2)+" + 1.5 $\\cdot$ "+roman(4)+"; "+roman(3)+" = "+roman(3)+" + $0.0966 \\cdot$"+roman(4)+"; "+roman(1)+" - без изменений");
	w.mathDisp("(\\widetilde{A}E) \\sim " + w.matrix([
		[1, 3, 4, 0, 3, -1,0,0,0],
		[0, 1, 10, 0, -24, -1.7373, -.3394, 0.2273, 0.1184],
		[0, 0, 1, 0, -3.001, -0.1573,-0.0408,0.0260,0.0076],
		[0, 0, 0, 1, -9, -0.1582, 0.1071, 0.1515,0.0789]
	]));w.line();
	// 6
	w.line2("6) "+roman(2)+" = "+roman(2)+"$- 10 \\cdot$ "+roman(3)+"; "+roman(1)+" = "+roman(1)+" $- 4 \\cdot$"+roman(3));
	w.mathDisp("(\\widetilde{A}E) \\sim " + w.matrix([
		[1, 3, 0, 0, 15.004, -0.3708,0.1632,-.104,-.0304],
		[0, 1, 0, 0, 6.01, -0.1643, .0686, 0.0327, 0.0424],
		[0, 0, 1, 0, -3.001, -0.1573,-0.0408,0.0260,0.0076],
		[0, 0, 0, 1, -9, -0.1582, 0.1071, 0.1515,0.0789]
	]));w.line();
	// 7
	w.line2("7) "+roman(1)+" = "+roman(1)+" $- 3 \\cdot$"+roman(2));
	w.mathDisp("(\\widetilde{A}E) \\sim " + w.matrix([
		[1, 0, 0, 0, -3.026, 0.1221, -0.0426, -0.0059, -.1576],
		[0, 1, 0, 0, 6.01, -0.1643, .0686, 0.0327, 0.0424],
		[0, 0, 1, 0, -3.001, -0.1573,-0.0408,0.0260,0.0076],
		[0, 0, 0, 1, -9, -0.1582, 0.1071, 0.1515,0.0789]
	]));w.line();
	w.line2("Выпишем образованные в пятом столбце корни:");
	w.math2(w.casesLeft(
		"x_1 = -3.026 \\approx -3",
		"x_2 = 6.01 \\approx 6",
		"x_3 = -3.001 \\approx -3",
		"x_4 = -9 \\approx -9"));

	// determ
	w.lineBreak(1);
	w.line2("Определитель равен произведению коэффициентов 4 шага:");
	// w.line("Δ = -1 * -2 *");
	w.math("\\Delta = -1 \\cdot -2 \\cdot 88 \\cdot 12.6761 = 2230.9936 \\approx 2231");
	// Neg
	w.line();
	w.line2("Выпишем образованную из единичной - обратную матрицу системы:");
	w.math2("A^{-1} \\sim " + w.matrix([
		[0.1221, -0.0426, -0.0059, -.1576],
		[-0.1643, .0686, 0.0327, 0.0424],
		[-0.1573,-0.0408,0.0260,0.0076],
		[-0.1582, 0.1071, 0.1515,0.0789]
	]));
	// Chck
	w.line("Проверка (результат произведения матрицы системы и её обратной дают единичную):");
	w.math2("(A \\cdot A^{-1}) \\sim " + w.matrix([
		[1.0050, 0.0013, -0.0018, .0003],
		[-0.0018, .9997, 0.0006, -.0001],
		[0.0001,-0.0001, 1, 0],
		[-0.0002, -0.0003, .0001, 0.9999]
	]));
	w.line("Ответ: x~1~ = -3, x~2~ = 6, x~3~ = -3, x~4~ = -9");
	w.debug("GAUSS OK");

	return [w.buffer, w.spellBuffer];
}
module.exports = {
	print: function  () {
		return getPages();
	}
};