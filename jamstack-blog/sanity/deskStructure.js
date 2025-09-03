import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .schemaType('blog')
        .child(S.documentTypeList('blog').title('Blog Posts')),
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      ...S.documentTypeListItems().filter(listItem => !['blog', 'author'].includes(listItem.getId()))
    ])
