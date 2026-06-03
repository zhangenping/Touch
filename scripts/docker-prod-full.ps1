# Full stack in Docker: PostgreSQL + web app (port 3001)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

if (-not (Test-Path .env)) {
  Copy-Item .env.production.example .env
  Write-Host "Created .env - edit JWT_SECRET then run again." -ForegroundColor Yellow
  exit 1
}

Write-Host ">> Stopping host Node on 3001 if any..." -ForegroundColor Cyan
Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }

Write-Host ">> Building and starting (db + app in Docker)..." -ForegroundColor Cyan
Write-Host "   Using mirror image: docker.1ms.run/library/node:22-alpine" -ForegroundColor Gray
docker compose -f docker-compose.prod.yml up -d --build

if ($LASTEXITCODE -ne 0) {
  Write-Host ">> Failed. Open Docker Desktop - Settings - Docker Engine, add registry-mirrors, restart." -ForegroundColor Red
  exit $LASTEXITCODE
}

Start-Sleep -Seconds 5
docker compose -f docker-compose.prod.yml ps

Write-Host ""
Write-Host ">> Open http://localhost:3001" -ForegroundColor Green
Write-Host "Logs: docker compose -f docker-compose.prod.yml logs -f app" -ForegroundColor Gray
