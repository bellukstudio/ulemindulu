import { loadTemplateComponent } from "./templateLoader";

const templateCache = new Map();

export function getCachedTemplate(slug) {
    if (templateCache.has(slug)) return templateCache.get(slug);

    const component = loadTemplateComponent(slug);
    templateCache.set(slug, component);
    return component;
}
