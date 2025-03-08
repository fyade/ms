@echo off
echo.
echo [build] [config & common]
echo.

cd ../
pnpm -filter @ms/config build && pnpm -filter @ms/common build

pause