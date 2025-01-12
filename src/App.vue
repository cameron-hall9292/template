<script setup lang="ts">

import { ref, reactive, watch, provide} from 'vue'

import FilterRecipes from './components/FilterRecipes.vue';

import PostRecipe from './components/PostRecipe.vue';




import { appModes } from './interfaces/appModes';

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
  appMode.mode = modeVal;
}


</script>

<template id="template">

  <div id="father-container">

  <div id="button-container">
  <!-- <h1>appMode.mode = {{ appMode.mode }}</h1> -->
    <button v-if="appMode.mode !== appModes.create" class="button" @click="changeMode(appModes.create)">add recipe</button>
    <button v-if="appMode.mode !== appModes.find" class="button" @click="changeMode(appModes.find)">find recipe</button>
    <button v-if="appMode.mode !== appModes.index" class="button" @click="changeMode(appModes.index)">all recipes</button>


  <FilterRecipes />

  </div>



  <PostRecipe v-if="appMode.mode === appModes.create" />

  <!-- <DeleteRecipe v-else-if="appMode.mode === appModes.delete" /> -->

</div>

</template>

<style scoped>

#father-container
{
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid purple;
  width: 75vw;
  height: 75vh;
}
@media (min-width: 800px) {
  #father-container {

    background-color: white;
  }
}

#button-container
{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 3px dotted orange;
  padding: 10%;
  margin: 2%;
  position: relative;
  max-width: 100%;
  height: 100%;
  width: 100%;

}
.button
{
  
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dotted blue;
  box-sizing:border-box;
  color:white;
  margin: 10px;
  max-width: 100%;
  width: 100%;
  height: 20%;
}

</style>
