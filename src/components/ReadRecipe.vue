

<script setup lang="ts">


import { type Recipe } from '../interfaces/interface';


const props = defineProps<Recipe>();


</script>


<template>

  <div> 
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