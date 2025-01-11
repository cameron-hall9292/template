<script setup lang="ts">

import { ref, reactive, watch, provide} from 'vue'

import FilterRecipes from './components/FilterRecipes.vue';

import PostRecipe from './components/PostRecipe.vue';


import { appModes } from './appModes';

import { type mode } from './interfaces/interface';

let appMode = reactive<mode>(
  {
    mode: appModes.find,
    change(val: string): string
    {
      this.mode = val;
      return val;
    }
  }
)


provide<mode>("appMode", appMode)

const changeMode = (modeVal: string): void =>
{
  console.log("changemode func called")
  if (modeVal === appModes.find)
  {
    appMode.mode = appModes.find;
  }
  else if (modeVal === appModes.create)
  {
    appMode.mode = appModes.create;
  } 
  else if (modeVal === appModes.delete)
  {
    appMode.mode = appModes.delete;
  }
  else if (modeVal === appModes.update)
  {
    appMode.mode = appModes.update;
  }
  else 
  {
    //do nothing
    return;
  }
}


</script>

<template>

  <h1>appMode.mode = {{ appMode.mode }}</h1>
  <button v-if="appMode.mode !== appModes.create" class="button" @click="changeMode(appModes.create)">add recipe</button>
  <button v-if="appMode.mode !== appModes.find" class="button" @click="changeMode(appModes.find)">find recipe</button>

  <FilterRecipes />

  <PostRecipe v-if="appMode.mode === appModes.create" />

  <!-- <DeleteRecipe v-else-if="appMode.mode === appModes.delete" /> -->


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

</style>
