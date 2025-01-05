

<script setup lang="ts">


import { ref, reactive, onMounted, onServerPrefetch , watch } from 'vue'

const props = defineProps<{
  recipeName?: string
}>()


//let recipeName = ref<string>("");

let recipeName = reactive(
  {
    name: "",
  }
)


let apiData: string[] = ref([]);

async function fetchData() 
{
  try 
  {
    console.log(`recipeName: ${props.recipeName}`)
    console.log(props.recipeName)
    //searchString.value = "test"
    const res = await fetch(
      `http://localhost:3000/display?name=${props.recipeName}`
    )
  
    //apiData.value = await res.json()
    apiData = await res.json()


    recipeName.name = await apiData.rows[0].name;
    //recipeIngredients = await apiData.rows[0].ingredients;
    //recipeInstructions = await apiData.rows[0].instructions;

    console.log(recipeName);

    console.log("api func called")
  } 
  catch (error) 
  {
   recipeName.name = null;
    //recipeIngredients = null;
    //recipeInstructions = null;
    console.error(error);
  }
}

</script>




<template>
  <h1>{{ props.recipeName }}</h1>
  <button class="button" @click="fetchData" >Fetch next todo</button>
  <p v-if="recipeName.name"> recipe name: {{ recipeName.name }}</p>
  <p v-else>"oh no"</p>
</template>