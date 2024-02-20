


import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, useLocation, Link } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';



export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, pathname, redirect }) => {

  const offset = Number(query.get('offset') || '0')
  if ( isNaN(offset) ) throw redirect(301, pathname)
  if ( offset < 0 ) throw redirect(301, pathname)
  if ( offset > 1020 ) throw redirect(301, pathname)
  console.log(offset);

  return getSmallPokemons(offset, 10)

})


export default component$(() => {

  const loc = useLocation()
  const pokemons = usePokemonList().value
  // const nav = useNavigate()


  const currentOffset = useComputed$<number>(() => {
    // return  loc.url.searchParams.get('offset')

 
    // const offset = Number(loc.url.searchParams.get('offset') || '0')
    const offsetString = new URLSearchParams( loc.url.search )
    const offset = Number( offsetString.get('offset') || '0')
    console.log('CURRENT OFFSET', offset);
    

    return offset;  
  
  })

  // const prevPage = $(() => {
  //   console.log("Offset Button MENOS", currentOffset.value);
    
  //   if ( currentOffset.value === 10 ) nav("/pokemons/list-ssr/")
  //   nav(`/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }`)
  // })

  // const nextPage = $(() => {
  //   console.log("Offset Button MAS", currentOffset.value);
  //   if ( currentOffset.value === 1020 ) nav(`/pokemons/list-ssr/?offset=${ 1020 }`)
  //   nav(`/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }`)
  // })
  

  return (
    <>
      <div class='flex flex-col gap-2'>

        <span class='my-5 text-5xl'>Status</span>
        <span>Offset: { currentOffset.value }</span>
        <span>Está cargando la página: { loc.isNavigating ? 'Si' : 'No' }</span>

      </div>

      <div class='mt-10'>
        <Link href={`/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }`}
          class='btn btn-primary mr-2'
        >
          Anteriores
        </Link>

        <Link 
          href={`/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }`}
          class='btn btn-primary mr-2'
        >
          Sigientes
        </Link>
      </div>

      <div class='grid grid-cols-6 mt-5'>
        {
          pokemons.map(({ name, id }) => (

            <div key={ name } class='m-5 flex flex-col justify-center items-center'>
              <PokemonImage id={ +id } />
              <span class='capitalize'>{ name }</span>
            </div>
          
          ))
        }
      </div>

    </>
  )
});

export const head: DocumentHead = {
  title: "SSR-List",
  meta: [
    {
      name: "description",
      content: "Renderizado de lado del servidor",
    },
  ],
};