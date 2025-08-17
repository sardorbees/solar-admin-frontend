// Получение переводов из Django API
export async function fetchTranslations(apiUrl, lang = "ru") {
    const res = await fetch(`${apiUrl}?lang=${lang}`);
    if (!res.ok) throw new Error("Ошибка загрузки переводов");
    return await res.json();
}

// Подстановка переводов в DOM
export function applyTranslations(mapping) {
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((node) => {
        const key = node.getAttribute("data-i18n");
        if (mapping.hasOwnProperty(key)) {
            node.textContent = mapping[key];
        }
    });
}
