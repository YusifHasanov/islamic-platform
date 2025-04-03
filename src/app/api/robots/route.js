export async function GET() {
  const robotsTxt = `
        User-agent: *
        Allow: /
        Sitemap: ${process.env.NEXT_PUBLIC_DOMAIN}
    `
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}

