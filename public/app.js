const copy = {
  es: {
    languageLabel: "Idioma",
    keyLabel: "Pon tu Key Groq",
    create: "Generar conexión",
    commandLabel: "Ejecuta esto en tu mundo de Minecraft:",
    copy: "Copiar comando",
    creating: "Creando conexión...",
    ready: "Conexión lista. Abre tu mundo con cheats y usa el comando.",
    copied: "Comando copiado.",
    invalid: "La key debe empezar con gsk_.",
    failed: "No se pudo crear la conexión.",
  },
  en: {
    languageLabel: "Language",
    keyLabel: "Enter your Groq Key",
    create: "Generate connection",
    commandLabel: "Run this in your Minecraft world:",
    copy: "Copy command",
    creating: "Creating connection...",
    ready: "Connection ready. Open your world with cheats and run the command.",
    copied: "Command copied.",
    invalid: "The key must start with gsk_.",
    failed: "Could not create connection.",
  },
  pt: {
    languageLabel: "Idioma",
    keyLabel: "Coloque sua Key Groq",
    create: "Gerar conexão",
    commandLabel: "Execute isto no seu mundo Minecraft:",
    copy: "Copiar comando",
    creating: "Criando conexão...",
    ready: "Conexão pronta. Abra o mundo com cheats e use o comando.",
    copied: "Comando copiado.",
    invalid: "A key deve começar com gsk_.",
    failed: "Não foi possível criar a conexão.",
  },
  fr: {
    languageLabel: "Langue",
    keyLabel: "Entrez votre clé Groq",
    create: "Générer la connexion",
    commandLabel: "Exécutez ceci dans votre monde Minecraft :",
    copy: "Copier la commande",
    creating: "Création de la connexion...",
    ready: "Connexion prête. Ouvrez votre monde avec les cheats et lancez la commande.",
    copied: "Commande copiée.",
    invalid: "La clé doit commencer par gsk_.",
    failed: "Impossible de créer la connexion.",
  },
  de: {
    languageLabel: "Sprache",
    keyLabel: "Gib deinen Groq Key ein",
    create: "Verbindung generieren",
    commandLabel: "Führe das in deiner Minecraft-Welt aus:",
    copy: "Befehl kopieren",
    creating: "Verbindung wird erstellt...",
    ready: "Verbindung bereit. Öffne deine Welt mit Cheats und nutze den Befehl.",
    copied: "Befehl kopiert.",
    invalid: "Der Key muss mit gsk_ beginnen.",
    failed: "Verbindung konnte nicht erstellt werden.",
  },
};

const language = document.querySelector("#language");
const statusEl = document.querySelector("#status");
const result = document.querySelector("#result");
const commandEl = document.querySelector("#command");

function t(key) {
  return copy[language.value]?.[key] || copy.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = language.value;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
}

function setStatus(message, kind = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${kind}`;
}

language.addEventListener("change", applyLanguage);
applyLanguage();

document.querySelector("#create").addEventListener("click", async () => {
  const groqApiKey = document.querySelector("#groqKey").value.trim();
  const model = "llama-3.1-8b-instant";
  result.classList.add("hidden");
  if (!groqApiKey.startsWith("gsk_")) {
    setStatus(t("invalid"), "error");
    return;
  }
  setStatus(t("creating"));
  try {
    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ groqApiKey, model }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "failed");
    commandEl.textContent = data.command;
    result.classList.remove("hidden");
    setStatus(t("ready"), "ok");
    document.querySelector("#groqKey").value = "";
  } catch {
    setStatus(t("failed"), "error");
  }
});

document.querySelector("#copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(commandEl.textContent);
  setStatus(t("copied"), "ok");
});
