@echo off
setlocal

for /f "tokens=14 delims= " %%i in ('ipconfig ^| findstr /r /c:"IPv4 Address"') do set IP=%%i

REM Remove any carriage return characters
set IP=%IP%

REM Output the IP address to .env file
echo VITE_API_BASE_URL=http://%IP%:3000 > Frontend/.env

REM Close the terminal
exit