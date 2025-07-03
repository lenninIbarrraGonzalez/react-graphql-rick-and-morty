# Rick and Morty React + GraphQL

Este proyecto es una SPA construida con **React** y **Vite** que consume la API GraphQL de Rick and Morty. Permite explorar personajes, ver detalles en un modal y navegar entre páginas con un diseño moderno y responsivo.

[ver sitio en netlify](https://rick-and-morty-graphql.netlify.app/)

![Texto alternativo](/src/assets/preview.gif)

---

## Arquitectura

- **React 19**: Estructura de componentes funcionales y hooks.
- **Vite**: Bundler rápido para desarrollo y build.
- **Apollo Client**: Manejo de queries GraphQL y caché.
- **GraphQL**: Consulta de datos a la API pública de Rick and Morty.
- **Estilos**: CSS modularizado con Glassmorphism y diseño responsivo.
- **Custom Hooks**: Lógica de paginación y consulta separada en `useCharacters.js`.
- **Modal**: Componente reutilizable para mostrar detalles de personajes.

### Estructura de carpetas

```
src/
  App.jsx           # Componente principal
  App.css           # Estilos principales y responsivos
  index.css         # Estilos globales y glassmorphism
  Modal.jsx         # Componente modal para detalles
  hooks/
    useCharacters.js # Custom hook para paginación y consulta GraphQL
  main.jsx          # Entry point, configuración de ApolloProvider
```

---

## Uso de GraphQL

Se utiliza la API pública de [Rick and Morty GraphQL](https://rickandmortyapi.com/graphql) para obtener personajes paginados.  
La consulta principal está en el custom hook `useCharacters.js`:

```js
const GET_CHARACTERS_RICK_AND_MORTY = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`;
```

- **Apollo Client** maneja el fetch, caché y estado de carga/error.
- La paginación se controla desde el hook y se refleja en la UI.

---

## ¿Cómo correr el proyecto?

1. **Clona el repositorio**

   ```bash
   git clone <url-del-repo>
   cd react-graphql-rick-and-morty
   ```

2. **Instala las dependencias**

   ```bash
   yarn install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   yarn dev
   ```

4. **Abre en tu navegador**
   - Usualmente en [http://localhost:5173](http://localhost:5173)

---

## Notas

- El diseño es responsivo y usa efectos de glassmorphism.
- Al hacer clic en una card, se abre un modal con la información del personaje.
- El scroll y la interacción con el fondo se bloquean cuando el modal está abierto.
- Puedes navegar entre páginas
