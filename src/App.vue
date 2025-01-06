<script setup lang="ts">

import { ref, reactive, watch} from 'vue'

import FetchRecipe from './components/FetchRecipe.vue'


const baseUrl = `http://localhost:3000`;

let searchString = ref<string | null>("testing, testing");

//let searchString = reactive({
  //value: "testing"
//})

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
}

//let recipeName = ref<string>("");

let recipe: Recipe = reactive(
  {
    name: null,
    ingredients: null,
    instructions: null,
  }
)


let apiData: string[] = ref([]);

async function fetchData(value: (string | null)) 
{
  try 
  {
    console.log(`recipeName: ${value}`)
    console.log(value)
    //searchString.value = "test"
    const res = await fetch(
      `http://localhost:3000/display?name=${value}`
    )
  
    //apiData.value = await res.json()
    apiData = await res.json()


    recipe.name = await apiData.rows[0].name;
    recipe.ingredients = await apiData.rows[0].ingredients;
    recipe.instructions = await apiData.rows[0].instructions;

    console.log(recipe.name);

    console.log("api func called")

    //reset searchString to null

    searchString.value = "";

    //reset search array
    filteredApiDataArr = [];
  } 
  catch (error) 
  {
   recipe.name = null;
   recipe.ingredients = null;
   recipe.instructions = null;
   console.error(error);
  }
}

const postData = async () =>
{

const fakeData = 
{
  name: searchString.value,
  ingredients: "tomato sauce",
  instructions: "cut tomatos",
  type: "soup",
}
  try 
  {

    await fetch(baseUrl + `/display`, 

    {
      method: "POST",
      headers: 
      {

        "Content-Type" : "application/json",
      },

      body: JSON.stringify(fakeData),

    });

   }
   catch(error)
   {
    console.error(error);
   }
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

let stringVar = "I am a var"

const setSearchStringVal = (value: (string | null)) =>
{
  searchString.value = value;
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
  <p>searchString: {{ searchString }}</p>
  <p v-if="recipe.name"> recipe name: {{ recipe.name }}</p>
  <p v-else>"oh no"</p>
  <p v-if="recipe.ingredients"> recipe ingredients: {{ recipe.ingredients}}</p>
  <p v-else>"oh no"</p>
  <p v-if="recipe.instructions"> recipe instructions: {{ recipe.instructions}}</p>
  <p v-else>"oh no"</p>
  <button class="button" @click="postData" >Post Data</button>
</template>

<style scoped>

.button
{
  color:white;
}
.listButton
{
  color: black;
  background-color: #FFFAA0;
  margin: 2px;
}

</style>
