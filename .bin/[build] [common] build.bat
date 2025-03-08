@echo off
echo.
echo [build] [common] build
echo.

cd ../
pnpm -filter @ms/common build

pause