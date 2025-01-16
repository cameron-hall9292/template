
<script setup lang="ts">

import { inject,} from 'vue'

import { type mode,type recipeLookup } from '../interfaces/interface';

import deleteRecipe from '../api/delete';

import FormButtons from '../components/FormButtons.vue'

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
  <div id="component-container-delete">

    <h1>Delete Recipe</h1>
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
    <FormButtons v-if="recipeLookup !== undefined" @click="deleteRecipe(recipeLookup.recipeData.name) && appMode?.change('find')" name="delete recipe"></FormButtons>
    <FormButtons name="cancel" @click="appMode?.change('find')"></FormButtons>
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
  height: 100%;
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
