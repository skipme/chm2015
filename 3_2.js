var w = require("./write.js").write();
var exc = require("./wolf.js").execute();

var util = {
}
function checkFunction(fn)
{
	return fn === null || fn === undefined || typeof fn !== "function";
}
function defer(callback, args)
{
	//callback.apply(undefined, args);
	var err = new Error();
	setTimeout(function(){
			try{
				callback.apply(undefined, args);
			}catch(exc)
			{
				throw new Error(exc.message + err.stack);
			}
		}, 0);
}
function aftermath() {
    var aftermath_context = {
        num: 0,
        sequence: [],
        ondonef: null,
        onerrorf: null,
        errorHit: false,
        prevResult: null,
        sync: false,
        ondone: function (a, e, sync) { this.ondonef = a; this.onerrorf = e; this.go(sync); },
        ok: function (result) {
            this.num++;
            this.prevResult = result;
            if (this.num === this.sequence.length && !this.errorHit) {
                this.ondonef(result);
            }
            else if(this.sync)
            {
            	var that = this;
            	defer(function(){that.sequence[that.num](that);});
            }
        },
        error: function (msg) {
            this.num++;
            if (this.onerrorf && !this.errorHit) {
                this.errorHit = true;
                this.onerrorf(msg);
            }
        },
        go: function (sync) {
        	this.sync = sync;
        	if(!sync)
        	{
                for (var i = 0; i < this.sequence.length; i++) {
                    this.sequence[i](this);
                }
            }else{
            	this.sequence[0](this);
            }
        }
    };
    for (var i = 0; i < arguments.length; i++) {
    	if(checkFunction(arguments[i]))
    		throw new Error("aftermath wrong argument at: "+ i+ arguments[i]);
        aftermath_context.sequence.push(arguments[i]);
    }
    return aftermath_context;
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
function getPages(mainCallback)
{
	w.useStringOut();
		
	w.line2("3.2. Построить кубический сплайн для функции, заданной в узлах интерполяции, предполагая, что сплайн имеет нулевую кривизну при x = x~0~ и x = x~4~. Вычислить значение функции в точке x = X* .");

	w.latexTableHeader(6);
	w.latexTableLine("i", 0, 1, 2, 3, 4);
	w.latexTableLine("$X_i$", "0", 0.9, 1.8, 2.7, 3.6);
	w.latexTableLine("$f_i$", 0, 0.72235, 1.5609, 2.8459, 7.7275);
	w.latexTableEnd();
	w.line("X* = 1.5; h = 0.9");
	w.line();
	w.lineBreak(1);

	w.line("Сплайном степени M дефекта r называется M-r раз непрерывна деференцируемая функция, которая на каждом отрезке [$x_{i-1};x_i$] $i=1,2, \\dots 4$ представляет собой многочлен степени M. На каждом промежутке $x \\in [x_{i-1};x_i]$ уравнение сплайна имеет вид: ");
	w.line();
	w.mathDisp(Si());
	w.line("");
	w.line("Для нахождения коэффициентов сплайнов:");w.line();
	w.mathDisp("m_i = \\frac{h}{6}m_{i-1} + \\frac{2}{3}h \\cdot m_i + \\frac{h}{6}m_{i+1} = \\frac{y_{i+1} - 2y_i + y_{i-1}}{h}");
	w.line();

	w.lineBreak(1);
	w.math2(
		//w.matrix([["i=0\\;"],["i=1\\;"],["i=2\\;"],["i=3\\;"],["i=4\\;"]], true) +" "+
		"\\begin{matrix} i=0\\;\\\\[4pt]  i=1\\;\\\\[3pt] i=2\\;\\\\[4pt] i=3\\;\\\\[4pt] i=4\\;\\\\[1pt] \\end{matrix}"+
		w.casesLeft("m_0 = 0", 
			"0 + \\frac{2}{3} \\cdot 0.9m_1 + \\frac{0.9}{6}m_2 = \\frac{1.5609 \\cdot 2 \\cdot 0.72235 + 0}{0.9} = 0.129",
			"\\frac{0.9}{6}m_1 + \\frac{2}{3} \\cdot 0.9 m_2 + \\frac{0.9}{6}m_3 = \\frac{2.8459 - 2 \\cdot 1.5609}{0.9} = -0.3066",
			"0.15m_2 + 0.6m_3 = \\frac{7.7275 - 2 \\cdot 2.8459}{0.9} = 2.2619",
			"m_4 = 0"
			));
	w.math2(w.casesLeft("m_0 = 0", 
			"0 + 0.6m_1 + 0.15m_2 = 0.129",
			"0.15m_1 + 0.6 m_2 + 0.15m_3 = -0.3066",
			"0.15m_2 + 0.6m_3 = 2.2619",
			"m_4 = 0"
			));
	w.line();
	w.line("Решение методом прогонки:");
	// w.line("Прямой ход.");
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
	printCoeff(1, 0, 0.6, 0.15, 0.129);
	w.line();
	w.mathDisp("\\mathbf{A_1} = \\frac{-c_1}{b_1} = \\frac{-0.15}{0.6} = -0.25; ");
	// 
	w.mathDisp("\\mathbf{B_1} = \\frac{d_1}{b_1} = \\frac{0.129}{0.6} = 0.215");
	w.line();
	printCoeff(2, 0.15, 0.6, 0.15, -0.3066);
	w.line();
	w.mathDisp("\\mathbf{A_2} = \\frac{-c_2}{b_2 + a_2\\cdot A_1} = \\frac{-0.15}{0.6+0.15\\cdot(-0.25)} = -0.2667;");
	// w.line();
	w.mathDisp("\\mathbf{B_2} = \\frac{d_2 - a_2\\cdot B_1}{b_2 + a_2\\cdot A_1} = -0.6024");
	w.line();
	printCoeff(3, 0.15, 0.6, 0, 2.2619);
	w.line();
	w.mathDisp("\\mathbf{A_3} = \\frac{-c_3}{b_3 + a_3\\cdot A_2} = 0;");
	// w.line();
	w.mathDisp("\\mathbf{B_3} = \\frac{d_3 - a_3\\cdot B_2}{b_3 + a_3\\cdot A_2} = \\frac{2.2619 - 0.15 \\cdot (-0.6024)}{0.6 + 0.15 \\cdot (-0.2667)} = 4.2005");
	w.line("");w.line("");
	w.mathDisp(w.casesLeft("m_4 = 0;", "m_3 = B_3 = 4.2005;", "m_2 = A_2 \\cdot m_3 + B_2 = -1.7227;", "m_1 = A_1 \\cdot m_2 + B_1 = 0.6457;", "m_0 = 0 ."));
	w.line("");w.line("");
	w.pageBreak();
	function Si()
	{
		var mi1 = "m_i \\frac{(x-x_{i-1})^3}{6h_i}",
			mi2 = "m_{i-1} \\frac{(x_i - x)^3}{6h_i}",
			mi3 = "(y_i - m_i\\frac{h_i^2}{6})\\frac{x-x_{i-1}}{h_i}",
			mi4 = "(y_{i-1} - m_{i-1}\\frac{h_i^2}{6})\\frac{x_i - x}{h_i}";
		return "S_i(x) = "+mi1+" + "+mi2+" + "+mi3+" + "+mi4;
	}
	var ax = [0, 0.9, 1.8, 2.7, 3.6],
		ay = [ 0, 0.72235, 1.5609, 2.8459, 7.7275],
		am = [0, 0.6457, -1.7227, 4.2005, 0];
	function Sie(i, h, callback)
	{
		var mi1 = pneg(am[i])+"\\cdot\\frac{(x-"+pneg(ax[i-1])+")^3}{6\\cdot"+h+"}",
			mi2 = pneg(am[i-1])+"\\cdot\\frac{("+pneg(ax[i])+" - x)^3}{6\\cdot"+h+"}",
			mi3 = "("+pneg(ay[i])+" - "+pneg(am[i])+"\\cdot\\frac{"+h+"^2}{6})\\cdot\\frac{x-"+pneg(ax[i-1])+"}{"+h+"}",
			mi4 = "("+pneg(ay[i-1])+" - "+pneg(am[i-1])+"\\cdot\\frac{"+h+"^2}{6})\\cdot\\frac{"+pneg(ax[i])+" - x}{"+h+"}";
		var eq =  "S_"+i+"(x) = "+mi1+" + "+mi2+" + "+mi3+" + "+mi4;

		var mim1 = am[i]+"*(((x-"+ax[i-1]+")^3)/(6*"+h+"))",
			mim2 = am[i-1]+"*((("+ax[i]+" - x)^3)/(6*"+h+"))",
			mim3 = "("+ay[i]+" - ("+am[i]+"*(("+h+"^2)/6)))*((x-"+ax[i-1]+")/"+h+")",
			mim4 = "("+ay[i-1]+"-("+am[i-1]+"*(("+h+"^2)/6)))*(("+ax[i]+"-x)/"+h+")";
		var varm1, varm2, varm3, varm4, varmR;
		var varmT1, varmT2, varmT3, varmT4, varmR;
		aftermath(
			function(actx)
			{
				exc.eval(false, mim1, function(texo){
					varm1 = texo;
					// w.debug(mim1+" = "+texo);
					actx.ok();
				});
			},
			function(actx)
			{
				// w.debug(mim2);
				exc.eval(false,mim2, function(texo){
					varm2 = texo;
					// w.debug(mim2+" = "+texo);
					actx.ok();
				});
			},
			function(actx)
			{
				// w.debug(mim2);
				exc.eval(false,mim3, function(texo){
					varm3 = texo;
					// w.debug(mim3+" = "+texo);
					actx.ok();
				});
			},
			function(actx)
			{
				// w.debug(mim2);
				exc.eval(false, mim4, function(texo){
					varm4 = texo;
					// w.debug(mim4+" = "+texo);
					actx.ok();
				});
			}
		).ondone(
				function(result){
				var reqR="("+mim1+") + ("+mim2+") + ("+mim3+") + ("+mim4+")";
				exc.eval(true,reqR, function(texo){
					varmR = texo;
					w.debug("Rr="+reqR+"="+varmR);
					var trs = eq+" = ("+varm1+") + ("+varm2+") + ("+varm3+") + ("+varm4+") = "+varmR;
					w.debug(trs);
					callback(trs);
				});
					
				},
				function(error){
					throw new Error("some error" + error);
			}, false
		);

	}
	// w.mathDisp(Si());
	// w.line("");
	// w.lineBreak(1);

	w.line();
	var sieqf1, sieqf2, sieqf3, sieqf4;
	aftermath(
		function(actx)
		{
			Sie(1,0.9, function(sieres){
				sieqf1 = sieres;
				actx.ok();
			});
		},
		function(actx)
		{
			Sie(2,0.9, function(sieres){
				sieqf2 = sieres;
				actx.ok();
			});
		},
		function(actx)
		{
			Sie(3,0.9, function(sieres){
				sieqf3 = sieres;
				actx.ok();
			});
		},
		function(actx)
		{
			Sie(4,0.9, function(sieres){
				sieqf4 = sieres;
				actx.ok();
			});
		}
	).ondone(
			function(result){
				outp2();
			},
			function(error){
				throw new Error("some error" + error);
		}, false
	);
	function outp2()
	{

		w.mathDisp(sieqf1);w.line("");w.line("для "); w.mathDisp("x \\in [0, 0.9]");w.line("");w.lineBreak(1);
		w.mathDisp(sieqf2);w.line("");w.line("для "); w.mathDisp("x \\in [0.9, 1.8]");w.line("");w.lineBreak(1);
		w.mathDisp(sieqf3);w.line("");w.line("для "); w.mathDisp("x \\in [1.8, 2.7]");w.line("");w.lineBreak(1);
		w.mathDisp(sieqf4);w.line("");w.line("для "); w.mathDisp("x \\in [2.7, 3.6]");w.line("");w.lineBreak(1);

		w.mathDisp("S(X^{*}) = S_2(X^{*} = 1.5)");w.line("");
		w.mathDisp("S_2(1.5) = -0.4386\\cdot1.5^3+1.507\\cdot1.5^2-0.6505\\cdot1.5+0.4068 = 1.3415");w.line("");w.lineBreak(1);

		w.line("Ответ: ");w.mathDisp(w.casesLeft(
			"S_1 = 0.1196 x^3+0.7058 x",
			"S_2 = -0.4386 x^3+1.507 x^2-0.6505 x+0.4068", 
			"S_3 = 1.097 x^3-6.785 x^2+15.08 x-9.993", 
			"S_4 = -0.7779 x^3+8.401 x^2-24.19 x+22.23", 
			"S(X^{*}) = 1.3415"));
		//-----------------------------------
		w.debug("3.2 Кубический сплайн");
		mainCallback([w.buffer, w.spellBuffer]);
	}
}
module.exports = {
	print: function  (cb) {
		return getPages(cb);
	}
}