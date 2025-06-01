/**
 * XLoss - Utility for creating custom elements with hidden content
 * Anti-scraping mechanism that renders content via CSS ::before pseudo-elements
 */

import { decryptAES, DynamicStyleManager, encryptAES, RootCSSVars, secureCss } from "./helpers";

// Global CSS Variables instance - accessible from anywhere
export const globalCSSVars = new RootCSSVars('xloss-global-vars');

// Storage arrays for tracking elements and content
export const htmlElements: string[] = [];
export const cssClass: string[] = [];
export const cssProperties: Array<Record<string, string>> = [];
export const allXelements: string[] = [];
export const allXContent: string[] = [];

/**
 * Returns the current state of all XLoss elements and content
 * @returns Object containing all tracked XLoss data
 */
export function getActualX() {
    return { htmlElements, cssClass, cssProperties, allXelements, allXContent };
}

/**
 * Add a single CSS variable to the global root
 * @param name - Variable name (without --)
 * @param value - Variable value
 */
export function addCSSVar(name: string, value: string) {
    globalCSSVars.add(name, value);
}

/**
 * Add multiple CSS variables to the global root
 * @param variables - Object with variable names and values
 */
export function addCSSVars(variables: Record<string, string>) {
    globalCSSVars.addMultiple(variables);
}

/**
 * Update an existing CSS variable
 * @param name - Variable name
 * @param value - New value
 */
export function updateCSSVar(name: string, value: string) {
    globalCSSVars.update(name, value);
}

/**
 * Remove a CSS variable
 * @param name - Variable name to remove
 */
export function removeCSSVar(name: string) {
    globalCSSVars.remove(name);
}

/**
 * Get all current CSS variables
 * @returns Object with all CSS variables
 */
export function getAllCSSVars() {
    return globalCSSVars.getAll();
}

/**
 * Check if a CSS variable exists
 * @param name - Variable name to check
 * @returns Boolean indicating if the variable exists
 */
export function hasCSSVar(name: string) {
    return globalCSSVars.exists(name);
}

/**
 * Clear all CSS variables
 */
export function clearAllCSSVars() {
    globalCSSVars.clear();
}

/**
 * Creates a custom element with content rendered via CSS ::before pseudo-element
 * 
 * @param content - Text content to display in the ::before pseudo-element
 * @param cssPropertiesStr - CSS properties string to apply to the element
 * @param moreContent - Additional HTML content to add inside the element
 * @param id - Optional target element ID (defaults to "body")
 * @returns Object containing all tracked XLoss data
 */
export async function XLoss(content: string, cssPropertiesStr: string, moreContent: string, id?: string) {
    const targetId = id || "body";
    const getBody = document.getElementById(`${targetId}`);

    const targetElement = getBody || document.body;

    /**
     * Generates a random hyphenated ID for the custom element
     */
    function generateXid(): string {
        const caracteres = 'abcdefghijklmnopqrstuvwxyz';
        let id1 = '';
        let id2 = '';
        for (let i = 0; i < 5; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            id1 += caracteres.charAt(indice);
            id2 += caracteres.charAt(indice);
        }
        return id1 + "-" + id2;
    }

    const createElement = generateXid();

    htmlElements.push(createElement);
    cssClass.push(createElement);

    const cssClassNameData: Record<string, string> = {
        [`${createElement}`]: cssPropertiesStr
    }; cssProperties.push(cssClassNameData);

    const secureRootCss = await secureCss(content, createElement);
    globalCSSVars.add(createElement, secureRootCss[0]);

    class X extends HTMLElement {
        constructor() {
            super();
            const style = document.createElement('style'); style.textContent = `
                ${createElement}::before {
                    ${cssPropertiesStr}
                }
            `;
            targetElement.appendChild(style);
        }
    }



    customElements.define(`${createElement}`, X);
    targetElement.innerHTML += `<${createElement} id="${createElement}" ></${createElement}>`;

    const getXcontainer = document.querySelector(`${createElement}`);
    if (getXcontainer) {
        getXcontainer.innerHTML += moreContent;
    }

    const getXelement = `<${createElement} class="${cssClass}" id="${createElement}"></${createElement}>`;
    allXelements.push(getXelement);
    allXContent.push(content);

    const appXContent = document.getElementById(createElement);
    console.log(appXContent);
    if (appXContent) {
        // Dynamically inject a style rule for ::before content
        const dynamicStyle = document.createElement('style');
        dynamicStyle.textContent = `
            #${createElement}::before {
                content: "${secureRootCss[1]}";
            }
        `;
        document.head.appendChild(dynamicStyle);
    }
    
    return { htmlElements, cssClass, cssProperties, allXelements, allXContent };
}

export default {
    XLoss,
    getActualX,
    htmlElements,
    cssClass,
    cssProperties,
    allXelements,
    allXContent
};
