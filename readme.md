# upTaskGraphQL (Backend)

Aplicación de gestión de tareas construida con GraphQL, React y tecnologías modernas.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [API GraphQL](#api-graphql)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## 📝 Descripción

upTaskGraphQL es una aplicación web completa para la administración de tareas. Utiliza GraphQL como API backend y React para la interfaz de usuario, proporcionando una experiencia moderna y eficiente.

## ✨ Características

- ✅ Crear, leer, actualizar y eliminar tareas
- ✅ Autenticación de usuarios
- ✅ API GraphQL escalable
- ✅ Interfaz de usuario responsive
- ✅ Gestión de estado con React
- ✅ Validación de datos
- ✅ Base de datos integrada

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados:

- **Node.js** (v14.0.0 o superior)
- **npm** o **yarn**
- **Git**
- **MongoDB** o base de datos compatible (si aplica)

## 📦 Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/SirTorresDev/upTaskGraphQL.git
cd upTaskGraphQL
```

2. **Instala las dependencias:**

```bash
npm install
# o
yarn install
```

3. **Configura las variables de entorno:**

```bash
cp .env.example .env.local
```

## ⚙️ Configuración

Edita el archivo `.env.local` con tus valores:

```
REACT_APP_API_URL=http://localhost:4000/graphql
REACT_APP_API_KEY=tu_clave_api
NODE_ENV=development
```

## 🚀 Uso

### Desarrollo

Inicia el servidor de desarrollo:

```bash
npm start
# o
yarn start
```

La aplicación se abrirá en `http://localhost:3000`

### Construcción para Producción

```bash
npm run build
# o
yarn build
```

### Testing

```bash
npm test
# o
yarn test
```

## 📂 Estructura del Proyecto

```
upTaskGraphQL/
├── public/              # Archivos públicos
├── src/
│   ├── components/      # Componentes React
│   ├── pages/          # Páginas principales
│   ├── hooks/          # Custom hooks
│   ├── queries/        # Consultas GraphQL
│   ├── mutations/      # Mutaciones GraphQL
│   ├── styles/         # Estilos CSS
│   ├── utils/          # Funciones utilitarias
│   └── App.js          # Componente principal
├── .env.example        # Variables de entorno (ejemplo)
├── .gitignore          # Archivos ignorados por git
├── package.json        # Dependencias del proyecto
└── README.md           # Este archivo
```

## 🛠️ Tecnologías

### Frontend

- **React** - Biblioteca UI
- **Apollo Client** - Cliente GraphQL
- **React Router** - Enrutamiento
- **Styled Components/CSS** - Estilos

### Backend

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **GraphQL** - Lenguaje de query
- **Apollo Server** - Servidor GraphQL

### Base de Datos

- **MongoDB** - Base de datos NoSQL

### Herramientas

- **npm/yarn** - Gestor de paquetes
- **Webpack** - Bundler
- **Git** - Control de versiones

## 🔌 API GraphQL

### Ejemplos de Queries

**Obtener todas las tareas:**

```graphql
query {
  getTasks {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

### Ejemplos de Mutations

**Crear una nueva tarea:**

```graphql
mutation {
  createTask(input: {
    title: "Mi tarea"
    description: "Descripción de la tarea"
  }) {
    id
    title
    description
    completed
  }
}
```

**Actualizar una tarea:**

```graphql
mutation {
  updateTask(id: "123", input: {
    title: "Título actualizado"
    completed: true
  }) {
    id
    title
    completed
  }
}
```

**Eliminar una tarea:**

```graphql
mutation {
  deleteTask(id: "123") {
    success
    message
  }
}
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**SirTorresDev**

- GitHub: [@SirTorresDev](https://github.com/SirTorresDev)

## 📞 Soporte

Si tienes preguntas o problemas, por favor abre un issue en el repositorio.

---

**Última actualización:** 2024
