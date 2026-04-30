// ─── i18n.js — Bilingual content dictionary ──────────────────────────────────
// All UI strings used by the language switcher and dynamic elements.
// Slide body text is handled via .fr / .en CSS classes in index.qmd.
// This file handles: footer, nav labels, demo UI, approval gate strings.

const i18n = {
  fr: {
    // Meta
    langCode: "fr",
    langLabel: "FR",

    // Footer
    footer: "LLMs & IA Agentique pour PMs — Des Prompts aux Produits",

    // Navigation
    prevSlide: "Précédent",
    nextSlide: "Suivant",
    slideOf: "sur",

    // Act labels
    act1Label: "ACT I — La Couche Intelligence",
    act2Label: "ACT II — La Couche Agentique",
    act3Label: "ACT III — Agents pour les Boards GitLab",

    // Demo slide
    demoTitle: "Démonstration Live",
    demoFallbackBtn: "Voir l'enregistrement à la place",
    demoLiveBtn: "Afficher le board GitLab",
    demoLoading: "Chargement du board GitLab…",
    demoCorsWarning: "Le board ne peut pas être chargé dans un iframe. Utilisation de l'enregistrement de secours.",

    // Approval gate
    gateTitle: "Approbation requise",
    gateDesc: "L'agent souhaite effectuer les modifications suivantes sur votre board GitLab.",
    gateApprove: "✓ Approuver",
    gateReject: "✗ Rejeter",
    gateApproved: "✓ Actions approuvées — exécution en cours…",
    gateRejected: "✗ Actions annulées",

    // Decision framework
    frameworkTitle: "Framework de Décision : 1 Agent ou Plusieurs ?",
    axis1: "Décomposition des tâches",
    axis2: "Autonomie vs Coordination",
    axis3: "Complexité des boards",
    axis4: "Workflows attendus",
    axis5: "Isolation des pannes",
    axis6: "Observabilité",
    singleAgent: "Agent unique",
    multiAgent: "Multi-agents",

    // Agent status labels
    agentReading: "Lecture des boards…",
    agentAnalysing: "Analyse en cours…",
    agentWriting: "Application des modifications…",
    agentDone: "Terminé",
    agentEscalating: "Escalade vers un humain",

    // Recommendation
    recommendationLabel: "Recommandation",
    recommendationText: "Démarrez avec 1 orchestrateur + 3 sous-agents : Lecteur GitLab · Analyste · Rédacteur",

    // Summary labels
    summaryAct1: "Les LLMs sont des outils puissants — mais les outils ont besoin de mains",
    summaryAct2: "Les agents naviguent la complexité. Appliquons ça.",

    // Resource labels
    stanfordLink: "Conférence Stanford sur les LLMs",
    mcpLink: "Documentation MCP",
    gitlabApiLink: "API GitLab REST",
  },

  en: {
    // Meta
    langCode: "en",
    langLabel: "EN",

    // Footer
    footer: "LLMs & Agentic AI for PMs — From Prompts to Products",

    // Navigation
    prevSlide: "Previous",
    nextSlide: "Next",
    slideOf: "of",

    // Act labels
    act1Label: "ACT I — The Intelligence Layer",
    act2Label: "ACT II — The Agentic Layer",
    act3Label: "ACT III — Agents for GitLab Boards",

    // Demo slide
    demoTitle: "Live Demo",
    demoFallbackBtn: "Show recording instead",
    demoLiveBtn: "Show GitLab board",
    demoLoading: "Loading GitLab board…",
    demoCorsWarning: "Board cannot be loaded in an iframe. Showing fallback recording.",

    // Approval gate
    gateTitle: "Approval Required",
    gateDesc: "The agent wants to make the following changes to your GitLab board.",
    gateApprove: "✓ Approve",
    gateReject: "✗ Reject",
    gateApproved: "✓ Actions approved — executing…",
    gateRejected: "✗ Actions cancelled",

    // Decision framework
    frameworkTitle: "Decision Framework: 1 Agent or Many?",
    axis1: "Task decomposition",
    axis2: "Autonomy vs. coordination",
    axis3: "Board complexity",
    axis4: "Expected workflows",
    axis5: "Failure-mode isolation",
    axis6: "Observability",
    singleAgent: "Single agent",
    multiAgent: "Multi-agent",

    // Agent status labels
    agentReading: "Reading boards…",
    agentAnalysing: "Analysing…",
    agentWriting: "Applying changes…",
    agentDone: "Done",
    agentEscalating: "Escalating to human",

    // Recommendation
    recommendationLabel: "Recommendation",
    recommendationText: "Start with 1 orchestrator + 3 sub-agents: GitLab Reader · Analyst · Writer",

    // Summary labels
    summaryAct1: "LLMs are powerful tools — but tools need hands",
    summaryAct2: "Agents navigate complexity. Now let's apply that.",

    // Resource labels
    stanfordLink: "Stanford Lecture on LLMs",
    mcpLink: "MCP Documentation",
    gitlabApiLink: "GitLab REST API",
  }
};

// ─── Language switcher logic ──────────────────────────────────────────────────

// Default language
let currentLang = localStorage.getItem('presentation-lang') || 'fr';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('presentation-lang', lang);

  // Toggle body class for CSS visibility
  document.body.classList.remove('lang-fr', 'lang-en');
  document.body.classList.add('lang-' + lang);

  // Update switcher buttons
  document.querySelectorAll('#lang-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Apply dynamic string replacements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  // Update footer
  const footer = document.querySelector('.reveal .footer');
  if (footer) footer.textContent = i18n[lang].footer;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
});

// Also re-apply on Reveal slide change (in case of dynamic content)
if (typeof Reveal !== 'undefined') {
  Reveal.on('slidechanged', () => applyLang(currentLang));
}

// Export for use in i18n-switcher.html
window.i18n = i18n;
window.applyLang = applyLang;
