import { $, component$, useSignal } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";


export default component$(() => {

  const nav = useNavigate()

  const pokemonId = useSignal(1) // datos primitivos, booleans, string
  const showBackImage = useSignal(false)
  const hideImage = useSignal(true)


  const changePokemonId = $(( value: number ) => {
      if (  ( pokemonId.value + value ) > 0 && ( pokemonId.value + value ) < 807 ) {
        hideImage.value = true
        pokemonId.value += value
      }
  })

  const toggleBackImage = $(() => {
    showBackImage.value = !showBackImage.value
  })


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
        <button disabled={ pokemonId.value === 1 }  onClick$={ () => changePokemonId(-1) } class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={ () => changePokemonId(+1) } class='btn btn-primary mr-2'>Siguiente</button>
        <button onClick$={ toggleBackImage } class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={ () => hideImage.value = !hideImage.value } class='btn btn-primary mr-2'>Revelar</button>
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
