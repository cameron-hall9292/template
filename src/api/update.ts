

import { type Recipe } from "../interfaces/interface";


import { baseUrl } from "./endpoints";


export default async function updateRecipe(value: Recipe) 
{
  try 
  {


    await fetch(baseUrl + `/display`,
    {

      method: "PUT",
      headers: 
      {

        "Content-Type" : "application/json",
      },


      body: JSON.stringify(value),

    })

    alert(`recipe for ${value.name} was successfully updated`)
    
  } 
  catch (error) 
  {
   console.error(error);
  }
}

