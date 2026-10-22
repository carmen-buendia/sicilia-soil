// ============================================================================
// SikeliaSoil - Content Translations (Spanish)
// ----------------------------------------------------------------------------
// Static text content for public pages (Landing, About, Manifesto, Crops).
// Sorted alphabetically by key for maintainability.
// ============================================================================

export const content = {
  // About page content
  about: {
    btnContact: "Contacto",
    btnGithub: "Ver en GitHub",
    btnManifesto: "Leer el Manifiesto",
    eoDesc:
      "Datos de Sentinel-1 (SAR), Sentinel-2 (NDVI) y Sentinel-3 (LST) para el seguimiento de la vegetación, la humedad del suelo y el estrés por sequía.",
    eoTitle: "Observación de la Tierra",
    euCopernicus: "Datos Abiertos y Copernicus",
    euCopernicusDesc:
      "Construido sobre la Observación de la Tierra de Copernicus y Open Data Cube.",
    euFarmToFork: "Estrategia De la Granja a la Mesa",
    euFarmToForkDesc:
      "Reducción de la dependencia de pesticidas y fertilizantes.",
    euFoodSecurity: "Seguridad Alimentaria de la UE",
    euFoodSecurityDesc:
      "Apoyo a la independencia europea en importaciones agroquímicas.",
    euGreenDeal: "Pacto Verde Europeo",
    euGreenDealDesc:
      "Salud del suelo, eficiencia hídrica y secuestro de carbono.",
    euTitle: "Alineación con los objetivos de la UE",
    iotDesc:
      "Sensores de suelo de bajo consumo (humedad, temperatura, CE, CO₂) con almacenamiento en borde (Edge Gateway) para resiliencia offline en zonas rurales.",
    iotTitle: "Sensores IoT",
    livingLab: "Living Lab",
    location: "Assoro — Sicilia",
    locationDesc:
      "Bosque de alimentos sintrópico con esparto, olivo, algarrobo, parcela de cereal de prueba y hongos nativos. Un banco de pruebas real para la agricultura regenerativa en clima mediterráneo.",
    missionText1:
      "SikeliaSoil es una infraestructura de suelo de código abierto que fusiona sensores IoT locales con datos de observación de la Tierra de Copernicus para optimizar la salud del suelo y la gestión del agua en agroecosistemas mediterráneos.",
    missionText2:
      "Ayudamos a pequeñas y medianas explotaciones a traducir datos satelitales y de sensores en decisiones accionables —programación de riego, planificación de fertilización y alerta temprana de sequías— reduciendo insumos mientras mejoramos la fertilidad del suelo y el secuestro de carbono.",
    missionTitle: "Nuestra misión",
    openSourceDesc:
      "Todo nuestro código se publica bajo la Licencia Apache 2.0. Creemos que las herramientas para la agricultura regenerativa deben ser accesibles para todos, desde pequeños agricultores hasta cooperativas.",
    openSourceTitle: "Código abierto, para siempre",
    shiDesc:
      "Índice de Salud del Suelo (SHI), Índice de Estrés Hídrico (DSI) y estimaciones de secuestro de carbono alimentando un motor de recomendaciones.",
    shiTitle: "Índices de Salud del Suelo",
    subtitle:
      "Infraestructura de suelo agnóstica al cultivo para la agricultura regenerativa",
    teamCarmenDesc:
      "Desarrolladora Full-stack con más de 6 años en arquitectura de software, IoT y open-source. Practicante de permacultura sintrópica con más de 20 años de experiencia en gestión de proyectos y artes escénicas.",
    teamCarmenRole: "Fundadora y Desarrolladora Principal",
    teamDomenicoDesc:
      "Más de 20 años de experiencia en gestión de viveros, paisajismo y agricultura regenerativa. Experto en muestreo de suelos y monitorización de cultivos.",
    teamDomenicoRole: "Agrónomo Técnico",
    teamTitle: "Equipo",
    title: "Sobre SikeliaSoil",
    validateTitle: "Dónde validamos",
    whatWeDoTitle: "Qué hacemos",
  },

  // Authentication quotes (Login & Register screens)
  auth: {
    quotes: {
      login: {
        author: "Ernst Götsch",
        text: "En la permacultura sintrópica no plantamos árboles, plantamos agua, vida y abundancia.",
      },
      register: {
        author: "Proverbio Chino",
        text: "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.",
      },
    },
  },

  // Crops and ground cover detailed pages
  cropsPage: {
    // Multi-crop analysis and comparison
    analysis: {
      cycleDesc:
        "Todos los cultivos comparten la misma red subterránea de micorrizas. El esparto y el cereal alimentan el micelio con su biomasa. Los árboles aportan hojarasca y sombra. Las hortalizas cierran el ciclo vía compost. El barbecho permite que la red fúngica se recupere y expanda antes del siguiente ciclo de siembra.",
      cycleTitle: "Ciclo regenerativo del sistema",
      desc: "Misma metodología (SHI, colonización micorrícica, glomalina) aplicada a todos los componentes del sistema. Evidencia del enfoque crop-agnostic soil infrastructure.",
      interpretationList: [
        "El esparto muestra el SHI más alto por su sistema radical profundo y su larga simbiosis con hongos.",
        "Los árboles mantienen valores altos por su micorrización estable y aporte de hojarasca.",
        "Las hortalizas tienen SHI medio, pero cierran el ciclo vía compost.",
        "El cereal tiene menor colonización por el ciclo corto, pero es clave como cultivo de cobertura y rotación.",
        "El barbecho está en recuperación: se espera que suba tras el período de reposo.",
      ],
      interpretationTitle: "Interpretación",
      series: {
        colonisation: "Colonización AMF (%)",
        glomalin: "Glomalina (mg/g × 10)",
        shi: "SHI (0-100)",
      },
      title: "Comparador de cultivos y coberturas",
    },
    badge: "Regeneración del suelo",

    // Cereal crop specifics
    cereal: {
      chart1Title: "Evolución NDVI y humedad",
      chart2Title: "Comparación interna: Cereal vs Esparto",
      plotRole: "Cultivo de prueba y rotación",
      recs: [
        "💧 Riego programado en 3 días (humedad 58%, por debajo del óptimo).",
        "✓ NDVI en curva ascendente: crecimiento normal para la semana 6.",
        "🍄 Colonización micorrícica al 30%. Aplicar inóculo tras la cosecha.",
        "🌾 Tras la cosecha, sembrar cubierta de trébol o veza para mantener la red micorrícica activa.",
      ],
      recsTitle: "Recomendaciones activas",
    },

    // Cover crops and fallow land specifics
    coverFallow: {
      comparatorTitle: "Comparador de cubiertas",
      coverTitle: "Cubiertas vegetales entre árboles",
      fallowTitle: "Barbecho",
      recs: [
        "🌼 Mostaza: terminando. Incorporar como abono verde en 5 días.",
        "🍀 Trébol: cobertura al 82%. Excelente para fijación de N.",
        "🪨 Barbecho: humedad recuperándose (45%). Sin intervención por 3 semanas.",
        "📅 Próxima siembra de cereal de primavera: mediados de marzo.",
      ],
      recsTitle: "Recomendaciones activas",
      rotationLabel: "Estado del ciclo",
      rotationTitle: "Rotación planificada",
      series: {
        biomass: "Biomasa (t/ha)",
        cover: "Cobertura (%)",
        nitrogen: "N fijado (kg/ha)",
      },
      tableHeaders: [
        "Especie",
        "Cobertura",
        "Biomasa",
        "N fijado",
        "Temporada",
        "Estado",
      ],
    },

    description:
      "Esparto · Policultivo · Cereal · Cubiertas · Barbecho — gestión regenerativa en clima mediterráneo",

    // Esparto crop specifics
    esparto: {
      awardsBadges: ["🏆 Denominación de origen", "🌿 Producto ecológico"],
      awardsDesc:
        "El esparto siciliano es reconocido como patrimonio cultural inmaterial por la UNESCO.",
      awardsTitle: "Reconocimientos",
      avgLabel: "media",
      benefitsTitle: "Beneficios",
      chartNote:
        "Series temporales de humedad, temperatura, luz y viento. La red micorrícica mantiene la actividad biológica incluso cuando bajan las condiciones ambientales.",
      chartTitle: "Evolución de condiciones (últimos 14 días)",
      cycleSubtitle:
        "De la biomasa al bioindicador, pasando por la red micorrícica",
      cycleTitle: "Ciclo regenerativo del esparto",
      heroDesc:
        "El esparto es una planta milenaria que ha moldeado la cultura siciliana. Su fibra, resistente y versátil, representa un modelo de agricultura regenerativa y sostenible.",
      heroSubtitle: "Símbolo de resistencia",
      heroTitle: "🌾 El Tesoro Fibroso del Mediterráneo",
      historyTitle: "Historia y tradición",
      monitoringTitle: "📊 Monitoreo del esparto",
      tags: [
        "Sostenible",
        "Bajo consumo hídrico",
        "Tradición siciliana",
        "Economía circular",
      ],
      usesTitle: "Usos tradicionales y modernos",
    },

    // Polyculture (trees + veggies) specifics
    polyculture: {
      balanceTitle: "Balance hídrico y residuos por cultivo",
      balanceWeekly:
        "Balance semanal: 6.5 kg de restos → 4 kg de compost maduro → 16 kg/mes aplicados al suelo. Cierra el ciclo sin insumos externos.",
      comparatorTitle: "Comparador de condiciones por árbol",
      compostTitle: "Ciclo cerrado: hortalizas → compost → suelo",
      tableHeaders: ["Cultivo", "Área", "Cosecha", "Desecho", "Agua"],
      treesCount: "{count} parcelas",
      treesTitle: "Árboles frutales",
      vegArea: "30 m²",
      vegTitle: "Hortalizas para consumo propio",
    },

    tabs: {
      analysis: "Análisis",
      cereal: "Cereal",
      coverFallow: "Cubiertas y barbecho",
      esparto: "Esparto",
      polyculture: "Policultivo",
    },
    title: "Cultivos",
  },

  // Home page global sections (dashboard/private)
  home: {
    carbon: {
      description:
        "Medición del carbono orgánico secuestrado en el suelo por la actividad biológica.",
    },
    cropsCta: {
      description:
        "Explora los cultivos y coberturas configurados en tu instalación. Análisis agronómico y comparador.",
      title: "Cultivos y coberturas",
    },
  },

  // Public Landing Page
  landing: {
    energyTag: "Energía",
    featuresSubtitle:
      "Un sistema modular, seguro y diseñado para funcionar en los entornos más exigentes.",
    featuresTitle: "Arquitectura para la autonomía",
    footerNote: "© 2026 SikeliaSoil. Construido con código abierto.",
    headline: "Infraestructura abierta para un suelo vivo.",
    intro:
      "SikeliaSoil es una infraestructura open source y offline-first para la monitorización ambiental. Diseñada para operar sin depender de la nube, conecta hardware local, datos satelitales y conocimiento del territorio para la regeneración de ecosistemas.",
    philosophyAuthor: "SikeliaSoil Core Team",
    philosophyDesc:
      "No solo reducimos nuestro impacto; creamos ecosistemas que se regeneran a sí mismos. SikeliaSoil es la infraestructura digital para este nuevo paradigma.",
    philosophyQuote:
      "La naturaleza es el sistema más complejo y eficiente que existe. Nuestro software solo intenta entenderla sin estorbar.",
    philosophyTitle: "Nuestra base agronómica",
    pillar1Desc:
      "Sensores locales y protocolos abiertos para una monitorización biológica continua, sin intermediarios ni dependencias corporativas.",
    pillar2Desc:
      "Optimización de recursos hídricos basada en datos locales y observación satelital. Decisiones autónomas incluso sin conexión.",
    pillar3Desc:
      "Cálculo y trazabilidad transparente de la captura de carbono. Datos soberanos que pertenecen a quien los genera.",
    waterTag: "Agua",
  },

  // Manifesto Page
  manifesto: {
    belief1Desc:
      "Diseñamos sistemas que ganan complejidad y abundancia con el tiempo, no sistemas que se agotan y se degradan.",
    belief1Title: "Sintropía sobre entropía",
    belief2Desc:
      "La red micelial nos muestra cómo conectar, compartir y regenerar. Escuchamos lo que los hongos nos enseñan sobre la colaboración.",
    belief2Title: "Los hongos como maestros",
    belief3Desc:
      "La sabiduría de los cosechadores de esparto, los ritmos de las estaciones sicilianas, el conocimiento transmitido durante generaciones.",
    belief3Title: "La tradición como tecnología",
    belief4Desc:
      "Código limpio, arquitectura honesta, colaboración abierta. La tecnología debe ser comprensible, modificable y construida para durar.",
    belief4Title: "Código como artesanía",
    beliefsTitle: "Lo que creemos",
    commitmentList: [
      "El código será siempre open source (Apache License 2.0).",
      "Cada línea de código estará documentada y será legible.",
      "Priorizaremos la salud del suelo sobre el beneficio a corto plazo.",
      "Honraremos la tradición siciliana mientras construimos para el futuro.",
      "Compartiremos lo que aprendemos, libre y abiertamente.",
    ],
    commitmentTitle: "Nuestro Compromiso",
    futureDesc:
      "SikeliaSoil es el primer paso. Si el proyecto crece, nacerá La Isola Latente & Sikelia Lab: un proyecto cultural y agronómico que englobará residencias artísticas, formación en permacultura y producción regenerativa.",
    futureTitle: "Futuro: La Isola Latente",
    heroSubtitle: "Por qué existe SikeliaSoil y hacia dónde va",
    heroTitle: "Nuestro Manifiesto",
    infraDataDesc:
      "Los datos de tu suelo, tus cosechas y tu agua no deberían ser vendidos al mejor postor. Construimos herramientas para que las comunidades gestionen sus propios datos.",
    infraDataTitle: "Datos Soberanos",
    infraOfflineDesc:
      "La dependencia de la nube crea vulnerabilidad. SikeliaSoil está diseñado para funcionar de forma local y autónoma, sincronizándose solo cuando el usuario lo decide.",
    infraOfflineTitle: "Offline-First",
    infraOpenSourceDesc:
      "Creemos en el código abierto como herramienta de liberación. Todo nuestro código es auditable, modificable y compartible. No hay cajas negras.",
    infraOpenSourceTitle: "Open Source",
    infraTitle: "Infraestructura Soberana",
    introText1:
      "Durante demasiado tiempo, la tecnología ha estado desconectada de la tierra. Existen sensores, pero están diseñados para la agricultura industrial. Los datos fluyen, pero no hablan el lenguaje de la permacultura. Las herramientas se construyen para la escala, no para el sentido.",
    introText2:
      "SikeliaSoil existe para cambiar eso. No es solo un huerto. Es un ecosistema que se diseña a sí mismo con la ayuda de los hongos y la tecnología.",
    introTitle: "Por qué existe SikeliaSoil",
    quoteAuthor: "Carmen María Buendía Sánchez, creadora de SikeliaSoil",
    quoteText:
      '"SikeliaSoil no es solo un proyecto. Es una propuesta de que el futuro de la tecnología no está en más complejidad, sino en más conexión."',
  },

  // Soil Health Page global strings
  soilHealth: {
    badge: "Red micorrícica",
    description:
      "Redes AMF y ECM, glomalina, biorremediación y bioindicadores del ecosistema.",
    title: "Salud Biológica del Suelo",
  },

  // Soil Health page tabs content
  soilHealthTabs: {
    bioindicators: {
      descTitle: "Descripción",
      description:
        "Pico en otoño. El micelio trabaja todo el año. Las setas son la señal de que la red fúngica está activa, no el objetivo principal.",
      endemic: "Endemismo:",
      endemicFalse: "Cosmopolita",
      endemicTrue: "Endémica de Sikelia🌍",
      habitat: "Hábitat:",
      idealCO2: "CO₂ ideal",
      idealHumidity: "Humedad ideal",
      idealTemp: "Temperatura ideal",
      optimalTitle: "Condiciones de fructificación",
      roleBio: "🔬 Bioindicador",
      roleBoth: "🔬 + 🍽 Ambos",
      roleCult: "🍽 Subproducto",
      season: "Temporada:",
      title: "Bioindicadores estacionales",
      trackingNote:
        "Estas condiciones reflejan la ventana de fructificación (principalmente otoño). El micelio, sin embargo, permanece activo todo el año bajo tierra.",
      trackingTitle: "Seguimiento de condiciones · {name}",
      typeAMF: "AMF · Arbuscular",
      typeECM: "ECM · Ectomicorrícica",
      typeNone: "Saprófita",
    },
    networks: {
      amfHosts: "AMF · {count} hosts",
      description:
        "El micelio trabaja todo el año conectando raíces. Las setas son su bioindicador estacional.",
      ecmHosts: "ECM · {count} hosts",
      hostsCount:
        "{count} hosts monitorizados. La mayoría forman micorrizas arbusculares (AMF). Los pinos forman ectomicorrizas (ECM).",
      title: "Redes activas del sistema",
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
        "El pH, la biomasa fúngica y la colonización micorrícica son los motores de la biorremediación",
      chart4Note:
        "La biomasa fúngica sube de 18 a 38 µg/g, la glomalina de 0.8 a 1.7 mg/g y la colonización AMF del 15 al 38%. El pH se acerca a neutro, lo que reduce la movilidad de metales pesados.",
      chart4Title: "4. Salud del suelo en la zona contaminada",
      expectedCompletion: "Meta",
      fungiDesc:
        "Los hongos saprófitos y micorrícicos acumulan metales pesados en su biomasa y degradan hidrocarburos por vías enzimáticas.",
      fungiTitle: "Hongos biorremediadores",
      hydrocarbons: "Hidrocarburos",
      lead: "Plomo (Pb)",
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
    },
    summary: {
      avgColonisation: "Colonización AMF media",
      description:
        "El micelio trabaja todo el año conectando raíces. Las setas son su bioindicador estacional.",
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
      title: "La red invisible que regenera el suelo",
    },
  },
} as const;
