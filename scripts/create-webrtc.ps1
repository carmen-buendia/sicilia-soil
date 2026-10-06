Write-Host "🔧 Creando servidor WebRTC..." -ForegroundColor Yellow

# Crear estructura si no existe
if (-not (Test-Path "apps/webrtc-server")) {
    mkdir apps/webrtc-server, apps/webrtc-server/src -Force
}

# Crear archivos básicos
# ... (copiar los contenidos de arriba)

Write-Host "✅ Servidor WebRTC creado" -ForegroundColor Green