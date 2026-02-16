# RESCUE
**R**eal-time **E**mergency **S**ituation **C**oordination **U**sing **E**lectronics

## Overview
The goal of this project is to design a system for real-time tracking of rescue forces during emergency situations where communication infrastructure may be compromised. This system should provide a live situation view and optional communication capabilities for squad and group leaders.

It should provide but not be Limited to the Following Use Cases:
- **Coordination of Rescue Forces**: The tool should facilitate the coordination of rescue efforts via a Situation Map, ensuring that all teams are working together efficiently.
- **Visualization of Searched Areas**: Visualize areas that have been searched to easily identify where personnel may be missing or where searches have not been conducted.
- **Operation Without External Infrastructure**: Enable all core functionality to operate without relying on external infrastructure, ensuring the system remains usable in remote, disrupted, or infrastructure-limited environments.

## Way Forward

The immediate objective is to establish a comprehensive architectural foundation. The arc42 documentation must be brought to a near-complete state, covering all relevant building blocks, constraints, and crosscutting concepts.

Once the architecture is stable, we should derive detailed test requirements directly from the documented design. Define clear acceptance criteria. Are these done we should Implement corresponding test suites to validate architectural assumptions, functional behavior, and non-functional requirements.

Only after these steps are completed should deeper implementation begin. I

## Documentation

The Documentation is found [here](./docs/arc42.md).
The structure adheres to the [arc42](docs.arc42.org) Template. Significant architectural decisions are recorded as [Architectural Decision Records (ADR)](https://adr.github.io/) to make them Referencable at a later date, ensure traceability and long-term maintainability.

## Contributing

Refer to [Contributing](./docs/CONTRIBUTING.md) for contribution guidelines, coding standards, branching strategy, and review procedures.

## Support

For issues, feature requests, or questions, open a GitHub issue in this repository.
