// Variables globales
let urlsMapaSitio = [];
let reglasRobots = [];

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function () {
    inicializarAplicacion();
});

function inicializarAplicacion() {
    // Establecer la fecha de hoy para el formulario de sitemap
    const hoy = new Date().toISOString().split('T')[0];
    const fechaSitemap = document.getElementById('sitemapDate');
    if (fechaSitemap) {
        fechaSitemap.value = hoy;
    }

    // Inicializar contadores de caracteres
    inicializarContadoresCaracteres();

    // Inicializar progreso de actividades
    inicializarProgresoActividades();

    // Inicializar manejadores de formularios
    inicializarManejadoresFormularios();

    // Inicializar vista previa en tiempo real para meta tags
    inicializarVistaPreviaMeta();
}

// Función simple para cambiar de pestaña
function mostrarPestana(idPestana) {
    // Ocultar todas las pestañas
    const todasPestanas = document.querySelectorAll('.tab-pane');
    todasPestanas.forEach(tab => {
        tab.classList.remove('show', 'active');
    });

    // Quitar clase activa de todos los enlaces de navegación
    const todosNavLinks = document.querySelectorAll('.nav-link');
    todosNavLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Mostrar la pestaña seleccionada
    const pestanaSeleccionada = document.getElementById(idPestana);
    if (pestanaSeleccionada) {
        pestanaSeleccionada.classList.add('show', 'active');
    }

    // Activar el enlace de navegación correspondiente
    const navLink = document.getElementById(idPestana + '-tab');
    if (navLink) {
        navLink.classList.add('active');
    }
}

// Inicializar manejadores de formularios
function inicializarManejadoresFormularios() {
    // Formulario de sitemap
    const formularioSitemap = document.getElementById('sitemapForm');
    if (formularioSitemap) {
        formularioSitemap.addEventListener('submit', function (e) {
            e.preventDefault();
            agregarUrlMapaSitio();
        });
    }

    // Formulario de robots
    const formularioRobots = document.getElementById('robotsForm');
    if (formularioRobots) {
        formularioRobots.addEventListener('submit', function (e) {
            e.preventDefault();
            agregarReglaRobots();
        });
    }
}

// Inicializar contadores de caracteres
function inicializarContadoresCaracteres() {
    const inputTitulo = document.getElementById('metaTitle');
    const inputDesc = document.getElementById('metaDescription');

    if (inputTitulo) {
        inputTitulo.addEventListener('input', function () {
            actualizarContadorCaracteres('titleCount', this.value.length);
        });
    }

    if (inputDesc) {
        inputDesc.addEventListener('input', function () {
            actualizarContadorCaracteres('descCount', this.value.length);
        });
    }
}

function actualizarContadorCaracteres(idElemento, cantidad) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = cantidad;
    }
}

// Inicializar vista previa de meta
function inicializarVistaPreviaMeta() {
    const entradas = ['metaTitle', 'metaDescription', 'canonicalUrl'];
    entradas.forEach(idInput => {
        const input = document.getElementById(idInput);
        if (input) {
            input.addEventListener('input', actualizarVistaGoogle);
        }
    });
}

function actualizarVistaGoogle() {
    const tituloEl = document.getElementById('metaTitle');
    const descEl = document.getElementById('metaDescription');
    const urlEl = document.getElementById('canonicalUrl');

    const titulo = tituloEl ? tituloEl.value || 'Título de la página' : 'Título de la página';
    const descripcion = descEl ? descEl.value || 'Descripción de la página que aparecerá en los resultados de búsqueda.' : 'Descripción de la página que aparecerá en los resultados de búsqueda.';
    const url = urlEl ? urlEl.value || 'https://ejemplo.com' : 'https://ejemplo.com';

    const vistaTitulo = document.querySelector('.google-title');
    const vistaDesc = document.querySelector('.google-description');
    const vistaUrl = document.querySelector('.google-url');

    if (vistaTitulo) vistaTitulo.textContent = titulo;
    if (vistaDesc) vistaDesc.textContent = descripcion;
    if (vistaUrl) vistaUrl.textContent = url;
}

// FUNCIONES MAPA DEL SITIO
function agregarUrlMapaSitio() {
    const inputUrl = document.getElementById('sitemapUrl');
    const selectPrioridad = document.getElementById('sitemapPriority');
    const selectFrecuencia = document.getElementById('sitemapFreq');
    const inputFecha = document.getElementById('sitemapDate');

    if (!inputUrl || !selectPrioridad || !selectFrecuencia || !inputFecha) {
        mostrarToast('Error: No se pueden encontrar los campos del formulario', 'error');
        return;
    }

    const url = inputUrl.value.trim();
    const prioridad = selectPrioridad.value;
    const frecuencia = selectFrecuencia.value;
    const fecha = inputFecha.value;

    if (!url) {
        mostrarToast('Por favor ingresa una URL válida', 'error');
        return;
    }

    // Comprobar duplicados
    if (urlsMapaSitio.some(item => item.url === url)) {
        mostrarToast('Esta URL ya ha sido añadida', 'error');
        return;
    }

    urlsMapaSitio.push({
        url: url,
        priority: prioridad,
        changefreq: frecuencia,
        lastmod: fecha
    });

    // Reiniciar formulario
    inputUrl.value = '';
    selectPrioridad.value = '0.8';
    selectFrecuencia.value = 'weekly';
    inputFecha.value = new Date().toISOString().split('T')[0];

    actualizarListaMapaSitio();
    mostrarToast('URL añadida exitosamente', 'success');
}

function actualizarListaMapaSitio() {
    const elementoLista = document.getElementById('sitemapList');
    const elementoCantidad = document.getElementById('sitemapCount');

    if (!elementoLista || !elementoCantidad) return;

    elementoCantidad.textContent = urlsMapaSitio.length;

    if (urlsMapaSitio.length === 0) {
        elementoLista.innerHTML = '<p class="text-muted">No hay URLs añadidas</p>';
        return;
    }

    elementoLista.innerHTML = urlsMapaSitio.map((item, index) => `
        <div class="sitemap-item p-2 mb-2 border rounded">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <strong class="text-primary">${escapeHtml(item.url)}</strong><br>
                    <small class="text-muted">
                        Prioridad: ${item.priority} | 
                        Frecuencia: ${item.changefreq} | 
                        Modificado: ${item.lastmod}
                    </small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarUrlMapaSitio(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function eliminarUrlMapaSitio(indice) {
    urlsMapaSitio.splice(indice, 1);
    actualizarListaMapaSitio();
    mostrarToast('URL eliminada', 'success');
}

function cargarEjemplosMapaSitio() {
    const ejemplos = [
        {
            url: "http://localhost:3000/",
            priority: "1.0",
            changefreq: "daily",
            lastmod: "2025-07-11"
        },
        {
            url: "http://localhost:3000/about",
            priority: "0.8",
            changefreq: "monthly",
            lastmod: "2025-07-10"
        },
        {
            url: "http://localhost:3000/contact",
            priority: "0.6",
            changefreq: "monthly",
            lastmod: "2025-07-05"
        },
        {
            url: "http://localhost:8080/",
            priority: "0.9",
            changefreq: "weekly",
            lastmod: "2025-07-08"
        }
    ];

    urlsMapaSitio = [...ejemplos];
    actualizarListaMapaSitio();
    mostrarToast('URLs de ejemplo cargadas', 'success');
}

function generarMapaSitio() {
    if (urlsMapaSitio.length === 0) {
        mostrarToast('Debes añadir al menos una URL', 'error');
        return;
    }

    const declaracionXml = '<?xml version="1.0" encoding="UTF-8"?>';
    const aperturaUrlset = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const cierreUrlset = '</urlset>';

    const entradasUrl = urlsMapaSitio.map(item => {
        return `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`;
    }).join('\n');

    const sitemapXml = `${declaracionXml}
${aperturaUrlset}
${entradasUrl}
${cierreUrlset}`;

    const elementoSalida = document.getElementById('sitemapXml');
    const seccionSalida = document.getElementById('sitemapOutput');

    if (elementoSalida) {
        elementoSalida.value = sitemapXml;
    }

    if (seccionSalida) {
        seccionSalida.style.display = 'block';
    }

    mostrarToast('Sitemap generado exitosamente', 'success');
}

function copiarMapaSitio() {
    const textarea = document.getElementById('sitemapXml');
    if (!textarea) {
        mostrarToast('Error: No se encuentra el área de texto', 'error');
        return;
    }

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    try {
        document.execCommand('copy');
        mostrarToast('Sitemap copiado al portapapeles', 'success');
    } catch (err) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                mostrarToast('Sitemap copiado al portapapeles', 'success');
            }).catch(() => {
                mostrarToast('Error al copiar al portapapeles', 'error');
            });
        } else {
            mostrarToast('Error al copiar al portapapeles', 'error');
        }
    }
}

function descargarMapaSitio() {
    const textarea = document.getElementById('sitemapXml');
    if (!textarea || !textarea.value) {
        mostrarToast('Primero genera el sitemap', 'error');
        return;
    }

    descargarArchivo(textarea.value, 'sitemap.xml', 'application/xml');
    mostrarToast('Sitemap descargado', 'success');
}

// FUNCIONES ROBOTS.TXT
function agregarReglaRobots() {
    const userAgentEl = document.getElementById('robotsUserAgent');
    const disallowEl = document.getElementById('robotsDisallow');
    const allowEl = document.getElementById('robotsAllow');
    const sitemapEl = document.getElementById('robotsSitemap');

    if (!userAgentEl) {
        mostrarToast('Error: No se pueden encontrar los campos del formulario', 'error');
        return;
    }

    const userAgent = userAgentEl.value;
    const disallow = disallowEl ? disallowEl.value.trim() : '';
    const allow = allowEl ? allowEl.value.trim() : '';
    const sitemap = sitemapEl ? sitemapEl.value.trim() : '';

    if (!disallow && !allow && !sitemap) {
        mostrarToast('Debes especificar al menos una regla', 'error');
        return;
    }

    const regla = {
        userAgent: userAgent,
        disallow: disallow,
        allow: allow,
        sitemap: sitemap
    };

    reglasRobots.push(regla);

    // Reiniciar formulario
    if (disallowEl) disallowEl.value = '';
    if (allowEl) allowEl.value = '';
    if (sitemapEl) sitemapEl.value = '';

    actualizarListaRobots();
    mostrarToast('Regla añadida exitosamente', 'success');
}

function actualizarListaRobots() {
    const elementoLista = document.getElementById('robotsList');
    const elementoCantidad = document.getElementById('robotsCount');

    if (!elementoLista || !elementoCantidad) return;

    elementoCantidad.textContent = reglasRobots.length;

    if (reglasRobots.length === 0) {
        elementoLista.innerHTML = '<p class="text-muted">No hay reglas añadidas</p>';
        return;
    }

    elementoLista.innerHTML = reglasRobots.map((regla, index) => `
        <div class="robots-item p-2 mb-2 border rounded">
            <div class="d-flex justify-content-between align-items-start">
                <div class="robots-info" >
                    <strong class="text-success">User-agent: ${escapeHtml(regla.userAgent)}</strong><br>
                    <small class="text-success">
                        ${regla.disallow ? `Disallow: ${escapeHtml(regla.disallow)}<br>` : ''}
                        ${regla.allow ? `Allow: ${escapeHtml(regla.allow)}<br>` : ''}
                        ${regla.sitemap ? `Sitemap: ${escapeHtml(regla.sitemap)}` : ''}
                    </small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarReglaRobots(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function eliminarReglaRobots(indice) {
    reglasRobots.splice(indice, 1);
    actualizarListaRobots();
    mostrarToast('Regla eliminada', 'success');
}

function cargarPlantillaRobots(tipo) {
    reglasRobots = [];

    switch (tipo) {
        case 'allow':
            reglasRobots.push({
                userAgent: '*',
                disallow: '',
                allow: '/',
                sitemap: 'https://ejemplo.com/sitemap.xml'
            });
            break;
        case 'admin':
            reglasRobots.push({
                userAgent: '*',
                disallow: '/admin/',
                allow: '',
                sitemap: 'https://ejemplo.com/sitemap.xml'
            });
            reglasRobots.push({
                userAgent: '*',
                disallow: '/wp-admin/',
                allow: '',
                sitemap: ''
            });
            break;
        case 'private':
            reglasRobots.push({
                userAgent: '*',
                disallow: '/',
                allow: '',
                sitemap: ''
            });
            break;
    }

    actualizarListaRobots();
    mostrarToast(`Plantilla "${tipo}" cargada`, 'success');
}

function generarRobots() {
    if (reglasRobots.length === 0) {
        mostrarToast('Debes añadir al menos una regla', 'error');
        return;
    }

    let contenidoRobots = '';
    let userAgentActual = '';

    reglasRobots.forEach(regla => {
        if (regla.userAgent !== userAgentActual) {
            contenidoRobots += `User-agent: ${regla.userAgent}\n`;
            userAgentActual = regla.userAgent;
        }

        if (regla.disallow) {
            contenidoRobots += `Disallow: ${regla.disallow}\n`;
        }

        if (regla.allow) {
            contenidoRobots += `Allow: ${regla.allow}\n`;
        }

        if (regla.sitemap) {
            contenidoRobots += `Sitemap: ${regla.sitemap}\n`;
        }

        contenidoRobots += '\n';
    });

    const elementoSalida = document.getElementById('robotsTxt');
    const seccionSalida = document.getElementById('robotsOutput');

    if (elementoSalida) {
        elementoSalida.value = contenidoRobots.trim();
    }

    if (seccionSalida) {
        seccionSalida.style.display = 'block';
    }

    mostrarToast('Robots.txt generado exitosamente', 'success');
}

function copiarRobots() {
    const textarea = document.getElementById('robotsTxt');
    if (!textarea) {
        mostrarToast('Error: No se encuentra el área de texto', 'error');
        return;
    }

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    try {
        document.execCommand('copy');
        mostrarToast('Robots.txt copiado al portapapeles', 'success');
    } catch (err) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                mostrarToast('Robots.txt copiado al portapapeles', 'success');
            }).catch(() => {
                mostrarToast('Error al copiar al portapapeles', 'error');
            });
        } else {
            mostrarToast('Error al copiar al portapapeles', 'error');
        }
    }
}

function descargarRobots() {
    const textarea = document.getElementById('robotsTxt');
    if (!textarea || !textarea.value) {
        mostrarToast('Primero genera el robots.txt', 'error');
        return;
    }

    descargarArchivo(textarea.value, 'robots.txt', 'text/plain');
    mostrarToast('Robots.txt descargado', 'success');
}

// Función para escapar caracteres HTML para evitar inyecciones y asegurar la correcta visualización
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

// Función para escapar HTML para evitar inyecciones
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function descargarArchivo(contenido, nombreArchivo, tipoMime) {
    const blob = new Blob([contenido], { type: tipoMime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function mostrarToast(mensaje, tipo = 'info') {
    const toastEl = document.getElementById('toast');
    const toastMessageEl = document.getElementById('toastMessage');
    const toastHeaderIcon = toastEl.querySelector('.toast-header i');

    if (toastMessageEl && toastEl && toastHeaderIcon) {
        toastMessageEl.textContent = mensaje;

        // Limpiar clases de color previas
        toastHeaderIcon.classList.remove('text-primary', 'text-success', 'text-danger', 'text-warning');
        // Añadir clase de color según el tipo
        switch (tipo) {
            case 'success':
                toastHeaderIcon.classList.add('text-success');
                toastHeaderIcon.className = 'bi bi-check-circle-fill text-success me-2';
                break;
            case 'danger':
                toastHeaderIcon.classList.add('text-danger');
                toastHeaderIcon.className = 'bi bi-x-circle-fill text-danger me-2';
                break;
            case 'warning':
                toastHeaderIcon.classList.add('text-warning');
                toastHeaderIcon.className = 'bi bi-exclamation-triangle-fill text-warning me-2';
                break;
            case 'info':
            default:
                toastHeaderIcon.classList.add('text-primary');
                toastHeaderIcon.className = 'bi bi-info-circle-fill text-primary me-2';
                break;
        }

        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    } else {
        console.warn('Elementos Toast no encontrados. Mensaje:', mensaje);
    }
}

// FUNCIONES META TAGS
function generarMeta() {
    const tituloEl = document.getElementById('metaTitle');
    const descEl = document.getElementById('metaDescription');
    const keywordsEl = document.getElementById('metaKeywords');
    const autorEl = document.getElementById('metaAuthor');
    const canonicalUrlEl = document.getElementById('metaCanonicalUrl'); // Nuevo elemento para URL Canónica
    const ogTituloEl = document.getElementById('ogTitle');
    const ogDescEl = document.getElementById('ogDescription');
    const ogImagenEl = document.getElementById('ogImage');
    const ogUrlEl = document.getElementById('ogUrl');
    const twitterCardEl = document.getElementById('twitterCard');
    const twitterTituloEl = document.getElementById('twitterTitle');
    const twitterDescEl = document.getElementById('twitterDescription');

    const titulo = tituloEl ? tituloEl.value : '';
    const canonicalUrl = canonicalUrlEl ? canonicalUrlEl.value : ''; // Valor de la URL Canónica
    const descripcion = descEl ? descEl.value : '';
    const keywords = keywordsEl ? keywordsEl.value : '';
    const autor = autorEl ? autorEl.value : '';
    const ogTitulo = ogTituloEl ? ogTituloEl.value : '';
    const ogDescripcion = ogDescEl ? ogDescEl.value : '';
    const ogImagen = ogImagenEl ? ogImagenEl.value : '';
    const ogUrl = ogUrlEl ? ogUrlEl.value : '';
    const twitterCard = twitterCardEl ? twitterCardEl.value : 'summary';
    const twitterTitulo = twitterTituloEl ? twitterTituloEl.value : '';
    const twitterDescripcion = twitterDescEl ? twitterDescEl.value : '';
    // twitter:image generalmente usa la misma que og:image si no se especifica otra
    const twitterImage = ogImagen;

    let metaHtml = '\n';

    if (titulo) {
        metaHtml += `<title>${escapeHtml(titulo)}</title>\n`;
    }

    if (canonicalUrl) {
        metaHtml += `    <link rel="canonical" href="${escapeHtml(canonicalUrl)}">\n`;
    }

    if (descripcion) {
        metaHtml += `<meta name="description" content="${escapeHtml(descripcion)}">\n`;
    }

    if (keywords) {
        metaHtml += `<meta name="keywords" content="${escapeHtml(keywords)}">\n`;
    }

    if (autor) {
        metaHtml += `<meta name="author" content="${escapeHtml(autor)}">\n`;
    }

    metaHtml += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    metaHtml += '<meta charset="UTF-8">\n\n';

    // Open Graph
    if (ogTitulo || ogDescripcion || ogImagen || ogUrl) {
        metaHtml += '\n';
        metaHtml += '<meta property="og:type" content="website">\n';

        if (ogTitulo) {
            metaHtml += `<meta property="og:title" content="${escapeHtml(ogTitulo)}">\n`;
        }

        if (ogDescripcion) {
            metaHtml += `<meta property="og:description" content="${escapeHtml(ogDescripcion)}">\n`;
        }

        if (ogImagen) {
            metaHtml += `<meta property="og:image" content="${escapeHtml(ogImagen)}">\n`;
        }

        if (ogUrl) {
            metaHtml += `<meta property="og:url" content="${escapeHtml(ogUrl)}">\n`;
        }

        metaHtml += '\n';
    }

    // Twitter Cards
    // Se genera la Twitter Card si hay título o descripción o si hay imagen OG (ya que Twitter la usará)
    if (twitterTitulo || twitterDescripcion || twitterImage) {
        metaHtml += '\n';
        metaHtml += `<meta name="twitter:card" content="${escapeHtml(twitterCard)}">\n`;

        if (twitterTitulo) {
            metaHtml += `<meta name="twitter:title" content="${escapeHtml(twitterTitulo)}">\n`;
        }

        if (twitterDescripcion) {
            metaHtml += `<meta name="twitter:description" content="${escapeHtml(twitterDescripcion)}">\n`;
        }

        if (twitterImage) { // Usamos la imagen OG como la imagen de Twitter si está disponible
            metaHtml += `<meta name="twitter:image" content="${escapeHtml(twitterImage)}">\n`;
        }
        // Opcional: Puedes añadir twitter:site si tienes un campo para ello
        // metaHtml += `<meta name="twitter:site" content="@TuUsuarioDeX">\n`;
    }

    const elementoSalida = document.getElementById('metaHtml');
    const seccionSalida = document.getElementById('metaOutput');

    // --- Actualizar Vistas Previas ---

    // Vista Previa Google
    const googleTitleEl = document.querySelector('.google-preview .google-title');
    const googleUrlEl = document.querySelector('.google-preview .google-url');
    const googleDescEl = document.querySelector('.google-preview .google-description');

    if (googleTitleEl) googleTitleEl.textContent = titulo || 'Título de la página';
    // Priorizamos la URL Canónica para la vista previa de Google
    if (googleUrlEl) googleUrlEl.textContent = canonicalUrl || 'https://ejemplo.com/';
    if (googleDescEl) googleDescEl.textContent = descripcion || 'Descripción de la página que aparecerá en los resultados de búsqueda.';

    // Vista Previa Open Graph
    const ogPreviewTitleEl = document.getElementById('ogPreviewTitle');
    const ogPreviewDescEl = document.getElementById('ogPreviewDescription');
    const ogPreviewUrlEl = document.getElementById('ogPreviewUrl');
    const ogPreviewImageEl = document.getElementById('ogPreviewImage');

    if (ogPreviewTitleEl) ogPreviewTitleEl.textContent = ogTitulo || titulo || 'Título de Open Graph por defecto';
    if (ogPreviewDescEl) ogPreviewDescEl.textContent = ogDescripcion || descripcion || 'Descripción de Open Graph por defecto que aparecerá en Facebook o LinkedIn.';
    if (ogPreviewUrlEl) ogPreviewUrlEl.textContent = ogUrl || canonicalUrl || 'https://ejemplo.com/';
    if (ogPreviewImageEl) ogPreviewImageEl.src = ogImagen || 'https://via.placeholder.com/1200x630?text=Imagen+OG';

    // Vista Previa Twitter Card
    const twitterPreviewTitleEl = document.getElementById('twitterPreviewTitle');
    const twitterPreviewDescEl = document.getElementById('twitterDescription'); // Corregido: antes era twitterDescription, debería ser twitterPreviewDescription
    const twitterPreviewImageEl = document.getElementById('twitterPreviewImage');
    const twitterPreviewImageContainerEl = document.getElementById('twitterPreviewImageContainer');
    const twitterPreviewCardEl = document.getElementById('twitterPreview'); // El div contenedor de la previsualización de Twitter Card

    if (twitterPreviewTitleEl) twitterPreviewTitleEl.textContent = twitterTitulo || ogTitulo || titulo || 'Título de Twitter Card por defecto';
    // **CORRECCIÓN**: Usar twitterPreviewDescEl en lugar de twitterPreviewDescEl para actualizar el contenido de la descripción en la vista previa
    const twitterPreviewDescriptionElement = document.getElementById('twitterPreviewDescriptionDisplay');
    if (twitterPreviewDescriptionElement) twitterPreviewDescriptionElement.textContent = twitterDescripcion || ogDescripcion || descripcion || 'Descripción de Twitter Card por defecto que aparecerá en X (Twitter).';


    // Actualizar la imagen y el layout según el tipo de tarjeta
    if (twitterPreviewImageEl && twitterPreviewImageContainerEl && twitterPreviewCardEl) {
        // **CORRECCIÓN**: Eliminar la clase 'summary' del contenedor principal de la tarjeta al inicio
        // para resetear su estado antes de aplicar el nuevo.
        twitterPreviewCardEl.classList.remove('summary'); //

        if (twitterCard === 'summary_large_image') {
            twitterPreviewImageEl.src = twitterImage || 'https://via.placeholder.com/1200x675?text=Imagen+Twitter';
            // Para 'summary_large_image', la imagen ocupa todo el ancho y el texto va debajo
            // No se necesita añadir ninguna clase especial aquí, ya que el diseño por defecto del CSS es el de large_image.
        } else { // 'summary'
            twitterPreviewImageEl.src = twitterImage || 'https://via.placeholder.com/120x120?text=Imagen+Twitter';
            // Para 'summary', la imagen es pequeña y va junto al texto.
            twitterPreviewCardEl.classList.add('summary'); // Añadir la clase 'summary' al contenedor principal para activar el CSS
        }
    }


    if (elementoSalida) {
        elementoSalida.value = metaHtml;
    }

    if (seccionSalida) {
        seccionSalida.style.display = 'block';
    }

    mostrarToast('Meta tags generadas exitosamente', 'success');
}

function copiarMeta() {
    const textarea = document.getElementById('metaHtml');
    if (!textarea) {
        mostrarToast('Error: No se encuentra el área de texto', 'error');
        return;
    }

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    try {
        document.execCommand('copy');
        mostrarToast('Meta tags copiadas al portapapeles', 'success');
    } catch (err) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                mostrarToast('Meta tags copiadas al portapapeles', 'success');
            }).catch(() => {
                mostrarToast('Error al copiar al portapapeles', 'error');
            });
        } else {
            mostrarToast('Error al copiar al portapapeles', 'error');
        }
    }
}

// FUNCIONES PROGRESO DE ACTIVIDADES
function inicializarProgresoActividades() {
    const checkboxes = document.querySelectorAll('#actividades input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', actualizarProgreso);
    });

    actualizarProgreso();
}

function actualizarProgreso() {
    const checkboxes = document.querySelectorAll('#actividades input[type="checkbox"]');
    const completadas = document.querySelectorAll('#actividades input[type="checkbox"]:checked').length;
    const total = checkboxes.length;
    const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

    const barraProgreso = document.getElementById('progressBar');
    const cantidadCompletadas = document.getElementById('completedCount');

    if (barraProgreso) {
        barraProgreso.style.width = porcentaje + '%';
        barraProgreso.textContent = porcentaje + '%';
    }

    if (cantidadCompletadas) {
        cantidadCompletadas.textContent = completadas;
    }

    if (porcentaje === 100) {
        mostrarToast('¡Felicidades! Has completado todas las actividades', 'success');
    }
}

// FUNCIONES UTILIDAD
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function descargarArchivo(contenido, nombreArchivo, tipoMime) {
    const blob = new Blob([contenido], { type: tipoMime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function mostrarToast(mensaje, tipo = 'info') {
    const toastEl = document.getElementById('toast');
    const toastMessageEl = document.getElementById('toastMessage');
    const toastHeaderIcon = toastEl.querySelector('.toast-header i');

    if (toastMessageEl && toastEl && toastHeaderIcon) {
        toastMessageEl.textContent = mensaje;

        // Limpiar clases de color previas
        toastHeaderIcon.classList.remove('text-primary', 'text-success', 'text-danger', 'text-warning');
        // Añadir clase de color según el tipo
        switch (tipo) {
            case 'success':
                toastHeaderIcon.classList.add('text-success');
                toastHeaderIcon.className = 'bi bi-check-circle-fill text-success me-2';
                break;
            case 'danger':
                toastHeaderIcon.classList.add('text-danger');
                toastHeaderIcon.className = 'bi bi-x-circle-fill text-danger me-2';
                break;
            case 'warning':
                toastHeaderIcon.classList.add('text-warning');
                toastHeaderIcon.className = 'bi bi-exclamation-triangle-fill text-warning me-2';
                break;
            case 'info':
            default:
                toastHeaderIcon.classList.add('text-primary');
                toastHeaderIcon.className = 'bi bi-info-circle-fill text-primary me-2';
                break;
        }

        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    } else {
        console.warn('Elementos Toast no encontrados. Mensaje:', mensaje);
    }
}