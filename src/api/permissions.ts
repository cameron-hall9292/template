


import { baseUrl } from "./endpoints";

export default async function fetchUserPermissions() 
{
  try 
  {

    const token = sessionStorage.getItem('jwtToken');

    const res = await fetch(`${baseUrl}/permissions`,
      {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${token}`, //set JWT authorization in header
        },
      }
    )
  
    
    const response = await res.json();


    return response;
    
   
  } 
  catch (error) 
  {
    console.error(error);
  }
}
