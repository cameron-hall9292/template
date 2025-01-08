

//const baseUrl = `http://localhost:3000`;

export default async function deleteRecipe(value: (string | null), baseUrl: string) 
{
  try 
  {
    await fetch(baseUrl + `/display?name=${value}`,
    {

      method: "DELETE",

    })

    //reset everything
    //resetAfterFetch();
  

    alert(`recipe for ${value} was successfully deleted`)
  } 
  catch (error) 
  {
   console.error(error);
  }
}
