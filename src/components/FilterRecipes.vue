
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
   //console.error(error);
  }
}



const resetAfterFetch = () =>
{
    //reset searchString to null
    searchString.value = null;

    //reset search array
    filteredApiDataArr.value = [];
    
    updateMode(appModes.read);

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
    //console.error(error);
  }
});

 const testVar: string = "a string";

 const testFunc = (): void =>
 {
  console.log("test func called");
 }




 const modSearchContainer = (val: boolean) =>
 {
  console.log("mod contain called")

  //change style prop of search container

  if (val)
  {
    searchContainerStyle.border = "5px solid purple"
  }
  else 
  {

    searchContainerStyle.border = "5px solid red"
  }

  return;

 }

 const searchContainerStyle = reactive
 (
  {
    border: "5px solid red",
  }
 )


</script>

<template>


    <div v-if="appMode.mode === appModes.find" id="searchWrapper">
      <div>filteredApiDataArr: {{ filteredApiDataArr }}</div>

      <div id="search-container" contenteditable="true" :style="{border: searchContainerStyle.border}">

        <input @focus="modSearchContainer(true)" @blur="modSearchContainer(false)" v-model="searchString" :onchange="fetchData(searchString)" id="searchbar" type="search" name="q"  placeholder="search recipe" autocomplete="off">
        <label class="forScreenReaders" value="searchbar">searchbar for finding recipes</label>
        <span class="search-icon">&#128269;</span> <!-- Unicode for magnifying glass icon -->
        <div class="dropdown-list" id="dropdownList">
              <div class="dropdown-item" v-for="item in filteredApiDataArr" :key="item" :value="item" @click="fetchData(item)">{{ item }}</div>
        </div>


      </div>


    </div>

  <div v-else-if="appMode.mode === appModes.read">
    <h2 v-if="recipe.name">{{ recipe.name }}</h2>
      <ul class="unordered_list">
        <li  v-if="recipe.ingredients" v-for="(item) in recipe.ingredients.split(',')"> 
          {{ item }}
        </li>
      </ul>
    <p v-if="recipe.instructions"> {{ recipe.instructions}}</p>
    <div id="buttonWrapper">
      <button class="button" v-if="appMode.mode === appModes.read && recipe.name" @click="updateMode('update')" >edit recipe</button>
      <Buttons class="button" v-if="appMode.mode === appModes.read && recipe.name"  name="delete recipe" @click="updateMode('delete')"/>
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
.unordered_list 
{
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  border: 2px solid black;
}
 /* Input Styling */
#searchbar 
{
  width: 100%;
  padding: 10px 40px 10px 15px; /* Add padding for icon space */
  font-size: 16px;
  border: 2px solid #ccc; /* Default border color */
  border-radius: 25px; /* Rounded border */
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

/* Focus Effect */
#searchbar:focus 
{
  border-color: #4CAF50; /* Highlight border color */
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5); /* Green glow */
}

/* Search Icon */
#searchbar .search-icon 
{
  position: absolute;
  top: 50%;
  right: 15px; /* Adjust space from the right */
  transform: translateY(-50%);
  font-size: 20px; /* Icon size */
  color: #aaa; /* Default icon color */
  pointer-events: none; /* Prevent interaction with the icon */
}

/* Placeholder Text Styling */
#searchbar::placeholder 
{
  color: #aaa; /* Placeholder color */
  font-style: italic; /* Placeholder style */
}

/*styling for searchbar dropdown list */
.dropdown-list
{
  display: none;
}

#searchbar:focus ~ .dropdown-list
{
  border: 3px solid black;
  display: inline-block;
}

#search-container
{
  border: 3px solid black;
}
#search-container:focus .dropdown-list
{
  display: inline-block;
}

/* styling for accessiblity */
.forScreenReaders
{
  display: none;
}
</style>
