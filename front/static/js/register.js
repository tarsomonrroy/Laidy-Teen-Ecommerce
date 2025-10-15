var nameInput = document.getElementById("register-name");
var emailInput = document.getElementById("register-email");

var passwordInput = document.getElementById('register-password');

var passwordHelp = document.getElementById('password-help');
var eyeIcon = document.getElementById('eye-icon');

var confirmInput = document.getElementById('confirm-password');
var confirmEyeIcon = document.getElementById('confirm-eye-icon');

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

nameInput.addEventListener("input", function() {
    nameInput.setCustomValidity("");
});
emailInput.addEventListener("input", function() {
    emailInput.setCustomValidity("");
});
passwordInput.addEventListener("input", function() {
    if(!validatePassFormat(false)) passwordHelp.style.display = 'block';
    else passwordHelp.style.display = 'none';
});
confirmInput.addEventListener("input", function() {
    confirmInput.setCustomValidity("");
});

// Mostrar/ocultar Senha
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

// Mostrar/ocultar Confirmar Senha
confirmEyeIcon.addEventListener('mousedown', () => {
    confirmInput.type = 'text';
    confirmEyeIcon.classList.remove('fa-eye');
    confirmEyeIcon.classList.add('fa-eye-slash');
});
confirmEyeIcon.addEventListener('mouseup', () => {
    confirmInput.type = 'password';
    confirmEyeIcon.classList.remove('fa-eye-slash');
    confirmEyeIcon.classList.add('fa-eye');
});
confirmEyeIcon.addEventListener('mouseleave', () => {
    confirmInput.type = 'password';
    confirmEyeIcon.classList.remove('fa-eye-slash');
    confirmEyeIcon.classList.add('fa-eye');
});

// Mostrar/ocultar Dica de Senha
passwordInput.addEventListener('focus', function () {
    if(!validatePassFormat(false)) passwordHelp.style.display = 'block';
    else passwordHelp.style.display = 'none';
});

passwordInput.addEventListener('blur', function () {
    passwordHelp.style.display = 'none';
});

// Validar Formulário
function formValidation() {
    if(!validateName()) return false;
    if(!validateEmail()) return false;
    if(!validatePassFormat(true)) return false;
    if(!validatePassConfirmation()) return false;
    return true;
}

// Validar Nome
function validateName() {
    if(nameInput.value == null || nameInput.value.trim().length <= 0) {
        nameInput.setCustomValidity("Preencha com um nome!");
        nameInput.reportValidity();
        return false;
    } else {
        nameInput.setCustomValidity("");
        return true;
    }
}

// Validar Email
function validateEmail() {
    if(emailInput.value == null || emailInput.value.trim().length <= 0) {
        emailInput.setCustomValidity("Preencha com um email!");
        emailInput.reportValidity();
        return false;
    } else if(!emailRegex.test(emailInput.value)) {
        emailInput.setCustomValidity("Formato de email inválido!");
        emailInput.reportValidity();
        return false;
    } else {
        emailInput.setCustomValidity("");
        return true;
    }
}

// Validar Senha
function validatePassFormat(showMsg) {
    if(passwordInput.value == null || passwordInput.value.trim().length <= 0) {
        if(showMsg) {
            passwordInput.setCustomValidity("Digite uma senha!");
            passwordInput.reportValidity();
        }
        return false;
    } else if(!passRegex.test(passwordInput.value)) {
        if(showMsg) {
            passwordInput.setCustomValidity("Senha não atende aos requisitos!");
            passwordInput.reportValidity();
        }
        return false;
    } else {
        passwordInput.setCustomValidity("");
        return true;
    }
}

// Confirmar Senha
function validatePassConfirmation() {
    if(confirmInput.value == null || confirmInput.value.trim().length <= 0) {
        confirmInput.setCustomValidity("Digite sua senha novamente!");
        confirmInput.reportValidity();
        return false;
    } else if(passwordInput.value != confirmInput.value) {
        confirmInput.setCustomValidity("Senhas diferentes!");
        confirmInput.reportValidity();
        return false;
    } else {
        confirmInput.setCustomValidity("");
        return true;
    }
}