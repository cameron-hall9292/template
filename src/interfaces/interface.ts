



export interface Recipe 
{
  name: string | null,
  ingredients: string | null,
  instructions: string | null,
  type: string | null,
}


export interface searchString
{
  value: string,
}


export interface mode
{
  mode: string,
  change(val: string): string,
    
}


export interface recipeLookup
{
  recipeData: Recipe,
  fetchData(value: (string | null)): Promise<any>,

}
