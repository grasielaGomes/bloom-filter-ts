import { BloomFilter } from './BloomFilter'

const bloom = new BloomFilter(100, 3)

bloom.add('alice@example.com')
bloom.add('bob@example.com')

console.log('alice@example.com in filter?', bloom.contains('alice@example.com')) // true
console.log('carol@example.com in filter?', bloom.contains('carol@example.com')) // maybe true or false
