document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado!");

    // Carregar os livros
    carregarLivros()
        .then(() => console.log("Livros carregados com sucesso."))
        .catch((error) => console.error("Erro ao carregar livros:", error));

    // Formulário de adicionar livro
    const addLivroForm = document.getElementById('add-livro-form');
    if (addLivroForm) {
        addLivroForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            const livroData = {
                titulo: document.getElementById('tituloadd').value,
                autor: document.getElementById('autoradd').value,
                genero: document.getElementById('generoadd').value,
                isbn: document.getElementById('isbnadd').value,
                quantidade: document.getElementById('quantidadeadd').value
            };

            // Envia a requisição para adicionar o livro
            fetch('http://localhost:3000/livro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livroData)
            })
                .then(response => {
                    console.log("Status da resposta:", response.status);
                    if (!response.ok) {
                        throw new Error(`Erro do servidor: ${response.status} - ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Dados recebidos do backend:", data);
                    if (data.message) {
                        alert(data.message);
                        carregarLivros(); // Recarregar a lista de livros
                    }
                })
                .catch(error => {
                    console.error("Erro ao adicionar livro:", error);
                    alert("Erro ao adicionar livro.");
                });
        });
    }

    // Adicionando o event listener de exclusão
    const livrosContainer = document.getElementById('livros-container');
    if (livrosContainer) {
        livrosContainer.addEventListener('click', function(event) {
            if (event.target && event.target.classList.contains('deletar-livro')) {
                const livroId = event.target.getAttribute('data-id');
                deletarLivro(livroId); // Passa o ID diretamente da estrutura do botão
            }
        });
    }
});

// Função para deletar livro
function deletarLivro(idlivro) {
    console.log('ID do livro:', idlivro);
    fetch(`http://localhost:3000/livro/livro/${idlivro}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                alert('Livro apagado com sucesso!');
                carregarLivros(); // Recarregar a lista de livros após a exclusão
            } else {
                // Se não for bem-sucedido, mostrar o erro
                response.json().then(errorData => {
                    const errorMessage = errorData.message || 'Erro ao apagar livro. Tente novamente.';
                    alert(errorMessage);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao apagar livro:', error);
            alert('Erro ao apagar livro. Tente novamente.');
        });
}


// Função para carregar os livros
async function carregarLivros() {
    const container = document.getElementById('livros-container');

    try {
        container.innerHTML = '<p>Carregando livros...</p>';

        const response = await fetch('http://localhost:3000/livro', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Erro ao buscar livros');
        }

        const livros = await response.json();
        container.innerHTML = '';

        if (livros.length === 0) {
            container.innerHTML = '<p>Nenhum livro disponível.</p>';
            return;
        }

        livros.forEach(livro => {
            const div = document.createElement('div');
            div.className = 'livro';

            const titulo = livro.titulo || 'Título desconhecido';
            const autor = livro.autor || 'Autor desconhecido';
            const genero = livro.genero || 'Gênero desconhecido';
            const quantidade = livro.quantidade || 'Quantidade desconhecida';

            div.innerHTML = `
                <h2>${titulo}</h2>
                <p><strong>Autor:</strong> ${autor}</p>
                <p><strong>Gênero:</strong> ${genero}</p>
                <p><strong>Quantidade:</strong> ${quantidade}</p>
                <button onclick="editarLivro(${livro.idlivro})">Editar</button>
                <button data-id="${livro.idlivro}" class="deletar-livro">Apagar</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
        container.innerHTML = '<p>Erro ao carregar os livros. Tente novamente mais tarde.</p>';
    }
}

// Função para editar livro
function editarLivro(idlivro) {
    fetch(`http://localhost:3000/livro/${idlivro}`)
        .then(response => response.json())
        .then(livro => {
            document.getElementById('livroId').value = livro.idlivro;
            document.getElementById('titulo').value = livro.titulo;
            document.getElementById('autor').value = livro.autor;
            document.getElementById('quantidade').value = livro.quantidade;
            document.getElementById('livroModal').style.display = 'block';
        })
        .catch(error => console.error('Erro ao buscar livro:', error));
}

