import { type SchemaTypeDefinition } from 'sanity'
import { projects } from './projects'
import { reviews } from './reviews'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects, reviews],
}
