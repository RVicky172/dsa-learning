import type { CodeExample } from '../../../types/topic';

export const arraysExamples: CodeExample[] = [
    {
      title: 'Basic Array Operations',
      language: 'typescript',
      code: `// Creating and accessing arrays
const numbers: number[] = [1, 2, 3, 4, 5];
console.log(numbers[0]); // 1 - O(1) access

// Inserting at end - O(1) amortized
numbers.push(6);

// Inserting at beginning - O(n)
numbers.unshift(0);

// Deleting from end - O(1)
numbers.pop();

// Deleting from beginning - O(n)
numbers.shift();

// Finding an element - O(n)
const index = numbers.indexOf(3);

// Iterating through array - O(n)
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Modern iteration
numbers.forEach((num, index) => {
  console.log(\`Index \${index}: \${num}\`);
});`,
      explanation: 'This example demonstrates fundamental array operations. Notice how operations at the end of the array are efficient (O(1)), while operations at the beginning require shifting all elements (O(n)). The choice of which end to modify has huge performance implications.',
      timeComplexity: 'Varies: O(1) for access/push/pop, O(n) for unshift/shift/indexOf',
      spaceComplexity: 'O(1) for operations, O(n) for storage'
    },
    {
      title: 'Two Pointer Technique',
      language: 'typescript',
      code: `// Reverse an array in-place using two pointers
function reverseArray(arr: number[]): void {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Swap elements
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

// Remove duplicates from sorted array
function removeDuplicates(arr: number[]): number {
  if (arr.length === 0) return 0;
  
  let i = 0; // Slow pointer (position to write unique element)
  
  for (let j = 1; j < arr.length; j++) { // Fast pointer
    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
    }
  }
  
  return i + 1; // Number of unique elements
}

// Example usage
const arr = [1, 2, 3, 4, 5];
reverseArray(arr);
console.log(arr); // [5, 4, 3, 2, 1]

const duplicates = [1, 1, 2, 2, 3, 4, 4];
console.log(removeDuplicates(duplicates)); // 4`,
      explanation: 'The two-pointer technique is a powerful pattern for array manipulation. By maintaining pointers at different positions, we can solve problems efficiently in a single pass without extra space. This is crucial for in-place algorithms.',
      timeComplexity: 'O(n) - single pass through array',
      spaceComplexity: 'O(1) - in-place modification, no extra space'
    },
    {
      title: 'Sliding Window Pattern',
      language: 'typescript',
      code: `// Find maximum sum of k consecutive elements
function maxSumSubarray(arr: number[], k: number): number {
  if (arr.length < k) return -1;
  
  // Calculate sum of first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  let maxSum = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    // Remove leftmost element of previous window
    windowSum = windowSum - arr[i - k];
    // Add rightmost element of new window
    windowSum = windowSum + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

// Longest substring without repeating characters
function lengthOfLongestSubstring(s: string): number {
  const charMap = new Map<string, number>();
  let maxLength = 0;
  let left = 0;
  
  for (let right = 0; right < s.length; right++) {
    if (charMap.has(s[right])) {
      // Move left pointer past the last occurrence
      left = Math.max(left, charMap.get(s[right])! + 1);
    }
    
    charMap.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// Examples
console.log(maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39
console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")`,
      explanation: 'The sliding window pattern is efficient for problems involving subarrays or substrings. Instead of recalculating from scratch for each window, we maintain the window and slide it efficiently. This converts O(n²) brute force into O(n) optimal.',
      timeComplexity: 'O(n) - linear scan with no nested loops',
      spaceComplexity: 'O(min(n, m)) - character map size bounded by alphabet'
    },
    {
      title: 'Prefix Sum Optimization',
      language: 'typescript',
      code: `// Precompute prefix sums for fast range queries
function buildPrefixSum(arr: number[]): number[] {
  const prefix = [0];
  
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  
  return prefix;
}

// Query sum of elements from index left to right in O(1)
function rangeSum(prefix: number[], left: number, right: number): number {
  return prefix[right + 1] - prefix[left];
}

// Find subarrays with target sum using prefix sum
function subarraySumEqualsK(arr: number[], k: number): number {
  const sumMap = new Map<number, number>();
  sumMap.set(0, 1); // Base case: empty prefix has sum 0
  
  let count = 0;
  let currentSum = 0;
  
  for (const num of arr) {
    currentSum += num;
    
    // Check if there's a prefix with sum = currentSum - k
    if (sumMap.has(currentSum - k)) {
      count += sumMap.get(currentSum - k)!;
    }
    
    // Store current sum for future queries
    sumMap.set(currentSum, (sumMap.get(currentSum) || 0) + 1);
  }
  
  return count;
}

// Examples
const arr = [1, 2, 3, 4, 5];
const prefix = buildPrefixSum(arr);
console.log(rangeSum(prefix, 1, 3)); // 2 + 3 + 4 = 9

console.log(subarraySumEqualsK([1, 1, 1, 0, 1, 1, 1, 1], 2)); // 6`,
      explanation: 'Prefix sum technique is powerful for range queries. Precomputation takes O(n) time but makes queries O(1). Also useful for finding subarrays with target sum when combined with hash maps.',
      timeComplexity: 'Precomputation: O(n), Query: O(1) per query',
      spaceComplexity: 'O(n) for prefix array and map'
    },
    {
      title: 'String Manipulation',
      language: 'typescript',
      code: `// Check if string is a palindrome
function isPalindrome(s: string): boolean {
  // Clean string: remove non-alphanumeric, convert to lowercase
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

// Reverse words in string
function reverseWords(s: string): string {
  return s.trim().split(/\\s+/).reverse().join(' ');
}

// Group anagrams - using sorted string as key
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted)!.push(str);
  }
  
  return Array.from(map.values());
}

// Examples
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(reverseWords("Hello World TypeScript")); // "TypeScript World Hello"
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['eat','tea','ate'], ['tan','nat'], ['bat']]`,
      explanation: 'String problems often combine array techniques with character manipulation. Sorting the characters in a string is a clever way to identify anagrams. This technique is useful for many string categorization problems.',
      timeComplexity: 'Palindrome: O(n), Reverse: O(n), Anagrams: O(n × k log k) where k is avg string length',
      spaceComplexity: 'O(n) for cleaned strings and results'
    }
];
