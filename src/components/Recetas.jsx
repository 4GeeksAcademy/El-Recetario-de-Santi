import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import RecipeCard from "./RecipeCard.jsx";


const Recetas = () => {
  
  const urlApi = "https://ominous-space-guacamole-7rv75rxqqq6cx4jw-5001.app.github.dev/usuarios/santigeek/recetas";
  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ recetas, setRecetas ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const fetchRecetas = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(urlApi);
        const data = await response.json();
        setRecetas(data.recetas);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecetas();

  }, []);

  return (
    <>
      <div className="text-black" style={{ minHeight: `calc(100vh - 12rem)` }}>
        <h2 className="text-4xl font-bold mx-8 my-2">Mis Recetas</h2>
        <div className="flex flex-wrap mx-4">

          {/* Recipe Cards */}

          {isLoading && <p>Loading...</p>}
          {recetas && recetas.map((receta) => (<RecipeCard key={receta.id} receta={receta} />))}

        </div>
      </div>

      <button className="sticky w-full bottom-0" onClick={() => setIsOpen(true)}>
        <div className="w-12 h-12 bg-green-600 m-8 ml-auto rounded-full flex items-center justify-center">
          <i className="fa-solid fa-plus"></i>
        </div>
      </button>
      <Modal isOpen={isOpen} title={"Nueva Receta"} onClose={() => setIsOpen(false)} onConfirm={() => console.log("Hola Santi!")}>
        <div>
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" />
        </div>
      </Modal>
    </>
  );
};

export default Recetas;
