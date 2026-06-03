# 全栈构建并本地生产预览（公网请用 Railway / Docker，见 project-info）
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot\..

Write-Host '>> Building web + API...' -ForegroundColor Cyan
npm run build

Write-Host '>> Starting production server http://localhost:3001' -ForegroundColor Green
$env:NODE_ENV = 'production'
npm start
