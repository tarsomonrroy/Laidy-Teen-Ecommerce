var passwordInput = document.getElementById('login-password');
var eyeIcon = document.getElementById('eye-icon');

eyeIcon.addEventListener('mousedown', () => {
    passwordInput.type = 'text';
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
});
eyeIcon.addEventListener('mouseup', () => {
    passwordInput.type = 'password';
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
});
eyeIcon.addEventListener('mouseleave', () => {
    passwordInput.type = 'password';
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
});