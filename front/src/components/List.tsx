import React from "react"
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Title } from "../stories/Title";
import { Subtitle } from "../stories/Subtitle";

const List = () => {
    interface DataProps {
        id: string;
        title: string;
        startDate: Timestamp;
        endDate: Timestamp;
        options: string[];
    }

    const [enquetes, setEnquetes] = React.useState<DataProps[]>([]);

    React.useEffect  (() => {
        const getData = async () => {
            const querySnap = await getDocs(collection(db, "polls"));
            const data: DataProps[] = querySnap.docs.map((doc => {
                const docData = doc.data();
                return { 
                    id: doc.id,
                    title: docData.title || "",
                    startDate: docData.startDate || Timestamp.fromDate(new Date()),  
                    endDate: docData.endDate || Timestamp.fromDate(new Date()),
                    options: docData.options || [],
                }
            }));
            setEnquetes(data);
        }
        getData();
    }, []);

    console.log(enquetes.startDate)

    const formatDate = (timestamp: Timestamp) => {
        const date = timestamp.toDate(); 
        return date.toLocaleDateString("pt-BR");  
      };

    return (
    <div>
        <ul>
        {enquetes.map((enquete) => (
          <li key={enquete.id}>
            <div className="bg-white shadow-lg rounded-md p-8">
            <Title size="small" label={enquete.title} />
            <div className="flex">
  <Subtitle label={formatDate(enquete.startDate)} /> 
  <span className="mx-2">até</span> {/* Adicionando espaçamento aqui */}
  <Subtitle label={formatDate(enquete.endDate)} />
</div>
            </div>
          </li> 
        ))}
        </ul>
    </div>
    )
}

export default List;