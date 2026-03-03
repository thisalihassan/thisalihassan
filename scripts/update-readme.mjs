#!/usr/bin/env node

/**
 * Fetches open-source PRs from tracked repos via the GitHub REST API
 * and regenerates the contributions section in README.md between
 * <!-- CONTRIBUTIONS:START --> and <!-- CONTRIBUTIONS:END --> markers.
 *
 * Requires: GITHUB_TOKEN env var (or `gh` CLI auth for local use).
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const README_PATH = join(__dirname, "..", "README.md");
const USERNAME = "thisalihassan";

const TRACKED_REPOS = [
  {
    repo: "nodejs/node",
    label: "Node.js",
    url: "https://github.com/nodejs/node",
    description: "Runtime & Core",
    showArea: true,
  },
  {
    repo: "nodejs/nodejs.org",
    label: "Node.js Website",
    url: "https://github.com/nodejs/nodejs.org",
    description: null,
    showArea: false,
  },
  {
    repo: "rizsotto/Bear",
    label: "Bear",
    url: "https://github.com/rizsotto/Bear",
    description: "Compilation Database Generator",
    showArea: false,
  },
];

const START_MARKER = "<!-- CONTRIBUTIONS:START -->";
const END_MARKER = "<!-- CONTRIBUTIONS:END -->";

async function ghFetch(url) {
  const token = process.env.GITHUB_TOKEN;
  const headers = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchPRs(repo) {
  const mergedData = await ghFetch(
    `https://api.github.com/search/issues?q=author:${USERNAME}+type:pr+is:merged+repo:${repo}&per_page=100&sort=created&order=desc`
  );
  const openData = await ghFetch(
    `https://api.github.com/search/issues?q=author:${USERNAME}+type:pr+is:open+repo:${repo}&per_page=100&sort=created&order=desc`
  );

  const merged = (mergedData.items || []).map((pr) => ({ ...pr, merged: true }));
  const open = (openData.items || []).map((pr) => ({ ...pr, merged: false }));
  return [...merged, ...open];
}

function extractArea(title) {
  const match = title.match(/^(\w[\w_-]*):/);
  return match ? match[1] : "";
}

function buildRepoSection(config, prs) {
  const lines = [];

  let heading = `#### [${config.label}](${config.url})`;
  if (config.description) heading += ` — ${config.description}`;
  lines.push(heading);
  lines.push("");

  if (config.showArea && prs.length > 0) {
    const areas = [...new Set(prs.map((pr) => extractArea(pr.title)).filter(Boolean))];
    if (areas.length > 0) {
      lines.push(
        `Contributed across multiple subsystems including ${areas.map((a) => `\`${a}\``).join(", ")}:`
      );
      lines.push("");
    }
  }

  if (config.showArea) {
    lines.push("| PR | Area | Status |");
    lines.push("|---|---|---|");
    for (const pr of prs) {
      const area = extractArea(pr.title);
      const status = pr.merged ? "Merged" : "Open";
      const title = pr.title.replace(/^[\w_-]+:\s*/, "");
      lines.push(
        `| [${capitalizeFirst(title)}](${pr.html_url}) | ${area} | ${status} |`
      );
    }
  } else {
    lines.push("| PR | Status |");
    lines.push("|---|---|");
    for (const pr of prs) {
      const status = pr.merged ? "Merged" : "Open";
      const title = pr.title.replace(/^[\w_-]+:\s*/, "");
      lines.push(`| [${capitalizeFirst(title)}](${pr.html_url}) | ${status} |`);
    }
  }

  return lines.join("\n");
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function main() {
  console.log("Fetching PRs from tracked repos...");

  const sections = [];
  for (const config of TRACKED_REPOS) {
    console.log(`  -> ${config.repo}`);
    const prs = await fetchPRs(config.repo);
    if (prs.length === 0) continue;
    sections.push(buildRepoSection(config, prs));
  }

  const newContent = sections.join("\n\n");
  const readme = readFileSync(README_PATH, "utf-8");

  const startIdx = readme.indexOf(START_MARKER);
  const endIdx = readme.indexOf(END_MARKER);
  if (startIdx === -1 || endIdx === -1) {
    console.error("Could not find contribution markers in README.md");
    process.exit(1);
  }

  const before = readme.slice(0, startIdx + START_MARKER.length);
  const after = readme.slice(endIdx);
  const updated = `${before}\n\n${newContent}\n\n${after}`;

  if (updated === readme) {
    console.log("No changes detected.");
  } else {
    writeFileSync(README_PATH, updated, "utf-8");
    console.log("README.md updated successfully.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
