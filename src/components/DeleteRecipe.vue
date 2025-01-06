
<script setup lang="ts">

import { ref, reactive, watch} from 'vue'

const baseUrl = `http://localhost:3000`;

let searchString = ref<string | null>("testing, testing");

let filteredApiDataArr: string[] = [];

function filteredList() {
  return filteredApiDataArr.filter((item) =>
    item.toLowerCase().includes(searchString.value.toLowerCase())
  );
}

async function deleteRecipe(value: (string | null)) 
{
  try 
  {
    console.log(`recipeName: ${value}`)
    console.log(value)
    //searchString.value = "test"
    await fetch(baseUrl + `/display?name=${value}`,
    {

      method: "DELETE",

    })
  
    //reset searchString value
    searchString.value = "";

    //reset search array
    filteredApiDataArr = [];

    alert(`recipe for ${value} was successfully deleted`)
  } 
  catch (error) 
  {
   console.error(error);
  }
}



watch(searchString, async () => 
{

  try 
  {
    console.log(`searchString: ${searchString.value}`)
    //searchString.value = "test"
    const res = await fetch(
      `http://localhost:3000/recipeNames?name=${searchString.value}`
    )

  
    const response = await res.json();
    console.log(response)
    const filteredData: string[] = [];
  
    for (let i of response.rows)
      {
        filteredData.push(i.name);
        //console.log(i.name)
      }

    console.log(`filteredData ${filteredData}`)
    console.log(filteredData)

    console.log("filterData api func called")

    filteredApiDataArr = filteredData;
      

  } 
  catch (error) 
  {
    console.error(error);
  }
});

  
</script>

<template>

  <input v-model="searchString" placeholder="type text here">
  <div v-for="item in filteredList()" :key="item">
    <button class="listButton" @click="deleteRecipe(item)">{{ item }}</button>
  </div>
  <div class="item error" v-if="searchString&&!filteredList().length">
     <p>No results found!</p>
  </div>
</template>

<style scoped>

.button
{
  color:white;
  margin: 5px;
}
.listButton
{
  color: black;
  background-color: #FFFAA0;
  margin: 2px;
}

</style>
