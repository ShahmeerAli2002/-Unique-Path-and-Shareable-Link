// // Getting form elements
// const form = document.getElementById('resumeForm') as HTMLFormElement;
// const nameInput = document.getElementById('name') as HTMLInputElement;
// const emailInput = document.getElementById('email') as HTMLInputElement;
// const phoneInput = document.getElementById('phone') as HTMLInputElement;
// const aboutInput = document.getElementById('about') as HTMLTextAreaElement;
// const educationInput = document.getElementById('education') as HTMLInputElement;
// const experienceInput = document.getElementById('experience') as HTMLInputElement;
// const skillsInput = document.getElementById('skills') as HTMLInputElement;

// // Getting resume display elements
// const resumeName = document.getElementById('resumeName');
// const resumeEmail = document.getElementById('resumeEmail');
// const resumePhone = document.getElementById('resumePhone');
// const resumeAbout = document.getElementById('resumeAbout').getElementsByTagName('p')[0];
// const resumeEducation = document.getElementById('resumeEducation').getElementsByTagName('p')[0];
// const resumeExperience = document.getElementById('resumeExperience').getElementsByTagName('p')[0];
// const skillsList = document.getElementById('skillsList');

// // Add event listener to form submission
// form.addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent the form from submitting the traditional way

//     // Update resume content with user input
//     resumeName!.innerText = nameInput.value;
//     resumeEmail!.innerText = `Email: ${emailInput.value}`;
//     resumePhone!.innerText = `Phone: ${phoneInput.value}`;
//     resumeAbout!.innerText = aboutInput.value;
//     resumeEducation!.innerText = educationInput.value;
//     resumeExperience!.innerText = experienceInput.value;

//     // Clear skills list and add new skills
//     skillsList!.innerHTML = '';
//     const skills = skillsInput.value.split(','); // Split comma-separated values
//     skills.forEach(skill => {
//         const li = document.createElement('li');
//         li.innerText = skill.trim();
//         skillsList!.appendChild(li);
//     });
// });
// Getting references to elements
const editButton = document.getElementById('edit-btn') as HTMLButtonElement;
const resume = document.getElementById('resume') as HTMLElement;
const editableSections = ['name', 'email', 'education', 'work-experience', 'skills'];

// Function to enable content editing
function enableEditing() {
  editableSections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.contentEditable = 'true'; // Make it editable
      section.style.border = '1px solid #ccc'; // Optional: Add border to indicate editing
    }
  });

  // Change the button text to indicate save action
  editButton.textContent = 'Save Changes';
  editButton.removeEventListener('click', enableEditing);
  editButton.addEventListener('click', saveChanges);
}

// Function to save the changes
function saveChanges() {
  editableSections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.contentEditable = 'false'; // Disable editing
      section.style.border = 'none'; // Remove the border
    }
  });

  // Revert the button back to edit mode
  editButton.textContent = 'Enable Editing';
  editButton.removeEventListener('click', saveChanges);
  editButton.addEventListener('click', enableEditing);
}

// Add event listener to the edit button
editButton.addEventListener('click', enableEditing);

// Optional: Save changes when pressing Enter inside an editable field
editableSections.forEach((id) => {
  const section = document.getElementById(id);
  if (section) {
    section.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent creating new lines
        saveChanges();
      }
    });
  }
});
