import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import RecipeCard from "./RecipeCard.jsx";


const Recetas = () => {
  
  const urlApi = "https://ominous-space-guacamole-7rv75rxqqq6cx4jw-5001.app.github.dev/usuarios/santigeek/recetas";
  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ recetas, setRecetas ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const [ campos, setCampos ] = useState(['name', 'descripcion', 'time', 'difficulty', 'image']);
  const [ newReceta, setNewReceta ] = useState({});

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

  const crearReceta = async (receta) => {

    try{
      let response = await  fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(receta)
      })
      //  let data = await response.json();

      if(response.ok){
        await fetchRecetas();
        setNewReceta({});
        setIsOpen(false);
      }

    }catch(error){
      console.error('Error:', error);
    }

  };

  useEffect(() => {
    fetchRecetas();
  }, []);

  return (
    <>
      <div className="text-black" style={{ minHeight: `calc(100vh - 12rem)` }}>
        <h2 className="text-4xl font-bold mx-8 my-2">Mis Recetas</h2>
        <div className="flex flex-wrap mx-4">

          {/* Recipe Cards */}

          {isLoading && <p>Loading...</p>}
          {recetas && recetas.map((receta) => (<RecipeCard key={receta.id} receta={{ ...receta, onDelete: async () => await fetchRecetas() }} />))}

        </div>
      </div>

      <button className="sticky w-full bottom-0" onClick={() => setIsOpen(true)}>
        <div className="w-12 h-12 bg-green-600 m-8 ml-auto rounded-full flex items-center justify-center">
          <i className="fa-solid fa-plus"></i>
        </div>
      </button>
      <Modal isOpen={isOpen} title={"Nueva Receta"} onClose={() => setIsOpen(false)} onConfirm={() => crearReceta(newReceta)}>
        {
          campos.map((campo) => (<div key={'form-'+campo} className="flex flex-row">
            <label className="w-1/2">{campo}</label>
            <input className="w-1/2" type="text" placeholder={campo}
              value={newReceta[campo] || ''} 
              onChange={(event) => setNewReceta({ ...newReceta, [campo]: event.target.value })} 
            />
          </div>
          ))
        }
      </Modal>
    </>
  );
};

export default Recetas;
