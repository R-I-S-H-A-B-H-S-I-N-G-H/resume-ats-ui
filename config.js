/**
 * =================================================================
 * CONFIGURATION FILE
 * =================================================================
 */

export const resumeConfig = {
	// META-INFORMATION
	// =================================================================
	meta: {
		filename: "Rishabh_Singh_Resume.pdf",
	},

	// THEME
	// =================================================================
	themes: {
		modern: {
			colors: {
				primary: "#1a202c",
				secondary: "#4a5568",
				accent: "#2b6cb0",
			},
			fonts: {
				family: "helvetica",
				sizes: { header: 24, title: 12, subtitle: 10, body: 10, small: 9 },
			},
			margins: { top: 50, right: 50, bottom: 50, left: 50 },
			spacing: {
				afterSection: 20, // Default space in points after a section
			},
		},
		teal: {
			colors: {
				primary: "#047481",
				secondary: "#4A5568",
				accent: "#047481",
			},
			fonts: {
				family: "times",
				sizes: { header: 22, title: 12, subtitle: 9, body: 10, small: 9 },
			},
			margins: { top: 60, right: 50, bottom: 60, left: 50 },
			spacing: {
				afterSection: 22,
			},
		},
	},

	// Set the active theme here
	theme: "modern", // Change to 'teal' to see the difference!

	// RESUME DATA
	// =================================================================
	data: {
		personalInfo: {
			name: "Rishabh Singh",
			title: "Software Development Engineer",
			contact: [
				{ type: "phone", value: "+91 9540141141" },
				{ type: "email", value: "rishabhsingh2305@gmail.com" },
				{ type: "linkedin", value: "https://linkedin.com/in/rishabhsingh2305", url: "https://linkedin.com/in/rishabhsingh2305" },
			],
		},
		summary: {
			title: "Professional Summary",
			content:
				"Results-driven Software Developer with 3+ years of experience designing and building scalable distributed systems using Java, Spring Boot, ReactJS, MySQL, and AWS. Proven ability to engineer high-performance, secure microservices for customer-facing applications. Delivered 3x profit growth through feature development and optimized cloud-native solutions using AWS Lambda. Strong computer science fundamentals and a passion for delivering frictionless, highly available platforms aligned with security and verification needs. Ranked in the top 8% globally on LeetCode with 950+ problems solved.",
		},
		skills: {
			title: "Technical Skills",
			categories: [
				{ name: "Languages", items: "Java, C++, JavaScript, HTML/CSS, SQL" },
				{ name: "Frameworks", items: "Spring Boot, React.js, Express.js" },
				{ name: "Databases", items: "MySQL, Apache Druid, PostgreSQL" },
				{ name: "Cloud & DevOps", items: "AWS (Lambda, S3, EC2), CI/CD, GitHub Actions, Docker" },
				{ name: "Core Concepts", items: "Data Structures, Algorithms, System Design, Design Patterns" },
			],
		},
		experience: {
			title: "Professional Experience",
			entries: [
				{
					role: "Software Development Engineer",
					company: "TechCrumb",
					location: "Delhi, India",
					period: "Jan 2023 - Present",
					description: [
						"Led the development of a scalable broadcast service, increasing platform profit by 3x through improved customer reach and reliability.",
						"Architected and deployed distributed video encoding pipelines using AWS Lambda and S3, reducing media processing time by over 30%.",
						"Built secure RESTful APIs with Spring Boot, handling thousands of requests daily with robust error handling and logging.",
					],
				},
			],
		},
		projects: {
			title: "Projects",
			entries: [
				{
					name: "JS SERVE - Cloud File Sharing",
					tech: "Express, AWS S3, React.js",
					period: "Jan 2024",
					description: [
						"Built a cloud-native file-sharing platform with secure upload/download flows and dynamic public URLs backed by AWS S3.",
						"Integrated access control to prevent unauthorized file access and ensured compliance with privacy and security standards.",
					],
				},
				{
					name: "Metro Route Finder",
					tech: "React-Native, JavaScript, BFS Algorithm",
					description: ["Created an offline-capable mobile app to determine optimal metro routes using BFS for efficient graph traversal."],
				},
			],
		},
		education: {
			title: "Education",
			entries: [
				{
					institution: "Echelon Institute Of Engineering College, Faridabad",
					degree: "Bachelor of Technology in Computer Science (CGPA: 8.2)",
					period: "Aug 2019 - Jul 2023",
				},
			],
		},
		achievements: {
			title: "Achievements & Profile Links",
			list: [
				"Top 8% global LeetCode ranking (Rating: 1781) with 950+ problems solved.",
				"Ranked 799 in Google KickStart Round H.",
				"Secured All India Rank 1205 in TCS CodeVita 2022.",
				{ text: "GitHub Profile", url: "https://github.com/R-I-S-H-A-B-H-S-I-N-G-H" },
				{ text: "LeetCode Profile", url: "https://leetcode.com/rishabhsingh2305" },
			],
		},
	},

	// RESUME LAYOUT
	// =================================================================
	layout: [
		{ type: "header", dataKey: "personalInfo" },
		{ type: "summary", dataKey: "summary" },
		{ type: "skills", dataKey: "skills" },
		{ type: "experience", dataKey: "experience" },
		{ type: "projects", dataKey: "projects" },
		{ type: "education", dataKey: "education" },
		{ type: "achievements", dataKey: "achievements" },
	],
};
