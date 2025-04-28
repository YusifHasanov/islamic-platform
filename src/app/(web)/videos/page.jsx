import VideosPageLayout from "@/layouts/VideosPage";
import Script from 'next/script';

// 1. Generate Metadata for the Videos Listing Page
export async function generateMetadata({searchParams}) {
    // You might fetch some initial data here if needed for metadata,
    // e.g., total video count, featured playlists, etc.
    // const initialData = await fetchSomeVideoData(searchParams);

    const pageTitle = "İslami Videolar | Əhli-Sünnə Mədrəsəsi";
    const pageDescription = "Əhli-Sünnə Mədrəsəsi tərəfindən hazırlanan dini videolar, dərslər və söhbətlər. İslamı öyrənmək üçün video mənbələr.";
    const pageKeywords = "İslami videolar, dini videolar, Əhli-Sünnə Mədrəsəsi, video dərslər, Quran, hədis, fiqh, söhbətlər";
    const pageUrl = "https://www.ehlisunnemedresesi.az/videos";
    const imageUrl = "https://www.ehlisunnemedresesi.az/images/og-videos-default.jpg"; // Default image for videos page

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: pageKeywords,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: pageUrl,
            siteName: 'Əhli-Sünnə Mədrəsəsi',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: 'İslami Videolar Banner',
                },
            ],
            locale: 'az_AZ',
            type: 'website', // or video.tv_show, video.movie, video.episode depending on structure
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [imageUrl],
        },
        robots: {index: true, follow: true},
    };
}

// 2. Page Component with JSON-LD
export default async function VideosPage({searchParams}) {
    const {playlistId, search, videoId, content, page} = await searchParams; // Destructure directly
    const awaitedParams = await searchParams;
    // JSON-LD for Video Collection/List (using ItemList)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList', // Represents a list of items, in this case, videos
        name: 'İslami Videolar',
        description: 'Əhli-Sünnə Mədrəsəsi tərəfindən hazırlanan dini video dərslər və söhbətlər.',
        url: `https://www.ehlisunnemedresesi.az/videos${awaitedParams ? '?' + new URLSearchParams(awaitedParams).toString() : ''}`,
        // You would ideally populate itemListElement dynamically if you fetch initial videos here
        // Otherwise, this provides general context for the list page.
        // Example (if you fetched first few videos):
        // itemListElement: videos.map((video, index) => ({
        //   '@type': 'ListItem',
        //   position: index + 1,
        //   item: {
        //     '@type': 'VideoObject',
        //     name: video.title,
        //     description: video.description.substring(0, 100),
        //     thumbnailUrl: video.thumbnailUrl,
        //     uploadDate: video.uploadDate,
        //     duration: video.duration, // ISO 8601 format e.g., PT15M3S
        //     url: `https://www.ehlisunnemedresesi.az/videos?videoId=${video.id}`,
        //     // embedUrl: video.embedUrl // If available
        //   }
        // }))
    };

    return (
        <>
            <Script
                id="videos-list-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            {/* Render the actual layout/content component */}
            <VideosPageLayout
                playlistId={playlistId}
                videoId={videoId}
                content={content}
                search={search}
                page={page}
            />
        </>
    );
}

