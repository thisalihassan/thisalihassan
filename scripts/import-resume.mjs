#!/usr/bin/env node

/**
 * Imports the resume into Reactive Resume (rxresu.me) via their API.
 * Reads RXRESU_ME_API from .env in the repo root.
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envFile = readFileSync(join(__dirname, "..", ".env"), "utf-8");
const API_KEY = envFile.match(/RXRESU_ME_API=(.+)/)?.[1]?.trim().replace(/^["']|["']$/g, "");
if (!API_KEY) {
  console.error("RXRESU_ME_API not found in .env");
  process.exit(1);
}

const BASE_URL = "https://rxresu.me/api/openapi";
const id = () => randomUUID();
const opts = { showLinkInTitle: false };
const noLink = { url: "", label: "" };

const resumeData = {
  basics: {
    name: "Ali Hassan",
    headline: "Engineering Manager & Senior Software Engineer | Node.js Contributor",
    email: "ali-hassan01@outlook.com",
    phone: "+923315040768",
    location: "Islamabad, Pakistan",
    website: { url: "https://github.com/thisalihassan", label: "GitHub" },
    customFields: [
      { id: id(), icon: "", text: "linkedin.com/in/thisalihassan", link: "https://linkedin.com/in/thisalihassan" },
    ],
  },
  summary: {
    title: "Professional Summary",
    columns: 1,
    hidden: false,
    content:
      "<p>Engineering Manager and Senior Software Engineer with 5+ years of experience shipping scalable systems and leading large engineering teams. Contributor to the <strong>Node.js runtime</strong> (C++ and JavaScript), with merged patches across core subsystems including sqlite, url, test_runner, and benchmark infrastructure. Currently directing 100+ engineers across ~15 pods on AI alignment and reinforcement learning initiatives for Fortune 500 clients. Experienced in full-stack development with TypeScript, Node.js, Python, React, and cloud infrastructure on AWS and GCP.</p>",
  },
  sections: {
    profiles: {
      title: "Profiles",
      columns: 1,
      hidden: false,
      items: [
        { id: id(), hidden: false, options: opts, icon: "", network: "LinkedIn", username: "thisalihassan", website: { url: "https://linkedin.com/in/thisalihassan", label: "" } },
        { id: id(), hidden: false, options: opts, icon: "", network: "GitHub", username: "thisalihassan", website: { url: "https://github.com/thisalihassan", label: "" } },
      ],
    },
    experience: {
      title: "Work Experience",
      columns: 1,
      hidden: false,
      items: [
        {
          id: id(), hidden: false, options: opts,
          company: "Turing",
          position: "Engineering Manager",
          location: "Remote",
          period: "Sep 2025 – Present",
          website: noLink,
          description:
            "<ul>" +
            "<li>Direct a division of 100+ engineers organized across ~15 pods, delivering AI alignment and reinforcement learning projects for Fortune 500 clients and Frontier Labs.</li>" +
            "<li>Architect autonomous multi-agent workflows using LangChain and LlamaIndex for complex multi-step reasoning and enterprise automation.</li>" +
            "<li>Design and maintain MCP (Model Context Protocol) integrations connecting RL-GYM environments with frontier models and simulated enterprise environments.</li>" +
            "<li>Lead data generation pipelines for RL-GYM and SWE-Bench evaluations, producing training and evaluation datasets used in model improvement cycles.</li>" +
            "<li>Spearhead adversarial stress-testing and gap analysis on state-of-the-art models to identify failure modes and drive architectural improvements in proprietary LLMs.</li>" +
            "<li>Oversee model alignment workflows including Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF) for undisclosed Tier-1 clients.</li>" +
            "<li>Build internal tooling to streamline fine-tuning pipelines, reducing manual coordination overhead across pods.</li>" +
            "</ul>",
        },
        {
          id: id(), hidden: false, options: opts,
          company: "GetRecall",
          position: "Senior Software Engineer",
          location: "Remote",
          period: "Nov 2024 – Sep 2025",
          website: noLink,
          description:
            "<ul>" +
            "<li>Led full-stack development using React, Next.js, Node.js, Python, and Firebase Cloud Functions for an AI-powered knowledge management platform.</li>" +
            "<li>Achieved Product Hunt <strong>#1 Product of the Day</strong>, <strong>#2 Product of the Week</strong>, and <strong>#3 Product of the Month</strong> on launch; followed by #2 Product of the Week and #3 Product of the Day on a subsequent release.</li>" +
            "<li>Reduced cloud infrastructure costs by right-sizing Lambda functions from 2–4 GB to actual requirements and setting minimum instances to 0 for non-critical functions, eliminating unnecessary hot-start spend.</li>" +
            "<li>Engineered a complete site redesign and SEO strategy, improving Core Web Vitals scores and increasing organic traffic.</li>" +
            "<li>Evaluated and deployed transformer-based models (Gemini, LLaMA, Whisper) based on inference speed vs. accuracy trade-offs for production workloads.</li>" +
            "<li>Built transcription pipelines for YouTube videos and podcasts using Whisper, enhancing content accessibility across the platform.</li>" +
            "</ul>",
        },
        {
          id: id(), hidden: false, options: opts,
          company: "Turing",
          position: "Senior Software Engineer (Part-Time)",
          location: "Remote",
          period: "May 2024 – Oct 2024",
          website: noLink,
          description:
            "<ul>" +
            "<li>Led a specialized pod focused on JavaScript and Python fine-tuning for Fortune 500 clients, running concurrently with the Prixite team lead role.</li>" +
            "<li>Directed fine-tuning efforts for GPT models using state-of-the-art research in AI and machine learning.</li>" +
            "<li>Developed internal tools to streamline the fine-tuning process, improving throughput and data quality for model training pipelines.</li>" +
            "</ul>",
        },
        {
          id: id(), hidden: false, options: opts,
          company: "Prixite",
          position: "Development Team Lead",
          location: "Islamabad, Pakistan",
          period: "May 2022 – Nov 2024",
          website: noLink,
          description:
            "<ul>" +
            "<li>Led multiple engineering teams delivering software products across web, AI, and data platforms.</li>" +
            "<li>Integrated OpenAI GPT-3/GPT-4 and other LLMs into production systems, expanding product capabilities for clients.</li>" +
            "<li>Coached and mentored junior and mid-level engineers, driving team growth through code reviews, architecture discussions, and 1:1s.</li>" +
            "</ul>",
        },
        {
          id: id(), hidden: false, options: opts,
          company: "Prixite",
          position: "Full Stack Developer",
          location: "Islamabad, Pakistan",
          period: "Nov 2020 – May 2022",
          website: noLink,
          description:
            "<ul>" +
            "<li>Built backend services in Python and Node.js, designing APIs and data models connected to React and Next.js front-end applications.</li>" +
            "<li>Implemented Elasticsearch, improving search performance by 35% and enhancing data retrieval across the platform.</li>" +
            "<li>Deployed cloud-based solutions using Infrastructure as Code (IaC) on AWS, streamlining provisioning and reducing deployment errors.</li>" +
            "<li>Established CI/CD pipelines using GitHub Actions and AWS, significantly reducing integration and deployment failures.</li>" +
            "</ul>",
        },
        {
          id: id(), hidden: false, options: opts,
          company: "AUC Law",
          position: "Full Stack Developer",
          location: "Remote",
          period: "Jan 2020 – Nov 2020",
          website: noLink,
          description:
            "<ul>" +
            "<li>Built REST APIs with comprehensive unit testing for a legal technology platform.</li>" +
            "<li>Implemented real-time video conferencing using Twilio Video with member access control and live messaging.</li>" +
            "<li>Set up CI/CD pipelines on AWS and Bitbucket for automated frontend deployment.</li>" +
            "</ul>",
        },
        {
          id: id(), hidden: false, options: opts,
          company: "National Center for AI, COMSATS Islamabad",
          position: "Research Intern",
          location: "Islamabad, Pakistan",
          period: "Jun 2019 – Sep 2019",
          website: noLink,
          description:
            "<ul>" +
            "<li>Researched and developed video stabilization models using machine learning, contributing to media processing capabilities at the national AI center.</li>" +
            "</ul>",
        },
      ],
    },
    education: {
      title: "Education",
      columns: 1,
      hidden: false,
      items: [
        {
          id: id(), hidden: false, options: opts,
          school: "COMSATS University, Islamabad",
          degree: "Bachelor of Science",
          area: "Software Engineering",
          grade: "",
          location: "Islamabad, Pakistan",
          period: "2015 – 2019",
          website: noLink,
          description: "",
        },
      ],
    },
    projects: {
      title: "Open Source Contributions",
      columns: 1,
      hidden: false,
      items: [
        {
          id: id(), hidden: false, options: opts,
          name: "Node.js Runtime (nodejs/node)",
          period: "2024 – Present",
          website: { url: "https://github.com/nodejs/node", label: "Repository" },
          description:
            "<p>Contributor to the Node.js runtime in C++ and JavaScript, with patches merged across sqlite, url, test_runner, and benchmark subsystems:</p>" +
            "<ul>" +
            "<li><strong>sqlite:</strong> Optimized large text bind operations by eliminating redundant memory copies in C++ bindings (<a href='https://github.com/nodejs/node/pull/61580'>#61580</a>)</li>" +
            "<li><strong>test_runner:</strong> Exposed worker ID for concurrent test execution, enabling better debugging of parallel test runs (<a href='https://github.com/nodejs/node/pull/61394'>#61394</a>)</li>" +
            "<li><strong>url:</strong> Implemented the static URL.parse() method per the WHATWG specification, with C++ binding updates (<a href='https://github.com/nodejs/node/pull/52280'>#52280</a>)</li>" +
            "<li><strong>benchmark:</strong> Added conditional taskset CPU pinning for improved benchmark consistency (<a href='https://github.com/nodejs/node/pull/52253'>#52253</a>)</li>" +
            "<li><strong>Active PRs:</strong> Buffer performance improvements (#61871), SQLite optimizations (#61954), stream refactoring (#62087), benchmark improvements (#62084, #62085)</li>" +
            "</ul>",
        },
        {
          id: id(), hidden: false, options: opts,
          name: "Node.js Website (nodejs/nodejs.org)",
          period: "2024",
          website: { url: "https://github.com/nodejs/nodejs.org", label: "Repository" },
          description:
            "<ul>" +
            "<li>Added PowerShell syntax highlighting via Shiki for Windows installation instructions.</li>" +
            "<li>Fixed RSS feed links for release and vulnerability content feeds.</li>" +
            "<li>Contributed Urdu language support and configuration.</li>" +
            "</ul>",
        },
        {
          id: id(), hidden: false, options: opts,
          name: "Bear (rizsotto/Bear)",
          period: "2025",
          website: { url: "https://github.com/rizsotto/Bear/pull/674", label: "PR #674" },
          description:
            "<ul>" +
            "<li>Fixed -arch flag handling for GCC on macOS ARM to prevent argument loss during compilation database generation.</li>" +
            "</ul>",
        },
      ],
    },
    skills: {
      title: "Technical Skills",
      columns: 2,
      hidden: false,
      items: [
        { id: id(), hidden: false, options: opts, icon: "", name: "Languages", proficiency: "", level: 0, keywords: ["JavaScript", "TypeScript", "Python", "C++", "SQL", "HTML", "CSS"] },
        { id: id(), hidden: false, options: opts, icon: "", name: "Backend", proficiency: "", level: 0, keywords: ["Node.js", "NestJS", "Django", "Flask", "FastAPI", "GraphQL"] },
        { id: id(), hidden: false, options: opts, icon: "", name: "Frontend", proficiency: "", level: 0, keywords: ["React", "Next.js"] },
        { id: id(), hidden: false, options: opts, icon: "", name: "AI / ML", proficiency: "", level: 0, keywords: ["OpenAI", "LangChain", "LlamaIndex", "Whisper", "RLHF", "SFT", "RL-GYM", "SWE-Bench"] },
        { id: id(), hidden: false, options: opts, icon: "", name: "Databases", proficiency: "", level: 0, keywords: ["PostgreSQL", "MongoDB", "Elasticsearch", "Redis", "Pinecone"] },
        { id: id(), hidden: false, options: opts, icon: "", name: "Cloud & DevOps", proficiency: "", level: 0, keywords: ["AWS", "GCP", "Firebase", "Docker", "GitHub Actions", "CI/CD", "Linux", "IaC"] },
      ],
    },
    languages: { title: "Languages", columns: 1, hidden: true, items: [] },
    interests: { title: "Interests", columns: 1, hidden: true, items: [] },
    awards: { title: "Awards", columns: 1, hidden: true, items: [] },
    certifications: { title: "Certifications", columns: 1, hidden: true, items: [] },
    publications: { title: "Publications", columns: 1, hidden: true, items: [] },
    volunteer: { title: "Volunteer", columns: 1, hidden: true, items: [] },
    references: { title: "References", columns: 1, hidden: true, items: [] },
  },
  picture: {
    hidden: true,
    url: "",
    size: 64,
    rotation: 0,
    aspectRatio: 1,
    borderRadius: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    shadowColor: "rgba(0,0,0,0)",
    shadowWidth: 0,
  },
  customSections: [],
  metadata: {
    template: "azurill",
    layout: {
      sidebarWidth: 30,
      pages: [
        {
          fullWidth: false,
          main: ["summary", "experience"],
          sidebar: ["profiles", "skills"],
        },
        {
          fullWidth: true,
          main: ["experience", "projects"],
          sidebar: [],
        },
        {
          fullWidth: false,
          main: ["education"],
          sidebar: [],
        },
      ],
    },
    css: { enabled: false, value: "" },
    page: {
      gapX: 4,
      gapY: 8,
      marginX: 16,
      marginY: 14,
      format: "a4",
      locale: "en-US",
      hideIcons: false,
    },
    design: {
      level: { icon: "acorn", type: "circle" },
      colors: {
        primary: "rgba(0, 90, 170, 1)",
        text: "rgba(0, 0, 0, 1)",
        background: "rgba(255, 255, 255, 1)",
      },
    },
    typography: {
      body: {
        fontFamily: "IBM Plex Serif",
        fontWeights: ["400", "600"],
        fontSize: 11,
        lineHeight: 1.5,
      },
      heading: {
        fontFamily: "Fira Sans Condensed",
        fontWeights: ["500"],
        fontSize: 18,
        lineHeight: 1.5,
      },
    },
    notes: "",
  },
};

async function main() {
  console.log("Importing resume to Reactive Resume...");

  const res = await fetch(`${BASE_URL}/resumes/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ data: resumeData }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`API error ${res.status}: ${body}`);
    process.exit(1);
  }

  const body = await res.json();
  const resumeId = typeof body === "string" ? body : body.id ?? body.slug ?? JSON.stringify(body);
  console.log(`Resume imported successfully!`);
  console.log(`Response: ${JSON.stringify(body)}`);
  console.log(`View/edit at: https://rxresu.me/dashboard/resumes`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
