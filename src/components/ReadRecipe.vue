

<script setup lang="ts">


import { type Recipe } from '../interfaces/interface';


const props = defineProps<Recipe>();


</script>


<template>

  <div id="component-container-read"> 
    <h2 v-if="props.name">{{ props.name }}</h2>
      <ul class="unordered_list">
        <li  v-if="props.ingredients" v-for="(item) in props.ingredients.split(',')"> 
          {{ item }}
        </li>
      </ul>
    <p v-if="props.instructions"> {{ props.instructions}}</p>
    <div id="buttonWrapper">
    </div>
  </div>
</template>


<style scoped>

#component-container-read
{
  display: flex;
  border: 3px dotted black;
  flex-direction: column;
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
  list-style: none;
  border: 2px solid black;
  list-style-position: inside;
}




</style>
