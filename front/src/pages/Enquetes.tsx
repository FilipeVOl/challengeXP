import React from "react"
import { Title } from "../stories/Title";
import { Subtitle } from "../stories/Subtitle";
import List from "../components/List";

const Enquetes = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full h-auto">
      
      <div className="flex flex-row items-center justify-between w-full px-10 py-10">
        
        <div className="w-1/3" />

        <div className="w-1/3 flex flex-col items-center text-center">
          <Title font='sans-serif' label='Enquetes' />
          <Subtitle label="Encontre aqui a sua enquete" />
        </div>

        <div className="w-1/3 flex flex-col items-end">
          <label className="font-semibold">Status</label>
          <input className="bg-white rounded-md border-2 border-solid-transparent opacity-50" type="select" />
        </div>

      </div>

      <List />
    </div>
  )
}

export default Enquetes;
