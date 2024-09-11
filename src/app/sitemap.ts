import { getAllCategories } from '@/lib/category'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getAllCategories()

  const categoryUrls = categories.map(category => ({
    url: `${process.env.NEXT_WEBSITE_URL}/${category.servername}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const, 
    priority: 0.7,
  }))

  return [
    {
      url: `${process.env.NEXT_WEBSITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_WEBSITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const, 
      priority: 0.8,
    },

    ...categoryUrls, 
  ]
}
