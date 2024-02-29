import { $, useComputed$, useContext } from "@builder.io/qwik"
import { PokemonGameContext } from "~/context"


export const usePokemonGame = () => {

  const pokemonGame = useContext( PokemonGameContext )

  const changePokemonId = $(( value: number ) => {
    if (  ( pokemonGame.pokemonId + value ) > 0 && ( pokemonGame.pokemonId+ value ) < 807 ) {
      pokemonGame.hideImage = true
      pokemonGame.pokemonId += value
    }
  })

  const toggleBackImage = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage
  })

  const toggleIsVisible = $(() => {
    pokemonGame.hideImage = !pokemonGame.hideImage
  })
  


  return {
    pokemonId    : useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    hideImage    : useComputed$(() => pokemonGame.hideImage),

    nextPokemon: $(() => changePokemonId(+1)),
    prevPokemon: $(() => changePokemonId(-1)),

    toggleBackImage,
    toggleIsVisible,
  }
}