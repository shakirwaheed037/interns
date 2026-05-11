import { internships, users, companies, universities, industries, applications } from '../data/mockData';

// Mock API service for frontend-only demo
const api = {
    get: (url) => {
        console.log(`Mock GET: ${url}`);
        
        // Base collections
        if (url.includes('/internships')) return Promise.resolve({ data: internships });
        if (url.includes('/users')) return Promise.resolve({ data: users });
        if (url.includes('/companies')) return Promise.resolve({ data: companies });
        if (url.includes('/universities')) return Promise.resolve({ data: universities });
        if (url.includes('/industries')) return Promise.resolve({ data: industries });
        
        // Student endpoints
        if (url.includes('/students/applications')) return Promise.resolve({ data: applications });
        
        // Company endpoints
        if (url.includes('/companies/internships')) {
            const companyInfo = JSON.parse(localStorage.getItem('userInfo'));
            const filtered = internships.filter(i => i.company === (companyInfo?.name || "Tech Solutions Pakistan"));
            // Ensure they have _id for the frontend
            const mapped = filtered.map((i, index) => ({ ...i, _id: `int-${index}`, isActive: true, createdAt: new Date().toISOString() }));
            return Promise.resolve({ data: mapped });
        }
        if (url.includes('/companies/applicants/')) {
            const mockApplicants = [
                { _id: 'a1', name: 'Ali Ahmed', email: 'ali@example.com', status: 'pending', location: 'Lahore', qualification: 'BSCS', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                { _id: 'a2', name: 'Sara Khan', email: 'sara@example.com', status: 'accepted', location: 'Islamabad', qualification: 'BSSE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
            ];
            return Promise.resolve({ data: mockApplicants });
        }
        
        // Admin endpoints
        if (url.includes('/admin/overview')) {
            return Promise.resolve({
                data: {
                    totalStudents: 150,
                    totalCompanies: 45,
                    totalInternships: 80,
                    pendingCompanies: 12,
                    pendingStudents: 25,
                    recentStudents: users.filter(u => u.role === 'student').slice(0, 5),
                    recentCompanies: companies.slice(0, 5)
                }
            });
        }
        if (url.includes('/admin/internships')) {
            return Promise.resolve({ data: internships.map((i, index) => ({ ...i, _id: `int-${index}`, status: 'active', applicantCount: 5, createdAt: new Date().toISOString() })) });
        }
        if (url.includes('/admin/companies/verify')) {
            return Promise.resolve({ data: companies.map((c, index) => ({ ...c, _id: `comp-${index}`, verificationStatus: 'pending', userId: { email: `${c.name.toLowerCase().replace(/ /g, '')}@example.com` } })) });
        }
        if (url.includes('/admin/users')) {
            return Promise.resolve({ data: users.map((u, index) => ({ ...u, _id: `user-${index}`, isActive: true, isVerified: u.status === 'verified', createdAt: new Date().toISOString() })) });
        }
        if (url.includes('/admin/analytics')) {
            return Promise.resolve({
                data: {
                    totalUsers: 200,
                    totalStudents: 150,
                    totalCompanies: 50,
                    totalInternships: 100,
                    totalApplications: 450,
                    appStats: [
                        { name: 'Accepted', value: 120 },
                        { name: 'Rejected', value: 80 },
                        { name: 'Pending', value: 250 }
                    ],
                    internStats: [
                        { name: 'Active', value: 70 },
                        { name: 'Closed', value: 30 }
                    ],
                    monthlyRegistrations: [
                        { name: 'Jan', users: 20 },
                        { name: 'Feb', users: 35 },
                        { name: 'Mar', users: 25 },
                        { name: 'Apr', users: 45 },
                        { name: 'May', users: 60 },
                        { name: 'Jun', users: 55 }
                    ]
                }
            });
        }

        // Profile endpoints
        if (url.includes('/auth/profile') || url.includes('/auth/me')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) return Promise.reject({ response: { data: { message: 'Not authenticated' } } });
            
            return Promise.resolve({ 
                data: {
                    ...userInfo,
                    profile: {
                        university: "University of Engineering and Technology Lahore",
                        program: "Software Engineering",
                        semester: "6",
                        enrollmentNumber: "2021-CS-123",
                        skills: ["React", "JavaScript", "CSS"],
                        resume: "",
                        companyName: userInfo.name || "Default Company",
                        industry: "Technology",
                        type: "Software House",
                        location: "Lahore",
                        description: "Modern tech solutions provider.",
                        isApproved: true
                    }
                } 
            });
        }
        
        if (url.includes('/notifications')) {
            const mockNotifs = [
                { _id: 'n1', message: 'Welcome to the platform!', isRead: false, createdAt: new Date().toISOString() },
                { _id: 'n2', message: 'Your profile has been verified.', isRead: true, createdAt: new Date(Date.now() - 3600000).toISOString() }
            ];
            return Promise.resolve({ data: mockNotifs });
        }
        
        return Promise.resolve({ data: [] });
    },
    post: (url, body) => {
        console.log(`Mock POST: ${url}`, body);
        if (url.includes('/auth/login') || url.includes('/auth/admin-login')) {
            const mockUser = {
                id: Date.now(),
                name: body.name || body.email.split('@')[0],
                email: body.email,
                role: body.role || (url.includes('admin') ? 'admin' : 'student'),
                token: 'mock-token-' + Date.now()
            };
            return Promise.resolve({ data: mockUser });
        }
        if (url.includes('/auth/register')) {
            const mockUser = {
                id: Date.now(),
                name: body.name,
                email: body.email,
                role: body.role,
                token: 'mock-token-' + Date.now()
            };
            // For demo, we might want to store this in localStorage immediately
            // localStorage.setItem('userInfo', JSON.stringify(mockUser));
            return Promise.resolve({ data: mockUser });
        }
        if (url.includes('/upload')) {
            return Promise.resolve({ data: { url: 'https://via.placeholder.com/150' } });
        }
        if (url.includes('/students/apply/')) {
            return Promise.resolve({ data: { message: 'Application submitted successfully' } });
        }
        return Promise.resolve({ data: { message: 'Success' } });
    },
    put: (url, body) => {
        console.log(`Mock PUT: ${url}`, body);
        if (url.includes('/students/profile') || url.includes('/companies/profile')) {
            return Promise.resolve({ data: { ...body, message: 'Profile updated' } });
        }
        return Promise.resolve({ data: body });
    },
    delete: (url) => {
        console.log(`Mock DELETE: ${url}`);
        return Promise.resolve({ data: { message: 'Deleted successfully' } });
    }
};

export default api;
