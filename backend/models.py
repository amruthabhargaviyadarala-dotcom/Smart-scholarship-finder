from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, Date
from sqlalchemy.orm import relationship
from database import Base

class Scholarship(Base):
    __tablename__ = "scholarships"

    id = Column(Integer, primary key=True, index=True)
    name = Column(String, index=True, nullable=False)
    provider = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    qualification = Column(String, default="All")  # 10th, Intermediate, Undergraduate, Postgraduate, All
    current_course = Column(String, default="All")  # Diploma, Undergraduate, Postgraduate, All
    min_cgpa = Column(Float, default=0.0)
    min_percentage = Column(Float, default=0.0)
    category = Column(String, default="All")        # SC, ST, OBC, General, Minority, All
    max_income = Column(Float, default=999999999.0)
    state = Column(String, default="All")
    district = Column(String, default="All")
    gender = Column(String, default="All")          # Male, Female, Other, All
    field_of_study = Column(String, default="All")  # STEM, Arts/Humanities, Commerce, All
    type = Column(String, default="Merit")          # Merit, Means, Merit-cum-Means
    amount = Column(String, nullable=False)
    last_date = Column(String, nullable=False)      # ISO string date
    official_website = Column(String, nullable=True)
    documents = Column(Text, nullable=True)         # JSON-string or comma-separated list
    benefits = Column(Text, nullable=True)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    qualification = Column(String, nullable=True)
    cgpa_percentage = Column(Float, nullable=True)
    category = Column(String, nullable=True)
    annual_income = Column(Float, nullable=True)
    state = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    course = Column(String, nullable=True)
    field_of_study = Column(String, nullable=True)

    saved_scholarships = relationship("SavedScholarship", back_populates="user", cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="user", cascade="all, delete-orphan")

class SavedScholarship(Base):
    __tablename__ = "saved_scholarships"

    id = Column(Integer, primary key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"), nullable=False)

    user = relationship("User", back_populates="saved_scholarships")
    scholarship = relationship("Scholarship")

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"), nullable=False)
    status = Column(String, default="Applied")  # Applied, Under Review, Approved, Rejected
    applied_date = Column(String, nullable=False)

    user = relationship("User", back_populates="applications")
    scholarship = relationship("Scholarship")
