/**
 * XLoss - Utility for creating custom elements with hidden content
 * Anti-scraping mechanism that renders content via CSS ::before pseudo-elements
 */

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
 * Creates a custom element with content rendered via CSS ::before pseudo-element
 * 
 * @param content - Text content to display in the ::before pseudo-element
 * @param cssPropertiesStr - CSS properties string to apply to the element
 * @param moreContent - Additional HTML content to add inside the element
 * @param id - Optional target element ID (defaults to "body")
 * @returns Object containing all tracked XLoss data
 */
export function XLoss(content: string, cssPropertiesStr: string, moreContent: string, id?: string) {
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
    };
    
    cssProperties.push(cssClassNameData);
    
    class X extends HTMLElement {
        constructor() {
            super();
            const style = document.createElement('style');
            style.textContent = `
                ${createElement}::before {
                    content: "${content}";
                    ${cssPropertiesStr}
                }
            `;
            targetElement.appendChild(style);
        }
    }
    
    customElements.define(`${createElement}`, X);
    targetElement.innerHTML += `<${createElement}></${createElement}>`;
    
    const getXcontainer = document.querySelector(`${createElement}`);
    if (getXcontainer) {
        getXcontainer.innerHTML += moreContent;
    }

    const getXelement = `<${createElement} class="${cssClass}"></${createElement}>`;
    allXelements.push(getXelement);
    allXContent.push(content);

    return { htmlElements, cssClass, cssProperties, allXelements, allXContent };
}

export default {
    XLoss,
    getActualX
};
