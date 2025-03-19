const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

function openVideo(url) {
    document.getElementById('video-frame').src = url;
    document.getElementById('video-player').style.display = 'block';
}

function closeVideo() {
    document.getElementById('video-frame').src = '';
    document.getElementById('video-player').style.display = 'none';
}

function showVideoDetails(title, staffel, folge, url) {
    document.getElementById('video-title').textContent = title;
    document.getElementById('video-staffel').textContent = staffel;
    document.getElementById('video-folge').textContent = folge;
    document.getElementById('video-frame').src = url;
    document.getElementById('video-details').style.display = 'block';
}

// Define video URLs for each video
const videoUrls = {
    "Video 1": {
        "1": {
            "1": "https://www.youtube.com/embed/VzeC0-Wo1OA?",
            "2": "https://www.youtube.com/embed/IRI91eq5eSM?"
        }
    },
    "Video 2": {
        "2": {
            "4": "https://www.youtube.com/embed/specialVideo2"
        }
    },
    "Video 3": {
        "1": {
            "1": "https://www.youtube.com/embed/specialVideo3"
        }
    }
};

function openVideoMenu(title, thumbnail, description, videoId) {
    document.getElementById('menu-title').textContent = title;
    document.getElementById('menu-thumbnail').src = thumbnail;
    document.getElementById('menu-description').textContent = description;
    document.getElementById('video-menu').style.display = 'block';

    // Populate Staffel and Folge options dynamically based on videoUrls
    const staffelSelect = document.getElementById('staffel-select');
    const folgeSelect = document.getElementById('folge-select');
    staffelSelect.innerHTML = '';
    folgeSelect.innerHTML = '';

    const videoData = videoUrls[title];
    if (videoData) {
        // Populate Staffel options
        Object.keys(videoData).forEach(staffel => {
            staffelSelect.innerHTML += `<option value="${staffel}">Staffel ${staffel}</option>`;
        });

        // Populate Folge options for the first Staffel by default
        const firstStaffel = Object.keys(videoData)[0];
        Object.keys(videoData[firstStaffel]).forEach(folge => {
            folgeSelect.innerHTML += `<option value="${folge}">Folge ${folge}</option>`;
        });
    }

    updateVideoFrame();
}

function closeVideoMenu() {
    document.getElementById('video-menu').style.display = 'none';
    document.getElementById('video-frame').src = '';
}

function updateVideoFrame() {
    const staffel = document.getElementById('staffel-select').value;
    const folge = document.getElementById('folge-select').value;
    const title = document.getElementById('menu-title').textContent;

    const videoUrl = videoUrls[title]?.[staffel]?.[folge] || '';
    if (!videoUrl) {
        alert('Dieses Staffel- und Folge-Kombination ist nicht verfügbar.');
        document.getElementById('video-frame').src = '';
        return;
    }

    document.getElementById('video-frame').src = videoUrl;
}

document.getElementById('staffel-select').addEventListener('change', () => {
    const title = document.getElementById('menu-title').textContent;
    const staffel = document.getElementById('staffel-select').value;
    const folgeSelect = document.getElementById('folge-select');
    folgeSelect.innerHTML = '';

    // Update Folge options dynamically based on the selected Staffel
    const videoData = videoUrls[title];
    if (videoData && videoData[staffel]) {
        Object.keys(videoData[staffel]).forEach(folge => {
            folgeSelect.innerHTML += `<option value="${folge}">Folge ${folge}</option>`;
        });
    }

    updateVideoFrame();
});

function setLanguage(lang) {
    document.querySelectorAll('[data-de], [data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // Update active button
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.language-switcher button[onclick="setLanguage('${lang}')"]`).classList.add('active');
}
