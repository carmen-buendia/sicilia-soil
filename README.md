# 🌱 Sicilia Soil

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/carmen-buendia/sicilia-soil/ci.yml?branch=main&label=CI&logo=github" alt="CI Status" />
  <img src="https://img.shields.io/github/license/carmen-buendia/sicilia-soil?color=green" alt="MIT License" />
  <img src="https://img.shields.io/github/last-commit/carmen-buendia/sicilia-soil?color=blue&logo=github" alt="Last Commit" />
  <img src="https://img.shields.io/badge/Status-Active%20Development-yellow?logo=progress" alt="Status" />
  <img src="https://img.shields.io/github/repo-size/carmen-buendia/sicilia-soil?color=purple" alt="Repo Size" />
</p>

<p align="center">
  <strong>🌾 Permacultura Sintrópica · 🍄 Micología · 🌿 Esparto · 🤖 IoT</strong>
</p>

---

## ✨ Sobre el Proyecto

**Sicilia Soil** es un sistema de monitoreo en tiempo real para un huerto de **permacultura sintrópica micológica** en Sicilia — un enfoque pionero que integra:

- 🌱 **Agricultura sintrópica**: Diseño de ecosistemas autosuficientes basados en la sucesión natural
- 🍄 **Micología aplicada**: Cultivo de setas que aceleran la regeneración del suelo
- 🌿 **Sabiduría tradicional**: Técnicas ancestrales de cultivo de esparto siciliano
- 🤖 **Tecnología IoT**: Sensores que monitorizan y optimizan las condiciones

> "No es solo un huerto, es un ecosistema que se diseña a sí mismo con la ayuda de hongos y tecnología"

---

## 🍄 ¿Qué es la Permacultura Sintrópica Micológica?

La **sintropía** es el principio opuesto a la entropía: sistemas que **ganan complejidad y abundancia con el tiempo**. Aplicada a la permacultura y combinada con micología, crea:

```
🌱 Estrategia de diseño:
├── 🌳 Estrato alto (olivos, algarrobos)
├── 🌿 Estrato medio (esparto, hierbas)
├── 🍄 Estrato fúngico (setas, micorrizas)
└── 🌱 Estrato bajo (cobertura vegetal)
```

### Beneficios de este enfoque:

| Capa | Función | Especies |
|:---|:---|:---|
| **Árboles** | Sombra, estructura, alimento | Olivos, algarrobos |
| **Arbustos** | Protección, biomasa | Esparto, romero, tomillo |
| **Hongos** | Conexión, regeneración | Seta ostra, shiitake, maitake |
| **Cobertura** | Protección suelo, humedad | Trébol, habas |

**El resultado:** Un ecosistema donde cada elemento beneficia a los demás, con los hongos actuando como "internet del suelo" conectando raíces y compartiendo nutrientes.

---

## 👩‍💻 Autora

<table>
  <tr>
    <td>
      <img src="https://github.com/carmen-buendia.png" width="100px" style="border-radius: 50%;" alt="Carmen Buendía"/>
    </td>
    <td>
      <strong>Carmen Buendía</strong><br />
      🎵 Productora musical · 🏗️ Arquitecta Frontend · 🌱 Diseñadora de sistemas sintrópicos<br />
      <br />
      <a href="https://github.com/carmen-buendia">
        <img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github" />
      </a>
      <a href="https://linkedin.com/in/carmen-buendía">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin" />
      </a>
      <a href="mailto:carmenbuendiafullstack@gmail.com">
        <img src="https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

---

## 📊 Estado del Proyecto

| Componente | Estado | Próximos Pasos |
|:---|:---:|:---|
| **Frontend (Next.js)** | ✅ Funcional | Añadir tests unitarios |
| **Backend (WebSocket)** | ✅ Funcional | Integración con sensores reales |
| **Dashboard sintrópico** | ✅ Operativo | Visualización de relaciones entre capas |
| **Módulo de micología** | ✅ Operativo | Seguimiento de ciclos fúngicos |
| **Calendario esparto** | ✅ Operativo | Tareas tradicionales |
| **Visualización de datos** | ⏳ En progreso | HighCharts/AG-Grid |
| **Testing** | ⏳ Pendiente | Jest + React Testing Library |
| **CI/CD** | ✅ Configurado | GitHub Actions activo |

---

## 🏗️ Arquitectura del Monorepo

```
📦 sicilia-soil/
├── 📂 apps/
│   ├── 📂 web/                    # Frontend Next.js
│   │   ├── 📂 app/                 # App Router
│   │   ├── 📂 components/           # Componentes React
│   │   ├── 📂 lib/                  # Utilidades y clientes
│   │   └── 📄 package.json
│   │
│   └── 📂 webrtc-server/            # Backend Node.js
│       ├── 📂 src/                   # Código del servidor
│       └── 📄 package.json
│
├── 📂 packages/                     # Código compartido (futuro)
├── 📂 .github/                       # GitHub Actions
│   └── 📂 workflows/
│       └── 📄 ci.yml                  # CI pipeline
│
├── 📄 package.json                    # Dependencias del monorepo
├── 📄 pnpm-workspace.yaml              # Configuración PNPM
├── 📄 README.md                        # Este archivo
└── 📄 LICENSE                          # MIT License
```

---

## 🌱 Diseño Sintrópico en el Dashboard

El dashboard refleja los principios de la sintropía:

### 📍 Mapa de Capas
Visualización de las diferentes alturas y estratos del ecosistema:
- Canopia (olivos)
- Sotobosque (esparto)
- Capa fúngica (setas)
- Cobertura vegetal

### 🔗 Relaciones Simbióticas
Cada zona muestra cómo sus elementos se benefician mutuamente:
- Micorrizas conectando raíces
- Hongos descomponiendo materia
- Plantas fijadoras de nitrógeno

### ⏱️ Sucesión Temporal
Calendario que muestra la evolución natural del sistema:
- Fase pionera (primeros años)
- Fase de acumulación
- Fase de clímax (madurez)

---

## 🚀 Cómo Empezar

### Prerrequisitos
- Node.js 18+
- pnpm 8+ (`npm install -g pnpm`)
- (Opcional) Sensores Arduino para datos reales

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/carmen-buendia/sicilia-soil.git
cd sicilia-soil

# Instalar dependencias
pnpm install

# Ejecutar frontend (http://localhost:3000)
pnpm run dev --filter=web

# En otra terminal, ejecutar backend (http://localhost:3001)
pnpm run dev --filter=webrtc-server
```

---

## 🤖 CI/CD Pipeline

Este proyecto utiliza **GitHub Actions** para mantener la calidad del código:

```yaml
✅ Linting automático (ESLint)
✅ Type checking (TypeScript)
✅ Build de todas las aplicaciones
🔜 Tests unitarios y de integración
🔜 Despliegue automático en Vercel
🔜 Análisis de cobertura de código
```

[![CI Status](https://github.com/carmen-buendia/sicilia-soil/actions/workflows/ci.yml/badge.svg)](https://github.com/carmen-buendia/sicilia-soil/actions/workflows/ci.yml)

---

## 🧪 Testing (Hoja de Ruta)

| Fase | Estado | Descripción |
|:---|:---:|:---|
| **Unit tests** | ⏳ Pendiente | Jest + React Testing Library |
| **Integration tests** | ⏳ Pendiente | Pruebas de flujos completos |
| **E2E tests** | ⏳ Pendiente | Cypress / Playwright |
| **Coverage** | ⏳ Pendiente | Mínimo 80% |

---

## 🗺️ Roadmap Sintrópico

### ✅ v1.0.0 - Fundación (Actual)
- [x] Dashboard básico con datos simulados
- [x] Visualización por estratos (alturas)
- [x] Cultivo de esparto con calendario tradicional
- [x] Micología con 4 tipos de setas
- [x] CI/CD configurado

### 🚧 v1.1.0 - Conexiones (Próximo)
- [ ] Visualización de relaciones simbióticas
- [ ] Tests unitarios (Jest)
- [ ] Documentación de principios sintrópicos
- [ ] Mejora de tipos TypeScript

### 🔜 v1.2.0 - Visualización Avanzada
- [ ] HighCharts/AG-Grid para gráficos de sucesión
- [ ] Datos históricos interactivos
- [ ] Mapas de nutrientes del suelo
- [ ] Comparativas entre estratos

### 🔮 v2.0.0 - IoT Sintrópico
- [ ] Conexión con sensores Arduino reales
- [ ] Base de datos persistente
- [ ] Alertas de desequilibrios ecológicos
- [ ] Modelo predictivo de sucesión

---

## 🤝 Contribuciones Sintrópicas

¿Quieres contribuir a este ecosistema digital? ¡Toda ayuda es bienvenida!

1. 🍴 **Fork** el proyecto (como una semilla)
2. 🌿 **Crea tu rama** (`git checkout -b feature/AmazingFeature`)
3. 🌱 **Añade tu código** (que beneficie al conjunto)
4. 💾 **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. 📤 **Push** a la rama (`git push origin feature/AmazingFeature`)
6. 🔍 **Abre un Pull Request** (como una nueva capa en el sistema)

---

## 📊 Métricas del Ecosistema

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=carmen-buendia&repo=sicilia-soil&theme=radical" alt="Repo Card" />
  <img src="https://repobeats.axiom.co/api/embed/placeholder.svg" alt="Repo Activity" />
</p>

---
⚖️ Licencia y Modelo de Negocio
Sicilia Soil utiliza un modelo de licenciamiento dual para equilibrar el acceso comunitario con la sostenibilidad del proyecto:

🌱 Para la comunidad (Gratuito - NC OSL)
El código está disponible bajo la licencia NC OSL (Non-Commercial Open Source License) v1.0. Esto significa que puedes usarlo, modificarlo y compartirlo libremente siempre que sea para:

✅ Permitido	❌ No permitido
• Fines educativos y de investigación	• Uso en productos comerciales
• Proyectos personales sin ánimo de lucro	• SaaS (Software as a Service) comercial
• Iniciativas comunitarias y cooperativas	• Herramientas internas de empresas
• Experimentación y aprendizaje	• Apps de pago o con suscripción
• Hackathons y talleres	• Cualquier actividad con ánimo de lucro
• Tesis académicas	• Incorporación en proyectos comerciales
Condiciones:

✅ Debes mantener el crédito a la autora original (Copyright (c) 2026 Carmen Buendía)

✅ Debes compartir las mejoras bajo la misma licencia

✅ Incluir el aviso de licencia en las redistribuciones

💼 Para uso comercial (Licencia paga)
¿Eres una empresa, startup o emprendedor y quieres usar Sicilia Soil en tu producto, servicio interno o proyecto comercial? Necesitas adquirir una licencia comercial.

🎯 ¿Por qué este modelo?
Este sistema me permite:

Mantener el proyecto vivo y dedicar tiempo a mejorarlo

Ofrecer acceso gratuito a quienes no pueden pagar (estudiantes, investigadores, comunidades)

Crear un negocio sostenible que me permita vivir de mi trabajo

Asegurar que grandes empresas contribuyan si quieren beneficiarse comercialmente

Como dice la .NET Foundation: "El licenciamiento dual es una práctica aceptada y respetada que permite a los creadores de open source construir negocios sostenibles sin traicionar los valores comunitarios."

📬 Contacto comercial
¿Interesado en una licencia comercial o tienes dudas?

"Este proyecto nace de mi amor por la permacultura y la tecnología. Quiero que sea útil para la comunidad, pero también necesito que me permita vivir. El licenciamiento dual es mi forma de honrar ambos objetivos."

— Carmen Buendía, creadora de Sicilia Soil

---

<p align="center">
  <strong>Hecho con ❤️, 🌱, 🍄 y 🌾 en Sicilia</strong><br />
  <sub>Donde la tecnología y la naturaleza diseñan el futuro juntas</sub>
</p>

<p align="center">
  <a href="https://github.com/carmen-buendia/sicilia-soil/stargazers">
    <img src="https://img.shields.io/github/stars/carmen-buendia/sicilia-soil?style=social" alt="Stars" />
  </a>
  <a href="https://github.com/carmen-buendia/sicilia-soil/network/members">
    <img src="https://img.shields.io/github/forks/carmen-buendia/sicilia-soil?style=social" alt="Forks" />
  </a>
  <a href="https://github.com/carmen-buendia/sicilia-soil/watchers">
    <img src="https://img.shields.io/github/watchers/carmen-buendia/sicilia-soil?style=social" alt="Watchers" />
  </a>
</p>

---

## 🧪 Prueba de flujo de trabajo
Este es un cambio de prueba para verificar el sistema de Pull Requests.
