

import { reactive, ref } from "vue";
import { type Recipe } from "../interfaces/interface";



//export let recipe: Recipe = reactive(
  //{
    //name: null,
    //ingredients: null,
    //instructions: null,
    //type: null,
  //}
//)

export async function fetchData(value: (string | null),  baseUrl: string, callback: Function) 
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
    const res = await fetch(
      `${baseUrl}/display?name=${value}`
    )
  
    await res.json()

    .then(data => recipe = data.rows[0])

    //reset after data fetch

    callback();

    console.log(recipe)

    return { recipe }


    //resetAfterFetch();
  } 
  catch (error) 
  {
   //recipe.name = null;
   //recipe.ingredients = null;
   //recipe.instructions = null;
   console.error(error);
  }
}
