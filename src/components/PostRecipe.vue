
<script setup lang="ts">
import { reactive } from 'vue';
import type Ingredients from './ingredients.vue';


const baseUrl = `http://localhost:3000`;

interface RecipePostData 
{
    name: string | null,
    ingredients: string | null,
    instructions: string | null,
    type: string | null
}

const recipePost: RecipePostData = reactive
(

    {
        name: null,
        ingredients: null,
        instructions: null,
        type: null,
    }
)

const postData = async (value: RecipePostData) =>
{

//const fakeData = 
//{
  //name: value,
  //ingredients: "tomato sauce",
  //instructions: "cut tomatos",
  //type: "soup",
//}
  try 
  {

    await fetch(baseUrl + `/display`, 

    {
      method: "POST",
      headers: 
      {

        "Content-Type" : "application/json",
      },

      body: JSON.stringify(value),

    });

    alert(`recipe for ${value.name} added successfully`)

   }
   catch(error)
   {
    console.error(error);
   }
} 



</script>


<template>
  <input class="longForm" v-model="recipePost.name" placeholder="enter recipe name">
  <textarea class="longForm" id="ingredients" v-model="recipePost.ingredients" placeholder="enter ingredients"></textarea>
  <textarea class="longForm" id="instructions" v-model="recipePost.instructions" placeholder="enter instructions"></textarea>
  <input class="longForm" v-model="recipePost.type" placeholder="enter recipe type">
  <p>{{ recipePost.name }}</p>
  <p>{{ recipePost.ingredients}}</p>
  <p>{{ recipePost.instructions}}</p>
  <p>{{ recipePost.type}}</p>
    
  <button class="button" @click="postData(recipePost)" >Post Data</button>
</template>


<style scoped>

.button
{
    color: white; 
}
.longForm
{
    display:block;
    width: 20vw;
    height: 10vh;
}
</style>