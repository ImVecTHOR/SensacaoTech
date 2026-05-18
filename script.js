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
const searchForm = document.querySelector('.search-container');
const searchDropdown = document.getElementById('searchDropdown');
const searchClearBtn = document.querySelector('.search-clear-btn');

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');

if (buttonsGrid && sitesRow && searchInput && searchForm && searchDropdown && typeof sitesData !== 'undefined') {
    const originalCategoryOrder = [
        ...document.querySelectorAll('.category-btn')
    ];

    const ROW_TRANSITION_MS = 360;

    let currentSort = '';
    let currentLetter = '';
    let activeCategoryBtn = null;
    let sitesRowCloseTimer = null;
    let sitesRowExpandTimer = null;
    let searchDebounceTimer = null;

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
        if (sitesRowExpandTimer) {
            clearTimeout(sitesRowExpandTimer);
            sitesRowExpandTimer = null;
        }

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
        if (width <= 480) return 2;
        if (width <= 768) return 3;
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

    function getCategoryLabel(categoryBtn) {
        return [...categoryBtn.childNodes]
            .filter(node => node.nodeType === Node.TEXT_NODE || node.nodeName === 'BR')
            .map(node => node.nodeName === 'BR' ? ' ' : node.textContent)
            .join('')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function createSiteButton(site, extraClass = '') {
        const siteBtn = document.createElement('button');
        siteBtn.className = `site-btn${extraClass ? ` ${extraClass}` : ''}`;
        siteBtn.type = 'button';
        siteBtn.dataset.name = site.name;
        siteBtn.dataset.description = site.description;
        siteBtn.dataset.url = site.url;
        siteBtn.textContent = site.name;

        if (site.isNew) {
            const badge = document.createElement('span');
            badge.className = 'badge-new';
            badge.textContent = 'NOVO';
            siteBtn.appendChild(badge);
        }

        return siteBtn;
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
                normalizeText(getCategoryLabel(categoryBtn)).startsWith(currentLetter)
            );
        }

        if (currentSort) {
            filtered.sort((a, b) =>
                currentSort === 'az'
                    ? getCategoryLabel(a).localeCompare(getCategoryLabel(b))
                    : getCategoryLabel(b).localeCompare(getCategoryLabel(a))
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

        if (sitesRowExpandTimer) {
            clearTimeout(sitesRowExpandTimer);
            sitesRowExpandTimer = null;
        }

        const hadContent = Boolean(sitesRow.innerHTML.trim()) && sitesRow.classList.contains('is-open');
        const startHeight = startCollapsed ? 0 : (hadContent ? sitesRow.scrollHeight : 0);

        sitesRow.classList.remove('hidden');
        sitesRow.classList.add('is-open');
        sitesRow.style.opacity = '1';
        sitesRow.style.maxHeight = `${startHeight}px`;
        sitesRow.innerHTML = '';

        if (title) {
            const resultsTitle = document.createElement('p');
            resultsTitle.className = 'search-results-title';
            resultsTitle.textContent = title;
            sitesRow.appendChild(resultsTitle);
        }

        const sitesList = document.createElement('div');
        sitesList.className = 'sites-list';
        sites.forEach(site => sitesList.appendChild(createSiteButton(site)));
        sitesRow.appendChild(sitesList);

        const endHeight = sitesRow.scrollHeight;

        requestAnimationFrame(() => {
            sitesRow.style.maxHeight = `${endHeight}px`;
            sitesRow.style.opacity = '1';

            sitesRowExpandTimer = setTimeout(() => {
                if (sitesRow.classList.contains('is-open')) {
                    sitesRow.style.maxHeight = 'none';
                }
                sitesRowExpandTimer = null;
            }, ROW_TRANSITION_MS + 30);
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

        insertAfter.after(sitesRow);
        renderSitesList(sites, '', startCollapsed);

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

    function closeSearchDropdown() {
        searchDropdown.classList.add('hidden');
        searchDropdown.classList.remove('is-open');
        searchDropdown.innerHTML = '';
        searchInput.setAttribute('aria-expanded', 'false');
    }

    function clearPendingSearch() {
        if (searchDebounceTimer) {
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = null;
        }
    }

    function updateSearchClearButton() {
        if (!searchClearBtn) return;
        searchClearBtn.classList.toggle('hidden', !searchInput.value.trim());
    }

    function runSearch({ focusOnEmpty = false } = {}) {
        const rawQuery = searchInput.value.trim();
        const query = normalizeText(rawQuery);

        resetActiveCategory();
        clearSitesRow();

        if (!query) {
            closeSearchDropdown();
            updateSearchClearButton();
            if (focusOnEmpty) searchInput.focus();
            return;
        }

        renderSearchDropdown(getSearchMatches(query), rawQuery);
        updateSearchClearButton();
    }

    function scheduleAutomaticSearch() {
        clearPendingSearch();

        if (!searchInput.value.trim()) {
            closeSearchDropdown();
            updateSearchClearButton();
            return;
        }

        searchDebounceTimer = setTimeout(() => {
            searchDebounceTimer = null;
            runSearch();
        }, 400);
    }

    function getSearchMatches(query) {
        const categoryButtons = [...document.querySelectorAll('.category-btn')];
        const categoryLabels = new Map(
            categoryButtons.map(categoryBtn => [
                categoryBtn.dataset.category,
                getCategoryLabel(categoryBtn)
            ])
        );

        return Object.entries(sitesData)
            .flatMap(([category, sites]) => {
                const categoryLabel = categoryLabels.get(category) || category;
                const categoryText = normalizeText(categoryLabel);

                return sites.map(site => {
                    const siteName = normalizeText(site.name);
                    const description = normalizeText(stripHtml(site.description));
                    let score = -1;

                    if (siteName === query) score = 0;
                    else if (siteName.startsWith(query)) score = 1;
                    else if (siteName.includes(query)) score = 2;
                    else if (categoryText.includes(query)) score = 3;
                    else if (description.includes(query)) score = 4;

                    return score >= 0
                        ? { ...site, categoryLabel, score }
                        : null;
                });
            })
            .filter(Boolean)
            .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name));
    }

    function renderSearchDropdown(matches, rawQuery) {
        searchDropdown.innerHTML = '';
        searchDropdown.classList.remove('hidden');
        searchDropdown.classList.add('is-open');
        searchInput.setAttribute('aria-expanded', 'true');

        const header = document.createElement('div');
        header.className = 'search-dropdown-header';
        header.textContent = matches.length
            ? `${matches.length} resultado(s) para "${rawQuery}"`
            : `Nenhum resultado para "${rawQuery}"`;
        searchDropdown.appendChild(header);

        if (!matches.length) {
            const empty = document.createElement('p');
            empty.className = 'search-empty';
            empty.textContent = 'Tente buscar pelo nome do site, categoria ou uma palavra chave diferente.';
            searchDropdown.appendChild(empty);
            return;
        }

        const resultsList = document.createElement('div');
        resultsList.className = 'search-results-list';

        matches.forEach(site => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';

            const siteBtn = createSiteButton(site, 'search-result-btn');

            const categoryTag = document.createElement('span');
            categoryTag.className = 'search-result-category';
            categoryTag.textContent = site.categoryLabel;
            siteBtn.appendChild(categoryTag);

            resultItem.appendChild(siteBtn);
            resultsList.appendChild(resultItem);
        });

        searchDropdown.appendChild(resultsList);
    }

    document.querySelectorAll('.sort-btn, .letter-btn').forEach(filterBtn => {
        filterBtn.addEventListener('click', () => {
            const isActive = filterBtn.classList.contains('active');

            document.querySelectorAll('.sort-btn, .letter-btn')
                .forEach(btn => btn.classList.remove('active'));

            closeSearchDropdown();
            clearPendingSearch();
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

        const previousActiveCategoryBtn = activeCategoryBtn;
        const isSameButton = previousActiveCategoryBtn === categoryBtn;

        closeSearchDropdown();
        clearPendingSearch();

        if (isSameButton) {
            resetActiveCategory();
            clearSitesRow();
            return;
        }

        const hasOpenSitesRow = sitesRow.classList.contains('is-open') && Boolean(sitesRow.innerHTML.trim());
        const shouldCloseThenOpen = hasOpenSitesRow && areButtonsInSameRow(previousActiveCategoryBtn, categoryBtn);

        resetActiveCategory();

        if (shouldCloseThenOpen) {
            clearSitesRow({ onClosed: () => openCategorySites(categoryBtn, true) });
            return;
        }

        if (hasOpenSitesRow) {
            createClosingSnapshot({ fixed: true });
            openCategorySites(categoryBtn, true);
            return;
        }

        openCategorySites(categoryBtn);
    });

    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        clearPendingSearch();
        runSearch({ focusOnEmpty: true });
    });

    searchInput.addEventListener('search', () => {
        clearPendingSearch();
        runSearch({ focusOnEmpty: true });
    });

    searchInput.addEventListener('keydown', event => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        clearPendingSearch();
        if (typeof searchForm.requestSubmit === 'function') {
            searchForm.requestSubmit();
        } else {
            runSearch({ focusOnEmpty: true });
        }
    });

    searchInput.addEventListener('input', () => {
        closeSearchDropdown();
        updateSearchClearButton();
        scheduleAutomaticSearch();
    });

    searchClearBtn?.addEventListener('click', () => {
        clearPendingSearch();
        searchInput.value = '';
        updateSearchClearButton();
        closeSearchDropdown();
        searchInput.focus();
    });

    document.addEventListener('click', event => {
        const clickedInsideSearch = event.target.closest('.search-container');
        const clickedSearchResult = event.target.closest('.search-result-btn');

        if (!clickedInsideSearch || clickedSearchResult) {
            closeSearchDropdown();
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

    updateSearchClearButton();
    applyNewBadgeToCategories();
}