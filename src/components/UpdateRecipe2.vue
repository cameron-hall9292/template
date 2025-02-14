
<script setup lang="ts">

import { inject, reactive, onMounted, ref  } from 'vue'

import updateRecipe from '../api/update';

import { type mode, type Recipe, type recipeLookup } from '../interfaces/interface';

import FormButtons from '../components/FormButtons.vue'

import FormInput from '../components/FormInput.vue'

import fetchUserPermissions from '../api/permissions';

import { appModes } from '../interfaces/appModes';

const appMode = inject<mode>("appMode");

let recipeLookup = inject<recipeLookup>("selectRecipe");

//check if user is logged in and get their user permissions e.g read, write, etc.

let userPermissions = reactive(
  {
    permArr: []
  }
) 

let permissionToEdit = ref<boolean>(false);

const getPermissions = async () => 
{

  if (sessionStorage.getItem('jwtToken'))
  {
   fetchUserPermissions()
   .then(data => userPermissions.permArr = data.data)
   .then(() => permissionToEdit.value = userPermissions.permArr.includes("canEdit"))
  }
}

const updateAndSubmit = (): void =>
{

  if (recipeLookup === undefined) return;

  //check if any value is blank and if so
  //alert user that all fields are required

  let fieldBlank: boolean = false;
  
  for (let property in recipeLookup.recipeData)
  {
    if (recipeLookup.recipeData[property] === "" || recipeLookup.recipeData[property] === null || recipeLookup.recipeData === undefined )
    {
      alert("you must complete all fields");
      fieldBlank = true;
      break;

    }
  };
  if (!fieldBlank)
  {
    updateRecipe(recipeLookup.recipeData);

    //switch to read mode
    appMode.change(appModes.read);
  };
}

onMounted(() =>
{
  getPermissions()
});



</script>

<template>

  <div id="component-container-update">

    <h1>Update Recipe</h1>
    <FormInput :name="true" :ingredients="!permissionToEdit" :instructions="!permissionToEdit" :type="!permissionToEdit"/>
    <div id="buttonWrapper">
      <FormButtons  v-if="recipeLookup !== undefined" @click="updateAndSubmit" name="submit update" :disabled="!permissionToEdit" ></FormButtons>
      <FormButtons @click="appMode?.change(appModes.read)" name="cancel" ></FormButtons>
    </div>
  </div>
</template>
<style scoped>

#component-container-update
{
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 3px solid blue; */
  flex-direction: column;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  margin-bottom: 2em;
  max-width: 100%;
  width: 100%;
  height: 100%;
}

h1 
{
  text-align: center;
}
#formWrapper
{
  display: flex;
  border: 3px solid lightcoral;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;
}
.button
{
    color: white; 
    margin: 5px;
}
.longForm
 {
  display: flex;
  border: 3px solid black;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 8em;
}
.longForm:focus
 {
  background-color: #007BFF;
  color: yellow; 
  font-size: large;
  
 }
#buttonWrapper
{
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@media(min-width: 800px)
{
  #buttonWrapper
  {
    flex-direction: row;
  }
  #component-container-update
  {
    width: 50%;
  }
}
</style>
