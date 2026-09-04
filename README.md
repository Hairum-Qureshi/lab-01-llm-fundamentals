# Lab 01 — LLM Fundamentals

A full-stack chat application built to explore the fundamentals of integrating an LLM into a web application.

The goal of this lab was to answer one engineering question:

> **How does a full-stack application communicate with an LLM, stream its responses, and maintain conversation context?**

---

## What I Built

This application is a simple AI chat interface powered by the **Gemini API**.

The React frontend communicates with a NestJS backend, which handles communication with Gemini. Responses are streamed back to the frontend so users can see the AI response being generated in real time.

The application also maintains a conversation history and sends previous messages as context when making subsequent requests, allowing Gemini to maintain continuity throughout a conversation.

### Core Features

- Send messages to Gemini through a NestJS backend
- Stream Gemini responses to the React frontend
- Maintain conversation history
- Provide previous messages as context to Gemini
- Display user and assistant messages in a chat interface
- Keep the Gemini API key on the backend rather than exposing it to the client

---

## Architecture

```text
React + Vite
      │
      │ HTTP
      ▼
NestJS Backend
      │
      │ Gemini API
      ▼
Gemini
      │
      │ Streaming Response
      ▼
NestJS Backend
      │
      │ Streamed Response
      ▼
React Chat UI
```

Conversation history is maintained by the application and included when sending subsequent requests to Gemini:

```text
User Message
      │
      ▼
Conversation History
      │
      ▼
NestJS Backend
      │
      ▼
Gemini
      │
      ▼
Stream Response
      │
      ▼
React
```

---

## What I Learned

### 1. Communicating with an LLM from a Backend

I learned how to integrate the Gemini API into a NestJS backend and use the backend as the intermediary between the frontend and the LLM.

This keeps the API key on the server rather than exposing it in the React application.

### 2. Streaming LLM Responses

I learned how to stream an LLM's response instead of waiting for the entire response to be generated.

Conceptually:

```text
Without Streaming

User
 ↓
Request
 ↓
[wait]
 ↓
Complete Response


With Streaming

User
 ↓
Request
 ↓
Chunk
 ↓
Chunk
 ↓
Chunk
 ↓
Chunk
 ↓
Complete Response
```

This creates a more responsive chat experience and introduces the concept of incremental data delivery between the backend and frontend.

### 3. Maintaining Conversation Context

I learned that an LLM does not inherently remember previous messages between independent API requests.

To maintain conversation context, I used Gemini's built-in chat functionality through the `ai.chats.create({...})` method. Instead of manually passing the entire conversation history into each prompt, the chat instance maintains the conversation history and uses it as context for subsequent messages.

```text
Message 1
    ↓
Gemini Chat History

Message 2
    ↓
Gemini Chat History

Message 3
    ↓
Gemini
```

The chat application therefore uses Gemini's built-in conversation history to maintain context across messages, allowing Gemini to reference previous messages within the same chat session.

---

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- TailwindCSS

### Backend

- NestJS
- TypeScript
- Gemini API

### Architecture / Tooling

- npm Workspaces
- Turborepo
- Full-stack monorepo

---

## Repository Structure

```text
.
├── apps/
│   ├── backend/          # NestJS backend application
│   └── frontend/         # React + Vite + Tailwind frontend
├── packages/             # Optional shared packages
├── package.json
├── package-lock.json
├── turbo.json
└── README.md
```

---

## Environment Variables

### Frontend

Create a `.env` file in `apps/frontend`:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Backend

Create a `.env` file in `apps/backend`:

```env
PORT=3000
GEMINI_API_KEY=xxx
FRONTEND_URL=http://localhost:5173
```

### Variable Descriptions

`VITE_BACKEND_URL`

The URL used by the React frontend to communicate with the NestJS backend.

`PORT`

The port on which the NestJS backend runs.

`GEMINI_API_KEY`

The API key used by the NestJS backend to communicate with Gemini.

`FRONTEND_URL`

The URL of the frontend application, used for backend CORS configuration.

---

## Prerequisites

You need:

- Node.js (LTS recommended)
- npm (v7+ required for workspaces)
- A Gemini API key

---

## Getting a Gemini API Key

This project uses the Gemini API to communicate with Google's Gemini models.

### 1. Open Google AI Studio

Go to [Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com) and sign in with your Google account.

### 2. Create an API Key

Once you're signed in:

1. Open the **API Keys** section from the dashboard.
2. Click **Create API key**.
3. Select an existing Google Cloud project or allow Google AI Studio to create one for you.
4. Create the key and copy it.

Google AI Studio can automatically create a default project and API key for new users.

### 3. Add the Key to the Backend

Create a `.env` file in the backend application and add your API key:

```env
GEMINI_API_KEY=your_api_key_here
```

The complete backend environment configuration should look like:

```env
PORT=3000
GEMINI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
```

### 4. Keep Your API Key Private

Do **not** commit your API key to GitHub or expose it in the React frontend.

This project keeps the key in the NestJS backend so that requests to Gemini are made server-side.

Make sure your `.env` file is included in `.gitignore`:

```gitignore
.env
```

Google recommends using environment variables for API keys rather than hard-coding them directly into application code.

---

## Installation

From the repository root:

```bash
npm install
```

This installs dependencies for all workspace packages and generates a single `package-lock.json`.

Do not run `npm install` inside individual apps.

---

## Development

Run the frontend and backend concurrently:

```bash
npm run dev
```

Turbo will run the `dev` script for each application.

### Default Ports

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

---

## Completion Criteria

This lab is considered complete when the application can:

- [x] Send a message from React to the NestJS backend
- [x] Send the request from NestJS to Gemini
- [x] Receive a response from Gemini
- [x] Stream the response to the frontend
- [x] Display the streamed response in the chat interface
- [x] Maintain conversation history
- [x] Provide previous conversation messages to Gemini as context

---

## Next Lab

**Lab 02 — Agent Tool Calling**

> How can an LLM decide when my application should perform an action?
