/**
 * Funciones de utilidad para XLoss
 */

/**
 * Formatea una fecha en formato legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

/**
 * Genera un ID único
 * @returns {string} ID único
 */
export function generateUniqueId(): string {
  return `xloss-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Trunca un texto si es demasiado largo
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
}

export async function encryptAES(text: string, password: string) {
  const encoder = new TextEncoder();

  const pwKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    pwKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    aesKey,
    encoder.encode(text)
  );

  return {
    cipher: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: Array.from(iv),
    salt: Array.from(salt)
  };
}

export async function decryptAES(cipherText:string, password: string, ivArray: number[], saltArray: number[]) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const pwKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array(saltArray),
      iterations: 100000,
      hash: 'SHA-256',
    },
    pwKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(ivArray),
    },
    aesKey,
    Uint8Array.from(atob(cipherText), c => c.charCodeAt(0))
  );

  return decoder.decode(decrypted);
}

export async function secureCss(content: string, createElement: string) {

  const { cipher, iv, salt } = await encryptAES(content, createElement);
  const original = await decryptAES(cipher, createElement, iv, salt);

  return [cipher, original];
}

export class RootCSSVars {
  private styleEl: HTMLStyleElement;
  private vars: Record<string, string> = {};
  private readonly id: string;

  constructor(id: string = 'root-style') {
    this.id = id;
    this.styleEl = this.ensureStyleElement();
    this._sync();
  }

  private ensureStyleElement(): HTMLStyleElement {
    let style = document.getElementById(this.id) as HTMLStyleElement | null;

    if (!style) {
      style = document.createElement('style');
      style.id = this.id;
      document.head.appendChild(style);
    }

    return style;
  }

  private _sync(): void {
    const varLines = Object.entries(this.vars)
      .map(([key, value]) => `  --${key}: "${value}";`)
      .join('\n');

    this.styleEl.textContent = `:root {\n${varLines}\n}`;
  }  public set(name: string, value: string): void {
    this.vars[name] = value;
    this._sync();
  }

  public setMultiple(variables: Record<string, string>): void {
    Object.assign(this.vars, variables);
    this._sync();
  }

  public add(name: string, value: string): void {
    this.vars[name] = value;
    this._sync();
  }

  public addMultiple(variables: Record<string, string>): void {
    Object.assign(this.vars, variables);
    this._sync();
  }

  public update(name: string, value: string): void {
    if (this.vars[name] !== undefined) {
      this.vars[name] = value;
      this._sync();
    }
  }

  public updateMultiple(variables: Record<string, string>): void {
    Object.keys(variables).forEach(key => {
      if (this.vars[key] !== undefined) {
        this.vars[key] = variables[key];
      }
    });
    this._sync();
  }

  public get(name: string): string | null {
    return this.vars[name] ?? null;
  }

  public remove(name: string): void {
    delete this.vars[name];
    this._sync();
  }

  public removeMultiple(names: string[]): void {
    names.forEach(name => delete this.vars[name]);
    this._sync();
  }

  public clear(): void {
    this.vars = {};
    this._sync();
  }

  public getAll(): Record<string, string> {
    return { ...this.vars };
  }

  public exists(name: string): boolean {
    return this.vars[name] !== undefined;
  }

  public getCount(): number {
    return Object.keys(this.vars).length;
  }
}

export class DynamicStyleManager {
  private styleEl: HTMLStyleElement;
  private sheet: CSSStyleSheet;

  constructor(private id: string = 'dynamic-style') {
    this.styleEl = this.createOrGetStyleElement();
    this.sheet = this.getStyleSheet();
  }

  private createOrGetStyleElement(): HTMLStyleElement {
    let el = document.getElementById(this.id) as HTMLStyleElement | null;

    if (!el) {
      el = document.createElement('style');
      el.id = this.id;
      document.head.appendChild(el);
    }

    return el;
  }

  private getStyleSheet(): CSSStyleSheet {
    const styleSheets = Array.from(document.styleSheets) as CSSStyleSheet[];
    const targetSheet = styleSheets.find(sheet => sheet.ownerNode === this.styleEl);

    if (!targetSheet) throw new Error('No se pudo encontrar la hoja de estilos.');

    return targetSheet;
  }

  private getRuleIndex(selector: string): number {
    return Array.from(this.sheet.cssRules).findIndex(rule =>
      (rule as CSSStyleRule).selectorText === selector
    );
  }

  private buildRule(selector: string, props: Record<string, string>): string {
    const body = Object.entries(props)
      .map(([k, v]) => `${k}: ${v};`)
      .join(' ');
    return `${selector} { ${body} }`;
  }

  public addClass(className: string, props: Record<string, string>): void {
    const selector = `.${className}`;
    if (this.getRuleIndex(selector) === -1) {
      this.sheet.insertRule(this.buildRule(selector, props), this.sheet.cssRules.length);
    }
  }

  public updateClass(className: string, props: Record<string, string>): void {
    const selector = `.${className}`;
    const index = this.getRuleIndex(selector);

    if (index !== -1) {
      this.sheet.deleteRule(index);
      this.sheet.insertRule(this.buildRule(selector, props), index);
    } else {
      this.addClass(className, props);
    }
  }

  public removeClass(className: string): void {
    const index = this.getRuleIndex(`.${className}`);
    if (index !== -1) {
      this.sheet.deleteRule(index);
    }
  }

  public clear(): void {
    while (this.sheet.cssRules.length > 0) {
      this.sheet.deleteRule(0);
    }
  }
}
