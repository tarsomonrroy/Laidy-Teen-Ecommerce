const registerEndPoint = 'http://127.0.0.1:8000/usuario';

// Fetch registrar
var rename = document.getElementById("register-name");
var reemail = document.getElementById("register-email");
var pass = document.getElementById("register-password");
var passConf = document.getElementById("confirm-password");
var btnRegistrar = document.getElementById("btn-registrar");

btnRegistrar.addEventListener("click", function (event) {
    event.preventDefault();
    fetchRegister();
});

function fetchRegister() {
    if(!validateForm()) return;

    const formData = new FormData();

    formData.append('fullName', document.getElementById("register-name").value);
    formData.append('email', document.getElementById("register-email").value);
    formData.append('password', document.getElementById("register-password").value);

    jsonData = JSON.stringify(Object.fromEntries(formData));

    for (var key of formData.keys()) {
        console.log(key + ': ' + formData.get(key));
    }

    //fetch
    fetch(registerEndPoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error("Erro: Email já cadastrado.");
        } else {
            throw new Error("Erro ao cadastrar usuário");
        }
    }).then(data => {
        // swal
        Swal.fire({
            heightAuto: false,
            "icon": "success",
            "title": "Cadastrado",
            "text": "Cadastrado: " + data.fullName
        }).then(() => {
            window.location.replace("http://127.0.0.1:8000/front/login.html");
        })


    }).catch(error => {
        // swal
        Swal.fire({
            heightAuto: false,
            "icon": "error",
            "title": "Erro",
            "text": "Erro: " + error
        });
    });
}

var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
    if (rename.value.trim().length <= 0) return false;
    if (reemail.value.trim().length <= 0) return false;
    if (!emailRegex.test(reemail.value)) return false;
    if (pass.value.trim().length <= 0) return false;
    if (!passRegex.test(pass.value)) return false;
    if (passConf.value.trim().length <= 0) return false;
    if (pass.value != passConf.value) return false;
    return true;
}