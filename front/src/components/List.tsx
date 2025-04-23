import React from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Title } from "../stories/Title";
import { Subtitle } from "../stories/Subtitle";
import { useNavigate } from "react-router";

const List = ({ status }) => {
  const navigate = useNavigate();
  const [enquetes, setEnquetes] = React.useState<DataProps[]>([]);

  interface DataProps {
    id: string;
    title: string;
    startDate: Timestamp;
    endDate: Timestamp;
    options: string[];
  }


  React.useEffect(() => {
    const getData = async () => {
      const querySnap = await getDocs(collection(db, "polls"));
      const data: DataProps[] = querySnap.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          title: docData.title || "",
          startDate: docData.startDate || Timestamp.fromDate(new Date()),
          endDate: docData.endDate || Timestamp.fromDate(new Date()),
          options: docData.options || [],
        };
      });
      setEnquetes(data);
    };
    getData();
  }, []);

  const filteredEnquetes = React.useMemo(() => {
    const now = new Date();
    return enquetes.filter((enquete) => {
      const endDate = enquete.endDate.toDate();
      if (status === "active") {
        return endDate >= now;
      } else if (status === "closed") {
        return endDate < now;
      }
      return true; 
    });
  }, [enquetes, status]);

  console.log(enquetes);

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="px-4 py-8 bg-gray-100 ">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEnquetes.map((enquete) => (
        <li key={enquete.id}>
            <div 
              onClick={() => navigate(`/enquete/${enquete.id}`, { state: { enquete: enquete } })} 
              className="bg-white hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out shadow-lg rounded-md p-6 flex flex-col gap-4 min-h-[80%] max-h-auto"
            >
            <Title size="small" label={enquete.title} />
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex flex-col items-center">
              <p className="font-semibold">Início</p>
              <Subtitle label={formatDate(enquete.startDate)} />
              </div>
              <div className="flex flex-col items-center">
              <p className="font-semibold">Término</p>
              <Subtitle label={formatDate(enquete.endDate)} />
              </div>
            </div>
            </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default List;
