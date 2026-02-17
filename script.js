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
document.querySelectorAll('.nav-btn').forEach(navBtn => {
    navBtn.addEventListener('click', () => {
        const page = navBtn.dataset.page;
        window.location.href = page === 'home' ? 'index.html' : `${page}.html`;
    });
});

/* =========================
   CONTATO (SOBRE)
========================= */
const showEmailBtn = document.getElementById('showEmail');
const emailField = document.getElementById('email');

if (showEmailBtn && emailField) {
    showEmailBtn.addEventListener('click', () => {
        const user = 'techsensacao';
        const domain = 'gmail.com';
        emailField.textContent = `${user}@${domain}`;
        showEmailBtn.remove();
    });
}



/* =========================
   TELA DE ATALHOS (ACCORDION)
========================= */
const shortcutToggles = document.querySelectorAll('.shortcut-software-toggle');

if (shortcutToggles.length) {
    shortcutToggles.forEach(toggleBtn => {
        toggleBtn.addEventListener('click', () => {
            const softwareItem = toggleBtn.closest('.shortcut-software-item');
            if (!softwareItem) return;

            const willOpen = !softwareItem.classList.contains('is-open');

            shortcutToggles.forEach(otherBtn => {
                const otherItem = otherBtn.closest('.shortcut-software-item');
                if (!otherItem) return;

                otherItem.classList.remove('is-open');
                otherItem.classList.add('is-collapsed');
                otherBtn.setAttribute('aria-expanded', 'false');
                otherBtn.classList.remove('active');
            });

            if (willOpen) {
                softwareItem.classList.remove('is-collapsed');
                softwareItem.classList.add('is-open');
                toggleBtn.setAttribute('aria-expanded', 'true');
                toggleBtn.classList.add('active');
            }
        });
    });
}

/* =========================
   HOME LOGIC
========================= */
const buttonsGrid = document.getElementById('buttonsGrid');
const sitesRow = document.getElementById('sitesRow');
const searchInput = document.querySelector('.search-input');

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');

if (buttonsGrid && sitesRow && searchInput && typeof sitesData !== 'undefined') {
    const originalCategoryOrder = [
        ...document.querySelectorAll('.category-btn')
    ];

    let currentSort = '';
    let currentLetter = '';;

    function clearSitesRow() {
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

    function restoreOriginalOrder() {
        originalCategoryOrder.forEach(categoryBtn => {
            categoryBtn.style.display = 'flex';
            buttonsGrid.appendChild(categoryBtn);
        });
    }

    function applyFilter() {
        const categoryButtons = [...document.querySelectorAll('.category-btn')];
        let filtered = categoryButtons;

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

        categoryButtons.forEach(categoryBtn => {
            categoryBtn.style.display = 'none';
        });

        filtered.forEach(categoryBtn => {
            categoryBtn.style.display = 'flex';
            buttonsGrid.appendChild(categoryBtn);
        });
    }

    function renderSitesList(sites, title = '') {
        sitesRow.innerHTML = `
            ${title ? `<p class="search-results-title">${title}</p>` : ''}
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

        sitesRow.classList.remove('hidden');
    }

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

    document.querySelectorAll('.sort-btn, .letter-btn').forEach(filterBtn => {
        filterBtn.addEventListener('click', () => {
            const isActive = filterBtn.classList.contains('active');

            document.querySelectorAll('.sort-btn, .letter-btn')
                .forEach(btn => btn.classList.remove('active'));

            clearSitesRow();

            if (isActive) {
                currentSort = '';
                currentLetter = '';
                restoreOriginalOrder();
                return;
            }

            filterBtn.classList.add('active');

            if (filterBtn.classList.contains('sort-btn')) {
                currentSort = filterBtn.dataset.sort;
                currentLetter = '';
            } else {
                currentLetter = filterBtn.dataset.letter.toLowerCase();
                currentSort = '';
            }

            applyFilter();
        });
    });

    document.addEventListener('click', event => {
        const categoryBtn = event.target.closest('.category-btn');
        if (!categoryBtn) return;

        const isActive = categoryBtn.classList.contains('active');

        document.querySelectorAll('.category-btn')
            .forEach(btn => btn.classList.remove('active'));

        if (isActive) {
            clearSitesRow();
            return;
        }

        categoryBtn.classList.add('active');

        const category = categoryBtn.dataset.category;
        const sites = sitesData[category];
        if (!sites) return;

        const visibleButtons = getVisibleButtons();
        const index = visibleButtons.indexOf(categoryBtn);
        const columns = getColumnsCount();

        const rowEndIndex = Math.min(
            Math.floor(index / columns) * columns + (columns - 1),
            visibleButtons.length - 1
        )

        const insertAfter = visibleButtons[rowEndIndex];

        renderSitesList(sites);
        insertAfter.after(sitesRow);
    });

    searchInput.addEventListener('input', event => {
        const query = normalizeText(event.target.value);

        clearSitesRow();

        if (!query) {
            if (currentSort || currentLetter) applyFilter();
            else restoreOriginalOrder();
            return;
        }

        const categoryButtons = [...document.querySelectorAll('.category-btn')];
        const matchedCategories = new Set(
            categoryButtons
                .filter(btn => normalizeText(btn.textContent).includes(query))
                .map(btn => btn.dataset.category)
        );

        const siteMatches = [];

        Object.entries(sitesData).forEach(([category, sites]) => {
            sites.forEach(site => {
                const inName = normalizeText(site.name).includes(query);
                const inDescription = normalizeText(stripHtml(site.description)).includes(query);

                if (inName || inDescription) {
                    siteMatches.push(site);
                    matchedCategories.add(category);
                }
            });
        });

        categoryButtons.forEach(categoryBtn => {
            categoryBtn.style.display = matchedCategories.has(categoryBtn.dataset.category)
                ? 'flex'
                : 'none';
        });

        if (siteMatches.length) {
            renderSitesList(siteMatches, `Resultados da busca (${siteMatches.length})`);
            buttonsGrid.after(sitesRow);
        }
    });

    if (modalOverlay && modalTitle && modalDescription && modalLink) {
        document.addEventListener('click', event => {
            const siteBtn = event.target.closest('.site-btn');
            if (!siteBtn) return;

            modalTitle.textContent = siteBtn.dataset.name;
            modalDescription.innerHTML = siteBtn.dataset.description;
            modalLink.href = siteBtn.dataset.url;
            modalLink.setAttribute('data-url', siteBtn.dataset.url);

            modalOverlay.classList.add('active');
        });

        document.querySelector('.modal-close')?.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', event => {
            if (event.target === modalOverlay) closeModal();
        });
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    applyNewBadgeToCategories();
}