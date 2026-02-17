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

    const ROW_TRANSITION_MS = 360;

    let currentSort = '';
    let currentLetter = '';
    let activeCategoryBtn = null;
    let sitesRowCloseTimer = null;

    function resetActiveCategory() {
        document.querySelectorAll('.category-btn')
            .forEach(btn => btn.classList.remove('active'));
        activeCategoryBtn = null;
    }

    function removeClosingSnapshots() {
        document.querySelectorAll('.sites-row-transition-closing')
            .forEach(snapshot => snapshot.remove());
    }

    function createClosingSnapshot({ fixed = false } = {}) {
        if (!sitesRow.classList.contains('is-open') || !sitesRow.innerHTML.trim()) return;

        const snapshot = sitesRow.cloneNode(true);
        snapshot.removeAttribute('id');
        snapshot.classList.remove('hidden');
        snapshot.classList.add('sites-row-transition-closing', 'is-open');
        snapshot.style.maxHeight = `${sitesRow.scrollHeight}px`;
        snapshot.style.opacity = '1';
        snapshot.style.pointerEvents = 'none';

        if (fixed) {
            const rect = sitesRow.getBoundingClientRect();
            snapshot.style.position = 'fixed';
            snapshot.style.top = `${rect.top}px`;
            snapshot.style.left = `${rect.left}px`;
            snapshot.style.width = `${rect.width}px`;
            snapshot.style.margin = '0';
            snapshot.style.zIndex = '1200';
            document.body.appendChild(snapshot);
        } else {
            sitesRow.after(snapshot);
        }

        requestAnimationFrame(() => {
            snapshot.classList.remove('is-open');
            snapshot.style.maxHeight = '0px';
            snapshot.style.opacity = '0';
        });

        setTimeout(() => {
            snapshot.remove();
        }, ROW_TRANSITION_MS);
    }

    function clearSitesRow({ immediate = false, onClosed = null } = {}) {
        if (sitesRowCloseTimer) {
            clearTimeout(sitesRowCloseTimer);
            sitesRowCloseTimer = null;
        }

        if (!sitesRow.innerHTML.trim()) {
            sitesRow.classList.remove('is-open');
            sitesRow.classList.add('hidden');
            sitesRow.removeAttribute('style');
            if (typeof onClosed === 'function') onClosed();
            if (immediate) removeClosingSnapshots();
            return;
        }

        if (immediate) {
            sitesRow.classList.remove('is-open');
            sitesRow.classList.add('hidden');
            sitesRow.innerHTML = '';
            sitesRow.removeAttribute('style');
            removeClosingSnapshots();
            if (typeof onClosed === 'function') onClosed();
            return;
        }

        sitesRow.style.maxHeight = `${sitesRow.scrollHeight}px`;
        sitesRow.style.opacity = '1';

        requestAnimationFrame(() => {
            sitesRow.classList.remove('is-open');
            sitesRow.style.maxHeight = '0px';
            sitesRow.style.opacity = '0';
        });

        sitesRowCloseTimer = setTimeout(() => {
            sitesRow.classList.add('hidden');
            sitesRow.innerHTML = '';
            sitesRow.removeAttribute('style');
            sitesRowCloseTimer = null;
            if (typeof onClosed === 'function') onClosed();
        }, ROW_TRANSITION_MS);
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

    function getButtonRowIndex(targetBtn) {
        if (!targetBtn) return -1;

        const visibleButtons = getVisibleButtons();
        const buttonIndex = visibleButtons.indexOf(targetBtn);
        if (buttonIndex < 0) return -1;

        return Math.floor(buttonIndex / getColumnsCount());
    }

    function areButtonsInSameRow(firstBtn, secondBtn) {
        const firstRow = getButtonRowIndex(firstBtn);
        const secondRow = getButtonRowIndex(secondBtn);
        return firstRow >= 0 && firstRow === secondRow;
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

    function renderSitesList(sites, title = '', startCollapsed = false) {
        if (sitesRowCloseTimer) {
            clearTimeout(sitesRowCloseTimer);
            sitesRowCloseTimer = null;
        }

        const hadContent = Boolean(sitesRow.innerHTML.trim()) && sitesRow.classList.contains('is-open');
        const startHeight = startCollapsed ? 0 : (hadContent ? sitesRow.scrollHeight : 0);

        sitesRow.classList.remove('hidden');
        sitesRow.classList.add('is-open');
        sitesRow.style.opacity = '1';
        sitesRow.style.maxHeight = `${startHeight}px`;

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

        const endHeight = sitesRow.scrollHeight;

        requestAnimationFrame(() => {
            sitesRow.style.maxHeight = `${endHeight}px`;
            sitesRow.style.opacity = '1';
        });
    }

    function openCategorySites(categoryBtn, startCollapsed = false) {
        const category = categoryBtn.dataset.category;
        const sites = sitesData[category];
        if (!sites) return;

        const visibleButtons = getVisibleButtons();
        const index = visibleButtons.indexOf(categoryBtn);
        const columns = getColumnsCount();

        const rowEndIndex = Math.min(
            Math.floor(index / columns) * columns + (columns - 1),
            visibleButtons.length - 1
        );

        const insertAfter = visibleButtons[rowEndIndex];

        renderSitesList(sites, '', startCollapsed);
        insertAfter.after(sitesRow);

        categoryBtn.classList.add('active');
        activeCategoryBtn = categoryBtn;
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

            resetActiveCategory();
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

        const isSameButton = activeCategoryBtn === categoryBtn;

        if (isSameButton) {
            resetActiveCategory();
            clearSitesRow();
            return;
        }

        resetActiveCategory();

        const hasOpenSitesRow = sitesRow.classList.contains('is-open') && Boolean(sitesRow.innerHTML.trim());

        if (hasOpenSitesRow) {
            const shouldCloseThenOpen = areButtonsInSameRow(activeCategoryBtn, categoryBtn);

            if (shouldCloseThenOpen) {
                clearSitesRow({ onClosed: () => openCategorySites(categoryBtn, true) });
                return;
            }

            createClosingSnapshot({ fixed: true });
            openCategorySites(categoryBtn, true);
            return;
        }

        openCategorySites(categoryBtn);
    });

    searchInput.addEventListener('input', event => {
        const query = normalizeText(event.target.value);

        resetActiveCategory();
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