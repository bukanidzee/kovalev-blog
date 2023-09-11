export const createFormData = <T extends {}>(form: T): FormData => {
  const formdata = new FormData()
  for (const field in form) {
    const value = form[field] as string | FileList | File

    if (value instanceof FileList) {
      const files = Array.from(value)

      if (files.length > 0) {
        formdata.append(field, files[0], files[0].name)
      }
    } else if (value instanceof File) {
      formdata.append(field, value, value.name)
    } else {
      formdata.append(field, value)
    }
  }

  return formdata
}
