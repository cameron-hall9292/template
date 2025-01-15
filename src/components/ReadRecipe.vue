

<script setup lang="ts">


import { type Recipe } from '../interfaces/interface';


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
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 10%;
}



</style>
