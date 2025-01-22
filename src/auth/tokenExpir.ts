

import { jwtDecode } from 'jwt-decode'



export default function tokenExpir(token: string) 
{

    try
    {
        
        if (token)
        {
            const decoded = jwtDecode(token);

            const currentTime = Math.floor(Date.now() / 1000); //current time in seconds

            if (decoded.exp)
            {
                return decoded.exp < currentTime; //check expiration
            }
        }
    }
    catch(error)
    {
        console.error("invalid token", error)

        return true;
    }

}

