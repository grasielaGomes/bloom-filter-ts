import { describe, it, expect, beforeEach } from 'vitest'
import { BloomFilter } from '../src/BloomFilter'

describe('BloomFilter', () => {
  let filter: BloomFilter

  beforeEach(() => {
    filter = new BloomFilter(100, 3)
  })

  it('should return true for added values', () => {
    filter.add('alice@example.com')
    expect(filter.contains('alice@example.com')).toBe(true)
  })

  it('should probably return false for unseen values', () => {
    expect(filter.contains('carol@example.com')).toBe(false)
  })

  it('should increase FPR after many inserts', () => {
    for (let i = 0; i < 50; i++) {
      filter.add(`user${i}@example.com`)
    }
    const fpr = filter.estimateFalsePositiveRate()
    expect(fpr).toBeGreaterThan(0)
    expect(fpr).toBeLessThan(1)
  })

  it('should return low FPR after few inserts', () => {
    filter.add('bob@example.com')
    const fpr = filter.estimateFalsePositiveRate()
    expect(fpr).toBeLessThan(0.05)
  })
})
