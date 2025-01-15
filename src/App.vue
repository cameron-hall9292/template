<script setup lang="ts">

import { ref, reactive, watch, provide, type Ref } from 'vue'

import FilterRecipes from './components/FilterRecipes.vue';

import PostRecipe from './components/PostRecipe.vue';

import UpdateRecipe2 from './components/UpdateRecipe2.vue';

import Read from './components/ReadRecipe.vue';

import allRecipes from './components/allRecipes.vue';

import { type mode, type recipeLookup,} from './interfaces/interface';

import { appModes } from './interfaces/appModes';

import { baseUrl } from './api/endpoints';
import ReadRecipe from './components/ReadRecipe.vue';
import DeleteRecipe from './components/DeleteRecipe.vue';

//define key data that will be all components must
//share and potentially mutate. the search-string
//will be used for querying searchbar and the 
//array will be used for storing data fetched
//from the backend server that matches the search-string
//typed into the searchbar. since this will be a SPA,
//(single page app), I want to be able to access
//this data from each component so I can rerender the page
//using this data

let searchString: Ref<string | null> = ref("");

provide<Ref<string | null>>("searchString", searchString);

let filteredApiDataArr: Ref<string[]> = ref<string[]>([]) 

provide<Ref<string[]>>("filteredApiDataArr", filteredApiDataArr);

//the object below will be used for data fetches and
//holding the value of individual fetched recipes, i.e.
//recipes selected by the user. By defining this data
//in the root App component and providing it to all 
//descendants, I will be able to resuse this data 
//in all child components. For example, if the user
// selects a given recipe in the search component,
//I can allow the user to enter the edit component 
//via a button click and then within the button component,
//render the current recipe that was selected in the search
//component.  

let recipeLookup = reactive<recipeLookup>
  (
    {
      recipeData: reactive({
        name: null,
        ingredients: null,
        instructions: null,
        type: null,
      }),
      async fetchData(value: (string | null)): Promise<any>
      {
        try 
        {
          const res = await fetch(
            `${baseUrl}/display?name=${value}`
          )
  
          await res.json()

          .then(data => this.recipeData = data.rows[0])

          //reset after data fetch

          //reset searchString to null
          searchString.value = "";

          //reset search array
          filteredApiDataArr.value = [];

          //change to read mode
          //so user can read recipe
          //after data has been fetched
    
    appMode?.change(appModes.read);
          console.log("fetchData func called")
        } 
        catch (error) 
        {
        this.recipeData.name = null;
        this.recipeData.ingredients = null;
        this.recipeData.instructions = null;
        //console.error(error);
        }
      }

    }
  )

provide<recipeLookup>("selectRecipe", recipeLookup);


let appMode = reactive<mode>(
  {
    mode: appModes.find,
    change(val: string): string
    {
      this.mode = val;
      return val;
    }
  }
)

provide<mode>("appMode", appMode)



</script>

<template>

  <div id="father-container">

  <div id="button-container">
    <button v-if="appMode.mode !== appModes.create" class="button" @click="appMode.change(appModes.create)">add recipe</button>
    <button v-if="appMode.mode !== appModes.find" class="button" @click="appMode.change(appModes.find)">find recipe</button>
    <button v-if="appMode.mode !== appModes.index" class="button" @click="appMode.change(appModes.index)">all recipes</button>
    <button v-if="appMode.mode !== appModes.update" class="button" @click="appMode.change(appModes.update)">edit recipe</button>
    <button v-if="appMode.mode !== appModes.delete" class="button" @click="appMode.change(appModes.delete)">delete recipe</button>

  </div>
  <h4>appMode.mode = {{ appMode.mode }}</h4>


  <div id="component-container">

    <FilterRecipes v-if="appMode.mode === appModes.find"/>
    <UpdateRecipe2 v-else-if="appMode.mode === appModes.update" :name="recipeLookup.recipeData.name" 
    :ingredients="recipeLookup.recipeData.ingredients" 
    :instructions="recipeLookup.recipeData.instructions" 
    :type="recipeLookup.recipeData.type" 
    />
    <PostRecipe v-else-if="appMode.mode === appModes.create" />

    <ReadRecipe v-else-if="appMode.mode === appModes.read" :name="recipeLookup.recipeData.name" 
    :ingredients="recipeLookup.recipeData.ingredients" 
    :instructions="recipeLookup.recipeData.instructions" 
    :type="recipeLookup.recipeData.type" 
    />

    <DeleteRecipe v-else-if="appMode.mode === appModes.delete" :name="recipeLookup.recipeData.name" 
    :ingredients="recipeLookup.recipeData.ingredients" 
    :instructions="recipeLookup.recipeData.instructions" 
    :type="recipeLookup.recipeData.type" 
    />
  
    <allRecipes v-else-if="appMode.mode === appModes.index"/>

  </div>


</div>

</template>

<style scoped>


#template
{
  border: 5px solid black;
  background-color: black;
}

#father-container
{
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid purple;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0%;
}
@media (min-width: 800px) {
  #father-container {

    background-color: white;
  }
}

#component-container
{
  display: flex;
  border: 3px solid maroon;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;

}

#button-container
{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 3px dotted orange;
  padding: 2%;
  max-width: 100%;
  height: 20%;
  width: 100%;
}

.button
{
  
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dotted blue;
  box-sizing:border-box;
  color: black;
  padding: 5%;
  max-width: 100%;
  width: 20%;
  height: 20%;
  margin: 2%;
  
}

</style>
