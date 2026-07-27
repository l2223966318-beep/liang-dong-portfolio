import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { productionMedia } from './media'

const flatten = (value: unknown): string[] =>
  typeof value === 'string'
    ? [value]
    : Object.values(value as Record<string, unknown>).flatMap(flatten)

describe('productionMedia', () => {
  it('keeps every project-bound media file inside public/assets/v32', () => {
    for (const path of flatten(productionMedia)) {
      expect(path).toMatch(/^\/assets\/v32\//)
      expect(existsSync(resolve('public', path.slice(1)))).toBe(true)
    }
  })
})
