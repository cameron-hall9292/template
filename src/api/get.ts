

import { ref } from "vue";
import { type Recipe } from "../interfaces/interface";

import { baseUrl } from "./endpoints";

export async function fetchData(value: (string | null) ) 
{
  try 
  {
    let recipe = ref<Recipe>(
    {
        name: null,
        ingredients: null,
        instructions: null,
        type: null,
    }
    )

    if (value !== null)
    {
      value = encodeURIComponent(value);
    }

    const res = await fetch(`${baseUrl}/display?name=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
        },
      }
    )
    
    if (res.status === 404)
    {
      //does not exist in database
      return res.status
    }

    else if (res.status === 200)
    {
      // exists in database
      await res.json()
      .then(data => recipe = data.rows[0])
      return { recipe }

    }

  } 
  catch (error) 
  {
   console.error(error);
  }
}
