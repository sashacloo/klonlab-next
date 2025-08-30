import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-10-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Schema types for content
export interface StudioContent {
  _id: string
  _type: string
  title: string
  description: string
  slug: {
    current: string
  }
}

export interface ProjectContent extends StudioContent {
  _type: 'project'
  images: any[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface AboutContent extends StudioContent {
  _type: 'about'
  bio: string
  skills: string[]
  experience: {
    company: string
    role: string
    duration: string
    description: string
  }[]
}

// Fetch functions
export async function getProjects(): Promise<ProjectContent[]> {
  return client.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      _type,
      title,
      description,
      slug,
      images,
      technologies,
      liveUrl,
      githubUrl
    }
  `)
}

export async function getAbout(): Promise<AboutContent | null> {
  return client.fetch(`
    *[_type == "about"][0] {
      _id,
      _type,
      title,
      description,
      bio,
      skills,
      experience
    }
  `)
}
