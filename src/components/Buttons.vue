
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

  <button >{{ name }}</button>

</template>
