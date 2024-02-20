import { 
  $,
  component$, 
  useContext, 
  useOnDocument, 
  // useStore, 
  useTask$, 
  // useVisibleTask$ 
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonListContext } from "~/context";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
// import { type SmallPokemon } from "~/interfaces";


// interface PokemonPageState{
//   currentPage: number;
//   pokemons: SmallPokemon[];
//   isLoading: boolean;
// }

export default component$(() => {


  // const pokemonStore = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   pokemons: [],
  //   isLoading: false,
  // })

  // eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(async ({ track }) => {

  //   track( () => pokemonStore.currentPage )
  //   const pokemons = await getSmallPokemons( pokemonStore.currentPage * 10 )
  //   pokemonStore.pokemons = [ ...pokemonStore.pokemons, ...pokemons ];
  // })

  const pokemonStore = useContext(PokemonListContext)

  useTask$(async ({ track }) => {

    track( () => pokemonStore.currentPage )

    const pokemons = await getSmallPokemons( pokemonStore.currentPage * 10, 30 )
   
    pokemonStore.pokemons = [ ...pokemonStore.pokemons, ...pokemons ];

    pokemonStore.isLoading = false
  })


  useOnDocument('scroll', $(() => {
   
    const maxScroll = document.body.scrollHeight
    const currentScroll = window.scrollY + window.innerHeight;
   
    if ((currentScroll + 200) >= maxScroll && !pokemonStore.isLoading) {
      pokemonStore.isLoading = true;
      pokemonStore.currentPage++
    }
    
    
  }));


  return (
    <div class='flex flex-col items-center'>
      <div class="flex flex-col gap-2">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: { pokemonStore.currentPage } </span>
        <span>Está cargando: </span>
      </div>

      <div class="mt-10">
        {/* <button
          onClick$={() => pokemonStore.currentPage--}
          disabled={pokemonStore.currentPage === 0}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </button> */}

        <button
          onClick$={() => pokemonStore.currentPage++}
          class="btn btn-primary mr-2"
        >
          Sigientes
        </button>
      </div>

      <div class="mt-5 grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
        {pokemonStore.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col items-center justify-center">
            <PokemonImage id={+id} />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Client-List",
  meta: [
    {
      name: "description",
      content: "Renderizado de lado del cliente",
    },
  ],
};
