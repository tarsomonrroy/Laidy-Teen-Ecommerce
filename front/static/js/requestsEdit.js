const editEndPoint = `http://127.0.0.1:8000/usuario`

var rename = document.getElementById("register-name");
var reemail = document.getElementById("register-email");
var pass = document.getElementById("register-password");
var passConf = document.getElementById("confirm-password");
var btnSave = document.getElementById("btnSalvar");

btnSave.addEventListener("click", function (event) {
    // console.log("a");
    event.preventDefault();
    fetchEdit();
});

function fetchEdit() {
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const novosDados = new FormData();

    novosDados.append('id', decodedToken.id);
    novosDados.append('fullName', document.getElementById("register-name").value);
    novosDados.append('email', document.getElementById("register-email").value);
    novosDados.append('password', document.getElementById("register-password").value);

    jsonData = JSON.stringify(Object.fromEntries(novosDados));

    console.log(jsonData)
    fetch(editEndPoint, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: jsonData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta de rede');
        }
        return response.json();
    }).then(data => {
        // swal
        Swal.fire({
            heightAuto: false,
            "icon": "success",
            "title": "Editado",
            "text": "Usuário editado!"
        }).then(() => {
            localStorage.setItem('token', data.token)
            location.reload();
        })

    }).catch(error => {
        console.log(error);
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