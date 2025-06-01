<p align="center">
<img src="https://github.com/user-attachments/assets/22f975bc-c654-4da6-82f4-d21ec3d65813" width="250" height="250">
</p>

# XLoss
This project is a concept of the idea to protect web content against scraping.
![Version](https://img.shields.io/badge/version-1.0.3-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

XLoss is a lightweight TypeScript library that provides anti-scraping mechanisms for web content. It protects sensitive text by rendering content through CSS `::before` pseudo-elements, making it difficult for automated scrapers and bots to extract the information.

## Features

- **Anti-Scraping Protection**: Renders text content via CSS pseudo-elements
- **Custom Element Creation**: Generates unique custom HTML elements on the fly
- **Style Customization**: Apply custom CSS properties to protected content
- **Mixed Content Support**: Combine protected text with regular HTML content
- **Tracking System**: Keep track of all protected elements and their content
- **CSS Variables Management**: Manage global CSS variables with an easy-to-use API
- **Encryption Support**: Content encryption for enhanced security
- **Dynamic Style Management**: Add, update, and remove styles dynamically
- **Demo Component**: Ready-to-use component for showcasing capabilities

## Installation

```bash
npm install xloss
```

## Basic Usage

```typescript
import { XLoss, getActualX } from 'xloss';

// Create protected content
XLoss(
  'This text is protected against scraping', 
  'color: blue; font-weight: bold;', 
  '<p>This is additional visible HTML content</p>', 
  'target-container-id'
);

// Get all protected elements and their content
const protectedContent = getActualX();
console.log(protectedContent);

// Use CSS Variables API
import { addCSSVar, updateCSSVar, removeCSSVar } from 'xloss';

// Add a CSS variable
addCSSVar('primary-color', '#4285f4');

// Update a CSS variable
updateCSSVar('primary-color', '#3367d6');

// Remove a CSS variable
removeCSSVar('primary-color');
```

## How It Works

XLoss works by:

1. Generating unique random IDs for custom HTML elements
2. Creating custom elements with content rendered via CSS `::before` pseudo-elements
3. Injecting style tags into the DOM to define the protected content
4. Storing references to all protected elements for future access
5. Optionally encrypting content for enhanced security
6. Managing CSS variables for easy global style updates
7. Using dynamic style management for runtime style updates

This approach makes it difficult for basic scrapers to access the content, as it's not directly available in the DOM text nodes but rather rendered through CSS and further protected through encryption.

## API Reference

### XLoss(content, cssProperties, additionalContent, targetId)

Creates a protected element with the specified content.

**Parameters:**

- `content` (string): The text content to protect
- `cssProperties` (string): CSS properties to apply to the protected element
- `additionalContent` (string): Additional HTML content to add inside the element
- `targetId` (string, optional): Target element ID where the protected content will be injected (defaults to "body")

**Returns:** Object containing all tracked XLoss data

### getActualX()

Returns the current state of all XLoss elements and content.

**Returns:** Object with the following properties:

- `htmlElements`: Array of element IDs
- `cssClass`: Array of CSS class names
- `cssProperties`: Array of CSS property objects
- `allXelements`: Array of HTML element strings
- `allXContent`: Array of protected content strings

### CSS Variables API

#### addCSSVar(name, value)

Adds a single CSS variable to the global root.

**Parameters:**
- `name` (string): Variable name (without --)
- `value` (string): Variable value

#### addCSSVars(variables)

Adds multiple CSS variables to the global root.

**Parameters:**
- `variables` (Record<string, string>): Object with variable names and values

#### updateCSSVar(name, value)

Updates an existing CSS variable.

**Parameters:**
- `name` (string): Variable name to update
- `value` (string): New value

#### removeCSSVar(name)

Removes a CSS variable.

**Parameters:**
- `name` (string): Variable name to remove

#### getAllCSSVars()

Returns all current CSS variables.

**Returns:** Object with all CSS variables

#### hasCSSVar(name)

Checks if a CSS variable exists.

**Parameters:**
- `name` (string): Variable name to check

**Returns:** Boolean indicating if the variable exists

#### clearAllCSSVars()

Clears all CSS variables.

### Encryption Utilities

#### encryptAES(text, password)

Encrypts text using AES-GCM encryption.

**Parameters:**
- `text` (string): Text to encrypt
- `password` (string): Password for encryption

**Returns:** Object containing cipher, initialization vector, and salt

#### decryptAES(cipherText, password, ivArray, saltArray)

Decrypts AES-GCM encrypted text.

**Parameters:**
- `cipherText` (string): Encrypted text
- `password` (string): Password for decryption
- `ivArray` (number[]): Initialization vector as array of numbers
- `saltArray` (number[]): Salt as array of numbers

**Returns:** Decrypted text

## Examples

### Basic Protection

```typescript
XLoss(
  'Confidential information', 
  'color: red;', 
  '', 
  'my-container'
);
```

### Styled Protection

```typescript
XLoss(
  'Secret message', 
  'color: #2a9d8f; font-weight: bold; font-size: 18px; text-decoration: underline;', 
  '', 
  'styled-container'
);
```

### Mixed Content

```typescript
XLoss(
  'Protected header text', 
  'color: #4361ee; font-weight: bold;', 
  '<p>This regular HTML content complements the protected content above</p>', 
  'mixed-container'
);
```

## Browser Compatibility

XLoss uses modern web features including:

- Custom Elements API
- CSS Pseudo-elements
- ES6+ JavaScript features

Compatible with all modern browsers (Chrome, Firefox, Safari, Edge).

## Development

Clone the repository:

```bash
git clone https://github.com/vmaspad/xloss.git
cd xloss
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### Version 1.0.3 (June 2025)
- Added CSS Variables management system with RootCSSVars class
- Added encryption/decryption capabilities with encryptAES and decryptAES functions
- Added secureCss function for enhanced content protection
- Added comprehensive CSS Variables API
- Added DynamicStyleManager for runtime style manipulation
- Added demo component (XLossDemoComponent) for showcasing library features
- Improved code documentation
- Enhanced security with AES-GCM encryption for protected content

### Version 1.0.0 (Initial Release)
- Basic anti-scraping functionality with CSS pseudo-elements
- Custom element creation
- Style customization
- Mixed content support
- Tracking system for protected elements

---

Created by [vmaspad](https://github.com/vmaspad)
