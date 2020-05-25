import {DEFAULT_THEME} from 'libs/constants';

export const setTheme = () => {
    let currentTheme = localStorage.getItem('theme');

    if (!currentTheme) {
        currentTheme = DEFAULT_THEME;
        localStorage.setItem('theme', currentTheme);
    }

    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    }
};

export const switchTheme = () => {
    const themeAttr = document.body.getAttribute('data-theme');

    if (!themeAttr) {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    }
};
