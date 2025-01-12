
<script setup lang="ts">

import { inject, reactive, onMounted  } from 'vue'

import updateRecipe from '../api/update';

import { type mode } from '../interfaces/interface';

const appMode = inject<mode>("appMode");

interface RecipePutData 
{
    name: string | null,
    ingredients: string | null,
    instructions: string | null,
    type: string | null
}

const props = defineProps<RecipePutData>();


const recipePut: RecipePutData = reactive
(

    {
        name: null,
        ingredients: null,
        instructions: null,
        type: null,
    }
)

onMounted(() => {
  console.log(`the component is now mounted.`)
  recipePut.name = props.name;
  recipePut.ingredients = props.ingredients;
  recipePut.instructions = props.instructions;
  recipePut.type = props.type;
})


</script>

<template>

  <div id="templateWrapper">

    <div id="formWrapper">

  <input id="formName" class="longForm" v-model="recipePut.name" placeholder="enter recipe name">
  <textarea id="formIngredients" class="longForm"  v-model="recipePut.ingredients" placeholder="enter ingredients" ></textarea>
  <textarea id="formInstructions" class="longForm" v-model="recipePut.instructions" placeholder="enter instructions"></textarea>
  <select class="longForm" placeholder="select recipe type" v-model="recipePut.type"  >
    <optgroup label="recipe types">
      <option value="main dish">main dish</option>
      <option value="side dish">side dish</option>
      <option value="soup/chili">soup/chili</option>
      <option value="dessert">dessert</option>
    </optgroup>
  </select>
    </div>
  <button class="button" @click="updateRecipe(recipePut) && appMode?.change('find')">submit update</button>
  <button class="button" @click="appMode?.change('find')" >cancel</button>
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
