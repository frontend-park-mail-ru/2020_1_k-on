/**
 * Функция для скрытия/показа пароля в форме
 */
const passwordToggler = () => {
    const password = document.getElementById('password');
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
};

export default passwordToggler;
