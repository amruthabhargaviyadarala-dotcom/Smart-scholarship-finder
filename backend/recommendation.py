from typing import List, Dict, Any
import models
import schemas

def calculate_scholarship_match(student: schemas.AiRecommendationInput, scholarship: models.Scholarship) -> schemas.AiRecommendationOutput:
    score = 0
    reasons = []

    # 1. Qualification Level Match (Weight: 20)
    levels = ["10th", "Intermediate", "Undergraduate", "Postgraduate"]
    
    if scholarship.qualification == "All" or scholarship.qualification == student.qualification:
        score += 20
    else:
        try:
            student_idx = levels.index(student.qualification)
            sch_idx = levels.index(scholarship.qualification)
            # If student qualification is higher than scholarship requirement, they are eligible
            if student_idx >= sch_idx:
                score += 15
        except ValueError:
            # Fallback if text is different
            pass

    # 2. Academic Merit Match (Weight: 25)
    req_marks = scholarship.min_percentage if scholarship.min_percentage > 0 else (scholarship.min_cgpa * 10)
    if student.marks >= req_marks:
        score += 25
        reasons.append(f"Your academic score of {student.marks}% meets or exceeds the required {req_marks}%.")
    else:
        diff = req_marks - student.marks
        if diff <= 10:
            score += 10  # Partial match
            reasons.append(f"Your academic score ({student.marks}%) is close to the preferred threshold of {req_marks}%.")

    # 3. Category & Gender (Weight: 20)
    # Category (SC, ST, OBC, General, Minority, All)
    if scholarship.category == "All":
        score += 10
    elif student.category in scholarship.category:
        score += 15
        reasons.append(f"You belong to the targeted category demographic ('{student.category}').")
    
    # Gender (Male, Female, Other, All)
    if scholarship.gender == "All":
        score += 10
    elif scholarship.gender.lower() == student.gender.lower():
        score += 10
        reasons.append(f"This scheme matches or prioritizes {student.gender} candidates.")

    # 4. Income Alignment (Weight: 20)
    if scholarship.max_income >= 999999999.0:
        score += 20
    elif student.income <= scholarship.max_income:
        score += 20
        reasons.append(f"Your family income (₹{student.income:,.2f}) complies with the maximum limit of ₹{scholarship.max_income:,.2f}.")
    else:
        diff = student.income - scholarship.max_income
        if diff <= 100000:
            score += 5  # Margin of proximity
            reasons.append("Your household income is slightly above the strict bracket but remains competitive.")

    # 5. State Alignment (Weight: 15)
    if scholarship.state == "All":
        score += 15
    elif scholarship.state.lower() == student.state.lower():
        score += 15
        reasons.append(f"This fund is state-sponsored for students residing in {student.state}.")

    # Cap final scores between 0 and 100
    match_percentage = int(min(100, max(0, score)))
    eligibility_score = round(match_percentage / 10.0, 1)

    # Compile dynamic text explanation
    if len(reasons) > 0:
        reason_text = "Highly recommended based on your profile alignment: " + " ".join(reasons)
    else:
        reason_text = "Your basic details satisfy the broad eligibility framework of this scholarship."

    return schemas.AiRecommendationOutput(
        id=scholarship.id,
        name=scholarship.name,
        provider=scholarship.provider,
        description=scholarship.description,
        type=scholarship.type,
        amount=scholarship.amount,
        last_date=scholarship.last_date,
        official_website=scholarship.official_website,
        documents=scholarship.documents,
        benefits=scholarship.benefits,
        matchPercentage=match_percentage,
        eligibilityScore=eligibility_score,
        recommendationReason=reason_text
    )
