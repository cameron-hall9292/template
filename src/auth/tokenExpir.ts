

import { jwtDecode } from 'jwt-decode'



export default function tokenExpir(token: string): boolean 
{


    let isExpired: boolean = false;

    if (token)
    {
        const decoded = jwtDecode(token);

        const currentTime = Math.floor(Date.now() / 1000); //current time in seconds

       if (decoded.exp !== undefined && decoded.exp < currentTime)
       {

            isExpired = true;
        
       }
    }

    return isExpired;

}

