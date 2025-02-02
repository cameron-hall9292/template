
<script setup lang="ts">

import { inject, reactive, ref, onMounted} from 'vue'

import { type mode,type recipeLookup } from '../interfaces/interface';

import deleteRecipe from '../api/delete';

import FormButtons from '../components/FormButtons.vue'

import FormInput from '../components/FormInput.vue'

const appMode = inject<mode>("appMode");

import { appModes } from '../interfaces/appModes';

import fetchUserPermissions from '../api/permissions';

let recipeLookup = inject<recipeLookup>("selectRecipe");


const deleteAndGoHome = (): void =>
{

  //delete recipe
  deleteRecipe(recipeLookup.recipeData.name);
  
  //return to home screen
  appMode.change(appModes.find);
}



//check if user is logged in and get their user permissions e.g read, write, etc.

let userPermissions = reactive(
  {
    permArr: []
  }
) 

let permissionToDelete = ref<boolean>(false);

const getPermissions = async () => 
{

  if (sessionStorage.getItem('jwtToken'))
  {
   fetchUserPermissions()
   .then(data => userPermissions.permArr = data.data)
   .then(() => permissionToDelete.value = userPermissions.permArr.includes("canDelete"))
  }
}

onMounted(() =>
{
  getPermissions()
});



</script>

<template>
  <div id="component-container-delete">

    <h1>Delete Recipe</h1>
    <FormInput :name="true" :ingredients="true" :instructions="true" :type="true" />
    <div id="buttonWrapper">
      <FormButtons v-if="recipeLookup !== undefined" @click="deleteAndGoHome" name="delete recipe" :disabled="!permissionToDelete"></FormButtons>
      <FormButtons name="cancel" @click="appMode?.change(appModes.find)"></FormButtons>
    </div>
  </div>
</template>
<style scoped>

#component-container-delete
{
  display: flex;
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
  /* border: 3px solid black; */
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
}

@media(min-width: 800px)
{
  #buttonWrapper
  {
    flex-direction: row;
    justify-content: center;
    align-items: center;

  }
  #component-container-delete
  {
    width: 50%;
  }
}
</style>
