
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
    width: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 35px;
    background-color: #FFFAA0;
    /* background-color: #F5A0FF; */
    /* box-shadow: 2px 2px 3px 2px;  */
    box-shadow: 0px 0px 5px 0px; 
    border: 1px solid #ccc;

}

.form-button:active
{
  color: white;
  background-color: blue;
  transition: 0.1s;
}

@media(min-width: 800px)
{
  .form-button
  {
    width: 12em;
  }
}


</style>
