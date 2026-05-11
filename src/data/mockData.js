export const universities = [
  {
    id: 1,
    name: "University of Engineering and Technology Lahore",
    city: "Lahore",
    type: "Public University"
  },
  {
    id: 2,
    name: "National University of Sciences and Technology",
    city: "Islamabad",
    type: "Public University"
  },
  {
    id: 3,
    name: "COMSATS University Islamabad",
    city: "Islamabad",
    type: "Public University"
  },
  {
    id: 4,
    name: "University of Punjab",
    city: "Lahore",
    type: "Public University"
  },
  {
    id: 5,
    name: "FAST National University",
    city: "Multiple Campuses",
    type: "Private University"
  },
  {
    id: 6,
    name: "University of Karachi",
    city: "Karachi",
    type: "Public University"
  }
];

export const industries = [
  {
    id: 1,
    name: "Software Development",
    category: "IT Industry"
  },
  {
    id: 2,
    name: "Banking & Finance",
    category: "Financial Sector"
  },
  {
    id: 3,
    name: "Telecommunication",
    category: "Tech Infrastructure"
  },
  {
    id: 4,
    name: "E-commerce",
    category: "Online Business"
  },
  {
    id: 5,
    name: "Education Technology",
    category: "EdTech"
  },
  {
    id: 6,
    name: "Healthcare IT",
    category: "Medical Systems"
  }
];

export const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Solutions Pakistan",
    location: "Lahore",
    type: "Remote",
    duration: "3 Months",
    stipend: "20,000 PKR",
    description: "Work with React.js and UI development."
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "CodeCrafters Pvt Ltd",
    location: "Islamabad",
    type: "Onsite",
    duration: "6 Months",
    stipend: "25,000 PKR",
    description: "Node.js and MongoDB API development."
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Minds Studio",
    location: "Karachi",
    type: "Remote",
    duration: "3 Months",
    stipend: "15,000 PKR",
    description: "Figma and user interface design."
  },
  {
    id: 4,
    title: "Full Stack Developer Intern",
    company: "NextGen Developers",
    location: "Lahore",
    type: "Hybrid",
    duration: "6 Months",
    stipend: "30,000 PKR",
    description: "MERN stack development tasks."
  },
  {
    id: 5,
    title: "Data Science Intern",
    company: "AI Labs Pakistan",
    location: "Islamabad",
    type: "Remote",
    duration: "4 Months",
    stipend: "35,000 PKR",
    description: "Python, ML models and data analysis."
  },
  {
    id: 6,
    title: "Mobile App Developer Intern",
    company: "AppSoft Studios",
    location: "Lahore",
    type: "Onsite",
    duration: "3 Months",
    stipend: "22,000 PKR",
    description: "Flutter mobile app development."
  },
  {
    id: 7,
    title: "Cyber Security Intern",
    company: "SecureNet Pakistan",
    location: "Islamabad",
    type: "Onsite",
    duration: "6 Months",
    stipend: "40,000 PKR",
    description: "Security testing and ethical hacking basics."
  },
  {
    id: 8,
    title: "Digital Marketing Intern",
    company: "BrandBoost Agency",
    location: "Karachi",
    type: "Remote",
    duration: "3 Months",
    stipend: "18,000 PKR",
    description: "SEO, social media marketing."
  },
  {
    id: 9,
    title: "DevOps Intern",
    company: "CloudCore Systems",
    location: "Lahore",
    type: "Hybrid",
    duration: "6 Months",
    stipend: "45,000 PKR",
    description: "CI/CD pipelines and AWS basics."
  },
  {
    id: 10,
    title: "Software QA Intern",
    company: "Testify Solutions",
    location: "Islamabad",
    type: "Hybrid",
    duration: "3 Months",
    stipend: "20,000 PKR",
    description: "Manual and automation testing."
  }
];

export const users = [
  {
    id: 1,
    name: "Ali Ahmed",
    email: "ali@example.com",
    role: "student",
    status: "verified"
  },
  {
    id: 2,
    name: "Sara Khan",
    email: "sara@example.com",
    role: "student",
    status: "pending"
  },
  {
    id: 3,
    name: "Tech Solutions Admin",
    email: "company@example.com",
    role: "company",
    status: "verified"
  }
];

export const companies = [
  {
    id: 1,
    name: "Tech Solutions Pakistan",
    industry: "Software Development",
    location: "Lahore",
    status: "verified",
    type: "Software House"
  },
  {
    id: 2,
    name: "CodeCrafters Pvt Ltd",
    industry: "Software Development",
    location: "Islamabad",
    status: "verified",
    type: "Software House"
  },
  {
    id: 3,
    name: "University of Engineering and Technology",
    industry: "Education",
    location: "Lahore",
    status: "verified",
    type: "University"
  },
  {
    id: 4,
    name: "Creative Minds Studio",
    industry: "Design & Media",
    location: "Karachi",
    status: "verified",
    type: "Software House"
  },
  {
    id: 5,
    name: "NUST - National University",
    industry: "Education",
    location: "Islamabad",
    status: "verified",
    type: "University"
  },
  {
    id: 6,
    name: "AI Labs Pakistan",
    industry: "Artificial Intelligence",
    location: "Lahore",
    status: "verified",
    type: "Software House"
  },
  {
    id: 7,
    name: "COMSATS University",
    industry: "Education",
    location: "Islamabad",
    status: "verified",
    type: "University"
  },
  {
    id: 8,
    name: "Fast Systems",
    industry: "Cyber Security",
    location: "Karachi",
    status: "verified",
    type: "Software House"
  }
];

export const applications = [
  {
    _id: "app1",
    status: "Pending",
    createdAt: new Date().toISOString(),
    internshipId: { title: "Frontend Developer Intern" },
    companyId: { companyName: "Tech Solutions Pakistan" }
  },
  {
    _id: "app2",
    status: "Approved",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    internshipId: { title: "UI/UX Design Intern" },
    companyId: { companyName: "Creative Minds Studio" }
  },
  {
    _id: "app3",
    status: "Cancelled",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    internshipId: { title: "Machine Learning" },
    companyId: { companyName: "Creative Minds Studio" }
  }
];
