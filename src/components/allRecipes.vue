
<script setup lang="ts">

import { inject, ref} from 'vue';

import { type mode, type recipeLookup } from '../interfaces/interface';

import { fetchByType } from '../api/getByType';

import FormButtons from '../components/FormButtons.vue'

const appMode = inject<mode>("appMode");

let recipeLookup = inject<recipeLookup>("selectRecipe");

//create a ref string array

let recipeNameArr = ref<string[]>([]);

let chooseRecipeType = ref<string>('');

const getRecipes = async (val: string) =>
{
   //console.log(fetchByType(val))_
   const data = await fetchByType(val)
   if (data !== undefined)
   {
    recipeNameArr.value = data;
   }

}

const recipeTypes = ref<string[]>(["main dish", "side dish", "soup/chili", "dessert"]);

</script>

<template>


  <div id="component-container-all-recipes">

    <h1>Recipe Index</h1>
    <span> recipe type: {{ chooseRecipeType }}</span>

    <select class="select" placeholder="select recipe type" v-model="chooseRecipeType"  >
      <optgroup label="recipe types">
        <option value="" disabled>select a recipe type</option>
        <option class="select-option" v-for="item in recipeTypes" @click="getRecipes(item)" :value="item">{{ item }}</option>
      </optgroup>
    </select>
    <ul id="list-container" >
      <li class="recipe-list" v-for="item in recipeNameArr.sort()" @click="recipeLookup?.fetchData(item) && appMode?.change('read')">{{ item }}</li>
    </ul>
    
    <div id="buttonWrapper">
       <FormButtons name="cancel" @click="appMode?.change('find')"></FormButtons>
    </div>



  </div>

</template>

<style scoped>

#component-container-all-recipes
{
  display: flex;
  border: 3px dotted black;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 75%;
  height: 100%;
}
h1
{
  text-align: center;
}

.button
{
    color: white; 
    margin: 5px;
}
.recipes
{
  position: relative;
}
.select
 {
	display: flex;
  text-align: left;
  align-items: left;
  justify-content: left;
  font-size: 1em;
}

#list-container
{
  border: 3px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.recipe-list
{
  border: 1px solid black;
	display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  padding: 1px;
  font-size: 1em;

}
.recipe-list:hover
{
  background-color: blue; 
  color: white;
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

