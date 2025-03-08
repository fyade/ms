@echo off
echo.
echo [dev] [server] start:dev
echo.

cd ../
cross-env NODE_ENV=dev pnpm --filter @ms/server start:dev

pause