


import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';


export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

  const id = Number(params.id)

  if ( isNaN( id ) ) throw redirect( 301, '/')

  if ( id < 1 || id > 1025 ) throw redirect(301, '/')

  return id
})

export default component$(() => {

  const pokemonId = usePokemonId()

  // const loc = useLocation()
  const id = pokemonId.value;

  return (
    <>
      <div>Pokemon con ID: { id } </div>
      <PokemonImage id={ id } isVisible />
    </>
  )
});