export class BloomFilter {
  private size: number
  private bitArray: Uint8Array
  private hashCount: number
  private insertedElements: number = 0

  constructor(size: number, hashCount: number) {
    this.size = size
    this.bitArray = new Uint8Array(size)
    this.hashCount = hashCount
  }

  private hash(value: string, seed: number): number {
    let hash = 0
    for (let i = 0; i < value.length; i++) {
      hash = (hash * seed + value.charCodeAt(i)) % this.size
    }
    return hash
  }

  add(value: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(value, i + 1)
      this.bitArray[index] = 1
    }
    this.insertedElements++
  }

  contains(value: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(value, i + 1)
      if (this.bitArray[index] === 0) {
        return false
      }
    }
    return true
  }

  estimateFalsePositiveRate(): number {
    const k = this.hashCount
    const m = this.size
    const n = this.insertedElements

    const exp = Math.exp((-k * n) / m)
    const fpr = Math.pow(1 - exp, k)

    return parseFloat(fpr.toFixed(6))
  }
}
