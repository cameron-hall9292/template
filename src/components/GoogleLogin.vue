
<script setup lang="ts">

import { onMounted, inject } from "vue"

import { baseUrl } from "../api/endpoints";

import { decodeCredential  } from "vue3-google-login"

import { appModes } from '../interfaces/appModes';

import type { CallbackTypes } from "vue3-google-login";

const appMode = inject<mode>("appMode");

const endpoint = `${baseUrl}/google-login/verify-google-token`

const validateToken = async (route, cred) =>
{
  //send JWT credential to the server side for validation
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

    //go to home screen
    
    appMode.mode = appModes.find;
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

  validateToken(endpoint, credential)

}

</script>


<template>
  <div id="login-container">
    <h1>login</h1>
    <GoogleLogin :callback="callback" prompt auto-login/>
  </div>
</template>





<style scoped>

#login-container
{

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  padding: 1em;
}
</style>