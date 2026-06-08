# MyPustak Post Manager

A complete, production-ready Full Stack Post Management Application built for the **MyPustak Full Stack Developer Hiring Challenge**. This application features a robust FastAPI backend with in-memory thread-safe state storage and validation, and a beautiful React + Vite + TypeScript frontend powered by Tailwind CSS.

### Live Deployments
- **Frontend App (Netlify)**: [https://mypustak-fullstack-post-manager.netlify.app/](https://mypustak-fullstack-post-manager.netlify.app/)
- **Backend API (Render)**: [https://mypustak-fullstack-post-manager.onrender.com](https://mypustak-fullstack-post-manager.onrender.com)

The application utilizes Vite-native environment variables, enabling zero-code configuration changes when moving from local development to production hosting.

---

## Key Features

- **Dynamic Environment Configuration**: The frontend integrates Vite environment files (`.env`) to dynamically configure the API base URL without hardcoded localhost settings.
- **In-Memory Thread-Safe Data Store**: Serves pre-seeded data and safely manages writes and deletions concurrently.
- **Strict Typing**: Comprehensive TypeScript typing throughout the frontend (APIs, components, models) with strict compiler checks.
- **Whitespace Sanitization**: Field level auto-trimming and empty validation in both frontend form inputs and backend Pydantic models.
- **Premium User Experience (UX)**:
  - Gradient typography header.
  - Interactive post submission form with instant input error validation.
  - Inline card-level delete confirmation to prevent invasive browser popups.
  - Auto-dismissing success/error toast alerts.
  - Live loading spinners during fetch operations and state updates.
  - Dynamic empty state when no posts exist.
- **Responsive Layout**: Designed for optimal reading on Desktop, Tablet, and Mobile devices.
- **Error Boundary**: Catch and display rendering exceptions gracefully instead of crashing the client.

---

## Tech Stack

- **Backend**: FastAPI, Pydantic v2, Uvicorn
- **Frontend**: React 18, Vite, TypeScript, Axios
- **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer
- **Icons**: Lucide React

---

## Folder Structure

```
mypustak-fullstack-post-manager/
│
├── backend/
│   ├── main.py
│   ├── routes/
│   │   └── posts.py
│   ├── schemas.py
│   ├── data.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostForm.tsx
│   │   │   ├── PostCard.tsx
│   │   │   └── Loading.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │   └── Post.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

---

## Installation & Setup

### 1. Environment Configurations (Frontend)

To point the frontend to the correct backend host:

1. Create a `.env` file inside the `frontend/` directory (if not already present):
   ```
   frontend/.env
   ```
2. Populate the environment variable:
   - For **Local Development**:
     ```env
     VITE_API_URL=http://localhost:8000
     ```
   - For **Production/Hosted Deployment**:
     ```env
     VITE_API_URL=https://mypustak-fullstack-post-manager.onrender.com
     ```

### 2. Backend Setup

Ensure you have Python 3.9+ installed.

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```
4. The server runs at **`http://localhost:8000`**. You can view the automated Swagger API docs at **`http://localhost:8000/docs`**.

### 3. Frontend Setup

Ensure you have Node.js 18+ installed.

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the package dependencies:
   ```bash
   npm install
   ```
3. Run the Vite local development server:
   ```bash
   npm run dev
   ```
4. The app is served at **`http://localhost:5173`**.

---

## API Endpoints

| Method | Endpoint | Request Body | Response Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/posts` | None | `200 OK` | Retrieves all posts. |
| **POST** | `/posts` | `{ "title": "string", "body": "string" }` | `201 Created` | Creates a new post with validation and unique ID generation. |
| **DELETE**| `/posts/{id}` | None | `200 OK` or `404 Not Found` | Deletes a post by its ID. |

---

## Future Improvements

1. **Persistent Database**: Replace in-memory database storage with a SQLite or PostgreSQL database using SQLModel or SQLAlchemy ORM.
2. **User Authentication**: Implement JWT session tokens to secure endpoint routes and isolate posts per user account.
3. **Markdown Post Formatting**: Integrate a rich-text or markdown editor (like TipTap or Quill) for blogging capabilities.
4. **Search and Pagination**: Add text indexing and server-side limit/offset querying.
