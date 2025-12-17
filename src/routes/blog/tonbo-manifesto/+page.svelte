<script>
	import Markdown from '$lib/components/Markdown.svelte';

	const content = `
# Tonbo Manifesto

### —— Why agents need durable continuations

For a long time, most of web applications was built under roughly the same mental model.

A user clicks a button. The browser sends a request. A server that's been warm for hours or days runs deterministic logic. A database updates a few rows. Repeat that a few billion times and you get most web applications of the last twenty years.

That world came with assumptions we rarely named: servers live a long time, connections are stable, concurrency is paced by human clicks, and "state" mostly means the latest value.

Then we started building agents.

Imagine a coding agent refactoring a two‑million‑line codebase, prompted by a single instruction:

"Make this service multi‑tenant and update the relevant tests."

Out of the box, that's a single request. From the agent's point of view, it's an execution path: dozens or hundreds of steps. It has to understand the current design, sketches a plan, follows call graphs, and edits files until the first test breaks. That break reshapes the plan, and the run continues.

Within seconds, one instruction can fan out into thousands of tool calls and repeated model calls. To the agent, it's one coherent path. To a traditional database, it no longer looks like a request. It looks like a tree of work squeezed into a tiny window of time.

## Compute: it all starts here

Start with the lowest layer: where code runs, systems were traditionally built around a small number of long-lived servers.

That isn't the world an increasing number of teams operate in now.

Compute is slicing into short‑lived units: browser workers, service workers, edge runtimes, serverless functions, containers, micro‑VMs. They appear, do some work, and vanish. You don't SSH into a Lambda. It shows up, runs, and disappears.

Early serverless stacks made the mismatch obvious. People bolted short‑lived functions onto long‑lived, connection‑hungry databases. Sometimes it worked. Often it meant connection storms, cold starts, and awkward coordination patterns.

Agents naturally lean into the compute world we've ended up with. They are parallel and irregular by default. One "session" can span minutes or hours, but it rarely runs as one warm process. It fans out into many short steps across many workers, sometimes with gaps in between. That shape fits edge and serverless extremely well.

The catch is continuity. From the agent's point of view, it's one coherent run. From infrastructure's point of view, it's a sequence of short executions stitched together over time. No single worker lives as long as the run itself. A session might pause and resume hours later, hop across regions, branch, and rejoin.

So durable state comes back, but in a different form. It's not enough to persist the latest values. You need to persist the continuation of the run: the "what happens next," plus the context it depends on, somewhere more durable than any one process. Short‑lived workers can then pick up that continuation, advance it a little, and hand it back off.

If the word *continuation* doesn't resonate, here's the plain version:

**Save your place in the work, plus everything needed to keep going later, correctly.** The system should be able to stop anywhere, restart anywhere, and still continue the same run without guessing what it meant to do next.

These assumptions no longer hold:

- stable connections
- a single long-lived host
- predictable concurrency

If compute can show up anywhere, the unit that matters isn't the server. It's the continuation of the run. And if that continuation must cross runtimes and outlive processes, it has to be durable by design. In practice, it also has to be inspectable and comparable over time, which means we need explicit, durable versions of "what happens next," not just a mutable snapshot.

> **A quick note on continuations**

> We use "continuation" deliberately. This is not a programming‑language claim about CPS or stack capture. It's a systems‑level name for the durable description of an unfinished run: the minimal "what happens next," plus the execution context required to resume correctly.

> In agent systems, that context can include plans, tool inputs and outputs, intermediate artifacts, and the exact snapshot of state a step depended on.

> Just as importantly, a continuation is neither "the latest state" nor "a log of past events." It is forward‑looking: a durable handle on the next step of an execution, together with the evidence and context that makes that next step meaningful.


## Workloads: when history becomes first-class

For most web applications, the unit of work was the request: a request comes in, logic runs, a final value is written.

Agent workloads don't look like that. They look like trajectories: multi‑step runs where each step depends on intermediate state, tool results, and shifting context. The final write is just the last move in a long game.

The cleanest way to model a trajectory is as a durable continuation that advances step by step.

Each step advances the run and produces an updated continuation: a new "what happens next," together with the context that makes that next step meaningful and reproducible. Over time, those updates form a sequence and often a tree: retries, speculative branches, parallel tool calls, and merges.

However, once the execution path can branch, be retried, and proceed in parallel, the problem is no longer "what was written last," but rather "how do we record the progress of a run so that we can accurately resume it from anywhere?" This transforms "taking a step forward" into an atomic action that must be persisted.

To make a trace truly recoverable, comparable, and replayable, the system must have a persistent concept of "progress." Explicit continuation updates represent this progress: a commitment to "what happens next." Otherwise, you could certainly just save the latest snapshot, but you wouldn't be able to explain it. You can't reliably resume. You can't compare branches. You can't prove what the agent depended on at the moment a decision was made.

Making continuation updates explicit turns a run into an append‑only trail of durable states. Each update captures the "what happens next," plus the evidence behind it:

- prompts and policies that framed the step,
- retrieved context that shaped the decision,
- tool inputs and outputs that changed the plan,
- intermediate outputs produced along the way,
- the specific snapshot of data and state used for that step.

This is why debugging agents feels different from debugging web apps. A single row or final output rarely tells the story. Logs tell you what happened. Replay and diff are how you understand why.

It also changes concurrency semantics. One user action can fan out into thousands of operations in seconds. When that happens, you don't want one global lock. You want a run that can branch, advance independently, and later be reconciled.

Once the durable unit stops being "a transaction that updates the latest value" and becomes "a durable continuation that preserves a trajectory," the storage underneath can't stay request‑shaped. It has to be designed around durable, replayable state transitions.

And once the unit of work becomes a trajectory, the unit of data follows.

## Data: from rows to timelines and derived state

Classic web‑era data is mostly "current state." Each row represents the latest version of something: an order, a user profile, a balance. You overwrite fields in place and pretend the past doesn't matter much.

Agent‑era data is closer to a diary than a table.

What you see is a time‑structured trail of intermediate results, decisions and branches, embeddings and ranking scores, tool inputs and outputs, traces stitching all of that together. You're not just storing "the truth now." You're storing how the system got there. The history is as important as the snapshot.

Agents also produce derived state as part of execution:

- retrieved context and citations,
- temporary tables and views,
- samples and filtered datasets,
- feature sets and embeddings,
- evaluation runs and scores,
- structured plans and intermediate artifacts,
- tool outputs that become later inputs.

In many systems, these are the working set. They are part of the execution context carried by a run's continuation, and they need to be preserved if the run is going to be replayable, explainable, and reproducible.

*This shifts the kinds of questions systems have to answer:*

- show me everything this run saw and changed during an incident,
- rebuild the context around a misbehavior,
- compare two branches of execution,
- reproduce the snapshot and derived state that led to a decision.

Those questions pull you away from point lookups and toward timelines, scans, filters, and selective reads. Time travel becomes normal. Branching and rollback become expected. Replay becomes something you plan for, not something you bolt on later.

Once you accept that, it becomes hard to justify a state layer that assumes the latest row is the only durable truth. The infrastructure has to reflect the new grain of reality: timelines, context, and durable continuation updates that can survive irregular, short‑lived compute.

## Infrastructure: when state can no longer live in a server

Now stack the pieces: more and more compute are becoming short‑lived and scattered, workloads are trajectories, and the durable unit becomes a continuation carrying time‑structured execution context. Then look back at the default picture of a database: a long‑running server process behind a stable hostname, managing connections and caching hot state.

The mismatch is hard to ignore.

If the state you care about is meant to outlive any single process and be visible from many runtimes and regions, the heap and local disks of one process are no longer the natural home for durable truth. A model where state "lives" inside a server assumes the server itself is stable. In an agent‑driven, serverless world, that assumption doesn't hold.

In practice, durable truth increasingly lives in shared storage. For many systems today, that means object stores: S3, GCS, R2. Objects are durable, globally addressable, and cheap to scale. Storage doesn't care where your code happens to run.

Once shared storage is treated as the anchor, a different architecture becomes viable.

State can be written as immutable segments. Snapshots can be described explicitly using manifests or similar metadata. Any compute instance that can see the storage and the snapshot description can reconstruct a consistent view of a run's durable continuation, including the specific continuation update it is meant to advance.

Coordination shifts with it. Instead of locking memory and pages inside one process, coordination becomes a question of visibility: which snapshot a worker is reading, which continuation update it is advancing, and how conflicting advances are detected and resolved. Consistency is expressed in visible state transitions, not in‑process locks.

This doesn't make the hard problems disappear. Conflict resolution, compaction, and governance are still hard. The difference is where that complexity lives: you design around explicit, replayable transitions, rather than implicit state hidden inside a server.

In this shape, the "database" transforms. It doesn't have to be an always‑on service. It can be a library you instantiate inside a browser worker, spin up inside a serverless function, or embed in a long‑running service.

Scale stops meaning "make one node handle more connections." It starts meaning "add more instances that speak the same state protocol and can reconstruct the same snapshots." Throughput comes from parallelism across short‑lived workers, not from keeping one server alive and warm.

Unbundling the stateful server isn't an aesthetic choice. It's a consequence of accepting that compute is ephemeral and the durable unit is a continuation of an execution.

## Everything moved, but the abstraction lagged

Runtimes moved from a few long‑running servers to a landscape of short‑lived environments.

Workloads moved from transactions to trajectories.

Data moved from flat rows to time‑structured timelines.

Storage moved toward immutable objects and open formats.

Almost every layer adapted. The database abstraction, for the most part, did not.

If you're building agent‑heavy systems, you feel the gap immediately. You're still tuning connection pools and worrying about \`max_connections\`, while assembling a patchwork of systems: logging for raw events, tracing for cross‑service context, vector stores for embeddings, warehouses for offline analysis, time‑series stores for metrics, feature stores for training data.

Each tool solves a real problem. Together, they start to feel like compensation for something missing in the middle.

What's missing isn't another specialized engine. It's a shared abstraction.

There is no single layer that natively matches the shape of modern runs: work that unfolds as trajectories, produces derived state, spans short‑lived runtimes, and depends on shared storage rather than one process. There is no common place to anchor a run's durable continuation: the durable "what happens next," together with the context it depends on.

So the question becomes basic again:

> What's the right abstraction for durable context
when compute is everywhere,
work unfolds as trajectories,
and value lives in replayable execution?
>

We don't think the answer is yet another monolithic service behind a stable hostname.

We think the answer has a different shape: a durable continuation layer that can be instantiated inside any runtime, anchored in shared storage, designed to preserve execution context across steps, branches, and resumes, and built for irregular, parallel work.

Agents make this need impossible to ignore, but they're not the only source of it. The same shape shows up anywhere compute is ephemeral and work is multi‑step: serverless analytics, edge‑native products, event‑driven pipelines, and systems that need auditability and replay as first‑class capabilities.

One clarification before we talk about Tonbo: durable continuations are a semantic model, not a product category. They describe what reliable execution should look like when compute is ephemeral. Any number of systems could implement this idea well or poorly. Tonbo is simply where we're starting to make it concrete.

## Tonbo: making durable continuations practical

Tonbo is the piece we felt was missing when we tried to build agent‑heavy, serverless, and edge‑native systems for real.

We weren't trying to create a new peer to Postgres or Snowflake. We were trying to fill the gap between modern workloads and the assumptions baked into the last generation of databases.

Tonbo's design comes from a small set of commitments about how durable context should behave in this new world.

**First, Tonbo assumes context should follow compute, not the other way around.**
Tonbo is embedded, not hosted. It runs inside the runtimes your code already uses: short-lived functions, edge workers, long-running services, and even browsers. You don't route all activity through a single long-lived server that "owns" state. You bring the state layer to where work happens.

**Second, Tonbo treats the durable unit as a continuation, not the latest value.**
Durable context in Tonbo is the continuation of a run: what happens next, together with the time-structured evidence that makes the next step reproducible. Snapshots, branching, time travel, and replay are assumed to be normal operations when work unfolds as trajectories instead of transactions.

**Third, Tonbo assumes shared storage is the anchor for durable context.**
Durable truth lives in shared storage, not in the heap or local disks of a single process. State is written as immutable segments. Manifests describe which segments make up a snapshot of a run, including the specific continuation update being advanced. Any runtime that can see the storage and manifests can reconstruct a consistent view.

**Fourth, Tonbo is composable infrastructure, not a closed universe.**
Tonbo is not an OLTP system of record. It is a shared context layer that other systems can rely on. Durable object storage sits below it. Different query engines, SQL layers, and pipelines can sit above it. Familiar systems remain interfaces, Tonbo provides durable context anchored in shared storage.

**Fifth, Tonbo assumes execution context has to travel.**
If a durable continuation spans browsers, edges, functions, and training jobs, its context cannot be locked inside a private format. Open formats make execution inspectable, replayable, and reusable wherever computation happens next. Portability is a requirement, not a preference.

If you're building with agents, you'll likely want the same things, even if you don't name them this way.

You'll want to debug paths, not just outputs.

You'll want to survive irregular, not steady traffic.

You'll want durable context that outlives any single process.

You'll want shared storage to be the anchor.

And you'll want replay to be a built‑in capability, not an afterthought.

Tonbo is designed for a world where execution matters, context endures, and durable continuations are the foundation.

And as compute becomes cheaper and more ephemeral, durable context stops being an optimization. It becomes the stable ground that everything else builds on.
`;
</script>

<Markdown {content} />
