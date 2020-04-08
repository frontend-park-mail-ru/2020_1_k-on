/**
 * Функция для скрытия/показа пароля в форме
 * @param {object} event
 */
const passwordToggler = (event) => {
    const password = document.getElementById('password');
    const eyeHide = document.getElementById('eye-hide');
    const eyeShow = document.getElementById('eye-show');
    if (password.type === 'password') {
        password.type = 'text';
        eyeShow.classList.add('auth-form__eye_hide');
        eyeHide.classList.remove('auth-form__eye_hide');
    } else {
        password.type = 'password';
        eyeHide.classList.add('auth-form__eye_hide');
        eyeShow.classList.remove('auth-form__eye_hide');
    }
};

export default passwordToggler;
