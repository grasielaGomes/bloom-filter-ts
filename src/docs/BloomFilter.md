## BloomFilter Class Explanation

The `BloomFilter` class is a probabilistic data structure used to test whether an element is a member of a set. It is space-efficient but allows for false positives, meaning it can incorrectly indicate that an element is in the set when it is not. However, it will never produce a false negative, meaning if it says an element is not in the set, it is definitely not in the set.

### Class Properties

- `size`: The size of the bit array used to store the filter.
- `bitArray`: A `Uint8Array` representing the bit array where each bit indicates whether a particular hash value has been set.
- `hashCount`: The number of hash functions to use.
- `insertedElements`: The number of elements that have been added to the Bloom filter.

### Constructor

The constructor initializes the `BloomFilter` with a specified size and number of hash functions.

```typescript
constructor(size: number, hashCount: number) {
  this.size = size;
  this.bitArray = new Uint8Array(size);
  this.hashCount = hashCount;
}
```

### Methods

#### `hash(value: string, seed: number): number`

A private method that generates a hash value for a given string and seed. It uses a simple hashing algorithm that combines the character codes of the string with the seed.

```typescript
private hash(value: string, seed: number): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * seed + value.charCodeAt(i)) % this.size;
  }
  return hash;
}
```

#### `add(value: string): void`

Adds a value to the Bloom filter by hashing the value with each of the hash functions and setting the corresponding bits in the bit array.

```typescript
add(value: string): void {
  for (let i = 0; i < this.hashCount; i++) {
    const index = this.hash(value, i + 1);
    this.bitArray[index] = 1;
  }
  this.insertedElements++;
}
```

#### `contains(value: string): boolean`

Checks if a value is possibly in the Bloom filter by hashing the value with each of the hash functions and checking the corresponding bits in the bit array. If any bit is not set, the value is definitely not in the set. If all bits are set, the value is possibly in the set.

```typescript
contains(value: string): boolean {
  for (let i = 0; i < this.hashCount; i++) {
    const index = this.hash(value, i + 1);
    if (this.bitArray[index] === 0) {
      return false;
    }
  }
  return true;
}
```

#### `estimateFalsePositiveRate(): number`

Estimates the false positive rate of the Bloom filter based on the number of hash functions, the size of the bit array, and the number of inserted elements.

```typescript
estimateFalsePositiveRate(): number {
  const k = this.hashCount;
  const m = this.size;
  const n = this.insertedElements;

  const exp = Math.exp((-k * n) / m);
  const fpr = Math.pow(1 - exp, k);

  return parseFloat(fpr.toFixed(6));
}
```

### Summary

The `BloomFilter` class provides a way to efficiently test for membership in a set with a trade-off of allowing false positives. It uses multiple hash functions to set and check bits in a bit array, ensuring that the probability of false positives is minimized. Additionally, it includes a method to estimate the false positive rate based on the current state of the filter.
