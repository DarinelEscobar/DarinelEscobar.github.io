import experienceSource from "@data/experience.json";
import type { Language, ProjectData } from "./types";
import { buildProjects, type ProjectTranslation } from "./projectUtils";

const experienceProjects = experienceSource.experience.projects;

const spanishTranslations: Record<string, ProjectTranslation> = {
  "Web Platform for Educational Offerings in Chiapas": {
    Project_Overview:
      "Este proyecto tuvo como objetivo crear una plataforma web centralizada para ayudar a estudiantes de Chiapas a explorar programas universitarios con facilidad. La plataforma ofrece una base de datos estructurada con informacion detallada sobre carreras, requisitos de admision, costos y datos institucionales. Incluye herramientas intuitivas de busqueda y filtrado para comparar opciones de forma eficiente, ademas de permitir la descarga de planes de estudio y recordatorios para fechas clave de inscripcion.",
    description:
      "Desarrollo de una plataforma web para que estudiantes consulten y exploren la oferta universitaria en Chiapas desde una fuente centralizada con informacion detallada sobre carreras, criterios de admision y costos. La plataforma incluye busqueda y filtros, detalle de programas, requisitos, desglose de costos e informacion de contacto.",
    role: "Desarrollador Full-stack",
    technologies: {
      Frontend: ["React", "Vite", "Tailwind CSS"],
      Backend: ["PHP", "CodeIgniter 4"],
      Herramientas: ["ShadCN/UI", "framer-motion", "Postman", "Eraser.io"],
      "Gestion del Proyecto": ["Jira", "GitHub"],
    },
    responsibilities: [
      "Disenar e implementar la interfaz de usuario con React y Vite.",
      "Desarrollar APIs REST seguras con PHP CodeIgniter 4, incluyendo hashing de contrasenas y rutas protegidas.",
      "Disenar endpoints escalables para estadisticas publicas y operaciones administrativas.",
      "Implementar paginacion en los endpoints para optimizar el rendimiento con mas de 1,000 universidades.",
      "Asegurar la estandarizacion de datos para facilitar la comparacion de programas educativos.",
      "Implementar herramientas para descargar planes de estudio y perfiles institucionales en PDF.",
      "Desarrollar funciones para configurar recordatorios de fechas importantes como inscripciones y examenes.",
    ],
    achievements: [
      "Reduccion significativa en el tiempo de respuesta del sistema gracias a la paginacion.",
      "Mejora en la accesibilidad de la informacion educativa para estudiantes de Chiapas.",
      "Implementacion exitosa de una plataforma centralizada que reduce el tiempo de busqueda de oportunidades educativas.",
      "Mayor visibilidad para estudiantes sobre la variedad de opciones educativas disponibles en Chiapas.",
      "Desarrollo de un sistema intuitivo para comparar programas lado a lado y facilitar decisiones informadas.",
    ],
    quick_view: {
      summary:
        "Plataforma publica para comparar programas academicos, revisar admisiones y explorar opciones educativas con lectura rapida.",
      impact_label: "1,000+ programas",
    },
    mediaDescriptions: [
      "Seccion de favoritos donde los usuarios pueden guardar programas preferidos.",
      "Vista del programa universitario mostrada en modo oscuro.",
      "Vista del programa universitario mostrada en modo claro.",
      "Panel principal con un resumen general de los programas universitarios.",
      "Barra lateral que muestra los programas marcados como favoritos.",
    ],
  },
  "Administrative System for University Programs": {
    Project_Overview:
      "Este sistema fue desarrollado para ayudar a administradores universitarios a gestionar informacion academica con mayor eficiencia. Permite crear, modificar y eliminar datos relacionados con instituciones y programas, ademas de generar reportes estadisticos. El sistema mejora los flujos administrativos con una interfaz intuitiva para usuarios no tecnicos, asegurando precision en los datos y fortaleciendo la interaccion entre instituciones y estudiantes prospecto.",
    description:
      "El modulo administrativo fue disenado para gestionar datos universitarios, incluyendo la creacion, modificacion y eliminacion de informacion sobre instituciones, programas y otros registros relevantes. Tambien facilita la generacion de estadisticas generales de uso para mantener una administracion efectiva de la informacion.",
    role: "Desarrollador Full-stack",
    technologies: {
      Frontend: ["HTML", "CSS", "JavaScript", "Bootstrap", "React", "Vite"],
      Backend: ["PHP", "CodeIgniter 4"],
      "Base de Datos": ["MySQL"],
      Arquitectura: ["MVC (Model-View-Controller)"],
      APIs: ["RESTful APIs"],
      "Gestion del Proyecto": ["Jira", "GitHub"],
      Herramientas: ["Postman", "Eraser.io"],
    },
    responsibilities: [
      "Desarrollar el backend con CodeIgniter 4 siguiendo una arquitectura MVC.",
      "Disenar la interfaz administrativa con Bootstrap para un layout responsivo y accesible.",
      "Crear APIs REST seguras para insercion y consulta de datos.",
      "Integrar el modulo publico en React dentro del proyecto CodeIgniter como vista precompilada, usando Bootstrap y Tailwind CSS en el mismo sistema.",
      "Desarrollar un modulo para generar estadisticas generales de uso.",
      "Implementar funcionalidades para que administradores gestionen programas academicos, promociones y actualizaciones.",
      "Asegurar exactitud y actualizacion oportuna de la informacion educativa publicada.",
      "Monitorear metricas clave y recopilar retroalimentacion de usuarios para mejorar la usabilidad.",
    ],
    achievements: [
      "Entrega de un sistema eficiente y seguro para agilizar tareas administrativas del personal universitario.",
      "Interfaz intuitiva que facilito la operacion para usuarios no tecnicos.",
      "Plataforma que permite a las instituciones gestionar sus programas, promociones y actualizaciones con menor dependencia de procesos manuales.",
      "Sistema para generar reportes con el numero de visitas a cada universidad dentro de la plataforma.",
      "Sistema centralizado para mantener informacion actualizada y contribuir a reducir el rezago academico en Chiapas.",
      "Mayor participacion institucional, con universidades actualizando activamente la informacion de sus programas.",
      "Incremento relevante en la adopcion de la plataforma y en el uso por parte de estudiantes.",
    ],
    quick_view: {
      summary:
        "Sistema administrativo para gestionar instituciones, programas y estadisticas con un back office mas claro y operativo.",
      impact_label: "Admin + stats",
    },
    mediaDescriptions: [
      "Pantalla de inicio de sesion de la plataforma con funciones de autenticacion.",
      "Panel de estadisticas generales con actividad de usuarios y metricas del sistema.",
      "Desglose detallado de estadisticas en un formato alterno para analisis.",
      "Vista completa del panel estadistico con distintas opciones de filtrado.",
      "Ventana modal que muestra las sedes disponibles.",
      "Vista de ubicaciones universitarias con las sedes disponibles en el mapa.",
    ],
  },
  "EZTICKET - Event Ticketing and Access Control Platform": {
    Project_Overview:
      "EZTICKET es una plataforma full-stack de ticketing construida para centralizar la publicacion, venta y validacion de boletos para eventos. El sistema soporta tres roles operativos: Administrador, Cliente y Recepcionista/Validador. Incluye sitio publico, compra por secciones o asientos asignados, checkout con Mercado Pago, emision de boletos digitales con QR, validacion de accesos, metricas en vivo, reportes exportables, gestion documental legal y una fila virtual para picos de trafico.",
    description:
      "Desarrollo de una plataforma web lista para produccion para organizadores de eventos, capaz de gestionar artistas, recintos, configuracion de asientos, eventos, compras y validacion de accesos. El sistema combina un catalogo publico de eventos con un panel administrativo y un modulo para recepcion, cubriendo la operacion de punta a punta desde la publicacion hasta la validacion y el reporte postventa.",
    role: "Desarrollador Full-stack",
    technologies: {
      Frontend: ["Laravel Blade", "Livewire 3", "Tailwind CSS", "Flowbite", "JavaScript", "Vite"],
      Backend: ["PHP 8.1", "Laravel 10", "MySQL"],
      Herramientas: ["Mercado Pago SDK", "Endroid QR Code", "DomPDF", "PhpSpreadsheet", "Composer", "Git"],
      "Gestion del Proyecto": ["Bitbucket"],
    },
    responsibilities: [
      "Desarrollar la experiencia publica para explorar eventos, ver detalles y comprar boletos por seccion o asiento asignado.",
      "Construir el panel administrativo para gestionar artistas, recintos, eventos, secciones, filas, distribuciones de asientos, compras, branding y documentos legales.",
      "Integrar Mercado Pago para checkout, manejo de estados de pago, procesamiento de webhooks y liberacion de reservas en pagos fallidos o expirados.",
      "Implementar la generacion de codigos QR y el render de boletos digitales para compras aprobadas, incluyendo los flujos de validacion en accesos.",
      "Crear modulos de metricas y reportes con resumenes de ventas, validaciones de asistencia y exportacion a Excel.",
      "Desarrollar un sistema de fila virtual con heartbeat y verificacion de disponibilidad para proteger el flujo de compra en picos de trafico.",
      "Modelar y mantener estructuras de base de datos para eventos, recintos, boletos, validaciones, seguimiento de usuarios y ciclos de compra.",
    ],
    achievements: [
      "Entrega de una plataforma lista para produccion que unifico publicacion de eventos, venta en linea, entrega de boletos digitales y control de acceso en un solo sistema.",
      "Implementacion completa del flujo de ticketing desde la seleccion y pago hasta la emision QR y la validacion en sitio.",
      "Mejora del control operativo para administradores mediante metricas en vivo, seguimiento de compras y reportes exportables.",
      "Inclusion de logica automatica para expiracion y liberacion de reservas, recuperando inventario y evitando asientos bloqueados por pagos incompletos.",
      "Capacidad de operar escenarios de alta demanda mediante fila virtual y monitoreo de trafico.",
    ],
    quick_view: {
      summary:
        "Plataforma de ticketing con catalogo publico, compra por asientos, checkout, boletos QR y validacion en accesos.",
      impact_label: "Pagos + QR",
    },
    mediaDescriptions: [
      "Pagina publica de detalle de evento con informacion, recinto, fecha y llamada principal para comprar boletos.",
      "Vista de resumen de checkout con boletos seleccionados, totales e integracion de pago con Mercado Pago.",
      "Panel administrativo con accesos rapidos a artistas, recintos, eventos, usuarios, compras y documentos legales.",
      "Pantalla de gestion de eventos para crear y configurar eventos, precios, logistica y disponibilidad de venta.",
      "Dashboard de metricas del evento con ventas, validaciones, ocupacion del recinto y registros de compra.",
      "Interfaz de escaneo QR para el personal de recepcion que valida accesos en tiempo real.",
      "Pantalla de fila virtual usada para gestionar posicion y acceso de usuarios durante periodos de alta demanda.",
    ],
  },
  "Landing Page for Chiapas Events - Anytime Fitness Tuxtla": {
    Project_Overview:
      "Este proyecto consistio en el diseno e implementacion de una landing page promocional para Chiapas Events, desarrollada para Anytime Fitness Tuxtla. La pagina fue creada para promover eventos culturales, recreativos y deportivos en la region, ofreciendo una interfaz moderna y atractiva para visitantes.",
    description:
      "Desarrollo de una landing page responsiva para mostrar proximos eventos en Chiapas. El sitio destaca categorias de eventos, beneficios de participar e incluye una galeria multimedia. Fue construido con enfoque en diseno visual y experiencia de usuario, asegurando accesibilidad en distintos dispositivos.",
    role: "Desarrollador Frontend",
    technologies: {
      Frontend: ["React", "Vite", "Tailwind CSS"],
      Backend: [],
      Herramientas: ["ShadCN/UI", "Framer Motion", "Figma"],
      "Gestion del Proyecto": ["GitHub"],
    },
    responsibilities: [
      "Disenar la estructura y composicion visual de la landing page con base en la identidad de la marca.",
      "Implementar un diseno responsivo para asegurar compatibilidad entre desktop y mobile.",
      "Integrar componentes interactivos, incluyendo carousel para eventos destacados y transiciones animadas.",
      "Optimizar imagenes para mejorar tiempos de carga y rendimiento.",
      "Implementar componentes modulares y reutilizables con Tailwind CSS y ShadCN/UI.",
      "Coordinarse con el cliente para alinear el contenido del sitio con sus objetivos de comunicacion.",
    ],
    achievements: [
      "Lanzamiento exitoso de una landing page atractiva y funcional.",
      "Mayor visibilidad de marca para Anytime Fitness Tuxtla a traves de promocion digital de eventos.",
      "Interfaz responsiva que se adapta con fluidez a distintos dispositivos.",
      "Retroalimentacion positiva de usuarios por su simplicidad y facilidad de navegacion.",
    ],
    quick_view: {
      summary:
        "Landing promocional pensada para escaneo rapido, navegacion responsiva y lanzamiento veloz de campanas.",
      impact_label: "Lanzamiento rapido",
    },
    mediaDescriptions: [
      "Vista principal de la landing page.",
      "Vista previa del header en mobile.",
      "Imagen secundaria del layout mobile.",
      "Vista previa del footer en mobile.",
    ],
  },
  "AMIFIT Cobro App": {
    Project_Overview:
      "Este proyecto se enfoco en el desarrollo de una aplicacion web para gestionar pagos de Anytime Fitness Tuxtla. Permite a los miembros pagar mensualidades, registrar pases y comprar keyfobs mediante una interfaz segura. Integra Stripe para procesamiento de pagos, soporta flujos con QR y ofrece una experiencia responsiva para desktop y mobile.",
    description:
      "Desarrollo de una aplicacion de cobro responsiva para miembros de Anytime Fitness en Tuxtla. La plataforma permite registrarse, pagar mensualidades y gestionar compras de keyfobs. Fue construida con React e integracion con Stripe, usando una arquitectura modular y componentes reutilizables para facilitar mantenimiento y escalabilidad.",
    role: "Desarrollador Full-stack",
    technologies: {
      Frontend: ["React", "Tailwind CSS"],
      Backend: ["PHP", "CodeIgniter 4"],
      Herramientas: ["Stripe", "React-QR-Code", "Material-UI"],
      "Gestion del Proyecto": ["GitHub"],
    },
    responsibilities: [
      "Disenar e implementar flujos de pago para mensualidades, pases y keyfobs.",
      "Integrar la API de Stripe para procesamiento de pagos seguro y confiable.",
      "Implementar generacion y escaneo de QR para mejorar la experiencia de pago.",
      "Desarrollar componentes modulares como CardQR, SocioInfo y Payment Summaries.",
      "Refactorizar y mantener endpoints para validacion de keyfobs y mensualidades.",
      "Asegurar una interfaz responsiva y accesible en distintos dispositivos.",
    ],
    achievements: [
      "Integracion exitosa de Stripe con un flujo de pago basado en QR.",
      "Despliegue de una aplicacion de cobro completamente funcional en menos de una semana.",
      "Mayor eficiencia en el cobro de membresias del gimnasio.",
      "Simplificacion en la gestion de keyfobs y menor carga administrativa.",
    ],
    quick_view: {
      summary:
        "App de cobro para socios con pagos de mensualidad, compra de keyfobs, Stripe y flujos guiados con QR.",
      impact_label: "Flujo de pago",
    },
    mediaDescriptions: [
      "Vista principal de la aplicacion AMIFIT Cobro.",
      "Seccion de registro para alta de nuevos miembros.",
      "Pantalla de pago de mensualidad.",
      "Flujo de pago mensual con integracion de Stripe.",
      "Vista secundaria de la plataforma.",
      "Pantalla de confirmacion de pago exitoso de mensualidad.",
    ],
  },
  "AMIFIT App": {
    Project_Overview:
      "Este proyecto entrega un sistema para gestionar membresias y pagos de Anytime Fitness Tuxtla. Centraliza la venta de keyfobs, pagos de mensualidades y manejo de inventario, integrando Stripe para pagos en linea y notificaciones por correo para confirmar compras. El backend esta construido con CodeIgniter 4 y controladores, modelos y rutas organizadas para una operacion segura y mantenible.",
    description:
      "Desarrollo de una aplicacion en CodeIgniter 4 para gestionar operaciones de socios: validacion de llaves, cobro de mensualidades, pagos en espera durante cierres y envio de confirmaciones de compra. La interfaz usa Bootstrap para vistas responsivas y soporta enlaces de pago de Stripe con endpoints de verificacion y cancelacion.",
    role: "Desarrollador Full-stack",
    technologies: {
      Frontend: ["Bootstrap 5"],
      Backend: ["PHP", "CodeIgniter 4", "MySQL"],
      Herramientas: ["Stripe PHP", "PHPMailer", "Postman"],
      "Gestion del Proyecto": ["GitHub"],
    },
    responsibilities: [
      "Implementar el flujo de pago con Stripe: inicio, verificacion y cancelacion de pagos.",
      "Construir MensualidadController para validacion de pagos, compras y notificaciones por correo.",
      "Agregar modelo y logica de PagosStandby para manejar pagos durante cierres del gimnasio.",
      "Crear rutas y controladores para keyfobs con validacion y decremento de inventario.",
      "Estandarizar respuestas JSON, manejo de errores y headers CORS.",
      "Configurar variables de entorno y refactorizar modelos para mejorar claridad y mantenimiento.",
    ],
    achievements: [
      "Integracion de Stripe con conceptos dinamicos de producto y manejo de pagos en standby.",
      "Soporte de inventario para multiples tipos de productos como KeyFob, Towels y Cord.",
      "Confirmaciones automticas por correo usando PHPMailer.",
      "Respuestas API consistentes y mejor experiencia para desarrollo y soporte.",
    ],
    quick_view: {
      summary:
        "Sistema operativo para membresias, cobros, inventario de keyfobs y notificaciones de compra del gimnasio.",
      impact_label: "Operacion gym",
    },
    mediaDescriptions: ["Pantalla principal de inicio de sesion."],
  },
  AEROBALAM: {
    Project_Overview:
      "Este proyecto consistio en desarrollar una plataforma de gestion de vuelos y reservas llamada AEROBALAM. Proporciona un panel administrativo para gestionar usuarios, destinos, cupones y horarios de vuelo. El sistema incluye una vista de calendario, administracion de usuarios por roles y gestion de cupones con activacion y desactivacion.",
    description:
      "Desarrollo de una aplicacion web en CodeIgniter 4 para operaciones de vuelos. La plataforma permite a administradores gestionar destinos, cuentas de usuario, cupones y horarios. Se integro FullCalendar para programacion de vuelos, DataTables para administracion de usuarios y destinos, y SweetAlert para mejorar la retroalimentacion al usuario. Bootstrap se utilizo para garantizar componentes responsivos.",
    role: "Desarrollador Full-stack",
    technologies: {
      Frontend: ["Bootstrap 5", "FullCalendar.js", "DataTables", "SweetAlert2"],
      Backend: ["PHP", "CodeIgniter 4", "MySQL"],
      Herramientas: ["Composer", "PHPMailer"],
      "Gestion del Proyecto": ["GitHub"],
    },
    responsibilities: [
      "Implementar el calendario de vuelos con FullCalendar, incluyendo vistas de horarios y detalle de pasajeros.",
      "Desarrollar el sistema de gestion de usuarios con DataTables y operaciones CRUD.",
      "Construir el modulo de destinos con opciones para crear, editar, activar y desactivar.",
      "Integrar un sistema de cupones con validacion, activacion y desactivacion.",
      "Mejorar la UI del dashboard con Bootstrap y modales interactivos.",
      "Configurar controladores, modelos y rutas para respuestas API limpias.",
    ],
    achievements: [
      "Integracion exitosa del calendario de vuelos con detalles de eventos en tiempo real.",
      "Soporte CRUD completo para usuarios, destinos y cupones.",
      "Mayor eficiencia administrativa gracias a herramientas responsivas dentro del dashboard.",
      "Despliegue de una plataforma funcional para gestion de reservas aereas en una semana.",
    ],
    quick_view: {
      summary:
        "Plataforma de vuelos para gestionar rutas, horarios, cupones y flujo de compra desde una sola interfaz.",
      impact_label: "Flujo de reserva",
    },
    mediaDescriptions: ["Vista principal del dashboard de AEROBALAM.", "Interfaz de compra de boletos."],
  },
  "Lavafy - Professional Car Wash Management Platform": {
    Project_Overview:
      "Lavafy es una aplicacion web escalable y multi-tenant disenada para optimizar servicios profesionales de lavado de autos en Chiapas. Conecta a propietarios de vehiculos y lavadores mediante una interfaz digital que administra citas, pagos y operacion del personal en tiempo real.",
    description:
      "La plataforma esta construida sobre un backend robusto en Laravel 10 con un frontend dinamico en Livewire 3. Incluye un sistema completo de control de acceso por roles para Administradores, Encargados, Lavadores y Clientes. Entre sus puntos tecnicos clave destacan un motor propio de agenda, integracion con MercadoPago, dashboard mobile para operacion de campo y seguimiento del estado en tiempo real.",
    role: "Desarrollador Full-stack",
    technologies: {
      Frontend: ["Laravel Blade", "Livewire 3", "TailwindCSS 3", "Flowbite", "Alpine.js"],
      Backend: ["Laravel 10", "PHP 8.1", "MySQL", "MercadoPago SDK", "Laravel Sanctum"],
      Herramientas: ["Vite", "Composer", "Git", "Puppeteer", "PestPHP"],
      "Gestion del Proyecto": ["Metodologia Agile", "GitHub Issues"],
    },
    responsibilities: [
      "Arquitectar y desarrollar la solucion full-stack con Laravel y Livewire, asegurando alto rendimiento y optimizacion SEO.",
      "Implementar un sistema RBAC complejo para gestionar de forma segura los flujos de administradores, encargados y lavadores.",
      "Integrar la API de MercadoPago para procesamiento de pagos en tiempo real y manejo de webhooks.",
      "Disenar y construir un dashboard mobile para lavadores que facilitara la operacion en campo y la gestion de tareas.",
      "Desarrollar un algoritmo de agenda para administrar disponibilidad, dias de descanso y duracion de servicios.",
    ],
    achievements: [
      "Lanzamiento exitoso de una plataforma lista para produccion con multiples roles y permisos diferenciados.",
      "Reduccion del tiempo de reserva en 40% gracias a una UI intuitiva y una logica backend optimizada.",
      "95% de cobertura en rutas criticas de pagos y agenda mediante PestPHP.",
      "Implementacion de un esquema de base de datos escalable capaz de soportar reservas concurrentes de alto volumen.",
    ],
    quick_view: {
      summary:
        "Plataforma multirol para reservas de lavado, operacion del personal, agenda y cobros integrados en tiempo real.",
      impact_label: "Reservas + pagos",
    },
    mediaDescriptions: [
      "Dashboard administrativo con una vista general de metricas clave y actividad reciente.",
      "Modulo de reportes administrativos con herramientas de analitica para el negocio.",
      "Pantalla de configuracion general del sistema y preferencias globales.",
      "Vista principal del cliente con landing responsiva y seleccion de servicios.",
      "Interfaz para que clientes administren sus vehiculos registrados.",
      "Pantalla de inicio de sesion optimizada para mobile.",
      "Dashboard para encargados con supervision de la operacion diaria.",
      "Panel para lavadores con gestion de tareas optimizada para campo.",
    ],
  },
  "TuxVentas Marketplace Platform (web-tuxventa-v1)": {
    Project_Overview:
      "TuxVentas es una aplicacion web de marketplace basada en roles, construida para gestionar publicaciones clasificadas de productos, servicios y medicamentos. La plataforma combina un catalogo publico con espacios de trabajo para vendedores y compradores, permitiendo navegar categorias, publicar anuncios, manejar galerias, compartir listados por QR, hacer preguntas publicas, conversar en privado, revelar contacto por aceptacion mutua, dejar reseñas, moderar alertas y automatizar reglas de ciclo de vida.",
    description:
      "Desarrollo de una plataforma marketplace en Laravel 10 con catalogo publico, panel para vendedores, flujos de conversacion para compradores y herramientas de moderacion para administradores. El sistema permite publicar anuncios, gestionar galerias y codigos QR, responder preguntas publicas, negociar en privado, revelar datos de contacto tras aceptacion mutua, cerrar tratos, enviar reseñas y monitorear alertas desde un panel operativo.",
    role: "Desarrollador Full-stack",
    technologies: {
      Frontend: ["Laravel Blade", "Livewire 3", "Tailwind CSS", "Flowbite", "JavaScript", "Vite"],
      Backend: ["PHP 8.1", "Laravel 10", "Laravel Sanctum"],
      "Base de Datos": ["MySQL"],
      APIs: ["RESTful APIs", "OpenAPI / Swagger"],
      Herramientas: ["Composer", "Git", "animejs", "qrcode"],
      "Gestion del Proyecto": ["Bitbucket"],
    },
    responsibilities: [
      "Construir el catalogo publico con busqueda por titulo, categoria y subcategoria, ademas de paginas de detalle con preguntas y respuestas publicas.",
      "Desarrollar el espacio de vendedores para crear anuncios, gestionar estados, subir hasta cinco imagenes, regenerar codigos QR y responder preguntas publicas.",
      "Implementar los flujos de conversacion entre compradores y vendedores con hilos reutilizables, mensajeria estilo tiempo real, aceptacion mutua, revelado de contacto, cierres y ventanas de retencion.",
      "Crear el flujo de reseñas y reputacion con contextos SELLER, BUYER y SERVICE, incluyendo generacion automatica de alertas por calificaciones bajas.",
      "Desarrollar modulos administrativos para metricas generales, alertas, cambios de estado de anuncios, bloqueo o desbloqueo de usuarios e inspeccion de conversaciones.",
      "Modelar catalogos normalizados de categorias y subcategorias para productos, servicios y medicamentos, exponiendo endpoints publicos y protegidos con autenticacion Sanctum.",
      "Implementar reglas programadas para expirar anuncios automaticamente y archivar conversaciones cerradas tras el periodo de retencion configurado.",
    ],
    achievements: [
      "Entrega de un marketplace multirol que unifico exploracion publica, operacion del vendedor, comunicacion con compradores y moderacion administrativa en una sola aplicacion Laravel.",
      "Implementacion de un flujo de negociacion con privacidad, revelando datos de contacto solo cuando ambas partes aceptan el trato.",
      "Inclusion de moderacion automatizada de reseñas al convertir calificaciones bajas en alertas accionables para administracion.",
      "Reduccion del mantenimiento manual mediante expiracion y retencion automatizadas impulsadas por scheduler.",
      "Soporte para multiples dominios comerciales a traves de catalogos normalizados y capas reutilizables de presentacion API.",
    ],
    mediaDescriptions: [
      "Catalogo publico del marketplace con busqueda y filtros por titulo, categoria y subcategoria. Ruta: /marketplace. Vista: resources/views/pages/marketplace/index.blade.php",
      "Pagina de detalle del anuncio con galeria, precio, datos del vendedor, preguntas publicas y CTA para iniciar conversacion. Ruta: /marketplace/listings/{listingId}. Vista: resources/views/pages/marketplace/show.blade.php",
      "Dashboard del vendedor para gestionar anuncios, estados, estadisticas, modal de creacion, vista previa de galeria y acciones QR. Ruta: /marketplace/me/listings. Vista: resources/views/pages/marketplace/me-listings.blade.php",
      "Workspace de conversaciones para un anuncio con filtros, lista de mensajes, flujo de aceptacion de trato y acciones de cierre. Ruta: /marketplace/me/conversations?listing_id={listingId}. Vista: resources/views/pages/marketplace/me-conversations.blade.php",
      "Pantalla de historial de conversaciones del comprador generadas desde anuncios del marketplace. Ruta: /marketplace/me/buyer-conversations. Vista: resources/views/pages/marketplace/my-buyer-conversations.blade.php",
      "Dashboard administrativo de resumen con metricas de usuarios, anuncios activos y alertas pendientes. Ruta: /dashboard?panel=overview. Vista: resources/views/pages/admin.blade.php",
      "Centro de moderacion de alertas con cola, filtros, asignacion e inspeccion del contexto de reseñas. Ruta: /dashboard?panel=alerts. Vistas: resources/views/pages/admin.blade.php y resources/views/livewire/admin/alerts-manager.blade.php",
      "Panel de operaciones de ciclo de vida para expiracion automatica de anuncios y reglas de retencion de conversaciones. Ruta: /dashboard?panel=lifecycle. Vistas: resources/views/pages/admin.blade.php y resources/views/livewire/admin/lifecycle-manager.blade.php",
    ],
  },
};

export const experienceContent: Record<Language, ProjectData[]> = {
  en: buildProjects(experienceProjects, {}, "experience"),
  es: buildProjects(experienceProjects, spanishTranslations, "experience"),
};
