"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomFilter = void 0;
class BloomFilter {
    constructor(size, hashCount) {
        this.size = size;
        this.bitArray = new Uint8Array(size);
        this.hashCount = hashCount;
    }
    hash(value, seed) {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = (hash * seed + value.charCodeAt(i)) % this.size;
        }
        return hash;
    }
    add(value) {
        for (let i = 0; i < this.hashCount; i++) {
            const index = this.hash(value, i + 1);
            this.bitArray[index] = 1;
        }
    }
    contains(value) {
        for (let i = 0; i < this.hashCount; i++) {
            const index = this.hash(value, i + 1);
            if (this.bitArray[index] === 0) {
                return false;
            }
        }
        return true;
    }
}
exports.BloomFilter = BloomFilter;
