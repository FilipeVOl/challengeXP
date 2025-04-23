import React from 'react';
import CreateForm from '../components/CreateForm';
import { Title } from '../stories/Title';
import { Subtitle } from '../stories/Subtitle'

const CreateEnquete = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="flex flex-col items-center gap-4 py-10">
        <div className='flex flex-col justify-center items-center text-center'>
        <Title font='sans-serif' label='Criar enquete' />
        <Subtitle label="Preencha os seguintes campos para criar a sua enquete" />
        </div>
      </div>
      <CreateForm />
    </div>
  );
};

export default CreateEnquete;