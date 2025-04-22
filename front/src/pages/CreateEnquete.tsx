import React from 'react';
import CreateForm from '../components/CreateForm';

const CreateEnquete = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="flex flex-col items-center gap-4 py-10">
        <h1 className="text-text2 text-5xl font-bold">Criar enquete</h1>
        <p className="text-text2 text-center">
          Preencha os seguintes campos para criar a sua enquete
        </p>
      </div>
      <CreateForm />
    </div>
  );
};

export default CreateEnquete;