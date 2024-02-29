


import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';


export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

  const id = Number(params.id)

  if ( isNaN( id ) ) throw redirect( 301, '/')

  if ( id < 1 || id > 1025 ) throw redirect(301, '/')

  return id
})

export default component$(() => {

  const {  
    toggleBackImage, 
    hideImage,
    showBackImage,
    toggleIsVisible,
  } = usePokemonGame()

  const pokemonId = usePokemonId()

  const id = pokemonId.value;



  return (
    <>
      <div>Pokemon con ID: { id } </div>
      <PokemonImage id={ id } isVisible={ hideImage.value } backImage={ showBackImage.value } />
      <div class='mt-2'>
        <button onClick$={ toggleBackImage } class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={ toggleIsVisible } class='btn btn-primary mr-2'>Revelar</button>
      </div>
    </>
  )
});


export const head: DocumentHead = {

  title: `Pokemon detail`,

};