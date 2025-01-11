
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

  <input id="formName" class="longForm" v-model="recipePut.name" placeholder="enter recipe name">
  <textarea id="formIngredients" class="longForm"  v-model="recipePut.ingredients" placeholder="enter ingredients" ></textarea>
  <textarea id="formInstructions" class="longForm" v-model="recipePut.instructions" placeholder="enter instructions"></textarea>
  <input id="formType" class="longForm" v-model="recipePut.type" placeholder="enter recipe type">
  <button class="button" @click="updateRecipe(recipePut) && appMode?.change('find')">submit update</button>
  <button class="button" @click="appMode?.change('find')" >cancel</button>
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
    height: 30vh;
}
</style>
