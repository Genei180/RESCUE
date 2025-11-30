> **_Warning!_**  This Content is Work in Progress. And nowhere near Complete yet.
> its just to give a glimpse at the current state of the Project.
> Currently this only Serves as Draft to Begin with.
> It was generated with AI for now and should therefore currently be not taken as given.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow devices to broadcast and receive concise location updates (latitude, longitude, timestamp, device ID, status) over the local mesh while offline.
- **FR-002**: The system MUST display a shared, interactive map showing peer positions and annotations (searched/cleared polygons, pins) that reflect received data.
- **FR-003**: The system MUST allow group leaders to create, edit, label, and timestamp area annotations and persist them locally for later synchronization.
- **FR-004**: The system MUST implement a peer-to-peer messaging capability for short tactical messages and acknowledgements between leaders.
- **FR-005**: The system MUST queue outgoing updates when peers are unreachable and retry delivery until acknowledged or until a configurable retry limit is reached.
- **FR-006**: The system MUST operate without internet connectivity and handle network partitions; on reconnection, it MUST synchronize state with peers using deterministic merge rules.
- **FR-007**: The system MUST provide a conflict-resolution policy for concurrent annotation edits and record an auditable history of conflicting operations.
 - **FR-007**: The system MUST provide a deterministic, documented conflict-resolution policy for concurrent annotation edits and record an auditable history of conflicting operations. The policy MUST prefer an explicit human confirmation from a Leader when available; otherwise it MUST resolve deterministically (e.g., timestamp + author tie-break) and surface any automatic resolution in the audit trail so users can review and, if needed, manually correct the record.
 - **FR-007**: The system MUST provide a deterministic, documented conflict-resolution policy for concurrent annotation edits and record an auditable history of conflicting operations. The policy MUST prefer an explicit human confirmation from a Leader when available; otherwise it MUST resolve deterministically (timestamp + author tie-break). All automatic resolutions MUST be recorded in the audit trail and surfaced in the UI for review.

Conflict-resolution mechanics (normative):

- Each edit MUST include: { operationID, entityID, editID (UUID), authorDeviceID, authorRole, lamportCounter, wallClockTimestamp, changeHash }.
- Merge algorithm:
  1. If an edit is explicitly confirmed by a Leader (Leader confirmation action), accept the Leader edit.
  2. Else if one conflicting edit is Leader-originated, prefer the Leader edit and record the preference in the audit trail.
  3. Else apply deterministic resolution: compare lamportCounter (higher wins). If equal, compare wallClockTimestamp (newer wins). If still equal, use lexicographic order of authorDeviceID as the final tie-break.
- Audit trail: create an EventLogEntry for each automatic resolution containing conflicting editIDs, chosen editID, reason (Leader-preference | lamport | timestamp | author tie-break), and a 'requires-review' flag when the resolved fields are operationally-sensitive (e.g., search/clear status).
- UI behaviour (suggested):
  - If a Leader is locally present and a conflict exists, surface an interactive 'Resolve conflict' dialog showing both versions side-by-side and buttons: "Apply my version", "Accept other", "Merge manually". Choosing an option creates a new authoritative edit entry.
  - If the system resolves automatically, show an unobtrusive notification with a link to the audit entry and an "Undo/Correct" action that creates a new authoritative edit when invoked.
  - For large geometry diffs, provide a summarized diff view and require explicit confirmation for the automatic choice if 'requires-review' was set.

Note: Do not delete conflicting edit history; always retain original edits in the EventLog for audit and post-incident review.
- **FR-008**: The system MUST provide a minimal, human-readable log of recent events (position changes, annotation changes, messages) for situational awareness and post-incident review.
- **FR-009**: The system MUST allow manual position pinning and correction when GPS is unavailable or inaccurate.
- **FR-010**: The system MUST include controls to limit update frequency and message size to respect low-bandwidth LoRa constraints.
- **FR-011**: The system MUST allow per-device roles (Leader, Member, Observer) with role-based UI behavior (e.g., only Leaders can mark areas as searched). The system will use a fixed minimal role set for initial deployments to reduce complexity and improve operational safety. The Command Post MAY issue signed, short-lived role tokens (minutes	6hours) mapping to these roles to change or delegate roles at runtime; role tokens are optional and time-limited.
 - **FR-011**: The system MUST allow per-device roles with the following initial minimal role set and permission mapping: Leader, Member, Observer.
   - Leader: can create/edit/delete annotations, mark areas as searched/cleared, send leader-only messages, export incident logs, and confirm conflict resolutions.
   - Member: can share position, send and receive tactical messages, pin manual positions, and view annotations; cannot mark areas as searched or export logs.
   - Observer: read-only view of positions and annotations; cannot send messages or modify annotations. 
   - Acceptance: Verify that actions restricted to Leaders are not available to Members/Observers and that Observers cannot modify map state.
  - **FR-011 (auth model clarified)**: Use a hybrid model: devices have pre-provisioned persistent device identities/credentials and the Command Post MAY issue signed, short-lived role tokens (minutes–hours) over the mesh to change or delegate roles at runtime. Default behavior uses the pre-provisioned identity and locally-enforced role flags. Role tokens are optional, signed, and short-lived to minimize risk.
- **FR-012**: The system MUST persist data locally with a configurable retention policy and provide a mechanism for exporting incident logs after connectivity is restored.
 - **FR-012**: The system MUST persist data locally with a configurable retention policy and provide a mechanism for exporting incident logs after connectivity is restored.
 - **FR-012 (archive-on-close default)**: On Operation close the system MUST archive the Operation dataset to long-term storage with configurable retention. Default retention per Operation is 90 days (other supported options: 30 days, 365 days). Default export formats MUST include CSV and GeoJSON. Exported logs MUST include timestamps, author IDs, operationID, and payload summaries sufficient for post-incident review. Long-term archival is the default behavior on Operation close unless the operator explicitly opts out during provisioning.

### Non-functional Requirements

- **NFR-001**: Position updates SHOULD be visible to peers within 10 seconds in a normal connected mesh topology (depending on radio range and mesh health).
- **NFR-002**: The system SHOULD minimize LoRa airtime usage by compacting messages and avoiding redundant broadcasts.
- **NFR-003**: The system SHOULD tolerate typical LoRa packet sizes and gracefully fragment and reassemble larger payloads when necessary.
- **NFR-004**: The system SHOULD operate for at least 8 hours on a typical field device battery under normal use.
- **NFR-005**: The system SHOULD prioritize safety-critical messages (SOS, 'in distress') and allow immediate local alarms.

---

# Needed Clarifications:
- Q: Role/permission granularity? -> A: Option A — Fixed minimal role set (Leader, Member, Observer).

- Q: Archive-on-close policy? → A: Option B — archive to long-term storage by default on Operation close (operator selected).

Applied archive decision:
- On Operation close, the system archives the Operation dataset to long-term storage using the configured retention policy. Default retention per Operation is 90 days (operators may choose 30 days or 365 days as alternatives). Operators may opt out during provisioning or override per-Operation; scenario-capture short windows remain available for immediate replay prior to archive.

- Q: Archive target preference? → A: Option A — local-only archive on Command Post (operator selected).

Applied archive-target decision:
- By default, when an Operation is closed the Command Post archives the Operation dataset to local attached storage (e.g., USB or SSD). Operators retrieve media later for off-site storage. Cloud upload remains a possible extension but is not required for initial deployments.

- Q: Should archived Operation datasets be encrypted at rest?  -> A: Option B  No automated archive encryption for now (deferred to Phase 1).

Applied archive-encryption decision:
- Operators selected to defer automated archive encryption for Phase 0 deployments to keep on-scene recovery and media access simple. The recommendation for Command Post operators is to use host-level or full-disk encryption on attached storage (LUKS, BitLocker, or equivalent) and follow the runbook for manual encryption and secure transfer of archived media. The project will review and implement optional automated archive encryption (operator-supplied passphrase or key management integration) during Phase 1 if required by deployments.

 - Q: Evidence-grade export default behavior? -> A: Option A — Evidence-grade exports ON by default; recording can be disabled (opt-out).

Applied evidence-grade export decision:
- Evidence-grade recording and export will be enabled by default for closed Operations to ensure a complete incident record is captured automatically. Operators may disable evidence-grade recording during provisioning or per-Operation (opt-out) when operational constraints or legal/regulatory reasons require reduced capture. The runbook will include explicit steps to disable evidence recording and guidance on chain-of-custody for evidence-grade datasets.
