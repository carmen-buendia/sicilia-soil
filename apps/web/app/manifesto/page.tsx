"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sprout,
  Leaf,
  Globe,
  Heart,
  Github,
} from "lucide-react";
import { SicilianFlag } from "@/components/layout/SicilianFlag";

export default function ManifestoPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/"
            className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-oliveGreen" />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                <Sprout className="w-8 h-8 text-oliveGreen" />
              </div>
              Manifesto
            </h1>
            <p className="text-oliveGreen/70">
              Por qué existe Sicilia Soil y hacia dónde va
            </p>
          </div>
        </div>

        {/* Por qué existe */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            Por qué existe Sicilia Soil
          </h2>
          <p className="text-charcoalGray/80 leading-relaxed mb-4">
            Durante demasiado tiempo, la tecnología ha estado desconectada de la
            tierra. Existen sensores, pero están diseñados para la agricultura
            industrial. Los datos fluyen, pero no hablan el lenguaje de la
            permacultura. Las herramientas se construyen para la escala, no para
            el sentido.
          </p>
          <p className="text-charcoalGray/80 leading-relaxed mb-4">
            <strong>Sicilia Soil existe para cambiar eso.</strong>
          </p>
          <p className="text-charcoalGray/80 leading-relaxed">
            No es solo un huerto. Es un ecosistema que se diseña a sí mismo con
            la ayuda de los hongos y la tecnología. Un lugar donde la
            observación satelital y los sensores bajo tierra trabajan juntos
            para regenerar el suelo y devolver la vida a un territorio que ha
            sido explotado durante generaciones.
          </p>
        </section>

        {/* Lo que creemos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6">
            Lo que creemos
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-oliveGreen/10 rounded-lg flex-shrink-0">
                <Sprout className="w-5 h-5 text-oliveGreen" />
              </div>
              <div>
                <h3 className="font-bold text-charcoalGray mb-1">
                  Sintropía sobre entropía
                </h3>
                <p className="text-oliveGreen/70 text-sm leading-relaxed">
                  Diseñamos sistemas que ganan complejidad y abundancia con el
                  tiempo, no sistemas que se agotan y se degradan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-oliveGreen/10 rounded-lg flex-shrink-0">
                <Leaf className="w-5 h-5 text-oliveGreen" />
              </div>
              <div>
                <h3 className="font-bold text-charcoalGray mb-1">
                  Los hongos como maestros
                </h3>
                <p className="text-oliveGreen/70 text-sm leading-relaxed">
                  La red micelial nos muestra cómo conectar, compartir y
                  regenerar. Escuchamos lo que los hongos nos enseñan sobre la
                  colaboración y la circularidad.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-oliveGreen/10 rounded-lg flex-shrink-0">
                <Globe className="w-5 h-5 text-oliveGreen" />
              </div>
              <div>
                <h3 className="font-bold text-charcoalGray mb-1">
                  La tradición como tecnología
                </h3>
                <p className="text-oliveGreen/70 text-sm leading-relaxed">
                  La sabiduría de los cosechadores de esparto, los ritmos de las
                  estaciones sicilianas, el conocimiento transmitido durante
                  generaciones — esto no es folclore. Es tecnología refinada
                  durante siglos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-oliveGreen/10 rounded-lg flex-shrink-0">
                <Heart className="w-5 h-5 text-oliveGreen" />
              </div>
              <div>
                <h3 className="font-bold text-charcoalGray mb-1">
                  Código como artesanía
                </h3>
                <p className="text-oliveGreen/70 text-sm leading-relaxed">
                  Código limpio, arquitectura honesta, colaboración abierta. La
                  tecnología debe ser comprensible, modificable y construida
                  para durar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* El ciclo */}
        <section className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 md:p-8 mb-12 border border-oliveGreen/20">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            El ciclo regenerativo
          </h2>
          <p className="text-charcoalGray/80 leading-relaxed mb-6">
            Nuestra base medible es un ciclo que combina dos elementos que han
            coexistido en el Mediterráneo durante milenios:
          </p>
          <div className="bg-white/60 rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <div className="flex-1">
                <p className="text-3xl mb-2">🌾</p>
                <p className="font-bold text-charcoalGray">Esparto</p>
                <p className="text-xs text-oliveGreen/60">Stipa tenacissima</p>
              </div>
              <ArrowRight className="w-5 h-5 text-oliveGreen/40 hidden md:block" />
              <div className="flex-1">
                <p className="text-3xl mb-2">🍄</p>
                <p className="font-bold text-charcoalGray">Micelio</p>
                <p className="text-xs text-oliveGreen/60">
                  Hongos nativos sicilianos
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-oliveGreen/40 hidden md:block" />
              <div className="flex-1">
                <p className="text-3xl mb-2">🌍</p>
                <p className="font-bold text-charcoalGray">Humus</p>
                <p className="text-xs text-oliveGreen/60">
                  Suelo vivo y fértil
                </p>
              </div>
            </div>
          </div>
          <p className="text-charcoalGray/80 leading-relaxed">
            El esparto alimenta al micelio con su biomasa. El micelio fortalece
            al esparto con agua y nutrientes. Juntos regeneran el suelo,
            aumentan el carbono orgánico y devuelven la biodiversidad al
            territorio. <strong>Este ciclo es medible</strong>: cada paso se
            monitoriza con sensores IoT y datos satelitales de Copernicus.
          </p>
        </section>

        {/* Living lab */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            Donde nace todo
          </h2>
          <p className="text-charcoalGray/80 leading-relaxed mb-4">
            Sicilia Soil nace en el <strong>Geoparque Rocca di Cerere</strong>{" "}
            (Enna, Sicilia), en un antiguo territorio agrícola abandonado que
            estamos transformando en un <strong>living lab</strong> de
            regeneración: un food forest sintrópico con olivo, algarrobo,
            esparto, hongos nativos, cereal de prueba y cubiertas vegetales.
          </p>
          <p className="text-charcoalGray/80 leading-relaxed">
            La metodología se valida in-situ y se mide con la misma vara en
            todos los cultivos: esparto, árboles, hortalizas, cereal y
            cubiertas. Un enfoque <em>crop-agnostic</em> que se puede aplicar a
            cualquier agroecosistema mediterráneo.
          </p>
        </section>

        {/* Compromiso */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            Nuestro compromiso
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-charcoalGray/80">
                El código será siempre <strong>open source</strong> (Apache
                License 2.0).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-charcoalGray/80">
                Cada línea de código estará documentada y será legible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-charcoalGray/80">
                Priorizaremos la <strong>salud del suelo</strong> sobre el
                beneficio a corto plazo.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-charcoalGray/80">
                Honraremos la <strong>tradición siciliana</strong> mientras
                construimos para el futuro.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-charcoalGray/80">
                Compartiremos lo que aprendemos,{" "}
                <strong>libre y abiertamente</strong>.
              </span>
            </li>
          </ul>
        </section>

        {/* La Isola Latente */}
        <section className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 md:p-8 mb-12 border border-oliveGreen/15">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            Futuro: La Isola Latente
          </h2>
          <p className="text-charcoalGray/80 leading-relaxed mb-4">
            Sicilia Soil es el primer paso. A partir de aquí, si el proyecto
            crece, nacerá <strong>La Isola Latente</strong>: un proyecto más
            amplio, cultural y agronómico, que englobará:
          </p>
          <ul className="space-y-2 text-charcoalGray/80">
            <li className="flex items-start gap-2">
              <span className="text-oliveGreen">·</span>
              <span>Residencias artísticas y culturales en la finca.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-oliveGreen">·</span>
              <span>
                Formación agronómica en permacultura sintrópica y micología.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-oliveGreen">·</span>
              <span>
                Producción y venta de productos regenerativos (esparto, hongos,
                aceite, etc.).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-oliveGreen">·</span>
              <span>
                Plataforma tecnológica (Sicilia Soil) como motor de decisión.
              </span>
            </li>
          </ul>
        </section>

        {/* Cita final */}
        <section className="text-center py-12 border-t border-oliveGreen/15">
          <p className="text-xl md:text-2xl font-bold text-charcoalGray mb-4 italic">
            "Sicilia Soil no es solo un proyecto.
            <br />
            Es una propuesta."
          </p>
          <p className="text-charcoalGray/70 max-w-2xl mx-auto mb-8">
            Una propuesta de que el futuro de la tecnología no está en más
            complejidad, sino en más conexión. Con el suelo. Con el micelio. Con
            los ciclos que han sostenido la vida durante milenios.
          </p>
          <p className="text-oliveGreen italic mb-2">
            "De la tierra siciliana, para el mundo."
          </p>
          <p className="text-sm text-oliveGreen/60 flex items-center justify-center gap-2">
            <SicilianFlag size="small" />— Carmen Buendía, creadora de Sicilia
            Soil
          </p>
        </section>

        {/* Links finales */}
        <div className="flex flex-wrap gap-3 justify-center pt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-oliveGreen text-white rounded-lg hover:bg-oliveGreen/90 transition-colors text-sm font-medium"
          >
            Ver la versión técnica (About) →
          </Link>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-oliveGreen border border-oliveGreen/20 rounded-lg hover:bg-oliveGreen/5 transition-colors text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            Ver el código
          </a>
        </div>
      </div>
    </div>
  );
}
