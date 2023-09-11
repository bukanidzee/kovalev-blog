import MDEditor from '@uiw/react-md-editor'
import React, { ReactElement, useEffect, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { TObjWithStrKeys } from '../types/objectWithStringKeys'

// type stringPath<D, T> = {
//   [K in Path<D>]-?: PathValue<D, K> extends T ? K : never
// }[Path<D>]

interface IEditorProps<D extends TObjWithStrKeys> {
  register: UseFormRegister<D>
  setContent: (value: string) => void
  name: Path<D>
}

const MarkdownEditor = <D extends TObjWithStrKeys>({
  register,
  setContent,
  name
}: IEditorProps<D>): ReactElement => {
  const [editorValue, setEditorValue] = useState<string>('')

  useEffect(() => setContent(editorValue), [editorValue, setContent])

  return (
    <>
      <input
        hidden
        {...register(name, {
          required: true
        })}
        type='text'
      />
      <MDEditor
        value={editorValue}
        style={{
          width: '100%'
        }}
        height={500}
        onChange={v => {
          if (v !== undefined) {
            setEditorValue(v)
          }
        }}
      />
    </>
  )
}

export default MarkdownEditor
