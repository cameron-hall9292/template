<script setup lang="ts">
import search from './components/search.vue'
import Title from './components/Title.vue'
import ingredients from './components/ingredients.vue'
import instructions from './components/instructions.vue'
import { ref, onMounted, onServerPrefetch , watch} from 'vue'


//let searchString: String = ref("cam"); 
//let searchString: any = ref('cam');

let searchString = ref<string>("cam");

//let textInput: any = ref("");

let textInput = ref<string>("");

const count = ref(0);

const apiData: string[] = ref([]);


let recipeName: string = "";
let recipeIngredients: string = "";
let recipeInstructions: string = "";

   //onMounted(() => {
     //fetch(`http://localhost:3000/display?name=${searchString}`)
       //.then(response => response.json())
       //.then(data => {
         //apiData.value = data.rows[0];
       //});
   //});
const todoId = ref(1)


async function fetchData() 
{
  try 
  {
  
    //searchString.value = "test"
    const res = await fetch(
      `http://localhost:3000/display?name=${searchString.value}`
    )
  
    apiData.value = await res.json()
  

    recipeName = apiData.value.rows[0].name;
    recipeIngredients= apiData.value.rows[0].ingredients;
    recipeInstructions= apiData.value.rows[0].instructions;

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

//fetchData();

const testButtonFunc = () =>
{
  console.log(searchString)
}



//watch(searchString, fetchData)
  
</script>

<template>
  <input v-model="searchString" placeholder="type text here">
  <p>{{ searchString }}</p>
  <button class="button" @click="fetchData" >Fetch next todo</button>
  <p v-if="recipeName">recipeName: {{ recipeName }}</p>
  <p v-else>Oh no!!!!</p>
  <p v-if="recipeIngredients">recipeIngredients: {{ recipeIngredients}}</p>
  <p v-else>Oh no!!!!</p>
  <p v-if="recipeInstructions">recipeInstructions: {{ recipeInstructions }}</p>
  <p v-else>Oh no!!!!</p>
  <p> {{ recipeName }}</p>
  <p>apiData.value: {{ apiData.rows}}</p>
</template>

<style scoped>

.button
{
  color:white;
}

</style>
