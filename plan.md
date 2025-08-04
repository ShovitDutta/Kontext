# Plan: Integrating WSL and Tor for Anonymized Scraping

## Objective

To modify all scraping logic that uses `playwright` to route traffic through the Tor network via a WSL instance. This will anonymize requests and bypass bot detection and rate-limiting issues.

## Target Files

The following files have been identified as using `playwright` and will be modified:

- `src/lib/articleUtils.ts`
- `src/lib/news-scraper.ts`

## Prerequisites

This plan assumes the following setup is completed before our next session:

1.  **WSL Installed:** A working WSL (Windows Subsystem for Linux) distribution is installed and running.
2.  **Tor Service:** The Tor service is installed and running within the WSL distribution.
3.  **Tor SOCKS Proxy:** The Tor service is exposing a SOCKS5 proxy, typically on `socks5://127.0.0.1:9050`.
4.  **Port Forwarding:** The Tor proxy port from WSL is accessible from the host Windows machine.

## Implementation Strategy

Our primary method will be to configure all `playwright` instances to use the Tor SOCKS5 proxy. This directs all browser traffic through the Tor network without needing to run the entire script inside WSL.

### Step 1: Modify `playwright` Launch Configuration

In both target files, I will update the `chromium.launch()` call to include the proxy settings pointing to the Tor SOCKS proxy.

**Example Code Change:**

```typescript
// This change will be applied to all chromium.launch() calls in the target files.
const browser = await chromium.launch({ proxy: { server: 'socks5://127.0.0.1:9050' } });
```

I will also increase the navigation timeout in `page.goto()` calls to `90000` milliseconds to account for the increased latency of the Tor network.

## Execution

Once the changes are applied, you can run your scripts as usual from your Windows terminal.

1.  **Ensure Tor is running in WSL.**
2.  Execute your commands (e.g., `bun cron:blog`).

## Contingency Plan

If the above method fails (e.g., due to issues with `playwright`'s proxy support or port forwarding), the alternative is to run the entire project from within the WSL environment using `torsocks`.

1.  **Setup Project in WSL:** Ensure `bun` and all dependencies are installed within your WSL distribution.
2.  **Run with `torsocks`:** Prefix the command with `torsocks` to force all network traffic from the script through Tor. `bash     torsocks bun cron:blog     ` This approach is more direct but requires setting up your development environment inside WSL.
