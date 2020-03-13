/**
 * Функция для скрытия/показа пароля в форме
 * @param {object} event
 */
const passwordToggler = (event) => {
    const password = document.getElementById('password');
    if (password.type === 'password') {
        password.type = 'text';
        event.target.src = '/static/img/eye-hide.svg';
    } else {
        password.type = 'password';
        event.target.src = '/static/img/eye-show.svg';
    }
};

export default passwordToggler;
