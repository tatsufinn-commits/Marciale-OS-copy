@echo off
REM Windows entry — avoids WSL /bin/bash (GitHub Desktop + no WSL distro).
node "%~dp0pre-push.js" %*
exit /b %ERRORLEVEL%
