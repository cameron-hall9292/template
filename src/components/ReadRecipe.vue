

<script setup lang="ts">


import { type Recipe } from '../interfaces/interface';


import { inject, onMounted, ref, reactive } from 'vue'

import { appModes } from '../interfaces/appModes';

import FormButtons from '../components/FormButtons.vue'

import fetchUserPermissions from '../api/permissions';

import generatePDF from '../utils/jsPDF.js'


const appMode = inject<mode>("appMode");

const props = defineProps<Recipe>();

//check if user is logged in and get their user permissions e.g read, write, etc.

let userPermissions = reactive(
  {
    permArr: []
  }
) 

const getPermissions = async () => 
{

  if (sessionStorage.getItem('jwtToken'))
  {
   fetchUserPermissions()
   .then(data => userPermissions.permArr = data.data)
    //console.log(userPermissions.permArr)
  }
}


const checkMarkIngredient = (e) =>
{
  // console.log("ingredient clicked")
  // console.log(e.target.value)

  const ingredient = document.getElementById(e.target.id);

  //console.log(ingredient)

  if (ingredient.dataset.enabled == "true")
  {

    //console.log("if")
    //console.log(ingredient.dataset.enabled)
    ingredient.style.opacity = "0.3" 
    ingredient.dataset.enabled = "false" 
  }

  else if (ingredient.dataset.enabled == "false")
  {
    //console.log("else")
    //console.log(ingredient.dataset.enabled)
    ingredient.style.opacity = "1" 
    ingredient.dataset.enabled = "true" 

  }

}

onMounted(() =>
{
  getPermissions()
});



</script>


<template>

  <div id="component-container-read"> 
    <div id="pdf-container">

      <h1 alt="name of recipe" v-if="props.name">{{ props.name }}</h1>
        <ul class="unordered_list">
          <li @click="checkMarkIngredient" class="list-item"  v-if="props.ingredients" v-for="(item, index) in props.ingredients.split(',')" :id="index" :value="index" :name="item" data-enabled="true"> 
           {{ item }}
          </li>
        </ul>
      <div id="instruction-container">
      <p id="component-instructions" v-if="props.instructions"> {{ props.instructions}}</p>
      </div>
    </div>

    <div id="button-wrapper">
      <FormButtons class="button" @click="appMode.change(appModes.update)" name="edit recipe " :disabled="!userPermissions.permArr.includes('canEdit')"></FormButtons>
      <FormButtons class="button" @click="appMode.change(appModes.delete)" name="delete recipe" :disabled="!userPermissions.permArr.includes('canDelete')"></FormButtons>
      <FormButtons class="button" @click="generatePDF(props)" name="print pdf" :disabled="!userPermissions.permArr.includes('canDelete')"></FormButtons>
    </div>
  </div>
</template>


<style scoped>

#component-container-read
{
  display: flex;
  /* border: 3px dotted black; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  margin-bottom: 2em;
  max-width: 100%;
  width: 100%;
  height: 100%;

  
}

h1 
{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  width: 100%;
}

#pdf-container
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100%;
  /* border: 5px solid black; */
}

.unordered_list 
{
  /* border: 6px solid turquoise;
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  box-sizing: border-box;
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap; 
  justify-content: center;
  align-items: center;
  list-style: disc;
  padding: 0;
  margin: 0;
  list-style-position: inside;


   /* justify-content: space-between; */
   /* max-width: calc(2 * 150px + 20px);  */
}

.list-item
{
  /* border: 1px solid black; */
   /* display: flex; */
  box-sizing: border-box;
  padding: 6%;
  margin: 4px;
  /* height: 4em;
  width: 10em; */
  /* margin: 0%; */
  overflow-wrap: break-word;
  word-break: break-word;
  box-shadow: 0px 0px 5px 0px; 
  /* box-shadow: 2px 2px 3px 2px black; */
  border: 1px solid black;
  font-size: 1em;
  background-color: #FFFCD0; 
  background-color: #F5A0FF; 
  background-color: #A0FFF5; 
  cursor: pointer;

}

#instruction-container
{

  /* border: 1px dotted black; */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 90%;
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 5%;
  font-size: 1em;
  /* box-shadow: 2px 2px 3px 2px black; */
  /* background-color: #FFCA40; 
  background-color: #FFDB70; 
  background-color: #FFFCD0; 
  background-color: #A0FFF5;  */
}

#button-wrapper
{
  /* border: 1px dotted black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1em;

}


@media(min-width: 800px)
{
  #button-wrapper
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1em;
  
  }
  #component-container-read
  {
    /* border: 2px dotted white; */
    width: 50%;
  
  }
}



</style>
