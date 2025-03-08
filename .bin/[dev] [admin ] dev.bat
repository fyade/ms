@echo off
echo.
echo [dev] [admin ] dev
echo.

cd ../
cross-env NODE_ENV=dev pnpm --filter @ms/admin dev

pause