
<script setup lang="ts">


import { ref, type Ref, inject } from "vue";


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


const navigate = (mode) =>
{
    toggleActiveState();
    appMode.change(mode);
}

</script>




<template>


    <div id="nav-container">
        <nav ref="nav" class="nav" :class="{ active: isActive}"  >
                <span @click="navigate(appModes.index)">
                    <FontAwesomeIcon icon="fa-solid fa-list" />
                </span>
                <span @click="navigate(appModes.find)">
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                </span>
                <span id="add" @click="navigate(appModes.create)">

                    <FontAwesomeIcon icon="fa-solid fa-plus" />
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
    border: 4px solid red;
    width: 100vw; 
}

.nav
{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6em;
  border: 3px solid black;
  position: fixed;
  bottom: 0;
  background-color: gray;
  font-size: 1em;
}

.nav span
{
    border: 2px dotted yellow;
    margin: 2em;
    padding: 1em;
}

#add
{

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}




</style>
