const uploadImage = (event, url) => {
    const file = event.target.files[0];
    const formData = new FormData();
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
        formData.append('file', file);
    }

    fetch(url, {
        method: 'POST',
        body: formData,
    }).then((response) => response.json()).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.error(error);
    });

    const avatar = document.getElementsByClassName('profile-block__avatar')[0];
    avatar.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
};

const addImageHandler = (elementId, url) => {
    document.getElementById(elementId).addEventListener('change', (event) => {
        uploadImage(event, url);
    });
};

addImageHandler('avatar', '/profile');
