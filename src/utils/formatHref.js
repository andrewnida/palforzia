export const formatHref = (action) => {
  return (
    (action.slug === '/' && action.slug) ||
    (action.slug && `/${action.slug}`) ||
    action.url ||
    `tel:${action.telephone}` ||
    `mailto:${action.email}`
  )
}
