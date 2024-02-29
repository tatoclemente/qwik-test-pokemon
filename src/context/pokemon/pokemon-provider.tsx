import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";

import { PokemonGameContext, type PokemonGameState } from "./pokemon-game.context";
import { PokemonListContext, type PokemonListState } from "./pokemon-list.context";



export const PokemonProvider = component$(() => {

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    showBackImage: false,
    hideImage    : true,
  })

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  })

  useContextProvider( PokemonGameContext, pokemonGame)
  useContextProvider(PokemonListContext, pokemonList)
  

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon-game")) {

      const pokemonLocalStorage = JSON.parse(localStorage.getItem("pokemon-game") as string)
      pokemonGame.showBackImage = pokemonLocalStorage.showBackImage
      pokemonGame.hideImage     = pokemonLocalStorage.hideImage
      pokemonGame.pokemonId     = pokemonLocalStorage.pokemonId
    }
    
  })

  useVisibleTask$(({ track }) => {
    track(() => [ pokemonGame.showBackImage, pokemonGame.hideImage, pokemonGame.pokemonId])

    localStorage.setItem( "pokemon-game", JSON.stringify( pokemonGame ) )
    
  })



  return <Slot />
})