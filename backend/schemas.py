from pydantic import BaseModel, Field
from typing import List, Optional

# Scholarship schemas
class ScholarshipBase(BaseModel):
    name: str
    provider: str
    description: Optional[str] = None
    qualification: str = "All"
    current_course: str = "All"
    min_cgpa: float = 0.0
    min_percentage: float = 0.0
    category: str = "All"
    max_income: float = 999999999.0
    state: str = "All"
    district: str = "All"
    gender: str = "All"
    field_of_study: str = "All"
    type: str = "Merit"
    amount: str
    last_date: str
    official_website: Optional[str] = None
    documents: Optional[str] = None
    benefits: Optional[str] = None

class ScholarshipCreate(ScholarshipBase):
    pass

class Scholarship(ScholarshipBase):
    id: int

    class Config:
        from_attributes = True

# User schemas
class UserBase(BaseModel):
    username: str
    qualification: Optional[str] = None
    cgpa_percentage: Optional[float] = None
    category: Optional[str] = None
    annual_income: Optional[float] = None
    state: Optional[str] = None
    gender: Optional[str] = None
    course: Optional[str] = None
    field_of_study: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    qualification: Optional[str] = None
    cgpa_percentage: Optional[float] = None
    category: Optional[str] = None
    annual_income: Optional[float] = None
    state: Optional[str] = None
    gender: Optional[str] = None
    course: Optional[str] = None
    field_of_study: Optional[str] = None

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

# Saved Scholarship schemas
class SavedScholarshipCreate(BaseModel):
    scholarship_id: int

class SavedScholarship(BaseModel):
    id: int
    user_id: int
    scholarship_id: int
    scholarship: Scholarship

    class Config:
        from_attributes = True

# Application schemas
class ApplicationCreate(BaseModel):
    scholarship_id: int

class Application(BaseModel):
    id: int
    user_id: int
    scholarship_id: int
    status: str
    applied_date: str
    scholarship: Scholarship

    class Config:
        from_attributes = True

# AI input and output schemas
class AiRecommendationInput(BaseModel):
    qualification: str = Field(..., description="10th, Intermediate, Undergraduate, Postgraduate")
    marks: float = Field(..., description="Percentage or CGPA*10")
    category: str = Field(..., description="General, SC, ST, OBC, Minority")
    income: float = Field(..., description="Annual family income")
    state: str = Field(..., description="Student state of residence")
    course: str = Field(..., description="Target degree course level")
    gender: str = Field(..., description="Male, Female, Other")
    fieldOfStudy: str = Field(..., description="STEM, Arts/Humanities, Commerce")

class AiRecommendationOutput(BaseModel):
    id: int
    name: str
    provider: str
    description: Optional[str]
    type: str
    amount: str
    last_date: str
    official_website: Optional[str]
    documents: Optional[str]
    benefits: Optional[str]
    matchPercentage: int
    eligibilityScore: float
    recommendationReason: str

    class Config:
        from_attributes = True
