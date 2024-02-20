import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";



interface Props {
  id        : number;
  size?     : number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(( { id, size = 200, backImage = false, isVisible = false }: Props ) => {

  const imageLoader = useSignal(false);
  
  useTask$(({ track }) => {
    track(() => id);
    imageLoader.value = false;
    return;
  })

  const imageUrl = useComputed$(() => {
    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    return backImage 
    ? `${ baseUrl }back/${ id }.png`
    : `${ baseUrl }${ id }.png`
  })



  return (
    <div 
      class='flex items-center justify-center'
      style={{ width: `${ size }px`, height: `${ size }px`}}
    >
      {
        !imageLoader.value && (
          <span>Cargando...</span>
        )
      }
      <img 
          width={100} 
          height={100} 
          src={ imageUrl.value } 
          alt="img-pokemon" 
          style={{ width: `${ size }px` }}
          onLoad$={ () => imageLoader.value = true }
          class={{
            'hidden': !imageLoader.value,
            'brightness-0': isVisible
          }}
        />
    </div>
  );
})
