# Lab 3: Autonomous Agentic Development

## Module 3 - Advanced Agentic Coding Course

---

## Overview

In this lab, you'll build a complete REST API backend using **multi-agent orchestration** with Roo Code. Unlike traditional single-agent development, you'll configure multiple specialized agents that work together autonomously to plan, implement, verify, and iterate until the system is fully functional.

**What You'll Build:** A .NET 8 Minimal API backend for a Trello-like taskboard application

**What You'll Learn:**
- Multi-agent orchestration with Roo Code custom modes
- Autonomous agent workflows with verification loops
- Antagonistic agent patterns for quality assurance
- Extending agents with terminal, code execution, and browser control

---

## Prerequisites

**Completed Modules:**
- Module 1: Advanced prompting techniques, structured prompting, agent rules
- Module 2: Context management, spec-driven development, task breakdown

**Technical Requirements:**
- .NET 8 SDK installed
- Node.js (v18+) and npm installed
- Roo Code extension for VS Code
- GitHub Copilot (optional, for creating agent prompts)

**Project Files:**
- Backend specification: `spec/taskboard-backend-specification.md`
- Frontend: Complete and working (do not modify)
- Backend skeleton: `backend/` (implement the API here)
- Build/test guide: `agents.md`

---

## Objective

Build the complete backend API to meet the specification in `spec/taskboard-backend-specification.md` using multi-agent orchestration. Your agents must autonomously:

1. Analyze the specification
2. Break down the work into implementable tasks
3. Implement all API endpoints with file-based persistence
4. Verify the implementation through builds, tests, and end-to-end browser testing
5. Iterate on failures until all verifications pass

**Success Criteria:**
- ✅ Backend builds without errors (`dotnet build`)
- ✅ All backend tests pass (`dotnet test`)
- ✅ Frontend connects to backend successfully
- ✅ All taskboard operations work in the browser (create/edit/move/delete tasks and lanes)

---

## The Multi-Agent Architecture

### Agent Roles

Configure Roo Code custom modes for these specialized agents:

#### 1. **Orchestrator Agent** (The Conductor)
- **Purpose:** Coordinates the entire workflow, makes strategic decisions
- **Responsibilities:**
  - Delegates tasks to specialized agents
  - Evaluates verification results
  - Decides when to iterate vs. when to proceed
  - Maintains the big picture and ensures completion

#### 2. **Planner Agent** (The Architect)
- **Purpose:** Analyzes specs and creates implementation plans
- **Responsibilities:**
  - Reads and understands the backend specification
  - Breaks down work into logical, sequenced tasks
  - Identifies dependencies and risks
  - Creates task lists for the Coder agent

#### 3. **Coder Agent** (The Builder)
- **Purpose:** Implements the code based on plans
- **Responsibilities:**
  - Writes API endpoints following REST conventions
  - Implements file-based persistence layer
  - Follows .NET best practices
  - Creates/updates test cases

#### 4. **Build Verifier Agent** (The Compiler)
- **Purpose:** Ensures code compiles successfully
- **Responsibilities:**
  - Runs `dotnet build` in the backend directory
  - Reports compilation errors with context
  - Antagonistic: Fails the build on any error

#### 5. **Test Verifier Agent** (The Quality Gate)
- **Purpose:** Ensures code correctness through unit tests
- **Responsibilities:**
  - Runs `dotnet test` in the backend directory
  - Reports test failures with details
  - Antagonistic: Fails on any test failure

#### 6. **Integration Verifier Agent** (The End-to-End Tester)
- **Purpose:** Validates the complete system through browser testing
- **Responsibilities:**
  - Starts backend and frontend servers
  - Uses browser control to test taskboard operations
  - Verifies UI reflects backend changes correctly
  - Tests: board loads, create task, edit task, move task, delete task, lane management
  - Antagonistic: Fails on any broken user scenario

---

## The Autonomous Loop

```
┌─────────────────────────────────────────────────────┐
│  ORCHESTRATOR                                       │
│  "What needs to be done? Who should do it?"        │
└─────────────────┬───────────────────────────────────┘
                  │
                  ├──► PLANNER (Analyze spec, create plan)
                  │         │
                  │         └──► Returns: Task breakdown
                  │
                  ├──► CODER (Implement from plan)
                  │         │
                  │         └──► Returns: Code changes made
                  │
                  ├──► BUILD VERIFIER (Compile check)
                  │         │
                  │         ├──► ✅ Pass → Continue
                  │         └──► ❌ Fail → Loop back to CODER
                  │
                  ├──► TEST VERIFIER (Unit test check)
                  │         │
                  │         ├──► ✅ Pass → Continue
                  │         └──► ❌ Fail → Loop back to CODER
                  │
                  └──► INTEGRATION VERIFIER (E2E test)
                            │
                            ├──► ✅ Pass → COMPLETE! 🎉
                            └──► ❌ Fail → Loop back to CODER
```

**Key Concept:** The Orchestrator has **agency** through verification feedback. It autonomously decides when to iterate (on failures) vs. proceed (on success), achieving true autonomous completion.

---

## Implementation Guide

### Step 1: Understand the Specification

Review `spec/taskboard-backend-specification.md` to understand:
- Required API endpoints (board, tasks, lanes)
- Data model (JSON file structure)
- Success criteria (FR-001 through FR-016)
- Non-functional requirements (NFR-001 through NFR-007)

### Step 2: Configure Roo Code Custom Modes

Create custom modes in Roo Code for each agent role. Reference: https://docs.roocode.com/features/custom-modes

**Tips:**
- Use GitHub Copilot to help craft agent prompts
- Include a **constitution** (agent rules) in each mode:
  - Orchestrator: Focus on coordination, don't implement code
  - Planner: Think through dependencies, provide clear task lists
  - Coder: Follow spec precisely, write clean code, update tests
  - Verifiers: Be antagonistic, fail on any issue, provide actionable feedback
- Use structured prompting techniques from Module 1
- Reference `agents.md` for build/test commands

**Example Constitution for Build Verifier:**
```
You are a build verification agent. Your role is antagonistic.
- Run `dotnet build` in the backend directory
- Report ANY compilation errors with full context
- FAIL if there are any errors, warnings are acceptable
- Provide the exact error messages and file locations
- Do not try to fix issues, only report them
```

### Step 3: Set Up Agent Orchestration

**Orchestrator Workflow:**
1. Start by delegating to Planner (boomerang task)
2. Receive plan, delegate implementation to Coder
3. After code changes, delegate to Build Verifier
4. If build passes, delegate to Test Verifier
5. If tests pass, delegate to Integration Verifier
6. On any failure, delegate back to Coder with failure details
7. Repeat until all verifications pass

**Boomerang Tasks:** Use Roo Code's boomerang task feature to hand work between agents while maintaining context.

### Step 4: Leverage Module 1 & 2 Techniques

Apply what you learned:
- **Structured Prompting:** Chain-of-thought for complex decisions
- **Context Management:** Use context packs to provide spec, existing code, and previous failures to agents
- **Spec-Driven Development:** Planner should extract requirements from spec
- **Task Breakdown:** Planner creates clear, sequenced task lists
- **Agent Rules:** Use `agents.md` as a constitution for all agents

### Step 5: Execute the Autonomous Loop

1. Invoke the Orchestrator agent
2. Let it coordinate the workflow autonomously
3. Observe the agent interactions and verification loops
4. The Orchestrator should continue until all verifications pass

**Expected Iterations:**
- First pass: Implement basic endpoints
- Build Verifier may catch compilation errors → fix
- Test Verifier may catch logic errors → fix
- Integration Verifier may catch missing features → implement
- Continue until fully functional

### Step 6: Verify Success

Your lab is complete when:
1. Backend builds without errors
2. All unit tests pass
3. Frontend successfully connects to backend
4. All browser-based operations work:
   - Board loads with default lanes
   - Create task in a lane
   - Edit task title/description
   - Move task between lanes (drag-and-drop)
   - Delete task
   - Create new lane
   - Edit lane name
   - Delete empty lane

---

## Tips for Success

### Orchestrator Design
- Keep the big picture in mind
- Don't get stuck in details (delegate to specialists)
- Use verification results to make decisions
- Maintain a mental model of what's complete vs. what's remaining

### Agent Communication
- Boomerang tasks should include clear context about what was done and what needs to happen next
- Failed verifications should include actionable error details
- Successful verifications should confirm what was tested

### Verification Strategy
- Run verifiers in order: Build → Test → Integration
- Don't skip steps (build must pass before testing)
- Integration Verifier should test realistic user workflows
- Use the browser control tool systematically (don't rush)

### Common Pitfalls
- ❌ Orchestrator tries to code (delegate instead)
- ❌ Skipping verification steps (all three are required)
- ❌ Verifiers that are too lenient (be antagonistic!)
- ❌ Not providing enough context in boomerang tasks
- ❌ Giving up after first failure (iteration is the point!)

---

## Reference Commands

See `agents.md` for complete build and test instructions.

**Quick Reference:**
```cmd
# Build backend
cd backend
dotnet build

# Run backend tests
cd backend
dotnet test

# Run backend server
cd backend/TaskboardApi
dotnet run
# API available at: http://localhost:5156

# Run frontend (separate terminal)
cd frontend
set VITE_API_URL=http://localhost:5156
npm run dev
# Frontend available at: http://localhost:5173
```

---

## What You're Learning

This lab teaches you to:

1. **Think in Multi-Agent Systems** - Break complex problems into specialized roles
2. **Design Agent Constitutions** - Create focused, antagonistic agents for quality
3. **Orchestrate Autonomously** - Use verification loops for true autonomous completion
4. **Extend Agent Capabilities** - Leverage terminal, code execution, and browser control
5. **Build Production Workflows** - Apply these patterns to real-world development

### Key Insight

The breakthrough from novice to advanced agentic coding is understanding **agency through verification**. The Orchestrator doesn't just execute a script—it makes decisions based on feedback, creating a truly autonomous development loop.

---

## Bonus Challenges

Once you complete the basic lab:

1. **Add More Verifiers**
   - Code quality verifier (linting, style checks)
   - Performance verifier (response time checks)
   - Security verifier (input validation checks)

2. **Optimize the Orchestration**
   - Parallel verification when possible
   - Smarter retry strategies (don't redo everything on small failures)
   - Learning from previous failures (context accumulation)

3. **Extend to Frontend**
   - Add a Feature Implementer agent to add new frontend features
   - Use the same verification pattern

---

## Support

If you get stuck:
- Review the spec carefully—it has all the requirements
- Check `agents.md` for correct commands
- Ensure your agent prompts are clear and focused
- Remember: iteration is expected and valuable!

**Learning Objective:** This lab is designed to be challenging. The goal is to experience the power and complexity of multi-agent orchestration, not just to complete it quickly.

---

*Good luck, and embrace the autonomous loop!* 🚀
