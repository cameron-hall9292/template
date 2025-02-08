
<script setup lang="ts">

import { ref, inject, withDefaults } from 'vue';

const appMode = inject<mode>("appMode");

let recipeLookup = inject<recipeLookup>("selectRecipe");

import { appModes } from '../interfaces/appModes';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface Props 
{
  name?: boolean;
  ingredients?: boolean;
  instructions?: boolean;
  type?: boolean;
}

const props = withDefaults(defineProps<Props>(), 
{
  name: false,
  ingredients: false,
  instructions: false,
  type: false
});

let singleIngredient = ref<string>('');

// let ingredientArr = ref<string[]>([]);
let ingredientArr;

if (recipeLookup.recipeData.ingredients !== null)
{

  ingredientArr = ref<string[]>(recipeLookup.recipeData.ingredients.split(','))
}

else 
{
  ingredientArr = ref<string[]>([]);
}


const addIngredient = () =>
{

    if (singleIngredient.value === null || singleIngredient.value === undefined || singleIngredient.value === '' || singleIngredient.value === ' ') 
    {
      throw console.error("ingredient cannot equal " + singleIngredient.value);
      
    }

    else
    {

      //add single ingredient to array
      ingredientArr.value.push(singleIngredient.value);

      //clear out single ingredient value
      //before adding another ingredient
      singleIngredient.value = null;

      //add the data to our final core 
      //structure
      recipeLookup.recipeData.ingredients = ingredientArr.value.join(',')

    }


    
}


const removeIngredient = (value: number) =>
{
  
  recipeLookup.recipeData.ingredients = ingredientArr.value.filter((item, index) => index !== value).join(',');
  ingredientArr.value =  ingredientArr.value.filter((item, index) => index !== value);
    // console.log("removeIngredient called")

}

</script>

<template>

    <div id="form-wrapper"> 

      <!-- <div>{{ recipeLookup.recipeData.ingredients }}</div>
      <div>{{ ingredientArr }}</div>
      <div>{{ singleIngredient }}</div> -->
      <!-- <div>props.formSwitch: {{ props.formSwitch }}</div> -->
      <input :disabled="props.name" id="formName" class="longForm" v-if="recipeLookup !== undefined" v-model=" recipeLookup.recipeData.name" placeholder="enter recipe name">

      <div id="ingredient-container">


        <ul v-if="appMode.mode !== appModes.delete" v-for="(recipe, index) in ingredientArr">
          <li>  {{ recipe }} 
            <!-- <FontAwesomeIcon @click="removeIngredient(recipe)" icon="fa-solid fa-trash fa-xs" size="sm" idth="fw" />  -->
          </li>
            <FontAwesomeIcon @click="removeIngredient(index)" icon="fa-solid fa-trash fa-xs" size="lg" idth="fw" /> 
        </ul>

      </div>


      <div v-if="appMode.mode !== appModes.delete" id="add-container">
        <input v-model="singleIngredient" class="add-ingredient" placeholder="add ingredient"/>
        <button @click="addIngredient" class="add-ingredient">+</button>
      </div>


      <select :disabled="props.type" class="longForm" placeholder="select recipe type" v-if="recipeLookup !== undefined" v-model="recipeLookup.recipeData.type"  >
        <optgroup label="recipe types">
          <option value="main dish">main dish</option>
          <option value="side dish">side dish</option>
          <option value="soup/chili">soup/chili</option>
          <option value="dessert">dessert</option>
        </optgroup>
      </select>

      <textarea :disabled="props.instructions"  id="form-instructions" class="longForm" v-if="recipeLookup !== undefined" v-model="recipeLookup.recipeData.instructions" placeholder="enter instructions"></textarea>

    </div>

</template>



<style scoped>

#form-wrapper
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
  font-size: 1.25em;
}


.longForm:focus
 {
  /* background-color: #007BFF;
  background-color: #0818A8;
  color: yellow;  */
  /* font-size: large; */
  
 }

#buttonWrapper
{
  border: 1px solid black
}

#ingredient-container
{
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  font-size: 1rem;
}

#ingredient-container > ul  
{
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  list-style: none;
  /* border: 1px solid black; */
  margin: 10px;
  padding: 5px;
}

#ingredient-container > ul > li
{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 5px;
}


#add-container
{
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  box-sizing: border-box;
}

#add-container > input
{
  /* border: 2px dotted green; */
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 80%;

}

#add-container > button
{
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 4em;
  width: 4em;
  margin: 5px;
  background-color: #FFFAA0;
  border-radius: 10px;
  border: 0;
}

#form-wrapper > select
{
  height: 4em;
}

#form-instructions
{
  height: 8em;
}


</style>
