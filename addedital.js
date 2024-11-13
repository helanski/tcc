// Contador global de ID para os editais
let editalId = 1;

// Função para adicionar o edital
document.getElementById('addButton').addEventListener('click', function() {
    // Pegando o valor do título
    const titleInput = document.getElementById('titleInput').value.trim();

    // Verifica se o título foi preenchido
    if (titleInput === '') {
        alert('Por favor, insira o título do edital.');
        return;
    }

    // Criando a nova linha da tabela
    const tr = document.createElement('tr');

    // Definindo as células
    const tdId = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdActions = document.createElement('td');

    // Atribuindo os valores nas células
    tdId.textContent = editalId++;  // Incrementa o ID a cada novo edital
    tdTitle.textContent = titleInput;  // Título do edital

    // Botões de ação: editar, excluir e concluir
    tdActions.innerHTML = `
        <button class="btn btn-warning btn-sm edit-btn"><i class="fas fa-edit"></i> Editar</button>
        <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash-alt"></i> Excluir</button>
        <button class="btn btn-success btn-sm done-btn"><i class="fas fa-check"></i> Concluir</button>
    `;

    // Adicionando a nova linha na tabela
    const editaisList = document.getElementById('editaisList');
    editaisList.appendChild(tr);

    // Adicionando as células à linha
    tr.appendChild(tdId);
    tr.appendChild(tdTitle);
    tr.appendChild(tdActions);

    // Função para excluir o edital
    tdActions.querySelector('.delete-btn').addEventListener('click', function() {
        tr.remove();
    });

    // Função para editar o edital
    tdActions.querySelector('.edit-btn').addEventListener('click', function() {
        const inputTitle = document.createElement('input');
        inputTitle.value = tdTitle.textContent;

        tdTitle.textContent = '';  // Limpa o conteúdo da célula
        tdTitle.appendChild(inputTitle);  // Coloca o input no lugar do texto

        // Salva a edição ao perder o foco ou ao pressionar Enter
        inputTitle.addEventListener('blur', function() {
            tdTitle.textContent = inputTitle.value.trim() || tdTitle.textContent;
        });

        inputTitle.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                tdTitle.textContent = inputTitle.value.trim() || tdTitle.textContent;
            }
        });
    });

    // Função para concluir (salvar) o edital
    tdActions.querySelector('.done-btn').addEventListener('click', function() {
        tdTitle.textContent = tdTitle.textContent;  // Apenas mantém o texto atual
    });

    // Limpa o campo de título após adicionar
    document.getElementById('titleInput').value = '';
});
