import { $, component$, useContext } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";


export default component$(() => {

  const nav = useNavigate()

  // const pokemonId = useSignal(1) // datos primitivos, booleans, string
  // const showBackImage = useSignal(false)
  // const hideImage = useSignal(true)

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


  const goToPokemon = $(() => {
    nav(`/pokemon/${ pokemonGame.pokemonId }`)
  })

  return (
    <>
      
      <span class='text-2xl'>Buscador simple</span>

      <span class='text-9xl'>{ pokemonGame.pokemonId }</span>

      <div class='cursor-pointer' onClick$={ goToPokemon }>
        <PokemonImage 
          id={pokemonGame.pokemonId} 
          size={ 150 } 
          backImage={ pokemonGame.showBackImage } 
          isVisible={ pokemonGame.hideImage } 
        />
      </div>
      
      <div class='mt-2'>
        <button disabled={ pokemonGame.pokemonId === 1 }  onClick$={ () => changePokemonId(-1) } class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={ () => changePokemonId(+1) } class='btn btn-primary mr-2'>Siguiente</button>
        <button onClick$={ toggleBackImage } class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={ () => pokemonGame.hideImage = !pokemonGame.hideImage } class='btn btn-primary mr-2'>Revelar</button>
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
