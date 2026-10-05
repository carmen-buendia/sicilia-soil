# 🌱 Sicilia Soil

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-WORK%20IN%20PROGRESS-orange?style=for-the-badge&logo=githubactions&logoColor=white" alt="Work in Progress" />
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/pnpm-9.x-blue?style=flat-square&logo=pnpm" alt="pnpm" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs" alt="Next.js" />
</p>

<p align="center">
  <strong>🌫️ Syntropic Permaculture · 🍄 Mycology · 🌿 Esparto · 🤖 IoT</strong>
</p>

---

## ✨ About the Project

**Sicilia Soil** is a real-time monitoring system for a **syntropic mycology permaculture** garden in Sicily — a pioneering approach that integrates:

- 🌱 **Syntropic Agriculture**: Self-sufficient ecosystem design based on natural succession
- 🍄 **Applied Mycology**: Mushroom cultivation that accelerates soil regeneration
- 🌿 **Traditional Wisdom**: Ancestral techniques for cultivating Sicilian esparto grass
- 🤖 **IoT Technology**: Sensors that monitor and optimize growing conditions

> "It's not just a garden, it's an ecosystem that designs itself with the help of fungi and technology"

---

## 📂 Repository Status

This is the **public documentation repository** for Sicilia Soil.

- ✅ **Monorepo architecture** with shared packages (`core`, `ui`, `utils`).
- ✅ **Frontend**: Next.js app with dashboard, analysis, and monitoring views.
- ✅ **Backend**: Node.js WebSocket server (currently in private development).
- ✅ **Simulated data** for development and testing.
- 🔜 **Real IoT sensor integration** and **Copernicus EO data pipelines** (in development).

---

## 📜 Sicilia Soil Manifesto

### Why this project exists

For too long, technology has been disconnected from the land. Sensors exist, but they're designed for industrial agriculture. Data flows, but it doesn't speak the language of permaculture. Tools are built for scale, not for meaning.

**Sicilia Soil** exists to change that.

### What we believe

🌱 **Syntropy over entropy** — We design systems that gain complexity and abundance over time, not systems that deplete and degrade.

🍄 **Fungi as teachers** — The mycelial network shows us how to connect, share, and regenerate. We listen to what mushrooms teach us about collaboration and circularity.

🌫️ **Tradition as technology** — The wisdom of esparto harvesters, the rhythms of Sicilian seasons, the knowledge passed down for generations — this is not folklore. It is technology refined over centuries.

🤖 **Code as craft** — Clean code, honest architecture, open collaboration. Technology should be understandable, hackable, and built to last.

🌍 **Open source, open collaboration** — This code is free for everyone to use, modify, and distribute under the Apache License 2.0. We believe in the power of open source to drive innovation and sustainability.

### Our commitment

- ✅ This code is open source under the Apache License 2.0.
- ✅ Every line of code will be documented and readable.
- ✅ We will prioritize soil health over shareholder value.
- ✅ We will honor Sicilian traditions while building for the future.
- ✅ We will share what we learn, freely and openly.

### Join us

You don't need to be a developer. You don't need to live in Sicily. You just need to believe that technology can serve the land, and that the land can teach us how to build better.

- 🍄 **Fork** the code
- 🌿 **Plant** your own sensors
- 🍄 **Grow** mushrooms with esparto waste
- 🌫️ **Share** your harvests, digital and physical

**Sicilia Soil is not just a project. It's a proposal.**

A proposal that the future of technology is not in more complexity, but in more connection. To the soil. To the mycelium. To the cycles that have sustained life for millennia.

_"De la tierra siciliana, para el mundo."_

— Carmen Buendía, creator of Sicilia Soil

---

## 🏗️ Monorepo Architecture

This is a **pnpm workspace** monorepo with a modular, feature-based architecture.

```
📦 sicilia-soil/
│
├── 📂 apps/
│   │
│   ├── 📂 web/                            # Next.js frontend (App Router)
│   │   ├── 📂 app/                         # Routes (grouped by feature)
│   │   │   ├── 📂 (dashboard)/              # Main dashboard → /
│   │   │   ├── 📂 (analysis)/               # Analysis → /analysis
│   │   │   ├── 📂 (environmental)/          # Environmental → /ambiental
│   │   │   ├── 📂 (metrics)/                # Metrics → /humidity, /temperature, /light
│   │   │   ├── 📂 (mycology)/               # Mycology → /mycology
│   │   │   ├── 📂 (esparto)/                # Esparto → /esparto
│   │   │   ├── 📂 (configuration)/          # Settings → /configuration
│   │   │   ├── 📄 layout.tsx                # Root layout
│   │   │   └── 📄 globals.css               # Global styles
│   │   │
│   │   ├── 📂 components/
│   │   │   ├── 📂 features/                 # Feature-specific components
│   │   │   │   ├── 📂 dashboard/             # StatsCard, ZoneCard, ServerStatus
│   │   │   │   ├── 📂 analysis/              # DataTable, PredictionCard, etc.
│   │   │   │   ├── 📂 environmental/         # EnvironmentalDashboard, CarbonSection
│   │   │   │   ├── 📂 mycology/              # MushroomCard
│   │   │   │   └── 📂 esparto/               # EspartoSummary
│   │   │   └── 📂 layout/                    # Navbar, SicilianFlag
│   │   │
│   │   ├── 📂 lib/                          # App-specific config and data
│   │   │   ├── 📂 config/                    # Site configuration
│   │   │   ├── 📂 data/                      # Mock data and constants
│   │   │   ├── 📂 hooks/                     # App-specific hooks
│   │   │   ├── 📂 client/                    # WebSocket client
│   │   │   └── 📄 api.ts                     # API client
│   │   │
│   │   ├── 📂 public/                       # Static assets
│   │   ├── 📄 next.config.js                # Next.js config with turbopack.root
│   │   ├── 📄 tailwind.config.js            # Tailwind config
│   │   ├── 📄 tsconfig.json                 # App-level tsconfig
│   │   ├── 📄 vercel.json                   # Vercel deployment config
│   │   └── 📄 package.json
│   │
│   └── 📂 webrtc-server/                    # Node.js backend (WebSocket + Express)
│       └── 📄 package.json
│
├── 📂 packages/                             # Shared packages
│   │
│   ├── 📂 core/                             # Shared types and interfaces
│   │   └── 📂 src/
│   │       ├── 📂 types/
│   │       │   ├── 📄 garden.types.ts         # GardenZone, SensorData
│   │       │   ├── 📄 monitoring.types.ts     # MonitoringState, MonitoringFilters
│   │       │   └── 📄 common.types.ts         # Common shared types
│   │       └── 📄 index.ts                    # Barrel export
│   │
│   ├── 📂 ui/                               # Reusable UI components
│   │   └── 📂 src/
│   │       ├── 📂 components/
│   │       │   ├── 📂 Button/
│   │       │   ├── 📂 Badge/
│   │       │   ├── 📂 LoadingSpinner/
│   │       │   └── 📂 Charts/                 # Highcharts wrappers
│   │       └── 📄 index.ts                    # Barrel export
│   │
│   └── 📂 utils/                            # Shared utility functions
│       └── 📂 src/
│           ├── 📄 formatters.ts                # formatRelativeTime, formatDate
│           ├── 📄 dateUtils.ts
│           ├── 📄 numberUtils.ts
│           ├── 📄 lightUtils.ts
│           ├── 📄 temperatureUtils.ts
│           ├── 📄 humidityUtils.ts
│           ├── 📄 trendUtils.ts
│           └── 📄 index.ts                     # Barrel export
│
├── 📂 .github/                               # GitHub Actions
│   └── 📂 workflows/
│       ├── 📄 ci.yml
│       └── 📄 license-check.yml
│
├── 📄 pnpm-workspace.yaml                    # Workspace definition
├── 📄 tsconfig.json                          # Root TypeScript config with aliases
├── 📄 package.json                           # Root scripts and dev dependencies
├── 📄 LICENSE                                # Apache License 2.0
└── 📄 README.md                              # This file
```

---

## 🔗 Shared Aliases

The monorepo uses **workspace aliases** so any app can import from shared packages:

| Alias                 | Resolves to          |
| --------------------- | -------------------- |
| `@sicilia-soil/core`  | `packages/core/src`  |
| `@sicilia-soil/ui`    | `packages/ui/src`    |
| `@sicilia-soil/utils` | `packages/utils/src` |

Example usage:

```tsx
import { GardenZone } from "@sicilia-soil/core";
import { Button, Badge, HumidityChart } from "@sicilia-soil/ui";
import { formatRelativeTime } from "@sicilia-soil/utils";
```

---

## 🧩 Features

| Feature           | Route                                 | Description                                                    |
| ----------------- | ------------------------------------- | -------------------------------------------------------------- |
| **Dashboard**     | `/`                                   | Overview of garden zones, environmental metrics, sensor status |
| **Analysis**      | `/analysis`                           | Comparative charts, statistics, and predictions                |
| **Environmental** | `/ambiental`                          | Heavy metals, air quality, water quality, CO₂ sequestration    |
| **Metrics**       | `/humidity`, `/temperature`, `/light` | Detailed per-zone metric monitoring                            |
| **Mycology**      | `/mycology`                           | Native Sicilian mushroom tracking                              |
| **Esparto**       | `/esparto`                            | Esparto cultivation and traditional calendar                   |
| **Configuration** | `/configuration`                      | System settings                                                |

---

## 🛰️ Designed for Earth Observation & IoT

Sicilia Soil is being developed with a clear technical direction: **connecting in-situ IoT sensors with satellite Earth Observation data** to produce actionable insights for regenerative agriculture.

The platform is being designed to integrate with:

- **Copernicus Earth Observation data** (Sentinel-2, Sentinel-3, Sentinel-1) for vegetation indices, land surface temperature, and soil moisture.
- **IoT sensor networks** (soil moisture, temperature, humidity, leaf wetness, light) for real-time in-situ monitoring.
- **Hybrid Edge-to-Cloud architecture** with offline resilience for rural areas with intermittent connectivity.

The goal is to enable **data-driven decision support** for farmers, cooperatives, and advisors — optimizing water use, soil health, and crop resilience.

> Full technical documentation will be published as the project matures.

---

## 🍄 What is Syntropic Mycology Permaculture?

**Syntropy** is the principle opposite to entropy: systems that **gain complexity and abundance over time**. Applied to permaculture and combined with mycology, it creates:

```
🌱 Design strategy:
├── 🌳 Canopy layer (olives, carob trees)
├── 🌿 Understory layer (esparto, herbs)
├── 🍄 Fungal layer (mushrooms, mycorrhizae)
└── 🌱 Ground cover (clover, legumes)
```

### Benefits of this approach

| Layer      | Function                  | Species                                                   |
| :--------- | :------------------------ | :-------------------------------------------------------- |
| **Trees**  | Shade, structure, food    | Olive, carob                                              |
| **Shrubs** | Protection, biomass       | Esparto, rosemary, thyme                                  |
| **Fungi**  | Connection, regeneration  | Cardonchello, Cardoncello di Nebrodi, Prataiolo siciliano |
| **Cover**  | Soil protection, moisture | Clover, fava beans                                        |

**The result:** An ecosystem where every element benefits the others, with fungi acting as the "internet of the soil," connecting roots and sharing nutrients.

---

## 🍄🌫️ Syntropic Cycle: Esparto, Mycelium & Sicilian Soil

### Full soil regeneration with native species

At Sicilia Soil, we're not just monitoring data. We're building a **circular ecosystem** where every element feeds the next, using **native Sicilian mushrooms** that have co-evolved with esparto for millennia.

```
                    🌿 ESPARTO
                    (Stipa tenacissima)
                        │
                        ▼
              ┌─────────────────┐
              │  Fibers & waste │
              └─────────────────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    🍄 SUBSTRATE   🌿 MULCH       🧵 CRAFTS
    for native     for soil        (long fibers)
    mushrooms          │
         │              │
         ▼              ▼
    🍄 MYCELIUM    🌱 NUTRIENTS
    (fungi)        for soil
         │              │
         └──────────────┘
                ▼
         🌍 LIVING SOIL
         (regenerated)
                │
                ▼
         🌿 STRONGER ESPARTO
         (new cycle)
```

### 🍄 Native Sicilian mushrooms we cultivate

| Species                   | Sicilian name            | Ecological function              | Preferred substrate                     |
| :------------------------ | :----------------------- | :------------------------------- | :-------------------------------------- |
| **Pleurotus eryngii**     | _Cardonchello_           | Decomposes umbellifer roots      | _Ferula communis_ roots + esparto waste |
| **Pleurotus nebrodensis** | _Cardoncello di Nebrodi_ | Endemic to Sicily, highly valued | Esparto waste + straw + gypsum          |
| **Agaricus bitorquis**    | _Prataiolo siciliano_    | High-quality humus               | Esparto compost + manure                |

> 🔍 *Note: **Cardonchello (Pleurotus eryngii)** is Sicily's most emblematic mushroom. It grows naturally on the roots of *Ferula communis* (giant fennel), a plant that shares habitat with esparto. This natural symbiosis is the foundation of our cycle.*

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **pnpm** 9+ (`npm install -g pnpm`)
- (Optional) Arduino sensors for real data

### Installation

```bash
# Clone the repository
git clone https://github.com/carmen-buendia/sicilia-soil.git
cd sicilia-soil

# Install all workspace dependencies
pnpm install
```

### Development

```bash
# Run only the web frontend (recommended for UI work)
pnpm --filter=web dev

# Run only the WebSocket backend
pnpm --filter=webrtc-server dev

# Run all apps in parallel
pnpm dev
```

The frontend will be available at **http://localhost:3000**.
The WebSocket backend will be available at **http://localhost:3001**.

### Production Build

```bash
pnpm --filter=web build
pnpm --filter=web start
```

---

## 🌐 Deploying to Vercel

This monorepo is configured to deploy the frontend app to Vercel.

### 1. Import the repository

Go to [vercel.com/new](https://vercel.com/new) and select `sicilia-soil`.

### 2. Configure the project

| Setting              | Value                                 |
| -------------------- | ------------------------------------- |
| **Framework Preset** | Next.js                               |
| **Root Directory**   | `apps/web`                            |
| **Install Command**  | `cd ../.. && pnpm install`            |
| **Build Command**    | `cd ../.. && pnpm --filter=web build` |
| **Output Directory** | `.next`                               |

### 3. Environment Variables

Add these in **Settings → Environment Variables**:

| Variable                       | Value                                       |
| ------------------------------ | ------------------------------------------- |
| `NEXT_PUBLIC_API_URL`          | `https://sicilia-soil-backend.onrender.com` |
| `NEXT_PUBLIC_WS_URL`           | `wss://sicilia-soil-backend.onrender.com`   |
| `NEXT_PUBLIC_ENABLE_MOCK_DATA` | `true`                                      |

### 4. Production Branch

Set **Settings → Git → Production Branch** to `develop` (or `main`).

---

## 🤖 CI/CD Pipeline

This project uses **GitHub Actions** to maintain code quality and license compliance:

```yaml
✅ Automatic linting (ESLint)
✅ Type checking (TypeScript)
✅ Build all apps
✅ License verification (Apache 2.0)
🔜 Unit and integration tests
🔜 Automatic deployment to Vercel
```

---

## 🛠️ Technologies

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Highcharts-12-0081CB?style=for-the-badge&logo=highcharts&logoColor=white" alt="Highcharts" />
  <img src="https://img.shields.io/badge/pnpm-9-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
</p>

---

## 🗺️ Roadmap

### ✅ v1.0.0 – Foundation

- [x] Basic dashboard with simulated data
- [x] Syntropic layer visualization
- [x] Esparto cultivation calendar
- [x] Mycology with native Sicilian mushrooms
- [x] Environmental monitoring dashboard
- [x] Monorepo architecture with shared packages
- [x] CI/CD configured
- [x] Open source under Apache 2.0

### 🚧 v1.1.0 – Connections

- [ ] Real IoT sensor integration
- [ ] Copernicus EO data integration
- [ ] Persistent database (PostgreSQL + Prisma)
- [ ] Unit tests (Jest + React Testing Library)
- [ ] Storybook for `packages/ui`
- [ ] Symbiotic relationship visualization

### 🔜 v1.2.0 – Advanced Visualization

- [ ] HighCharts/AG-Grid for succession graphs
- [ ] Interactive historical data
- [ ] Soil nutrient maps
- [ ] Layer comparisons

### 🔮 v2.0.0 – Syntropic IoT

- [ ] Ecological imbalance alerts
- [ ] Predictive succession model
- [ ] Native mushroom database
- [ ] Mobile companion app

---

## 🤝 Contributing

Want to contribute to this digital ecosystem? All help is welcome!

1. 🍄 **Fork** the project (like a seed)
2. 🌿 **Create your branch** (`git checkout -b feature/AmazingFeature`)
3. 🌱 **Add your code** (that benefits the whole)
4. 💾 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
5. 📤 **Push** to the branch (`git push origin feature/AmazingFeature`)
6. 🔍 **Open a Pull Request** (like a new layer in the system)

---

## ⚖️ License

**Sicilia Soil** is released under the **Apache License 2.0**.

You are free to:

- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Sublicense
- ✅ Use in private projects

Under the conditions that you:

- 📄 Include the original copyright notice
- 📄 Include a copy of the license
- 📄 State changes made to the code
- 📄 Include the NOTICE file if one exists

For the full text, see the [LICENSE](LICENSE) file.

---

## 📬 Contact

For general questions or collaboration:

- **Email:** carmenbuendiafullstack@gmail.com
- **LinkedIn:** [carmen-buendía](https://linkedin.com/in/carmen-buendía)

---

## 👩‍💻 Author

<p align="center">
  <img src="https://github.com/carmen-buendia.png" width="100px" style="border-radius: 50%;" alt="Carmen Buendía"/>
</p>

<p align="center">
  <strong>Carmen Buendía</strong><br />
  🎧 Music Producer · 🏗️ Frontend Architect · 🌱 Syntropic Systems Designer
</p>

<p align="center">
  <a href="https://github.com/carmen-buendia"><img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github" /></a>
  <a href="https://linkedin.com/in/carmen-buendía"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin" /></a>
  <a href="mailto:carmenbuendiafullstack@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white" /></a>
</p>

---

<p align="center">
  <strong>Made with ❤️, 🌱, 🍄 and 🌿 in Sicily</strong><br />
  <sub>Where technology and nature design the future together</sub>
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
