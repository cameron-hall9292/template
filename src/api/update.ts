

import { type Recipe } from "../interfaces/interface";


import { baseUrl } from "./endpoints";


export default async function updateRecipe(value: Recipe) 
{
  try 
  {


    const token = sessionStorage.getItem('jwtToken');
   const response = await fetch(baseUrl + `/display`,
    {

      method: "PUT",
      headers: 
      {

        "Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`, //set JWT authorization in header
      },


      body: JSON.stringify(value),

    })

    if (response.status === 403)
    {
      alert("You do not have persmission to edit recipes")
      throw new Error("You do not have persmission to edit recipes") 
    }
    else if (!response.ok)
    {
      alert("failed to edit resource");
      throw new Error("failed to edit resource");
    }

    else
    {
      //do nothing
    }
    
  } 
  catch (error) 
  {
   console.error(error);
  }
}

