const fs = require('fs');
const path = require('path');

// 1. Gather files and statistics
const allFiles = fs.readdirSync('.');
const htmlFiles = allFiles.filter(file => file.endsWith('.html') && file !== 'index.html');
htmlFiles.sort();

// Calculate simple directory metrics
const totalApps = htmlFiles.length;
const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
});

// 2. Generate dynamic project cards with timestamps
const projectCards = htmlFiles.map(file => {
    const stats = fs.statSync(file);
    const updatedDate = stats.mtime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Convert "my-awesome-app.html" to "My Awesome App"
    const title = file
        .replace('.html', '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

    const githubPagesBase = 'https://vjurj.github.io/Vibecode/';
    const liveUrl = `${githubPagesBase}${file}`;
    return `
        <a href="${liveUrl}" class="project-card" data-title="${title.toLowerCase()}">
            <div class="card-header">
                <span class="app-icon">⚡</span>
                <span class="badge">Active</span>
            </div>
            <h3 class="card-title">${title}</h3>
            <p class="card-description">Single-page application compiled via Vibecode.</p>
            <div class="card-footer">
                <span class="file-name">${file}</span>
                <span class="file-date">Updated ${updatedDate}</span>
            </div>
        </a>`;
}).join('\n');

// 3. Complete Dashboard Template
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibecode Workspace Dashboard</title>
    <style>
        :root {
            /* Core Tones */
            --md-sys-color-primary: hsl(100, 15%, 30%);
            --md-sys-color-on-primary: hsl(100, 15%, 98%);
            --md-sys-color-primary-container: hsl(100, 15%, 90%);
            
            --md-sys-color-secondary: hsl(130, 10%, 40%);
            --md-sys-color-on-secondary: #ffffff;
            
            --md-sys-color-surface: hsl(100, 5%, 98%);
            --md-sys-color-on-surface: hsl(100, 5%, 10%);
            --md-sys-color-surface-variant: hsl(100, 10%, 90%);
            --md-sys-color-on-surface-variant: hsl(100, 10%, 20%);
            
            --md-sys-color-outline: hsl(100, 10%, 50%);
            
            /* Highlight Tones (Muted/Pastel) */
            --md-sys-color-highlight: hsl(280, 40%, 85%);
            --md-sys-color-on-highlight: hsl(280, 40%, 20%);

            /* Spacing (MD3 Expressive) */
            --spacing-unit: 4px;
            --radius-xs: 4px;
            --radius-s: 8px;
            --radius-m: 12px;
            --radius-l: 16px;
            --radius-xl: 28px;
            --radius-full: 9999px;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--md-sys-color-surface);
            color: var(--md-sys-color-on-surface);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Top Navigation/Header Banner */
        .navbar {
            background-color: white;
            border-bottom: 1px solid var(--md-sys-color-surface-variant);
            padding: calc(var(--spacing-unit) * 4) calc(var(--spacing-unit) * 8);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .brand h1 {
            font-size: 1.25rem;
            color: var(--md-sys-color-primary);
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* Layout Container */
        .dashboard-container {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            padding: calc(var(--spacing-unit) * 8);
            flex-grow: 1;
        }

        /* Quick Statistics Cards Row */
        .stats-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: calc(var(--spacing-unit) * 4);
            margin-bottom: calc(var(--spacing-unit) * 8);
        }

        .stat-card {
            background: white;
            border: 1px solid var(--md-sys-color-surface-variant);
            border-radius: var(--radius-m);
            padding: calc(var(--spacing-unit) * 4) calc(var(--spacing-unit) * 5);
        }

        .stat-label {
            font-size: 0.85rem;
            color: var(--md-sys-color-outline);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .stat-value {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--md-sys-color-on-surface);
            margin-top: calc(var(--spacing-unit) * 1);
        }

        /* Action & Search Bar Controls */
        .controls-bar {
            background: white;
            border: 1px solid var(--md-sys-color-surface-variant);
            border-radius: var(--radius-l);
            padding: calc(var(--spacing-unit) * 4);
            margin-bottom: calc(var(--spacing-unit) * 6);
            display: flex;
            gap: calc(var(--spacing-unit) * 4);
            align-items: center;
        }

        .search-input {
            flex-grow: 1;
            padding: calc(var(--spacing-unit) * 3) calc(var(--spacing-unit) * 4);
            border: 1px solid var(--md-sys-color-surface-variant);
            border-radius: var(--radius-s);
            background-color: var(--md-sys-color-surface);
            font-size: 1rem;
            color: var(--md-sys-color-on-surface);
            outline: none;
            transition: border-color 0.2s;
        }

        .search-input:focus {
            border-color: var(--md-sys-color-primary);
            background-color: white;
        }

        /* Dynamic Applications Grid */
        .grid-heading {
            font-size: 1.1rem;
            margin-bottom: calc(var(--spacing-unit) * 4);
            color: var(--md-sys-color-outline);
            font-weight: 600;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: calc(var(--spacing-unit) * 6);
        }

        /* Project Cards (MD3 Stylings Integrated) */
        .project-card {
            background-color: white;
            border: 1px solid var(--md-sys-color-surface-variant);
            border-radius: var(--radius-l);
            padding: calc(var(--spacing-unit) * 6);
            text-decoration: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
            min-height: 180px;
        }

        .project-card:hover {
            transform: translateY(-4px);
            border-color: var(--md-sys-color-outline);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: calc(var(--spacing-unit) * 3);
        }

        .app-icon {
            font-size: 1.25rem;
            background: var(--md-sys-color-primary-container);
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-m);
        }

        .badge {
            background-color: var(--md-sys-color-highlight);
            color: var(--md-sys-color-on-highlight);
            font-size: 0.75rem;
            font-weight: 600;
            padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 3);
            border-radius: var(--radius-full);
        }

        .card-title {
            font-size: 1.25rem;
            color: var(--md-sys-color-on-surface);
            margin-bottom: calc(var(--spacing-unit) * 2);
            font-weight: 600;
        }

        .card-description {
            font-size: 0.9rem;
            color: var(--md-sys-color-outline);
            flex-grow: 1;
            margin-bottom: calc(var(--spacing-unit) * 4);
        }

        .card-footer {
            border-top: 1px solid var(--md-sys-color-surface-variant);
            padding-top: calc(var(--spacing-unit) * 3);
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: var(--md-sys-color-outline);
        }

        .file-name {
            font-family: monospace;
            background: var(--md-sys-color-surface);
            padding: 2px 6px;
            border-radius: var(--radius-xs);
        }

        /* Empty Search State */
        .no-results {
            display: none;
            grid-column: 1 / -1;
            text-align: center;
            padding: calc(var(--spacing-unit) * 12);
            color: var(--md-sys-color-outline);
            background: white;
            border-radius: var(--radius-l);
            border: 1px dashed var(--md-sys-color-surface-variant);
        }
    </style>
</head>
<body>

    <nav class="navbar">
        <div class="brand">
            <h1><span>🛸</span> Vibecode Workspace</h1>
        </div>
        <div style="font-size: 0.85rem; color: var(--md-sys-color-outline);">
            Environment: Local Git Repository
        </div>
    </nav>

    <main class="dashboard-container">
        
        <!-- Summary Dashboard Analytics -->
        <section class="stats-row">
            <div class="stat-card">
                <div class="stat-label">Total Applications</div>
                <div class="stat-value">${totalApps}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Dashboard Refreshed</div>
                <div class="stat-value" style="font-size: 1.25rem; margin-top: 10px;">${lastUpdated}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Architecture</div>
                <div class="stat-value" style="font-size: 1.25rem; margin-top: 10px;">Single-File HTML</div>
            </div>
        </section>

        <!-- Search Controls -->
        <section class="controls-bar">
            <input type="text" id="searchBox" class="search-input" placeholder="Search webapps by keyword..." autocomplete="off">
        </section>

        <!-- Dynamic Applications Section -->
        <h2 class="grid-heading">Compiled Web Applications (${totalApps})</h2>
        
        <section class="grid" id="appsGrid">
            ${projectCards}
            <div class="no-results" id="noResults">No applications found matching your search term.</div>
        </section>

    </main>

    <script>
        // Real-time client side search feature
        const searchBox = document.getElementById('searchBox');
        const cards = document.querySelectorAll('.project-card');
        const noResults = document.getElementById('noResults');

        searchBox.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            cards.forEach(card => {
                const title = card.getAttribute('data-title');
                if (title.includes(query)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('index.html', htmlContent);
console.log(`\x1b[32m✔ Dashboard generated successfully with ${totalApps} webapps!\x1b[0m`);