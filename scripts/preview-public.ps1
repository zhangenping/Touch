# 本地构建 + 预览 + 公网临时隧道（无需 Vercel 账号）
# 适合部署前用手机快速验收

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot\..

npm run build
Write-Host '>> Starting preview on http://127.0.0.1:4173' -ForegroundColor Cyan
Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$PWD'; npm run preview -- --host 0.0.0.0 --port 4173"

Start-Sleep -Seconds 3
Write-Host '>> Starting public tunnel (localtunnel)...' -ForegroundColor Cyan
npx localtunnel --port 4173
