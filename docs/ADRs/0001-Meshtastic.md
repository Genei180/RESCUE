# ADR 0001: Meshtastic
## Status

Accepted

## Context

The project requires a reliable, low-power, long-range, and decentralized tracking system for volunteer rescue forces. Key constraints and requirements include:
Functionality in areas without cellular or Wi-Fi coverage.
Low-cost and easy-to-deploy hardware for field teams.
Open-source and actively maintained software stack to ensure long-term sustainability.
Compatibility with mobile devices for monitoring and messaging.

## Decision

We have chosen Meshtastic as the tracking system for the project. Meshtastic provides:
- LoRa-based mesh networking, enabling devices to communicate over several kilometers without internet.
- Open-source firmware and mobile apps, ensuring full transparency and modifiability.
- Low-cost hardware options, making it feasible for volunteer organizations.
- Active community support, allowing integration and troubleshooting guidance.

This decision was made after evaluating alternatives for long-range, offline-capable tracking. Meshtastic aligns with the project’s goals of low-cost, open-source, and decentralized operation.

## Consequences

### Positive outcomes:

Rapid deployment for volunteer rescue teams without relying on cellular infrastructure.
Long-term maintainability due to open-source nature.
Ability to extend or customize the network for project-specific needs.

### Negative side effects / trade-offs:

Limited bandwidth may restrict high-frequency location updates or large data transfers.
Requires volunteers to carry additional hardware devices.
Integration with other systems may require custom development.

### Implications for future decisions:

Future enhancements may involve firmware customization or additional hardware support.
Monitoring and data aggregation strategies will need to account for LoRa network limitations.

## Alternatives Considered

Commercial GPS trackers (e.g., Garmin inReach) — High cost per device and dependency on proprietary services; not chosen to maintain low-cost, open-source approach.

Cellular-based solutions — Limited coverage in remote areas; subscription fees increase operational costs.

Other LoRa mesh solutions (custom hardware) — Requires extensive development and maintenance; slower deployment.

## References
[Meshtastic Official Website](https://meshtastic.org/)
[Meshtastic GitHub Repository](https://github.com/meshtastic/firmware)