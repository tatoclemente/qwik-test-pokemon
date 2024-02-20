import type { PokemonListResponse, SmallPokemon } from "~/interfaces"



export const getSmallPokemons = async (offset: number = 0, limit: number = 10): Promise<SmallPokemon[]> => {

  console.log(offset);
  
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ limit }&offset=${ offset }`)
  const data = await resp.json() as PokemonListResponse

  return data.results.map(( { url, name } ) => {

    return {
      id: url.split('/').at(-2)!,
      name,
    }

  })
}