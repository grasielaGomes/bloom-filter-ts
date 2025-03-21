# 🌱 Bloom Filter in TypeScript

This project implements a simple and efficient **Bloom Filter** using TypeScript. A Bloom Filter is a space-efficient probabilistic data structure used to test whether an element is a member of a set.

> ✅ It *definitely* tells you if an element is not in the set.  
> ⚠️ It *might* tell you that it is — false positives are possible, but false negatives are not.

---

## ✨ Why is this project important?

- **High performance**: Ideal for handling large-scale datasets, avoiding duplication, or pre-filtering data.
- **Real-world applications**: Used in spam detection, recommendation engines, database optimizations and security systems by companies like Google, LinkedIn and Cloudflare.
- **Showcases technical depth**: Demonstrates understanding of hashing, bitwise operations, and memory-efficient data structures in TypeScript.

---

## 🧪 Example

```ts
const bloom = new BloomFilter(100, 3);
bloom.add("alice@example.com");

bloom.contains("alice@example.com"); // true
bloom.contains("bob@example.com");   // false or maybe true (false positive)
```
