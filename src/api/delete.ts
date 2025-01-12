


import { baseUrl } from "./endpoints";

export default async function deleteRecipe(value: (string | null))
{
  try 
  {

    if (confirm("Are you sure you want to delete this recipe?"))
    {

      await fetch(baseUrl + `/display?name=${value}`,
      {

        method: "DELETE",

      })

      alert(`recipe for ${value} was successfully deleted`)

    }

    else 
    {
      return;
    }
    
  } 
  catch (error) 
  {
   console.error(error);
  }
}
