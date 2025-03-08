@echo off
echo.
echo [build] [server] build:wp
echo.

cd ../
cross-env NODE_ENV=prod pnpm --filter @ms/server build:wp

pause