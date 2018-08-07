/*jsl:option explicit*/
/*РГР*/
/*ЧМ*/
// http://en.wikibooks.org/wiki/LaTeX/Tables
var _GPREC = 2;
var _prec = function(num) {
	return Number(num.toFixed(_GPREC));
};

var fs = require('fs');
var w = require("./write.js").write();
var exc = require("./wolf.js").execute();

var spellCheckOut = "";
var MP1_GAUSS = require("./gauss.js").print;
var MP2_PROGONKA = require("./progonka.js").print;
var MP3_ITER_ZEIDEL = require("./1_3.js").print;
var MP4_ROTATION = require("./1_4.js").print;
var MP5_SPEC_RADIUS = require("./1_5.js").print;
var MP6_ROOTS_NEWTON_ITER = require("./2_1.js").print;
var MP7_ROOT_NEWTON = require("./2_2.js").print;
var MP8_LAGRANJE = require("./3_1.js").print;
var MP9_QUBIC_SPLINE = require("./3_2.js").print;
var MP10_MNK = require("./3_3.js").print;
var MP11_D = require("./3_4.js").print;
var MP12_Integrate = require("./3_5.js").print;
var MP13_Koshi = require("./4_1.js").print;


// w.debug(exc.eval("2+2"));
// FILL OUR PAGES...
function writePrints(a)
{
	w.line(a[0]);
	spellCheckOut += a[1];
}
 writePrints(MP1_GAUSS());
 w.pageBreak();

 writePrints(MP2_PROGONKA());
 w.pageBreak();

writePrints(MP3_ITER_ZEIDEL());//iterations_zeidel
w.pageBreak();

 writePrints(MP4_ROTATION());//lambdas
 w.pageBreak();

 writePrints(MP5_SPEC_RADIUS());//max lambda
 w.pageBreak();

 writePrints(MP6_ROOTS_NEWTON_ITER());//roots linear equation
 w.pageBreak();

 writePrints(MP7_ROOT_NEWTON());//roots nonlinear equation sys
 w.pageBreak();

 writePrints(MP8_LAGRANJE());//lagrange polinomial
 w.pageBreak();

MP9_QUBIC_SPLINE(function(pages){
	writePrints(pages);
	w.pageBreak();
	afterQubic();
});//qubic spline
// afterQubic();
function afterQubic()
{
	writePrints(MP10_MNK());//lagrange polinomial
	w.pageBreak();

	writePrints(MP11_D());// D', D''
	w.pageBreak();

	writePrints(MP12_Integrate());// Integrals
	w.pageBreak();

	writePrints(MP13_Koshi());// Koshi D
	w.pageBreak();

 	w.debug("ok");
}

// write spell-out
fs.writeFile("./doc/spell-out.txt", spellCheckOut, {encoding: "utf8"}, function(err) {
    if(err) {
        return console.log(err);
    }
}); 

/*
Бэкап рамки
\usepackage[left=0cm,right=0cm,top=0cm,bottom=0cm]{geometry}
\textwidth=105mm
\textheight=260mm
%\oddsidemargin=-.4mm
\oddsidemargin=-3mm
\headsep=5mm

\topmargin=-26.4mm%%-1in-1mm = (-25.4)-1 для HP, для других = 1in
\unitlength=1mm

% :::::::::::::::::: РАМКА
% \def\VL{\line(0,1){15}}
% \def\HL{\line(1,0){185}}
% \def\Box#1#2{\makebox(#1,5){#2}}
% \def\simpleGrad{\sl\small\noindent\hbox to 0pt{%
% \vbox to 0pt{%
% \noindent\begin{picture}(184,287)(2,0)% для HP, для других = (185,287)(3,0)
% \linethickness{0.3mm}
% \put(0,0){\framebox(184,287){}} % для HP, для других =(185,287)
% \put(0,0){\Box{7}{Лит.}}
% \put(0, 15){\line(1,0){184}}
% \multiput(0, 5)(0, 5){2}{\line(1,0){65}}
% \put(7, 0){\VL\Box{10}{Изм.}}
% \put(17, 0){\VL\Box{23}{\textnumero докум.}}
% \put(40, 0){\VL\Box{15}{Подп.}}
% \put(55, 0){\VL\Box{10}{Дата}}
% \put(65, 0){\VL\makebox(110,15){\large\sc\rightmark}}% для HP, для других =110
% \put(174, 0){\VL\makebox(10,10){\normalsize\thepage}}% для HP, для других =175
% \put(174,10){\line(1,0){10}} % для HP, для других =175
% \end{picture}
% }}}
% \makeatletter
% \def\@oddhead{\simpleGrad}
% \def\@oddfoot{}
% \makeatother
% ::::::::::::::::::::РАМКА
\pagenumbering{gobble} % Убрать номера со страниц
*/