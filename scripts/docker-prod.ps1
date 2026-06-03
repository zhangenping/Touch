# Start production site: Docker DB + local Node app (when Docker cannot pull node image)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

if (-not (Test-Path .env)) {
  Copy-Item .env.production.example .env
  Write-Host "Created .env - edit JWT_SECRET then run again." -ForegroundColor Yellow
  exit 1
}

Write-Host ">> Starting PostgreSQL (Docker)..." -ForegroundColor Cyan
docker compose -f docker-compose.prod.yml up db -d
if ($LASTEXITCODE -ne 0) {
  Write-Host ">> Failed to start database." -ForegroundColor Red
  exit 1
}

Start-Sleep -Seconds 3

Write-Host ">> Applying database migrations..." -ForegroundColor Cyan
npm run db:deploy
if ($LASTEXITCODE -ne 0) {
  Write-Host ">> Migration failed. Is port 5432 ready?" -ForegroundColor Red
  exit 1
}

Write-Host ">> Building frontend and API..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host ""
Write-Host ">> Starting server on http://localhost:3001" -ForegroundColor Green
Write-Host "   Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host ""
$env:NODE_ENV = "production"
npm start
