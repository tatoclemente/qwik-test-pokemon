import { $, useComputed$, useSignal } from "@builder.io/qwik"



export const useCounter = ( initialValue: number ) => {

  const counter = useSignal(initialValue)

  const increaseCounter = $(() => {
    counter.value += 1
  })

  const decreaseCounter = $(() => {
    if (counter.value <= 0) return;
    counter.value += 1
  })

  return {
    counter: useComputed$(() => counter),
    increaseCounter,
    decreaseCounter,
  }
}