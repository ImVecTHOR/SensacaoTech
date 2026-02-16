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

const btn = document.getElementById('showEmail');
const emailField = document.getElementById('email');

if (btn) {
    btn.addEventListener('click', () => {
        const user = 'techsensacao';
        const domain = 'gmail.com';
        emailField.textContent = `${user}@${domain}`;
        btn.remove();
    });
}

/* =========================
   ELEMENTOS
========================= */
const buttonsGrid = document.getElementById('buttonsGrid');
const originalCategoryOrder = [
    ...document.querySelectorAll('.category-btn')
];

const sitesRow = document.getElementById('sitesRow');
const searchInput = document.querySelector('.search-input');
const favoritesSection = document.getElementById('favoritesSection');
const favoritesGrid = document.getElementById('favoritesGrid');

/* =========================
   ATALHOS RÁPIDOS
========================= */
const quickLinks = [
    { name: 'GitHub', url: 'https://github.com/' },
    { name: 'Figma', url: 'https://www.figma.com/' },
    { name: 'Notion', url: 'https://www.notion.so/' },
    { name: 'VS Code Web', url: 'https://vscode.dev/' },
    { name: 'YouTube', url: 'https://www.youtube.com/' },
    { name: 'ChatGPT', url: 'https://chat.openai.com/' }
];

const quickLinksGrid = document.getElementById('quickLinksGrid');

function renderQuickLinks() {
    if (!quickLinksGrid) return;

    quickLinksGrid.innerHTML = quickLinks.map(link => `
        <a class="quick-link-btn" href="${link.url}" target="_blank" rel="noopener noreferrer">
            ${link.name}
        </a>
    `).join('');
}

/* =========================
   FAVORITOS
========================= */
const FAVORITES_KEY = 'sensacaotech-favorites';

function buildAllSitesMap() {
    const map = new Map();

    if (typeof sitesData === "undefined") return map;

    Object.entries(sitesData).forEach(([category, sites]) => {
        sites.forEach(site => {
            const key = `${category}::${site.name}`;
            map.set(key, { ...site, key, category });
        });
    });

    return map;
}

const allSitesMap = buildAllSitesMap();

function loadFavorites() {
    try {
        const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(siteKey) {
    return loadFavorites().includes(siteKey);
}

function toggleFavorite(siteKey) {
    const favorites = loadFavorites();
    const index = favorites.indexOf(siteKey);

    if (index >= 0) favorites.splice(index, 1);
    else favorites.push(siteKey);

    saveFavorites(favorites);
    updateFavoriteButtons();
    renderFavoritesSection();
}

function renderFavoritesSection() {
    if (!favoritesSection || !favoritesGrid) return;

    const favorites = loadFavorites()
        .map(key => allSitesMap.get(key))
        .filter(Boolean);

    if (favorites.length === 0) {
        favoritesSection.classList.add('hidden');
        favoritesGrid.innerHTML = '';
        return;
    }

    favoritesSection.classList.remove('hidden');

    favoritesGrid.innerHTML = favorites.map(site => `
        <button class="site-btn favorite-site-btn"
            data-name="${site.name}"
            data-description="${site.description}"
            data-url="${site.url}"
            data-site-key="${site.key}">
            ${site.name}
            <span class="fav-toggle active" data-site-key="${site.key}" title="Remover dos favoritos" aria-label="Remover dos favoritos">★</span>
        </button>
    `).join('');
}

function updateFavoriteButtons() {
    const favorites = new Set(loadFavorites());

    document.querySelectorAll('.fav-toggle').forEach(favBtn => {
        const key = favBtn.dataset.siteKey;
        const active = favorites.has(key);

        favBtn.classList.toggle('active', active);
        favBtn.textContent = active ? '★' : '☆';
        favBtn.title = active ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
        favBtn.setAttribute('aria-label', favBtn.title);
    });
}

/* =========================
   UTILIDADES
========================= */
function clearSitesRow() {
    if (!sitesRow) return;

    sitesRow.classList.add('hidden');
    sitesRow.innerHTML = '';
    sitesRow.removeAttribute('style');
}

function getVisibleButtons() {
    return [...document.querySelectorAll('.category-btn')]
        .filter(categoryBtn => categoryBtn.style.display !== 'none');
}

function getColumnsCount() {
    const width = window.innerWidth;

    if (width <= 600) return 2;
    if (width <= 1024) return 4;

    return 5;
}

function resetCategoryActives() {
    document.querySelectorAll('.category-btn')
        .forEach(categoryBtn => categoryBtn.classList.remove('active'));
}

function normalizeText(text = '') {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function stripHtml(text = '') {
    return text.replace(/<[^>]*>/g, ' ');
}

function renderSitesList(sites, withResultTitle = '') {
    if (!sitesRow) return;

    sitesRow.innerHTML = `
        ${withResultTitle ? `<p class="search-results-title">${withResultTitle}</p>` : ''}
        <div class="sites-list">
            ${sites.map(site => {
        const key = site.key || `${site.category || ''}::${site.name}`;
        return `
                    <button class="site-btn"
                        data-name="${site.name}"
                        data-description="${site.description}"
                        data-url="${site.url}"
                        data-site-key="${key}">
                        ${site.name}
                        ${site.isNew ? '<span class="badge-new">NOVO</span>' : ''}
                        <span class="fav-toggle" data-site-key="${key}" title="Adicionar aos favoritos" aria-label="Adicionar aos favoritos">☆</span>
                    </button>
                `;
    }).join('')}
        </div>
    `;

    sitesRow.classList.remove('hidden');
    updateFavoriteButtons();
}

/* =========================
   FILTRO / ORDENAÇÃO
========================= */
let currentSort = '';
let currentLetter = '';

document.querySelectorAll('.sort-btn, .letter-btn').forEach(sortBtn => {
    sortBtn.addEventListener('click', () => {
        const isActive = sortBtn.classList.contains('active');

        document.querySelectorAll('.sort-btn, .letter-btn')
            .forEach(b => b.classList.remove('active'));

        clearSitesRow();

        if (isActive) {
            currentSort = '';
            currentLetter = '';
            restoreOriginalOrder();
            return;
        }

        sortBtn.classList.add('active');

        if (sortBtn.classList.contains('sort-btn')) {
            currentSort = sortBtn.dataset.sort;
            currentLetter = '';
        } else {
            currentLetter = sortBtn.dataset.letter.toLowerCase();
            currentSort = '';
        }

        applyFilter();
    });
});

function restoreOriginalOrder() {
    originalCategoryOrder.forEach(categoryBtn => {
        categoryBtn.style.display = 'flex';
        buttonsGrid.appendChild(categoryBtn);
    });
}

function applyFilter() {
    const buttons = [...document.querySelectorAll('.category-btn')];

    let filtered = buttons;

    if (currentLetter) {
        filtered = filtered.filter(categoryBtn =>
            normalizeText(categoryBtn.textContent).startsWith(currentLetter)
        );
    }

    if (currentSort) {
        filtered.sort((a, b) =>
            currentSort === 'az'
                ? a.textContent.localeCompare(b.textContent)
                : b.textContent.localeCompare(a.textContent)
        );
    }

    buttons.forEach(categoryBtn => {
        categoryBtn.style.display = 'none';
    });

    filtered.forEach(categoryBtn => {
        categoryBtn.style.display = 'flex';
        buttonsGrid.appendChild(categoryBtn);
    });
}

/* =========================
   CATEGORIAS → SITES
========================= */
document.addEventListener('click', e => {
    const categoryBtn = e.target.closest('.category-btn');
    if (!categoryBtn) return;

    const isActive = categoryBtn.classList.contains('active');
    resetCategoryActives();

    if (isActive) {
        clearSitesRow();
        return;
    }

    categoryBtn.classList.add('active');

    const category = categoryBtn.dataset.category;
    const sites = sitesData[category];
    if (!sites) return;

    const sitesWithCategory = sites.map(site => ({
        ...site,
        key: `${category}::${site.name}`,
        category
    }));

    const visibleButtons = getVisibleButtons();
    const index = visibleButtons.indexOf(categoryBtn);
    const columns = getColumnsCount();

    const rowEndIndex = Math.min(
        Math.floor(index / columns) * columns + (columns - 1),
        visibleButtons.length - 1
    );

    const insertAfter = visibleButtons[rowEndIndex];

    renderSitesList(sitesWithCategory);
    insertAfter.after(sitesRow);
});

/* =========================
   MODAL + FAVORITO BOTÃO
========================= */
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');

document.addEventListener('click', e => {
    const favToggle = e.target.closest('.fav-toggle');

    if (favToggle) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(favToggle.dataset.siteKey);
        return;
    }

    const siteBtn = e.target.closest('.site-btn');
    if (!siteBtn) return;

    modalTitle.textContent = siteBtn.dataset.name;
    modalDescription.innerHTML = siteBtn.dataset.description;
    modalLink.href = siteBtn.dataset.url;
    modalLink.setAttribute('data-url', siteBtn.dataset.url);

    modalOverlay.classList.add('active');
});

document.querySelector('.modal-close')?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
});

function closeModal() {
    modalOverlay.classList.remove('active');
}

/* =========================
   BUSCA (CATEGORIA + SITE)
========================= */
searchInput?.addEventListener('input', e => {
    const query = normalizeText(e.target.value);

    resetCategoryActives();
    clearSitesRow();

    if (!query) {
        if (currentSort || currentLetter) applyFilter();
        else restoreOriginalOrder();
        return;
    }

    const categoryButtons = [...document.querySelectorAll('.category-btn')];

    const matchedByCategoryName = new Set(
        categoryButtons
            .filter(categoryBtn => normalizeText(categoryBtn.textContent).includes(query))
            .map(categoryBtn => categoryBtn.dataset.category)
    );

    const siteMatches = [];

    Object.entries(sitesData).forEach(([category, sites]) => {
        sites.forEach(site => {
            const inName = normalizeText(site.name).includes(query);
            const inDescription = normalizeText(stripHtml(site.description)).includes(query);

            if (inName || inDescription) {
                siteMatches.push({
                    ...site,
                    key: `${category}::${site.name}`,
                    category
                });
                matchedByCategoryName.add(category);
            }
        });
    });
    
    categoryButtons.forEach(categoryBtn => {
        categoryBtn.style.display = matchedByCategoryName.has(categoryBtn.dataset.category)
            ? 'flex'
            : 'none';
    });

    if (siteMatches.length > 0) {
        renderSitesList(siteMatches, `Resultados da busca (${siteMatches.length})`);
        buttonsGrid.after(sitesRow);
    }
});

function applyNewBadgeToCategories() {
    document.querySelectorAll('.category-btn').forEach(categoryBtn => {
        const category = categoryBtn.dataset.category;
        const sites = sitesData[category];

        if (!sites) return;

        const hasNew = sites.some(site => site.isNew === true);

        if (hasNew && !categoryBtn.querySelector('.badge-new')) {
            categoryBtn.insertAdjacentHTML(
                'beforeend',
                '<span class="badge-new">NOVO</span>'
            );
        }
    });
}

/* =========================
   INIT
========================= */
renderQuickLinks();
applyNewBadgeToCategories();
renderFavouritesSection();
updateFavoriteButtons();