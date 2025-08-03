/**
 * =================================================================
 * RESUME GENERATOR ENGINE
 * =================================================================
 */
export class ResumeGenerator {
	constructor(config) {
		this.config = config;
		this.theme = config.themes[config.theme];
		this.data = config.data;
		this.layout = config.layout;

		this.doc = new window.jspdf.jsPDF("p", "pt", "a4");
		this.pageWidth = this.doc.internal.pageSize.getWidth();
		this.pageHeight = this.doc.internal.pageSize.getHeight();
		this.contentWidth = this.pageWidth - (this.theme.margins.left + this.theme.margins.right);
		this.y = this.theme.margins.top;

		this.renderers = {
			header: this._renderHeader,
			summary: this._renderSummary,
			skills: this._renderSkills,
			experience: this._renderExperience,
			projects: this._renderProjects,
			education: this._renderEducation,
			achievements: this._renderAchievements,
		};
	}

	// --- Private method to run the renderers ---
	_build() {
		// Re-initialize the document to ensure a fresh build every time
		this.doc = new window.jspdf.jsPDF("p", "pt", "a4");

		// Reset y-position for fresh builds
		this.y = this.theme.margins.top;

		this.layout.forEach((section) => {
			const renderer = this.renderers[section.type];
			if (renderer) {
				renderer.call(this, section);
				if (this.theme.spacing?.afterSection) {
					this.y += this.theme.spacing.afterSection;
				}
			} else {
				console.warn(`No renderer found for section type: "${section.type}"`);
			}
		});
	}

	// --- Public methods for output ---

	// Method to trigger the PDF download
	generate() {
		this._build(); // Build the PDF content
		this.doc.save(this.config.meta.filename);
	}

	// Method to get PDF data for the preview
	getPreviewData() {
		this._build(); // Build the PDF content
		return this.doc.output("datauristring");
	}

	// --- Helper methods ---
	_checkPageBreak(blockHeight) {
		if (this.y + blockHeight > this.pageHeight - this.theme.margins.bottom) {
			this.doc.addPage();
			this.y = this.theme.margins.top;
		}
	}

	_drawSectionHeader(title) {
		this._checkPageBreak(30);
		this.doc.setFont(this.theme.fonts.family, "bold");
		this.doc.setFontSize(this.theme.fonts.sizes.title);
		this.doc.setTextColor(this.theme.colors.primary);
		this.doc.text(title.toUpperCase(), this.theme.margins.left, this.y);
		this.y += 8;
		this.doc.setDrawColor(this.theme.colors.primary);
		this.doc.setLineWidth(0.5);
		this.doc.line(this.theme.margins.left, this.y, this.pageWidth - this.theme.margins.right, this.y);
		this.y += 15;
	}

	// --- Renderer methods (unchanged from before) ---
	_renderHeader(section) {
		const info = this.data[section.dataKey];
		this.doc.setFont(this.theme.fonts.family, "bold");
		this.doc.setFontSize(this.theme.fonts.sizes.header);
		this.doc.setTextColor(this.theme.colors.primary);
		this.doc.text(info.name.toUpperCase(), this.pageWidth / 2, this.y, { align: "center" });
		this.y += this.theme.fonts.sizes.header * 0.7;
		this.doc.setFont(this.theme.fonts.family, "normal");
		this.doc.setFontSize(this.theme.fonts.sizes.subtitle);
		this.doc.setTextColor(this.theme.colors.secondary);
		this.doc.text(info.title, this.pageWidth / 2, this.y, { align: "center" });
		this.y += this.theme.fonts.sizes.subtitle * 1.2;
		const contactLine = info.contact.map((c) => c.value).join(" • ");
		this.doc.setFontSize(this.theme.fonts.sizes.small);
		this.doc.text(contactLine, this.pageWidth / 2, this.y, { align: "center" });
	}

	_renderSummary(section) {
		const summaryData = this.data[section.dataKey];
		this._drawSectionHeader(summaryData.title);
		this.doc.setFont(this.theme.fonts.family, "normal");
		this.doc.setFontSize(this.theme.fonts.sizes.body);
		this.doc.setTextColor(this.theme.colors.secondary);
		const lines = this.doc.splitTextToSize(summaryData.content, this.contentWidth);
		this.doc.text(lines, this.theme.margins.left, this.y);
		this.y += lines.length * this.theme.fonts.sizes.body;
	}

	_renderSkills(section) {
		const skillsData = this.data[section.dataKey];
		this._drawSectionHeader(skillsData.title);
		const categoryLabelWidth = 90;
		skillsData.categories.forEach((category) => {
			this._checkPageBreak(20);
			this.doc.setFont(this.theme.fonts.family, "bold");
			this.doc.setFontSize(this.theme.fonts.sizes.body);
			this.doc.setTextColor(this.theme.colors.primary);
			this.doc.text(`${category.name}:`, this.theme.margins.left, this.y);
			this.doc.setFont(this.theme.fonts.family, "normal");
			this.doc.setTextColor(this.theme.colors.secondary);
			const skillLines = this.doc.splitTextToSize(category.items, this.contentWidth - categoryLabelWidth);
			this.doc.text(skillLines, this.theme.margins.left + categoryLabelWidth, this.y);
			this.y += skillLines.length * this.theme.fonts.sizes.body + 8;
		});
	}

	_renderExperience(section) {
		const expData = this.data[section.dataKey];
		this._drawSectionHeader(expData.title);
		expData.entries.forEach((job) => {
			let blockHeight = 30;
			job.description.forEach((desc) => {
				blockHeight += this.doc.splitTextToSize(`• ${desc}`, this.contentWidth - 10).length * this.theme.fonts.sizes.body + 4;
			});
			this._checkPageBreak(blockHeight);
			this.doc.setFont(this.theme.fonts.family, "bold");
			this.doc.setFontSize(this.theme.fonts.sizes.body);
			this.doc.setTextColor(this.theme.colors.primary);
			this.doc.text(job.role, this.theme.margins.left, this.y);
			this.doc.setFont(this.theme.fonts.family, "normal");
			const periodWidth = this.doc.getTextWidth(job.period);
			this.doc.text(job.period, this.pageWidth - this.theme.margins.right - periodWidth, this.y);
			this.y += this.theme.fonts.sizes.body + 2;
			this.doc.setFont(this.theme.fonts.family, "italic");
			this.doc.setFontSize(this.theme.fonts.sizes.small);
			this.doc.setTextColor(this.theme.colors.secondary);
			this.doc.text(`${job.company} - ${job.location}`, this.theme.margins.left, this.y);
			this.y += this.theme.fonts.sizes.small + 8;
			this.doc.setFont(this.theme.fonts.family, "normal");
			this.doc.setFontSize(this.theme.fonts.sizes.body);
			job.description.forEach((desc) => {
				const lines = this.doc.splitTextToSize(`• ${desc}`, this.contentWidth - 10);
				this._checkPageBreak(lines.length * this.theme.fonts.sizes.body);
				this.doc.text(lines, this.theme.margins.left + 10, this.y);
				this.y += lines.length * this.theme.fonts.sizes.body + 4;
			});
		});
	}

	_renderProjects(section) {
		const projData = this.data[section.dataKey];
		this._drawSectionHeader(projData.title);
		projData.entries.forEach((project) => {
			let blockHeight = 30;
			project.description.forEach((desc) => {
				blockHeight += this.doc.splitTextToSize(`• ${desc}`, this.contentWidth - 10).length * this.theme.fonts.sizes.body + 4;
			});
			this._checkPageBreak(blockHeight);
			this.doc.setFont(this.theme.fonts.family, "bold");
			this.doc.setFontSize(this.theme.fonts.sizes.body);
			this.doc.setTextColor(this.theme.colors.primary);
			this.doc.text(project.name, this.theme.margins.left, this.y);
			this.doc.setFont(this.theme.fonts.family, "normal");
			if (project.period) {
				const periodWidth = this.doc.getTextWidth(project.period);
				this.doc.text(project.period, this.pageWidth - this.theme.margins.right - periodWidth, this.y);
			}
			this.y += this.theme.fonts.sizes.body + 2;
			this.doc.setFont(this.theme.fonts.family, "italic");
			this.doc.setFontSize(this.theme.fonts.sizes.small);
			this.doc.setTextColor(this.theme.colors.secondary);
			this.doc.text(project.tech, this.theme.margins.left, this.y);
			this.y += this.theme.fonts.sizes.small + 8;
			this.doc.setFont(this.theme.fonts.family, "normal");
			this.doc.setFontSize(this.theme.fonts.sizes.body);
			project.description.forEach((desc) => {
				const lines = this.doc.splitTextToSize(`• ${desc}`, this.contentWidth - 10);
				this._checkPageBreak(lines.length * this.theme.fonts.sizes.body);
				this.doc.text(lines, this.theme.margins.left + 10, this.y);
				this.y += lines.length * this.theme.fonts.sizes.body + 4;
			});
		});
	}

	getBlob() {
		this._build();
		return this.doc.output("blob");
	}

	getArrayBuffer() {
		this._build();
		return this.doc.output("arraybuffer");
	}

	_renderEducation(section) {
		const eduData = this.data[section.dataKey];
		this._drawSectionHeader(eduData.title);
		eduData.entries.forEach((edu) => {
			this._checkPageBreak(40);
			this.doc.setFont(this.theme.fonts.family, "bold");
			this.doc.setFontSize(this.theme.fonts.sizes.body);
			this.doc.setTextColor(this.theme.colors.primary);
			this.doc.text(edu.institution, this.theme.margins.left, this.y);
			this.doc.setFont(this.theme.fonts.family, "normal");
			const periodWidth = this.doc.getTextWidth(edu.period);
			this.doc.text(edu.period, this.pageWidth - this.theme.margins.right - periodWidth, this.y);
			this.y += this.theme.fonts.sizes.body + 2;
			this.doc.setFont(this.theme.fonts.family, "normal");
			this.doc.setFontSize(this.theme.fonts.sizes.small);
			this.doc.setTextColor(this.theme.colors.secondary);
			this.doc.text(edu.degree, this.theme.margins.left, this.y);
			this.y += this.theme.fonts.sizes.small;
		});
	}

	_renderAchievements(section) {
		const achData = this.data[section.dataKey];
		this._drawSectionHeader(achData.title);
		this.doc.setFont(this.theme.fonts.family, "normal");
		this.doc.setFontSize(this.theme.fonts.sizes.body);
		this.doc.setTextColor(this.theme.colors.secondary);
		achData.list.forEach((item) => {
			const itemHeight = typeof item === "string" ? this.doc.splitTextToSize(`• ${item}`, this.contentWidth - 10).length * this.theme.fonts.sizes.body + 4 : 14;
			this._checkPageBreak(itemHeight);
			if (typeof item === "string") {
				const lines = this.doc.splitTextToSize(`• ${item}`, this.contentWidth - 10);
				this.doc.text(lines, this.theme.margins.left + 10, this.y);
				this.y += lines.length * this.theme.fonts.sizes.body + 4;
			} else if (typeof item === "object" && item.url) {
				const prefix = `• ${item.text}: `;
				this.doc.text(prefix, this.theme.margins.left + 10, this.y);
				const linkX = this.theme.margins.left + 10 + this.doc.getTextWidth(prefix);
				this.doc.setTextColor(this.theme.colors.accent);
				this.doc.textWithLink(item.url, linkX, this.y, { url: item.url });
				this.doc.setTextColor(this.theme.colors.secondary);
				this.y += 14;
			}
		});
	}
}
