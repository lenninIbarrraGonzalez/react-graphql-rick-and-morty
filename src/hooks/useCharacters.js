import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

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

export const useCharacters = () => {
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

  return {
    loading,
    error,
    data,
    currentPage,
    handleNextPage,
    handlePrevPage,
    goToPage,
  };
};
