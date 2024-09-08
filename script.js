document.addEventListener('DOMContentLoaded', function () {
    const resumeForm = document.getElementById('resumeForm');
    const resumeSection = document.getElementById('resume');

    const resumeName = document.getElementById('resumeName');
    const resumeEmail = document.getElementById('resumeEmail');
    const resumePhone = document.getElementById('resumePhone');
    const resumeAbout = document.getElementById('resumeAbout').querySelector('p');
    const resumeEducation = document.getElementById('resumeEducation').querySelector('p');
    const resumeExperience = document.getElementById('resumeExperience').querySelector('p');
    const resumeSkillsList = document.getElementById('skillsList');

    const downloadBtn = document.getElementById('download-btn');
    const editBtn = document.getElementById('edit-btn');
    const shareBtn = document.getElementById('share-btn');
    const shareLinkInput = document.getElementById('shareLink');

    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Capture form input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const about = document.getElementById('about').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value.split(',');

        // Populate the resume with the captured input
        resumeName.textContent = name;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent = `Phone: ${phone}`;
        resumeAbout.textContent = about;
        resumeEducation.textContent = education;
        resumeExperience.textContent = experience;

        // Clear the skills list and add new skills
        resumeSkillsList.innerHTML = '';
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill.trim();
            resumeSkillsList.appendChild(li);
        });

        // Make the resume section visible
        resumeSection.style.display = 'block';

        // Generate a shareable link based on the user's name
        const baseUrl = window.location.href.split('?')[0];
        const shareableLink = `${baseUrl}?name=${encodeURIComponent(name)}`;

        // Show the generated link in the UI
        shareLinkInput.value = shareableLink;
        shareLinkInput.style.display = 'inline';
        shareLinkInput.readOnly = true;
    });

    // Enable content editing
    editBtn.addEventListener('click', function () {
        const editable = resumeName.contentEditable === 'true' ? 'false' : 'true';
        resumeName.contentEditable = editable;
        resumeEmail.contentEditable = editable;
        resumePhone.contentEditable = editable;
        resumeAbout.contentEditable = editable;
        resumeEducation.contentEditable = editable;
        resumeExperience.contentEditable = editable;
        editBtn.textContent = editable === 'true' ? 'Disable Editing' : 'Enable Editing';
    });

    // Download resume as PDF using jsPDF
    downloadBtn.addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text(resumeName.textContent, 10, 10);
        doc.text(resumeEmail.textContent, 10, 20);
        doc.text(resumePhone.textContent, 10, 30);
        doc.text('About Me:', 10, 40);
        doc.text(resumeAbout.textContent, 10, 50);
        doc.text('Education:', 10, 60);
        doc.text(resumeEducation.textContent, 10, 70);
        doc.text('Experience:', 10, 80);
        
        doc.text('Skills:', 10, 90);
        let skillPosY = 100;
        resumeSkillsList.querySelectorAll('li').forEach((li) => {
            doc.text(`- ${li.textContent}`, 10, skillPosY);
            skillPosY += 10;
        });

        doc.save('resume.pdf');
    });

    // Share link copy functionality
    shareBtn.addEventListener('click', function () {
        shareLinkInput.select();
        document.execCommand('copy');
        alert('Shareable link copied to clipboard!');
    });
});
