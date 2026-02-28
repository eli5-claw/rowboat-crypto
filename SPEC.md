# Rowboat Crypto Extension

## Overview
Crypto/DeFi knowledge graph extension for Rowboat AI coworker. Turns on-chain data, portfolio history, and market movements into persistent, queryable knowledge.

## Core Features

### 1. On-Chain Knowledge Graph
- Auto-index wallet transactions
- Build entity relationships (protocols, tokens, addresses)
- Track portfolio evolution over time
- Connect to DeFiLlama, Dune, TheGraph

### 2. Trading Journal
- Natural language trade logging
- Auto-extract: token, entry, exit, PnL, reasoning
- Link to on-chain tx hashes
- Pattern recognition across trades

### 3. Market Context
- Sync yield opportunities to knowledge graph
- Track APY changes as events
- Alert on significant movements
- Connect news to price action

### 4. MCP Server
- Expose knowledge graph to any AI agent
- Query: "What was my best trade last month?"
- Query: "Which protocols have I used?"
- Query: "Show me yield trends for USDC"

## Tech Stack
- **Frontend:** Next.js 14 + Tailwind
- **Knowledge Graph:** Neo4j or SQLite + graph layer
- **On-Chain:** viem + Alchemy/Infura
- **Sync:** Background jobs for data ingestion
- **MCP:** Model Context Protocol server

## Integration with Rowboat
- Obsidian-compatible Markdown export
- Background agents for continuous sync
- Local-first, privacy-preserving

## Monetization
- **Free:** Personal use, 1 wallet
- **Pro ($19/mo):** Multiple wallets, advanced queries
- **Enterprise:** Team knowledge graphs, shared insights

## MVP Scope
1. Wallet connection and tx indexing
2. Basic knowledge graph visualization
3. Natural language trade logging
4. Simple MCP query interface

---
**Status:** In Progress  
**Started:** Feb 28, 2026
