const decodedToken = jwt_decode(localStorage.getItem("token"));

function enableEdit() {
    document.getElementById('edit-form').style.display = 'block';
    document.getElementById('btn-edit').disabled = true;
    document.getElementById('btn-delete').disabled = true;
}

function cancelEdit() {
    document.getElementById('edit-form').reset();
    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('btn-edit').disabled = false;
    document.getElementById('btn-delete').disabled = false;
}

function loadData() {
    document.getElementById("nomeLbl").textContent = "Nome: " + decodedToken.fullName;
    document.getElementById("emailLbl").textContent = "Email: " + decodedToken.email;
}

loadData();