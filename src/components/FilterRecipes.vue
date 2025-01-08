
<script setup lang="ts">

import { ref, reactive, watch} from 'vue'

import deleteRecipe from '../api/delete';

import { fetchData } from '../api/get';


//import { recipe } from '../api/get';



import UpdateRecipe2 from './UpdateRecipe2.vue';
import type Instructions from './instructions.vue';


const baseUrl = `http://localhost:3000`;


let searchString = ref<string | null>(null);

//let searchString = reactive({
  //value: "testing"
//})

let editOn = ref<boolean>(false);

let filteredApiDataArr: string[] = [];

function filteredList() {
  return filteredApiDataArr.filter((item) =>
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
    filteredApiDataArr = [];

    editOn.value = false;
}

const testCb = () =>
{
  console.log("testing")
}




watch(searchString, async () => 
{

  try 
  {
    console.log(`searchString: ${searchString.value}`)
    //searchString.value = "test"
    const res = await fetch(
      `http://localhost:3000/recipeNames?name=${searchString.value}`
    )

  
    const response = await res.json();
    console.log(response)
    const filteredData: string[] = [];
  
    for (let i of response.rows)
      {
        filteredData.push(i.name);
        //console.log(i.name)
      }

    console.log(`filteredData ${filteredData}`)
    console.log(filteredData)

    console.log("filterData api func called")

    filteredApiDataArr = filteredData;
      

  } 
  catch (error) 
  {
    console.error(error);
  }
});

const exitEdit = (payload: object) =>
{
  console.log(payload);
  editOn.value = payload.editOn;
  console.log(editOn)
}

  
</script>

<template>

  <input v-model="searchString" placeholder="type text here">
  <div v-for="item in filteredList()" :key="item">
    <button class="listButton" @click="fetchData(item)">{{ item }}</button>
  </div>
  <div class="item error" v-if="searchString&&!filteredList().length">
     <p>No results found!</p>
  </div>
  <h2 v-if="recipe.name">{{ recipe.name }}</h2>
  <p v-else>"oh no"</p>
  <div class="unordered_list">
    <li  v-if="recipe.ingredients" v-for="(item) in recipe.ingredients.split(',')"> 
      {{ item }}
    </li>
  </div>
  <p v-if="recipe.instructions"> {{ recipe.instructions}}</p>
  <p v-else>"oh no"</p>
  <div>some space</div>  
  <button class="button" v-if="editOn == false && recipe.name" @click="editOn = true" >edit recipe</button>
  <button class="button" v-if="recipe.name" @click="deleteRecipe(recipe.name, baseUrl)" >delete recipe</button>
  <UpdateRecipe2 v-if="editOn" :name="recipe.name" 
  :ingredients="recipe.ingredients" 
  :instructions="recipe.instructions" 
  :type="recipe.type" @cancel-edit="exitEdit"/>
  <div v-else>some div</div>
</template>

<style scoped>

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
