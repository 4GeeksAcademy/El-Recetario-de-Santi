import React from "react";

const RecipeCard = ({ receta }) => {
    return (<div key={receta.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <img src={receta.image} alt={receta.name} className="rounded-t-lg w-full" />
        <div className="p-4">
          <h3 className="font-bold text-xl">{receta.name}</h3>
          <p className="text-gray-600">{receta.descripcion}</p>
        </div>
      </div>
    </div>);
  };
  
export default RecipeCard;