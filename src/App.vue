<script setup lang="ts">

import { ref, reactive, watch, provide} from 'vue'

import FilterRecipes from './components/FilterRecipes.vue';

import PostRecipe from './components/PostRecipe.vue';

import DeleteRecipe from './components/DeleteRecipe.vue';

import UpdateRecipe from './components/UpdateRecipe.vue';

import { appModes } from './appModes';

import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();

const baseUrl = `http://localhost:3000`;

const count = ref(0);

//enum appModes 
//{
  //find = "find",
  //create = "create",
  //delete = "delete",
  //update = "update"

//}

let appMode = reactive(
  {
    mode: appModes.find,
  }
)

const updateMode = (val: any) =>
{
  appMode.mode = val;
}

provide("appMode", 
  {
    appMode,
    updateMode,
  }
)
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

const appReset = (payload: object): void =>
{
  //changeMode(payload.mode);
  appMode.mode = appModes.find;
  count.value++;
  console.log(count.value);

}

const enterEditMode = (): void => 
{
  appMode.mode = appModes.update;
}

</script>

<template>

<h1>The current count is: {{ count }}</h1>
  <h1>{{ appMode.mode }}</h1>
  <button v-if="appMode.mode !== appModes.create" class="button" @click="changeMode(appModes.create)">add recipe</button>
  <button v-if="appMode.mode !== appModes.find" class="button" @click="changeMode(appModes.find)">find recipe</button>

  <FilterRecipes v-if="appMode.mode === appModes.find || appMode.mode === appModes.update"
    @app-reset="appReset" @app-edit="enterEditMode" />

  <PostRecipe v-else-if="appMode.mode === appModes.create" />

  <DeleteRecipe v-else-if="appMode.mode === appModes.delete" />


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
