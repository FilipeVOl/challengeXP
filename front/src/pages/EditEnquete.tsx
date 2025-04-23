import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getFirestore } from "firebase/firestore";
import { updateDoc, increment } from "firebase/firestore";

const EditEnquete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enquete: rawEnquete } = location.state || {};
  const db = getFirestore();
  const pollRef = rawEnquete ? doc(db, "polls", rawEnquete.id) : null;

  const [selectedOption, setSelectedOption] = React.useState("");

  // Garante que options seja sempre um array de strings
  const enquete = React.useMemo(() => {
    if (!rawEnquete) return null;
    if (Array.isArray(rawEnquete.options)) return rawEnquete;
    return {
      ...rawEnquete,
      options: Object.keys(rawEnquete.options || {}),
    };
  }, [rawEnquete]);

  React.useEffect(() => {
    if (!enquete) {
      navigate(-1);
    }
  }, [enquete, navigate]);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!selectedOption) return alert("Selecione uma opção para votar!");

    try {
      await updateDoc(pollRef, {
        [`options.${selectedOption}`]: increment(1),
      });
      alert("Voto registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar voto:", error);
      alert("Erro ao registrar voto.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-[90%] max-w-md p-8 rounded-lg shadow-md">
        {enquete && (
          <>
            <h1 className="text-2xl font-bold text-text2 mb-2">
              {enquete.title}
            </h1>
            <h2 className="text-base text-gray-600 mb-6">
              Escolha uma resposta
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleVote}>
              {enquete.options &&
                enquete.options.map((option, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="accent-primary"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="submit"
                  className="bg-primary text-white p-3 rounded-md hover:bg-primary2 hover:scale-105 hover:cursor-pointer transition duration-200"
                >
                  Votar
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/resultados/${enquete.id}`)}
                  className="bg-neutral text-white p-3 rounded-md hover:bg-primary2 hover:scale-105 hover:cursor-pointer transition duration-200"
                >
                  Resultados
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditEnquete;