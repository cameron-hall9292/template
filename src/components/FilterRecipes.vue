
<script setup lang="ts">

import { ref, reactive, watch, inject, provide} from 'vue'

import allRecipes from './allRecipes.vue';

import deleteRecipe from '../api/delete';

import UpdateRecipe2 from './UpdateRecipe2.vue';

import Buttons from './Buttons.vue';


//import { recipe } from '../api/get';

import { type mode, type recipeLookup } from '../interfaces/interface';

import { appModes } from '../interfaces/appModes';

import { baseUrl } from '../api/endpoints';

import { type Recipe } from '../interfaces/interface';

const appMode = inject<mode>("appMode");

let searchString = ref<string | null>(null);

let filteredApiDataArr = ref<string[]>([]) 

let recipeLookup = reactive<recipeLookup>
  (
    {
      recipeData: reactive({
        name: null,
        ingredients: null,
        instructions: null,
        type: null,
      }),
      async fetchData(value: (string | null)): Promise<any>
      {
        try 
        {
          const res = await fetch(
            `${baseUrl}/display?name=${value}`
          )
  
          await res.json()

          .then(data => this.recipeData = data.rows[0])

          //reset after data fetch
          resetAfterFetch();
          console.log("fetchData func called")
        } 
        catch (error) 
        {
        this.recipeData.name = null;
        this.recipeData.ingredients = null;
        this.recipeData.instructions = null;
        //console.error(error);
        }
      }

    }
  )

provide<recipeLookup>("selectRecipe", recipeLookup);



let recipe: Recipe = reactive(
  {
    name: null,
    ingredients: null,
    instructions: null,
    type: null,
  }
)


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
    
    appMode?.change(appModes.read);

}


watch(searchString, async () => 
{

  try 
  {
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


 const modSearchContainer = (val: boolean) =>
 {
  console.log("mod contain called")

  //change style prop of search container

  if (val)
  {
    searchContainerStyle.border = "5px solid purple"
    searchContainerStyle.backgroundColor = "#FFFFFF"
    searchContainerStyle.borderRadius = "30px"
    //searchContainerStyle.height  = `${filteredApiDataArr.value.length * 4}em`;
    searchItemStyle.visibility = "visible"
  }
  else 
  {

    searchContainerStyle.border = "5px solid red"
    searchContainerStyle.backgroundColor = "#FFFAA0"
    searchContainerStyle.borderRadius = "0px"
    
    //searchContainerStyle.height = "0px"
    //searchItemStyle.visibility = "hidden"
  }

  return;

 }

 const input = ref(null);

 const blurSearchContainer = (event) =>
 {

    searchContainerStyle.border = "5px solid red"
    searchContainerStyle.backgroundColor = "#FFFAA0"
    searchContainerStyle.borderRadius = "0px"
    //reset search filter
    //filteredApiDataArr.value = [];
    searchItemStyle.visibility = "hidden"
    //register a click event
    input.value.blur();
 }
//expand search box based on number of items fetched by the search string

watch(filteredApiDataArr, () => 
{

    const initialSearchBarHeight = 2.5 //em
    const itemDivHeight = searchItemHeight + searchItemPadding * 2
    searchContainerStyle.height  = `${initialSearchBarHeight + itemDivHeight + (filteredApiDataArr.value.length * (itemDivHeight))}em`;
    console.log(searchContainerStyle.height)
})

 const searchContainerStyle: Record<string, string> = reactive
 (
  {
    border: "5px solid red",
    width: "35em",
    height: "2.5em", 
    backgroundColor:"#FFFAA0",
    borderRadius: "0px",
    boxShadow: "0 0 8px rgba(76, 175, 80, 0.5)", /* Green glow */
    borderWidth: "2px",
    position: "absolute",
    overflow: "visible",
    display: "block",
  }
 )

 const searchItemHeight = 1;

 const searchItemPadding = 0.5;

 const searchItemStyle: Record<string, string> = reactive
 (
  {
    height: `${searchItemHeight}em`,
    padding: `${searchItemPadding}em`,
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    visibility: "visible"
  }
 )


const searchBarStyle: Record<string, string> = reactive
(
  {
    width: "100%",
    height: "2.5em",
    padding: "10px 40px 10px 15px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "25px",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    position: "relative"

  }
)
 const selectSearchItem = (val: string ) =>
 {
  searchString.value =  val;

  console.log("selectSearchItem func called")
  
  //collapse search bar after user has clicked an item from the drop-down list
  modSearchContainer(false);


  //fetch recipe and display it when user clicks recipe name from drop-down

  //fetchData(val);

  recipeLookup.fetchData(val)

  //empty item array so that when user returns, the search-field will be empty
  filteredApiDataArr.value = [];

 }


</script>

<template>

    <allRecipes v-if="appMode.mode === appModes.index"/>

    <div v-if="appMode.mode === appModes.find" id="searchWrapper">

      <div id="search-container" tabindex="0"  
     @keydown.enter="fetchData(searchString)" :style="searchContainerStyle"  @pointerleave="blurSearchContainer"   >

        <input ref="input" :style="searchBarStyle" @keydown.enter="fetchData(searchString)" @pointerenter="modSearchContainer(true)" @focus="modSearchContainer(true)"  v-model="searchString" id="searchbar" type="search" name="q"  placeholder="search recipe" autocomplete="off">
        <label class="forScreenReaders" value="searchbar">searchbar for finding recipes</label>
        <div class="dropdown-list" id="dropdownList" >
              <div :style="searchItemStyle" class="dropdown-item" v-for="item in filteredApiDataArr" :key="item" :value="item" @click="selectSearchItem(item)">{{ item }}</div>
        </div>


      </div>


    </div>

  <div v-else-if="appMode.mode === appModes.read">
    <h2 v-if="recipeLookup.recipeData.name">{{ recipeLookup.recipeData.name }}</h2>
      <ul class="unordered_list">
        <li  v-if="recipeLookup.recipeData.ingredients" v-for="(item) in recipeLookup.recipeData.ingredients.split(',')"> 
          {{ item }}
        </li>
      </ul>
    <p v-if="recipeLookup.recipeData.instructions"> {{ recipeLookup.recipeData.instructions}}</p>
    <div id="buttonWrapper">
      <button class="button" v-if="appMode.mode === appModes.read && recipeLookup.recipeData.name" @click="appMode?.change('update')" >edit recipe</button>
      <Buttons class="button" v-if="appMode.mode === appModes.read && recipeLookup.recipeData.name"  name="delete recipe" @click="appMode?.change('delete')"/>
    </div>
  </div>
  <div v-else-if="appMode.mode === appModes.delete">

    <h2 v-if="recipeLookup.recipeData.name">{{ recipeLookup.recipeData.name }}</h2>
      <ul class="unordered_list">
        <li  v-if="recipeLookup.recipeData.ingredients" v-for="(item) in recipeLookup.recipeData.ingredients.split(',')"> 
          {{ item }}
        </li>
      </ul>
    <p v-if="recipeLookup.recipeData.instructions"> {{ recipeLookup.recipeData.instructions}}</p>

    <button class="button" v-if="appMode.mode === appModes.delete && recipeLookup.recipeData.name" @click="deleteRecipe(recipeLookup.recipeData.name ) && appMode?.change('find')">submit delete</button>
    <button class="button" v-if="appMode.mode === appModes.delete && recipeLookup.recipeData.name" @click="appMode?.change('find')">cancel</button>

  </div>
  <UpdateRecipe2 v-else-if="appMode.mode === appModes.update" :name="recipeLookup.recipeData.name" 
  :ingredients="recipeLookup.recipeData.ingredients" 
  :instructions="recipeLookup.recipeData.instructions" 
  :type="recipeLookup.recipeData.type" 
  />
  <div v-else>Nothing to see here...</div>
</template>

<style scoped>

#searchWrapper
{
  border: 3px solid black;
}

.dropdown-item:hover
{
  background-color: blue;
  color:white;
}

.dropdown-item:blur
{
  display: none;
}

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



/* styling for accessiblity */
.forScreenReaders
{
  display: none;
}
</style>
