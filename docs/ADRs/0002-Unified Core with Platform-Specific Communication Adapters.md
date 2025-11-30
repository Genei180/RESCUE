## Status
Accepted
## Context
The system needs a user interface that can operate across multiple platforms (mobile, desktop) while supporting different communication channels such as Bluetooth, MQTT, or other backend APIs.  
Multiple UI and Core Logic implementations would lead to duplicated code, inconsistent behavior, and increased development overhead.

Key constraints and requirements:

- A single UI core should provide all user-facing behavior and data handling logic.
- Communication with backend systems must happen through clearly defined APIs.
- These APIs must support general input handling and backend communication workflows.
- Platform-specific deployment environments require different communication mechanisms (e.g., Bluetooth on mobile, MQTT on PC).
- The architecture must minimize code duplication and reduce long-term maintenance effort.

## Decision
A **single shared core component** will be developed, encapsulating all UI, application logic and data handling.  
Platform-specific execution environments will integrate this core through wrapping with **adapters** that implement the required communication layer to core Logic Mapping.

The chosen design:

- The core interacts exclusively through a defined API boundary.
- Adapters implement API bindings for each platform, enabling the core to operate unchanged.
- Example adapters:
    - Mobile adapter using **Bluetooth** to communicate directly with the node.
    - Desktop/PC adapter using **MQTT** to communicate via the internet or LAN.
- This approach enables one codebase for UI logic while allowing flexible deployment across diverse runtime environments.

This decision was chosen because it reduces duplicated logic, centralizes behavior, and simplifies future platform extensions.

## Consequences

### Positive
- Significantly reduced code duplication across platforms.
- Easier maintenance: bug fixes and feature updates happen once in the shared UI core.
- Lower development overhead for new platforms; only the adapter layer requires implementation.
- Clear architectural separation between logic and communication mechanisms.
- Improved testability due to a consistent and isolated API boundary.

### Negative / Trade-offs
- Additional complexity in designing a robust and stable API abstraction layer.
- Adapters require effort and expertise for each supported communication technology.
- Incorrect API boundary design may require major refactoring later.
- UI might not be Implemented Natively on the Platform making it Slower.

### Future Implications
- New communication protocols or platforms can be supported by implementing new adapters.
- API stability becomes critical for long-term maintainability.

## Alternatives Considered

- **Alternative 1: Fully separate UI implementations per platform**  
    Rejected due to high code duplication, inconsistent behavior, and higher long-term effort (Unrealistic for an Open Source Project).
    
- **Alternative 2: Multiple small UIs communicating through a shared backend service**  
    Rejected because some environments (e.g., Bluetooth-only mobile deployment) require direct node communication without backend availability. Inside the Meshtastic Network there is no Reliance on a Connection to the Backend. Additionally the Bandwidth Consumed would be Way to high.

## References
- Architecture overview diagrams (to be added)
