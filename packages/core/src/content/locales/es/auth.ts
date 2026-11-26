// packages/core/src/content/locales/es/auth.ts
export const auth = {
  quotes: {
    login: {
      author: "SikeliaSoil",
      text: "Tu suelo, tus datos. Mira qué ocurre bajo tus pies.",
    },
    register: {
      author: "SikeliaSoil",
      text: "Mide la vida de tu suelo. Cero nube, cero intermediarios.",
    },
  },
  carousel: {
    region: "Cómo te ayuda SikeliaSoil",
    goTo: "Ir a la diapositiva {n}",
    pause: "Pausar el carrusel",
    play: "Reanudar el carrusel",
    slides: [
      {
        art: "portada",
        alt: "Planta dentro de un rombo",
        text: "Tu suelo, tus datos. Mira qué ocurre bajo tus pies.",
        label: "SikeliaSoil",
      },
      {
        art: "bajo-tierra",
        alt: "Planta sobre la tierra y raíces con una interrogación",
        text: "Lo más importante de tu finca no se ve: está bajo tierra.",
        label: "El problema · 1/3",
      },
      {
        art: "riego-a-ojo",
        alt: "Regadera con gotas y una duda",
        text: "Regar a ojo gasta agua y dinero. Unas veces sobra y otras falta.",
        label: "El problema · 2/3",
      },
      {
        art: "suelo-cansado",
        alt: "Plantas cada vez más pequeñas sobre tierra agrietada",
        text: "Un suelo cansado da menos cosecha cada año, aunque trabajes igual.",
        label: "El problema · 3/3",
      },
      {
        art: "sensor",
        alt: "Sensor clavado en la tierra emitiendo señal",
        text: "Un sensor pequeño en la tierra te dice cuánta agua tiene. Sin cavar.",
        label: "La solución · 1/3",
      },
      {
        art: "satelite",
        alt: "Satélite enfocando una parcela",
        text: "Un satélite europeo mira tu campo desde arriba, gratis, cada pocos días.",
        label: "La solución · 2/3",
      },
      {
        art: "avisos",
        alt: "Móvil con un aviso de riego",
        text: "La app junta los datos y te avisa cuando hay algo importante que revisar.",
        label: "La solución · 3/3",
      },
      {
        art: "tus-datos",
        alt: "Casa protegida por un escudo",
        text: "Funciona sin cobertura y los datos son tuyos, no de una empresa.",
        label: "Tu finca, tus datos",
      },
    ],
  },
} as const;
