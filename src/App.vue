<script setup lang="ts">
import search from './components/search.vue'
import Title from './components/Title.vue'
import ingredients from './components/ingredients.vue'
import instructions from './components/instructions.vue'
import { ref, onMounted, onServerPrefetch , watch} from 'vue'


//let searchString: String = ref("cam"); 
let searchString: String = ref('cam');

let textInput: String = ref("");

const count = ref(0);

const apiData = ref([]);

   //onMounted(() => {
     //fetch(`http://localhost:3000/display?name=${searchString}`)
       //.then(response => response.json())
       //.then(data => {
         //apiData.value = data.rows[0];
       //});
   //});
const todoId = ref(1)
const todoData = ref([])
  //async function fetchData() {
  //todoData.value = null
  //const res = await fetch(
    //`http://localhost:3000/display?name=${searchString.value}`
  //)
  //todoData.value = await res.json()

  //console.log(`searchString.value: ${searchString.value}`)
//}

fetchData();

const exampleText = "test string"

//watch(searchString, fetchData)
  
</script>

<template>
  <input v-model="searchString" placeholder="type text here">
  <p>{{ textInput }}</p>
  <button @click="fetchData" >Fetch next todo</button>
  <div>{{ searchString }}</div>

  <button @click="count++">Add 1</button>
  <p>Count is: {{ count }}</p>
</template>

<style scoped>

</style>
