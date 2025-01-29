
<script setup lang="ts">


import { ref, type Ref, onMounted, onBeforeUnmount, inject } from "vue";


import { type mode } from '../interfaces/interface';

import { appModes } from '../interfaces/appModes';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const appMode = inject<mode>("appMode");

interface Props
{
    home: string,
    index: string,
    add: string,

}

const navbar = ref(null);

let isActive: Ref<boolean> = ref(false);

const { home, index, add }= defineProps<Props>()


const toggleActiveState = (): Ref<boolean> =>
{
    isActive.value = !isActive.value;
    return isActive.value
}

const handleClickOutsideNav = (): boolean =>
{
    if (navbar.value && !navbar.value.contains(event.target))
    {
        isActive.value = false;
        console.log(`isActive: ${isActive.value}`)
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


const navigate = (mode) =>
{
    toggleActiveState();
    appMode.change(mode);
}

</script>




<template>


    <div id="navbar-container">

        <nav ref="navbar" class="navbar" :class="{ active: isActive}"  >
            <div id="hamburger-icon" :class="{active: isActive}" @click="toggleActiveState">
                <FontAwesomeIcon icon="fa-solid fa-bars" size="xl" width="fw" />
            </div>
            <ul class="nav-menu" id="nav-menu" :class="{ active: isActive }">
                <li @click="navigate(appModes.find)">{{ home }}</li>
                <li @click="navigate(appModes.index)"> {{ index }}</li>
                <li @click="navigate(appModes.create)">{{ add }}</li>
            </ul>

        </nav>

    </div>

</template>

<style scoped>

#test-button
{
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
}


#navbar-container
{
    display: flex;
    /* border: 4px solid red; */
    width: 100vw; 
}

.navbar
{
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 4em;
  /* border: 3px solid black; */
  position: fixed;
  top: 0;
  z-index: 1;
  /* background-color: gray; */
  background-color: #FFFAA0;
  /* background-color: #A0A5FF;  */
  box-shadow: 2px 2px 5px;
  transition: all 0.2s ease-in-out;
}



.navbar.active
{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
  width: 65%;
  height: 100%;
  border: 1px solid black;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 2px 2px 5px;
}

.nav-menu
{
    /* border: 2px solid black; */
    display: none;
}

.nav-menu.active
{
    /* border: 2px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    height: 80%;
    width: 80%;
    padding: 0;
    margin: 0;
    /* margin: 1em; */
    list-style: none;
}

.nav-menu li
{
    /* border: 1px solid purple; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 2em;
    text-decoration: none;
    /* margin: 2em; */
    margin-top: 4em;
    font-size: 2em;
    /* box-shadow: 0px 0px 10px 0px; */
    box-shadow: 2px 2px 3px 2px black;
}

@media (min-width: 800px) {
  .navbar.active {

    border: 1px solid black;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    background-color: green;
    width: 100%;
    height: 20%;
  }
    .nav-menu.active
    {
        border: 4px solid black;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 60%;
        margin: 0em;
        width: 100%;
        height: 100%;
        padding: 0;
        /* margin: 1em; */
        list-style: none;
    }
    .nav-menu.active li
    {
        border: 1px solid blue;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        margin: 1em;
        font-size: 2em;
        /* box-shadow: 0px 0px 10px 0px; */
        box-shadow: 2px 2px 3px 2px black;
    }

}


#hamburger-icon
{
  /* border: 1px dotted white; */
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: right;
  margin: 2em;
  padding: 0em;
}


#hamburger-icon.active
{
    display: none;
}
</style>
