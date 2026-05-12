const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument({ margin: 50 });
if (!fs.existsSync('public')) { fs.mkdirSync('public', { recursive: true }); }
doc.pipe(fs.createWriteStream('public/Manish_Sahani_Resume.pdf'));
doc.font('Helvetica-Bold').fontSize(20).text('MANISH SAHANI', { align: 'left' });
doc.font('Helvetica').fontSize(12).text('BUSINESS ANALYST \n+91 9579274394 | sahanimanish3@gmail.com | Nagpur, MH, India | LinkedIn | Portfolio');
doc.moveDown();
doc.font('Helvetica-Bold').fontSize(14).text('PROFESSIONAL SUMMARY', { underline: true }).moveDown(0.5);
doc.font('Helvetica').fontSize(10).text('Business Analyst with 4.5+ years of experience in telecom and digital platforms. Skilled in requirement gathering, BRD/FRD, user stories, use cases, and UAT. Strong experience in stakeholder management, gap analysis, and requirement documentation. Hands-on experience in SQL-based data analysis, KPI tracking, API testing, and Agile delivery, with a focus on improving system performance and business outcomes.', { align: 'justify' }).moveDown();
doc.font('Helvetica-Bold').fontSize(14).text('WORK EXPERIENCE', { underline: true }).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(11).text('SixDee Technologies | Implementation Engineer (Business Analyst)');
doc.font('Helvetica').fontSize(10).list(['Gathered, analyzed, and documented business and functional requirements for telecom platforms supporting 1M+ users', 'Prepared BRD, FRD, user stories, use cases, and acceptance criteria for development teams', 'Conducted stakeholder meetings and requirement workshops to align business and technical expectations', 'Translated business requirements into clear technical specifications for engineering teams', 'Performed gap analysis and improved workflows, increasing efficiency by 25%', 'Conducted SQL-based data analysis and defined KPIs (success rate, latency, drop-offs) to support data-driven decision making', 'Led UAT support and validated deliverables to ensure alignment with business requirements', 'Tracked requirements and defects in Jira and maintained documentation in Confluence and Notion']).moveDown();
doc.font('Helvetica-Bold').fontSize(11).text('Tech Mahindra | Software Engineer (Business Analyst + QA)');
doc.font('Helvetica').fontSize(10).list(['Gathered and documented business requirements (BRD/FRD, user stories, use cases)', 'Collaborated with stakeholders and technical teams to ensure requirement clarity', 'Created and executed test cases based on acceptance criteria', 'Performed functional, regression, and API testing using Postman', 'Logged and tracked defects in Jira and coordinated with developers for resolution', 'Supported UAT cycles and validated outputs against business requirements', 'Participated in Agile ceremonies including sprint planning and backlog grooming']).moveDown();

doc.font('Helvetica-Bold').fontSize(14).text('PROJECTS', { underline: true }).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(11).text('Telecom Transaction Flow Analysis');
doc.font('Helvetica').fontSize(10).list(['Analyzed telecom transaction flows (login -> recharge -> payment) using SQL', 'Identified drop-offs and improved transaction success rate by 15%']).moveDown();
doc.font('Helvetica-Bold').fontSize(11).text('Order Lifecycle Process Improvement');
doc.font('Helvetica').fontSize(10).list(['Led requirement analysis for order lifecycle and service activation processes', 'Designed To-Be workflows, reducing processing time by 25% and improving operational efficiency']).moveDown();

doc.font('Helvetica-Bold').fontSize(14).text('EDUCATION', { underline: true }).moveDown(0.5);
doc.font('Helvetica').fontSize(11).text('Bachelor of Engineering (Computer Science)').moveDown();
doc.font('Helvetica-Bold').fontSize(14).text('SKILLS', { underline: true }).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(10).text('Business Analysis: ', { continued: true }).font('Helvetica').text('Requirement Gathering, Business & Functional Requirements, BRD, FRD, User Stories, Use Cases, Acceptance Criteria, Stakeholder Management, UAT, Gap Analysis, Production Support, Requirement Tracking & Documentation');
doc.font('Helvetica-Bold').fontSize(10).text('Data & Analytics: ', { continued: true }).font('Helvetica').text('SQL, Data Analysis, KPI Tracking, Data-Driven Decision Making, Root Cause Analysis');
doc.font('Helvetica-Bold').fontSize(10).text('Testing & QA: ', { continued: true }).font('Helvetica').text('Manual QA, Functional Testing, Regression Testing, API Testing (Postman), Test Case Design, Defect Tracking');
doc.font('Helvetica-Bold').fontSize(10).text('Tools: ', { continued: true }).font('Helvetica').text('JIRA, Confluence, Notion, Postman, Microsoft Excel');
doc.font('Helvetica-Bold').fontSize(10).text('Methodologies: ', { continued: true }).font('Helvetica').text('Agile (Scrum), SDLC, CI/CD, Cross-functional Collaboration');
doc.font('Helvetica-Bold').fontSize(10).text('Core Strengths: ', { continued: true }).font('Helvetica').text('Problem Solving, Communication, Stakeholder Coordination');
doc.end();
