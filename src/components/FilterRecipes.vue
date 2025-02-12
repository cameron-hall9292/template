
<script setup lang="ts">

import { ref, reactive, watch, inject, type Ref, onMounted, onBeforeUnmount } from 'vue'

import { type recipeLookup,  } from '../interfaces/interface';

import { baseUrl } from '../api/endpoints';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

let searchString = inject<Ref<string | null>>("searchString");

let filteredApiDataArr  = inject<Ref<string[]>>("filteredApiDataArr")

let recipeLookup = inject<recipeLookup>("selectRecipe");


const searchBar = ref(null);

let isActive: Ref<boolean> = ref(false);

const toggleActiveState = (): Ref<boolean> =>
{
    isActive.value = !isActive.value;
    return isActive.value
}

const handleClickOutsideNav = (): boolean =>
{
    if (searchBar.value && !searchBar.value.contains(event.target))
    {
        isActive.value = false;
        //console.log(`isActive search: ${isActive.value}`)

        //clear out api data array and search string
        filteredApiDataArr.value = [];
        searchString.value = null;
        return isActive.value
    }
    else return false;
}

onMounted(() =>
{
    document.addEventListener("click", handleClickOutsideNav);
});

// Clean up event listeners when component unmounts
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsideNav);
});
 

 const activateSearchDrop = (): void =>
 {

    if (filteredApiDataArr.value)
    {
      if (filteredApiDataArr.value.length > 0)
      {
        isActive.value = true
      }
      else
      {
        isActive.value = false;
      }
    }
    //console.log(`activateSearchDrop called`)

 }


if (searchString !== undefined)
{

  watch(searchString, async () => 
  {
    try 
    {

      //encode search string so it works as query string
      if (searchString.value === null)
      {
        // throw new Error(`argument ${searchString} cannot be null`)
      }
      else 
      {
        encodeURIComponent(searchString.value)
      }

   
      const res = await fetch(
        `${baseUrl}/recipeNames?name=${searchString.value}`
      )

      const response = await res.json();
      //console.log(response)
      const filteredData: string[] = [];

      if (response.rows === undefined) return;
  
      for (let i of response.rows)
        {
          filteredData.push(i.name);
          //console.log(i.name)
        }

      //console.log(`filteredData ${filteredData}`)
      //console.log(filteredData)

      //console.log("filterData api func called")


      if (filteredApiDataArr !== undefined)
      {
        filteredApiDataArr.value = filteredData;

        //console.log(filteredApiDataArr.value)
      }

      //make searchbar drop down if search array contains recipe names
      activateSearchDrop();
      

    } 
    catch (error) 
    {
      console.error(error);
    }
  });

}


 const modSearchContainer = (val: boolean) =>
 {
  //console.log("mod contain called")

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
    //display: "flex",
    //border: "5px dotted red",
    //width: "100%",
    //maxWidth: "100%",
    //maxHeight: "100%", 
    //backgroundColor:"#FFFAA0",
    //borderRadius: "0px",
    //boxShadow: "0 0 8px rgba(76, 175, 80, 0.5)", /* Green glow */
    //borderWidth: "6px",
    //position: "relative"



    display: "flex",
    // border: "3px dotted red",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "2%",
    position: "relative",
    maxWidth: "100%",
    width: "100%",
    height: "100%",
  }
 )

 const searchItemHeight = 1;

 const searchItemPadding = 0.5;

 const searchItemStyle: Record<string, string> = reactive
 (

  {
    //height: `${searchItemHeight}em`,
    //padding: `${searchItemPadding}em`,

    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    maxWidth: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    visibility: "visible"
  }
 )


const searchBarStyle: Record<string, string> = reactive
(
  {

    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "2%",
    position: "relative",
    maxWidth: "100%",
    width: "100%",
    height: "4em",
    border: "2px solid #ccc",
    borderRadius: "35px",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",

  }
)
 const selectSearchItem = (val: string ) =>
 {

  if (searchString !== undefined && recipeLookup !== undefined && filteredApiDataArr !== undefined)
  {
    searchString.value =  val;

    //console.log("selectSearchItem func called")

    //fetch recipe and display it when user clicks recipe name from drop-down
    recipeLookup.fetchData(val)

    //empty item array so that when user returns, the search-field will be empty
    filteredApiDataArr.value = [];
  }

 }


 const eventTestFunc = () =>
 {
  //console.log("pointer is over item")
 }


</script>

<template>

    <h1>Search Recipes</h1>
      <div id="search-container" tabindex="0" ref="searchBar" :class="{ active: isActive}" 
        @pointerleave="blurSearchContainer"   >
        <input ref="input" :class="{ active: isActive }" :style="searchBarStyle" @keydown.enter=" searchString !== undefined && recipeLookup?.fetchData(searchString)"  v-model="searchString" id="searchbar" type="search" name="q"  placeholder="search recipe" autocomplete="off">
        <label class="forScreenReaders" value="searchbar">searchbar for finding recipes</label>
          <div class="searchItemWrapper">
            <div class="dropdown-list" id="dropdownList" >
              <div :class="{ active: isActive }" class="dropdown-item" v-for="item in filteredApiDataArr" :key="item" :value="item" @click="selectSearchItem(item)" ><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="sm" width="fw"  />  &nbsp  {{ item }}</div>
                
            </div>
        </div>
      </div>

</template>

<style scoped>


h1
{
  text-align: center;
}

.searchItemWrapper
{
  /* border: 6px dotted teal; */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;
}


#search-container
{

    display: flex;
    /* border: 3px dotted red; */
    flex-direction: column;
    box-sizing: border-box;
    padding: 2%;
    position: relative;
    max-width: 100%;
    width: 100%;
    height: 100%;
    margin-top: 1em;
}
#search-container.active
{

    /* border: 5px solid purple; */
    background-color:  #FFFFFF;
    box-sizing: border-box;
    border-radius: 30px;
    box-shadow: 2px 2px 5px;
    /* transition: all 0.2s ease-in-out; */
     transition: all 0.3s ease, opacity 0.3s ease;
    visibility: visible;
}

#searchbar
{

    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 2%;
    position: relative;
    max-width: 100%;
    width: 100%;
    height: 4em;
    /* border: 5px solid #ccc; */
    border-radius: 25px;
    outline: none;
    /* box-shadow: 2px 2px 5px; */
    box-shadow: 0px 0px 5px 0px; 
    font-size: 1em;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.dropdown-list
{
  border: 1px solid red;
  padding: 0;
  margin: 0;
  max-width: 100%;
  box-sizing: border-box;
  display:  flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
}

.dropdown-item
{
  margin: 0;
  padding: 0;
  border: 1px solid black;
  display: flex;
  text-align: left;
  /* flex: 1; */
  min-width: 0;
  box-sizing: border-box;
  max-width: 90%;
  width: 100%;
  height: 2em;
  visibility: visible;
  /* border: 1px solid black; */
  margin-top: 1em;
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;

}


.dropdown-item:hover
{
  background-color:	#191970;
  color:white;
  cursor: pointer;
}

.dropdown-item:blur
{
  display: none;
}

#buttonWrapper
{
  /* border: 2px solid black; */
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



/* styling for accessiblity */
.forScreenReaders
{
  display: none;
}

@media(min-width: 800px)
{
  #search-container
  {

      display: flex;
      /* border: 3px dotted red; */
      flex-direction: column;
      box-sizing: border-box;
      padding: 0%;
      position: relative;
      max-width: 50%;
      width: 35%;
      height: 50%;
      margin-top: 1em;
  }

}
</style>
