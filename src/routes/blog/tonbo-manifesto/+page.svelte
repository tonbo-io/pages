<script>
	import Markdown from '$lib/components/Markdown.svelte';

	const content = `
# Tonbo Manifesto

### —— Agent workloads change the shape of data systems

Most web applications share the same execution model: a user clicks a button, the browser sends a request, a service runs deterministic logic, a database updates a few rows, and the request completes. If a program can handle this process in parallel, you get most of the web of the last twenty years.

That model came with stable assumptions about workload shape. Requests are bounded. Costs are roughly comparable. Overall load tracks how many humans are clicking at any given moment.

Agent workloads break those assumptions.

Consider a coding agent operating in a large codebase, prompted with a single instruction:

> "Extract the embedded user system into its own service and refactor the callers."

From the outside, this looks like one request. In practice, it expands into hundreds of steps. The agent has to understand the existing design, construct a plan, traverse call graphs, make edits, run tests, handle failures, revise the plan, and continue. It may explore multiple approaches in parallel before committing to one.

The cost of a single instruction becomes heavy-tailed. Most runs are cheap. A few explode into large amounts of compute, tool calls, and wall time. Those few dominate system load, often abruptly.

Traditional infrastructure is not designed for that shape.

## Why serverless fits agent workloads

Agent runs do not resemble steady web traffic. They arrive in bursts, fan out quickly, and spend much of their time waiting: on model responses, rate limits, external APIs, CI jobs, or long-running tools.

In request-centric systems, long-lived services are a sensible default. When request cost is predictable, capacity planning mostly tracks request rate.

Agent workloads shift the problem. The critical question is no longer "how many requests per second," but "how many runs just expanded into hundreds of steps."

Serverless infrastructure is well matched to this pattern. It scales rapidly, tolerates blocking on I/O without holding warm processes, retries failed steps, and scales back down when bursts subside.

The match is mutual. Agent runs naturally decompose into bounded, retryable steps. Serverless platforms are designed to execute exactly that kind of work.

Once compute becomes ephemeral, a practical question becomes unavoidable:

**If workers do not persist, where does execution progress live between steps?**

## Run state lives between steps

Agent execution unfolds over time. Between steps, the system must retain state: where the run is, what it intends to do next, and the context that makes the next step meaningful.

In traditional request-shaped systems, this state is implicit. It lives on the stack or in process memory and disappears when the request completes. That works because the unit of work is short and bounded.

Agent runs do not have that shape. They pause, retry, branch, and resume elsewhere. The state that matters cannot remain implicit, and it cannot be reliably reconstructed after the fact.

This is where observability's role changes.

## Observability moves into the control loop

In conventional systems, observability is post-hoc. Logs, metrics, and traces explain what happened after execution completes. Operators investigate failures, correlate signals, and deploy fixes. Even automated remediation typically operates at the control plane, not inside request execution.

Agent runs move decision-making into the workload itself.

Execution adapts as it proceeds. Plans are revised. Branches are explored. Retries are evaluated. Cost accumulates throughout. As a result, critical operational decisions must be made *during* execution:

- Is the current plan still valid given new evidence?
- Is retrying justified, or is a different tool required?
- Should execution pause for review?
- Which branch should continue, and which should be abandoned?
- If assumptions fail, where is the last safe point to resume from?

These are not postmortem questions. They are control-flow decisions.

Observability therefore becomes part of the execution loop. Its role is no longer only to describe outcomes, but to inform what happens next.

## Why observability alone is insufficient

Classic observability records events as: tool calls, model latency, failures, retries, and resource usage. It is indispensable for system health and debugging.

However, telemetry is optimized for description, not continuation.

"In-the-loop" control depends on intent and context:

- what the run plans to do next,
- what assumptions and evidence support that plan,
- what tools were invoked and what they returned,
- what artifacts were produced along the way.

Telemetry can hint at these, but it does not guarantee them. Signals may be delayed, sampled, reordered, or distributed across systems. Most importantly, telemetry does not define execution state. A stream of events is not a stable source of truth for steering adaptive work.

That limitation is acceptable when observability is post-hoc. It becomes a blocker when observability is expected to guide execution.

## Run state as a first-class data type

Agent systems already require run state for a simple reason: work unfolds in steps, and something must persist between them.

In observability terms, run state becomes a first-class data type alongside logs, metrics, and traces. It answers questions telemetry struggles with: where execution is now, and what it intends to do next.

Run state includes:

- execution position and planned next actions,
- carried context and assumptions,
- evidence and tool outputs,
- produced artifacts such as patches, diffs, or evaluation results.

Once this state is durable and addressable, two operations become fundamental.

## Diff and replay as normal execution tools

Agent runs revise plans and backtrack when assumptions fail. Progress depends on reasoning about past decisions, not just executing forward.

At each decision point, execution implicitly asks:

- What has changed since the last decision?
- Which earlier state remains valid?
- Is the next step still justified under the current context?

Answering these requires comparison and replay.

With versioned run state, comparison becomes a diff between decision points. Replay becomes re-execution from a known snapshot, rather than reconstruction from incomplete telemetry.

These are not exceptional operations. They are part of normal execution.

## Tonbo's design choices

Agent workloads are long-running, step-shaped, and non-linear. Observability must participate in execution, not merely explain it after the fact. That leads to a single unavoidable requirement:

**Durable, versioned run state that lives between steps.**

Tonbo is an attempt to make this practical.

### 1. Tonbo runs where compute runs

Agent execution does not live in a single warm process. A run may advance across services, functions, and edge runtimes over time.

Tonbo is designed to run as a library inside the environments that perform the work: long-running services, short-lived functions, and ephemeral runtimes. It avoids assuming a central, always-on coordinator.

### 2. Versioned run state

Agent runs revise rather than overwrite. Earlier decision points must remain addressable.

Tonbo treats run state as versioned. Advancing execution produces a new version rather than mutating state in place, allowing safe backtracking and inspection.

Explicit branching and merge semantics are not implemented yet, but versioning provides the foundation for them.

### 3. Remote storage as the anchor

If compute is ephemeral, durable state must live elsewhere.

Tonbo assumes shared remote storage (often object storage such as S3, GCS, or R2) as the anchor. The principle is simple: progress must live somewhere every runtime can reach.

### 4. Immutable segments and snapshots

Versioned state is stored as:

- immutable, append-only segments,
- explicit snapshot manifests describing consistent views.

Advancing execution publishes a new manifest referencing prior segments plus new ones. This enables time travel, stable reads, and direct comparison between versions.

### 5. Explicit version advancement

Concurrency is handled through visible state transitions. Each advancement references a specific prior snapshot. Conflicts are detectable when multiple workers race, and resolution is handled through retries or application-level logic.

### 6. An online analytics substrate

Tonbo functions as an online analytics database for agent systems: fast writes, real-time reads, and inspectable execution context.

It complements existing systems rather than replacing them:

- OLTP databases remain systems of record,
- warehouses remain offline analytics engines.

Tonbo anchors execution context so other tools (tracing systems, review interfaces, evaluation pipelines) can reference it directly.

### 7. Open formats for inspection

Run state and artifacts are stored in open formats. Columnar formats such as Arrow and Parquet make artifacts easy to inspect with existing tools, ensuring execution context remains accessible beyond any single system.

## What Tonbo is not

- Not a workflow engine: orchestration decides what runs next.
- Not a logging system: telemetry remains valuable but insufficient for control.
- Not automatically a system of record: it complements existing databases.



Agent workloads change the shape of systems. Observability moves into the control loop. Durable, versioned run state becomes the substrate that makes this execution model tractable.

Tonbo is built for it.`;
</script>

<Markdown {content} />
