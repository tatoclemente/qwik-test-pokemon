


import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/use-counter';

export default component$(() => {


  const { counter, increaseCounter, decreaseCounter } = useCounter(0)

  
  

  return (
    <>
      <span class='text-2xl'>Counter</span>
      <span class='text-7xl'>{ counter }</span>

      <div class='flex justify-center gap-2'>
        <button onClick$={ decreaseCounter } class='btn btn-primary w-20'>-1</button>
        <button onClick$={ increaseCounter } class='btn btn-primary w-20'>+1</button>
      </div>
    </>
  )
});