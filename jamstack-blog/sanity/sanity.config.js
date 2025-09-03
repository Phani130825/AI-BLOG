import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'AI-Powered Blog CMS',

  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',

  plugins: [
    deskTool({
      structure: deskStructure
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  }
})
