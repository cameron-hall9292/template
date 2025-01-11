



export interface Recipe 
{
  name: string | null,
  ingredients: string | null,
  instructions: string | null,
  type: string | null,
}


export interface mode
{
  mode: string,
  change(val: string): string,
    
}
