
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

    <select class="select" placeholder="select recipe type" v-model="chooseRecipeType"  >
      <optgroup label="recipe types">
        <option value="" disabled>select a recipe type</option>
        <option class="select-option" v-for="item in recipeTypes" @click="getRecipes(item)" :value="item">{{ item }}</option>
      </optgroup>
    </select>
    <ul id="list-container" >
      <li class="recipe-list" v-for="(item, index) in recipeNameArr.sort()" @click="recipeLookup?.fetchData(item) && appMode?.change('read')">{{ index + 1 }}. {{ item }}</li>
    </ul>
    
    <!-- <div id="button-wrapper">
       <FormButtons name="cancel" @click="appMode?.change('find')"></FormButtons>
    </div> -->



  </div>

</template>

<style scoped>

#component-container-all-recipes
{
  display: flex;
  /* border: 3px dotted black; */
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
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

.select
 {
	display: flex;
  box-sizing: border-box;
  text-align: center;
  align-items: left;
  justify-content: left;
  margin: 0em;
  font-size: 1em;
  height: 4em;
  margin: 1em;
  /* padding: 1em; */
   background-color: #FFFAA0;
  /* background-color: #F5A0FF;  */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 25px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px 0px; 
  /* box-shadow: 2px 2px 3px 2px;  */
}

#list-container
{
  /* border: 3px solid gray; */
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 1em;
}
.recipe-list
{
  /* border: 1px solid black; */
	display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: 1px;
  font-size: 1em;
  height: 4em;
  margin: 1em;
  /* box-shadow: 0px 0px 10px 0px; */
  margin-top: 3em;
  background-color: #A0FFF5; 
  /* border-radius: 25px; */
  border: 1px solid black;
  box-shadow: 0px 0px 5px 0px; 

  /* box-shadow: 2px 2px 3px 2px black; */

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

#button-wrapper
{
  /* border: 1px dotted black; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;

}

@media(min-width: 800px)
{

  #component-container-all-recipes
  {
    max-width: 35%;
  }
}
</style>

