

import { baseUrl } from "./endpoints";


export async function fetchByType(type: (string | null) )
{
  try 

  {
    if (type === null)
    {
      throw new Error(`argument ${type} cannot be null`)
    }
    else
    {
      //this function encodes the arguments so it will always be 
      //valid as a query string value
      // type = encodeURIComponent(type);
      // console.log(`type: ${type}`)
    }
    const token = sessionStorage.getItem('jwtToken');
    // console.log("token " + token);
    const res = await fetch(`${baseUrl}/recipesByType?type=${type}`,
      {
        method: 'GET',
        headers: {

          'Content-Type' : 'application/json',
        }
      }
    )
  
    if (!res.ok)
    {
      throw new Error("response is not okay")
    }
    const response = await res.json();

    
    const filteredData: string[] = [];

  
    for (let i of response.rows)
      {
        filteredData.push(i.name);
        //console.log(i.name)
      }

      // console.log(filteredData);

      return filteredData;


  } 
  catch (error) 
  {
    console.error(error);
  }
}



