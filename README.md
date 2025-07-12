# MF0952_2 - Guía de Publicación Web

Una herramienta interactiva para enseñar los fundamentos de la publicación de páginas web, desarrollada para el módulo formativo MF0952_2.

## 🎯 Descripción

Esta aplicación web educativa proporciona herramientas prácticas y teoría para aprender los conceptos esenciales de la publicación web, incluyendo configuración de servidores, optimización SEO y gestión de archivos web.

## ✨ Características

### 🌐 Módulos de Aprendizaje
- **FTP/SFTP**: Configuración de FileZilla y protocolos de transferencia
- **Sitemap.xml**: Generador interactivo de sitemaps para SEO
- **Robots.txt**: Creador de archivos robots.txt con plantillas predefinidas
- **Meta Tags**: Generador de etiquetas meta con vista previa de Google
- **Comandos**: Referencia de comandos Windows/Linux para administración web
- **Actividades**: Ejercicios prácticos con seguimiento de progreso

### 🛠 Funcionalidades Técnicas
- **Generadores automáticos**: Sitemap XML y Robots.txt
- **Vista previa en tiempo real**: Simulación de resultados de Google
- **Plantillas predefinidas**: Para diferentes tipos de sitios web
- **Sistema de progreso**: Seguimiento de actividades completadas
- **Descarga de archivos**: Exportación de archivos generados
- **Interfaz responsiva**: Compatible con dispositivos móviles

## 🚀 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Vite 7.x
- **Styling**: CSS Variables + Bootstrap Icons
- **Arquitectura**: Modular con ES6 Modules
- **Compatibilidad**: Navegadores modernos

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) v20.19.0 o superior
- npm (incluido con Node.js)
- Navegador web moderno

## ⚡ Instalación y Uso

### 1. Clonar el repositorio
git clone `https://github.com/ifcd0110valladolid2025/guia-publicacion-web.git`
cd guia-publicacion-web


### 2. Instalar dependencias

npm install


### 3. Ejecutar en modo desarrollo
npm run dev

La aplicación estará disponible en `http://localhost:5173`

### 4. Construir para producción
npm run build

La aplicación estará disponible en `https://ifcd0110valladolid2025.github.io/guia-publicacion-web/` 

Los archivos optimizados se generarán en la carpeta `dist/`

## 📁 Estructura del Proyecto


guia-publicacion-web/
├── index.html              # Página principal
├── main.js                 # Lógica principal de la aplicación
├── style.css               # Estilos personalizados
├── package.json            # Configuración del proyecto
├── vite.config.js          # Configuración de Vite
├── dist/                   # Archivos de producción (generados)
└── README.md              # Este archivo


## 🎓 Objetivos de Aprendizaje

Al completar este módulo, los estudiantes podrán:

- ✅ Configurar y usar clientes FTP/SFTP como FileZilla
- ✅ Generar archivos sitemap.xml para SEO
- ✅ Crear archivos robots.txt para control de indexación
- ✅ Optimizar meta etiquetas para motores de búsqueda
- ✅ Dominar comandos básicos de Windows y Linux

## 🔧 Desarrollo

### Scripts Disponibles

# Desarrollo con hot-reload
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview


### Estructura del Código

- **Navegación**: Sistema basado en `data-pestana` para compatibilidad con Vite
- **Eventos**: Manejadores de eventos centralizados sin onclick inline
- **Modularidad**: Funciones organizadas por características
- **Responsividad**: CSS Grid y Flexbox para layouts adaptativos

## 📚 Módulos Detallados

### FTP/SFTP
- Comparación de protocolos
- Configuración paso a paso de FileZilla
- Resolución de errores comunes
- Mejores prácticas de seguridad

### Generador de Sitemap
- Interfaz para añadir URLs
- Configuración de prioridades y frecuencias
- Exportación en formato XML estándar
- Carga de ejemplos predefinidos

### Generador de Robots.txt
- Plantillas para WordPress, e-commerce y sitios básicos
- Editor de reglas User-agent, Disallow, Allow
- Integración con sitemap
- Descarga directa del archivo

### Meta Tags
- Generador de etiquetas HTML, Open Graph y Twitter Cards
- Vista previa en tiempo real estilo Google
- Contadores de caracteres para título y descripción
- Optimización SEO automática

## 🤝 Contribuir

1. Fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commiea tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

### Migración a Vite
Este proyecto está siendo migrado de JavaScript vanilla a un entorno moderno con Vite para:
- Hot Module Replacement (HMR) instantáneo
- Optimización automática de assets
- Soporte nativo para ES6 modules
- Build optimizado para producción

### Compatibilidad
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍🏫 Autor

Desarrollado para el módulo formativo **MF0952_2 - Publicación de páginas web** del certificado de profesionalidad **IFCD0110 - Confección y Publicación de Páginas Web**.

---

### 🔗 Enlaces Útiles

- [Documentación de Vite](https://vitejs.dev/)
- [FileZilla Download](https://filezilla-project.org/)
- [Guía de Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Robots.txt Specification](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

### 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor:
1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles específicos

---

**Última actualización**: Julio 2025