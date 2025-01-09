
<script setup lang="ts">

import { ref, reactive, watch, inject} from 'vue'

import deleteRecipe from '../api/delete';

import { fetchData } from '../api/get';


import UpdateRecipe2 from './UpdateRecipe2.vue';

import Buttons from './Buttons.vue';



//import { recipe } from '../api/get';

import { appModes } from '../appModes';

const { appMode, updateMode } = inject("appMode");



let editOn = ref<boolean>(false);

const baseUrl = `http://localhost:3000`;


let searchString = ref<string | null>(null);

//let searchString = reactive({
  //value: "testing"
//})



let filteredApiDataArr = ref<string[]>([]) 

function filteredList() {
  return filteredApiDataArr.value.filter((item) =>
    item.toLowerCase().includes(searchString.value.toLowerCase())
  );
}

interface Recipe 
{
  name: string | null,
  ingredients: string | null,
  instructions: string | null,
  type: string | null,
}


let recipe: Recipe = reactive(
  {
    name: null,
    ingredients: null,
    instructions: null,
    type: null,
  }
)


//let recipe = ref<Recipe>(
  //{
    //name: null,
    //ingredients: null,
    //instructions: null,
    //type: null,
  //}
//)



async function fetchData(value: (string | null)) 
{
  try 
  {
    const res = await fetch(
      `${baseUrl}/display?name=${value}`
    )
  
    await res.json()

    .then(data => recipe = data.rows[0])

    //reset after data fetch
    resetAfterFetch();
    console.log("fetchData func called")
  } 
  catch (error) 
  {
   recipe.name = null;
   recipe.ingredients = null;
   recipe.instructions = null;
   console.error(error);
  }
}



const resetAfterFetch = () =>
{
    //reset searchString to null
    searchString.value = null;

    //reset search array
    filteredApiDataArr.value = [];

}

const testCb = () =>
{
  console.log("testing")
}




watch(searchString, async () => 
{

  try 
  {
    //console.log(`searchString: ${searchString.value}`)
    //searchString.value = "test"
    const res = await fetch(
      `${baseUrl}/recipeNames?name=${searchString.value}`
    )

  
    const response = await res.json();
    console.log(response)
    const filteredData: string[] = [];

    if (response.rows === undefined) return;
  
    for (let i of response.rows)
      {
        filteredData.push(i.name);
        //console.log(i.name)
      }

    console.log(`filteredData ${filteredData}`)
    console.log(filteredData)

    console.log("filterData api func called")


    filteredApiDataArr.value = filteredData;

    console.log(filteredApiDataArr.value)


      

  } 
  catch (error) 
  {
    console.error(error);
  }
});

  
</script>

<template>



    <div>{{ filteredApiDataArr }}</div>
    <input v-model="searchString" placeholder="type text here">
    <div v-for="item in filteredApiDataArr" :key="item">
      <button class="listButton" @click="fetchData(item) && updateMode(appModes.read)">{{ item }}</button>
    </div>
    <div class="item error" v-if="searchString&&!filteredList().length">
      <p>{{ filteredList().length }}</p>
    </div>
    <div >
    </div>
  <div v-if="appMode.mode === appModes.read">
    <h2 v-if="recipe.name">{{ recipe.name }}</h2>
      <ul class="unordered_list">
        <li  v-if="recipe.ingredients" v-for="(item) in recipe.ingredients.split(',')"> 
          {{ item }}
        </li>
      </ul>
    <p v-if="recipe.instructions"> {{ recipe.instructions}}</p>
    <div id="buttonWrapper">
      <button class="button" v-if="appMode.mode === appModes.read && recipe.name" @click="updateMode('update')" >edit recipe</button>
      <Buttons class="button" v-if="appMode.mode === appModes.read && recipe.name"  name="delete" @click="updateMode('delete')"/>
    </div>
  </div>
  <div v-else-if="appMode.mode === appModes.delete">

    <h2 v-if="recipe.name">{{ recipe.name }}</h2>
      <ul class="unordered_list">
        <li  v-if="recipe.ingredients" v-for="(item) in recipe.ingredients.split(',')"> 
          {{ item }}
        </li>
      </ul>
    <p v-if="recipe.instructions"> {{ recipe.instructions}}</p>

    <button class="button" v-if="appMode.mode === appModes.delete && recipe.name" @click="deleteRecipe(recipe.name, baseUrl) && updateMode('find')">submit delete</button>
    <button class="button" v-if="appMode.mode === appModes.delete && recipe.name" @click="updateMode('find')">cancel</button>

  </div>
  <UpdateRecipe2 v-else-if="appMode.mode === appModes.update" :name="recipe.name" 
  :ingredients="recipe.ingredients" 
  :instructions="recipe.instructions" 
  :type="recipe.type" 
  />
  <div v-else>Nothing to see here...</div>
</template>

<style scoped>

#buttonWrapper
{
  border: 2px solid black;
}

.button
{
  color:white;
  margin: 5px;
}
.listButton
{
  color: black;
  background-color: #FFFAA0;
  margin: 2px;
}
.ingredientList
{
  list-style-position: inside;
}
.unordered_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  border: 2px solid black;
}


</style>
