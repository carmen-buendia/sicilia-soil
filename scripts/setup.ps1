Write-Host "🚀 Configurando SikeliaBusiness Suite" -ForegroundColor Cyan

# Verificar PNPM
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $version = pnpm --version
    Write-Host "✅ PNPM $version instalado" -ForegroundColor Green
} else {
    Write-Host "📦 Instalando PNPM..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Instalar dependencias de la raíz
Write-Host "📦 Instalando dependencias raíz..." -ForegroundColor Yellow
pnpm install

# Instalar dependencias del servidor WebRTC
Write-Host "📡 Instalando servidor WebRTC..." -ForegroundColor Yellow
cd apps/webrtc-server
pnpm install
cd ../..

Write-Host ""
Write-Host "✅ Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "🇮🇹 Comandos:" -ForegroundColor Magenta
Write-Host "   pnpm dev:webrtc    - Iniciar servidor"
Write-Host "   pnpm dev:all       - Iniciar todo"
Write-Host ""