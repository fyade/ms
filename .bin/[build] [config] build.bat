@echo off
echo.
echo [build] [config] build
echo.

cd ../
pnpm -filter @ms/config build

pause