const loginEndPoint = 'http://127.0.0.1:8000/login';

var btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", function (event) {
    event.preventDefault();
    fetchLogin();
});

function fetchLogin() {
    const formData = new FormData();

    formData.append('email', document.getElementById("login-email").value);
    formData.append('password', document.getElementById("login-password").value);

    const jsonData = JSON.stringify(Object.fromEntries(formData));

    fetch(loginEndPoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Falha no login!");
        }
    }).then(data => {
        localStorage.setItem('token', data.access_token);
        // swal
        Swal.fire({
            heightAuto: false,
            "icon": "success",
            "title": "Login",
            "text": "Login bem-sucedido!"
        }).then(() => {
            localStorage.setItem('logado', true);
            window.location.replace("http://127.0.0.1:8000/front/index.html");
        })


    }).catch(error => {
        // swal
        Swal.fire({
            heightAuto: false,
            "icon": "error",
            "title": "Erro",
            "text": "Usuário não encontrado: Verifique o email e senha."
        });
        console.error('Erro:', error);
    });
}