// Загружаем переводы с API
export async function fetchTranslations(apiUrl, lang = "ru") {
    const res = await fetch(`${apiUrl}?lang=${lang}`);
    if (!res.ok) throw new Error("Ошибка загрузки переводов");
    return await res.json();
}

// Применяем переводы ко всем элементам с data-i18n
export function applyTranslations(mapping) {
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((node) => {
        const key = node.getAttribute("data-i18n");
        if (mapping.hasOwnProperty(key)) {
            if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
                node.placeholder = mapping[key]; // для input/textarea
            } else {
                node.textContent = mapping[key]; // обычный текст
            }
        }
    });
}
