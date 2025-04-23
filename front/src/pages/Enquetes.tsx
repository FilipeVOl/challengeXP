import React from "react";
import { Title } from "../stories/Title";
import { Subtitle } from "../stories/Subtitle";
import List from "../components/List";

const Enquetes = () => {
  const [status, setStatus ] = React.useState("all");
  return (
    <div className="flex flex-col items-center bg-gray-100 w-full h-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center w-full px-10 py-10">
        <div className="hidden md:block" />
        
        <div className="flex flex-col items-center justify-center">
          <Title font="sans-serif" label="Enquetes" />
          <Subtitle label="Encontre aqui a sua enquete" />
        </div>

        <div className="flex justify-end items-center gap-2 mt-4 md:mt-0">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm text-gray-700
                       focus:outline-primary focus:ring-1 focus:ring-primary"
          >
            <option value="all">Todas</option>
            <option value="active">Ativas</option>
            <option value="closed">Encerradas</option>
          </select>
        </div>
      </div>

      <List status={status} />
    </div>
  );
};

export default Enquetes;
