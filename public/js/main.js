document.addEventListener('DOMContentLoaded', () => {

    // --- Requisito 1.2: Filtro/Busca ao vivo ---
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('#card-container .card');
        
        cards.forEach(card => {
            const cardText = card.textContent || card.innerText;
            if (cardText.toLowerCase().includes(filter)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });

    // --- Lógica do Modal ---
    const modal = document.getElementById('fichaModal');
    const addBtn = document.getElementById('addRecordBtn');
    const closeBtn = document.querySelector('.modal .close-btn');

    addBtn.onclick = () => {
        // Limpa o formulário para uma nova entrada
        document.getElementById('fichaForm').reset();
        document.getElementById('modalTitle').innerText = "Adicionar Nova Ficha";
        document.getElementById('componentes-container').innerHTML = '';
        modal.style.display = "block";
    }

    closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- Requisito 2.2 e 2.3: Adicionar/Remover campos dinâmicos ---
    const addComponenteBtn = document.getElementById('addComponenteBtn');
    const componentesContainer = document.getElementById('componentes-container');

    addComponenteBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.classList.add('dynamic-field');
        div.innerHTML = `
            <input type="text" placeholder="Nome do Componente" name="componente_nome">
            <input type="text" placeholder="Observação" name="componente_obs">
            <button type="button" class="btn-remove-field">Remover</button>
        `;
        componentesContainer.appendChild(div);
    });

    // Delegação de evento para o botão de remover
    componentesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove-field')) {
            e.target.parentElement.remove();
        }
    });
    
    // --- Lógica para os botões de Editar e Deletar (simulação) ---
    document.getElementById('card-container').addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;

        if (e.target.classList.contains('btn-edit')) {
            alert(`Funcionalidade "Editar" para a Ficha ID ${card.dataset.id}. (Implementação completa requer backend)`);
            // Aqui você preencheria o modal com os dados da ficha
            document.getElementById('modalTitle').innerText = "Editar Ficha";
            modal.style.display = "block";
        }

        if (e.target.classList.contains('btn-delete')) {
            if (confirm(`Tem certeza que deseja excluir a Ficha ID ${card.dataset.id}?`)) {
                card.remove();
                alert('Ficha removida (simulação).');
            }
        }
    });

    // Simulação de salvar o formulário
    document.getElementById('fichaForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Dados salvos (simulação). A implementação completa para persistir os dados requer mais lógica de backend.');
        modal.style.display = 'none';
    });
});