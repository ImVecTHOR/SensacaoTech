/* =========================
   HEADER SCROLL
========================= */
window.addEventListener('scroll', () => {
    document.querySelector('.header')
        ?.classList.toggle('scrolled', window.scrollY > 50);
});

/* =========================
   NAVEGAÇÃO HEADER
========================= */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        window.location.href = page === 'home' ? 'index.html' : `${page}.html`;
    });
});

/* =========================
   EMAIL
========================= */
const showEmailBtn = document.getElementById("showEmail");
const emailField = document.getElementById("email");

if (showEmailBtn) {
    showEmailBtn.addEventListener("click", () => {
        const user = "techsensacao";
        const domain = "gmail.com";
        emailField.textContent = `${user}@${domain}`;
        showEmailBtn.remove();
    });
}


/* =========================
   ELEMENTOS
========================= */
const buttonsGrid = document.getElementById('buttonsGrid');
const sitesRow = document.getElementById('sitesRow');
const searchInput = document.querySelector('.search-input');

/* =========================
   ESTADO ORIGINAL (HTML)
========================= */
const originalCategoryOrder = [
    ...document.querySelectorAll('.category-btn')
];

/* =========================
   UTILIDADES
========================= */
function clearSitesRow() {
    const list = sitesRow.querySelector('.sites-list');

    if (!list) {
        sitesRow.classList.add('hidden');
        sitesRow.innerHTML = '';
        return;
    }

    // anima fechamento
    list.classList.add('closing');

    // remove após a animação
    setTimeout(() => {
        sitesRow.classList.add('hidden');
        sitesRow.innerHTML = '';
    }, 300); // mesmo tempo do slideUp
}


function restoreOriginalOrder() {
    originalCategoryOrder.forEach(btn => {
        btn.style.display = 'flex';
        buttonsGrid.appendChild(btn);
    });
}

function getVisibleButtons() {
    return originalCategoryOrder.filter(btn => btn.style.display !== 'none');
}

function getColumnsCount() {
    const w = window.innerWidth;
    if (w <= 600) return 2;
    if (w <= 1024) return 4;
    return 5;
}

/* =========================
   FILTROS
========================= */
let currentSort = '';
let currentLetter = '';

document.querySelectorAll('.sort-btn, .letter-btn').forEach(btn => {
    btn.addEventListener('click', () => {

        const isActive = btn.classList.contains('active');

        document.querySelectorAll('.sort-btn, .letter-btn')
            .forEach(b => b.classList.remove('active'));

        clearSitesRow();

        if (isActive) {
            currentSort = '';
            currentLetter = '';
            restoreOriginalOrder();
            return;
        }

        btn.classList.add('active');

        if (btn.classList.contains('sort-btn')) {
            currentSort = btn.dataset.sort;
            currentLetter = '';
        } else {
            currentLetter = btn.dataset.letter.toLowerCase();
            currentSort = '';
        }

        applyFilter();
    });
});

function applyFilter() {
    let buttons = [...originalCategoryOrder];

    if (currentLetter) {
        buttons = buttons.filter(btn =>
            btn.textContent.toLowerCase().startsWith(currentLetter)
        );
    }

    if (currentSort) {
        buttons.sort((a, b) =>
            currentSort === 'az'
                ? a.textContent.localeCompare(b.textContent)
                : b.textContent.localeCompare(a.textContent)
        );
    }

    originalCategoryOrder.forEach(btn => btn.style.display = 'none');

    buttons.forEach(btn => {
        btn.style.display = 'flex';
        buttonsGrid.appendChild(btn);
    });
}

/* =========================
   CATEGORIAS → SITES
========================= */
document.addEventListener('click', e => {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;

    const isActive = btn.classList.contains('active');

    document.querySelectorAll('.category-btn')
        .forEach(b => b.classList.remove('active'));

    if (isActive) {
        clearSitesRow();
        return;
    }

    btn.classList.add('active');

    const sites = sitesData[btn.dataset.category];
    if (!sites) return;

    const visibleButtons = getVisibleButtons();
    const index = visibleButtons.indexOf(btn);
    const columns = getColumnsCount();

    const rowEndIndex = Math.min(
        Math.floor(index / columns) * columns + (columns - 1),
        visibleButtons.length - 1
    );

    const insertAfter = visibleButtons[rowEndIndex];

    sitesRow.innerHTML = `
        <div class="sites-list">
            ${sites.map(site => `
                <button class="site-btn"
                    data-name="${site.name}"
                    data-description="${site.description}"
                    data-url="${site.url}">
                    ${site.name}
                    ${site.isNew ? '<span class="badge-new">NOVO</span>' : ''}
                </button>
            `).join('')}
        </div>
    `;

    insertAfter.after(sitesRow);
    sitesRow.classList.remove('hidden');
});

/* =========================
   MODAL
========================= */
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');

document.addEventListener('click', e => {
    const btn = e.target.closest('.site-btn');
    if (!btn) return;

    modalTitle.textContent = btn.dataset.name;
    modalDescription.textContent = btn.dataset.description;
    modalLink.href = btn.dataset.url;

    modalOverlay.classList.add('active');
});

document.querySelector('.modal-close')
    .addEventListener('click', () => modalOverlay.classList.remove('active'));

modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});

/* =========================
   BUSCA
========================= */
searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    clearSitesRow();

    originalCategoryOrder.forEach(btn => {
        btn.style.display = btn.textContent
            .toLowerCase()
            .includes(query) ? 'flex' : 'none';
    });
});
