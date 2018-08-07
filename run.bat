@echo off
cd "C:\Users\USER\Desktop\inst\CHM\binding"

bin\jsl conf bin\jsl.KMY.conf
IF NOT %ERRORLEVEL% EQU 0 goto exit_error

bin\node main.js debug
IF NOT %ERRORLEVEL% EQU 0 goto exit_error

goto exit

:exit_error
echo !!!error in js
goto exit
:exit_error_md
echo !!!markdown error
:exit