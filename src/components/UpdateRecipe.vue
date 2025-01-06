
<script setup lang="ts">

import { ref, reactive, watch} from 'vue'

const baseUrl = `http://localhost:3000`;

let searchString = ref<string | null>("testing, testing");

let filteredApiDataArr: string[] = [];

function filteredList() {
  return filteredApiDataArr.filter((item) =>
    item.toLowerCase().includes(searchString.value.toLowerCase())
  );
}

interface RecipePutData 
{
    name: string | null,
    ingredients: string | null,
    instructions: string | null,
    type: string | null
}

const recipePut: RecipePutData = reactive
(

    {
        name: null,
        ingredients: null,
        instructions: null,
        type: null,
    }
)
async function updateRecipe(value: RecipePostData) 
{
  try 
  {
    await fetch(baseUrl + `/display`,
    {

      method: "PUT",
      headers: 
      {

        "Content-Type" : "application/json",
      },

      body: JSON.stringify(value),

    })
  
    //reset searchString value
    searchString.value = "";

    //reset search array
    filteredApiDataArr = [];

    alert(`recipe for ${value.name} was successfully updated`)
  } 
  catch (error) 
  {
   console.error(error);
  }
}


let apiData: string[] = ref([]);

async function fetchData(value: (string | null)) 
{
  try 
  {
    console.log(`recipeName: ${value}`)
    console.log(value)
    //searchString.value = "test"
    const res = await fetch(
      `${baseUrl}/display?name=${value}`
    )
  
    //apiData.value = await res.json()
    apiData = await res.json()


    recipePut.name = await apiData.rows[0].name;
    recipePut.ingredients = await apiData.rows[0].ingredients;
    recipePut.instructions = await apiData.rows[0].instructions;
    recipePut.type = await apiData.rows[0].type;



    //reset searchString to null

    searchString.value = "";

    //reset search array
    filteredApiDataArr = [];
  } 
  catch (error) 
  {
   recipePut.name = null;
   recipePut.ingredients = null;
   recipePut.instructions = null;
   recipePut.type = null;
   console.error(error);
  }
}





watch(searchString, async () => 
{

  try 
  {
    console.log(`searchString: ${searchString.value}`)
    const res = await fetch(
      `${baseUrl}/recipeNames?name=${searchString.value}`
    )

  
    const response = await res.json();
    console.log(response)
    const filteredData: string[] = [];
  
    for (let i of response.rows)
      {
        filteredData.push(i.name);
      }

    filteredApiDataArr = filteredData;
      

  } 
  catch (error) 
  {
    console.error(error);
  }
});

  
</script>

<template>

  <input v-model="searchString" placeholder="search recipe">
  <input class="longForm" v-model="recipePut.name" placeholder="enter recipe name">
  <textarea class="longForm" v-model="recipePut.ingredients" placeholder="enter ingredients"></textarea>
  <textarea class="longForm" v-model="recipePut.instructions" placeholder="enter instructions"></textarea>
  <input class="longForm" v-model="recipePut.type" placeholder="enter recipe type">
  <button class="button" @click="updateRecipe(recipePut)">submit update</button>
  <div v-for="item in filteredList()" :key="item">
    <button class="listButton" @click="fetchData(item)">{{ item }}</button>
  </div>
  <div class="item error" v-if="searchString&&!filteredList().length">
     <p>No results found!</p>
  </div>
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

.longForm
{
    display:block;
    width: 20vw;
    height: 10vh;
}
</style>
