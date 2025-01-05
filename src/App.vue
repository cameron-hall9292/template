<script setup lang="ts">
import search from './components/search.vue'
import Title from './components/Title.vue'
import ingredients from './components/ingredients.vue'
import instructions from './components/instructions.vue'
import { ref, onMounted, onServerPrefetch , watch} from 'vue'

import FetchRecipe from './components/FetchRecipe.vue'


//let searchString: String = ref("cam"); 
//let searchString: any = ref('cam');

const baseUrl = `http://localhost:3000`;

let searchString = ref<string>("testing, testing");

//let textInput: any = ref("");

let textInput = ref<string>("");

const count = ref(0);

let apiData: string[] = ref([]);


let recipeName = ref<string>("");
let recipeIngredients = ref<string>("");
let recipeInstructions = ref<string>("");



function filteredList() {
  return filteredApiDataArr.filter((item) =>
    item.toLowerCase().includes(searchString.value.toLowerCase())
  );
}

async function fetchData() 
{
  try 
  {
  
    //searchString.value = "test"
    const res = await fetch(
      `http://localhost:3000/display?name=${searchString.value}`
    )
  
    //apiData.value = await res.json()
    apiData = await res.json()


    recipeName = await apiData.rows[0].name;
    recipeIngredients = await apiData.rows[0].ingredients;
    recipeInstructions = await apiData.rows[0].instructions;

    console.log(recipeName);

    console.log("api func called")
  } 
  catch (error) 
  {
   recipeName = null;
    recipeIngredients = null;
    recipeInstructions = null;
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




let filteredApiDataArr: string[] = [];



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
  
</script>

<template>
  <FetchRecipe :recipeName = "searchString"    />


  <input v-model="searchString" placeholder="type text here">
  <div v-for="item in filteredList()" :key="item">
    <p>{{ item }}</p>
  </div>
  <div class="item error" v-if="searchString&&!filteredList().length">
     <p>No results found!</p>
  </div>
  <p>searchString: {{ searchString }}</p>
  <button class="button" @click="postData" >Post Data</button>
</template>

<style scoped>

.button
{
  color:white;
}

</style>
