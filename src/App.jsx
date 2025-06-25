import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import './App.css';

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

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS_RICK_AND_MORTY, {
    variables: { page: currentPage },
  });

  const handleNextPage = () => {
    if (data?.characters.info.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.characters.info.prev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return (
      <BeatLoader color="#5eeadd" margin={6} size={18} speedMultiplier={2} />
    );
  if (error) return <p>Error: {error.message}</p>;

  const { info, results } = data.characters;

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = info.pages;
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="container">
      <div className="app">
        <h1>React + GraphQL</h1>
        <p>Personajes de Rick and Morty</p>

        {/* Información de paginación */}
        <div className="pagination-info">
          <p>
            Página {currentPage} de {info.pages} | Total de personajes:{' '}
            {info.count}
          </p>
        </div>

        {/* Lista de personajes */}
        <div className="characters-grid">
          {results.map((character) => (
            <div key={character.id} className="character-card">
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </div>
          ))}
        </div>

        {/* Controles de paginación */}
        <div className="pagination-controls">
          <button
            onClick={handlePrevPage}
            disabled={!info.prev}
            className="pagination-btn"
          >
            ← Anterior
          </button>

          {/* Números de página */}
          <div className="page-numbers">
            {currentPage > 3 && (
              <>
                <button onClick={() => goToPage(1)} className="page-btn">
                  1
                </button>
                {currentPage > 4 && <span>...</span>}
              </>
            )}

            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`page-btn ${
                  pageNum === currentPage ? 'active' : ''
                }`}
              >
                {pageNum}
              </button>
            ))}

            {currentPage < info.pages - 2 && (
              <>
                {currentPage < info.pages - 3 && <span>...</span>}
                <button
                  onClick={() => goToPage(info.pages)}
                  className="page-btn"
                >
                  {info.pages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={!info.next}
            className="pagination-btn"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
