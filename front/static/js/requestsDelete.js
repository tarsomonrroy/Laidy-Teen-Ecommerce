const deleteEndPoint = 'http://127.0.0.1:8000/usuario';

var btnDelete = document.getElementById("btn-delete");
btnDelete.addEventListener("click", function (event) {
    event.preventDefault();
    Swal.fire({
        title: "Tem certeza?",
        text: "Essa ação não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            fetchDelete();
        } else {
            return;
        }
    });

});

function fetchDelete() {
    const token = localStorage.getItem("token")

    fetch(deleteEndPoint, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => {
        if (response.ok) {
            console.log(response);
            return response.json();
        } else {
            throw Error("Erro ao deletar");
        }
    }).then(data => {
        console.log(data);
        // swal
        Swal.fire({
            heightAuto: false,
            "icon": "info",
            "title": "Excluído",
            "text": "Usuário excluído."
        }).then(() => {
            localStorage.clear();
            window.location.replace("http://127.0.0.1:8000/front/index.html");
        });
    }).catch(error => {
        console.log(error);
    });
}