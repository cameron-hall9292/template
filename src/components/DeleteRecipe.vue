
<script setup lang="ts">

import { inject,} from 'vue'

import { type mode,type recipeLookup } from '../interfaces/interface';

import deleteRecipe from '../api/delete';

const appMode = inject<mode>("appMode");

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


</script>

<template>
  <div id="templateWrapper">
    <div id="formWrapper">
    <input disabled id="formName" class="longForm" v-if="recipeLookup !== undefined" v-model=" recipeLookup.recipeData.name" placeholder="enter recipe name">
    <textarea disabled id="formIngredients" class="longForm"  v-if="recipeLookup !== undefined" v-model="recipeLookup.recipeData.ingredients" placeholder="enter ingredients" ></textarea>
    <textarea disabled id="formInstructions" class="longForm" v-if="recipeLookup !== undefined" v-model="recipeLookup.recipeData.instructions" placeholder="enter instructions"></textarea>
    <select disabled class="longForm" placeholder="select recipe type" v-if="recipeLookup !== undefined" v-model="recipeLookup.recipeData.type"  >
      <optgroup label="recipe types">
        <option value="main dish">main dish</option>
        <option value="side dish">side dish</option>
        <option value="soup/chili">soup/chili</option>
        <option value="dessert">dessert</option>
      </optgroup>
    </select>
    </div>
      <button class="button" v-if="recipeLookup !== undefined" @click="deleteRecipe(recipeLookup.recipeData.name) && appMode?.change('find')">submit delete</button>
      <button class="button" @click="appMode?.change('find')" >cancel</button>
    </div>
</template>
<style scoped>

#templateWrapper
{
  border: 3px solid blue;
}
#formWrapper
{
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
  flex-direction: column;
  border: 3px solid black;
  width: 100%;
  height: 75%;
  box-sizing: border-box;
}
.button
{
    color: white; 
    margin: 5px;
}
.longForm
 {
	display: block;
	width: 50%;
	height: 7em;
	box-sizing: border-box;
	border-radius: 5%;
	background-color: #F7F9FC;
	border: 2px solid #BFBFBF;
	color: #2c3e50;
  margin: 0.10em;
  padding: 2em;
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
