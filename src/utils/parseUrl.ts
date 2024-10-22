export const getQueryString = (name: string) => {
  const url_string = window.location.href
  const url = new URL(url_string)
  return url.searchParams.get(name)
}
