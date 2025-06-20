import { useQuery, gql } from '@apollo/client';
import './App.css';

const GET_CHARACTERS_RICK_AND_MORTY = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS_RICK_AND_MORTY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <p>React + GraphQL</p>
      <p>Consumiendo datos de Rick and Morty</p>

      <ul>
        {data.characters.results.map((character) => (
          <li key={character.id}>
            <p>{character.name}</p>
            <img src={character.image} alt={character.name} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
