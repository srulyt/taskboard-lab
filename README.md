# Taskboard Lab

A hands-on learning project for **autonomous agentic development** using multi-agent orchestration. Build a complete full-stack taskboard application (similar to Trello) by coordinating specialized AI agents.

## 🎯 Purpose

This lab teaches advanced agentic coding techniques through practical implementation:
- Multi-agent orchestration with specialized roles
- Autonomous verification loops (build → test → integration)
- Antagonistic agent patterns for quality assurance
- Extending agents with terminal, code execution, and browser control

Part of **Module 3: Advanced Agentic Coding Course**

## 🏗️ Tech Stack

**Backend:**
- .NET 8 Minimal API
- File-based JSON persistence
- xUnit for testing
- Swagger/OpenAPI documentation

**Frontend:**
- Vite + React 18
- TypeScript
- Drag-and-drop task management
- Offline status detection

## 📁 Project Structure

```
taskboard-lab/
├── backend/                    # .NET 8 API
│   ├── TaskboardApi/          # Main API project
│   └── TaskboardApi.Tests/    # Unit tests
├── frontend/                   # React + TypeScript
│   └── src/
│       ├── components/        # UI components
│       ├── api/              # API client
│       └── hooks/            # Custom React hooks
├── spec/                      # Technical specifications
├── docs/                      # Lab instructions
└── agents.md                  # Build & test guide
```

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js (v18+) and npm

### Run Backend
```cmd
cd backend/TaskboardApi
dotnet run
```
API runs on: `http://localhost:5156`

### Run Frontend
```cmd
cd frontend
set VITE_API_URL=http://localhost:5156
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 🧪 Testing

### Backend Tests
```cmd
cd backend
dotnet test
```

### Full Integration Test
1. Start backend server (Terminal 1)
2. Start frontend dev server (Terminal 2)
3. Open browser to `http://localhost:5173`
4. Test taskboard operations: create/edit/move/delete tasks and lanes

## 📚 Documentation

- **Lab Instructions:** [docs/LAB-INSTRUCTIONS.md](docs/LAB-INSTRUCTIONS.md)
- **Backend Spec:** [spec/taskboard-backend-specification.md](spec/taskboard-backend-specification.md)
- **Frontend Spec:** [spec/taskboard-frontend-specification.md](spec/taskboard-frontend-specification.md)
- **Build & Test Guide:** [agents.md](agents.md)

## 🎓 Learning Objectives

- Design multi-agent systems with clear separation of concerns
- Implement autonomous verification loops for quality assurance
- Coordinate agent workflows through boomerang tasks
- Apply spec-driven development with AI agents
- Build production-ready workflows with agentic tools

## ✨ Features

- ✅ Drag-and-drop task management
- ✅ Multiple swimlanes (To Do, In Progress, Done)
- ✅ Create, edit, move, and delete tasks
- ✅ Lane management (create, rename, delete)
- ✅ Offline detection with status banner
- ✅ File-based persistence (survives restarts)
- ✅ RESTful API with proper error handling
- ✅ Comprehensive test coverage

---

**Note:** This is a training lab. The focus is on learning multi-agent orchestration patterns, not building production software.
