
<script setup lang="ts">

import { ref } from 'vue'

const textInput: string = ref("");

</script>


<template>

<input v-model="textInput" placeholder="type text here">

<h2>{{textInput}}</h2>

</template>

<style scoped>

</style>
