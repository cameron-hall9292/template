
<script setup lang="ts">

import { reactive, inject} from 'vue';

import { type mode } from '../interfaces/interface';

import { type Recipe } from '../interfaces/interface';

import postData from '../api/post';

const appMode = inject<mode>("appMode");

const recipePost: Recipe = reactive
(
    {
        name: null,
        ingredients: null,
        instructions: null,
        type: "main dish",
    }
);

</script>


<template>

  <div id="component-container-post">

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

      <button class="button" @click="postData(recipePost) && appMode?.change('find')" >submit recipe</button>
      <button class="button" @click="appMode?.change('find')" >cancel</button>

  </div>

</template>

<style scoped>

#component-container-post
{
  display: flex;
  border: 3px solid blue;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;
}
#formWrapper
{
  display: flex;
  border: 3px solid black;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;
}
.button
{
    color: white; 
    margin: 5px;
}
.longForm
 {
  display: flex;
  border: 3px solid black;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;
}
.longForm:focus
 {
  background-color: #007BFF;
  color: yellow; 
  font-size: large;
  
 }
#buttonWrapper
{
  border: 1px solid black
}
</style>
