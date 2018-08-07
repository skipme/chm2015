@echo off
bin\jsl conf bin\jsl.KMY.conf
IF NOT %ERRORLEVEL% EQU 0 goto exit_error

node main.js print >doc\out.txt
IF NOT %ERRORLEVEL% EQU 0 goto exit_node

;pandoc -f markdown -t odt doc\out.txt -o doc\out.odt
;IF NOT %ERRORLEVEL% EQU 0 goto exit_error_md

;pandoc -f markdown -t docx doc\out.txt -o doc\out.docx
;IF NOT %ERRORLEVEL% EQU 0 goto exit_error_md

pandoc -f markdown -t latex doc\out.txt -o doc\out.tex --latex-engine=xelatex  --template=bin\template.tex
IF NOT %ERRORLEVEL% EQU 0 goto exit_error_md

pandoc -f markdown -t latex doc\out.txt -o doc\out.pdf --latex-engine=xelatex  --template=bin\template.tex --variable fontsize=10pt
IF NOT %ERRORLEVEL% EQU 0 goto exit_error_md

;pandoc -f markdown -t odt doc\out.tex -o doc\out.odt -r latex  --latex-engine=xelatex
;IF NOT %ERRORLEVEL% EQU 0 goto exit_error_md

;pandoc -f markdown -t docx doc\out.tex -o doc\out.docx -r latex  --latex-engine=xelatex
;IF NOT %ERRORLEVEL% EQU 0 goto exit_error_md

;perl bin\yspell.pl <doc\spell-out.txt >doc\SPELLchkRESULTS.txt

goto exit

:exit_node

:exit_error
echo !!!ошибка js файла
goto exit
:exit_error_md
echo !!!markdown файла
:exit