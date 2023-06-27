type Playlist = {
    playlistId: string,
    publishedAt: string,
    thumbnail: string,
    title: string,
    videoCount: number,

}
type Category = {

    id: number,
    name: string,
    parentId: number,
    subCategories: number[],
    articles: number[]

}

type CreateCategory = {
    name: string,
    parentId: number,
    subCategories: number[]
}
type UpdateCategory = {
    name: string,
    parentId: number,
    subCategories: number[]
}


type Article = {
    id: number,
    publishedAt: string,
    title: string,
    content: string,
    autgor: Author,
    categories: number[]
}

type Author = {
    id: number,
    name: string,
    image: string,
    articles: number[],
    books: number[]
}
type CreateArticle = {
    publishedAt: string,
    title: string,
    content: string,
    authorId: number,
    categories: number[]
}

type UpdateArticle = {
    publishedAt: string,
    title: string,
    content: string,
    authorId: number,
    categories: number[]
}

type Question = {
    id: number,
    question: string,
    answer: string
}
type CreateQuestion = {
    question: string,
    answer: string
}
type UpdateQuestion = {
    id: number,
    question: string,
    answer: string
}