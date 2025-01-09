
<script setup lang="ts">
import { reactive, inject} from 'vue';
import type Ingredients from './ingredients.vue';


import { appModes } from '../appModes';

const { appMode, updateMode } = inject("appMode");
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
        type: "main dish",
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

  <div id="templateWrapper">

    <div id="formWrapper">

      <textarea class="longForm" v-model="recipePost.name" placeholder="enter recipe name"></textarea>
      <textarea class="longForm" id="ingredients" v-model="recipePost.ingredients" placeholder="enter ingredients"></textarea>
      <textarea class="longForm" id="instructions" v-model="recipePost.instructions" placeholder="enter instructions"></textarea>
      <select class="longForm" placeholder="select recipe type" v-model="recipePost.type"  >
        <optgroup label="recipe types">
          <option value="main dish">main dish</option>
          <option value="side dish">side dish</option>
          <option value="soup/chili">soup/chili</option>
          <option value="dessert">dessert</option>
        </optgroup>
      </select>
      <!-- <input class="longForm" v-model="recipePost.type" placeholder="enter recipe type"> -->

    </div>
    
    <div id="buttonWrapper">
      <button class="button" @click="postData(recipePost) && updateMode('find')" >submit recipe</button>
      <button class="button" @click="updateMode('find')" >cancel</button>
    </div>

  </div>

</template>


<style scoped>

#templateWrapper
{
  border: 3px solid blue;
}
#formWrapper
{
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
  flex-direction: column;
  border: 3px solid black;
  width: 100%;
  height: 75%;
  box-sizing: border-box;
}
.button
{
    color: white; 
    margin: 5px;
}
.longForm
 {
	display: block;
	width: 50%;
	height: 7em;
	box-sizing: border-box;
	border-radius: 5%;
	background-color: #F7F9FC;
	border: 2px solid #BFBFBF;
	color: #2c3e50;
  margin: 0.10em;
  padding: 2em;
}
.longForm:focus
 {
  background-color: #007BFF;
  color: yellow; 
  font-size: large;
  
 }
.buttonWrapper
{
  border: 1px solid black
}
</style>
