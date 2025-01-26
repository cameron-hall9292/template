
<script setup lang="ts">

import { inject,} from 'vue'

import { type mode,type recipeLookup } from '../interfaces/interface';

import deleteRecipe from '../api/delete';

import FormButtons from '../components/FormButtons.vue'

import FormInput from '../components/FormInput.vue'

const appMode = inject<mode>("appMode");

import { appModes } from '../interfaces/appModes';

let recipeLookup = inject<recipeLookup>("selectRecipe");

//const props = defineProps<Recipe>();


//const recipePut: Recipe = reactive
//(

    //{
        //name: null,
        //ingredients: null,
        //instructions: null,
        //type: null,
    //}
//)

//onMounted(() => {
  //console.log(`the component is now mounted.`)
  //recipePut.name = props.name;
  //recipePut.ingredients = props.ingredients;
  //recipePut.instructions = props.instructions;
  //recipePut.type = props.type;
//})


const deleteAndGoHome = (): void =>
{

  //delete recipe
  deleteRecipe(recipeLookup.recipeData.name);
  
  //return to home screen
  appMode.change(appModes.find);
}


</script>

<template>
  <div id="component-container-delete">

    <h1>Delete Recipe</h1>
    <FormInput :formSwitch="true" />
    <FormButtons v-if="recipeLookup !== undefined" @click="deleteAndGoHome" name="delete recipe"></FormButtons>
    <FormButtons name="cancel" @click="appMode?.change(appModes.find)"></FormButtons>
  </div>
</template>
<style scoped>

#component-container-delete
{
  display: flex;
  border: 3px solid blue;
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
  border: 3px solid black;
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
.buttonWrapper
{
  border: 1px solid black
}
</style>
