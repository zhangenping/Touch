# 构建并部署到 Vercel
# 首次运行会打开浏览器登录 Vercel 账号

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot\..

Write-Host '>> Building...' -ForegroundColor Cyan
npm run build

Write-Host '>> Deploying to Vercel (production)...' -ForegroundColor Cyan
npx vercel deploy --prod --yes

Write-Host '>> Done. Copy the Production URL above for mobile access.' -ForegroundColor Green
