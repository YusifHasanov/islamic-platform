//Entities types
type Category= {
    id: number,
    name: string,
    parentId: number,
    subCategories : number[]
}
type CreateCategory= {
    name: string,
    parentId: number,
    subCategories : number[]
}



type videoIdType = string | string[] | undefined

type question = {
    question: string,
    answer: string,
    categoryId: number,
}



