const signupView = `
    <form class="auth-form" novalidate>
    <h1 class="auth-form__headline">РЕГИСТРАЦИЯ</h1>

    <label class="auth-form__label" for="login">Логин</label>
    <input class="auth-form__input auth-form__input_login"
        type="text" id="login" minlength="4" maxlength="15"
        autofocus required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_login"
        id="login_error">Error</div>

    <label class="auth-form__label" for="email">Почта</label>
    <input class="auth-form__input auth-form__input_email"
        type="email" id="email" required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_email"
        id="email_error">Error</div>

    <label class="auth-form__label" for="password">Пароль</label>
    <input class="auth-form__input auth-form__input_password"
        type="password" id="password" minlength="4"
        maxlength="15" required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_password"
        id="password_error">Error</div>

    <button class="auth-form__button auth-form__button_signup"
        type="submit">Зарегистрироваться</button>
    </form>
`;

export default signupView;