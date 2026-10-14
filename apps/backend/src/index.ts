import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// ============================================
// DATOS SIMULADOS DEL HUERTO
// ============================================

// Datos de zonas (compatibles con el cliente)
export interface SensorData {
  zoneId: string;
  zoneName: string;
  sensors: {
    moisture: { current: number; optimal: number; unit: string };
    temperature: { current: number; min: number; max: number; unit: string };
    light: { current: number; optimal: number; unit: string };
    wind: { current: number; unit: string };
  };
  status: string;
  lastUpdate: string;
}

const gardenZones: SensorData[] = [
  {
    zoneId: "esparto",
    zoneName: "Zona de Esparto",
    sensors: {
      moisture: { current: 78, optimal: 70, unit: "%" },
      temperature: { current: 22, min: 18, max: 25, unit: "°C" },
      light: { current: 65, optimal: 70, unit: "%" },
      wind: { current: 12, unit: "km/h" },
    },
    status: "saludable",
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "tomates",
    zoneName: "Huerta de Tomates",
    sensors: {
      moisture: { current: 82, optimal: 75, unit: "%" },
      temperature: { current: 24, min: 20, max: 28, unit: "°C" },
      light: { current: 78, optimal: 80, unit: "%" },
      wind: { current: 8, unit: "km/h" },
    },
    status: "óptimo",
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "olivar",
    zoneName: "Olivar",
    sensors: {
      moisture: { current: 45, optimal: 60, unit: "%" },
      temperature: { current: 21, min: 16, max: 24, unit: "°C" },
      light: { current: 45, optimal: 60, unit: "%" },
      wind: { current: 15, unit: "km/h" },
    },
    status: "necesita riego",
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "compost",
    zoneName: "Zona Compost",
    sensors: {
      moisture: { current: 55, optimal: 50, unit: "%" },
      temperature: { current: 28, min: 22, max: 32, unit: "°C" },
      light: { current: 30, optimal: 40, unit: "%" },
      wind: { current: 5, unit: "km/h" },
    },
    status: "activo",
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "hierbas",
    zoneName: "Jardín de Hierbas",
    sensors: {
      moisture: { current: 68, optimal: 65, unit: "%" },
      temperature: { current: 23, min: 19, max: 26, unit: "°C" },
      light: { current: 70, optimal: 75, unit: "%" },
      wind: { current: 10, unit: "km/h" },
    },
    status: "saludable",
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "agua",
    zoneName: "Depósito de Agua",
    sensors: {
      moisture: { current: 90, optimal: 85, unit: "%" },
      temperature: { current: 18, min: 15, max: 22, unit: "°C" },
      light: { current: 40, optimal: 50, unit: "%" },
      wind: { current: 7, unit: "km/h" },
    },
    status: "lleno",
    lastUpdate: new Date().toISOString(),
  },
];

// Historial simulado para cada zona
const historicalData: Record<string, any> = {};

// Inicializar historial
gardenZones.forEach((zone) => {
  historicalData[zone.zoneId] = {
    moisture: [],
    temperature: [],
    light: [],
    wind: [],
  };

  // Generar 30 días de datos históricos
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    Object.keys(historicalData[zone.zoneId]).forEach((sensor) => {
      const baseValue =
        zone.sensors[sensor as keyof typeof zone.sensors].current;
      const variation = Math.random() * 10 - 5;
      historicalData[zone.zoneId][sensor].push({
        timestamp: date.toISOString(),
        value: Math.max(0, Math.min(100, baseValue + variation)),
      });
    });
  }
});

// ============================================
// API REST
// ============================================

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "🌱 MycoMesh Protocol - Servidor de Permacultura",
    version: "1.0.0",
    status: "online",
    endpoints: {
      zones: "/api/zones",
      zone: "/api/zones/:zoneId",
      stats: "/api/stats",
      alerts: "/api/alerts",
      history: "/api/history/:zoneId/:sensor",
      health: "/health",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "sicilia-soil-server",
    timestamp: new Date().toISOString(),
    zones: gardenZones.length,
  });
});

// Obtener todas las zonas
app.get("/api/zones", (req, res) => {
  res.json({
    zones: gardenZones,
    total: gardenZones.length,
  });
});

// Obtener una zona específica
app.get("/api/zones/:zoneId", (req, res) => {
  const zone = gardenZones.find((z) => z.zoneId === req.params.zoneId);
  if (!zone) {
    return res.status(404).json({ error: "Zona no encontrada" });
  }
  res.json(zone);
});

// Estadísticas generales
app.get("/api/stats", (req, res) => {
  const avgMoisture =
    gardenZones.reduce((acc, z) => acc + z.sensors.moisture.current, 0) /
    gardenZones.length;
  const avgTemperature =
    gardenZones.reduce((acc, z) => acc + z.sensors.temperature.current, 0) /
    gardenZones.length;
  const avgLight =
    gardenZones.reduce((acc, z) => acc + z.sensors.light.current, 0) /
    gardenZones.length;

  res.json({
    averageMoisture: Math.round(avgMoisture * 10) / 10,
    averageTemperature: Math.round(avgTemperature * 10) / 10,
    averageLight: Math.round(avgLight * 10) / 10,
    totalZones: gardenZones.length,
    activeZones: gardenZones.filter((z) => z.status !== "inactivo").length,
    zonesNeedingWater: gardenZones.filter(
      (z) => z.sensors.moisture.current < z.sensors.moisture.optimal,
    ).length,
    timestamp: new Date().toISOString(),
  });
});

// Alertas activas
app.get("/api/alerts", (req, res) => {
  const alerts = gardenZones
    .filter((z) => z.sensors.moisture.current < z.sensors.moisture.optimal)
    .map((z) => ({
      zone: z.zoneName,
      type: "humedad baja",
      current: `${z.sensors.moisture.current}${z.sensors.moisture.unit}`,
      optimal: `${z.sensors.moisture.optimal}${z.sensors.moisture.unit}`,
      severity:
        z.sensors.moisture.current < z.sensors.moisture.optimal - 10
          ? "alta"
          : "media",
      timestamp: new Date().toISOString(),
    }));

  res.json({
    total: alerts.length,
    alerts,
  });
});

// Datos históricos
app.get("/api/history/:zoneId/:sensor", (req, res) => {
  const { zoneId, sensor } = req.params;

  if (!historicalData[zoneId] || !historicalData[zoneId][sensor]) {
    return res.status(404).json({ error: "Datos no encontrados" });
  }

  res.json({
    zoneId,
    sensor,
    data: historicalData[zoneId][sensor],
  });
});

// ============================================
// WEBSOCKETS (tiempo real)
// ============================================

io.on("connection", (socket) => {
  console.log("🌱 Cliente conectado al servidor de sensores:", socket.id);

  // Enviar datos iniciales
  socket.emit("initial-data", {
    zones: gardenZones,
    stats: {
      averageMoisture:
        gardenZones.reduce((acc, z) => acc + z.sensors.moisture.current, 0) /
        gardenZones.length,
      averageTemperature:
        gardenZones.reduce((acc, z) => acc + z.sensors.temperature.current, 0) /
        gardenZones.length,
    },
  });

  // Suscripción a una zona específica
  socket.on("subscribe-zone", (zoneId: string) => {
    socket.join(`zone-${zoneId}`);
    console.log(`📡 Cliente ${socket.id} suscrito a zona: ${zoneId}`);

    // Enviar datos actuales de la zona
    const zone = gardenZones.find((z) => z.zoneId === zoneId);
    if (zone) {
      socket.emit("zone-update", zone);
    }
  });

  // Cancelar suscripción
  socket.on("unsubscribe-zone", (zoneId: string) => {
    socket.leave(`zone-${zoneId}`);
    console.log(`🔕 Cliente ${socket.id} canceló suscripción: ${zoneId}`);
  });

  // Riego manual
  socket.on("manual-watering", (data: { zoneId: string; duration: number }) => {
    console.log(
      `💧 Riego manual solicitado: zona ${data.zoneId} por ${data.duration} minutos`,
    );

    // Simular activación de riego
    setTimeout(
      () => {
        io.to(`zone-${data.zoneId}`).emit("watering-status", {
          zoneId: data.zoneId,
          status: "completed",
          duration: data.duration,
          startTime: new Date(
            Date.now() - data.duration * 60 * 1000,
          ).toISOString(),
          endTime: new Date().toISOString(),
        });
      },
      data.duration * 60 * 1000,
    );

    // Confirmar inicio
    io.to(`zone-${data.zoneId}`).emit("watering-status", {
      zoneId: data.zoneId,
      status: "active",
      duration: data.duration,
      startTime: new Date().toISOString(),
    });
  });

  // Simular actualizaciones periódicas (cada 30 segundos)
  const interval = setInterval(() => {
    gardenZones.forEach((zone) => {
      // Variaciones aleatorias en los sensores
      zone.sensors.moisture.current += Math.random() * 2 - 1;
      zone.sensors.moisture.current = Math.max(
        0,
        Math.min(100, zone.sensors.moisture.current),
      );

      zone.sensors.temperature.current += Math.random() * 0.6 - 0.3;
      zone.sensors.light.current += Math.random() * 4 - 2;
      zone.sensors.light.current = Math.max(
        0,
        Math.min(100, zone.sensors.light.current),
      );

      zone.lastUpdate = new Date().toISOString();

      // Actualizar estado basado en humedad
      if (zone.sensors.moisture.current < zone.sensors.moisture.optimal - 10) {
        zone.status = "necesita riego";
      } else if (
        zone.sensors.moisture.current >
        zone.sensors.moisture.optimal + 10
      ) {
        zone.status = "exceso de agua";
      } else {
        zone.status = "saludable";
      }

      // Enviar actualización a los suscritos
      io.to(`zone-${zone.zoneId}`).emit("zone-update", zone);
    });

    // Estadísticas globales
    const avgMoisture =
      gardenZones.reduce((acc, z) => acc + z.sensors.moisture.current, 0) /
      gardenZones.length;
    const avgTemperature =
      gardenZones.reduce((acc, z) => acc + z.sensors.temperature.current, 0) /
      gardenZones.length;

    io.emit("global-stats", {
      averageMoisture: Math.round(avgMoisture * 10) / 10,
      averageTemperature: Math.round(avgTemperature * 10) / 10,
      timestamp: new Date().toISOString(),
    });
  }, 30000); // Cada 30 segundos

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
    clearInterval(interval);
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

const PORT = 3001;
server.listen(PORT, () => {
  console.log("=".repeat(60));
  console.log("🌱 MycoMesh Protocol - Servidor de Permacultura");
  console.log("=".repeat(60));
  console.log(`📡 Puerto: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/zones`);
  console.log(`📊 Stats: http://localhost:${PORT}/api/stats`);
  console.log(`🚨 Alertas: http://localhost:${PORT}/api/alerts`);
  console.log("=".repeat(60));
});
