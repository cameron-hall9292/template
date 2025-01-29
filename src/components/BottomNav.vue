
<script setup lang="ts">


import { ref, type Ref, inject, computed, reactive } from "vue";


import { type mode } from '../interfaces/interface';

import { appModes } from '../interfaces/appModes';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const appMode = inject<mode>("appMode");

const defaultIconColor = "black";

const colorHighlight = "#F5A0FF";

interface HighLightIcons
{
    home: string,
    index: string,
    add: string,
}

const iconHighlight = reactive<HighLightIcons>(
{
    home: "black",
    index: "black",
    add: "black",

});

const highlightNavIcon = computed(() => 
{
    switch(appMode.mode)
    {
        case "find": 
            iconHighlight.home = colorHighlight;
            iconHighlight.index= defaultIconColor;
            iconHighlight.add = defaultIconColor;
        break;
        case "index":
            iconHighlight.index = colorHighlight;
            iconHighlight.add = defaultIconColor;
            iconHighlight.home = defaultIconColor;
        break;
        case "create":
            iconHighlight.add = colorHighlight;
            iconHighlight.home = defaultIconColor;
            iconHighlight.index = defaultIconColor;
        break;
        default:
            iconHighlight.home = defaultIconColor;
            iconHighlight.index= defaultIconColor;
            iconHighlight.add = defaultIconColor;

    }

    return iconHighlight;

});


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


const navigate = (mode) =>
{
    toggleActiveState();
    appMode.change(mode);
}

</script>




<template>


    <div id="nav-container">
        <nav ref="nav" class="nav" :class="{ active: isActive}"  >
                <span @click="navigate(appModes.index)" :style="{color: highlightNavIcon.index}">
                    <FontAwesomeIcon icon="fa-solid fa-list" size="xl" width="fw" />
                </span>
                <span @click="navigate(appModes.find)" :style="{color: highlightNavIcon.home}">
                    <FontAwesomeIcon icon="fa-solid fa-house" size="xl" width="fw" />
                </span>
                <span id="add" @click="navigate(appModes.create)" :style="{color: highlightNavIcon.add}">

                    <FontAwesomeIcon icon="fa-solid fa-plus" size="xl" width="fw" />
                </span>
        </nav>

    </div>

</template>

<style scoped>



#nav-container
{
    display: flex;
    flex-direction: center;
    align-items: center;
    /* border: 4px solid red; */
    width: 100vw; 
}

.nav
{
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7em;
  /* border: 3px solid black; */
  position: fixed;
  bottom: 0;
  box-shadow: 0px 0px 10px;
  background-color: #FFFAA0;
  /* background-color: #A0A5FF;  */
}

.nav span
{
    border: 2px dotted yellow;
    box-sizing: border-box;
    margin: 2em;
    padding: 0.5em;
}

@media(min-width: 800px)
{
    .nav 
    {
        display: none
    }
}





</style>
