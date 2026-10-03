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
    document.querySelector("#projectList").appendChild(projectFragment);
}

fetchProjects();

