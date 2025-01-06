

<script setup lang="ts">


import { ref, reactive, onMounted, onServerPrefetch , watch } from 'vue'

const props = defineProps<{
  recipeName?: (string | null)
}>()

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
    //recipeIngredients = await apiData.rows[0].ingredients;
    //recipeInstructions = await apiData.rows[0].instructions;

    console.log(recipe.name);

    console.log("api func called")
  } 
  catch (error) 
  {
   recipe.name = null;
    //recipeIngredients = null;
    //recipeInstructions = null;
    console.error(error);
  }
}

</script>




<template>
  <h1>{{ props.recipeName }}</h1>
  <button class="button" @click="fetchData(props.recipeName)" >Fetch next todo</button>
  <p v-if="recipe.name"> recipe name: {{ recipe.name }}</p>
  <p v-else>"oh no"</p>
</template>