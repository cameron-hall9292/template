

<script setup lang="ts">


import { type Recipe } from '../interfaces/interface';


import { inject } from 'vue'

import { appModes } from '../interfaces/appModes';

import FormButtons from '../components/FormButtons.vue'

const appMode = inject<mode>("appMode");

const props = defineProps<Recipe>();


</script>


<template>

  <div id="component-container-read"> 
    <h2 v-if="props.name">{{ props.name }}</h2>
      <ul class="unordered_list">
        <li class="list-item"  v-if="props.ingredients" v-for="(item, index) in props.ingredients.split(',')"> 
          {{index + 1}}. {{ item }}
        </li>
      </ul>
    <div id="instruction-container">
    <p id="component-instructions" v-if="props.instructions"> {{ props.instructions}}</p>
    </div>

    <div id="button-wrapper">
      <FormButtons class="button" @click="appMode.change(appModes.update)" name="edit recipe "></FormButtons>
      <FormButtons class="button" @click="appMode.change(appModes.delete)" name="delete recipe"></FormButtons>
    </div>
  </div>
</template>


<style scoped>

#component-container-read
{
  display: flex;
  border: 3px dotted black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;

  
}

.unordered_list 
{
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: calc(2 * 150px + 20px); */
  list-style: number;
  padding: 4%;
  border: 2px solid turquoise;
  list-style-position: inside;
  margin: 2%;
}

.list-item
{
  border: 1px solid black;
  display: flex;
  text-align: center;
  padding: 4%;
  margin: 4%;
  overflow-wrap: break-word;
  word-break: break-word;

}

#instruction-container
{

  border: 1px dotted black;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 90%;
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 5%;
}

#button-wrapper
{
  border: 1px dotted black;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;

}

.button
{
  margin: 1em;
  height: 4em;
}



</style>
