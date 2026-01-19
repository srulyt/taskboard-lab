# Task Board Frontend - Specification

- **Version:** 1.0
- **Date:** 2026-01-19
- **Status:** Draft
- **Type:** Training Lab Exercise

---

## Executive Summary

This specification defines the frontend web application for a lightweight Trello-like task board. The application provides a visual interface for managing tasks organized into lanes (columns), communicating with a companion REST API backend for data persistence.

This is a **training lab exercise** designed to teach frontend development fundamentals including component architecture, API integration, drag-and-drop interactions, and graceful error handling. The scope is intentionally limited to core kanban functionality without authentication, real-time collaboration, or production-grade features.

**Critical Requirement:** The frontend shall remain stable and usable even when the backend API is unavailable, displaying a clear read-only state rather than crashing or showing confusing errors.

---

## Goals

This training lab aims to achieve the following learning objectives:

| Goal | Description |
|------|-------------|
| Component Architecture | Build reusable UI components for board, lanes, and tasks |
| API Integration | Implement REST API communication with proper error handling |
| Drag-and-Drop UX | Create intuitive task movement between workflow stages |
| Graceful Degradation | Handle backend unavailability without application failure |

---

## Functional Requirements

### Requirements Summary

| Req ID | Priority | Category | Description |
|--------|----------|----------|-------------|
| FR-001 | P0 | Board Display | System shall display a single task board with lanes arranged horizontally |
| FR-002 | P0 | Board Display | System shall display tasks organized within their assigned lane |
| FR-003 | P0 | Board Display | System shall support configurable backend API endpoint |
| FR-004 | P0 | Task Management | User shall be able to add a new task to any lane |
| FR-005 | P0 | Task Management | User shall be able to remove a task |
| FR-006 | P0 | Task Management | User shall be able to edit task content |
| FR-007 | P0 | Drag & Drop | User shall be able to drag and drop tasks between lanes |
| FR-008 | P0 | Error Handling | System shall display board in read-only mode when backend is unavailable |
| FR-009 | P0 | Error Handling | System shall display clear error messages when backend operations fail |
| FR-010 | P0 | Visual Feedback | System shall display loading indicator during API operations |
| FR-011 | P1 | Lane Management | User shall be able to add a new lane |
| FR-012 | P1 | Lane Management | User shall be able to remove a lane |
| FR-013 | P1 | Lane Management | User shall be able to reorder lanes |
| FR-014 | P1 | Lane Management | User shall be able to rename a lane |
| FR-015 | P1 | Visual Feedback | System shall display success confirmation after operations complete |
| FR-016 | P1 | Drag & Drop | System shall provide visual feedback during drag operations |
| FR-017 | P1 | Board Display | System shall automatically refresh board data on initial load |
| FR-018 | P2 | Drag & Drop | User shall be able to reorder tasks within the same lane |
| FR-019 | P2 | Visual Feedback | System shall display task count per lane |
| FR-020 | P2 | Error Handling | System shall retry failed operations automatically once |

### Critical Requirements (P0)

#### FR-001: Board Display

- **Description:** System shall display a single task board with configurable lanes arranged horizontally
- **Category:** Board Display
- **Acceptance Criteria:**
  - Board displays all configured lanes from left to right
  - Each lane has a visible header with lane name
  - Board layout adapts to number of lanes present

#### FR-002: Task Organization

- **Description:** System shall display tasks organized within their assigned lane, with each task showing its content
- **Category:** Board Display
- **Acceptance Criteria:**
  - Tasks appear within their assigned lane
  - Task content (title) is visible on each task card
  - Tasks are displayed in a vertical list within each lane

#### FR-003: Configurable API Endpoint

- **Description:** System shall support configurable backend API endpoint URL through application configuration
- **Category:** Board Display
- **Acceptance Criteria:**
  - API endpoint URL is configurable (not hardcoded)
  - Configuration can be changed without modifying source code
  - Default endpoint value is provided for convenience

#### FR-004: Add Task

- **Description:** User shall be able to add a new task to any lane by providing task content
- **Category:** Task Management
- **Acceptance Criteria:**
  - User can initiate task creation from any lane
  - User can enter task content (text)
  - New task appears in the selected lane after successful API call
  - Operation is disabled when backend is unavailable

#### FR-005: Remove Task

- **Description:** User shall be able to remove a task from the board
- **Category:** Task Management
- **Acceptance Criteria:**
  - User can initiate task deletion from any task
  - Confirmation is requested before deletion
  - Task is removed from display after successful API call
  - Operation is disabled when backend is unavailable

#### FR-006: Edit Task

- **Description:** User shall be able to edit the content of an existing task
- **Category:** Task Management
- **Acceptance Criteria:**
  - User can initiate edit mode on any task
  - User can modify task content
  - Updated content appears after successful API call
  - Operation is disabled when backend is unavailable

#### FR-007: Drag and Drop Tasks Between Lanes

- **Description:** User shall be able to drag and drop tasks from one lane to another to change task status
- **Category:** Drag & Drop
- **Acceptance Criteria:**
  - User can drag a task from one lane
  - User can drop the task into a different lane
  - Task's lane assignment is updated via API call
  - Task appears in new lane after successful operation
  - Operation is disabled when backend is unavailable

#### FR-008: Offline Mode (Graceful Degradation)

- **Description:** System shall display the board in read-only mode when backend is unavailable, showing cached data if available or an appropriate message
- **Category:** Error Handling
- **Acceptance Criteria:**
  - Application loads without crashing when backend is unavailable
  - Read-only indicator is displayed to user
  - All mutating operations (add, edit, delete, move) are disabled
  - Clear message indicates backend unavailability
  - If cached data exists, it is displayed (optional enhancement)

#### FR-009: Error Messages

- **Description:** System shall display clear, user-friendly error messages when backend operations fail
- **Category:** Error Handling
- **Acceptance Criteria:**
  - Error messages are displayed in a consistent location
  - Error messages use user-friendly language (no technical jargon)
  - Error messages auto-dismiss after reasonable timeout or can be dismissed manually
  - Different error types have appropriate messaging

**Example error messages:**
- ✅ "Could not save task. Please try again."
- ❌ "Error 500: Internal Server Error"
- ✅ "Unable to connect to server. Check your connection."
- ❌ "ECONNREFUSED 127.0.0.1:3000"

#### FR-010: Loading Indicator

- **Description:** System shall display a loading indicator during API operations to provide user feedback
- **Category:** Visual Feedback
- **Acceptance Criteria:**
  - Loading indicator appears during data fetch operations
  - Loading indicator appears during mutating operations (add, edit, delete, move)
  - Indicator is visually distinct and noticeable
  - Indicator disappears when operation completes (success or failure)

### Important Requirements (P1)

#### FR-011: Add Lane

- **Description:** User shall be able to add a new lane to the board with a specified name
- **Category:** Lane Management
- **Acceptance Criteria:**
  - User can initiate lane creation
  - User can specify lane name
  - New lane appears on the board after successful API call
  - Operation is disabled when backend is unavailable

#### FR-012: Remove Lane

- **Description:** User shall be able to remove a lane from the board
- **Category:** Lane Management
- **Acceptance Criteria:**
  - User can initiate lane deletion
  - Confirmation is requested before deletion
  - System handles tasks in deleted lane appropriately
  - Lane is removed from display after successful API call
  - Operation is disabled when backend is unavailable

#### FR-013: Reorder Lanes

- **Description:** User shall be able to reorder lanes by dragging them to new positions
- **Category:** Lane Management
- **Acceptance Criteria:**
  - User can drag a lane to a new position
  - Lane order is persisted via API call
  - Updated order is reflected in the UI
  - Operation is disabled when backend is unavailable

#### FR-014: Rename Lane

- **Description:** User shall be able to rename an existing lane
- **Category:** Lane Management
- **Acceptance Criteria:**
  - User can initiate edit mode on lane name
  - User can modify lane name
  - Updated name appears after successful API call
  - Operation is disabled when backend is unavailable

#### FR-015: Success Feedback

- **Description:** System shall display brief success confirmation after operations complete successfully
- **Category:** Visual Feedback
- **Acceptance Criteria:**
  - Success message or visual indicator appears after successful operations
  - Feedback is brief and non-intrusive
  - Feedback auto-dismisses after short timeout

#### FR-016: Drag Visual Feedback

- **Description:** System shall provide visual feedback during drag operations showing drop zones and drag state
- **Category:** Drag & Drop
- **Acceptance Criteria:**
  - Dragged item is visually distinguished (opacity change, shadow, etc.)
  - Valid drop zones are highlighted
  - Invalid drop zones are indicated
  - Cursor changes to indicate drag state

#### FR-017: Auto Refresh on Load

- **Description:** System shall automatically fetch and display current board data on initial application load
- **Category:** Board Display
- **Acceptance Criteria:**
  - Board data is fetched from API on page load
  - Loading indicator is shown during fetch
  - Board displays fetched data after successful load
  - Error handling applies if fetch fails

### Enhancement Requirements (P2)

#### FR-018: Reorder Tasks Within Lane

- **Description:** User shall be able to reorder tasks within the same lane by dragging them to new positions
- **Category:** Drag & Drop
- **Acceptance Criteria:**
  - User can drag a task within the same lane
  - Task order is persisted via API call
  - Updated order is reflected in the UI
  - Operation is disabled when backend is unavailable

#### FR-019: Task Count Display

- **Description:** System shall display the count of tasks in each lane in the lane header
- **Category:** Visual Feedback
- **Acceptance Criteria:**
  - Task count is displayed in lane header
  - Count updates dynamically as tasks are added, removed, or moved

#### FR-020: Auto Retry

- **Description:** System shall automatically retry failed API operations once before displaying error
- **Category:** Error Handling
- **Acceptance Criteria:**
  - Failed operations are retried automatically once
  - Retry happens with brief delay
  - If retry succeeds, operation completes normally
  - If retry fails, error message is displayed per FR-009

---

## Non-Functional Requirements

| NFR ID | Priority | Category | Requirement | Target |
|--------|----------|----------|-------------|--------|
| NFR-001 | P0 | Performance | Initial page load time | < 3 seconds |
| NFR-002 | P0 | Performance | UI interaction response time | < 200ms |
| NFR-003 | P0 | Reliability | Graceful degradation when backend unavailable | No crashes, read-only state |
| NFR-004 | P0 | Usability | Intuitive drag-and-drop without instructions | New user success |
| NFR-005 | P1 | Usability | Clear visual feedback for all operations | Immediate feedback |
| NFR-006 | P1 | Usability | Basic keyboard accessibility | Tab, Enter, Escape support |
| NFR-007 | P1 | Maintainability | Component-based architecture | Clear separation of concerns |
| NFR-008 | P1 | Reliability | User-friendly error messages | Non-technical language |

### NFR Details

#### NFR-001: Initial Load Time

- **Requirement:** Application shall complete initial load and render the board within 3 seconds on standard broadband connection
- **Rationale:** Users expect quick application startup
- **Measurement:** Browser dev tools network panel; time to first meaningful paint

#### NFR-002: UI Responsiveness

- **Requirement:** UI shall respond to user interactions (clicks, drag start, form input) within 200 milliseconds
- **Rationale:** Responsive feedback essential for good user experience
- **Measurement:** Manual testing; interactions should feel instantaneous
- **Note:** API response time is separate; UI should show loading state immediately

#### NFR-003: Graceful Degradation

- **Requirement:** Application shall remain stable and display appropriate read-only state when backend API is unavailable, without JavaScript errors or crashes
- **Rationale:** Frontend should demonstrate resilience to backend failures
- **Measurement:** Disconnect backend, verify app displays offline indicator and doesn't crash
- **Acceptance Criteria:**
  - No uncaught JavaScript exceptions
  - Clear "backend unavailable" indicator displayed
  - All mutating buttons/actions disabled
  - Previously loaded data still visible (if any)

#### NFR-004: Intuitive Interaction

- **Requirement:** Drag-and-drop functionality shall work intuitively without instructions, using standard visual conventions
- **Rationale:** Kanban boards rely on intuitive task movement
- **Measurement:** New user can move task between lanes without instructions
- **Visual Conventions:**
  - Dragged item follows cursor
  - Drop zones visually highlighted
  - Cursor changes during drag

#### NFR-005: Visual Feedback

- **Requirement:** All user operations shall provide immediate visual feedback indicating operation state (loading, success, error)
- **Rationale:** Users need to know if their actions are being processed
- **Measurement:** Test each operation type; verify visible feedback within 200ms of action

#### NFR-006: Keyboard Accessibility

- **Requirement:** Core task operations (add, edit, delete) shall be accessible via keyboard without requiring mouse
- **Rationale:** Basic accessibility is good development practice
- **Measurement:** Complete add/edit/delete task using only keyboard
- **Minimum Requirements:**
  - Tab navigation between interactive elements
  - Enter to submit forms/buttons
  - Escape to cancel dialogs/edit mode
  - Focus visible on active elements
- **Note:** Full keyboard drag-and-drop is NOT required

#### NFR-007: Code Structure

- **Requirement:** Frontend code shall be organized into logical, reusable components with clear separation of concerns
- **Rationale:** Demonstrates good frontend architecture for learning purposes
- **Measurement:** Code review; identify distinct components for Board, Lane, Task, forms, etc.
- **Implementation Guidance:**
  - Separate components for: Board, Lane, Task Card, Add/Edit Forms, Error Display
  - API calls isolated from UI components
  - State management clearly organized

#### NFR-008: Error Messaging

- **Requirement:** Error messages shall be user-friendly (non-technical), specific to the operation that failed, and dismissible
- **Rationale:** Clear error communication improves user experience
- **Measurement:** Trigger various errors; verify messages are understandable to non-technical users

---

## UI Design Guidance

### Board Layout

The task board follows a standard Kanban layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Task Board                                            [+ Add Lane] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │ To Do (3)   │  │ In Progress │  │ Done (5)    │                 │
│  │             │  │ (2)         │  │             │                 │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤                 │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │                 │
│  │ │ Task 1  │ │  │ │ Task 4  │ │  │ │ Task 6  │ │                 │
│  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │                 │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │                 │
│  │ │ Task 2  │ │  │ │ Task 5  │ │  │ │ Task 7  │ │                 │
│  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │                 │
│  │ ┌─────────┐ │  │             │  │     ...     │                 │
│  │ │ Task 3  │ │  │             │  │             │                 │
│  │ └─────────┘ │  │             │  │             │                 │
│  │             │  │             │  │             │                 │
│  │ [+ Add Task]│  │ [+ Add Task]│  │ [+ Add Task]│                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
Board
├── Header
│   ├── Title
│   └── Add Lane Button
├── Lane Container (horizontal scroll if needed)
│   └── Lane (repeated for each lane)
│       ├── Lane Header
│       │   ├── Lane Name (editable)
│       │   ├── Task Count
│       │   └── Lane Actions (delete, drag handle)
│       ├── Task List
│       │   └── Task Card (repeated for each task)
│       │       ├── Task Content
│       │       └── Task Actions (edit, delete)
│       └── Add Task Button/Form
├── Error Toast / Notification Area
└── Loading Overlay (when applicable)
```

### Interaction Patterns

**Task Drag-and-Drop:**
1. User clicks and holds on a task card
1. Task card becomes semi-transparent and follows cursor
1. Valid drop zones (lanes) are highlighted
1. User releases over target lane
1. Task animates to new position
1. API call updates backend
1. Success/error feedback displayed

**Offline State:**
- Gray overlay or reduced opacity on action buttons
- Banner or icon indicating "Backend Unavailable"
- Hover on disabled buttons shows "Cannot modify while offline"

**Error Display:**
- Toast notifications in top-right corner
- Auto-dismiss after 5 seconds
- Manual dismiss via X button
- Red/warning color scheme

---

## Backend Integration

### API Reference

The frontend communicates with a REST API backend. See companion specification: [`taskboard-backend-specification.md`](taskboard-backend-specification.md)

### Key Endpoints

| Operation | Method | Endpoint | Request Body |
|-----------|--------|----------|--------------|
| Get board state | `GET` | `/board` | - |
| Create task | `POST` | `/tasks` | `{ laneId, title, description? }` |
| Update task | `PUT` | `/tasks/{taskId}` | `{ title?, description? }` |
| Delete task | `DELETE` | `/tasks/{taskId}` | - |
| Move task | `PATCH` | `/tasks/{taskId}/move` | `{ laneId }` |
| Create lane | `POST` | `/lanes` | `{ name }` |
| Update lane | `PUT` | `/lanes/{laneId}` | `{ name }` |
| Delete lane | `DELETE` | `/lanes/{laneId}` | - |
| Reorder lanes | `PUT` | `/lanes/order` | `{ laneIds: [...] }` |

### Error Handling Patterns

**Network Errors (backend unreachable):**
```javascript
// Pseudo-code pattern
try {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new ApiError(response.status, await response.json());
  }
  return response.json();
} catch (error) {
  if (error instanceof TypeError) {
    // Network error - backend unreachable
    setOfflineMode(true);
    showError("Unable to connect to server. Check your connection.");
  } else if (error instanceof ApiError) {
    // Backend returned error
    showError(getErrorMessage(error.status));
  }
}
```

**Status Code Handling:**

| Status | User Message | Action |
|--------|--------------|--------|
| 200-204 | (Success feedback) | Update UI with response |
| 400 | "Invalid request. Please check your input." | Keep form open, show error |
| 404 | "Item not found. It may have been deleted." | Refresh board data |
| 500 | "Server error. Please try again later." | Offer retry option |
| Network Error | "Unable to connect to server." | Enter offline mode |

### Configuration

The API endpoint should be configurable without code changes:

```javascript
// Example configuration approaches

// Environment variable
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

// Configuration file
const config = {
  apiBaseUrl: 'http://localhost:3000'
};

// Runtime configuration (index.html)
window.APP_CONFIG = {
  apiBaseUrl: 'http://localhost:3000'
};
```

---

## Dependencies & Assumptions

### Dependencies

| Dependency | Description |
|------------|-------------|
| Backend API | REST API per [`taskboard-backend-specification.md`](taskboard-backend-specification.md) |
| Modern browser | Chrome, Firefox, Edge, or Safari with ES6+ support |
| Network access | Ability to make HTTP requests to backend |

### Assumptions

| Assumption | Description |
|------------|-------------|
| Single user | No concurrent access or real-time synchronization needed |
| Desktop-focused | Primary use case is desktop browser (not mobile) |
| Local deployment | Frontend and backend run on same machine or local network |
| No authentication | All requests are trusted; no login required |
| English only | No internationalization required |

---

## Out of Scope

The following features are **explicitly excluded** from this training lab:

- **Authentication & Authorization** - No user login, permissions, or access control
- **Real-time Collaboration** - No multi-user synchronization or live updates
- **Persistent Client Storage** - No offline-first or local storage beyond optional caching
- **Advanced Task Fields** - No due dates, assignees, priorities, labels, or attachments
- **Search & Filter** - No task search or filtering capabilities
- **Undo/Redo** - No action history or rollback functionality
- **Keyboard Shortcuts** - No keyboard navigation beyond standard tab order
- **Full Accessibility (WCAG)** - Best effort but not full compliance
- **Responsive Mobile Design** - Desktop-focused UI
- **Internationalization** - English only

---

## Testing Recommendations

For this training lab, verify the implementation with:

1. **Functional Tests:**
   - Add, edit, delete tasks in each lane
   - Move tasks between lanes via drag-and-drop
   - Add, rename, delete lanes
   - Verify data persists after page refresh

2. **Error Handling Tests:**
   - Stop backend, verify offline mode activates
   - Trigger API errors, verify user-friendly messages
   - Test with slow network (browser dev tools throttling)

3. **Usability Tests:**
   - New user can move task without instructions
   - Loading states are visible during operations
   - Error messages are understandable

4. **Cross-Browser Tests:**
   - Test in Chrome and one other browser (Edge, Firefox)

---

## Glossary

| Term | Definition |
|------|------------|
| Board | The complete task board UI containing all lanes and tasks |
| Lane | A column on the board representing a workflow stage (e.g., "To Do", "In Progress", "Done") |
| Task | A work item card that belongs to a lane |
| Drag-and-drop | UI pattern for moving items by clicking, dragging, and releasing |
| Graceful degradation | Ability to remain functional (in reduced capacity) when dependencies fail |
| Offline mode | Application state when backend is unreachable; read-only operation |

---

*End of Specification*
