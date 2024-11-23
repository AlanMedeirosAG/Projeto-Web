document.addEventListener('DOMContentLoaded', () => {
    async function carregarHistorico() {
        const container = document.getElementById('historico-container');

        try {
            // Exibe mensagem de carregamento
            container.innerHTML = '<p>Carregando histórico...</p>';

            // Faz a requisição para obter o histórico
            const response = await fetch('http://localhost:3000/historico', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar histórico');
            }

            const historico = await response.json();

            // Limpa o conteúdo existente
            container.innerHTML = '';

            // Verifica se há registros no histórico
            if (historico.length === 0) {
                container.innerHTML = '<p>Nenhum registro no histórico.</p>';
                return;
            }

            // Adiciona cada registro à página
            historico.forEach(entry => {
                const div = document.createElement('div');
                div.className = 'historico-entry';

                // Previne problemas com dados incompletos
                const tituloLivro = entry.livro || 'Título desconhecido';
                const nomeUsuario = entry.usuario || 'Usuário desconhecido';
                const dataEmprestimo = entry.data_emprestimo || 'Data de empréstimo desconhecida';
                const dataDevolucao = entry.data_devolucao || 'Data de devolução desconhecida';

                div.innerHTML = `
                    <h3>${tituloLivro}</h3>
                    <p><strong>Usuário:</strong> ${nomeUsuario}</p>
                    <p><strong>Data de Empréstimo:</strong> ${dataEmprestimo}</p>
                    <p><strong>Data de Devolução:</strong> ${dataDevolucao}</p>
                    <button onclick="Devolver(${livro.idlivro})">Devolver livro</button>
                `;
                container.appendChild(div);
            });
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);

            // Exibe mensagem de erro amigável
            container.innerHTML = '<p>Erro ao carregar o histórico. Tente novamente mais tarde.</p>';
        }
    }

    // Chama a função ao carregar a página
    window.onload = carregarHistorico();
});
