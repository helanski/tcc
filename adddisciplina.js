// Função para criar uma tabela para a disciplina selecionada
document.getElementById('disciplineSelect').addEventListener('change', function() {
    const discipline = this.value;
    const tablesContainer = document.getElementById('tablesContainer');

    // Limpa as tabelas anteriores
    tablesContainer.innerHTML = '';

    // Se nenhuma disciplina for selecionada, não faz nada
    if (!discipline) return;

    // Cria uma nova tabela para a disciplina selecionada
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    table.innerHTML = `
        <thead>
            <tr>
                <th>#</th>
                <th>Conteúdo</th>
                <th>Descrição</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody id="${discipline}Table"></tbody>
    `;

    const tbody = table.querySelector('tbody');
    
    // Adiciona a tabela ao container
    tableContainer.appendChild(table);
    tablesContainer.appendChild(tableContainer);

    // Função para adicionar um conteúdo
    const addContent = (name, description = '') => {
        const row = document.createElement('tr');
        const rowCount = tbody.rows.length + 1;

        row.innerHTML = `
            <td>${rowCount}</td>
            <td>${name}</td>
            <td>${description || 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn">Excluir</button>
                <button class="btn btn-success btn-sm save-btn" style="display:none;">Salvar</button>
            </td>
        `;

        tbody.appendChild(row);

        // Função de editar
        row.querySelector('.edit-btn').addEventListener('click', function() {
            const contentName = row.querySelector('td:nth-child(2)');
            const contentDescription = row.querySelector('td:nth-child(3)');

            // Criando inputs para editar
            const nameInput = document.createElement('input');
            nameInput.value = contentName.textContent;
            contentName.textContent = '';
            contentName.appendChild(nameInput);

            const descInput = document.createElement('input');
            descInput.value = contentDescription.textContent === 'N/A' ? '' : contentDescription.textContent;
            contentDescription.textContent = '';
            contentDescription.appendChild(descInput);

            // Exibir botão salvar
            row.querySelector('.save-btn').style.display = 'inline-block';
            row.querySelector('.edit-btn').style.display = 'none';
        });

        // Função de excluir
        row.querySelector('.delete-btn').addEventListener('click', function() {
            tbody.removeChild(row);
        });

        // Função de salvar
        row.querySelector('.save-btn').addEventListener('click', function() {
            const nameInput = row.querySelector('input');
            const descInput = row.querySelector('input:nth-child(2)');

            contentName.textContent = nameInput.value;
            contentDescription.textContent = descInput.value || 'N/A';

            // Esconde o botão salvar e mostra o botão editar novamente
            row.querySelector('.save-btn').style.display = 'none';
            row.querySelector('.edit-btn').style.display = 'inline-block';
        });
    };

    // Função para adicionar um novo conteúdo
    const contentInput = document.createElement('div');
    contentInput.classList.add('row', 'mb-3');
    contentInput.innerHTML = `
        <div class="col-md-6">
            <input type="text" id="contentName" class="form-control" placeholder="Nome do Conteúdo">
        </div>
        <div class="col-md-6">
            <button id="addContentBtn" class="btn btn-primary w-100">Adicionar Conteúdo</button>
        </div>
    `;
    
    // Adiciona o campo de input ao container
    tableContainer.prepend(contentInput);

    // Ação do botão "Adicionar Conteúdo"
    contentInput.querySelector('#addContentBtn').addEventListener('click', function() {
        const contentName = document.getElementById('contentName').value;
        if (!contentName) return alert('Por favor, insira o nome do conteúdo.');

        // Adiciona o conteúdo à tabela
        addContent(contentName);
        document.getElementById('contentName').value = '';  // Limpa o campo de input
    });
});
