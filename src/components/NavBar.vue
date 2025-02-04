
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
  /* transition: all 0.2s ease-in-out; */
  animation: mobileNavClose 0.5s ease-in-out forwards;
}



.navbar.active
{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
  width: 60%;
  height: 100%;
  /* border: 1px solid black; */
  position: fixed;
  cursor: pointer;
  animation: mobileNav 0.5s ease-in-out forwards;
  /* box-shadow: 2px 2px 5px; */

}

@keyframes mobileNav {

    0% { transform: translateX(-200%); }

    /* 25% { transform: translateX(-100%); }

    50% { transform: translateX(-50%); } */
    /* 50% { transform: translateX(-20%); } */
    100% { transform: translateX(0%); }

}

@keyframes mobileNavClose {

    0% { transform: translateX(-200%); }
    /* 50% { transform: translateX(-20%); } */
    100% { transform: translateX(0%); }

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
    justify-content: center;
    align-items: left;
    height: 100%;
    width: 60%;
    padding: 1em;
    margin: 0;
    background-color: #FFFAA0;
    position: fixed;
    transition: all 0.2s ease-in-out;
    /* box-shadow: 2px 2px 5px; */
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
    /* width: 90%; */
    text-decoration: none;
    /* margin: 2em; */
    margin-top: 4em;
    font-size: 2em;
    font-weight: bold;
    /* box-shadow: 0px 0px 10px 0px; */
    /* box-shadow: 2px 2px 3px 2px black; */
}

@media (min-width: 800px) {

    @keyframes desktopNav{

    0% { transform: translateX(0); }
    50% { transform: translateX(0);}
    100% { transform: translateX(0);  }
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
    animation: desktopNav ease-in-out forwards;
    }
  .navbar.active {

    /* border: 1px solid black; */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 20%;
    position: fixed;
    transition: all 0.2s ease-in-out;
    /* animation: desktopNav 0.2s ease-in-out; */
    animation: desktopNav ease-in-out forwards;
  
  }
    .nav-menu.active
    {
        /* border: 4px solid black; */
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        height: 20%;
        margin: 0em;
        width: 100%;
        padding: 0;
        position: fixed;
        z-index: 1;
        /* box-shadow: 2px 2px 5px; */
        /* margin: 1em; */
        list-style: none;
    }
    .nav-menu.active li
    {
        /* border: 1px solid #F5A0FF; */
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        margin: 1em;
        font-size: 2em;
        padding: 1em;
        /* box-shadow: 0px 0px 10px 0px; */
        /* box-shadow: 2px 2px 3px 2px black; */
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
