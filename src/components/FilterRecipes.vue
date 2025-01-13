
<script setup lang="ts">

import { ref, reactive, watch, inject, type Ref } from 'vue'

import { type recipeLookup,  } from '../interfaces/interface';

import { baseUrl } from '../api/endpoints';

let searchString = inject<Ref<string | null>>("searchString");

let filteredApiDataArr  = inject<Ref<string[]>>("filteredApiDataArr")

let recipeLookup = inject<recipeLookup>("selectRecipe");


if (searchString !== undefined)
{

  watch(searchString, async () => 
  {
    try 
    {

      //encode search string so it works as query string
      if (searchString.value === null)
      {
        throw new Error(`argument ${searchString} cannot be null`)
      }
      else 
      {
        encodeURIComponent(searchString.value)
      }
   
      const res = await fetch(
        `${baseUrl}/recipeNames?name=${searchString.value}`
      )

      const response = await res.json();
      console.log(response)
      const filteredData: string[] = [];

      if (response.rows === undefined) return;
  
      for (let i of response.rows)
        {
          filteredData.push(i.name);
          //console.log(i.name)
        }

      console.log(`filteredData ${filteredData}`)
      console.log(filteredData)

      console.log("filterData api func called")


      if (filteredApiDataArr !== undefined)
      {
        filteredApiDataArr.value = filteredData;

        console.log(filteredApiDataArr.value)
      }
      

    } 
    catch (error) 
    {
      console.error(error);
    }
  });

}


 const modSearchContainer = (val: boolean) =>
 {
  console.log("mod contain called")

  //change style prop of search container

  if (val)
  {
    searchContainerStyle.border = "5px solid purple"
    searchContainerStyle.backgroundColor = "#FFFFFF"
    searchContainerStyle.borderRadius = "30px"
    //searchContainerStyle.height  = `${filteredApiDataArr.value.length * 4}em`;
    searchItemStyle.visibility = "visible"
  }
  else 
  {

    searchContainerStyle.border = "5px solid red"
    searchContainerStyle.backgroundColor = "#FFFAA0"
    searchContainerStyle.borderRadius = "0px"
    
    //searchContainerStyle.height = "0px"
    //searchItemStyle.visibility = "hidden"
  }

  return;

 }

 const input = ref<HTMLInputElement>();

 const blurSearchContainer = () =>
 {

    searchContainerStyle.border = "5px solid red"
    searchContainerStyle.backgroundColor = "#FFFAA0"
    searchContainerStyle.borderRadius = "0px"
    //reset search filter
    //filteredApiDataArr.value = [];
    searchItemStyle.visibility = "hidden"
    //register a click event
    if (input.value !== null && input.value !== undefined)
    {
      input.value.blur()
    }
    else
    {
      //do nothing
    }
 }
//expand search box based on number of items fetched by the search string

//watch(filteredApiDataArr, () => 
//{

    //const initialSearchBarHeight = 2.5 //em
    //const itemDivHeight = searchItemHeight + searchItemPadding * 2
    //searchContainerStyle.height  = `${initialSearchBarHeight + itemDivHeight + (filteredApiDataArr.value.length * (itemDivHeight))}em`;
    //console.log(searchContainerStyle.height)
//})

 const searchContainerStyle: Record<string, string> = reactive
 (
  {
    display: "flex",
    border: "5px dotted red",
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%", 
    backgroundColor:"#FFFAA0",
    borderRadius: "0px",
    boxShadow: "0 0 8px rgba(76, 175, 80, 0.5)", /* Green glow */
    borderWidth: "2px",
    position: "absolute"
  }
 )

 const searchItemHeight = 1;

 const searchItemPadding = 0.5;

 const searchItemStyle: Record<string, string> = reactive
 (
  {
    height: `${searchItemHeight}em`,
    padding: `${searchItemPadding}em`,


    maxWidth: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    visibility: "visible"
  }
 )


const searchBarStyle: Record<string, string> = reactive
(
  {
    width: "100%",
    height: "2.5em",
    padding: "10px 40px 10px 15px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "25px",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    position: "absolute"

  }
)
 const selectSearchItem = (val: string ) =>
 {

  if (searchString !== undefined && recipeLookup !== undefined && filteredApiDataArr !== undefined)
  {
    searchString.value =  val;

    console.log("selectSearchItem func called")
  
    //collapse search bar after user has clicked an item from the drop-down list
    modSearchContainer(false);

    //fetch recipe and display it when user clicks recipe name from drop-down
    recipeLookup.fetchData(val)

    //empty item array so that when user returns, the search-field will be empty
    filteredApiDataArr.value = [];
  }

 }


</script>

<template>

  <div id="father-container">
    <p>filteredApiDataArr: {{ filteredApiDataArr }}</p>
    <p>searchString: {{ searchString}}</p>
    <div  id="searchWrapper">
      <div id="search-container" tabindex="0"  
        :style="searchContainerStyle"  @pointerleave="blurSearchContainer"   >
        <input ref="input" :style="searchBarStyle" @keydown.enter=" searchString !== undefined && recipeLookup?.fetchData(searchString)" @pointerenter="modSearchContainer(true)" @focus="modSearchContainer(true)"  v-model="searchString" id="searchbar" type="search" name="q"  placeholder="search recipe" autocomplete="off">
        <label class="forScreenReaders" value="searchbar">searchbar for finding recipes</label>
          <div class="searchItemWrapper">
            <div class="dropdown-list" id="dropdownList" >
              <div :style="searchItemStyle" class="dropdown-item" v-for="item in filteredApiDataArr" :key="item" :value="item" @click="selectSearchItem(item)">{{ item }}</div>
            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>


#father-container
{
  border: 3px solid gray;
}

#searchWrapper
{
  display: flex;
  
  border: 3px solid black;
  box-sizing: border-box;
  width: 100%;
}

.searchItemWrapper
{
  display: flex;
  box-sizing: border-box;
  max-width: 100%;
  width: 100%;
  margin-top: 3em;
  /* padding-top: 15%; */
  border: 3px dotted teal;
}

.dropdown-item
{
  width: 100%;
  border: 2px solid black;
}


.dropdown-item:hover
{
  background-color: blue;
  color:white;
}

.dropdown-item:blur
{
  display: none;
}

#buttonWrapper
{
  border: 2px solid black;
}

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
.ingredientList
{
  list-style-position: inside;
}
.unordered_list 
{
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  border: 2px solid black;
}



/* styling for accessiblity */
.forScreenReaders
{
  display: none;
}
</style>
