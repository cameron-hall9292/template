
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


    const response = await fetch(baseUrl + `/display`, 

    {
      method: "POST",
      headers: 
      {

        "Content-Type" : "application/json",
      },

      body: JSON.stringify(value),

    });

    if (!response.ok)
    {
        throw new Error("network response is not ok")
    }


    alert(`recipe for ${value.name} added successfully`)


   }
   catch(error)
   {

    alert("the following error has been thrown: " + error)
    console.error(error);
    throw error;
   }
   
} 