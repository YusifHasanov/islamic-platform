import Articles from "@/layouts/ArticlesPage"

export const metadata = {
    title: "Məqalələr | Əhli-Sünnə Mədrəsəsi",
    description: "Əhli-Sünnə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
    keywords: "İslam məqalələri, dini məqalələr, Əhli-Sünnə, İslam dini, dini yazılar",
    openGraph: {
        title: "Məqalələr | Əhli-Sünnə Mədrəsəsi",
        description: "Əhli-Sünnə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
        url: "https://www.ehlisunnemedresesi.az/articles",
        type: "website",
    },
}

const Page = async ({ searchParams }) => {
    const { page, category } = await searchParams
    return <Articles page={page} category={category} />
}

export default Page

