
<script setup lang="ts">



//const props = defineProps<{
  //name?: string,

//}>()

interface Props
{
    name: string,

}


const { name }= defineProps<Props>()

</script>




<template>

  <button class="form-button">{{ name }}</button>

</template>

<style scoped>

.form-button
{
    color: black;
    font-size: 1em;
    margin: 1em;
    height: 4em;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 15px;
    background-color: #FFFAA0;
    box-shadow: 2px 2px 3px 2px; 

}

.form-button:active
{
  color: white;
  background-color: blue;
  transition: 0.1s;
}


</style>
