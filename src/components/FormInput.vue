
<script setup lang="ts">

import { inject } from 'vue';

const appMode = inject<mode>("appMode");

let recipeLookup = inject<recipeLookup>("selectRecipe");

import { appModes } from '../interfaces/appModes';

</script>

<template>

    <div id="form-wrapper" v-if="appMode.mode !== appModes.delete">

      <input id="formName" class="longForm" v-if="recipeLookup !== undefined" v-model=" recipeLookup.recipeData.name" placeholder="enter recipe name">
      <textarea id="formIngredients" class="longForm"  v-if="recipeLookup !== undefined" v-model="recipeLookup.recipeData.ingredients" placeholder="enter ingredients" ></textarea>
      <textarea id="formInstructions" class="longForm" v-if="recipeLookup !== undefined" v-model="recipeLookup.recipeData.instructions" placeholder="enter instructions"></textarea>
      <select class="longForm" placeholder="select recipe type" v-if="recipeLookup !== undefined" v-model="recipeLookup.recipeData.type"  >
        <optgroup label="recipe types">
          <option value="main dish">main dish</option>
          <option value="side dish">side dish</option>
          <option value="soup/chili">soup/chili</option>
          <option value="dessert">dessert</option>
        </optgroup>
      </select>

    </div>

    <div id="delete-mode" v-else-if="appMode.mode === appModes.delete">
    
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


</template>



<style scoped>

#form-wrapper
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

#form-wrapper :nth-child(1)
{
    height: 4em;
}

#form-wrapper :nth-child(4)
{
    height: 4em;
}

#delete-mode
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
  font-size: 1.25em;
}


.longForm:focus
 {
  background-color: #007BFF;
  background-color: #0818A8;
  color: yellow; 
  /* font-size: large; */
  
 }

#buttonWrapper
{
  border: 1px solid black
}


</style>
