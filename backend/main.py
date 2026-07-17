from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import datetime

import models
import schemas
from database import get_db, Base, engine
from seed_data import seed_db
import recommendation

app = FastAPI(
    title="Smart Scholarship Finder API",
    description="Backend API powering AI recommendations and student dashboards.",
    version="1.0.0"
)

# CORS configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# On startup, initialize tables and seed data
@app.on_event("startup")
def startup_event():
    try:
        seed_db()
        print("Database initialized and seeded.")
    except Exception as e:
        print(f"Startup database initialization error: {e}")

# ==================== SCHOLARSHIPS API ====================

@app.get("/api/scholarships", response_model=List[schemas.Scholarship])
def read_scholarships(
    search: Optional[str] = None,
    qualification: Optional[str] = None,
    current_course: Optional[str] = None,
    max_income: Optional[float] = None,
    category: Optional[str] = None,
    state: Optional[str] = None,
    field_of_study: Optional[str] = None,
    scholarship_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Scholarship)

    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (models.Scholarship.name.ilike(search_filter)) |
            (models.Scholarship.provider.ilike(search_filter)) |
            (models.Scholarship.description.ilike(search_filter))
        )
    
    if qualification and qualification != "All":
        query = query.filter((models.Scholarship.qualification == "All") | (models.Scholarship.qualification == qualification))
        
    if current_course and current_course != "All":
        query = query.filter((models.Scholarship.current_course == "All") | (models.Scholarship.current_course == current_course))
        
    if max_income is not None:
        query = query.filter(models.Scholarship.max_income >= max_income)
        
    if category and category != "All":
        query = query.filter((models.Scholarship.category == "All") | (models.Scholarship.category.contains(category)))
        
    if state and state != "All":
        query = query.filter((models.Scholarship.state == "All") | (models.Scholarship.state == state))
        
    if field_of_study and field_of_study != "All":
        query = query.filter((models.Scholarship.field_of_study == "All") | (models.Scholarship.field_of_study == field_of_study))
        
    if scholarship_type and scholarship_type != "All":
        query = query.filter(models.Scholarship.type == scholarship_type)

    return query.all()

@app.get("/api/scholarships/{scholarship_id}", response_model=schemas.Scholarship)
def read_scholarship(scholarship_id: int, db: Session = Depends(get_db)):
    db_scholarship = db.query(models.Scholarship).filter(models.Scholarship.id == scholarship_id).first()
    if not db_scholarship:
        raise HTTPException(status_code=404, detail="Scholarship program not found")
    return db_scholarship

# ==================== AI RECOMMENDATIONS API ====================

@app.post("/api/recommendations", response_model=List[schemas.AiRecommendationOutput])
def get_recommendations(student: schemas.AiRecommendationInput, db: Session = Depends(get_db)):
    scholarships = db.query(models.Scholarship).all()
    recommendations_list = []
    
    for sch in scholarships:
        rec_result = recommendation.calculate_scholarship_match(student, sch)
        recommendations_list.append(rec_result)
        
    # Sort recommendations by match percentage in descending order
    recommendations_list.sort(key=lambda x: x.matchPercentage, reverse=True)
    return recommendations_list

# ==================== USER PROFILE & ACTION PORTAL ====================

@app.get("/api/users/{username}", response_model=schemas.User)
def get_user_profile(username: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        # Create a default user profile automatically to support easy exploration
        user = models.User(
            username=username,
            qualification="Intermediate",
            cgpa_percentage=80.0,
            category="General",
            annual_income=400000.0,
            state="Maharashtra",
            gender="Female",
            course="Undergraduate",
            field_of_study="STEM"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

@app.put("/api/users/{username}/profile", response_model=schemas.User)
def update_user_profile(username: str, profile_update: schemas.UserUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")
        
    update_data = profile_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
        
    db.commit()
    db.refresh(user)
    return user

@app.get("/api/users/{username}/saved", response_model=List[schemas.SavedScholarship])
def get_saved_scholarships(username: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")
        
    return db.query(models.SavedScholarship).filter(models.SavedScholarship.user_id == user.id).all()

@app.post("/api/users/{username}/saved", response_model=schemas.SavedScholarship)
def save_scholarship(username: str, payload: schemas.SavedScholarshipCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")
        
    # Check if already saved
    existing = db.query(models.SavedScholarship).filter(
        models.SavedScholarship.user_id == user.id,
        models.SavedScholarship.scholarship_id == payload.scholarship_id
    ).first()
    if existing:
        return existing

    saved_item = models.SavedScholarship(user_id=user.id, scholarship_id=payload.scholarship_id)
    db.add(saved_item)
    db.commit()
    db.refresh(saved_item)
    return saved_item

@app.delete("/api/users/{username}/saved/{scholarship_id}")
def unsave_scholarship(username: str, scholarship_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")
        
    saved_item = db.query(models.SavedScholarship).filter(
        models.SavedScholarship.user_id == user.id,
        models.SavedScholarship.scholarship_id == scholarship_id
    ).first()
    
    if not saved_item:
        raise HTTPException(status_code=404, detail="Saved bookmark not found")
        
    db.delete(saved_item)
    db.commit()
    return {"message": "Bookmark successfully deleted"}

@app.get("/api/users/{username}/applications", response_model=List[schemas.Application])
def get_user_applications(username: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")
        
    return db.query(models.Application).filter(models.Application.user_id == user.id).all()

@app.post("/api/users/{username}/apply", response_model=schemas.Application)
def apply_scholarship(username: str, payload: schemas.ApplicationCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")
        
    # Check if already applied
    existing = db.query(models.Application).filter(
        models.Application.user_id == user.id,
        models.Application.scholarship_id == payload.scholarship_id
    ).first()
    if existing:
        return existing
        
    today_str = datetime.date.today().isoformat()
    new_application = models.Application(
        user_id=user.id,
        scholarship_id=payload.scholarship_id,
        status="Applied",
        applied_date=today_str
    )
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    return new_application
