# Taskboard Application - Build and Test Guide

Quick reference for building, testing, and verifying the Taskboard application.

---

## 1. Build Instructions

### Backend (.NET 8 Minimal API)

**Prerequisites:** .NET 8 SDK installed

```cmd
cd backend
dotnet build
```

**Run the API:**
```cmd
cd backend/TaskboardApi
dotnet run
```

API runs on: **http://localhost:5156**

### Frontend (Vite + React + TypeScript)

**Prerequisites:** Node.js (v18+) and npm

```cmd
cd frontend
npm install
```

**Configure API URL (required):**
```cmd
set VITE_API_URL=http://localhost:5156
```

**Run development server:**
```cmd
npm run dev
```

Frontend runs on: **http://localhost:5173**

### Running Full Stack

Run both servers in separate terminals:

**Terminal 1 - Backend:**
```cmd
cd backend/TaskboardApi
dotnet run
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
set VITE_API_URL=http://localhost:5156
npm run dev
```

Open browser to: **http://localhost:5173**

---

## 2. Test Instructions

### Backend Tests (xUnit)

```cmd
cd backend
dotnet test
```

For verbose output:
```cmd
dotnet test --verbosity normal
```

### Frontend Tests

```cmd
cd frontend
npm test
```

---

## 3. Browser Integration Testing

### Prerequisites
- Start both backend and frontend servers in the background so they don't block agent execution (see section 1). 
- Wait for servers to fully start before testing

### Key Test Scenarios

**Verify Board Loads:**
- Navigate to http://localhost:5173
- Verify default lanes appear (To Do, In Progress, Done)
- Confirm no error messages

**Create Task:**
- Click "Add Task" button
- Fill in title and description
- Submit and verify task appears in correct lane

**Edit Task:**
- Click existing task
- Modify title
- Save and verify changes persist

**Move Task Between Lanes:**
- Drag task to different lane
- Drop and verify task moved correctly

**Delete Task:**
- Click delete button on task
- Confirm deletion
- Verify task removed from board

**Lane Management:**
- Create new lane with "Add Lane" button
- Edit lane name
- Delete empty lane

**Test Offline Indicator:**
- Open browser DevTools (F12)
- Set network to "Offline" in Network tab
- Verify offline banner appears
- Re-enable network and verify banner disappears

### Notes
- Allow a few seconds for UI to stabilize after actions
- Use DevTools Network tab to monitor API calls
- Backend data persists in JSON files between restarts
