import React, { useState } from "react";
import Modal from "./Modal.jsx";

const RecipeCard = ({ receta }) => {

    const deleteUrl = (id) => `https://ominous-space-guacamole-7rv75rxqqq6cx4jw-5001.app.github.dev/recetas/${id}`;
    const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);

    const deleteReceta = async (id) => {
      try {
        let response = await fetch(deleteUrl(id), {
          method: 'DELETE'
        });
        if(response.ok){
          setIsDeleteOpen(false);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return (<>
      <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4" onClick={() => setIsDeleteOpen(true)}>
      <div className="bg-white rounded-lg shadow-lg">
      <div className="h-auto overflow-hidden"></div>
        <img src={receta.image} alt={receta.name} className="rounded-t-lg w-full h-32 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl">{receta.name}</h3>
        <p className="text-gray-600">{receta.descripcion}</p>
      </div>
    </div>
    <Modal isOpen={isDeleteOpen} title={"Eliminar Receta"} onClose={() => setIsDeleteOpen(false)} onConfirm={ async () => {
        await deleteReceta(receta.id)
        await receta.onDelete();
      }}>
      <div className="p-4">
        <h2 className="text-2xl font-bold">Eliminar Receta</h2>
        <p>¿Estás seguro que deseas eliminar la receta <strong>{receta.name}</strong>?</p>
      </div>
    </Modal>
    </>);
  };
  
export default RecipeCard;