const heading = document.querySelector("h1")
heading.textContent = "Ashish Krishna";

const fetchAboutMe = async () => {
    const response = await fetch('./data/aboutMeData.json');
    const data = await response.json();

    const aboutMeFragment = document.createDocumentFragment();
    const aboutMeP = document.createElement('p');
    aboutMeP.textContent = data.aboutMe;
    aboutMeFragment.appendChild(aboutMeP);

    const aboutMeImgDiv = document.createElement('div');
    aboutMeImgDiv.classList.add('headshotContainer');
    const aboutMeImg = document.createElement('img');
    aboutMeImg.src = data.headshot.replace(/^\.\.\//, './');
    aboutMeImgDiv.appendChild(aboutMeImg);
    aboutMeFragment.appendChild(aboutMeImgDiv);

    document.querySelector("#aboutMe").appendChild(aboutMeFragment);
}

fetchAboutMe();

const projectList = document.querySelector("#projectList")
const spotlightSection = document.querySelector("#projectSpotlight")
const spotlightTitles = document.querySelector("#spotlightTitles")
const scrollArrowLeft = document.querySelector('#projectNavArrows > span.arrow-left');
const scrollArrowRight = document.querySelector('#projectNavArrows > span.arrow-right');
const isDesktop = window.matchMedia('(min-width: 1024px)');

const updateSpotlightSection = (projectData) => {
    spotlightTitles.replaceChildren();
    const spotlightTitlesFragment = document.createDocumentFragment();
    const imageSrc = projectData.spotlight_image ? projectData.spotlight_image.replace(/^\.\.\//, './') : './images/spotlight_placeholder_bg.webp';
    spotlightSection.style.backgroundImage = `url(${imageSrc})`;
    spotlightSection.style.backgroundSize = 'cover';
    spotlightSection.style.backgroundPosition = 'center';
    spotlightSection.style.backgroundRepeat = 'no-repeat';
    const projectTitle = document.createElement('h3');
    projectTitle.textContent = projectData.project_name;
    const projectDescription = document.createElement('p');
    projectDescription.textContent = projectData.long_description ? projectData.long_description : (projectData.short_description || "No description available.");
    const projectLink = document.createElement('a');
    projectLink.href = projectData.url ? projectData.url : "#";
    projectLink.textContent = "Click here to see more...";
    spotlightTitlesFragment.appendChild(projectTitle);
    spotlightTitlesFragment.appendChild(projectDescription);
    spotlightTitlesFragment.appendChild(projectLink);
    spotlightTitles.appendChild(spotlightTitlesFragment);
}

const fetchProjects = async () => {
    const response = await fetch('./data/projectsData.json');
    const data = await response.json();

    const projectFragment = document.createDocumentFragment();
    data.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('projectCard');
        projectCard.id = project.project_id;
        const imageSrc = project.card_image ? project.card_image.replace(/^\.\.\//, './') : './images/card_placeholder_bg.webp';
        projectCard.style.backgroundImage = `url(${imageSrc})`;
        const projectTitle = document.createElement('h4');
        projectTitle.textContent = project.project_name;
        const projectDescription = document.createElement('p');
        projectDescription.textContent = project.short_description ? project.short_description : project.long_description.substring(0, 50) + "...";
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDescription);
        projectFragment.appendChild(projectCard);
    });

    projectList.appendChild(projectFragment);

    scrollArrowLeft.addEventListener('click', () => {
        if (isDesktop.matches) {
            projectList.scrollBy({ top: -200, behavior: 'smooth' });
        } else {
            projectList.scrollBy({ left: -200, behavior: 'smooth' });
        }
    });
    scrollArrowRight.addEventListener('click', () => {
        if (isDesktop.matches) {
            projectList.scrollBy({ top: 200, behavior: 'smooth' });
        } else {
            projectList.scrollBy({ left: 200, behavior: 'smooth' });
        }
    });

    updateSpotlightSection(data[0]);

    projectList.addEventListener("click", (event) => {
        const card = event.target.closest(".projectCard");
        if (card) {
            const projectData = data.find(project => project.project_id === card.id);
            if (projectData) updateSpotlightSection(projectData);
        }
    });
}

fetchProjects();

const formSection = document.querySelector('#contactContainer');
const emailInput = document.querySelector("#contactEmail");
const messageInput = document.querySelector("#contactMessage");
const emailError = document.querySelector("#emailError");
const messageError = document.querySelector("#messageError");
const charactersLeft = document.querySelector("#charactersLeft");

formSection.addEventListener("submit", (event) => {
    event.preventDefault();
    if (emailInput.value === "") {
        emailError.textContent = "Please enter your email address";
    } else if (messageInput.value === "") {
        messageError.textContent = "Please enter your message";
    } else if (messageInput.value.length > 300) {
        messageError.textContent = "Message must be less than 300 characters";
    } else if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.textContent = "Please enter a valid email";
    } else if (emailInput.value.match(/[^a-zA-Z0-9@._-]/)) {
        emailError.textContent = "Special characters are not allowed in the email";
    } else if (messageInput.value.match(/[^a-zA-Z0-9@._-]/)) {
        messageError.textContent = "Special characters are not allowed in the message";
    }
    else {
        alert("Form validation has passed and message has been submitted successfully");
        emailInput.value = "";
        messageInput.value = "";
        emailError.textContent = "";
        messageError.textContent = "";
    }
});

messageInput.addEventListener("input", () => {
    charactersLeft.textContent = `Characters: ${messageInput.value.length}/300`;
    if (messageInput.value.length > 300) {
        charactersLeft.style.color = "var(--error)";
    } else {
        charactersLeft.style.color = null;
    }
});

