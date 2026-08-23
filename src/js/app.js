// app.js - Lógica da Lista de Tarefas

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const inputNovaTarefa = document.getElementById('nova-tarefa');
    const btnAdicionar = document.getElementById('btn-adicionar');
    const mensagemVazia = document.getElementById('mensagem-vazia');
    const listaTarefas = document.getElementById('lista-tarefas');

    // Carrega tarefas salvas no navegador (se houver)
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Salva o array de tarefas no localStorage
    function salvarTarefas() {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    // Mostra ou esconde a mensagem de "lista vazia"
    function atualizarMensagemVazia() {
        mensagemVazia.style.display = tarefas.length === 0 ? 'block' : 'none';
    }

    // Cria o elemento <li> de uma tarefa e insere na lista
    function renderizarTarefa(tarefa, index) {
        const li = document.createElement('li');
        li.className = 'tarefa-item';
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }

        // Texto da tarefa
        const span = document.createElement('span');
        span.textContent = tarefa.texto;
        span.className = 'tarefa-texto';
        span.addEventListener('click', () => alternarConcluida(index));

        // Botão de remover
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.className = 'btn-remover';
        btnRemover.addEventListener('click', () => removerTarefa(index));

        li.appendChild(span);
        li.appendChild(btnRemover);
        listaTarefas.appendChild(li);
    }

    // Redesenha a lista inteira a partir do array "tarefas"
    function renderizarLista() {
        listaTarefas.innerHTML = '';
        tarefas.forEach((tarefa, index) => renderizarTarefa(tarefa, index));
        atualizarMensagemVazia();
    }

    // Adiciona uma nova tarefa
    function adicionarTarefa() {
        const texto = inputNovaTarefa.value.trim();

        if (texto === '') {
            return; // não adiciona tarefa vazia
        }

        tarefas.push({ texto: texto, concluida: false });
        salvarTarefas();
        renderizarLista();

        inputNovaTarefa.value = '';
        inputNovaTarefa.focus();
    }

    // Marca/desmarca uma tarefa como concluída
    function alternarConcluida(index) {
        tarefas[index].concluida = !tarefas[index].concluida;
        salvarTarefas();
        renderizarLista();
    }

    // Remove uma tarefa da lista
    function removerTarefa(index) {
        tarefas.splice(index, 1);
        salvarTarefas();
        renderizarLista();
    }

    // Eventos
    btnAdicionar.addEventListener('click', adicionarTarefa);

    inputNovaTarefa.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            adicionarTarefa();
        }
    });

    // Renderiza a lista assim que a página carrega
    renderizarLista();
});