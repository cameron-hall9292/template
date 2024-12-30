<script setup lang="ts">
import search from './components/search.vue'
import Title from './components/Title.vue'
import ingredients from './components/ingredients.vue'
import instructions from './components/instructions.vue'
import { ref, onMounted, onServerPrefetch , watch} from 'vue'


//let searchString: String = ref("cam"); 
//let searchString: any = ref('cam');

let searchString = ref<string>("cam");

//let textInput: any = ref("");

let textInput = ref<string>("");

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

  async function fetchData() {
  const res = await fetch(
    `http://localhost:3000/display?name=${searchString.value}`
  )
  await console.log("fetch func called")
  apiData.value = await res.json()

  console.log(`searchString.value: ${searchString.value}`)
  console.log(apiData);

}

//fetchData();

const testButtonFunc = () =>
{
  console.log(searchString)
}



//watch(searchString, fetchData)
  
</script>

<template>
  <input v-model="searchString" placeholder="type text here">
  <p>{{ textInput }}</p>
  <button class="button" @click="fetchData" >Fetch next todo</button>
  <div>{{ searchString }}</div>

  <button class="button" @click="count++">Add 1</button>
  <p>apiData.value: {{ apiData.rows}}</p>
</template>

<style scoped>

.button
{
  color:white;
}

</style>
