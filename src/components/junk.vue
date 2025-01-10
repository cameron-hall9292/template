
  <title>{{ apiData.name }}</title>
  <Title :titleHeader="apiData.name" />
  <ingredients :Ingredients="apiData.ingredients" />
  <instructions :Instructions="apiData.instructions" />
  <div>{{ todoData.rows[0].name }}</div>

  <p v-if="recipeName">recipeName: {{ recipeName }}</p>
  <p v-else>Oh no!!!!</p>
  <p v-if="recipeIngredients">recipeIngredients: {{ recipeIngredients}}</p>
  <p v-else>Oh no!!!!</p>
  <p v-if="recipeInstructions">recipeInstructions: {{ recipeInstructions }}</p>
  <p v-else>Oh no!!!!</p>
      
      <datalist id="recipes">
        <option v-for="item in filteredApiDataArr" :key="item" :value="item" >{{ item }}</option>
      </datalist>



      <input v-model="searchString" placeholder="type text here">
      <div v-for="item in filteredApiDataArr" :key="item">
        <button class="listButton" @click="fetchData(item)">{{ item }}</button>
      </div>


      <datalist id="ice-cream-flavors" v-for="item in filteredApiDataArr" :key="item">
        <option value={{ item }}></option>
      </datalist>


  <div></div>
  <input v-model="searchString" placeholder="type text here">
  <div v-for="item in filteredList()" :key="item">
    <button class="listButton" @click="fetchData(item)">{{ item }}</button>
  </div>
  <div class="item error" v-if="searchString&&!filteredList().length">
     <p>No results found!</p>
  </div>

async function fetchData(value: (string | null)) 
{
  try 
  {
  
    //searchString.value = "test"
    const res = await fetch(
      `http://localhost:3000/display?name=${value}`
    )
  
    //apiData.value = await res.json()
    apiData = await res.json()


    recipeName = await apiData.rows[0].name;
    recipeIngredients = await apiData.rows[0].ingredients;
    recipeInstructions = await apiData.rows[0].instructions;

    console.log(recipeName);

    console.log("api func called")
  } 
  catch (error) 
  {
   recipeName = null;
    recipeIngredients = null;
    recipeInstructions = null;
    console.error(error);
  }
}

