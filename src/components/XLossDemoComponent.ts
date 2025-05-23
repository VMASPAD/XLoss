/**
 * XLoss Demo Component
 * Demonstrates the anti-scraping functionality
 */

import { XLoss, getActualX } from '../utils/XLoss';

export class XLossDemoComponent {
  private container: HTMLElement;
  
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'xloss-demo-container';
  }
  
  /**
   * Renderiza el componente de demostración de XLoss
   * @returns {HTMLElement} El elemento DOM creado
   */
  public render(): HTMLElement {
    // Crear contenedor principal
    const heading = document.createElement('h2');
    heading.textContent = 'XLoss Anti-Scraping Demo';
    this.container.appendChild(heading);
    
    // Explicación
    const description = document.createElement('p');
    description.textContent = 'Este componente muestra cómo XLoss puede proteger contenido contra scraping utilizando pseudo-elementos CSS.';
    this.container.appendChild(description);
      // Subtítulo para ejemplos pre-cargados
    const examplesTitle = document.createElement('h3');
    examplesTitle.textContent = 'Ejemplos pre-cargados de XLoss';
    examplesTitle.style.marginTop = '20px';
    this.container.appendChild(examplesTitle);
    
    // Crear contenedor para ejemplos pre-cargados de XLoss
    const preloadedExamples = document.createElement('div');
    preloadedExamples.className = 'preloaded-examples';
      // Ejemplo 1: Texto simple
    const example1 = document.createElement('div');
    example1.id = 'xloss-example-1';
    example1.className = 'xloss-example';
    example1.innerHTML = '<h4>Ejemplo 1: Texto simple protegido</h4>';
    preloadedExamples.appendChild(example1);
    
    // Ejemplo 2: Texto con estilos
    const example2 = document.createElement('div');
    example2.id = 'xloss-example-2';
    example2.className = 'xloss-example';
    example2.innerHTML = '<h4>Ejemplo 2: Texto con estilos</h4>';
    preloadedExamples.appendChild(example2);
    
    // Ejemplo 3: Contenido mixto
    const example3 = document.createElement('div');
    example3.id = 'xloss-example-3';
    example3.className = 'xloss-example';
    example3.innerHTML = '<h4>Ejemplo 3: Contenido mixto (texto protegido + HTML visible)</h4>';
    preloadedExamples.appendChild(example3);
    
    this.container.appendChild(preloadedExamples);
    
    // Crear contenedor para demo interactivo
    const interactiveTitle = document.createElement('h3');
    interactiveTitle.textContent = 'Demo interactivo';
    interactiveTitle.style.marginTop = '30px';
    this.container.appendChild(interactiveTitle);
    
    const xlossContainer = document.createElement('div');
    xlossContainer.id = 'xloss-container';
    xlossContainer.className = 'xloss-example';
    this.container.appendChild(xlossContainer);
    
    // Ejecutar ejemplos pre-cargados al renderizar
    setTimeout(() => {
      // Ejemplo 1
      XLoss(
        'Este es un texto protegido simple', 
        'color: #e63946; font-weight: bold;', 
        '', 
        example1.id
      );
      
      // Ejemplo 2
      XLoss(
        'Texto con estilos personalizados', 
        'color: #2a9d8f; font-weight: bold; font-size: 18px; text-decoration: underline;', 
        '', 
        example2.id
      );
      
      // Ejemplo 3
      XLoss(
        'Contenido protegido + HTML visible', 
        'color: #4361ee; font-weight: bold; font-style: italic;', 
        '<p style="color: #333; margin-top: 10px;">Este es contenido HTML visible normal que complementa el contenido protegido</p>', 
        example3.id
      );
      
      // Mostrar los datos actuales después de todos los ejemplos
      const currentData = getActualX();
      const dataDisplay = document.createElement('pre');
      dataDisplay.style.backgroundColor = '#f5f5f5';
      dataDisplay.style.padding = '10px';
      dataDisplay.style.marginTop = '20px';
      dataDisplay.style.overflow = 'auto';
      dataDisplay.style.maxHeight = '300px';
      dataDisplay.textContent = JSON.stringify(currentData, null, 2);
      preloadedExamples.appendChild(dataDisplay);
    }, 100);
    
    // Botón para demostrar XLoss interactivamente
    const demoButton = document.createElement('button');
    demoButton.textContent = 'Agregar más texto protegido';
    demoButton.addEventListener('click', () => {
      // Ejemplo de uso de XLoss
      XLoss(
        'Este texto fue agregado interactivamente', 
        'color: #6d23b6; font-weight: bold; border-bottom: 2px dotted #6d23b6;', 
        '<p>Este es contenido adicional visible que se agregó al hacer clic</p>', 
        'xloss-container'
      );
      
      // Mostrar los datos actuales
      const currentData = getActualX();
      const dataDisplay = document.createElement('pre');
      dataDisplay.style.backgroundColor = '#f5f5f5';
      dataDisplay.style.padding = '10px';
      dataDisplay.style.marginTop = '10px';
      dataDisplay.style.overflow = 'auto';
      dataDisplay.style.maxHeight = '200px';
      dataDisplay.textContent = JSON.stringify(currentData, null, 2);
      xlossContainer.appendChild(dataDisplay);
    });
    
    this.container.appendChild(demoButton);
    
    return this.container;
  }
}
