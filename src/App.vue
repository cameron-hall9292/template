<script setup lang="ts">

import { ref, reactive, watch, provide} from 'vue'

import FilterRecipes from './components/FilterRecipes.vue';

import PostRecipe from './components/PostRecipe.vue';




import { appModes } from './interfaces/appModes';

import { type mode } from './interfaces/interface';

let appMode = reactive<mode>(
  {
    mode: appModes.index,
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
  appMode.mode = modeVal;
}


</script>

<template>

  <h1>appMode.mode = {{ appMode.mode }}</h1>
  <button v-if="appMode.mode !== appModes.create" class="button" @click="changeMode(appModes.create)">add recipe</button>
  <button v-if="appMode.mode !== appModes.find" class="button" @click="changeMode(appModes.find)">find recipe</button>
  <button v-if="appMode.mode !== appModes.index" class="button" @click="changeMode(appModes.index)">all recipes</button>


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
