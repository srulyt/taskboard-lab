# Task Board Backend API - Specification

- **Version:** 1.0
- **Date:** 2026-01-19
- **Status:** Draft
- **Type:** Training Lab Exercise

---

## Executive Summary

This specification defines a REST API backend for a lightweight Trello-like task board application. The API enables creating, reading, updating, and deleting tasks organized into lanes (columns), with all data persisted to a local JSON file.

This is a **training lab exercise** designed to teach REST API development fundamentals. The scope is intentionally limited to core kanban functionality without authentication, multi-user support, or production-grade features.

The backend shall support a single board with multiple lanes and tasks, providing endpoints for full CRUD operations on both entities while maintaining data integrity through atomic file writes.

---

## Goals

This training lab aims to achieve the following learning objectives:

| Goal | Description |
|------|-------------|
| REST API Fundamentals | Implement standard REST conventions with proper HTTP methods and status codes |
| Data Persistence | Learn file-based storage patterns with atomic writes and crash recovery |
| API Design | Practice designing clean, intuitive resource endpoints |
| Code Organization | Demonstrate separation of concerns between routing, business logic, and data access |

---

## Functional Requirements

### Requirements Summary

| Req ID | Priority | Category | Description |
|--------|----------|----------|-------------|
| FR-001 | P0 | Board Management | Return complete board state with all lanes and tasks |
| FR-002 | P0 | Task Management | Create a new task in a specified lane |
| FR-003 | P0 | Task Management | Retrieve a single task by ID |
| FR-004 | P0 | Task Management | Update task properties (title, description) |
| FR-005 | P0 | Task Management | Delete a task by ID |
| FR-006 | P0 | Task Management | Move a task to a different lane |
| FR-007 | P0 | Lane Management | Create a new lane on the board |
| FR-008 | P1 | Lane Management | Update lane properties (name) |
| FR-009 | P1 | Lane Management | Delete a lane from the board |
| FR-010 | P1 | Lane Management | Reorder lanes on the board |
| FR-011 | P0 | Data Persistence | Persist all board data to local disk file |
| FR-012 | P0 | Data Persistence | Load board data from disk file on startup |
| FR-013 | P1 | API Design | Follow REST conventions for resource endpoints |
| FR-014 | P1 | API Design | Return appropriate HTTP status codes |
| FR-015 | P2 | Task Management | Reorder tasks within a lane |
| FR-016 | P2 | Board Management | Reset board to default state |

### Critical Requirements (P0)

#### FR-001: Get Board State

- **Description:** API shall return the complete board state including all lanes and their tasks in a single response
- **Category:** Board Management
- **Endpoint:** `GET /board`
- **Acceptance Criteria:**
  - Response includes all lanes in display order
  - Each lane includes its tasks in position order
  - Response format is valid JSON

#### FR-002: Create Task

- **Description:** API shall create a new task in a specified lane with title as required field
- **Category:** Task Management
- **Endpoint:** `POST /tasks`
- **Acceptance Criteria:**
  - Request body includes `laneId` and `title` (required)
  - Request body may include `description` (optional)
  - Returns created task with generated unique ID
  - Returns `201 Created` on success
  - Returns `400 Bad Request` if required fields missing
  - Returns `404 Not Found` if lane does not exist

#### FR-003: Get Task

- **Description:** API shall retrieve a single task by its unique identifier
- **Category:** Task Management
- **Endpoint:** `GET /tasks/{taskId}`
- **Acceptance Criteria:**
  - Returns task object with all properties
  - Returns `404 Not Found` if task does not exist

#### FR-004: Update Task

- **Description:** API shall update task properties (title, description) for an existing task
- **Category:** Task Management
- **Endpoint:** `PUT /tasks/{taskId}` or `PATCH /tasks/{taskId}`
- **Acceptance Criteria:**
  - Allows updating `title` and/or `description`
  - Returns updated task object
  - Returns `404 Not Found` if task does not exist
  - Returns `400 Bad Request` for invalid input

#### FR-005: Delete Task

- **Description:** API shall delete a task by its unique identifier and remove it from its lane
- **Category:** Task Management
- **Endpoint:** `DELETE /tasks/{taskId}`
- **Acceptance Criteria:**
  - Removes task from board data
  - Returns `204 No Content` on success
  - Returns `404 Not Found` if task does not exist

#### FR-006: Move Task

- **Description:** API shall move a task from one lane to another lane
- **Category:** Task Management
- **Endpoint:** `PATCH /tasks/{taskId}` with lane identifier or `POST /tasks/{taskId}/move`
- **Acceptance Criteria:**
  - Task is removed from source lane
  - Task is added to target lane
  - Returns updated task object
  - Returns `404 Not Found` if task or target lane does not exist

#### FR-007: Create Lane

- **Description:** API shall create a new lane on the board with a name
- **Category:** Lane Management
- **Endpoint:** `POST /lanes`
- **Acceptance Criteria:**
  - Request body includes `name` (required)
  - Returns created lane with generated unique ID
  - Returns `201 Created` on success
  - Lane is added to end of display order

#### FR-011: Persist Data

- **Description:** System shall persist all board data (lanes and tasks) to a local disk file after each modification
- **Category:** Data Persistence
- **Acceptance Criteria:**
  - Data file is updated after every create, update, delete, or move operation
  - File format is JSON
  - Writes are atomic (no partial writes)

#### FR-012: Load Data

- **Description:** System shall load board data from the local disk file when the server starts
- **Category:** Data Persistence
- **Acceptance Criteria:**
  - Server loads existing data on startup
  - If no file exists, initializes with empty board or default lanes
  - Invalid file content is handled gracefully

### Important Requirements (P1)

#### FR-008: Update Lane

- **Description:** API shall update lane properties (name) for an existing lane
- **Category:** Lane Management
- **Endpoint:** `PUT /lanes/{laneId}` or `PATCH /lanes/{laneId}`
- **Acceptance Criteria:**
  - Allows updating lane `name`
  - Returns updated lane object
  - Returns `404 Not Found` if lane does not exist

#### FR-009: Delete Lane

- **Description:** API shall delete a lane from the board by its unique identifier
- **Category:** Lane Management
- **Endpoint:** `DELETE /lanes/{laneId}`
- **Acceptance Criteria:**
  - One of the following behaviors for tasks in deleted lane:
    - Delete all tasks in the lane, OR
    - Reject deletion if lane contains tasks
  - Returns `204 No Content` on success
  - Returns `404 Not Found` if lane does not exist

#### FR-010: Reorder Lanes

- **Description:** API shall support changing the display order of lanes on the board
- **Category:** Lane Management
- **Endpoint:** `PUT /lanes/order` or `PATCH /board/lanes`
- **Acceptance Criteria:**
  - Request body specifies new lane order
  - All lanes are reordered according to request
  - Returns `400 Bad Request` for invalid lane IDs

#### FR-013: REST Conventions

- **Description:** API shall follow REST conventions using standard HTTP methods (GET, POST, PUT/PATCH, DELETE) for resource operations
- **Category:** API Design
- **Acceptance Criteria:**
  - GET for retrieval (no side effects)
  - POST for creation
  - PUT/PATCH for updates
  - DELETE for removal
  - Resource URLs use nouns, not verbs

#### FR-014: HTTP Status Codes

- **Description:** API shall return appropriate HTTP status codes
- **Category:** API Design
- **Acceptance Criteria:**
  - `200 OK` for successful GET and PUT/PATCH
  - `201 Created` for successful POST
  - `204 No Content` for successful DELETE
  - `400 Bad Request` for invalid input
  - `404 Not Found` for missing resources
  - `500 Internal Server Error` for server failures

### Enhancement Requirements (P2)

#### FR-015: Reorder Tasks

- **Description:** API shall support reordering tasks within a single lane
- **Category:** Task Management
- **Endpoint:** `PUT /lanes/{laneId}/tasks/order`
- **Acceptance Criteria:**
  - Request body specifies new task order within lane
  - Task positions are updated
  - Returns `400 Bad Request` for invalid task IDs

#### FR-016: Reset Board

- **Description:** API shall support resetting the board to a default or empty state
- **Category:** Board Management
- **Endpoint:** `POST /board/reset` or `DELETE /board`
- **Acceptance Criteria:**
  - Removes all lanes and tasks
  - Optionally creates default lanes (e.g., "To Do", "In Progress", "Done")
  - Data file is updated

---

## Non-Functional Requirements

| NFR ID | Priority | Category | Requirement | Target |
|--------|----------|----------|-------------|--------|
| NFR-001 | P0 | Performance | API response time | < 500ms for all operations |
| NFR-002 | P0 | Reliability | Atomic data writes | No partial writes corrupt data file |
| NFR-003 | P0 | Reliability | Crash recovery | Load last valid state after restart |
| NFR-004 | P0 | Capacity | Minimum data support | 100 tasks, 10 lanes |
| NFR-005 | P1 | Maintainability | Human-readable storage | Pretty-printed JSON file |
| NFR-006 | P1 | Maintainability | Code structure | Separation of concerns (routing, logic, data) |
| NFR-007 | P1 | Reliability | Input validation | Graceful handling of malformed requests |

### NFR Details

#### NFR-001: API Response Time

- **Requirement:** API shall respond to all requests within 500ms under normal conditions
- **Rationale:** Ensures responsive user experience for the training lab frontend
- **Measurement:** Manual testing with browser developer tools or curl

#### NFR-002: Atomic Data Writes

- **Requirement:** System shall write data atomically, preventing partial writes from corrupting the data file
- **Rationale:** Prevents data loss if server crashes during write
- **Implementation Guidance:** Use write-to-temp-then-rename pattern

#### NFR-003: Crash Recovery

- **Requirement:** System shall load and operate correctly from the last valid saved state after unexpected restart
- **Rationale:** Users expect board state to persist across server restarts
- **Measurement:** Kill server process, restart, verify data intact

#### NFR-004: Minimum Capacity

- **Requirement:** System shall support at minimum 100 tasks across 10 lanes without performance degradation
- **Rationale:** Sufficient capacity for training lab exercises
- **Measurement:** Create 100 tasks across 10 lanes, verify all operations remain responsive

#### NFR-005: Human-Readable Storage

- **Requirement:** Data file shall use human-readable JSON format with proper indentation
- **Rationale:** Training lab context - students should be able to inspect stored data
- **Measurement:** Open data file in text editor, verify readability

#### NFR-006: Code Structure

- **Requirement:** Backend code shall maintain clear separation between HTTP handling, business logic, and data persistence layers
- **Rationale:** Demonstrates good architectural practices for learning purposes
- **Measurement:** Code review showing distinct modules for routes, services, and data access

#### NFR-007: Input Validation

- **Requirement:** System shall validate all incoming request data and return `400 Bad Request` for invalid input without crashing
- **Rationale:** Prevents server errors from malformed input
- **Measurement:** Send malformed JSON, missing fields, invalid IDs; verify proper error responses

---

## API Design

### Suggested REST Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/board` | Get complete board state | - | Board object with lanes and tasks |
| `POST` | `/tasks` | Create a new task | `{ laneId, title, description? }` | Created task |
| `GET` | `/tasks/{taskId}` | Get a specific task | - | Task object |
| `PUT` | `/tasks/{taskId}` | Update a task | `{ title?, description? }` | Updated task |
| `DELETE` | `/tasks/{taskId}` | Delete a task | - | 204 No Content |
| `PATCH` | `/tasks/{taskId}/move` | Move task to another lane | `{ laneId }` | Updated task |
| `POST` | `/lanes` | Create a new lane | `{ name }` | Created lane |
| `PUT` | `/lanes/{laneId}` | Update a lane | `{ name }` | Updated lane |
| `DELETE` | `/lanes/{laneId}` | Delete a lane | - | 204 No Content |
| `PUT` | `/lanes/order` | Reorder lanes | `{ laneIds: [...] }` | Updated board |
| `PUT` | `/lanes/{laneId}/tasks/order` | Reorder tasks in lane | `{ taskIds: [...] }` | Updated lane |
| `POST` | `/board/reset` | Reset board to default | - | Reset board |

### Example Request/Response

**Create Task:**

```http
POST /tasks
Content-Type: application/json

{
  "laneId": "lane-1",
  "title": "Implement login page",
  "description": "Create the login form with email and password fields"
}
```

**Response:**

```json
{
  "id": "task-123",
  "laneId": "lane-1",
  "title": "Implement login page",
  "description": "Create the login form with email and password fields",
  "createdAt": "2026-01-19T10:30:00Z"
}
```

**Get Board:**

```http
GET /board
```

**Response:**

```json
{
  "lanes": [
    {
      "id": "lane-1",
      "name": "To Do",
      "position": 0,
      "tasks": [
        {
          "id": "task-123",
          "title": "Implement login page",
          "description": "Create the login form",
          "position": 0
        }
      ]
    },
    {
      "id": "lane-2",
      "name": "In Progress",
      "position": 1,
      "tasks": []
    }
  ]
}
```

---

## Data Model

### Recommended JSON File Structure

```json
{
  "lanes": [
    {
      "id": "lane-1",
      "name": "To Do",
      "position": 0
    },
    {
      "id": "lane-2",
      "name": "In Progress",
      "position": 1
    },
    {
      "id": "lane-3",
      "name": "Done",
      "position": 2
    }
  ],
  "tasks": [
    {
      "id": "task-1",
      "laneId": "lane-1",
      "title": "Sample task",
      "description": "This is a sample task",
      "position": 0,
      "createdAt": "2026-01-19T10:00:00Z"
    }
  ]
}
```

### Entity Definitions

**Task:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (generated) |
| `laneId` | string | Yes | Reference to containing lane |
| `title` | string | Yes | Task title |
| `description` | string | No | Task description |
| `position` | number | No | Order within lane (for P2 reordering) |
| `createdAt` | string | No | ISO 8601 timestamp |

**Lane:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (generated) |
| `name` | string | Yes | Lane display name |
| `position` | number | Yes | Display order on board |

---

## Dependencies & Assumptions

### Dependencies

| Dependency | Description |
|------------|-------------|
| Local file system | Write access to store JSON data file |
| HTTP server capability | Ability to listen on a network port |

### Assumptions

| Assumption | Description |
|------------|-------------|
| Single user | No concurrent access; single user at a time |
| Local deployment | Server and data file on same machine |
| Small data volume | Data fits comfortably in memory |
| No authentication | All requests are trusted |

---

## Out of Scope

The following features are **explicitly excluded** from this training lab:

- **Authentication/Authorization** - No user login or access control
- **Multi-board support** - Single board only
- **User management** - No users, no ownership tracking
- **Real-time updates** - REST API only, no WebSockets
- **Task assignments** - No user assignment feature
- **Due dates/reminders** - Keep tasks simple
- **Labels/tags** - Keep tasks simple
- **Comments on tasks** - Keep tasks simple
- **File attachments** - Keep tasks simple
- **Search/filtering** - Basic board retrieval only
- **Undo/redo** - No operation history
- **Database storage** - Local JSON file only
- **Deployment/containerization** - Local development only
- **Monitoring/logging** - No production observability
- **Rate limiting** - No API throttling

---

## Testing Recommendations

For this training lab, verify the implementation with:

1. **Functional Tests:**
   - Test all CRUD operations for tasks and lanes
   - Verify error responses for invalid inputs
   - Test edge cases (empty board, missing IDs)

2. **Persistence Tests:**
   - Create data, restart server, verify data persists
   - Test crash recovery by killing server mid-operation

3. **Capacity Test:**
   - Create 100 tasks across 10 lanes
   - Verify acceptable response times

4. **Error Handling Tests:**
   - Send malformed JSON
   - Request non-existent resources
   - Omit required fields

---

## Glossary

| Term | Definition |
|------|------------|
| Board | The complete task board containing all lanes and tasks |
| Lane | A column on the board representing a workflow stage (e.g., "To Do", "In Progress", "Done") |
| Task | A work item card that belongs to a lane |
| CRUD | Create, Read, Update, Delete - the four basic data operations |
| REST | Representational State Transfer - an architectural style for web APIs |
| Atomic write | A write operation that either completes fully or not at all, preventing partial/corrupted data |

---

*End of Specification*
