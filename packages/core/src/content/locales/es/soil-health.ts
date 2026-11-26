// packages/core/src/content/locales/es/soil-health.ts
export const soilHealth = {
  badge: "Red micorrícica",
  description:
    "Redes AMF y ECM, glomalina, biorremediación y bioindicadores del ecosistema.",
  title: "Salud Biológica del Suelo",
} as const;

export const soilHealthTabs = {
  bioindicators: {
    addNote: "Añadir nota al diario de campo",
    categoryFungi: "Hongos",
    categoryOther: "Otro",
    categoryPest: "Plaga",
    categoryWeather: "Clima",
    descTitle: "Descripción",
    description:
      "Pico en otoño. El micelio trabaja todo el año; las setas son solo la señal de que la red fúngica está activa.",
    emptyJournal:
      "No hay notas en el diario. Usa el formulario de arriba para añadir la primera.",
    endemic: "Endemismo:",
    endemicFalse: "Cosmopolita",
    endemicTrue: "Endémica de Sikelia 🌍",
    fieldJournal: "Diario de campo",
    findingType: "Tipo de hallazgo",
    habitat: "Hábitat:",
    idealCO2: "CO₂ ideal",
    idealHumidity: "Humedad ideal",
    idealTemp: "Temperatura ideal",
    noSystems: "No hay sistemas",
    optimalTitle: "Condiciones de fructificación",
    placeholder: "Ej: Aparición de setas, mordida de insectos, helada...",
    roleBio: "🔬 Bioindicador",
    roleBoth: "🔬 + 🍽 Ambos",
    roleCult: "🍽 Subproducto",
    saveNote: "Guardar Nota",
    season: "Temporada:",
    title: "Bioindicadores estacionales",
    trackingNote:
      "Las setas salen en otoño, pero el micelio permanece activo bajo tierra todo el año.",
    trackingTitle: "Seguimiento de condiciones · {name}",
    typeAMF: "AMF · Arbuscular",
    typeECM: "ECM · Ectomicorrícica",
    typeNone: "Saprófita",
    zone: "Zona",
  },

  networks: {
    amfColonisation: "Colonización AMF",
    amfHosts: "AMF · {count} hosts",
    description:
      "El micelio conecta las raíces todo el año. Las setas son su bioindicador estacional.",
    ecmColonisation: "Colonización ECM",
    ecmHosts: "ECM · {count} hosts",
    empty: "No hay sistemas registrados. Añade uno en el CRUD de cultivos.",
    hostsCount:
      "{count} hosts monitorizados. La mayoría forman micorrizas arbusculares (AMF). Los pinos forman ectomicorrizas (ECM).",
    networkType: "Tipo de red",
    title: "Redes activas del sistema",
    typeAmf: "Arbuscular (AMF)",
    typeEcm: "Ectomicorrícica (ECM)",
    typeUndefined: "No definida",
  },

  remediation: {
    cadmium: "Cadmio (Cd)",
    chart1Desc: "Niveles medidos trimestralmente vs umbral de referencia",
    chart1Note:
      "Cadmio mostrado ×10 para visibilidad. Umbral de referencia (Pb): {lead} mg/kg.",
    chart1Title: "1. Evolución de contaminantes",
    chart2Desc:
      "Cada contaminante expresado como % del umbral legal. 100% = en el límite",
    chart2Title: "2. Estado actual vs umbral",
    chart3Desc: "Porcentaje de reducción respecto al baseline de {period}",
    chart3Note:
      "Al ritmo actual, se espera alcanzar el umbral de Pb en {date}.",
    chart3Title: "3. Progreso acumulado",
    chart4Desc:
      "El pH, la biomasa fúngica y la colonización micorrícica son los motores de la biorremediación.",
    chart4Note:
      "La biomasa fúngica sube de 18 a 38 µg/g, la glomalina de 0.8 a 1.7 mg/g y la colonización AMF del 15 al 38%. El pH se acerca a neutro, lo que reduce la movilidad de metales pesados.",
    chart4Title: "4. Salud del suelo en la zona contaminada",
    currentState:
      "Estado actual de contaminantes frente a los umbrales de referencia.",
    empty:
      "No hay sistemas registrados. Crea uno en /crops para ver sus datos.",
    expectedCompletion: "Meta",
    fungiDesc:
      "Los hongos saprófitos y micorrícicos acumulan metales pesados en su biomasa y degradan hidrocarburos por vías enzimáticas.",
    fungiTitle: "Hongos biorremediadores",
    hydrocarbons: "Hidrocarburos",
    lead: "Plomo (Pb)",
    limit: "Límite",
    mercury: "Mercurio (Hg)",
    plantsDesc:
      "El esparto retiene el suelo, la mostaza bioacumula metales y el girasol extrae plomo y cadmio del perfil superficial.",
    plantsTitle: "Plantas fitorremediadoras",
    series: {
      amfColonisation: "Colonización AMF (%)",
      cadmium: "Cadmio × 10 (mg/kg)",
      cadmiumReduced: "Cadmio reducido (%)",
      currentPct: "Actual (% del umbral)",
      fungalBiomass: "Biomasa fúngica (µg/g)",
      glomalin: "Glomalina × 10 (mg/g)",
      hydrocarbons: "Hidrocarburos (mg/kg)",
      hydrocarbonsReduced: "Hidrocarburos reducidos (%)",
      lead: "Plomo (mg/kg)",
      leadReduced: "Plomo reducido (%)",
      leadThreshold: "Umbral Pb",
      mercuryReduced: "Mercurio reducido (%)",
      ph: "pH × 10",
      threshold100: "Umbral (100%)",
    },
    startYear: "Inicio",
    title: "Contaminación histórica y biorremediación",
    unknownRegion: "Zona desconocida",
  },

  summary: {
    avgColonisation: "Colonización AMF media",
    description:
      "El micelio conecta las raíces todo el año. Las setas son su bioindicador estacional.",
    empty:
      "No hay sistemas registrados. Añade un cultivo en el CRUD para ver el resumen de salud del suelo.",
    goToBioindicators: "Bioindicadores",
    goToBioindicatorsDesc: "Setas de otoño y seguimiento",
    goToNetworks: "Redes activas",
    goToNetworksDesc: "{count} hosts monitorizados",
    goToRemediation: "Biorremediación",
    goToRemediationDesc: "Plan de recuperación de la zona noreste",
    hydroFromTo: "de 45 a {to} mg/kg",
    hydroReduction: "Reducción hidrocarburos",
    inCrops: "en {count} cultivos",
    leadFromTo: "de 15.2 a {to} mg/kg",
    leadReduction: "Reducción de plomo",
    noHydroData: "Sin datos de hidrocarburos",
    noLeadData: "Sin datos de plomo",
    title: "La red invisible que regenera el suelo",
  },
} as const;
