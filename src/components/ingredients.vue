



<script setup lang="ts">
import { ref, onMounted, onServerPrefetch } from 'vue'

defineProps<{ Ingredients: String }>()

const text: string = "ingredients"

const titleClass = ref('title')

//const apiData = ref([]);

   //onMounted(() => {
     //fetch('http://localhost:3000/display?name=test')
       //.then(response => response.json())
       //.then(data => {
         //apiData.value = data.rows[0];
       //});
   //});
</script>


<template>

<p :class="titleClass">{{Ingredients}}</p>

</template>

<style scoped>
.title
{
    border: 2px solid black;
}
</style>
