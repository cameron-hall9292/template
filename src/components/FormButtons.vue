
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
    padding: 2%;

}



</style>
