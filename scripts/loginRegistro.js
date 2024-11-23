document.addEventListener("DOMContentLoaded", function() {
    const toSignUpButtons = document.querySelectorAll('.sign-up-button');
    const switchToLibrarianButtons = document.querySelectorAll('.switch-to-librarian');
    const switchToUserButtons = document.querySelectorAll('.switch-to-user');
    const switchToUserBibliotecario = document.querySelector('.switch-to-user-bibliotecario');

    const loginForm = document.getElementById('login-form');
    const loginBibliotecarioForm = document.getElementById('loginbibliotecario-form');
    const registerForm = document.getElementById('register-form');

    function hideAllForms() {
        if (loginForm) loginForm.classList.remove('active');
        if (loginBibliotecarioForm) loginBibliotecarioForm.classList.remove('active');
        if (registerForm) registerForm.classList.remove('active');
    }

    if (loginForm) loginForm.classList.add('active');

    // Alternar para o formulário de registro
    toSignUpButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideAllForms();
            if (registerForm) registerForm.classList.add('active');
        });
    });

    // Alternar para o formulário de login de bibliotecário
    switchToLibrarianButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideAllForms();
            if (loginBibliotecarioForm) loginBibliotecarioForm.classList.add('active');
        });
    });

    // Alternar de volta para o formulário de login de usuário
    switchToUserButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideAllForms();
            if (loginForm) loginForm.classList.add('active');
        });
    });

    if (switchToUserBibliotecario) {
        switchToUserBibliotecario.addEventListener('click', () => {
            hideAllForms();
            if (loginForm) loginForm.classList.add('active');
        });
    }

    // Funções de login e registro
    async function loginUsuario(event) {
        event.preventDefault();
        const email = document.getElementById('login-username').value;
        const senha = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                alert(jsonResponse.message);
                window.location.href = '../view/menuprincipalusuario.html';
            } else {
                const errorResponse = await response.json();
                alert(`Erro: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            alert(`Erro ao conectar ao servidor: ${error.message}`);
        }
    }

    async function loginBibliotecario(event) {
        event.preventDefault();
        const email = document.getElementById('loginbibliotecario-username').value;
        const senha = document.getElementById('loginbibliotecario-password').value;

        // Testes
        console.log("Email capturado:", email);
        console.log("Senha capturada:", senha);

        try {
            const response = await fetch('http://localhost:3000/bibliotecario/loginbibliotecario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                alert(jsonResponse.message);
                window.location.href = '../view/menuestoque-bibliotecario.html';
            } else {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorResponse = await response.json();
                    alert(`Erro: ${errorResponse.message}`);
                } else {
                    const errorText = await response.text();
                    alert(`Erro inesperado: ${errorText}`);
                }
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            alert(`Erro ao conectar ao servidor: ${error.message}`);
        }
    }

    async function registrarUsuario(event) {
        event.preventDefault();
        const nome = document.getElementById('register-nome').value;
        const email = document.getElementById('register-username').value;
        const senha = document.getElementById('register-password').value;

        try {
            const response = await fetch('http://localhost:3000/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha, tipo_usuario: "comum" }),
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                alert(jsonResponse.message);
                if (registerForm) registerForm.reset();
                hideAllForms();
                if (loginForm) loginForm.classList.add('active');
            } else {
                const errorResponse = await response.json();
                alert(`Erro: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            alert(`Erro ao conectar ao servidor: ${error.message}`);
        }
    }

    // Adicionando os listeners de eventos aos formulários se eles existirem
    if (loginForm) loginForm.addEventListener('submit', loginUsuario);
    if (loginBibliotecarioForm) loginBibliotecarioForm.addEventListener('submit', loginBibliotecario);
    if (registerForm) registerForm.addEventListener('submit', registrarUsuario);
});
