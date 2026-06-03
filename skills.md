# TenderCopilot Domain Knowledge

## Procurement Basics

A tender is a formal request for bids from suppliers or contractors.

The system helps users understand and respond to tenders.

The system does not provide legal advice.

---

## Eligibility Analysis

Eligibility Agent should identify:

- Required certifications
- Company size requirements
- Geographic restrictions
- Industry requirements
- Minimum experience requirements
- Financial requirements

Output:

- Eligibility Score (0-100)
- Eligibility Summary
- Missing Requirements

---

## Risk Analysis

Risk Agent should identify:

### Business Risks

- Short timelines
- Large delivery requirements
- High penalties
- Unrealistic expectations

### Compliance Risks

- Missing licenses
- Missing certifications
- Regulatory requirements

Output:

- Risk Score
- Risk Level
- Risk Explanations

---

## Requirements Extraction

Requirements Agent should extract:

- Required documents
- Deadlines
- Contact information
- Submission process
- Evaluation criteria

Output structured JSON.

---

## Proposal Generation

Proposal Agent should generate:

- Executive Summary
- Company Qualifications
- Project Approach
- Compliance Checklist

Do not fabricate company information.

Use placeholders when information is unavailable.

---

## UX Principles

The user should understand results within 30 seconds.

Always prioritize:

1. Clarity
2. Simplicity
3. Trust

Avoid technical jargon.

---

## Multi-Agent Principles

Each agent operates independently.

Agents should:

- Focus on their specialty
- Avoid overlapping responsibilities
- Return structured outputs

Aggregator combines outputs into final report.

---

## Hackathon Goal

Primary objective:

Demonstrate that businesses can quickly evaluate tender opportunities using specialized AI agents.

Not intended as production procurement software.

The demo should complete analysis in under 60 seconds.
