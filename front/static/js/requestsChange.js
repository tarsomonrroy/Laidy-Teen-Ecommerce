// Select the form and the input field for the new password
const newPasswordInput = document.getElementById('new-password');
const btn = document.getElementById('btn-new');

// Add an event listener to the form for the submit event
btn.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const token = new URLSearchParams(window.location.search).get('token'); // Get the token from the URL
    const newPassword = newPasswordInput.value; // Get the new password from the input field

    try {
        const response = await fetch(`/reset-password?new_password=${encodeURIComponent(newPassword)}&token=${encodeURIComponent(token)}`, {
            method: 'POST',
        });

        if (response.ok) {
            // Password reset successful, redirect the user to a success page or show a success message
            window.location.href = '/login.html';
        } else {
            // Handle error response from the server
            const responseData = await response.json();
            console.error(responseData.message); // Log the error message
            // swal
            Swal.fire({
                heightAuto: false,
                "icon": "error",
                "title": "Erro",
                "text": "Um erro ocorreu, tente novamente mais tarde."
            });
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        // swal
        Swal.fire({
            heightAuto: false,
            "icon": "error",
            "title": "Erro",
            "text": "Um erro ocorreu, tente novamente mais tarde."
        });
    }
});