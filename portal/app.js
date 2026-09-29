/**
 * DATOS INICIALES (Mock Database)
 * Se cargan en localStorage la primera vez que se abre la app.
 */
const initialData = [
    {
        id: 1694700000001,
        title: "El impacto de la Inteligencia Artificial en el desarrollo de software",
        category: "Tecnología",
        description: "Descubre cómo los nuevos modelos generativos están acelerando la creación de código y arquitecturas complejas.",
        content: "La inteligencia artificial no viene a reemplazar a los desarrolladores, sino a potenciar su creatividad. Herramientas de autocompletado y análisis estructural permiten que los equipos se enfoquen en la lógica de negocio y la escalabilidad de sistemas.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        date: "14 Sep 2026"
    },
    {
        id: 1694700000002,
        title: "Nuevas tendencias en turismo ecológico en Colombia",
        category: "Turismo",
        description: "Explorando destinos sostenibles que protegen la biodiversidad y apoyan a las comunidades locales.",
        content: "El ecoturismo se ha posicionado como una de las principales fuentes de desarrollo en el país. Regiones antes inexploradas ahora ofrecen experiencias inmersivas respetando la huella de carbono.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
        date: "12 Sep 2026"
    },
    {
        id: 1694700000003,
        title: "Innovación Educativa: Realidad Virtual en las Aulas",
        category: "Educación",
        description: "Instituciones de todo el mundo están adoptando cascos de RV para enseñar historia y ciencias.",
        content: "Los estudiantes ahora pueden caminar por la antigua Roma o explorar el interior de una célula humana. La inmersión total aumenta la retención de información en un 40% según estudios recientes.",
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
        date: "10 Sep 2026"
    }
];

/**
 * CORE APPLICATION
 */
const app = {
    contentDiv: document.getElementById('app-content'),
    news: [],
    favorites: [],

    init() {
        // Cargar datos de localStorage o usar iniciales
        const storedNews = localStorage.getItem('nexus_news');
        if (!storedNews) {
            localStorage.setItem('nexus_news', JSON.stringify(initialData));
            this.news = initialData;
        } else {
            this.news = JSON.parse(storedNews);
        }

        const storedFavs = localStorage.getItem('nexus_favorites');
        this.favorites = storedFavs ? JSON.parse(storedFavs) : [];

        // Router básico basado en hash o carga inicial
        this.navigate('home');
    },

    saveData() {
        localStorage.setItem('nexus_news', JSON.stringify(this.news));
        localStorage.setItem('nexus_favorites', JSON.stringify(this.favorites));
    },

    navigate(view, param = null) {
        window.scrollTo(0, 0);
        this.contentDiv.innerHTML = ''; // Limpiar vista

        switch(view) {
            case 'home': this.renderHome(); break;
            case 'catalog': this.renderCatalog(); break;
            case 'detail': this.renderDetail(param); break;
            case 'favorites': this.renderFavorites(); break;
            case 'admin': this.renderAdmin(); break;
            case 'contact': this.renderContact(); break;
            default: this.renderHome();
        }
    },

    // --- RENDERIZADO DE VISTAS ---

    renderHome() {
        const featured = this.news.slice(0, 3); // Últimas 3
        
        let html = `
            <section class="hero-gradient pt-24 pb-32 px-4 relative">
                <div class="hero-shape"></div>
                <div class="max-w-7xl mx-auto text-center relative z-10 animate-fade-in-up">
                    <span class="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-200">Pryecto de FrontEnd para el Poli</span>
                    <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
                        Descubre Historias que <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Inspiran el Futuro</span>
                    </h1>
                    <p class="mt-4 max-w-2xl text-xl text-slate-600 mx-auto mb-10">
                        Explora las últimas tendencias en tecnología, educación y turismo a través de una experiencia inmersiva y moderna.
                    </p>
                    <div class="flex justify-center gap-4">
                        <button onclick="app.navigate('catalog')" class="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/30">
                            Comenzar a Explorar
                        </button>
                    </div>
                </div>
            </section>

            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between items-end mb-12">
                        <div>
                            <h2 class="text-3xl font-bold text-slate-900">Noticias Destacadas</h2>
                            <p class="text-slate-500 mt-2">Lo más reciente en nuestro portal</p>
                        </div>
                        <button onclick="app.navigate('catalog')" class="text-indigo-600 font-semibold hover:text-indigo-800 transition">Ver todas &rarr;</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${this.generateCardsHTML(featured)}
                    </div>
                </div>
            </section>
        `;
        this.contentDiv.innerHTML = html;
    },

    renderCatalog() {
        let html = `
            <section class="py-12 px-4 max-w-7xl mx-auto">
                <div class="mb-12 text-center animate-fade-in-up">
                    <h1 class="text-4xl font-extrabold text-slate-900 mb-4">Catálogo de Noticias</h1>
                    <p class="text-slate-500 max-w-2xl mx-auto">Navega por todas nuestras publicaciones y descubre contenido curado especialmente para ti.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fade-in-up delay-100">
                    ${this.generateCardsHTML(this.news)}
                </div>
            </section>
        `;
        this.contentDiv.innerHTML = html;
    },

    renderDetail(id) {
        const item = this.news.find(n => n.id === id);
        if (!item) return this.navigate('catalog');
        
        const isFav = this.favorites.includes(id);

        let html = `
            <article class="max-w-4xl mx-auto px-4 py-12 animate-fade-in-up">
                <div class="mb-8">
                    <span class="text-sm font-bold text-indigo-600 uppercase tracking-wider">${item.category}</span>
                    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6 leading-tight">${item.title}</h1>
                    <div class="flex items-center justify-between border-b border-slate-200 pb-6">
                        <div class="flex items-center text-slate-500 text-sm">
                            <i class="fa-regular fa-calendar mr-2"></i> ${item.date}
                        </div>
                        <div class="flex gap-3">
                            <button onclick="app.toggleFavorite(${item.id})" class="flex items-center justify-center w-10 h-10 rounded-full border transition ${isFav ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-300'}">
                                <i class="fa-solid fa-bookmark"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="w-full h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
                </div>

                <div class="prose prose-lg prose-indigo max-w-none text-slate-700 leading-relaxed">
                    <p class="text-xl font-medium text-slate-900 mb-6">${item.description}</p>
                    <p>${item.content}</p>
                </div>
            </article>
        `;
        this.contentDiv.innerHTML = html;
    },

    renderFavorites() {
        const favNews = this.news.filter(n => this.favorites.includes(n.id));
        
        let html = `
            <section class="py-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
                <div class="mb-12 flex items-center gap-3">
                    <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl">
                        <i class="fa-solid fa-bookmark"></i>
                    </div>
                    <h1 class="text-4xl font-extrabold text-slate-900">Mis Favoritos</h1>
                </div>
                
                ${favNews.length === 0 
                    ? `<div class="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                            <i class="fa-regular fa-folder-open text-6xl text-slate-300 mb-4"></i>
                            <h3 class="text-xl font-bold text-slate-700">Aún no tienes favoritos</h3>
                            <p class="text-slate-500 mt-2">Explora el catálogo y guarda las noticias que más te interesen.</p>
                            <button onclick="app.navigate('catalog')" class="mt-6 text-indigo-600 font-semibold hover:underline">Ir al catálogo</button>
                       </div>`
                    : `<div class="grid grid-cols-1 md:grid-cols-3 gap-8">${this.generateCardsHTML(favNews)}</div>`
                }
            </section>
        `;
        this.contentDiv.innerHTML = html;
    },

    renderContact() {
        let html = `
            <section class="py-20 px-4 max-w-3xl mx-auto animate-fade-in-up">
                <div class="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <h2 class="text-3xl font-extrabold text-slate-900 mb-2">Ponte en contacto</h2>
                    <p class="text-slate-500 mb-8">¿Tienes alguna duda o propuesta? Escríbenos y te responderemos a la brevedad.</p>
                    
                    <form id="contactForm" onsubmit="app.handleContactSubmit(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo <span class="text-red-500">*</span></label>
                                <input type="text" id="c_name" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico <span class="text-red-500">*</span></label>
                                <input type="email" id="c_email" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                            </div>
                        </div>
                        <div class="mb-8">
                            <label class="block text-sm font-semibold text-slate-700 mb-2">Mensaje <span class="text-red-500">*</span></label>
                            <textarea id="c_message" rows="5" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/20">
                            Enviar Mensaje <i class="fa-solid fa-paper-plane ml-2"></i>
                        </button>
                    </form>
                </div>
            </section>
        `;
        this.contentDiv.innerHTML = html;
    },

    renderAdmin() {
        let rows = this.news.map(item => `
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                <td class="px-6 py-4 text-sm font-medium text-slate-900">${item.title.substring(0,40)}...</td>
                <td class="px-6 py-4 text-sm text-slate-500"><span class="bg-indigo-50 text-indigo-600 py-1 px-2 rounded-md font-semibold text-xs">${item.category}</span></td>
                <td class="px-6 py-4 text-sm text-slate-500">${item.date}</td>
                <td class="px-6 py-4 text-right text-sm font-medium">
                    <button onclick="app.deleteNews(${item.id})" class="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');

        let html = `
            <section class="py-12 px-4 max-w-6xl mx-auto animate-fade-in-up">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 class="text-3xl font-extrabold text-slate-900">Gestor de Contenido</h1>
                        <p class="text-slate-500">Administración de noticias</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Formulario de Creación -->
                    <div class="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
                        <h3 class="text-xl font-bold text-slate-800 mb-4">Nueva Noticia</h3>
                        <form id="addNewsForm" onsubmit="app.handleAddNews(event)">
                            <input type="text" id="n_title" placeholder="Título" required class="w-full mb-4 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500">
                            <select id="n_cat" required class="w-full mb-4 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500">
                                <option value="">Categoría...</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Educación">Educación</option>
                                <option value="Turismo">Turismo</option>
                                <option value="Comercial">Comercial</option>
                            </select>
                            <input type="text" id="n_desc" placeholder="Descripción breve" required class="w-full mb-4 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500">
                            <input type="url" id="n_img" placeholder="URL de Imagen" required class="w-full mb-4 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500">
                            <textarea id="n_content" placeholder="Contenido completo..." rows="3" required class="w-full mb-4 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"></textarea>
                            <button type="submit" class="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition">Agregar Noticia</button>
                        </form>
                    </div>

                    <!-- Tabla de Registros -->
                    <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-slate-200">
                                <thead class="bg-slate-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Título</th>
                                        <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Categoría</th>
                                        <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                                        <th class="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-slate-200">
                                    ${rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.contentDiv.innerHTML = html;
    },

    // --- LÓGICA DE COMPONENTES Y ACCIONES ---

    generateCardsHTML(newsArray) {
        return newsArray.map(item => {
            const isFav = this.favorites.includes(item.id);
            return `
            <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover group flex flex-col h-full">
                <div class="relative h-48 overflow-hidden">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <button onclick="app.toggleFavorite(${item.id})" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow transition ${isFav ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}">
                        <i class="fa-solid fa-bookmark"></i>
                    </button>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">${item.category}</span>
                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-tight">${item.title}</h3>
                    <p class="text-slate-500 text-sm mb-6 flex-grow">${item.description}</p>
                    <button onclick="app.navigate('detail', ${item.id})" class="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition flex items-center w-max mt-auto">
                        Leer artículo <i class="fa-solid fa-arrow-right ml-2 text-xs"></i>
                    </button>
                </div>
            </div>
        `}).join('');
    },

    toggleFavorite(id) {
        if (this.favorites.includes(id)) {
            this.favorites = this.favorites.filter(favId => favId !== id);
            this.showToast('Eliminado de favoritos', 'info');
        } else {
            this.favorites.push(id);
            this.showToast('Agregado a favoritos', 'success');
        }
        this.saveData();
        
        // Refrescar vista actual si es necesario
        if(document.querySelector('h1').innerText === 'Mis Favoritos') this.renderFavorites();
        else if(document.querySelector('h1').innerText === 'Catálogo de Noticias') this.renderCatalog();
        else if(document.querySelector('article')) this.renderDetail(id);
        else this.renderHome();
    },

    handleContactSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('c_name').value;
        this.showToast(`¡Gracias ${name}! Hemos recibido tu mensaje.`, 'success');
        e.target.reset();
    },

    handleAddNews(e) {
        e.preventDefault();
        const newNews = {
            id: Date.now(),
            title: document.getElementById('n_title').value,
            category: document.getElementById('n_cat').value,
            description: document.getElementById('n_desc').value,
            content: document.getElementById('n_content').value,
            image: document.getElementById('n_img').value,
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
        };

        this.news.unshift(newNews); // Agregar al inicio
        this.saveData();
        this.showToast('Noticia creada correctamente', 'success');
        this.renderAdmin(); // Refrescar tabla
    },

    deleteNews(id) {
        if(confirm('¿Estás seguro de eliminar esta noticia?')) {
            this.news = this.news.filter(n => n.id !== id);
            // Limpiar también de favoritos si estaba
            this.favorites = this.favorites.filter(favId => favId !== id);
            this.saveData();
            this.showToast('Noticia eliminada', 'error');
            this.renderAdmin();
        }
    },

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-indigo-500'
        };
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-trash',
            info: 'fa-info-circle'
        };

        toast.className = `toast-enter flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-xl ${colors[type]} mb-2`;
        toast.innerHTML = `<i class="fa-solid ${icons[type]} text-lg"></i> <span class="font-medium text-sm">${message}</span>`;
        
        container.appendChild(toast);

        // Remover después de 3s
        setTimeout(() => {
            toast.classList.remove('toast-enter');
            toast.classList.add('toast-leave');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Inicializar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});