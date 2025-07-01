export const Modal = ({ selectedCharacter, handleCloseModal }) => {
  if (!selectedCharacter) return null;
  return (
    <div className="modal-backdrop" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleCloseModal} aria-label="Cerrar">
          ×
        </button>
        <img src={selectedCharacter.image} alt={selectedCharacter.name} />
        <h2>{selectedCharacter.name}</h2>
        <p>
          <span className="text-accent">Status:</span>{' '}
          {selectedCharacter.status}
        </p>
        <p>
          <span className="text-accent">Species:</span>{' '}
          {selectedCharacter.species}
        </p>
      </div>
    </div>
  );
};
