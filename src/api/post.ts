
import { type Recipe } from "../interfaces/interface";

import { baseUrl } from "./endpoints";

export default async function postData (value: Recipe) 
{
  try 
  {
    //throw error if value argument is null or is of type object

    if (typeof(value.name) !== "string" || value.name === null)
    {
        throw new Error(`value argument cannot be of type ${value.name} or be equal to ${null} `)
    }

    const token = sessionStorage.getItem('jwtToken');

    const response = await fetch(baseUrl + `/display`, 

    {
      method: "POST",
      headers: 
      {

        "Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`, //set JWT authorization in header
      },

      body: JSON.stringify(value),

    });

      if (response.status === 403)
      {
        alert("You do not have persmission to add recipes")
        throw new Error("You do not have persmission to add recipes") 
      }
      else if (!response.ok)
      {
        alert("failed to add resource");
        throw new Error("failed to add resource");
      }

      else
      {
        //do nothing
      }


   }
   catch(error)
   {

    console.error(error);
   }
   
} 
