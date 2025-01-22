


import { baseUrl } from "./endpoints";

export default async function deleteRecipe(value: (string | null))
{
  try 
  {

    if (confirm("Are you sure you want to delete this recipe?"))
    {

      const token = sessionStorage.getItem('jwtToken');

      const response = await fetch(baseUrl + `/display?name=${value}`,
      {

        method: "DELETE",
        headers: 
        {

          "Content-Type" : "application/json",
          'Authorization': `Bearer ${token}`, //set JWT authorization in header
        },

      })

      if (response.status === 403)
      {
        alert("You do not have persmission to delete recipes")
        throw new Error("You do not have persmission to delete recipes") 
      }
      else if (!response.ok)
      {
        alert("failed to delete resource");
        throw new Error("failed to delete resource");
      }

      else
      {
        //do nothing
      }

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
