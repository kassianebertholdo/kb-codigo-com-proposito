"use strict";

/* =========================================
   1. MENU RESPONSIVO
========================================= */


const menuButton = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelector(".navigation-links");

function closeMenu() {
    if (!menuButton || !navigationLinks) return;

    navigationLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
}

if (menuButton && navigationLinks) {

    menuButton.addEventListener("click", () => {
        const isOpen = navigationLinks.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });

    navigationLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", event => {
        if (!navigationLinks.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            closeMenu();
        }
    });
}

/* =========================================
   2. CATÁLOGO DE TECNOLOGIAS
========================================= */

/*
   status:
   studied  = já estudei ou utilizei
   learning = em aprendizado
   future   = na minha jornada

   Os status abaixo são uma configuração
   inicial. Ajuste conforme sua experiência.
*/

const technologies = [

    // FRONT-END

    { name: "HTML5", category: "frontend", status: "studied" },
    { name: "CSS3", category: "frontend", status: "studied" },
    { name: "JavaScript", category: "frontend", status: "studied" },
    { name: "TypeScript", category: "frontend", status: "future" },
    { name: "React", category: "frontend", status: "future" },
    { name: "Angular", category: "frontend", status: "learning" },
    { name: "Vue.js", category: "frontend", status: "future" },
    { name: "Next.js", category: "frontend", status: "future" },
    { name: "Bootstrap", category: "frontend", status: "future" },
    { name: "Tailwind CSS", category: "frontend", status: "future" },
    { name: "Svelte", category: "frontend", status: "future" },

    // BACK-END E LINGUAGENS

    { name: "Python", category: "backend", status: "learning" },
    { name: "Java", category: "backend", status: "studied" },
    { name: "C#", category: "backend", status: "learning" },
    { name: "C", category: "backend", status: "future" },
    { name: "C++", category: "backend", status: "future" },
    { name: "PHP", category: "backend", status: "future" },
    { name: "Node.js", category: "backend", status: "future" },
    { name: "Ruby", category: "backend", status: "future" },
    { name: "Go", category: "backend", status: "future" },
    { name: "Rust", category: "backend", status: "future" },
    { name: "Kotlin", category: "backend", status: "future" },
    { name: "Swift", category: "backend", status: "future" },
    { name: "Dart", category: "backend", status: "future" },
    { name: "R", category: "backend", status: "future" },

    // FRAMEWORKS BACK-END

    { name: "Django", category: "backend", status: "learning" },
    { name: "Flask", category: "backend", status: "future" },
    { name: "FastAPI", category: "backend", status: "future" },
    { name: "Spring Boot", category: "backend", status: "future" },
    { name: "ASP.NET Core", category: "backend", status: "future" },
    { name: "Express.js", category: "backend", status: "future" },
    { name: "NestJS", category: "backend", status: "future" },
    { name: "Laravel", category: "backend", status: "future" },
    { name: "Ruby on Rails", category: "backend", status: "future" },

    // BANCOS DE DADOS

    { name: "PostgreSQL", category: "database", status: "learning" },
    { name: "MySQL", category: "database", status: "future" },
    { name: "SQL Server", category: "database", status: "learning" },
    { name: "SQLite", category: "database", status: "future" },
    { name: "MongoDB", category: "database", status: "future" },
    { name: "Redis", category: "database", status: "future" },
    { name: "Supabase", category: "database", status: "studied" },
    { name: "Firebase", category: "database", status: "future" },

    // FERRAMENTAS E INFRAESTRUTURA

    { name: "Git", category: "tools", status: "studied" },
    { name: "GitHub", category: "tools", status: "studied" },
    { name: "GitHub Actions", category: "tools", status: "learning" },
    { name: "VS Code", category: "tools", status: "studied" },
    { name: "Jira", category: "tools", status: "studied" },
    { name: "Docker", category: "tools", status: "learning" },
    { name: "DBeaver", category: "tools", status: "studied" },
    { name: "Postman", category: "tools", status: "future" },
    { name: "Linux", category: "tools", status: "future" },
    { name: "Netlify", category: "tools", status: "studied" },
    { name: "Vercel", category: "tools", status: "future" },
    { name: "AWS", category: "tools", status: "future" },
    { name: "Azure", category: "tools", status: "future" }

];

/* =========================================
   3. CRIAR OS CARDS AUTOMATICAMENTE
========================================= */

const technologyGrid = document.querySelector("#technology-grid");

const statusLabels = {
    studied: "Já estudei ou utilizei",
    learning: "Em aprendizado",
    future: "Na minha jornada"
};


/* Ícones de identificação das tecnologias */

const technologyIcons = {
    "HTML5": "🌐",
    "CSS3": "🎨",
    "JavaScript": "JS",
    "TypeScript": "TS",
    "React": "⚛",
    "Angular": "🅰",
    "Vue.js": "💚",
    "Next.js": "▲",
    "Python": "🐍",
    "Java": "☕",
    "C#": "C#",
    "C": "C",
    "C++": "C++",
    "PHP": "🐘",
    "Node.js": "🟢",
    "Django": "🐍",
    "PostgreSQL": "🐘",
    "MySQL": "🗄",
    "SQL Server": "🗄",
    "MongoDB": "🍃",
    "Supabase": "⚡",
    "Git": "◆",
    "GitHub": "⌘",
    "Docker": "🐳",
    "VS Code": "⌨",
    "Jira": "📋",
    "Netlify": "🌐"
};

/* Criação dinâmica dos cards */

function renderTechnologies(category = "all") {

    if (!technologyGrid) return;

    technologyGrid.replaceChildren();

    const filteredTechnologies = technologies.filter(tech => {
        return category === "all" || tech.category === category;
    });

    const fragment = document.createDocumentFragment();

    filteredTechnologies.forEach(tech => {

        const card = document.createElement("article");
        card.className = "technology-card";

        // Ícone

        const icon = document.createElement("span");
        icon.className = "technology-icon";
        icon.textContent = technologyIcons[tech.name] || "⌘";
        icon.setAttribute("aria-hidden", "true");

        // Nome

        const title = document.createElement("h3");
        title.textContent = tech.name;

        // Status

        const status = document.createElement("p");
        status.className = "technology-status";

        const dot = document.createElement("i");
        dot.className = `status-dot ${tech.status}`;
        dot.setAttribute("aria-hidden", "true");

        const label = document.createElement("span");
        label.textContent = statusLabels[tech.status];

        status.append(dot, " ", label);

        // Botão de exploração futura


        const explore = document.createElement("div");
        explore.className = "technology-explore";

        if (tech.projectUrl) {

            const projectLink = document.createElement("a");

            projectLink.href = tech.projectUrl;
            projectLink.textContent = "Ver projeto ↗";
            projectLink.className = "technology-project-link";

            projectLink.target = "_blank";
            projectLink.rel = "noopener noreferrer";

            explore.appendChild(projectLink);

        } else {

            const projectStatus = document.createElement("span");

            projectStatus.className = "technology-project-pending";
            projectStatus.textContent = "Projeto em preparação";

            explore.appendChild(projectStatus);
        }

        // Montagem do card

        card.append(icon, title, status, explore);
        fragment.appendChild(card);
    });

    technologyGrid.appendChild(fragment);
}

/* =========================================
   4. FILTROS DAS TECNOLOGIAS
========================================= */

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        renderTechnologies(selectedCategory);
    });
});

/* =========================================
   5. ANO AUTOMÁTICO NO RODAPÉ
========================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* =========================================
   6. INICIALIZAÇÃO
========================================= */

renderTechnologies();

filterButtons.forEach(button => {
    button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active"))
    );
});

console.log("KB — Código com Propósito iniciado!");