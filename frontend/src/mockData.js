export const SCHOLARSHIPS_DB = [
  {
      id: 1,
      name: "National Merit Scholarship (MHRD)",
      provider: "Ministry of Human Resource Development, Govt of India",
      description: "Financial assistance for meritorious students from low-income families to meet a part of their day-to-day expenses while pursuing higher studies.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 8.0,
      minPercentage: 80,
      category: "General",
      maxIncome: 800000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Merit-cum-Means",
      amount: "₹ 20,000 / Year",
      lastDate: "2026-10-31",
      officialWebsite: "https://scholarships.gov.in",
      documents: ["Class 12 Marksheet", "Income Certificate", "Caste Certificate", "Aadhaar Card", "Bank Passbook"],
      benefits: "₹10,000 per annum for the first three years of undergraduate studies, and ₹20,000 per annum for postgraduate studies."
  },
  {
      id: 2,
      name: "AICTE Pragati Scholarship for Girls",
      provider: "All India Council for Technical Education (AICTE)",
      description: "Empowering girls to pursue technical education by providing financial assistance. Maximum two girls per family can apply.",
      qualification: "10th",
      currentCourse: "Diploma",
      minCGPA: 6.0,
      minPercentage: 60,
      category: "All",
      maxIncome: 800000,
      state: "All",
      district: "All",
      gender: "Female",
      fieldOfStudy: "STEM",
      type: "Merit",
      amount: "₹ 50,000 / Year",
      lastDate: "2026-11-15",
      officialWebsite: "https://www.aicte-india.org",
      documents: ["Admit Card/Marksheet", "Income Certificate", "Tuition Fee Receipt", "Category Certificate", "Aadhaar Card"],
      benefits: "₹50,000 per annum directly transferred as lump sum amount to meet tuition fee, purchase of books, equipment, and soft wares."
  },
  {
      id: 3,
      name: "Adobe Research Women-in-Technology Scholarship",
      provider: "Adobe Research",
      description: "Recognizing outstanding female students in computer science and technology globally, encouraging them to excel in STEM fields.",
      qualification: "Undergraduate",
      currentCourse: "Undergraduate",
      minCGPA: 8.5,
      minPercentage: 85,
      category: "All",
      maxIncome: 999999999,
      state: "All",
      district: "All",
      gender: "Female",
      fieldOfStudy: "STEM",
      type: "Merit",
      amount: "$ 20,000 (One-time)",
      lastDate: "2026-09-30",
      officialWebsite: "https://research.adobe.com/scholarship/",
      documents: ["Resume/CV", "Academic Transcripts", "3 Letters of Recommendation", "Statement of Purpose"],
      benefits: "A one-time scholarship of $20,000. Plus, a mentorship program and an internship opportunity at Adobe Research."
  },
  {
      id: 4,
      name: "Reliance Foundation Undergraduate Scholarship",
      provider: "Reliance Foundation",
      description: "Supporting meritorious students from diverse backgrounds across India to pursue undergraduate education in any stream.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 7.0,
      minPercentage: 70,
      category: "All",
      maxIncome: 1500000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Merit-cum-Means",
      amount: "₹ 2,00,000 (Up to)",
      lastDate: "2026-10-15",
      officialWebsite: "https://www.reliancefoundation.org",
      documents: ["Class 10 & 12 Marksheets", "Income Certificate", "Bonafide Student Certificate", "Aadhaar Card"],
      benefits: "Support of up to ₹2,00,000 over the duration of the degree course plus access to a strong alumni network and mentorship."
  },
  {
      id: 5,
      name: "INSPIRE Scholarship for Higher Education (SHE)",
      provider: "Department of Science & Technology, Govt of India",
      description: "Attracting talented youth to study natural and basic sciences at the Bachelor and Master levels.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 8.0,
      minPercentage: 80,
      category: "All",
      maxIncome: 999999999,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "STEM",
      type: "Merit",
      amount: "₹ 80,000 / Year",
      lastDate: "2026-12-31",
      officialWebsite: "https://online-inspire.gov.in",
      documents: ["Class 12 Marksheet (Top 1% rank holder certificate)", "Class 10 Certificate", "Recommendation Letter from Principal"],
      benefits: "Annual scholarship of ₹80,000, consisting of ₹60,000 cash stipend and ₹20,000 mentorship support for research projects."
  },
  {
      id: 6,
      name: "HDFC Bank Parivartan's ECS Scholarship",
      provider: "HDFC Bank",
      description: "Assisting students from marginalized sections of society who are facing crisis situations that might interrupt their education.",
      qualification: "10th",
      currentCourse: "Undergraduate",
      minCGPA: 6.0,
      minPercentage: 60,
      category: "All",
      maxIncome: 600000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Means",
      amount: "₹ 75,000 / Year",
      lastDate: "2026-09-15",
      officialWebsite: "https://www.hdfcbank.com",
      documents: ["Previous Year Marksheet", "Income Proof", "Proof of Crisis (if applicable)", "Current Admission Proof"],
      benefits: "Financial assistance up to ₹75,000 for undergraduate and post-graduate studies to cover fees and academic costs."
  },
  {
      id: 7,
      name: "Kotak Kanya Scholarship",
      provider: "Kotak Education Foundation",
      description: "Financial support to meritorious girl students from low-income families to pursue higher education from top-tier institutes.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 7.5,
      minPercentage: 75,
      category: "All",
      maxIncome: 600000,
      state: "Maharashtra",
      district: "All",
      gender: "Female",
      fieldOfStudy: "All",
      type: "Merit-cum-Means",
      amount: "₹ 1,50,000 / Year",
      lastDate: "2026-09-30",
      officialWebsite: "https://kotakeducation.org",
      documents: ["Marksheet of Class 12", "Income Certificate", "College Admission Proof", "Parent Identity Proof"],
      benefits: "Scholarship of ₹1.5 Lakh per year covering tuition fees, hostel, books, and living expenses."
  },
  {
      id: 8,
      name: "ONGC Scholarship Scheme for SC/ST/OBC Students",
      provider: "ONGC Foundation",
      description: "Exclusive scholarship for students belonging to Scheduled Caste, Scheduled Tribe, and OBC categories pursuing professional courses.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 6.0,
      minPercentage: 60,
      category: "SC/ST/OBC",
      maxIncome: 450000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "STEM",
      type: "Merit-cum-Means",
      amount: "₹ 48,000 / Year",
      lastDate: "2026-10-15",
      officialWebsite: "https://ongcfoundation.org",
      documents: ["Caste Certificate", "Income Certificate", "Admission Letter", "Marksheet of qualifying exam"],
      benefits: "Annual aid of ₹48,000 to cover course fee, books, and boarding charges."
  },
  {
      id: 9,
      name: "L'Oréal India For Young Women in Science Scholarship",
      provider: "L'Oréal India",
      description: "Encouraging young women to pursue careers in science by providing financial aid for their college education.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 8.5,
      minPercentage: 85,
      category: "All",
      maxIncome: 600000,
      state: "All",
      district: "All",
      gender: "Female",
      fieldOfStudy: "STEM",
      type: "Merit",
      amount: "₹ 2,50,000 (Total)",
      lastDate: "2026-10-20",
      officialWebsite: "https://www.loreal.com",
      documents: ["Class 10 & 12 Marksheets", "Parent Income Certificate", "Aadhaar Card", "Admission Letter"],
      benefits: "₹2.5 Lakhs paid over the duration of the science-related undergraduate degree."
  },
  {
      id: 10,
      name: "Post Matric Scholarship Scheme for Minorities",
      provider: "Ministry of Minority Affairs, Govt of India",
      description: "Financial assistance to students belonging to minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) to pursue higher studies.",
      qualification: "10th",
      currentCourse: "Undergraduate",
      minCGPA: 5.0,
      minPercentage: 50,
      category: "Minority",
      maxIncome: 200000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Means",
      amount: "₹ 15,000 / Year",
      lastDate: "2026-11-30",
      officialWebsite: "https://scholarships.gov.in",
      documents: ["Self-Declaration of Minority Status", "Income Certificate", "Marksheet of last exam", "Aadhaar"],
      benefits: "Admission & tuition fee waiver along with a monthly maintenance allowance for day scholars and hostellers."
  },
  {
      id: 11,
      name: "LIC HFL Vidyadhan Scholarship",
      provider: "LIC Housing Finance Limited",
      description: "Empowering lower-income group students to complete their higher secondary, graduation, or post-graduation courses.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 6.0,
      minPercentage: 60,
      category: "All",
      maxIncome: 360000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Means",
      amount: "₹ 25,000 / Year",
      lastDate: "2026-09-30",
      officialWebsite: "https://www.lichousing.com",
      documents: ["Marksheet of Class 12", "Income Certificate", "Fee Receipt", "ID Proof"],
      benefits: "Scholarship of ₹25,000 per year for 3 years to cover undergraduate academic expenses."
  },
  {
      id: 12,
      name: "Central Sector Scheme of Scholarship for College Students",
      provider: "Department of Higher Education, Govt of India",
      description: "Supporting students who are above 80th percentile of successful candidates in the relevant stream from the respective Board of Examination.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 8.0,
      minPercentage: 80,
      category: "All",
      maxIncome: 450000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Merit",
      amount: "₹ 20,000 / Year",
      lastDate: "2026-10-31",
      officialWebsite: "https://scholarships.gov.in",
      documents: ["Class 12 Marksheet", "Income Declaration", "Aadhaar Card", "Joining Report signed by College Head"],
      benefits: "₹12,000 per year for graduation (first three years) and ₹20,000 per year for post-graduation."
  },
  {
      id: 13,
      name: "Google Generation Scholarship (APAC) - STEM",
      provider: "Google LLC",
      description: "Helping aspiring computer scientists excel in technology and become leaders in the field. Focuses on underrepresented groups in tech.",
      qualification: "Undergraduate",
      currentCourse: "Undergraduate",
      minCGPA: 8.0,
      minPercentage: 80,
      category: "All",
      maxIncome: 999999999,
      state: "All",
      district: "All",
      gender: "Female",
      fieldOfStudy: "STEM",
      type: "Merit",
      amount: "$ 2,500 (One-time)",
      lastDate: "2026-08-31",
      officialWebsite: "https://buildyourfuture.withgoogle.com/scholarships",
      documents: ["Resume/CV", "Transcripts", "Two essay responses", "Enrollment Letter"],
      benefits: "A one-time award of $2,500 to support tuition, books, and supplies, plus invitations to Google networking events."
  },
  {
      id: 14,
      name: "Commonwealth Master's Scholarship (UK)",
      provider: "Commonwealth Scholarship Commission, UK",
      description: "Full scholarship for students from developing Commonwealth countries to study a Master's degree in the United Kingdom.",
      qualification: "Undergraduate",
      currentCourse: "Postgraduate",
      minCGPA: 7.5,
      minPercentage: 75,
      category: "All",
      maxIncome: 999999999,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Merit",
      amount: "Full Funding (UK)",
      lastDate: "2026-10-18",
      officialWebsite: "https://cscuk.fcdo.gov.uk",
      documents: ["Degree Certificate", "2 Letters of Recommendation", "Passport Copy", "Offer Letter from UK Uni"],
      benefits: "Covers full airfare, tuition fees, monthly living allowance (£1,300+), warm clothing allowance, and study travel grants."
  },
  {
      id: 15,
      name: "Inlaks Shivdasani Foundation Scholarship",
      provider: "Inlaks Shivdasani Foundation",
      description: "Funding for young Indian citizens with outstanding talent to pursue postgraduate degrees, research, or training at top global institutions.",
      qualification: "Undergraduate",
      currentCourse: "Postgraduate",
      minCGPA: 8.0,
      minPercentage: 80,
      category: "All",
      maxIncome: 999999999,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "Arts/Humanities",
      type: "Merit",
      amount: "$ 100,000 (Max)",
      lastDate: "2026-09-15",
      officialWebsite: "https://www.inlaksfoundation.org",
      documents: ["Evidence of Admission", "Resume", "Portfolio (for arts)", "2 Letters of Reference"],
      benefits: "Covers tuition fees, living expenses, one-way travel up to a maximum limit of $100,000."
  },
  {
      id: 16,
      name: "Fulbright-Nehru Master's Fellowships",
      provider: "USIEF (US-India Educational Foundation)",
      description: "Fellowships designed for highly motivated Indian students to pursue Master's programs at selected US universities.",
      qualification: "Undergraduate",
      currentCourse: "Postgraduate",
      minCGPA: 7.0,
      minPercentage: 70,
      category: "All",
      maxIncome: 999999999,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Merit",
      amount: "Fully Funded (US)",
      lastDate: "2026-08-15",
      officialWebsite: "https://www.usief.org.in",
      documents: ["Graduate transcripts", "3 Letters of Reference", "TOEFL/IELTS Scorecard", "Statement of Purpose"],
      benefits: "J-1 visa support, full funding for tuition and fees, living stipend, round-trip economy class travel, and accident health insurance."
  },
  {
      id: 17,
      name: "Legrand Scholarship Program",
      provider: "Legrand India",
      description: "Encouraging higher education for girl students, children of dealers/retailers, and specially-abled children to pursue Engineering/STEM fields.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 7.0,
      minPercentage: 70,
      category: "All",
      maxIncome: 500000,
      state: "All",
      district: "All",
      gender: "Female",
      fieldOfStudy: "STEM",
      type: "Merit-cum-Means",
      amount: "₹ 60,000 / Year",
      lastDate: "2026-10-31",
      officialWebsite: "https://www.legrand.co.in",
      documents: ["Marksheet of Class 12", "Income Certificate", "Admission Letter", "Passport size photograph"],
      benefits: "Covers 60% of tuition fees or ₹60,000 per year (whichever is lower) for the complete engineering course."
  },
  {
      id: 18,
      name: "Siemens Scholarship Program",
      provider: "Siemens India",
      description: "Nurturing engineering talent from economically disadvantaged backgrounds, preparing them for industrial challenges.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 6.0,
      minPercentage: 60,
      category: "All",
      maxIncome: 200000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "STEM",
      type: "Means",
      amount: "Full Tuition Fee",
      lastDate: "2026-09-30",
      officialWebsite: "https://www.siemens.co.in",
      documents: ["First year engineering admission slip", "SSC & HSC Marksheets", "Income Proof"],
      benefits: "Covers 100% tuition fees, hostel/transport allowances, and provides advanced soft skills and corporate training."
  },
  {
      id: 19,
      name: "Narotam Sekhsaria Scholarship Program",
      provider: "Narotam Sekhsaria Foundation",
      description: "Interest-free loan scholarships for PG/Doctorate programs at prestigious international and Indian universities.",
      qualification: "Undergraduate",
      currentCourse: "Postgraduate",
      minCGPA: 8.0,
      minPercentage: 80,
      category: "All",
      maxIncome: 999999999,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Merit",
      amount: "₹ 20,00,000 (Max)",
      lastDate: "2026-09-01",
      officialWebsite: "https://pg.nsfoundation.co.in",
      documents: ["Transcripts", "GRE/GMAT scores (if any)", "Admission Letter", "Letter of Recommendations"],
      benefits: "Interest-free loan scholarship of up to ₹20 lakhs, paired with exceptional mentoring by foundation trustees."
  },
  {
      id: 20,
      name: "Sahu Jain Trust Undergraduate Scholarship",
      provider: "Sahu Jain Trust",
      description: "Financial support for students pursuing general undergraduate degrees or vocational technical education in India.",
      qualification: "Intermediate",
      currentCourse: "Undergraduate",
      minCGPA: 6.5,
      minPercentage: 65,
      category: "All",
      maxIncome: 300000,
      state: "All",
      district: "All",
      gender: "All",
      fieldOfStudy: "All",
      type: "Means",
      amount: "₹ 15,000 / Year",
      lastDate: "2026-10-15",
      officialWebsite: "https://sahujaintrust.timesofindia.com",
      documents: ["Previous marksheets", "Income proof from employer/authority", "Recommendation letter"],
      benefits: "Recurring annual support ranging between ₹2,500 to ₹15,000 based on course and merit evaluation."
  }
];

export const calculateLocalMatch = (student, scholarship) => {
    let score = 0;
    let reasons = [];
    const parsedIncome = parseFloat(student.income) || 0;
    const parsedMarks = parseFloat(student.marks) || 0;

    // 1. Qualification Level Match (Weight: 20)
    const levels = ["10th", "Intermediate", "Undergraduate", "Postgraduate"];
    
    if (scholarship.qualification === "All" || scholarship.qualification === student.qualification) {
        score += 20;
    } else {
        const studentIdx = levels.indexOf(student.qualification);
        const schIdx = levels.indexOf(scholarship.qualification);
        if (studentIdx >= schIdx && studentIdx !== -1 && schIdx !== -1) {
            score += 15;
        }
    }

    // 2. Academic Merit Match (Weight: 25)
    const reqMarks = scholarship.minPercentage || (scholarship.minCGPA * 10);
    if (parsedMarks >= reqMarks) {
        score += 25;
        reasons.push(`Your academic score of ${parsedMarks}% meets or exceeds the required ${reqMarks}%.`);
    } else {
        const diff = reqMarks - parsedMarks;
        if (diff <= 10) {
            score += 10;
            reasons.push(`Your academic score (${parsedMarks}%) is close to the preferred threshold of ${reqMarks}%.`);
        }
    }

    // 3. Category & Gender (Weight: 20)
    if (scholarship.category === "All") {
        score += 10;
    } else if (scholarship.category.includes(student.category)) {
        score += 15;
        reasons.push(`You belong to the targeted category demographic ('${student.category}').`);
    }
    
    if (scholarship.gender === "All") {
        score += 10;
    } else if (scholarship.gender.toLowerCase() === student.gender.toLowerCase()) {
        score += 10;
        reasons.push(`This scheme matches or prioritizes ${student.gender} candidates.`);
    }

    // 4. Income Alignment (Weight: 20)
    if (scholarship.maxIncome >= 999999999) {
        score += 20;
    } else if (parsedIncome <= scholarship.maxIncome) {
        score += 20;
        reasons.push(`Your family income (₹${parsedIncome.toLocaleString()}) complies with the maximum limit of ₹${scholarship.maxIncome.toLocaleString()}.`);
    } else {
        const diff = parsedIncome - scholarship.maxIncome;
        if (diff <= 100000) {
            score += 5;
            reasons.push("Your household income is slightly above the strict bracket but remains competitive.");
        }
    }

    // 5. State Alignment (Weight: 15)
    if (scholarship.state === "All") {
        score += 15;
    } else if (scholarship.state.toLowerCase() === student.state.toLowerCase()) {
        score += 15;
        reasons.push(`This fund is state-sponsored for students residing in ${student.state}.`);
    }

    const matchPercentage = Math.round(Math.min(100, Math.max(0, score)));
    const eligibilityScore = (matchPercentage / 10).toFixed(1);

    let recReason = "Highly recommended based on your profile alignment: ";
    if (reasons.length > 0) {
        recReason += reasons.join(" ") + " This suggests a high eligibility probability.";
    } else {
        recReason = "Your profile satisfies the general parameter frameworks for this scheme.";
    }

    return {
        ...scholarship,
        matchPercentage,
        eligibilityScore,
        recommendationReason: recReason
    };
};
