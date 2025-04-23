import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquete, setEnquete] = React.useState(null);
  const [votes, setVotes] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "polls", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const votesArr = Object.entries(data.options || {}).map(([label, count]) => ({
          label,
          count: count || 0,
        }));
        setEnquete(data);
        setVotes(votesArr);
      }
    };
    fetchData();
  }, [id]);


  const totalVotes = votes.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-[90%] max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">{enquete?.title}</h1>
        <div className="flex flex-col gap-3">
          {votes.map((option, idx) => {
            const percent = totalVotes
              ? Math.round((option.count / totalVotes) * 100)
              : 0;
            return (
              <div key={idx} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-sm">{option.count} votos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-5">
                  <div
                    className="bg-primary h-5 rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="mt-6 bg-neutral text-white px-4 py-2 rounded hover:bg-primary2 transition"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Results;