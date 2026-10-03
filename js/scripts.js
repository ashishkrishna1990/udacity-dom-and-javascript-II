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



