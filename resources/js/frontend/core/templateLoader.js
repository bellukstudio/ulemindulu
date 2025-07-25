// src/templates/templateLoader.js
import { lazy } from "react";

export function loadTemplateComponent(slug) {
    switch (slug) {
        case "basic-wedding":
            return lazy(() => import("../templates/basic-wedding/HomeBasicWedding"));
        default:
            return null;
    }
}
