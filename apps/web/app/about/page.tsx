"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Sprout,
  Satellite,
  Cpu,
  Leaf,
  Globe,
  Github,
  Mail,
  Target,
  Lightbulb,
  Users,
  BookOpen,
} from "lucide-react";
import { SicilianFlag } from "@/components/layout/SicilianFlag";

export default function AboutPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-4xl mx-auto">
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
              About Sicilia Soil
            </h1>
            <p className="text-oliveGreen/70">
              Crop-agnostic decision support for regenerative agriculture
            </p>
          </div>
        </div>

        {/* Mission */}
        <section className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 md:p-8 mb-10 border border-oliveGreen/20">
          <h2 className="text-2xl font-bold text-charcoalGray mb-3">
            Our mission
          </h2>
          <p className="text-charcoalGray/80 leading-relaxed mb-3">
            Sicilia Soil is an{" "}
            <strong>open-source, crop-agnostic platform</strong> that fuses
            in-situ IoT soil sensors with Copernicus Earth Observation data to
            optimise <strong>soil health</strong> and{" "}
            <strong>water management</strong> in Mediterranean and continental
            agroecosystems.
          </p>
          <p className="text-charcoalGray/80 leading-relaxed">
            We help small and medium-sized farms translate satellite and sensor
            data into actionable decisions — irrigation scheduling,
            fertilisation planning, and drought early warning — reducing inputs
            while improving soil fertility and carbon sequestration.
          </p>
        </section>

        {/* What we do */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            What we do
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <Satellite className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-bold text-charcoalGray mb-2">
                Earth Observation
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Sentinel-1 (SAR), Sentinel-2 (NDVI), and Sentinel-3 (LST) data
                for vegetation, soil moisture, and drought stress monitoring.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <Cpu className="w-6 h-6 text-purple-600 mb-3" />
              <h3 className="font-bold text-charcoalGray mb-2">IoT Sensors</h3>
              <p className="text-sm text-oliveGreen/70">
                Low-power soil sensors (moisture, temperature, EC, CO₂) with
                Edge Gateway buffering for offline resilience in rural areas.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <Leaf className="w-6 h-6 text-emerald-600 mb-3" />
              <h3 className="font-bold text-charcoalGray mb-2">
                Soil Health Indices
              </h3>
              <p className="text-sm text-oliveGreen/70">
                SHI (Soil Health Index), DSI (Drought Stress Index), and Carbon
                Sequestration estimates feeding an actionable recommendation
                engine.
              </p>
            </div>
          </div>
        </section>

        {/* Where we validate */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            Where we validate
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <p className="text-xs text-oliveGreen/60 uppercase tracking-wider mb-1">
                Living lab
              </p>
              <h3 className="font-bold text-charcoalGray mb-2">
                Sicily — Assoro
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Syntropic food forest with esparto, olive, carob, and native
                mushrooms. Real-world testbed for regenerative agriculture.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <p className="text-xs text-oliveGreen/60 uppercase tracking-wider mb-1">
                Primary demo site
              </p>
              <h3 className="font-bold text-charcoalGray mb-2">
                Serbia — Vojvodina
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Cereal-based system (maize, wheat) on chernozem soils. Official
                validation through NOSTRADAMUS (BioSense / CROPT).
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <p className="text-xs text-oliveGreen/60 uppercase tracking-wider mb-1">
                Secondary context
              </p>
              <h3 className="font-bold text-charcoalGray mb-2">
                Slovenia — Pomurje
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Digital validation using Data Cube and EO layers only. Smaller,
                fragmented farms in continental climate.
              </p>
            </div>
          </div>
        </section>

        {/* Alignment with EU */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            Alignment with EU objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <Target className="w-5 h-5 text-oliveGreen mb-2" />
              <h3 className="font-bold text-charcoalGray mb-1">
                European Green Deal
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Soil health, water efficiency, and carbon sequestration.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <Globe className="w-5 h-5 text-oliveGreen mb-2" />
              <h3 className="font-bold text-charcoalGray mb-1">
                Farm to Fork Strategy
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Reducing pesticide and fertiliser dependency.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <Lightbulb className="w-5 h-5 text-oliveGreen mb-2" />
              <h3 className="font-bold text-charcoalGray mb-1">
                EU Food Security
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Supporting European independence in agrochemical imports.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-oliveGreen/15 shadow-sm">
              <Satellite className="w-5 h-5 text-oliveGreen mb-2" />
              <h3 className="font-bold text-charcoalGray mb-1">
                NOSTRADAMUS (Horizon Europe)
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Integrated with Data Cubes, IoT Observatory, and Application
                Generation Engine.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-oliveGreen" />
            Team
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 border border-oliveGreen/15 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-full flex items-center justify-center text-white font-bold text-lg">
                  C
                </div>
                <div>
                  <h3 className="font-bold text-charcoalGray">
                    Carmen María Buendía Sánchez
                  </h3>
                  <p className="text-xs text-oliveGreen/60">
                    Founder & Lead Developer
                  </p>
                </div>
              </div>
              <p className="text-sm text-oliveGreen/70">
                Full-stack developer with 6+ years in software architecture,
                IoT, and open-source. Practitioner of syntropic permaculture.
                20+ years of project management and performing arts background.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-oliveGreen/15 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-charcoalGray">Domenico Calí</h3>
                  <p className="text-xs text-oliveGreen/60">
                    Technical Agronomist
                  </p>
                </div>
              </div>
              <p className="text-sm text-oliveGreen/70">
                20+ years of experience in nursery management, landscaping, and
                regenerative agriculture. Expert in soil sampling and crop
                monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* Open source */}
        <section className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 md:p-8 mb-10 border border-oliveGreen/15">
          <h2 className="text-2xl font-bold text-charcoalGray mb-3">
            Open source, forever
          </h2>
          <p className="text-charcoalGray/80 leading-relaxed mb-4">
            All our code is released under the{" "}
            <strong>Apache License 2.0</strong>. We believe that the tools for
            regenerative agriculture should be accessible to everyone — from
            smallholders to cooperatives.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/carmen-buendia/sicilia-soil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-oliveGreen text-white rounded-lg hover:bg-oliveGreen/90 transition-colors text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            <a
              href="mailto:carmenbuendiafullstack@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-oliveGreen border border-oliveGreen/20 rounded-lg hover:bg-oliveGreen/5 transition-colors text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-oliveGreen border border-oliveGreen/20 rounded-lg hover:bg-oliveGreen/5 transition-colors text-sm font-medium"
            >
              <BookOpen className="w-4 h-4" />
              Read the Manifesto
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
