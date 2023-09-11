import {
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react'

interface IHeightParams<E> {
  height: number
  ref: MutableRefObject<E>
}

interface IHeightResize<E> extends IHeightParams<E> {
  observeFunc: () => void
}

const observeScroll =
  <E extends HTMLElement>(
    ref: MutableRefObject<E>,
    height: number,
    setHeight: Dispatch<SetStateAction<number>>
  ): (() => void) =>
  () => {
    const current =
      document.documentElement.clientHeight -
      ref.current?.getBoundingClientRect()?.top

    if (current !== height) {
      setHeight(current)
    }
  }

export const useHeightResizeObserve = <
  E extends HTMLElement
>(): IHeightResize<E> => {
  const ref = useRef<E>() as MutableRefObject<E>
  const [height, setHeight] = useState<number>(0)

  const observeFunc = useCallback(observeScroll(ref, height, setHeight), [
    height,
    ref
  ])

  useEffect(() => {
    observeFunc()
    window.addEventListener('resize', observeFunc)
    return () => {
      window.removeEventListener('resize', observeFunc)
    }
  })

  return { height, ref, observeFunc }
}

export const useHeightObserve = <E extends HTMLElement>(): IHeightParams<E> => {
  const { observeFunc, height, ref } = useHeightResizeObserve<E>()

  useEffect(() => {
    window.addEventListener('scroll', observeFunc)
    return () => {
      window.removeEventListener('scroll', observeFunc)
    }
  })

  return { height, ref }
}
