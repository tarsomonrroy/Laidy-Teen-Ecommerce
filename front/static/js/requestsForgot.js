const forgotEndPoint = `http://127.0.0.1:8000/password-reset/request`

var btnForgot = document.getElementById("btn-forgot");
btnForgot.addEventListener("click", function (event) {
    event.preventDefault();
    fetchForgot();
});

function fetchForgot() {
    var email = document.getElementById("email").value;

    const dados = new FormData();

    dados.append("email", email)

    jsonData = JSON.stringify(Object.fromEntries(dados));
    console.log(jsonData)
    fetch(forgotEndPoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
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
            "title": "Enviado",
            "text": "Email enviado!"
        });
    }).catch(error => {
        console.log(error);
    });
}