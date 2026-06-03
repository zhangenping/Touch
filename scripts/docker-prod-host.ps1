# Fallback: DB in Docker, app on host (when Docker build unavailable)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

if (-not (Test-Path .env)) {
  Copy-Item .env.production.example .env
  Write-Host "Created .env - edit JWT_SECRET then run again." -ForegroundColor Yellow
  exit 1
}

docker compose -f docker-compose.prod.yml up db -d
Start-Sleep -Seconds 3
npm run db:deploy
npm run build
$env:NODE_ENV = "production"
npm start
