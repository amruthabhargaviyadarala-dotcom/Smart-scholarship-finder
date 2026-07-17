# Smart Scholarship Finder

A modern, responsive, AI-powered scholarship finding platform. This application helps students quickly find and match with scholarships based on academic qualifications, household income limits, category demographics, study streams, and regional areas.

---

## 🌟 Key Features

1. **AI Match Recommender**: Computes exact compatibility scores (0-100%) and eligibility ratios (1-10) using a multi-factor weighting algorithm. It outputs natural language recommendations summarizing the eligibility status.
2. **Dynamic Scholarship Search**: Search and filter through realistic Indian & international scholarship schemes instantly using multiple demographic selectors.
3. **Student Profile Dashboard**: Track application statuses, save/bookmark programs, and check upcoming deadlines.
4. **Premium Responsive UI**: Built with a sleek white-and-blue theme, full CSS glassmorphism panels, gradient lettering, and card drop-shadows.

---

## 📂 Project Structure

```text
├── index.html                  # Zero-dependency interactive browser preview (SPA React + Tailwind)
├── README.md                   # Setup guide and instructions
├── backend/                    # FastAPI Server (Python)
│   ├── database.py             # Database engine setup (SQLite/PostgreSQL)
│   ├── models.py               # SQLAlchemy database schema (User, Scholarship, applications...)
│   ├── schemas.py              # Pydantic schemas for serialization
│   ├── recommendation.py       # AI matching recommendation logic
│   ├── seed_data.py            # Database seeding module with 20 realistic programs
│   ├── main.py                 # FastAPI API controller and endpoint routes
│   └── requirements.txt        # Python dependency packages list
└── frontend/                   # React Client (Vite + Tailwind CSS)
    ├── package.json            # npm package dependencies
    ├── vite.config.js          # Vite and server proxy config
    ├── tailwind.config.js      # Tailwind theme tokens configuration
    ├── postcss.config.js       # PostCSS config
    ├── index.html              # Main HTML compiler entry
    └── src/
        ├── main.jsx            # React bootstrap entrypoint
        ├── App.jsx             # React layout router & state sync
        ├── index.css           # Custom styles, glassmorphism, fonts, keyframe animations
        ├── mockData.js         # Shared local database + local matching algorithm
        └── pages/              # SPA modular components
            ├── Home.jsx        # Landing hero and statistics display
            ├── About.jsx       # Challenge vs solution grids
            ├── Search.jsx      # Filterable search panel
            ├── Recommendation.jsx # AI Match form and gauge meters
            ├── Details.jsx     # Tabbed scholarship document checklists
            └── Dashboard.jsx   # Tracker timelines & bookmarks
```

---

## 🚀 Execution Instructions

### Option 1: Zero-Install Quick Preview (Recommended for instant testing)
1. Navigate to the root directory `Smart scholarship finder`.
2. Locate the [index.html](file:///c:/Smart%20scholarship%20finder/index.html) file.
3. Double-click [index.html](file:///c:/Smart%20scholarship%20finder/index.html) (or open it with any standard modern web browser).
4. The entire application runs inside your browser instantly using React & Tailwind via CDN! You can run the AI Recommender, search using filters, save items, submit applications, and see updates on the dashboard without installing any packages or servers.

---

### Option 2: Full Local Stack Execution

#### Step A: Run the FastAPI Backend Server
1. Ensure Python 3.9+ is installed.
2. Open your terminal in the `backend/` directory:
   ```bash
   cd backend
   ```
3. Create a python virtual environment:
   ```bash
   python -m venv venv
   # Activate environment:
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
4. Install python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   *Note: This automatically initializes a local SQLite database file `scholarships.db` and seeds it with 20 realistic scholarship programs on startup. To use **PostgreSQL**, simply define a `DATABASE_URL` environment variable pointing to your active PostgreSQL instance before starting the server.*
6. The backend server will be active at `http://127.0.0.1:8000`. You can inspect raw documentation at `http://127.0.0.1:8000/docs`.

#### Step B: Run the React Frontend Client
1. Ensure Node.js (v18+) is installed.
2. Open a new terminal in the `frontend/` directory:
   ```bash
   cd frontend
   ```
3. Install package dependencies:
   ```bash
   npm install
   ```
4. Launch the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:3000` (Vite dev server). The frontend automatically connects to the FastAPI backend API using internal Vite proxies. If the backend server is not running, the frontend will automatically enter "Demo Mode" and simulate mock API responses locally.
