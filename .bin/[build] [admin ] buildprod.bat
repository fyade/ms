@echo off
echo.
echo [build] [admin ] build:prod
echo.

cd ../
cross-env NODE_ENV=prod pnpm --filter @ms/admin build:prod

pause