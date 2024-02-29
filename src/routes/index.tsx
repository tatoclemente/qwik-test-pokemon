import { $, component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

import { usePokemonGame } from "~/hooks/use-pokemon-game";


export default component$(() => {

  const nav = useNavigate()
  

  const { 
    pokemonId, 
    showBackImage, 
    hideImage, 
    toggleBackImage, 
    toggleIsVisible,
    nextPokemon, 
    prevPokemon
  } = usePokemonGame()
  

  const goToPokemon = $(() => {
    nav(`/pokemon/${ pokemonId.value }`)
  })

  return (
    <>
      
      <span class='text-2xl'>Buscador simple</span>

      <span class='text-9xl'>{ pokemonId }</span>

      <div class='cursor-pointer' onClick$={ goToPokemon }>
        <PokemonImage 
          id={pokemonId.value} 
          size={ 150 } 
          backImage={ showBackImage.value } 
          isVisible={ hideImage.value } 
        />
      </div>
      
      <div class='mt-2'>
        <button disabled={ pokemonId.value === 1 }  onClick$={ prevPokemon } class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={ nextPokemon } class='btn btn-primary mr-2'>Siguiente</button>
        <button onClick$={ toggleBackImage } class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={ toggleIsVisible } class='btn btn-primary mr-2'>Revelar</button>
      </div>

    </>
  );
});



export const head: DocumentHead = {
  title: "Poke Qwik",
  meta: [
    {
      name: "description",
      content: "Mi primera app con Qwik",
    },
  ],
};
