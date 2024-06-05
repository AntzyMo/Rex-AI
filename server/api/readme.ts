import process from 'node:process'
import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'

export default defineEventHandler(async () => {
  const url = resolve(process.cwd(), 'README.md')
  const content = await readFile(url, 'utf-8')
  return content
})
