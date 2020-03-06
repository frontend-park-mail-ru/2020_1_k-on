/**
 * Функция для скрытия/показа пароля в форме
 */
const passwordToggler = () => {
    const password = document.getElementById('password');
    password.type = password.type === 'password' ? 'text' : 'password';
};

export default passwordToggler;
