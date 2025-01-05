
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