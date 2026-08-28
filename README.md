![Project Banner](docs/readme-agent/banner.svg)

# Porto

Interactive personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **GSAP**.

## Technology Stack

- TypeScript
- CSS
- JavaScript
- npm

## Punya Mittal — Brutalist × Retro Portfolio

Interactive personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **GSAP**.

This portfolio serves as a dynamic, interactive showcase of skills and projects, utilizing modern web technologies for a unique, retro-futuristic experience.

## Tech Stack

This project leverages a robust set of technologies:

*   **Framework:** Next.js
*   **Language:** TypeScript, JavaScript
*   **Styling:** Tailwind CSS, CSS
*   **Animation:** Framer Motion, GSAP
*   **Package Manager:** npm

## Getting Started

To run this project locally, follow these steps:

### Installation

```bash
npm install
```

### Usage

This repository includes several scripts for development, building, and testing:

*   **Run Development Server:**
    ```bash
npm run dev  # next dev
```
    Open [http://localhost:3000](http://localhost:3000).
*   **Build for Production:**
    ```bash
npm run build  # next build
```
*   **Start Production Server:**
    ```bash
npm run start  # next start
```
*   **Run Linter:**
    ```bash
npm run lint  # eslint
```

## Customization

To modify the content of the portfolio, edit the data files located in the `src/data` directory. Key files include:

*   `src/data/portfolio.ts`: Edit this file for name, projects, skills, experience, and social links.

## Easter Eggs & Features

This portfolio includes several interactive elements and hidden features:

*   **Konami Code** ($↑↑↓↓←→←→$): Triggers Retro Mode and a secret achievement.
*   **Double-click logo**: Cycles through color palettes.
*   **?**: Displays keyboard shortcuts.
*   **Alt+R**: Toggles Retro Mode.
*   **Hidden pixel**: Located in the bottom-right corner.
*   **Terminal Commands**: Use commands like `help`, `projects`, `contact`, `resume`, `social`, `theme`, and `retro` within the terminal interface.

## Setup Guide

### Frontend Setup

```bash

npm install
npm run dev     # development
npm run build && npm start   # production
```

Open `http://127.0.0.1:3000` (or the port shown in the terminal).

### Running the Application

1. **Start web app** — `npm run dev` in `./`

```bash
cd .
npm install
npm run dev
```

## System Architecture

High-level system design, data flows, API map, and workflow pipelines derived from the repository structure.

### System Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        user["User / Operator"]
        api_client["API / CLI Client"]
    end

    subgraph Core["src/ — Application Core"]
    end

    subgraph Data["Data & Artifacts"]
        datasets["Datasets · JSON · CSV"]
    end

    subgraph Charts["Metrics & Dashboard Charts"]
        attack_stats["Attack detection stats"]
        risk_trajectory["Risk trajectory chart"]
        eval_metrics["Evaluation metrics"]
        benchmark_p99["Benchmark p99 chart"]
        dashboard_kpis["Dashboard KPI cards"]
        ops_snapshot["Live ops snapshot"]
    end

    user --> api_client
    api_client --> Core
    user -->|Web UI| dashboard_kpis
    Core --> attack_stats
    attack_stats --> user
```

### Data Flow & Charts Pipeline

```mermaid
flowchart LR
    U["User / Event"] --> IN["Untrusted Input"]

    subgraph Pipeline["Processing Pipeline"]
        p0["Input"]
        p1["Processing"]
        p2["Output"]
        p0 --> p1
        p1 --> p2
    end

    subgraph Metrics["Metrics & Chart Feeds"]
        attack_stats["Attack detection stats"]
        risk_trajectory["Risk trajectory chart"]
        eval_metrics["Evaluation metrics"]
        benchmark_p99["Benchmark p99 chart"]
        dashboard_kpis["Dashboard KPI cards"]
        ops_snapshot["Live ops snapshot"]
        confusion_matrix["Model confusion matrix"]
        latency_hist["Latency histogram"]
    end

    IN --> p0
    p2 --> OUT["Authorized Output"]
    OUT --> U
    p2 --> attack_stats
    attack_stats --> U
```

### Component & API Map

```mermaid
graph LR
    subgraph App["src Components"]
        main["main<br/>Main"]
    end
```

### Dashboard Page Map

```mermaid
mindmap
  root((MOVIO Dashboard))
    Overview
    Build
    Evaluate
    System
```

## Application Pages

Screenshots captured from the running application. Each page is listed with its function.

#### Home

Application page at `/`

![Home](docs/readme-agent/pages/dashboard.png)

#### Results at a glance

Application page at `/(site)/about`

![Results at a glance](docs/readme-agent/pages/site-about.png)
