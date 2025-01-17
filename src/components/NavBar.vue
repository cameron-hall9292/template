
<script setup lang="ts">


import { ref, type Ref, onMounted, onBeforeUnmount } from "vue";

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
</script>




<template>


    <div id="navbar-container">

        <nav ref="navbar" class="navbar" :class="{ active: isActive}"  >
            <div id="hamburger-icon" :class="{active: isActive}">hamburger icon
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-menu" id="nav-menu" :class="{ active: isActive }">
                <li>{{ home }}</li>
                <li>{{ index }}</li>
                <li>{{ add }}</li>
            </ul>

    <button id="test-button" @click="toggleActiveState">test button: {{ isActive }}</button>
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
    border: 4px solid red;
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
  border: 3px solid black;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: gray;
  font-size: 1em;
}
.navbar.active
{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
  width: 75%;
  height: 95%;
  border: 3px solid black;
  position: absolute;
}


.nav-menu
{
    border: 2px solid black;
    display: none;
}

.nav-menu li
{
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    width: 100%;
    text-decoration: none;
    margin: 1em;
    font-size: 2em;

}

.nav-menu.active
{
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    height: 50%;
    width: 50%;
    padding: 0;
    margin: 0;
    margin: 1em;
    list-style: none;
}

#hamburger-icon
{
  border: 1px solid black;
  display: flex;
  justify-content: right;
  align-items: right;
  margin: 2em;
}

#hamburger-icon.active
{
    display: none;
}
</style>
