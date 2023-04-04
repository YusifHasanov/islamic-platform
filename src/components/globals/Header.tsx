import Head from "next/head";


interface HeaderProps {
    title: string,
    description?: string
}
const Header = ({ title, description }: HeaderProps) => {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={`${title ?? "Əhli sünnə mədrəsəsi"}`} />
            <meta name="description" content={`${description ?? "Əhli sünnə mədrəsəsi"}`} />
            <meta property="og:description" content={`${description ?? "Əhli sünnə mədrəsəsi"}`} />
            <meta name="twitter:title" content={`${title}`} />
            <meta name="author" content="YusifHasanov" />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="google" content="nositelinkssearchbox" />
            <meta name="google" content="notranslate" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )

}


export default Header