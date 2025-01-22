
<script setup lang="ts">

import { onMounted } from "vue"
import { baseUrl } from "../api/endpoints";
import { decodeCredential  } from "vue3-google-login"

import type { CallbackTypes } from "vue3-google-login";

const endpoint = `${baseUrl}/google-login/verify-google-token`

const validateToken = async (route, cred) =>
{
  let test = { key: "test value"}
  //send JWT credential to the client side for validation
   const response = await fetch(endpoint,
  {
    method: "POST",
    headers: 
    {
      'Content-Type': 'application/json' ,
    },
    body: JSON.stringify({ cred }),
  });

  if (response.ok)
  {
    const { authToken } = await response.json();
    sessionStorage.setItem("jwtToken", authToken);
    console.log("authToken " + authToken)
    console.log("sessionStorage");
    console.log(sessionStorage)
  }
  else
  {
    throw new Error('Authentication failed');
  }


}

const callback: CallbackTypes.CredentialCallback =  (response) => {
  // decodeCredential will retrive the JWT payload from the credential
  
  let credential =  response.credential;
  // console.log("Credential JWT string", response.credential);
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData)

  validateToken(endpoint, credential)

}

</script>


<template>
  <GoogleLogin :callback="callback" prompt auto-login/>
</template>





