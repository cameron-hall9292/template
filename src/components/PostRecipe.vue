
<script setup lang="ts">

import { reactive, inject, onMounted, ref, computed } from 'vue';

import { type mode } from '../interfaces/interface';

import { type Recipe } from '../interfaces/interface';

import postData from '../api/post';

import FormButtons from '../components/FormButtons.vue'

import FormInput from '../components/FormInput.vue'

import { appModes } from '../interfaces/appModes';

import fetchUserPermissions from '../api/permissions';



const appMode = inject<mode>("appMode");

let recipeLookup = inject<recipeLookup>("selectRecipe");


//reset recipeData values to null
//set default type as main dish 
//so that select tag can have a 
//default value

recipeLookup.recipeData.name = null;
recipeLookup.recipeData.ingredients = null;
recipeLookup.recipeData.instructions = null;
recipeLookup.recipeData.type = "main dish";



const postAndGoHome = (): void =>
{
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

  }
  if (!fieldBlank)
  {
    postData(recipeLookup.recipeData);

    //return to home screen
    appMode.change(appModes.find);
  };

}

//check if user is logged in and get their user permissions e.g read, write, etc.

let userPermissions = reactive(
  {
    permArr: []
  }
) 

let permissionToPost = ref<boolean>(false);

const getPermissions = async () => 
{

  if (sessionStorage.getItem('jwtToken'))
  {
   fetchUserPermissions()
   .then(data => userPermissions.permArr = data.data)
   .then(() => permissionToPost.value = userPermissions.permArr.includes("canAdd"))
  }
}


onMounted(() =>
{
  getPermissions()
});






</script>


<template>

  <div id="component-container-post">

    
    <h1>Add New Recipe</h1>

      <FormInput :name="!permissionToPost" :ingredients="!permissionToPost" :instructions="!permissionToPost" :type="!permissionToPost"/>

      <div id="buttonWrapper">
        <FormButtons @click="postAndGoHome" name="submit recipe" :disabled="!permissionToPost"></FormButtons>
        <FormButtons @click="appMode?.change(appModes.find)" name="cancel" ></FormButtons>
      </div>

  </div>

</template>

<style scoped>

#component-container-post
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
    margin: 2px;
}
.longForm
 {
  display: flex;
  /* border: 3px solid black; */
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
  #component-container-post
  {
    width: 50%;
  }
}
</style>
