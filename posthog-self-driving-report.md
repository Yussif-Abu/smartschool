# PostHog Self-driving setup report

## Summary

PostHog Self-driving is configured for this web application. Session Replay was already enabled; Error Tracking and Support were enabled, along with native health, error, and support signal sources.

The scout troop is selective, and two Replay Vision monitors now send corroborated visible-breakage and frustration findings into the [Self-driving inbox](https://us.posthog.com/project/612270/inbox). Fresh scout configurations are normally picked up within about 30 minutes.

## AI data processing

Approved by the setup gate.

## GitHub

The PostHog GitHub App was connected before this setup run. GitHub Issues was not selected as an inbox source, so no GitHub responder was enabled.

## Products enabled

| Product | Result | Notes |
| --- | --- | --- |
| Session Replay | Already enabled | Browser SDK initialization was checked; it does not disable session recording. Recent recordings exist. |
| Error Tracking | Enabled | Browser SDK initialization explicitly enables exception capture. |
| Support | Enabled | A Support responder is ready, but tickets require an inbound email, inbox, or Slack channel in PostHog. |

## Signal sources

| Signal source | Action | Notes |
| --- | --- | --- |
| `health_checks` / `health_issue` | Enabled | New source config created. |
| `error_tracking` / `issue_created` | Enabled | New source config created. |
| `error_tracking` / `issue_reopened` | Enabled | New source config created. |
| `error_tracking` / `issue_spiking` | Enabled | New source config created. |
| `conversations` / `ticket` | Enabled | New source config created; dormant until a Support channel is connected. |
| `signals_scout` / `cross_source_issue` | On by default | No opt-out row existed, so no write was needed. |
| Session replay source config | Deliberately skipped | Replay coverage is owned by the Replay Vision scanners below; the retired session-analysis source was not created. |

## Connected tools

No external connected-tool source was selected. No warehouse sources are currently connected.

## Scout troop

**Run budget:** 100 maximum runs/day; 0 used today; 100 remaining today.

> Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.

### Active scouts

| Scout | Why it is active |
| --- | --- |
| `signals-scout-general` | Covers cross-product relationships and surfaces without a specialist. |
| `signals-scout-product-analytics` | The application has instrumented record-management flows. |
| `signals-scout-web-analytics` | This is a browser-based application with web analytics set up. |

### Disabled scouts

| Scout or group | Why it is disabled |
| --- | --- |
| `signals-scout-error-tracking` | Covered by the enabled native Error Tracking sources. |
| `signals-scout-session-replay` | Covered by the Replay Vision monitors below. |
| `signals-scout-inbox-validation` | No resolved Self-driving reports exist to re-measure yet. |
| AI observability, APM, logs, data pipelines, data warehouse, tasks, skills store | No usage evidence for these surfaces. |
| Conversations, CSP violations, customer analytics, experiments, feature flags, revenue analytics, surveys | No active usage evidence for these product surfaces. |
| Anomaly detection, health checks, insight alerts, Replay Vision analyst, web vitals, MCP tool calls, observability gaps | Kept off to maintain a focused troop; they can be enabled later if these monitoring needs become active. |

This is **3 active scouts and 24 disabled scouts**, leaving room under the ten-scout quality ceiling for future custom coverage.

## Custom scouts

No custom scout was created. Two candidates were proposed and declined:

- **School record management:** would watch for creation stalls or unexpected deletion spikes across core school records. It is watchable from the application’s creation and deletion analytics, but is not a built-in scout’s specific discriminator.
- **Data exports:** would watch for unusually high export volume or an unexpected loss of export activity. It is watchable from the shared table export analytics, but lacks current production-volume confirmation.

The built-in general, product analytics, and web analytics scouts remain the chosen baseline. If a future custom scout becomes noisy, set `emit: false` on its config in PostHog to switch it to dry-run.

## Replay Vision scanners

A Replay Vision scanner is an LLM that watches individual session recordings on a schedule and pushes qualifying observations to the Self-driving inbox. These are the only items in this setup that spend Replay Vision quota. Each qualifying finding has half weight and requires independent corroboration before it is promoted into a report.

| Scanner | Status | Scope and purpose | Sampling | Estimated monthly spend |
| --- | --- | --- | --- | --- |
| **Student record creation breakage** | Created | Sessions whose URL includes `/students/new`, the record-creation completion flow. Watches for visible form failures, missing options, failed submissions, and missing confirmations. | 50% | 0 observations / 0 credits from the current one-day estimate window. |
| **School record workflow frustration** | Created | Sessions containing a rage click, with no URL filter. Watches for visible repeated attempts, failed controls, and abandonment while managing school records. | 100% | 0 observations / 0 credits from the current one-day estimate window. |

Replay Vision quota was checked before creation: 2,500 credits remain in the current period and no credits have been used. The project has recent recordings, so the scanners are armed and will evaluate matching sessions as they arrive.

## Files created or modified

- Created `posthog-self-driving-report.md`.
- Installed local scanner guidance under `.claude/skills/` for the Replay Vision setup, scanner mechanics, broken-experience monitor, and frustration monitor.
- No application source files were changed.

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) in PostHog so the enabled Support responder can receive tickets.
- [ ] Reauthorize the PostHog MCP connection with the property-definition read scope if you want server-side confirmation of the product’s custom event taxonomy; this setup relied on the repository’s existing instrumentation for the custom-scout review.
- [ ] Optionally enable an external connected-tool responder later from [new data warehouse source](https://us.posthog.com/project/612270/pipeline/new/source) if an issue tracker, support desk, security scanner, or other tool should feed Self-driving.

## What happens next

The scout coordinator normally picks up fresh configurations within about 30 minutes. Scout runs use the daily run budget, and qualifying findings cluster into reports in the [Self-driving inbox](https://us.posthog.com/project/612270/inbox), where immediately actionable reports can start coding tasks.
