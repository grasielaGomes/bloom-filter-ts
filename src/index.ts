import { BloomFilter } from './BloomFilter'

const bloom = new BloomFilter(100, 3)

bloom.add('alice@example.com')
bloom.add('bob@example.com')

console.log('FPR estimate:', bloom.estimateFalsePositiveRate())
