<script setup lang="ts">

import { ref, reactive, watch} from 'vue'

import FilterRecipes from './components/FilterRecipes.vue';

import PostRecipe from './components/PostRecipe.vue';

import DeleteRecipe from './components/DeleteRecipe.vue';

import UpdateRecipe from './components/UpdateRecipe.vue';

const baseUrl = `http://localhost:3000`;


enum appModes 
{
  find = "find",
  create = "create",
  delete = "delete",
  update = "update"

}

let appMode = reactive(
  {
    mode: appModes.find,
  }
)

const changeMode = (modeVal: string): void =>
{
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

  <h1>{{ appMode.mode }}</h1>
  <button v-if="appMode.mode !== appModes.create" class="button" @click="changeMode(appModes.create)">add recipe</button>
  <button v-if="appMode.mode !== appModes.find" class="button" @click="changeMode(appModes.find)">find recipe</button>
  <button v-if="appMode.mode !== appModes.update" class="button" @click="changeMode(appModes.update)">edit recipe</button>
  <button v-if="appMode.mode !== appModes.delete" class="button" @click="changeMode(appModes.delete)">delete recipe</button>

  <FilterRecipes v-if="appMode.mode === appModes.find"/>

  <PostRecipe v-else-if="appMode.mode === appModes.create" />

  <DeleteRecipe v-else-if="appMode.mode === appModes.delete" />

  <UpdateRecipe v-else-if="appMode.mode === appModes.update" />

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
