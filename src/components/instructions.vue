
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ Instructions: String }>()
const text: string = "instructions"

const titleClass = ref("title");

</script>


<template>

<p :class="titleClass">{{Instructions}}</p>

</template>

<style scoped>
.title
{
    border: 2px solid black;
}
</style>
