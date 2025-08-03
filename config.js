/**
 * =================================================================
 * CONFIGURATION FILE (Initial Default)
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
	theme: "modern",

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
			content: "Results-driven Software Developer with 3+ years of experience designing and building scalable distributed systems...",
		},
		skills: {
			title: "Technical Skills",
			categories: [
				{ name: "Languages", items: "Java, C++, JavaScript, HTML/CSS, SQL" },
				{ name: "Frameworks", items: "Spring Boot, React.js, Express.js" },
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
					description: ["Led the development of a scalable broadcast service..."],
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
					description: ["Built a cloud-native file-sharing platform..."],
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
			list: ["Top 8% global LeetCode ranking (Rating: 1781).", { text: "GitHub Profile", url: "https://github.com/R-I-S-H-A-B-H-S-I-N-G-H" }],
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
