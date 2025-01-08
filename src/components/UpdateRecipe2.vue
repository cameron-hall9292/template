
<script setup lang="ts">

import { ref, reactive, watch, onMounted, onUpdated, onUnmounted, onBeforeUpdate, onActivated} from 'vue'

import { appModes } from '../appModes';

const baseUrl = `http://localhost:3000`;

let searchString = ref<string | null>("testing, testing");



interface RecipePutData 
{
    name: string | null,
    ingredients: string | null,
    instructions: string | null,
    type: string | null
}

const props = defineProps<RecipePutData>();

const emit = defineEmits<{
  (e: 'cancel-edit', payload: { editOn: boolean }): void
  (e: 'app-reset', payload: { mode: string }): void
}>()


const cancelEditRecipe = () => {
  emit('cancel-edit', { editOn: false})
}

const resetApp = () => 
{
  emit('app-reset', { mode: appModes.find });
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


async function updateRecipe(value: RecipePutData) 
{
  try 
  {

    console.log(recipePut.ingredients)


    await fetch(baseUrl + `/display`,
    {

      method: "PUT",
      headers: 
      {

        "Content-Type" : "application/json",
      },


      body: JSON.stringify(value),

    })
  

    console.log(`value: ${value}`)
    console.log(value);

    alert(`recipe for ${value.name} was successfully updated`)
    
    //reset app so it goes back to find recipe mode
    resetApp();
  } 
  catch (error) 
  {
   console.error(error);
  }
}


//testing

//onUpdated(() => {
  //console.log(`the component is now updated.`)
  //recipePut.name = props.name;
  //recipePut.ingredients = props.ingredients;
  //recipePut.instructions = props.instructions;
  //recipePut.type = props.type;
//})

//onUnmounted(() => {
  //console.log(`the component is now unMounted.`)
  //recipePut.name = props.name;
  //recipePut.ingredients = props.ingredients;
  //recipePut.instructions = props.instructions;
  //recipePut.type = props.type;
//})

//onMounted(() => {
  //console.log(`the component is now mounted.`)
  //recipePut.name = props.name;
  //recipePut.ingredients = props.ingredients;
  //recipePut.instructions = props.instructions;
  //recipePut.type = props.type;
//})
  
onMounted(() => {
  console.log(`the component is now mounted.`)
  recipePut.name = props.name;
  recipePut.ingredients = props.ingredients;
  recipePut.instructions = props.instructions;
  recipePut.type = props.type;
})

  //recipePut.name = props.name;
  //recipePut.ingredients = props.ingredients;
  //recipePut.instructions = props.instructions;
  //recipePut.type = props.type;


</script>

<template>

  <input id="formName" class="longForm" v-model="recipePut.name" placeholder="enter recipe name">
  <textarea id="formIngredients" class="longForm"  v-model="recipePut.ingredients" placeholder="enter ingredients" ></textarea>
  <textarea id="formInstructions" class="longForm" v-model="recipePut.instructions" placeholder="enter instructions"></textarea>
  <input id="formType" class="longForm" v-model="recipePut.type" placeholder="enter recipe type">
  <button class="button" @click="updateRecipe(recipePut)">submit update</button>
  <button class="button" @click="cancelEditRecipe" >cancel</button>
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
