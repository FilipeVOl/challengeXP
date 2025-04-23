import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import PlusCircle from "../components/PlusCircle";
import Delete from "../components/Delete";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

type Inputs = {
  title: string;
  options: { value: string }[];
  startDate: string;
  endDate: string;
};

const CreateForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      options: [{ value: "" }, { value: "" }, { value: "" }],
    },
  });
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const oneFilled = data.options.some((option) => option.value.trim() !== "");

    if (!oneFilled) {
      setError("options", {
        type: "manual",
        message: "Pelo menos uma opção deve ser preenchida.",
      });
      return;
    }

    try {
      await addDoc(collection(db, "polls"), {
        title: data.title,
        options: data.options.map((option) => option.value),
        startDate: Timestamp.fromDate(new Date(data.startDate)),
        endDate: Timestamp.fromDate(new Date(data.endDate)),
        createdAt: Timestamp.now(),
      });
      alert("Enquete criada com sucesso!");
    } catch (error) {
      alert(`Erro ao salvar enquete: ${error}`, );
    }
  };

  const addOption = () => {
    append({ value: "" });
  };

  const deleteOption = (index: number) => {
    console.log(index)
    remove(index)    
    console.log("Campos depois da remoção:", fields);

  }

  return (
    <div className="bg-white w-[90%] h-[70%] p-8">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-base font-semibold text-text2">Título</label>
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">O título é obrigatório.</p>
          )}
          <input
            {...register("title", { required: true })}
            placeholder="Digite aqui sua pergunta"
            className="border border-gray-300 rounded-md p-2 w-full mt-1 outline-primary2"
          />
        </div>

        <div>
          <label className="text-base font-semibold text-text2">
            Opções de resposta
          </label>
            <div className="flex flex-col gap-2 mt-1">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
              {index === 0 && errors.options && (
                <p className="text-sm text-red-500 mt-2">
                {errors.options.message}
                </p>
              )}
              <input
                {...register(`options.${index}.value`, {
                required:
                  index === 0 ? "A primeira opção é obrigatória." : false,
                })}
                placeholder={`Opção ${index + 1}`}
                className="border border-gray-300 rounded-md p-2 w-full outline-primary2"
              />
              {index !== 0 ? <Delete className="h-4 cursor-pointer w-4" onClick={() => deleteOption(Number(field.id))} /> : null}
              </div>
            ))}
            </div>

            <button
            type="button"
            onClick={addOption}
            className="bg-primary text-white text-sm px-4 py-2 rounded-md flex items-center gap-2 mt-2 hover:bg-primary2 hover:scale-105 active:bg-primary2 transition-transform duration-200"
            >
            <PlusCircle className="w-4 h-4" />
            Adicionar opção
            </button>
        </div>

        <div>
          <label className="text-base font-semibold text-text2">
            Data de início
          </label>
          {errors.startDate && (
            <p className="text-sm text-red-500 mt-1">
              A data de início é obrigatória.
            </p>
          )}
          <input
            type="date"
            {...register("startDate", { required: true })}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 outline-primary2"
          />
        </div>

        <div>
          <label className="text-base font-semibold text-text2">
            Data de término
          </label>
          {errors.endDate && (
            <p className="text-sm text-red-500 mt-1">
              A data de fim é obrigatória.
            </p>
          )}
          <input
            type="date"
            {...register("endDate", { required: true })}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 outline-primary2"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md mt-4 font-medium hover:scale-105 hover:bg-primary2 hover:cursor-pointer"
        >
          Criar enquete
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
