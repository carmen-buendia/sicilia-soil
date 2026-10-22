# @isola-node/edge

A runtime for constrained edge devices in field deployments.

## What it does

- Runs local rules without cloud connectivity
- Polls sensors on a schedule
- Buffers events locally (flash, SD, SQLite)
- Syncs to cloud when connectivity is available (via @isola-node/sync)

## Targets

| Device       | Constraint            | Use case                           |
| :----------- | :-------------------- | :--------------------------------- |
| Raspberry Pi | ~1 GB RAM, Linux      | Field gateways, multi-sensor nodes |
| ESP32        | ~500 KB RAM, FreeRTOS | Single sensor, low-power           |
| ESP8266      | Very limited          | Legacy deployments                 |
| Generic      | Any                   | Custom hardware                    |

## Why this matters

Agricultural, environmental, and disaster-response deployments often
operate far from reliable infrastructure. A cloud-only architecture
fails when the network drops.

@edge provides a fully offline-capable runtime that:

- Executes safety-critical rules locally (no round trip)
- Buffers sensor data indefinitely when offline
- Syncs opportunistically when connectivity returns
- Uses lightweight protocols (MQTT, CoAP) for low-power radios

## Status

Types and interfaces only. Full implementation ships during the funded
period. This is the API surface that any implementation must satisfy.

## License

Apache 2.0 -- see LICENSE.

Copyright 2026 Carmen Maria Buendia Sanchez.
