/**
 * XLoss - TypeScript Frontend Package
 * Main entry point
 */

import './styles/main.css';
import { XLoss, getActualX } from './utils/XLoss';
export * from './utils/helpers';
export * from './utils/XLoss';

// Importar el nuevo componente de demostración XLoss
import { XLossDemoComponent } from './components/XLossDemoComponent';

// Inicializar demo cuando se carga en el navegador
document.addEventListener('DOMContentLoaded', () => {
  
  // Inicializar el componente de demostración XLoss
  const xlossContainer = document.getElementById('xloss-demo-container');
  if (xlossContainer) {
    const xlossDemo = new XLossDemoComponent();
    xlossContainer.appendChild(xlossDemo.render());
  }
});

// Exportación por defecto
export default {
  version: '1.0.3',
  XLoss,
  getActualX
};
