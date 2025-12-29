const params = new URLSearchParams(window.location.search);
const category = params.get('cat');

const title = document.getElementById('categoryTitle');
const list = document.getElementById('sitesList');

if (!category || !sitesData[category]) {
    title.textContent = 'Categoria não encontrada';
} else {
    title.textContent = category.toUpperCase();

    sitesData[category].forEach(site => {
        const item = document.createElement('div');
        item.className = 'site-flat-item';

        item.innerHTML = `
            <h3 class="site-flat-name">${site.name}</h3>

            <div class="site-flat-row">
                <p class="site-flat-desc">${site.description}</p>
                <a href="${site.url}" target="_blank" class="site-flat-btn">
                    Acessar →
                </a>
            </div>
        `;

        list.appendChild(item);
    });
}
