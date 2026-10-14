# MycoMesh Protocol -- Open Internet Stack Alignment

## What MycoMesh Protocol is

A field-deployed decision-support system for regenerative agriculture
in Mediterranean environments.

## What we extracted for the Open Internet Stack

Under the surface of the application, we built and published three
reusable, domain-agnostic infrastructure packages:

### 1. @sicilia-soil/decision -- Explainable rule engine

A deterministic, auditable rule engine with offline learning.

- **Not AI** -- no neural networks, no black boxes, no gradient descent
- **Declarative rules** -- human-readable, versionable, inspectable
- **Adapter-based** -- any domain plugs in with a custom EvidenceAdapter
- **Conflict resolution** -- heterogeneous data sources vote and are weighted
- **Offline capable** -- runs entirely without cloud connectivity
- **Zero dependencies** -- pure TypeScript

Reusable for: environmental monitoring, disaster response, citizen
science, industrial IoT, any field where transparent decisions matter.

### 2. @sicilia-soil/sync -- Offline-first sync layer

An edge-to-cloud synchronization layer for constrained devices in
environments with intermittent connectivity.

- **MQTT 3.1.1 / 5.0** and **CoAP (RFC 7252)** transports
- **Ring buffer** with monotonic sequencing (flash / SD / memory)
- **Conflict-free ordering** via per-device sequence numbers
- **Works fully offline** -- syncs when connectivity returns
- **Zero dependencies** -- pure TypeScript

Reusable for: any edge-to-cloud deployment in rural or low-connectivity
contexts.

### 3. @sicilia-soil/edge -- Constrained device runtime

A runtime that runs local rules, polls sensors, and buffers events on
constrained devices.

- **Targets**: Raspberry Pi, ESP32, ESP8266, generic microcontrollers
- **Local rule execution** -- safety-critical decisions without round trip
- **Pluggable storage** -- SQLite, flash, in-memory
- **Pluggable GNSS** -- optional
- **Offline-first** -- never blocks on network

Reusable for: any sensor-driven application on constrained hardware.

## Alignment with Restack scope

| Restack area                 | Our contribution                                                                               |
| :--------------------------- | :--------------------------------------------------------------------------------------------- |
| Trust-enhancing technologies | Explainable decision engine with full auditability; every decision shows its rules and weights |
| Software supply chain        | Three independently versionable npm packages with clear boundaries                             |
| Infrastructure decoupling    | Self-hostable, no cloud lock-in, no proprietary protocols                                      |
| Deployability                | Pre-configured, modular components                                                             |
| Reproducibility              | Monorepo + CI + deterministic builds                                                           |
| Standards                    | MQTT, CoAP, STAC, COG, OGC, OpenAPI                                                            |

## Architecture

    +-------------------------------------------------+
    |              MycoMesh Protocol DDS (domain)          |
    |  +--------------+  +------------+  +---------+  |
    |  | @core/types  |  | @ui/react  |  | @db/    |  |
    |  | (agriculture)|  | (dashboards|  | drizzle |  |
    |  +--------------+  +------------+  +---------+  |
    +-------------------------------------------------+
                  | uses
                  v
    +-------------------------------------------------+
    |         Infrastructure (domain-agnostic)        |
    |  +--------------+  +------------+  +---------+  |
    |  | @decision    |  | @sync      |  | @edge   |  |
    |  | rules+learner|  | MQTT/CoAP  |  | runtime |  |
    |  +--------------+  +------------+  +---------+  |
    +-------------------------------------------------+

## What we explicitly do NOT do

- No machine learning of any kind
- No cloud-only dependencies
- No vendor lock-in
- No proprietary protocols
- No telemetry without user consent
- No data collection beyond what the user explicitly shares

## License

Apache 2.0. Everything open, everything forkable, everything self-hostable.

Copyright 2026 Carmen Maria Buendia Sanchez.
