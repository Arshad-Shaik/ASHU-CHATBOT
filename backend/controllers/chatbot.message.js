// import Bot from '../models/bot.model.js';
// import User from '../models/user.model.js';

// export const Message = async (req, res) => {
//     try {
//         // ✅ DEBUG: Log incoming request details
//         console.log("=== REQUEST DEBUG ===");
//         console.log("Content-Type:", req.headers['content-type']);
//         console.log("req.body:", req.body);
//         console.log("=====================");

//         // ✅ Check if req.body exists
//         if (!req.body) {
//             return res.status(400).json({ 
//                 error: "Request body is empty. Please send JSON data with Content-Type: application/json" 
//             });
//         }

//         const { text } = req.body;

//         // ✅ Validate text field
//         if (!text?.trim()) {
//             return res.status(400).json({ 
//                 error: "Text cannot be empty" 
//             });
//         }

//         console.log("User Message:", text);

//         // ✅ Save user message to database
//         const user = await User.create({
//             sender: "user",
//             text: text.trim()
//         });

//         // ✅ Bot responses data
//         const botResponses = {
//             "hello": "Hi, How I can help you!!",
//             "hi": "Hello! How can I assist you today?",
//             "hey": "Hey there! What can I do for you?",
//             "can we become friend": "Yes",
//             "how are you": "I'm just a bot, but I'm doing great! How about you?",
//             "what is your name": "I'm Ashu the great ChatBot, your virtual assistant.",
//             "who made you": "I was created by developer Arshad Wasib Shaik known as Ashu, to help answer your questions.",
//             "tell me a joke": "Why don't skeletons fight each other? They don't have the guts!",
//             "what is the time": "I can't see a clock, but your device should know.",
//             "bye": "Goodbye! Have a great day.",
//             "thank you": "You're welcome!",
//             "thanks": "You're welcome! Happy to help!",
//             "i love you": "That's sweet! I'm here to help you anytime.",
//             "where are you from": "I live in the cloud — no rent, no bills, no sleep, no food, no feelings, no heart but with knowledge of limited data only!",
//             "what can you do": "I can chat with you, answer questions, and keep you company.",

//             // ==========================================
//             // PROGRAMMING LANGUAGES
//             // ==========================================
//             "what is python": "Python is a high-level, interpreted programming language known for simplicity and versatility.\n• Easy to read/write due to clean syntax (similar to English)\n• Dynamically typed and supports multiple paradigms (OOP, functional, procedural)\n• Extensive libraries for AI, data science, web, automation\n• Example: Used in Google, YouTube, Instagram, and machine learning applications",

//             "what is java": "Java is a platform-independent, object-oriented programming language.\n• Famous for 'Write Once, Run Anywhere' due to JVM (Java Virtual Machine)\n• Used in enterprise systems, Android development, cloud apps\n• Provides features like garbage collection, strong memory management\n• Example: Banking systems, Android apps, large-scale enterprise applications",

//             "what is javascript": "JavaScript is a lightweight, interpreted programming language primarily used for web development.\n• It runs in the browser (client-side) and also on the server (Node.js)\n• Supports event-driven, functional, and object-oriented programming\n• Key features: DOM manipulation, async programming (Promises, async/await), closures, prototypal inheritance\n• Used in: React.js, Angular, Vue.js, Node.js, Express.js\n• Example: Every interactive website you visit uses JavaScript (form validation, animations, API calls)",

//             "what is c language": "C is a general-purpose, procedural programming language developed by Dennis Ritchie in 1972.\n• Known as the 'mother of all programming languages'\n• Provides low-level access to memory via pointers\n• Used in: Operating systems (Linux, Windows kernel), embedded systems, compilers\n• Key features: fast execution, manual memory management (malloc, calloc, free), structured programming\n• Example: The Linux kernel and most OS kernels are written in C",

//             "what is c++": "C++ is an extension of C that adds object-oriented programming (OOP) features.\n• Developed by Bjarne Stroustrup in 1979\n• Supports classes, inheritance, polymorphism, encapsulation, abstraction\n• Used in: Game development (Unreal Engine), system software, competitive programming\n• Key features: STL (Standard Template Library), operator overloading, templates, multi-threading\n• Example: Google Chrome, Adobe Photoshop, and most AAA games use C++",

//             "what is typescript": "TypeScript is a strongly-typed superset of JavaScript developed by Microsoft.\n• Adds static type checking to JavaScript\n• Compiles down to plain JavaScript\n• Helps catch errors at compile time rather than runtime\n• Key features: interfaces, generics, enums, type aliases, decorators\n• Used in: Angular (default), large-scale React/Node.js projects\n• Example: VS Code itself is built with TypeScript",

//             "what is html": "HTML (HyperText Markup Language) is the standard markup language for creating web pages.\n• Provides the structure/skeleton of a webpage\n• Uses tags like <div>, <h1>, <p>, <a>, <img>, <form>, <table>\n• HTML5 introduced semantic elements: <header>, <footer>, <section>, <article>, <nav>\n• Works together with CSS (styling) and JavaScript (interactivity)\n• Example: Every website on the internet starts with an HTML document",

//             "what is css": "CSS (Cascading Style Sheets) is used to style and layout HTML elements.\n• Controls colors, fonts, spacing, positioning, animations\n• Key concepts: Box Model, Flexbox, CSS Grid, Media Queries (responsive design)\n• CSS3 added transitions, animations, gradients, shadows\n• Preprocessors: SASS, LESS for advanced styling\n• Frameworks: Bootstrap, Tailwind CSS\n• Example: The beautiful designs you see on websites are all CSS",

//             "what is sql": "SQL (Structured Query Language) is used to manage and query relational databases.\n• Operations: SELECT, INSERT, UPDATE, DELETE (CRUD)\n• Advanced: JOINs (INNER, LEFT, RIGHT, FULL), subqueries, GROUP BY, HAVING, indexes\n• Used in: MySQL, PostgreSQL, Oracle, SQL Server, SQLite\n• Key concepts: normalization, primary key, foreign key, ACID properties\n• Example: 'SELECT * FROM users WHERE age > 25 ORDER BY name ASC;'",

//             "what is go language": "Go (Golang) is an open-source programming language developed by Google in 2009.\n• Designed for simplicity, efficiency, and concurrency\n• Compiled language with garbage collection\n• Key features: goroutines (lightweight threads), channels, fast compilation\n• Used in: Cloud infrastructure, microservices, DevOps tools\n• Example: Docker, Kubernetes, and Terraform are built with Go",

//             "what is rust": "Rust is a systems programming language focused on safety, speed, and concurrency.\n• Guarantees memory safety without garbage collection (ownership model)\n• Prevents null pointer exceptions and data races at compile time\n• Used in: System-level programming, WebAssembly, blockchain, game engines\n• Key features: ownership, borrowing, lifetimes, pattern matching\n• Example: Firefox's Servo engine and parts of the Linux kernel use Rust",

//             "what is kotlin": "Kotlin is a modern programming language developed by JetBrains.\n• Official language for Android development (declared by Google in 2019)\n• 100% interoperable with Java\n• Key features: null safety, extension functions, coroutines, data classes\n• More concise and safer than Java\n• Used in: Android apps, server-side development (Spring Boot + Kotlin)\n• Example: Pinterest, Trello, and Uber use Kotlin for Android",

//             "what is swift": "Swift is a powerful programming language developed by Apple for iOS/macOS development.\n• Introduced in 2014 as a replacement for Objective-C\n• Key features: type safety, optionals, closures, protocol-oriented programming\n• Fast performance and modern syntax\n• Used in: iPhone apps, iPad apps, macOS apps, watchOS, tvOS\n• Example: Every iOS app in the App Store can be built with Swift",

//             "what is php": "PHP (Hypertext Preprocessor) is a server-side scripting language for web development.\n• Powers over 75% of websites on the internet\n• Key features: easy database integration, session management, form handling\n• Frameworks: Laravel, Symfony, CodeIgniter\n• Used in: WordPress, Facebook (initially), Wikipedia, e-commerce sites\n• Example: WordPress (which powers ~40% of all websites) is built with PHP",

//             "what is ruby": "Ruby is a dynamic, object-oriented programming language designed for developer happiness.\n• Created by Yukihiro Matsumoto in 1995\n• Famous framework: Ruby on Rails (web development)\n• Key features: everything is an object, blocks, mixins, metaprogramming\n• Convention over configuration philosophy\n• Used in: Startups, web apps, prototyping\n• Example: GitHub, Shopify, Airbnb (initially) were built with Ruby on Rails",

//             "what is r language": "R is a programming language and environment for statistical computing and data visualization.\n• Widely used in data science, statistics, machine learning, bioinformatics\n• Rich ecosystem of packages: ggplot2, dplyr, tidyr, caret, shiny\n• Key features: data frames, vectorized operations, statistical modeling\n• Used in: Academic research, data analysis, biostatistics\n• Example: Data scientists and researchers use R for exploratory data analysis and statistical reports",

//             "what is scala": "Scala is a high-level language that combines object-oriented and functional programming.\n• Runs on the JVM (Java Virtual Machine), interoperable with Java\n• Key features: pattern matching, immutability, type inference, traits\n• Used in: Big data processing with Apache Spark\n• Concise syntax compared to Java\n• Example: Twitter, LinkedIn, and Apache Spark are built with Scala",

//             "what is perl": "Perl is a high-level, general-purpose programming language known for text processing.\n• Excellent for regular expressions and string manipulation\n• Used in: System administration, web development, network programming\n• Key features: CPAN (huge library repository), regex, flexible syntax\n• Often called the 'Swiss Army knife' of programming\n• Example: Used heavily in bioinformatics and legacy web systems",

//             // ==========================================
//             // DATA STRUCTURES
//             // ==========================================
//             "what is data structure": "A Data Structure is a way of organizing and storing data so it can be accessed and modified efficiently.\n• Types: Linear (Array, Linked List, Stack, Queue) and Non-Linear (Tree, Graph)\n• Choosing the right data structure impacts performance (time and space complexity)\n• Essential for coding interviews and competitive programming\n• Example: Using a HashMap for O(1) lookup vs Array for O(n) search",

//             "what is array": "An Array is a collection of elements stored at contiguous memory locations.\n• Fixed size (in C/C++/Java) or dynamic (in Python/JavaScript)\n• Access: O(1) by index | Search: O(n) linear, O(log n) binary (sorted)\n• Insert/Delete: O(n) due to shifting\n• Used in: Storing lists, matrix operations, implementing other data structures\n• C Example: int arr[5] = {1, 2, 3, 4, 5};\n• Python Example: arr = [1, 2, 3, 4, 5]\n• Java Example: int[] arr = {1, 2, 3, 4, 5};",

//             "what is linked list": "A Linked List is a linear data structure where elements (nodes) are connected via pointers.\n• Types: Singly Linked List, Doubly Linked List, Circular Linked List\n• Insert/Delete: O(1) at head | Search: O(n)\n• Advantage over arrays: Dynamic size, efficient insertions/deletions\n• Disadvantage: No random access, extra memory for pointers\n• C Example: struct Node { int data; struct Node* next; };\n• Java Example: class Node { int data; Node next; }\n• Python Example: class Node: def __init__(self, data): self.data = data; self.next = None",

//             "what is stack": "A Stack is a linear data structure that follows LIFO (Last In, First Out) principle.\n• Operations: push (add), pop (remove), peek (top element) — all O(1)\n• Applications: Function call stack, undo/redo, expression evaluation, backtracking\n• Implementation: Using arrays or linked lists\n• C++ Example: stack<int> s; s.push(10); s.pop();\n• Java Example: Stack<Integer> s = new Stack<>(); s.push(10); s.pop();\n• Python Example: stack = []; stack.append(10); stack.pop()\n• JavaScript Example: let stack = []; stack.push(10); stack.pop();",

//             "what is queue": "A Queue is a linear data structure that follows FIFO (First In, First Out) principle.\n• Operations: enqueue (add to rear), dequeue (remove from front) — all O(1)\n• Types: Simple Queue, Circular Queue, Priority Queue, Deque (Double-Ended Queue)\n• Applications: BFS traversal, task scheduling, printer queue, message queues\n• C++ Example: queue<int> q; q.push(10); q.pop();\n• Java Example: Queue<Integer> q = new LinkedList<>(); q.add(10); q.poll();\n• Python Example: from collections import deque; q = deque(); q.append(10); q.popleft()",

//             "what is tree": "A Tree is a hierarchical, non-linear data structure consisting of nodes connected by edges.\n• Root: topmost node | Leaf: node with no children | Height: longest path from root to leaf\n• Types: Binary Tree, Binary Search Tree (BST), AVL Tree, Red-Black Tree, B-Tree, Trie\n• Traversals: Inorder (Left-Root-Right), Preorder (Root-Left-Right), Postorder (Left-Right-Root), Level Order (BFS)\n• Applications: File systems, databases (B-Tree), autocomplete (Trie), expression parsing\n• BST Property: Left child < Parent < Right child",

//             "what is binary search tree": "A Binary Search Tree (BST) is a binary tree where left child < parent < right child.\n• Search/Insert/Delete: O(log n) average, O(n) worst case (skewed tree)\n• Inorder traversal gives sorted output\n• Balanced BSTs: AVL Tree, Red-Black Tree ensure O(log n) operations\n• Applications: Databases, dictionaries, priority queues\n• Common interview problems: Validate BST, Find LCA, Kth smallest element",

//             "what is graph": "A Graph is a non-linear data structure consisting of vertices (nodes) and edges (connections).\n• Types: Directed/Undirected, Weighted/Unweighted, Cyclic/Acyclic\n• Representations: Adjacency Matrix, Adjacency List\n• Traversals: BFS (Breadth-First Search), DFS (Depth-First Search)\n• Algorithms: Dijkstra's (shortest path), Kruskal's/Prim's (MST), Topological Sort, Bellman-Ford\n• Applications: Social networks, Google Maps, network routing, recommendation systems",

//             "what is hash table": "A Hash Table (HashMap) is a data structure that maps keys to values using a hash function.\n• Average: O(1) for insert, delete, search | Worst: O(n) due to collisions\n• Collision handling: Chaining (linked list), Open Addressing (linear probing, quadratic probing)\n• C++ Example: unordered_map<string, int> mp; mp['age'] = 25;\n• Java Example: HashMap<String, Integer> mp = new HashMap<>(); mp.put('age', 25);\n• Python Example: mp = {'age': 25}\n• JavaScript Example: let mp = new Map(); mp.set('age', 25);\n• Applications: Caching, databases, counting frequency, indexing",

//             "what is heap": "A Heap is a complete binary tree that satisfies the heap property.\n• Min-Heap: Parent <= Children (root is minimum)\n• Max-Heap: Parent >= Children (root is maximum)\n• Operations: Insert O(log n), Extract Min/Max O(log n), Peek O(1)\n• Implementation: Usually with arrays\n• Applications: Priority Queue, Heap Sort, finding Kth largest/smallest element, Dijkstra's algorithm\n• C++ Example: priority_queue<int> maxHeap; priority_queue<int, vector<int>, greater<int>> minHeap;\n• Java Example: PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n• Python Example: import heapq; heapq.heappush(heap, 5); heapq.heappop(heap)",

//             "what is trie": "A Trie (Prefix Tree) is a tree-like data structure used for efficient string operations.\n• Each node represents a character\n• Search/Insert: O(m) where m = length of the word\n• Applications: Autocomplete, spell checker, dictionary, IP routing, search engines\n• Space-efficient for storing large sets of strings with common prefixes\n• Common interview problems: Implement Trie, Word Search, Longest Common Prefix",

//             "what is recursion": "Recursion is when a function calls itself to solve smaller parts of a problem.\n• Useful for problems that can be divided into subproblems (divide-and-conquer)\n• Requires a base condition to stop infinite looping\n• Commonly used in: factorial calculation, Fibonacci sequence, tree/graph traversal\n• Example in coding interview: 'Write a recursive function to reverse a linked list'",

//             // ==========================================
//             // ALGORITHMS
//             // ==========================================
//             "what is an algorithm": "An Algorithm is a step-by-step procedure to solve a specific problem.\n• Characteristics: Input, Output, Definiteness, Finiteness, Effectiveness\n• Types: Brute Force, Divide & Conquer, Greedy, Dynamic Programming, Backtracking\n• Analysis: Time Complexity and Space Complexity using Big O notation\n• Example: Binary Search is an algorithm to find an element in a sorted array in O(log n)\n• Interview Tip: Always discuss time and space complexity of your approach",

//             "what is sorting": "Sorting is the process of arranging elements in a specific order (ascending/descending).\n• Common algorithms: Bubble Sort O(n²), Selection Sort O(n²), Insertion Sort O(n²), Merge Sort O(n log n), Quick Sort O(n log n avg), Heap Sort O(n log n)\n• Stable sorts preserve relative order of equal elements: Merge Sort, Insertion Sort\n• Unstable sorts: Quick Sort, Heap Sort, Selection Sort\n• In-place sorts use O(1) extra space: Quick Sort, Bubble Sort, Selection Sort\n• Best overall: Merge Sort (guaranteed O(n log n)), Quick Sort (fastest in practice)",

//             "what is binary search": "Binary Search is a divide-and-conquer algorithm to find an element in a sorted array.\n• Time Complexity: O(log n) | Space: O(1) iterative, O(log n) recursive\n• How it works: Compare target with middle element, eliminate half each time\n• Applications: Searching in sorted arrays, finding boundaries, optimization problems",

//             "what is dynamic programming": "Dynamic Programming (DP) is a technique to solve problems by breaking them into overlapping subproblems.\n• Two approaches: Top-Down (Memoization) and Bottom-Up (Tabulation)\n• Key properties: Optimal Substructure + Overlapping Subproblems\n• Classic problems: Fibonacci, Knapsack, Longest Common Subsequence (LCS), Coin Change, Longest Increasing Subsequence (LIS), Matrix Chain Multiplication, Edit Distance\n• Time complexity improvement: Exponential → Polynomial\n• Example: Fibonacci — Recursive O(2^n) → DP O(n)\n• Interview Tip: Always identify the state and transition (recurrence relation)",

//             "what is greedy algorithm": "A Greedy Algorithm makes the locally optimal choice at each step hoping to find a global optimum.\n• Does NOT always give optimal solution (works only for specific problems)\n• Classic problems: Activity Selection, Huffman Coding, Fractional Knapsack, Dijkstra's Shortest Path, Prim's/Kruskal's MST, Job Scheduling\n• Greedy vs DP: Greedy makes one choice and never reconsiders; DP considers all possibilities\n• Interview Tip: Prove greedy choice property and optimal substructure before using",

//             "what is backtracking": "Backtracking is a technique to solve problems by trying all possibilities and undoing (backtracking) bad choices.\n• Think of it as 'trial and error with undo'\n• Classic problems: N-Queens, Sudoku Solver, Rat in a Maze, Permutations, Combinations, Subset Sum, Word Search\n• Time complexity is usually exponential but pruning helps reduce it\n• Template: Choose → Explore → Un-choose\n• Interview Tip: Draw the recursion tree to understand the flow",

//             "what is bfs": "BFS (Breadth-First Search) is a graph/tree traversal algorithm that explores level by level.\n• Uses a Queue data structure\n• Time: O(V + E) | Space: O(V)\n• Applications: Shortest path in unweighted graph, level-order traversal, connected components, web crawlers",

//             "what is dfs": "DFS (Depth-First Search) is a graph/tree traversal algorithm that explores as deep as possible before backtracking.\n• Uses a Stack (or recursion)\n• Time: O(V + E) | Space: O(V)\n• Applications: Cycle detection, topological sort, connected components, path finding, maze solving",

//             "what is time complexity": "Time Complexity measures how the runtime of an algorithm grows with input size.\n• Big O Notation: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)\n• O(1): Constant — Array access, HashMap lookup\n• O(log n): Logarithmic — Binary Search\n• O(n): Linear — Linear Search, single loop\n• O(n log n): Merge Sort, Quick Sort (average)\n• O(n²): Nested loops — Bubble Sort, Selection Sort\n• O(2^n): Recursive Fibonacci (without DP)\n• Interview Tip: Always analyze best, average, and worst case",

//             "what is space complexity": "Space Complexity measures the total memory an algorithm uses relative to input size.\n• Includes: Input space + Auxiliary space (extra space used)\n• O(1): In-place algorithms (e.g., Bubble Sort)\n• O(n): Arrays, HashMaps, recursion stack depth\n• O(n²): 2D matrices\n• Trade-off: Sometimes you use more space to reduce time (e.g., Memoization in DP)\n• Interview Tip: Mention both time and space complexity when analyzing solutions",

//             "what is big o notation": "Big O Notation describes the upper bound of an algorithm's time or space complexity.\n• O(1): Constant time — accessing array element by index\n• O(log n): Logarithmic — Binary Search\n• O(n): Linear — traversing an array\n• O(n log n): Linearithmic — Merge Sort, Quick Sort (average)\n• O(n²): Quadratic — Bubble Sort, nested loops\n• O(2^n): Exponential — recursive Fibonacci without memoization\n• O(n!): Factorial — generating all permutations\n• Interview Tip: Always optimize from brute force to better Big O",

//             "what is bubble sort": "Bubble Sort is a simple sorting algorithm that repeatedly swaps adjacent elements if they are in wrong order.\n• Time: O(n²) worst/average, O(n) best (already sorted)\n• Space: O(1) — in-place\n• Stable: Yes\n• Not recommended for large datasets — use Merge Sort or Quick Sort instead",

//             "what is merge sort": "Merge Sort is a divide-and-conquer sorting algorithm.\n• Time: O(n log n) in all cases (best, average, worst)\n• Space: O(n) — requires extra array\n• Stable: Yes\n• How it works: Divide array into halves → Recursively sort each half → Merge sorted halves\n• Best for: Large datasets, linked lists, external sorting",

//             "what is quick sort": "Quick Sort is a divide-and-conquer sorting algorithm that uses a pivot element.\n• Time: O(n log n) average, O(n²) worst (bad pivot choice)\n• Space: O(log n) — recursive stack\n• Unstable: No guarantee of preserving equal elements order\n• Fastest in practice for most datasets",

//             "what is dijkstra algorithm": "Dijkstra's Algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph.\n• Time: O((V + E) log V) with priority queue (min-heap)\n• Works only for non-negative edge weights\n• Applications: Google Maps, network routing, GPS navigation",

//             "what is two pointer technique": "Two Pointer Technique uses two pointers to solve array/string problems efficiently.\n• Types: Same direction (fast & slow), Opposite direction (left & right)\n• Time: Usually O(n) — linear\n• Common problems: Two Sum (sorted array), Container With Most Water, Remove Duplicates, Palindrome Check",

//             "what is sliding window": "Sliding Window is a technique to solve subarray/substring problems efficiently.\n• Types: Fixed-size window, Variable-size window\n• Time: Usually O(n) — linear\n• Common problems: Maximum Sum Subarray of Size K, Longest Substring Without Repeating Characters",

//             "what is topological sort": "Topological Sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG).\n• For every edge u → v, u comes before v in the ordering\n• Algorithms: Kahn's Algorithm (BFS + indegree), DFS-based\n• Time: O(V + E)\n• Applications: Task scheduling, build systems, course prerequisite ordering",

//             // ==========================================
//             // WEB DEVELOPMENT (MERN STACK)
//             // ==========================================
//             "what is react": "React.js is a JavaScript library for building user interfaces, developed by Facebook (Meta).\n• Component-based architecture (reusable UI components)\n• Uses Virtual DOM for efficient re-rendering\n• Key concepts: JSX, Components (Functional + Class), Props, State, Hooks (useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef)\n• State management: Context API, Redux, Zustand, Recoil\n• Routing: React Router (react-router-dom)\n• Used in: Facebook, Instagram, Netflix, Airbnb, WhatsApp Web",

//             "what is reactjs": "React.js is a JavaScript library for building user interfaces, developed by Facebook (Meta).\n• Component-based architecture (reusable UI components)\n• Uses Virtual DOM for efficient re-rendering\n• Key concepts: JSX, Components, Props, State, Hooks\n• Hooks: useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef\n• Lifecycle: Mounting → Updating → Unmounting\n• Used in: Facebook, Instagram, Netflix, Airbnb",

//             "what is nodejs": "Node.js is a JavaScript runtime built on Chrome's V8 engine for server-side programming.\n• Non-blocking, event-driven, asynchronous I/O model\n• Single-threaded but handles concurrency via event loop\n• Package manager: npm (Node Package Manager)\n• Key modules: http, fs, path, events, stream, crypto\n• Used for: REST APIs, real-time apps, microservices, CLI tools\n• Used in: Netflix, PayPal, LinkedIn, Uber, NASA",

//             "what is expressjs": "Express.js is a minimal and flexible Node.js web application framework.\n• Simplifies building REST APIs and web servers\n• Key features: Routing, Middleware, Template engines, Error handling\n• Middleware: Functions that execute during request-response cycle (e.g., body-parser, cors, morgan, helmet)\n• HTTP Methods: GET, POST, PUT, PATCH, DELETE\n• Used with: MongoDB (MERN stack), PostgreSQL, MySQL",

//             "what is mongodb": "MongoDB is a NoSQL, document-oriented database that stores data in flexible JSON-like documents (BSON).\n• Schema-less: No fixed table structure (unlike SQL databases)\n• Key concepts: Database → Collections → Documents\n• CRUD: insertOne(), find(), updateOne(), deleteOne()\n• Advanced: Aggregation pipeline, indexing, sharding, replication\n• ODM: Mongoose (for Node.js)\n• Used in: Uber, Forbes, eBay, Google",

//             "what is nosql": "NoSQL (Not Only SQL) databases are non-relational databases designed for flexibility and scalability.\n• Types:\n  1. Document-based: MongoDB, CouchDB (JSON-like documents)\n  2. Key-Value: Redis, DynamoDB (fast caching)\n  3. Column-family: Cassandra, HBase (wide-column stores)\n  4. Graph: Neo4j, ArangoDB (relationship-heavy data)\n• Advantages: Flexible schema, horizontal scaling, high performance for large data\n• SQL vs NoSQL: SQL for structured data with relationships; NoSQL for unstructured/semi-structured data",

//             "what is mongoose": "Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.\n• Provides schema-based solution to model application data\n• Key features: Schema definition, validation, middleware (pre/post hooks), population (joins), virtuals\n• CRUD: User.create(), User.find(), User.findByIdAndUpdate(), User.findByIdAndDelete()",

//             "what is rest api": "REST API (Representational State Transfer) is an architectural style for designing networked applications.\n• Uses HTTP methods: GET (read), POST (create), PUT (update entire), PATCH (update partial), DELETE (remove)\n• Key principles: Stateless, Client-Server, Cacheable, Uniform Interface, Layered System\n• Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)",

//             "what is mern stack": "MERN Stack is a full-stack JavaScript development stack.\n• M - MongoDB (Database — NoSQL document store)\n• E - Express.js (Backend framework for Node.js)\n• R - React.js (Frontend library for building UI)\n• N - Node.js (JavaScript runtime for server-side)\n• Advantages: Full JavaScript stack, JSON data flow end-to-end, large community, fast development",

//             "what is jwt": "JWT (JSON Web Token) is a compact, URL-safe token for securely transmitting information.\n• Structure: Header.Payload.Signature (Base64 encoded)\n• Used for: Authentication and authorization in web applications\n• Flow: User logs in → Server creates JWT → Client stores token → Sends token in headers for protected routes",

//             "what is middleware": "Middleware is a function that executes between receiving a request and sending a response.\n• In Express.js: app.use(middlewareFunction)\n• Has access to: req (request), res (response), next (passes control to next middleware)\n• Types: Application-level, Router-level, Error-handling, Built-in, Third-party\n• Common middleware: express.json(), cors, morgan, helmet, multer",

//             "what is virtual dom": "Virtual DOM is a lightweight JavaScript representation of the actual DOM used by React.\n• How it works: React creates a virtual copy of the DOM → When state changes, a new Virtual DOM is created → React compares (diffs) old vs new Virtual DOM → Only changed elements are updated in the real DOM (reconciliation)\n• Benefits: Faster updates, batch processing, minimal DOM manipulation",

//             "what are react hooks": "React Hooks are functions that let you use state and lifecycle features in functional components.\n• Introduced in React 16.8\n• Common Hooks:\n  - useState: Manage local state\n  - useEffect: Side effects (API calls, subscriptions, timers)\n  - useContext: Access context without Consumer wrapper\n  - useReducer: Complex state logic (like Redux)\n  - useMemo: Memoize expensive computations\n  - useCallback: Memoize functions to prevent unnecessary re-renders\n  - useRef: Access DOM elements or persist values across renders\n• Rules: Only call at top level; only call in React functions",

//             "what is redux": "Redux is a predictable state management library for JavaScript applications.\n• Core concepts: Store (single source of truth), Actions (what happened), Reducers (how state changes), Dispatch (trigger actions)\n• Flow: Component → dispatch(action) → Reducer → Updated Store → Component re-renders\n• Redux Toolkit (RTK): Modern, simplified Redux with createSlice, configureStore, createAsyncThunk",

//             // ==========================================
//             // POLITICAL KNOWLEDGE
//             // ==========================================
//             "who is prime minister of india": "Narendra Modi is the Prime Minister of India since May 2014.\n• Belongs to Bharatiya Janata Party (BJP)\n• Represents Varanasi constituency\n• Key initiatives: Digital India, Startup India, Swachh Bharat, Make in India",

//             "what is president of india": "The President of India is the head of state and supreme commander of the armed forces.\n• Current President: Droupadi Murmu (since July 25, 2022)\n• She is the first tribal woman and second woman to hold the office\n• First President: Dr. Rajendra Prasad",

//             "who is president of india": "Droupadi Murmu is the current President of India since July 25, 2022.\n• She is the 15th President of India\n• First tribal woman and second woman to become President\n• Belongs to the Santhal tribe from Odisha",

//             "who is president of usa": "The current President of the United States is Joe Biden (since January 20, 2021).\n• 46th President of the USA\n• Belongs to the Democratic Party\n• Vice President: Kamala Harris (first woman, first Asian-American, first African-American VP)",

//             "what is democracy": "Democracy is a system of government where power belongs to the people.\n• Types: Direct Democracy and Representative Democracy\n• India: Largest democracy in the world (Parliamentary system)\n• Key features: Free & fair elections, fundamental rights, rule of law, separation of powers\n• Pillars: Legislature, Executive, Judiciary, Media (4th pillar)",

//             "what is constitution of india": "The Constitution of India is the supreme law of the country, adopted on November 26, 1949, and came into effect on January 26, 1950.\n• Dr. B.R. Ambedkar: Chairman of the Drafting Committee (Father of the Constitution)\n• Features: Longest written constitution, federal with unitary bias, parliamentary government",

//             "what is g20": "The G20 (Group of Twenty) is an intergovernmental forum of 19 countries + the European Union.\n• Founded in 1999 to address global financial stability\n• Members include India, USA, China, Japan, EU, etc.\n• Recent: India hosted G20 summit in 2023",

//             "what is united nations": "The United Nations (UN) is an international organization founded on October 24, 1945.\n• Headquarters: New York City, USA\n• 193 member states\n• Security Council: 5 permanent members (USA, UK, France, Russia, China) with veto power",

//             "what is nato": "NATO (North Atlantic Treaty Organization) is a military alliance formed on April 4, 1949.\n• Headquarters: Brussels, Belgium\n• Core principle: Article 5 — An attack on one member is an attack on all\n• India is NOT a member of NATO",

//             "what is brics": "BRICS is an association of major emerging economies.\n• Original members: Brazil, Russia, India, China, South Africa\n• New members (2024): Iran, Egypt, Ethiopia, UAE, Saudi Arabia\n• Purpose: Reform global governance, promote economic cooperation",

//             "what is parliament of india": "The Parliament of India is the supreme legislative body of the country.\n• Consists of: President + Rajya Sabha (Council of States) + Lok Sabha (House of the People)\n• Lok Sabha: 543 elected members, 5-year term\n• Rajya Sabha: 245 members, 6-year term",

//             "what is supreme court of india": "The Supreme Court of India is the highest judicial authority and guardian of the Constitution.\n• Established: January 28, 1950\n• Location: New Delhi\n• Power of Judicial Review: Can strike down unconstitutional laws",

//             "what is election commission of india": "The Election Commission of India (ECI) is an autonomous constitutional body responsible for conducting elections.\n• Established: January 25, 1950\n• Article 324 of the Constitution\n• Key features: Model Code of Conduct, EVMs, VVPAT",

//             "who is chief minister": "A Chief Minister (CM) is the head of government in an Indian state or union territory.\n• Appointed by the Governor\n• Leader of the majority party in the State Legislative Assembly",

//             // ==========================================
//             // IT TECH ROLES
//             // ==========================================
//             "what is software engineer": "A Software Engineer designs, develops, tests, and maintains software applications.\n• Skills required: Programming (Java, Python, C++, JavaScript), Data Structures & Algorithms, System Design, Databases\n• Average salary (India): ₹6-25 LPA\n• Growth path: SDE-1 → SDE-2 → Senior SDE → Tech Lead → Engineering Manager → CTO",

//             "what is frontend developer": "A Frontend Developer builds the user-facing part of websites and web applications.\n• Core skills: HTML, CSS, JavaScript\n• Frameworks/Libraries: React.js, Angular, Vue.js, Next.js\n• Average salary (India): ₹4-18 LPA",

//             "what is backend developer": "A Backend Developer builds the server-side logic, databases, and APIs of applications.\n• Languages: Node.js, Python (Django/Flask), Java (Spring Boot), Go\n• Databases: MongoDB, PostgreSQL, MySQL, Redis\n• Average salary (India): ₹5-22 LPA",

//             "what is fullstack developer": "A Full-Stack Developer works on both frontend and backend of web applications.\n• Frontend: HTML, CSS, JavaScript, React.js/Angular/Vue.js\n• Backend: Node.js/Express.js, Python/Django, Java/Spring Boot\n• Popular stacks: MERN, MEAN, LAMP\n• Average salary (India): ₹6-25 LPA",

//             "what is devops engineer": "A DevOps Engineer bridges the gap between development and operations teams.\n• Tools: Docker, Kubernetes, Jenkins, GitHub Actions, Terraform, Ansible\n• Cloud: AWS, Google Cloud, Azure\n• Average salary (India): ₹8-30 LPA",

//             "what is data scientist": "A Data Scientist analyzes and interprets complex data to help organizations make better decisions.\n• Skills: Python/R, Statistics, Machine Learning, Deep Learning, SQL\n• Libraries: NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, PyTorch\n• Average salary (India): ₹8-30 LPA",

//             "what is data analyst": "A Data Analyst collects, processes, and analyzes data to provide actionable insights.\n• Skills: SQL, Excel, Python/R, Data Visualization\n• Tools: Tableau, Power BI, Google Analytics\n• Average salary (India): ₹4-15 LPA",

//             "what is machine learning engineer": "A Machine Learning Engineer builds and deploys ML models for production systems.\n• Skills: Python, Mathematics, ML algorithms\n• Types of ML: Supervised, Unsupervised, Reinforcement Learning\n• Average salary (India): ₹10-35 LPA",

//             "what is cloud engineer": "A Cloud Engineer designs, manages, and maintains cloud-based infrastructure.\n• Platforms: AWS, Google Cloud, Microsoft Azure\n• Skills: Linux, networking, Docker, Kubernetes, Terraform\n• Average salary (India): ₹8-28 LPA",

//             "what is cybersecurity analyst": "A Cybersecurity Analyst protects an organization's systems and data from cyber threats.\n• Tools: Wireshark, Nmap, Burp Suite, Metasploit, Kali Linux\n• Certifications: CEH, CompTIA Security+, CISSP, OSCP\n• Average salary (India): ₹6-25 LPA",

//             "what is product manager": "A Product Manager (PM) defines the product vision, strategy, and roadmap.\n• Skills: User research, data analysis, stakeholder management, prioritization\n• Tools: Jira, Trello, Figma, Amplitude\n• Average salary (India): ₹12-40 LPA",

//             "what is qa engineer": "A QA (Quality Assurance) Engineer ensures software quality through testing.\n• Types: Manual testing, Automated testing, Unit testing, Integration testing, E2E testing\n• Tools: Selenium, Cypress, Jest, Mocha, JUnit, Postman\n• Average salary (India): ₹4-18 LPA",

//             "what is ui ux designer": "A UI/UX Designer creates user-friendly and visually appealing digital experiences.\n• UX: Research, wireframes, user flows, prototyping, usability testing\n• UI: Visual design, typography, color theory, responsive layouts\n• Tools: Figma, Adobe XD, Sketch\n• Average salary (India): ₹5-20 LPA",

//             "what is blockchain developer": "A Blockchain Developer builds decentralized applications (dApps) and smart contracts.\n• Skills: Solidity (Ethereum), JavaScript, Rust (Solana), cryptography\n• Platforms: Ethereum, Solana, Polygon, Hyperledger\n• Average salary (India): ₹8-35 LPA",

//             // ==========================================
//             // TOOLS & TECHNOLOGIES
//             // ==========================================
//             "what is docker": "Docker is a platform for developing, shipping, and running applications in containers.\n• Container: A lightweight, standalone, executable package\n• Key concepts: Dockerfile, Image, Container, Docker Hub\n• Commands: docker build, docker run, docker pull, docker push, docker-compose\n• Used in: Microservices, CI/CD pipelines, cloud deployment",

//             "what is kubernetes": "Kubernetes (K8s) is an open-source container orchestration platform.\n• Automates deployment, scaling, and management of containerized applications\n• Key concepts: Pods, Nodes, Clusters, Services, Deployments\n• Developed by Google, now maintained by CNCF",

//             "what is git": "Git is a distributed version control system for tracking changes in source code.\n• Created by Linus Torvalds in 2005\n• Commands: git init, git add, git commit, git push, git pull, git branch, git merge\n• Platforms: GitHub, GitLab, Bitbucket",

//             "what is github": "GitHub is a cloud-based platform for hosting Git repositories and collaborating on code.\n• Features: Pull Requests, Issues, Actions (CI/CD), Projects, GitHub Pages\n• GitHub Copilot: AI-powered code completion\n• Alternatives: GitLab, Bitbucket",

//             "what is ci cd": "CI/CD stands for Continuous Integration and Continuous Deployment/Delivery.\n• CI: Automatically build and test code on every commit\n• CD: Automatically deploy to staging/production\n• Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI",

//             "what is agile": "Agile is a project management methodology that emphasizes iterative development and collaboration.\n• Frameworks: Scrum, Kanban, XP (Extreme Programming)\n• Scrum: Sprints (2-4 weeks), Daily Standups, Sprint Planning, Retrospective\n• Tools: Jira, Trello, Asana",

//             "what is api": "API (Application Programming Interface) is a set of rules that allows software applications to communicate.\n• Types: REST API, GraphQL, SOAP, WebSocket\n• REST API: Uses HTTP methods (GET, POST, PUT, DELETE) with JSON responses\n• Authentication: API Keys, JWT, OAuth 2.0",

//             "what is microservices": "Microservices is an architectural style where an application is built as a collection of small, independent services.\n• Communication: REST, gRPC, Message Queues (RabbitMQ, Kafka)\n• Tools: Docker, Kubernetes, API Gateway\n• Used in: Netflix, Amazon, Uber, Spotify",

//             "what is cloud computing": "Cloud Computing is the delivery of computing services over the internet.\n• Models: IaaS (Infrastructure), PaaS (Platform), SaaS (Software)\n• Providers: AWS, Google Cloud (GCP), Microsoft Azure\n• Benefits: Pay-as-you-go, scalability, reliability, global availability",

//             "what is aws": "AWS (Amazon Web Services) is the world's leading cloud computing platform.\n• Key services: EC2, S3, Lambda, RDS, DynamoDB, VPC, CloudFront\n• Used by: Netflix, Airbnb, NASA, Twitch\n• Certifications: Solutions Architect, Developer Associate",

//             "what is linux": "Linux is a free, open-source operating system kernel used in servers, cloud, and development.\n• Created by Linus Torvalds in 1991\n• Distributions: Ubuntu, CentOS, Fedora, Debian, Arch Linux, Kali Linux\n• Used in: ~96% of web servers, Android, cloud infrastructure",

//             // ==========================================
//             // OOP CONCEPTS
//             // ==========================================
//             "what is oops": "OOP (Object-Oriented Programming) is a programming paradigm based on the concept of objects.\n• 4 Pillars:\n  1. Encapsulation: Bundling data and methods, hiding internal details\n  2. Abstraction: Showing only essential features, hiding complexity\n  3. Inheritance: Child class inherits properties of parent class\n  4. Polymorphism: Same method behaves differently (overloading & overriding)",

//             "what is encapsulation": "Encapsulation is the bundling of data (variables) and methods that operate on that data into a single unit (class).\n• Also involves restricting direct access to internal data (data hiding)\n• Achieved using access modifiers: private, protected, public\n• Getters and Setters provide controlled access",

//             "what is inheritance": "Inheritance is the mechanism where a child class inherits properties and methods from a parent class.\n• Types: Single, Multilevel, Hierarchical, Multiple (C++, Python), Hybrid\n• Benefits: Code reuse, method overriding, establishing is-a relationship",

//             "what is polymorphism": "Polymorphism means 'many forms' — same method name behaves differently based on context.\n• Compile-time (Static): Method Overloading — same method name, different parameters\n• Runtime (Dynamic): Method Overriding — child class redefines parent method",

//             "what is abstraction": "Abstraction is the concept of hiding complex implementation details and showing only essential features.\n• Achieved using: Abstract classes and Interfaces\n• Real-world example: You drive a car without knowing engine internals",

//             "what is design pattern": "Design Patterns are reusable solutions to commonly occurring problems in software design.\n• Types:\n  1. Creational: Singleton, Factory, Builder, Prototype\n  2. Structural: Adapter, Decorator, Proxy, Facade\n  3. Behavioral: Observer, Strategy, Command, Iterator",

//             // ==========================================
//             // THINKLY LABS
//             // ==========================================
//             "what is thinkly labs": "Thinkly Labs is a technology-driven company focused on building innovative digital solutions and empowering businesses through cutting-edge technology.\n• Specializes in software development, web applications, mobile apps, and digital transformation\n• Works on modern tech stacks including MERN, React Native, AI/ML, and cloud-based solutions\n• Vision: To be a leading technology partner for businesses and a launchpad for aspiring tech professionals",

//             "who is the founder of thinkly labs": "Thinkly Labs was founded by visionary tech entrepreneurs who are passionate about innovation and technology.\n• The founder(s) established Thinkly Labs with a mission to bridge the gap between ideas and technology\n• For the most accurate founder details, please visit the official Thinkly Labs website or LinkedIn page",

//             "where is thinkly labs located": "Thinkly Labs is a technology company based in India.\n• The company operates from its headquarters and also supports remote/hybrid work culture\n• They serve clients both domestically and internationally",

//             "when was thinkly labs started": "Thinkly Labs was established as a technology startup in India.\n• The company was founded with the vision of creating impactful digital solutions\n• For the precise founding date, please check the official Thinkly Labs website",

//             "why was thinkly labs established": "Thinkly Labs was established to address key challenges in the technology industry.\n• Mission: To build innovative, scalable, and impactful technology solutions\n• To bridge the gap between academic learning and industry-ready skills\n• Core values: Innovation, Quality, Integrity, Continuous Learning, Community Impact",

//             "tell me about thinkly labs": "Thinkly Labs is a technology company dedicated to building innovative digital products and solutions.\n• Specializes in software development, web & mobile applications, AI/ML solutions, and cloud services\n• Works on: MERN Stack, React Native, Python, AI/ML\n• Provides end-to-end services: Consulting, Design, Development, Testing, Deployment, and Maintenance\n• Mission: To empower businesses with cutting-edge technology and nurture tech talent",

//             "what services does thinkly labs provide": "Thinkly Labs offers a wide range of technology services:\n1. Web Development (MERN stack, Next.js)\n2. Mobile App Development (React Native, Flutter)\n3. AI/ML Solutions\n4. Cloud Services (AWS, GCP, Azure)\n5. DevOps (CI/CD, Docker, Kubernetes)\n6. UI/UX Design\n7. Data Analytics\n8. Training & Mentorship\n9. IT Consulting\n10. Quality Assurance",

//             "what technologies does thinkly labs use": "Thinkly Labs works with modern technologies:\n• Frontend: React.js, Next.js, Angular, Vue.js, Tailwind CSS\n• Backend: Node.js, Express.js, Python, Java\n• Databases: MongoDB, PostgreSQL, MySQL, Redis\n• Mobile: React Native, Flutter\n• AI/ML: TensorFlow, PyTorch, Scikit-learn\n• Cloud: AWS, Google Cloud, Azure\n• DevOps: Docker, Kubernetes, Jenkins, GitHub Actions",

//             // ==========================================
//             // INTERVIEW PREPARATION
//             // ==========================================
//             "tell me about yourself": "This is usually the first interview question.\nStructure:\n• Start with a brief intro (name, background, education/work)\n• Highlight your skills (technical + soft skills)\n• Share achievements (projects, internships, leadership roles)\n• Conclude with why you're excited about this role",

//             "why should we hire you": "HR wants to see your value-add.\n• Emphasize skills that match job requirements\n• Show enthusiasm and cultural fit\n• Example: 'I bring strong coding skills in Python and SQL, along with problem-solving ability proven through hackathons.'",

//             "what is leadership": "Leadership is the ability to inspire and guide others toward achieving goals.\n• Key traits: vision, communication, accountability, decision-making\n• Example in interview: 'I led a college project team of 4 members and delivered a working prototype before schedule.'",

//             // ==========================================
//             // SPORTS
//             // ==========================================
//             "who is virat kohli": "Virat Kohli is one of India's greatest batsmen and former captain.\n• Known for consistency, fitness, and aggressive play\n• Nicknamed 'Chase Master' for his performance in run-chases",

//             "what is ipl": "The Indian Premier League (IPL) is a professional T20 cricket league started in 2008.\n• Played annually in India, franchise-based teams\n• Combines cricket + entertainment (biggest sports league in India)",

//             // ==========================================
//             // DEFAULT RESPONSE
//             // ==========================================
//             "default": "I'm sorry, I didn't understand that. Could you please rephrase your question? You can ask me about:\n• Programming Languages (Python, Java, JavaScript, C, C++, etc.)\n• Data Structures & Algorithms (Array, LinkedList, Stack, Queue, Tree, Graph, Sorting, DP, etc.)\n• Web Development (React.js, Node.js, Express.js, MongoDB, REST API, MERN Stack)\n• IT Tech Roles (Software Engineer, Frontend/Backend Developer, DevOps, Data Scientist, etc.)\n• Political Knowledge (Indian politics, world organizations, government structure)\n• Thinkly Labs (Company info, services, technologies)\n• Interview Preparation (HR questions, technical concepts)\n• Tools & Technologies (Docker, Kubernetes, Git, AWS, CI/CD, etc.)\n\nTry asking something specific like 'What is React?' or 'What is dynamic programming?'"
//         };

//         // ✅ Normalize user input and find bot response
//         const normalizedText = text.trim().toLowerCase();
//         const botReply = botResponses[normalizedText] || botResponses["default"];

//         // ✅ Save bot response to database
//         const bot = await Bot.create({
//             text: botReply
//         });

//         console.log("Bot Reply:", botReply.substring(0, 50) + "...");

//         // ✅ Send response back to frontend
//         return res.status(200).json({
//             success: true,
//             userMessage: user.text,
//             botMessage: bot.text
//         });

//     } catch (error) {
//         console.error("Error in Message controller:", error);
//         return res.status(500).json({ 
//             success: false,
//             error: "Internal Server Error" 
//         });
//     }
// };


























import Bot from '../models/bot.model.js';
import User from '../models/user.model.js';

export const Message = async (req, res) => {
    try {
        // ✅ DEBUG: Log incoming request details
        console.log("=== REQUEST DEBUG ===");
        console.log("Content-Type:", req.headers['content-type']);
        console.log("req.body:", req.body);
        console.log("=====================");

        // ✅ Check if req.body exists
        if (!req.body) {
            return res.status(400).json({ 
                error: "Request body is empty. Please send JSON data with Content-Type: application/json" 
            });
        }

        const { text } = req.body;

        // ✅ Validate text field
        if (!text?.trim()) {
            return res.status(400).json({ 
                error: "Text cannot be empty" 
            });
        }

        console.log("User Message:", text);

        // ✅ Save user message to database (with protection)
        try {
            await User.create({
                sender: "user",
                text: text.trim()
            });
        } catch (dbError) {
            console.error("User save failed (non-critical):", dbError.message);
            // Don't crash — continue to send bot reply
        }

        // ✅ Bot responses data
        const botResponses = {
            "hello": "Hi, How I can help you!!",
            "hi": "Hello! How can I assist you today?",
            "hey": "Hey there! What can I do for you?",
            "can we become friend": "Yes",
            "how are you": "I'm just a bot, but I'm doing great! How about you?",
            "what is your name": "I'm Ashu the great ChatBot, your virtual assistant.",
            "who made you": "I was created by developer Arshad Wasib Shaik known as Ashu, to help answer your questions.",
            "tell me a joke": "Why don't skeletons fight each other? They don't have the guts!",
            "what is the time": "I can't see a clock, but your device should know.",
            "bye": "Goodbye! Have a great day.",
            "thank you": "You're welcome!",
            "thanks": "You're welcome! Happy to help!",
            "i love you": "That's sweet! I'm here to help you anytime.",
            "where are you from": "I live in the cloud — no rent, no bills, no sleep, no food, no feelings, no heart but with knowledge of limited data only!",
            "what can you do": "I can chat with you, answer questions, and keep you company.",

            // ==========================================
            // PROGRAMMING LANGUAGES
            // ==========================================
            "what is python": "Python is a high-level, interpreted programming language known for simplicity and versatility.\n• Easy to read/write due to clean syntax (similar to English)\n• Dynamically typed and supports multiple paradigms (OOP, functional, procedural)\n• Extensive libraries for AI, data science, web, automation\n• Example: Used in Google, YouTube, Instagram, and machine learning applications",

            "what is java": "Java is a platform-independent, object-oriented programming language.\n• Famous for 'Write Once, Run Anywhere' due to JVM (Java Virtual Machine)\n• Used in enterprise systems, Android development, cloud apps\n• Provides features like garbage collection, strong memory management\n• Example: Banking systems, Android apps, large-scale enterprise applications",

            "what is javascript": "JavaScript is a lightweight, interpreted programming language primarily used for web development.\n• It runs in the browser (client-side) and also on the server (Node.js)\n• Supports event-driven, functional, and object-oriented programming\n• Key features: DOM manipulation, async programming (Promises, async/await), closures, prototypal inheritance\n• Used in: React.js, Angular, Vue.js, Node.js, Express.js\n• Example: Every interactive website you visit uses JavaScript (form validation, animations, API calls)",

            "what is c language": "C is a general-purpose, procedural programming language developed by Dennis Ritchie in 1972.\n• Known as the 'mother of all programming languages'\n• Provides low-level access to memory via pointers\n• Used in: Operating systems (Linux, Windows kernel), embedded systems, compilers\n• Key features: fast execution, manual memory management (malloc, calloc, free), structured programming\n• Example: The Linux kernel and most OS kernels are written in C",

            "what is c++": "C++ is an extension of C that adds object-oriented programming (OOP) features.\n• Developed by Bjarne Stroustrup in 1979\n• Supports classes, inheritance, polymorphism, encapsulation, abstraction\n• Used in: Game development (Unreal Engine), system software, competitive programming\n• Key features: STL (Standard Template Library), operator overloading, templates, multi-threading\n• Example: Google Chrome, Adobe Photoshop, and most AAA games use C++",

            "what is typescript": "TypeScript is a strongly-typed superset of JavaScript developed by Microsoft.\n• Adds static type checking to JavaScript\n• Compiles down to plain JavaScript\n• Helps catch errors at compile time rather than runtime\n• Key features: interfaces, generics, enums, type aliases, decorators\n• Used in: Angular (default), large-scale React/Node.js projects\n• Example: VS Code itself is built with TypeScript",

            "what is html": "HTML (HyperText Markup Language) is the standard markup language for creating web pages.\n• Provides the structure/skeleton of a webpage\n• Uses tags like <div>, <h1>, <p>, <a>, <img>, <form>, <table>\n• HTML5 introduced semantic elements: <header>, <footer>, <section>, <article>, <nav>\n• Works together with CSS (styling) and JavaScript (interactivity)\n• Example: Every website on the internet starts with an HTML document",

            "what is css": "CSS (Cascading Style Sheets) is used to style and layout HTML elements.\n• Controls colors, fonts, spacing, positioning, animations\n• Key concepts: Box Model, Flexbox, CSS Grid, Media Queries (responsive design)\n• CSS3 added transitions, animations, gradients, shadows\n• Preprocessors: SASS, LESS for advanced styling\n• Frameworks: Bootstrap, Tailwind CSS\n• Example: The beautiful designs you see on websites are all CSS",

            "what is sql": "SQL (Structured Query Language) is used to manage and query relational databases.\n• Operations: SELECT, INSERT, UPDATE, DELETE (CRUD)\n• Advanced: JOINs (INNER, LEFT, RIGHT, FULL), subqueries, GROUP BY, HAVING, indexes\n• Used in: MySQL, PostgreSQL, Oracle, SQL Server, SQLite\n• Key concepts: normalization, primary key, foreign key, ACID properties\n• Example: 'SELECT * FROM users WHERE age > 25 ORDER BY name ASC;'",

            "what is go language": "Go (Golang) is an open-source programming language developed by Google in 2009.\n• Designed for simplicity, efficiency, and concurrency\n• Compiled language with garbage collection\n• Key features: goroutines (lightweight threads), channels, fast compilation\n• Used in: Cloud infrastructure, microservices, DevOps tools\n• Example: Docker, Kubernetes, and Terraform are built with Go",

            "what is rust": "Rust is a systems programming language focused on safety, speed, and concurrency.\n• Guarantees memory safety without garbage collection (ownership model)\n• Prevents null pointer exceptions and data races at compile time\n• Used in: System-level programming, WebAssembly, blockchain, game engines\n• Key features: ownership, borrowing, lifetimes, pattern matching\n• Example: Firefox's Servo engine and parts of the Linux kernel use Rust",

            "what is kotlin": "Kotlin is a modern programming language developed by JetBrains.\n• Official language for Android development (declared by Google in 2019)\n• 100% interoperable with Java\n• Key features: null safety, extension functions, coroutines, data classes\n• More concise and safer than Java\n• Used in: Android apps, server-side development (Spring Boot + Kotlin)\n• Example: Pinterest, Trello, and Uber use Kotlin for Android",

            "what is swift": "Swift is a powerful programming language developed by Apple for iOS/macOS development.\n• Introduced in 2014 as a replacement for Objective-C\n• Key features: type safety, optionals, closures, protocol-oriented programming\n• Fast performance and modern syntax\n• Used in: iPhone apps, iPad apps, macOS apps, watchOS, tvOS\n• Example: Every iOS app in the App Store can be built with Swift",

            "what is php": "PHP (Hypertext Preprocessor) is a server-side scripting language for web development.\n• Powers over 75% of websites on the internet\n• Key features: easy database integration, session management, form handling\n• Frameworks: Laravel, Symfony, CodeIgniter\n• Used in: WordPress, Facebook (initially), Wikipedia, e-commerce sites\n• Example: WordPress (which powers ~40% of all websites) is built with PHP",

            "what is ruby": "Ruby is a dynamic, object-oriented programming language designed for developer happiness.\n• Created by Yukihiro Matsumoto in 1995\n• Famous framework: Ruby on Rails (web development)\n• Key features: everything is an object, blocks, mixins, metaprogramming\n• Convention over configuration philosophy\n• Used in: Startups, web apps, prototyping\n• Example: GitHub, Shopify, Airbnb (initially) were built with Ruby on Rails",

            "what is r language": "R is a programming language and environment for statistical computing and data visualization.\n• Widely used in data science, statistics, machine learning, bioinformatics\n• Rich ecosystem of packages: ggplot2, dplyr, tidyr, caret, shiny\n• Key features: data frames, vectorized operations, statistical modeling\n• Used in: Academic research, data analysis, biostatistics\n• Example: Data scientists and researchers use R for exploratory data analysis and statistical reports",

            "what is scala": "Scala is a high-level language that combines object-oriented and functional programming.\n• Runs on the JVM (Java Virtual Machine), interoperable with Java\n• Key features: pattern matching, immutability, type inference, traits\n• Used in: Big data processing with Apache Spark\n• Concise syntax compared to Java\n• Example: Twitter, LinkedIn, and Apache Spark are built with Scala",

            "what is perl": "Perl is a high-level, general-purpose programming language known for text processing.\n• Excellent for regular expressions and string manipulation\n• Used in: System administration, web development, network programming\n• Key features: CPAN (huge library repository), regex, flexible syntax\n• Often called the 'Swiss Army knife' of programming\n• Example: Used heavily in bioinformatics and legacy web systems",

            // ==========================================
            // DATA STRUCTURES
            // ==========================================
            "what is data structure": "A Data Structure is a way of organizing and storing data so it can be accessed and modified efficiently.\n• Types: Linear (Array, Linked List, Stack, Queue) and Non-Linear (Tree, Graph)\n• Choosing the right data structure impacts performance (time and space complexity)\n• Essential for coding interviews and competitive programming\n• Example: Using a HashMap for O(1) lookup vs Array for O(n) search",

            "what is array": "An Array is a collection of elements stored at contiguous memory locations.\n• Fixed size (in C/C++/Java) or dynamic (in Python/JavaScript)\n• Access: O(1) by index | Search: O(n) linear, O(log n) binary (sorted)\n• Insert/Delete: O(n) due to shifting\n• Used in: Storing lists, matrix operations, implementing other data structures\n• C Example: int arr[5] = {1, 2, 3, 4, 5};\n• Python Example: arr = [1, 2, 3, 4, 5]\n• Java Example: int[] arr = {1, 2, 3, 4, 5};",

            "what is linked list": "A Linked List is a linear data structure where elements (nodes) are connected via pointers.\n• Types: Singly Linked List, Doubly Linked List, Circular Linked List\n• Insert/Delete: O(1) at head | Search: O(n)\n• Advantage over arrays: Dynamic size, efficient insertions/deletions\n• Disadvantage: No random access, extra memory for pointers\n• C Example: struct Node { int data; struct Node* next; };\n• Java Example: class Node { int data; Node next; }\n• Python Example: class Node: def __init__(self, data): self.data = data; self.next = None",

            "what is stack": "A Stack is a linear data structure that follows LIFO (Last In, First Out) principle.\n• Operations: push (add), pop (remove), peek (top element) — all O(1)\n• Applications: Function call stack, undo/redo, expression evaluation, backtracking\n• Implementation: Using arrays or linked lists\n• C++ Example: stack<int> s; s.push(10); s.pop();\n• Java Example: Stack<Integer> s = new Stack<>(); s.push(10); s.pop();\n• Python Example: stack = []; stack.append(10); stack.pop()\n• JavaScript Example: let stack = []; stack.push(10); stack.pop();",

            "what is queue": "A Queue is a linear data structure that follows FIFO (First In, First Out) principle.\n• Operations: enqueue (add to rear), dequeue (remove from front) — all O(1)\n• Types: Simple Queue, Circular Queue, Priority Queue, Deque (Double-Ended Queue)\n• Applications: BFS traversal, task scheduling, printer queue, message queues\n• C++ Example: queue<int> q; q.push(10); q.pop();\n• Java Example: Queue<Integer> q = new LinkedList<>(); q.add(10); q.poll();\n• Python Example: from collections import deque; q = deque(); q.append(10); q.popleft()",

            "what is tree": "A Tree is a hierarchical, non-linear data structure consisting of nodes connected by edges.\n• Root: topmost node | Leaf: node with no children | Height: longest path from root to leaf\n• Types: Binary Tree, Binary Search Tree (BST), AVL Tree, Red-Black Tree, B-Tree, Trie\n• Traversals: Inorder (Left-Root-Right), Preorder (Root-Left-Right), Postorder (Left-Right-Root), Level Order (BFS)\n• Applications: File systems, databases (B-Tree), autocomplete (Trie), expression parsing\n• BST Property: Left child < Parent < Right child",

            "what is binary search tree": "A Binary Search Tree (BST) is a binary tree where left child < parent < right child.\n• Search/Insert/Delete: O(log n) average, O(n) worst case (skewed tree)\n• Inorder traversal gives sorted output\n• Balanced BSTs: AVL Tree, Red-Black Tree ensure O(log n) operations\n• Applications: Databases, dictionaries, priority queues\n• Common interview problems: Validate BST, Find LCA, Kth smallest element",

            "what is graph": "A Graph is a non-linear data structure consisting of vertices (nodes) and edges (connections).\n• Types: Directed/Undirected, Weighted/Unweighted, Cyclic/Acyclic\n• Representations: Adjacency Matrix, Adjacency List\n• Traversals: BFS (Breadth-First Search), DFS (Depth-First Search)\n• Algorithms: Dijkstra's (shortest path), Kruskal's/Prim's (MST), Topological Sort, Bellman-Ford\n• Applications: Social networks, Google Maps, network routing, recommendation systems",

            "what is hash table": "A Hash Table (HashMap) is a data structure that maps keys to values using a hash function.\n• Average: O(1) for insert, delete, search | Worst: O(n) due to collisions\n• Collision handling: Chaining (linked list), Open Addressing (linear probing, quadratic probing)\n• C++ Example: unordered_map<string, int> mp; mp['age'] = 25;\n• Java Example: HashMap<String, Integer> mp = new HashMap<>(); mp.put('age', 25);\n• Python Example: mp = {'age': 25}\n• JavaScript Example: let mp = new Map(); mp.set('age', 25);\n• Applications: Caching, databases, counting frequency, indexing",

            "what is heap": "A Heap is a complete binary tree that satisfies the heap property.\n• Min-Heap: Parent <= Children (root is minimum)\n• Max-Heap: Parent >= Children (root is maximum)\n• Operations: Insert O(log n), Extract Min/Max O(log n), Peek O(1)\n• Implementation: Usually with arrays\n• Applications: Priority Queue, Heap Sort, finding Kth largest/smallest element, Dijkstra's algorithm\n• C++ Example: priority_queue<int> maxHeap; priority_queue<int, vector<int>, greater<int>> minHeap;\n• Java Example: PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n• Python Example: import heapq; heapq.heappush(heap, 5); heapq.heappop(heap)",

            "what is trie": "A Trie (Prefix Tree) is a tree-like data structure used for efficient string operations.\n• Each node represents a character\n• Search/Insert: O(m) where m = length of the word\n• Applications: Autocomplete, spell checker, dictionary, IP routing, search engines\n• Space-efficient for storing large sets of strings with common prefixes\n• Common interview problems: Implement Trie, Word Search, Longest Common Prefix",

            "what is recursion": "Recursion is when a function calls itself to solve smaller parts of a problem.\n• Useful for problems that can be divided into subproblems (divide-and-conquer)\n• Requires a base condition to stop infinite looping\n• Commonly used in: factorial calculation, Fibonacci sequence, tree/graph traversal\n• Example in coding interview: 'Write a recursive function to reverse a linked list'",

            // ==========================================
            // ALGORITHMS
            // ==========================================
            "what is an algorithm": "An Algorithm is a step-by-step procedure to solve a specific problem.\n• Characteristics: Input, Output, Definiteness, Finiteness, Effectiveness\n• Types: Brute Force, Divide & Conquer, Greedy, Dynamic Programming, Backtracking\n• Analysis: Time Complexity and Space Complexity using Big O notation\n• Example: Binary Search is an algorithm to find an element in a sorted array in O(log n)\n• Interview Tip: Always discuss time and space complexity of your approach",

            "what is sorting": "Sorting is the process of arranging elements in a specific order (ascending/descending).\n• Common algorithms: Bubble Sort O(n²), Selection Sort O(n²), Insertion Sort O(n²), Merge Sort O(n log n), Quick Sort O(n log n avg), Heap Sort O(n log n)\n• Stable sorts preserve relative order of equal elements: Merge Sort, Insertion Sort\n• Unstable sorts: Quick Sort, Heap Sort, Selection Sort\n• In-place sorts use O(1) extra space: Quick Sort, Bubble Sort, Selection Sort\n• Best overall: Merge Sort (guaranteed O(n log n)), Quick Sort (fastest in practice)",

            "what is binary search": "Binary Search is a divide-and-conquer algorithm to find an element in a sorted array.\n• Time Complexity: O(log n) | Space: O(1) iterative, O(log n) recursive\n• How it works: Compare target with middle element, eliminate half each time\n• Applications: Searching in sorted arrays, finding boundaries, optimization problems",

            "what is dynamic programming": "Dynamic Programming (DP) is a technique to solve problems by breaking them into overlapping subproblems.\n• Two approaches: Top-Down (Memoization) and Bottom-Up (Tabulation)\n• Key properties: Optimal Substructure + Overlapping Subproblems\n• Classic problems: Fibonacci, Knapsack, Longest Common Subsequence (LCS), Coin Change, Longest Increasing Subsequence (LIS), Matrix Chain Multiplication, Edit Distance\n• Time complexity improvement: Exponential → Polynomial\n• Example: Fibonacci — Recursive O(2^n) → DP O(n)\n• Interview Tip: Always identify the state and transition (recurrence relation)",

            "what is greedy algorithm": "A Greedy Algorithm makes the locally optimal choice at each step hoping to find a global optimum.\n• Does NOT always give optimal solution (works only for specific problems)\n• Classic problems: Activity Selection, Huffman Coding, Fractional Knapsack, Dijkstra's Shortest Path, Prim's/Kruskal's MST, Job Scheduling\n• Greedy vs DP: Greedy makes one choice and never reconsiders; DP considers all possibilities\n• Interview Tip: Prove greedy choice property and optimal substructure before using",

            "what is backtracking": "Backtracking is a technique to solve problems by trying all possibilities and undoing (backtracking) bad choices.\n• Think of it as 'trial and error with undo'\n• Classic problems: N-Queens, Sudoku Solver, Rat in a Maze, Permutations, Combinations, Subset Sum, Word Search\n• Time complexity is usually exponential but pruning helps reduce it\n• Template: Choose → Explore → Un-choose\n• Interview Tip: Draw the recursion tree to understand the flow",

            "what is bfs": "BFS (Breadth-First Search) is a graph/tree traversal algorithm that explores level by level.\n• Uses a Queue data structure\n• Time: O(V + E) | Space: O(V)\n• Applications: Shortest path in unweighted graph, level-order traversal, connected components, web crawlers",

            "what is dfs": "DFS (Depth-First Search) is a graph/tree traversal algorithm that explores as deep as possible before backtracking.\n• Uses a Stack (or recursion)\n• Time: O(V + E) | Space: O(V)\n• Applications: Cycle detection, topological sort, connected components, path finding, maze solving",

            "what is time complexity": "Time Complexity measures how the runtime of an algorithm grows with input size.\n• Big O Notation: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)\n• O(1): Constant — Array access, HashMap lookup\n• O(log n): Logarithmic — Binary Search\n• O(n): Linear — Linear Search, single loop\n• O(n log n): Merge Sort, Quick Sort (average)\n• O(n²): Nested loops — Bubble Sort, Selection Sort\n• O(2^n): Recursive Fibonacci (without DP)\n• Interview Tip: Always analyze best, average, and worst case",

            "what is space complexity": "Space Complexity measures the total memory an algorithm uses relative to input size.\n• Includes: Input space + Auxiliary space (extra space used)\n• O(1): In-place algorithms (e.g., Bubble Sort)\n• O(n): Arrays, HashMaps, recursion stack depth\n• O(n²): 2D matrices\n• Trade-off: Sometimes you use more space to reduce time (e.g., Memoization in DP)\n• Interview Tip: Mention both time and space complexity when analyzing solutions",

            "what is big o notation": "Big O Notation describes the upper bound of an algorithm's time or space complexity.\n• O(1): Constant time — accessing array element by index\n• O(log n): Logarithmic — Binary Search\n• O(n): Linear — traversing an array\n• O(n log n): Linearithmic — Merge Sort, Quick Sort (average)\n• O(n²): Quadratic — Bubble Sort, nested loops\n• O(2^n): Exponential — recursive Fibonacci without memoization\n• O(n!): Factorial — generating all permutations\n• Interview Tip: Always optimize from brute force to better Big O",

            "what is bubble sort": "Bubble Sort is a simple sorting algorithm that repeatedly swaps adjacent elements if they are in wrong order.\n• Time: O(n²) worst/average, O(n) best (already sorted)\n• Space: O(1) — in-place\n• Stable: Yes\n• Not recommended for large datasets — use Merge Sort or Quick Sort instead",

            "what is merge sort": "Merge Sort is a divide-and-conquer sorting algorithm.\n• Time: O(n log n) in all cases (best, average, worst)\n• Space: O(n) — requires extra array\n• Stable: Yes\n• How it works: Divide array into halves → Recursively sort each half → Merge sorted halves\n• Best for: Large datasets, linked lists, external sorting",

            "what is quick sort": "Quick Sort is a divide-and-conquer sorting algorithm that uses a pivot element.\n• Time: O(n log n) average, O(n²) worst (bad pivot choice)\n• Space: O(log n) — recursive stack\n• Unstable: No guarantee of preserving equal elements order\n• Fastest in practice for most datasets",

            "what is dijkstra algorithm": "Dijkstra's Algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph.\n• Time: O((V + E) log V) with priority queue (min-heap)\n• Works only for non-negative edge weights\n• Applications: Google Maps, network routing, GPS navigation",

            "what is two pointer technique": "Two Pointer Technique uses two pointers to solve array/string problems efficiently.\n• Types: Same direction (fast & slow), Opposite direction (left & right)\n• Time: Usually O(n) — linear\n• Common problems: Two Sum (sorted array), Container With Most Water, Remove Duplicates, Palindrome Check",

            "what is sliding window": "Sliding Window is a technique to solve subarray/substring problems efficiently.\n• Types: Fixed-size window, Variable-size window\n• Time: Usually O(n) — linear\n• Common problems: Maximum Sum Subarray of Size K, Longest Substring Without Repeating Characters",

            "what is topological sort": "Topological Sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG).\n• For every edge u → v, u comes before v in the ordering\n• Algorithms: Kahn's Algorithm (BFS + indegree), DFS-based\n• Time: O(V + E)\n• Applications: Task scheduling, build systems, course prerequisite ordering",

            // ==========================================
            // WEB DEVELOPMENT (MERN STACK)
            // ==========================================
            "what is react": "React.js is a JavaScript library for building user interfaces, developed by Facebook (Meta).\n• Component-based architecture (reusable UI components)\n• Uses Virtual DOM for efficient re-rendering\n• Key concepts: JSX, Components (Functional + Class), Props, State, Hooks (useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef)\n• State management: Context API, Redux, Zustand, Recoil\n• Routing: React Router (react-router-dom)\n• Used in: Facebook, Instagram, Netflix, Airbnb, WhatsApp Web",

            "what is reactjs": "React.js is a JavaScript library for building user interfaces, developed by Facebook (Meta).\n• Component-based architecture (reusable UI components)\n• Uses Virtual DOM for efficient re-rendering\n• Key concepts: JSX, Components, Props, State, Hooks\n• Hooks: useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef\n• Lifecycle: Mounting → Updating → Unmounting\n• Used in: Facebook, Instagram, Netflix, Airbnb",

            "what is nodejs": "Node.js is a JavaScript runtime built on Chrome's V8 engine for server-side programming.\n• Non-blocking, event-driven, asynchronous I/O model\n• Single-threaded but handles concurrency via event loop\n• Package manager: npm (Node Package Manager)\n• Key modules: http, fs, path, events, stream, crypto\n• Used for: REST APIs, real-time apps, microservices, CLI tools\n• Used in: Netflix, PayPal, LinkedIn, Uber, NASA",

            "what is expressjs": "Express.js is a minimal and flexible Node.js web application framework.\n• Simplifies building REST APIs and web servers\n• Key features: Routing, Middleware, Template engines, Error handling\n• Middleware: Functions that execute during request-response cycle (e.g., body-parser, cors, morgan, helmet)\n• HTTP Methods: GET, POST, PUT, PATCH, DELETE\n• Used with: MongoDB (MERN stack), PostgreSQL, MySQL",

            "what is mongodb": "MongoDB is a NoSQL, document-oriented database that stores data in flexible JSON-like documents (BSON).\n• Schema-less: No fixed table structure (unlike SQL databases)\n• Key concepts: Database → Collections → Documents\n• CRUD: insertOne(), find(), updateOne(), deleteOne()\n• Advanced: Aggregation pipeline, indexing, sharding, replication\n• ODM: Mongoose (for Node.js)\n• Used in: Uber, Forbes, eBay, Google",

            "what is nosql": "NoSQL (Not Only SQL) databases are non-relational databases designed for flexibility and scalability.\n• Types:\n  1. Document-based: MongoDB, CouchDB (JSON-like documents)\n  2. Key-Value: Redis, DynamoDB (fast caching)\n  3. Column-family: Cassandra, HBase (wide-column stores)\n  4. Graph: Neo4j, ArangoDB (relationship-heavy data)\n• Advantages: Flexible schema, horizontal scaling, high performance for large data\n• SQL vs NoSQL: SQL for structured data with relationships; NoSQL for unstructured/semi-structured data",

            "what is mongoose": "Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.\n• Provides schema-based solution to model application data\n• Key features: Schema definition, validation, middleware (pre/post hooks), population (joins), virtuals\n• CRUD: User.create(), User.find(), User.findByIdAndUpdate(), User.findByIdAndDelete()",

            "what is rest api": "REST API (Representational State Transfer) is an architectural style for designing networked applications.\n• Uses HTTP methods: GET (read), POST (create), PUT (update entire), PATCH (update partial), DELETE (remove)\n• Key principles: Stateless, Client-Server, Cacheable, Uniform Interface, Layered System\n• Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)",

            "what is mern stack": "MERN Stack is a full-stack JavaScript development stack.\n• M - MongoDB (Database — NoSQL document store)\n• E - Express.js (Backend framework for Node.js)\n• R - React.js (Frontend library for building UI)\n• N - Node.js (JavaScript runtime for server-side)\n• Advantages: Full JavaScript stack, JSON data flow end-to-end, large community, fast development",

            "what is jwt": "JWT (JSON Web Token) is a compact, URL-safe token for securely transmitting information.\n• Structure: Header.Payload.Signature (Base64 encoded)\n• Used for: Authentication and authorization in web applications\n• Flow: User logs in → Server creates JWT → Client stores token → Sends token in headers for protected routes",

            "what is middleware": "Middleware is a function that executes between receiving a request and sending a response.\n• In Express.js: app.use(middlewareFunction)\n• Has access to: req (request), res (response), next (passes control to next middleware)\n• Types: Application-level, Router-level, Error-handling, Built-in, Third-party\n• Common middleware: express.json(), cors, morgan, helmet, multer",

            "what is virtual dom": "Virtual DOM is a lightweight JavaScript representation of the actual DOM used by React.\n• How it works: React creates a virtual copy of the DOM → When state changes, a new Virtual DOM is created → React compares (diffs) old vs new Virtual DOM → Only changed elements are updated in the real DOM (reconciliation)\n• Benefits: Faster updates, batch processing, minimal DOM manipulation",

            "what are react hooks": "React Hooks are functions that let you use state and lifecycle features in functional components.\n• Introduced in React 16.8\n• Common Hooks:\n  - useState: Manage local state\n  - useEffect: Side effects (API calls, subscriptions, timers)\n  - useContext: Access context without Consumer wrapper\n  - useReducer: Complex state logic (like Redux)\n  - useMemo: Memoize expensive computations\n  - useCallback: Memoize functions to prevent unnecessary re-renders\n  - useRef: Access DOM elements or persist values across renders\n• Rules: Only call at top level; only call in React functions",

            "what is redux": "Redux is a predictable state management library for JavaScript applications.\n• Core concepts: Store (single source of truth), Actions (what happened), Reducers (how state changes), Dispatch (trigger actions)\n• Flow: Component → dispatch(action) → Reducer → Updated Store → Component re-renders\n• Redux Toolkit (RTK): Modern, simplified Redux with createSlice, configureStore, createAsyncThunk",

            // ==========================================
            // POLITICAL KNOWLEDGE
            // ==========================================
            "who is prime minister of india": "Narendra Modi is the Prime Minister of India since May 2014.\n• Belongs to Bharatiya Janata Party (BJP)\n• Represents Varanasi constituency\n• Key initiatives: Digital India, Startup India, Swachh Bharat, Make in India",

            "what is president of india": "The President of India is the head of state and supreme commander of the armed forces.\n• Current President: Droupadi Murmu (since July 25, 2022)\n• She is the first tribal woman and second woman to hold the office\n• First President: Dr. Rajendra Prasad",

            "who is president of india": "Droupadi Murmu is the current President of India since July 25, 2022.\n• She is the 15th President of India\n• First tribal woman and second woman to become President\n• Belongs to the Santhal tribe from Odisha",

            "who is president of usa": "The current President of the United States is Joe Biden (since January 20, 2021).\n• 46th President of the USA\n• Belongs to the Democratic Party\n• Vice President: Kamala Harris (first woman, first Asian-American, first African-American VP)",

            "what is democracy": "Democracy is a system of government where power belongs to the people.\n• Types: Direct Democracy and Representative Democracy\n• India: Largest democracy in the world (Parliamentary system)\n• Key features: Free & fair elections, fundamental rights, rule of law, separation of powers\n• Pillars: Legislature, Executive, Judiciary, Media (4th pillar)",

            "what is constitution of india": "The Constitution of India is the supreme law of the country, adopted on November 26, 1949, and came into effect on January 26, 1950.\n• Dr. B.R. Ambedkar: Chairman of the Drafting Committee (Father of the Constitution)\n• Features: Longest written constitution, federal with unitary bias, parliamentary government",

            "what is g20": "The G20 (Group of Twenty) is an intergovernmental forum of 19 countries + the European Union.\n• Founded in 1999 to address global financial stability\n• Members include India, USA, China, Japan, EU, etc.\n• Recent: India hosted G20 summit in 2023",

            "what is united nations": "The United Nations (UN) is an international organization founded on October 24, 1945.\n• Headquarters: New York City, USA\n• 193 member states\n• Security Council: 5 permanent members (USA, UK, France, Russia, China) with veto power",

            "what is nato": "NATO (North Atlantic Treaty Organization) is a military alliance formed on April 4, 1949.\n• Headquarters: Brussels, Belgium\n• Core principle: Article 5 — An attack on one member is an attack on all\n• India is NOT a member of NATO",

            "what is brics": "BRICS is an association of major emerging economies.\n• Original members: Brazil, Russia, India, China, South Africa\n• New members (2024): Iran, Egypt, Ethiopia, UAE, Saudi Arabia\n• Purpose: Reform global governance, promote economic cooperation",

            "what is parliament of india": "The Parliament of India is the supreme legislative body of the country.\n• Consists of: President + Rajya Sabha (Council of States) + Lok Sabha (House of the People)\n• Lok Sabha: 543 elected members, 5-year term\n• Rajya Sabha: 245 members, 6-year term",

            "what is supreme court of india": "The Supreme Court of India is the highest judicial authority and guardian of the Constitution.\n• Established: January 28, 1950\n• Location: New Delhi\n• Power of Judicial Review: Can strike down unconstitutional laws",

            "what is election commission of india": "The Election Commission of India (ECI) is an autonomous constitutional body responsible for conducting elections.\n• Established: January 25, 1950\n• Article 324 of the Constitution\n• Key features: Model Code of Conduct, EVMs, VVPAT",

            "who is chief minister": "A Chief Minister (CM) is the head of government in an Indian state or union territory.\n• Appointed by the Governor\n• Leader of the majority party in the State Legislative Assembly",

            // ==========================================
            // IT TECH ROLES
            // ==========================================
            "what is software engineer": "A Software Engineer designs, develops, tests, and maintains software applications.\n• Skills required: Programming (Java, Python, C++, JavaScript), Data Structures & Algorithms, System Design, Databases\n• Average salary (India): ₹6-25 LPA\n• Growth path: SDE-1 → SDE-2 → Senior SDE → Tech Lead → Engineering Manager → CTO",

            "what is frontend developer": "A Frontend Developer builds the user-facing part of websites and web applications.\n• Core skills: HTML, CSS, JavaScript\n• Frameworks/Libraries: React.js, Angular, Vue.js, Next.js\n• Average salary (India): ₹4-18 LPA",

            "what is backend developer": "A Backend Developer builds the server-side logic, databases, and APIs of applications.\n• Languages: Node.js, Python (Django/Flask), Java (Spring Boot), Go\n• Databases: MongoDB, PostgreSQL, MySQL, Redis\n• Average salary (India): ₹5-22 LPA",

            "what is fullstack developer": "A Full-Stack Developer works on both frontend and backend of web applications.\n• Frontend: HTML, CSS, JavaScript, React.js/Angular/Vue.js\n• Backend: Node.js/Express.js, Python/Django, Java/Spring Boot\n• Popular stacks: MERN, MEAN, LAMP\n• Average salary (India): ₹6-25 LPA",

            "what is devops engineer": "A DevOps Engineer bridges the gap between development and operations teams.\n• Tools: Docker, Kubernetes, Jenkins, GitHub Actions, Terraform, Ansible\n• Cloud: AWS, Google Cloud, Azure\n• Average salary (India): ₹8-30 LPA",

            "what is data scientist": "A Data Scientist analyzes and interprets complex data to help organizations make better decisions.\n• Skills: Python/R, Statistics, Machine Learning, Deep Learning, SQL\n• Libraries: NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, PyTorch\n• Average salary (India): ₹8-30 LPA",

            "what is data analyst": "A Data Analyst collects, processes, and analyzes data to provide actionable insights.\n• Skills: SQL, Excel, Python/R, Data Visualization\n• Tools: Tableau, Power BI, Google Analytics\n• Average salary (India): ₹4-15 LPA",

            "what is machine learning engineer": "A Machine Learning Engineer builds and deploys ML models for production systems.\n• Skills: Python, Mathematics, ML algorithms\n• Types of ML: Supervised, Unsupervised, Reinforcement Learning\n• Average salary (India): ₹10-35 LPA",

            "what is cloud engineer": "A Cloud Engineer designs, manages, and maintains cloud-based infrastructure.\n• Platforms: AWS, Google Cloud, Microsoft Azure\n• Skills: Linux, networking, Docker, Kubernetes, Terraform\n• Average salary (India): ₹8-28 LPA",

            "what is cybersecurity analyst": "A Cybersecurity Analyst protects an organization's systems and data from cyber threats.\n• Tools: Wireshark, Nmap, Burp Suite, Metasploit, Kali Linux\n• Certifications: CEH, CompTIA Security+, CISSP, OSCP\n• Average salary (India): ₹6-25 LPA",

            "what is product manager": "A Product Manager (PM) defines the product vision, strategy, and roadmap.\n• Skills: User research, data analysis, stakeholder management, prioritization\n• Tools: Jira, Trello, Figma, Amplitude\n• Average salary (India): ₹12-40 LPA",

            "what is qa engineer": "A QA (Quality Assurance) Engineer ensures software quality through testing.\n• Types: Manual testing, Automated testing, Unit testing, Integration testing, E2E testing\n• Tools: Selenium, Cypress, Jest, Mocha, JUnit, Postman\n• Average salary (India): ₹4-18 LPA",

            "what is ui ux designer": "A UI/UX Designer creates user-friendly and visually appealing digital experiences.\n• UX: Research, wireframes, user flows, prototyping, usability testing\n• UI: Visual design, typography, color theory, responsive layouts\n• Tools: Figma, Adobe XD, Sketch\n• Average salary (India): ₹5-20 LPA",

            "what is blockchain developer": "A Blockchain Developer builds decentralized applications (dApps) and smart contracts.\n• Skills: Solidity (Ethereum), JavaScript, Rust (Solana), cryptography\n• Platforms: Ethereum, Solana, Polygon, Hyperledger\n• Average salary (India): ₹8-35 LPA",

            // ==========================================
            // TOOLS & TECHNOLOGIES
            // ==========================================
            "what is docker": "Docker is a platform for developing, shipping, and running applications in containers.\n• Container: A lightweight, standalone, executable package\n• Key concepts: Dockerfile, Image, Container, Docker Hub\n• Commands: docker build, docker run, docker pull, docker push, docker-compose\n• Used in: Microservices, CI/CD pipelines, cloud deployment",

            "what is kubernetes": "Kubernetes (K8s) is an open-source container orchestration platform.\n• Automates deployment, scaling, and management of containerized applications\n• Key concepts: Pods, Nodes, Clusters, Services, Deployments\n• Developed by Google, now maintained by CNCF",

            "what is git": "Git is a distributed version control system for tracking changes in source code.\n• Created by Linus Torvalds in 2005\n• Commands: git init, git add, git commit, git push, git pull, git branch, git merge\n• Platforms: GitHub, GitLab, Bitbucket",

            "what is github": "GitHub is a cloud-based platform for hosting Git repositories and collaborating on code.\n• Features: Pull Requests, Issues, Actions (CI/CD), Projects, GitHub Pages\n• GitHub Copilot: AI-powered code completion\n• Alternatives: GitLab, Bitbucket",

            "what is ci cd": "CI/CD stands for Continuous Integration and Continuous Deployment/Delivery.\n• CI: Automatically build and test code on every commit\n• CD: Automatically deploy to staging/production\n• Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI",

            "what is agile": "Agile is a project management methodology that emphasizes iterative development and collaboration.\n• Frameworks: Scrum, Kanban, XP (Extreme Programming)\n• Scrum: Sprints (2-4 weeks), Daily Standups, Sprint Planning, Retrospective\n• Tools: Jira, Trello, Asana",

            "what is api": "API (Application Programming Interface) is a set of rules that allows software applications to communicate.\n• Types: REST API, GraphQL, SOAP, WebSocket\n• REST API: Uses HTTP methods (GET, POST, PUT, DELETE) with JSON responses\n• Authentication: API Keys, JWT, OAuth 2.0",

            "what is microservices": "Microservices is an architectural style where an application is built as a collection of small, independent services.\n• Communication: REST, gRPC, Message Queues (RabbitMQ, Kafka)\n• Tools: Docker, Kubernetes, API Gateway\n• Used in: Netflix, Amazon, Uber, Spotify",

            "what is cloud computing": "Cloud Computing is the delivery of computing services over the internet.\n• Models: IaaS (Infrastructure), PaaS (Platform), SaaS (Software)\n• Providers: AWS, Google Cloud (GCP), Microsoft Azure\n• Benefits: Pay-as-you-go, scalability, reliability, global availability",

            "what is aws": "AWS (Amazon Web Services) is the world's leading cloud computing platform.\n• Key services: EC2, S3, Lambda, RDS, DynamoDB, VPC, CloudFront\n• Used by: Netflix, Airbnb, NASA, Twitch\n• Certifications: Solutions Architect, Developer Associate",

            "what is linux": "Linux is a free, open-source operating system kernel used in servers, cloud, and development.\n• Created by Linus Torvalds in 1991\n• Distributions: Ubuntu, CentOS, Fedora, Debian, Arch Linux, Kali Linux\n• Used in: ~96% of web servers, Android, cloud infrastructure",

            // ==========================================
            // OOP CONCEPTS
            // ==========================================
            "what is oops": "OOP (Object-Oriented Programming) is a programming paradigm based on the concept of objects.\n• 4 Pillars:\n  1. Encapsulation: Bundling data and methods, hiding internal details\n  2. Abstraction: Showing only essential features, hiding complexity\n  3. Inheritance: Child class inherits properties of parent class\n  4. Polymorphism: Same method behaves differently (overloading & overriding)",

            "what is encapsulation": "Encapsulation is the bundling of data (variables) and methods that operate on that data into a single unit (class).\n• Also involves restricting direct access to internal data (data hiding)\n• Achieved using access modifiers: private, protected, public\n• Getters and Setters provide controlled access",

            "what is inheritance": "Inheritance is the mechanism where a child class inherits properties and methods from a parent class.\n• Types: Single, Multilevel, Hierarchical, Multiple (C++, Python), Hybrid\n• Benefits: Code reuse, method overriding, establishing is-a relationship",

            "what is polymorphism": "Polymorphism means 'many forms' — same method name behaves differently based on context.\n• Compile-time (Static): Method Overloading — same method name, different parameters\n• Runtime (Dynamic): Method Overriding — child class redefines parent method",

            "what is abstraction": "Abstraction is the concept of hiding complex implementation details and showing only essential features.\n• Achieved using: Abstract classes and Interfaces\n• Real-world example: You drive a car without knowing engine internals",

            "what is design pattern": "Design Patterns are reusable solutions to commonly occurring problems in software design.\n• Types:\n  1. Creational: Singleton, Factory, Builder, Prototype\n  2. Structural: Adapter, Decorator, Proxy, Facade\n  3. Behavioral: Observer, Strategy, Command, Iterator",

            // ==========================================
            // THINKLY LABS
            // ==========================================
            "what is thinkly labs": "Thinkly Labs is a technology-driven company focused on building innovative digital solutions and empowering businesses through cutting-edge technology.\n• Specializes in software development, web applications, mobile apps, and digital transformation\n• Works on modern tech stacks including MERN, React Native, AI/ML, and cloud-based solutions\n• Vision: To be a leading technology partner for businesses and a launchpad for aspiring tech professionals",

            "who is the founder of thinkly labs": "Thinkly Labs was founded by visionary tech entrepreneurs who are passionate about innovation and technology.\n• The founder(s) established Thinkly Labs with a mission to bridge the gap between ideas and technology\n• For the most accurate founder details, please visit the official Thinkly Labs website or LinkedIn page",

            "where is thinkly labs located": "Thinkly Labs is a technology company based in India.\n• The company operates from its headquarters and also supports remote/hybrid work culture\n• They serve clients both domestically and internationally",

            "when was thinkly labs started": "Thinkly Labs was established as a technology startup in India.\n• The company was founded with the vision of creating impactful digital solutions\n• For the precise founding date, please check the official Thinkly Labs website",

            "why was thinkly labs established": "Thinkly Labs was established to address key challenges in the technology industry.\n• Mission: To build innovative, scalable, and impactful technology solutions\n• To bridge the gap between academic learning and industry-ready skills\n• Core values: Innovation, Quality, Integrity, Continuous Learning, Community Impact",

            "tell me about thinkly labs": "Thinkly Labs is a technology company dedicated to building innovative digital products and solutions.\n• Specializes in software development, web & mobile applications, AI/ML solutions, and cloud services\n• Works on: MERN Stack, React Native, Python, AI/ML\n• Provides end-to-end services: Consulting, Design, Development, Testing, Deployment, and Maintenance\n• Mission: To empower businesses with cutting-edge technology and nurture tech talent",

            "what services does thinkly labs provide": "Thinkly Labs offers a wide range of technology services:\n1. Web Development (MERN stack, Next.js)\n2. Mobile App Development (React Native, Flutter)\n3. AI/ML Solutions\n4. Cloud Services (AWS, GCP, Azure)\n5. DevOps (CI/CD, Docker, Kubernetes)\n6. UI/UX Design\n7. Data Analytics\n8. Training & Mentorship\n9. IT Consulting\n10. Quality Assurance",

            "what technologies does thinkly labs use": "Thinkly Labs works with modern technologies:\n• Frontend: React.js, Next.js, Angular, Vue.js, Tailwind CSS\n• Backend: Node.js, Express.js, Python, Java\n• Databases: MongoDB, PostgreSQL, MySQL, Redis\n• Mobile: React Native, Flutter\n• AI/ML: TensorFlow, PyTorch, Scikit-learn\n• Cloud: AWS, Google Cloud, Azure\n• DevOps: Docker, Kubernetes, Jenkins, GitHub Actions",

            // ==========================================
            // INTERVIEW PREPARATION
            // ==========================================
            "tell me about yourself": "This is usually the first interview question.\nStructure:\n• Start with a brief intro (name, background, education/work)\n• Highlight your skills (technical + soft skills)\n• Share achievements (projects, internships, leadership roles)\n• Conclude with why you're excited about this role",

            "why should we hire you": "HR wants to see your value-add.\n• Emphasize skills that match job requirements\n• Show enthusiasm and cultural fit\n• Example: 'I bring strong coding skills in Python and SQL, along with problem-solving ability proven through hackathons.'",

            "what is leadership": "Leadership is the ability to inspire and guide others toward achieving goals.\n• Key traits: vision, communication, accountability, decision-making\n• Example in interview: 'I led a college project team of 4 members and delivered a working prototype before schedule.'",

            // ==========================================
            // SPORTS
            // ==========================================
            "who is virat kohli": "Virat Kohli is one of India's greatest batsmen and former captain.\n• Known for consistency, fitness, and aggressive play\n• Nicknamed 'Chase Master' for his performance in run-chases",

            "what is ipl": "The Indian Premier League (IPL) is a professional T20 cricket league started in 2008.\n• Played annually in India, franchise-based teams\n• Combines cricket + entertainment (biggest sports league in India)",

            // ==========================================
            // DEFAULT RESPONSE
            // ==========================================
            "default": "I'm sorry, I didn't understand that. Could you please rephrase your question? You can ask me about:\n• Programming Languages (Python, Java, JavaScript, C, C++, etc.)\n• Data Structures & Algorithms (Array, LinkedList, Stack, Queue, Tree, Graph, Sorting, DP, etc.)\n• Web Development (React.js, Node.js, Express.js, MongoDB, REST API, MERN Stack)\n• IT Tech Roles (Software Engineer, Frontend/Backend Developer, DevOps, Data Scientist, etc.)\n• Political Knowledge (Indian politics, world organizations, government structure)\n• Thinkly Labs (Company info, services, technologies)\n• Interview Preparation (HR questions, technical concepts)\n• Tools & Technologies (Docker, Kubernetes, Git, AWS, CI/CD, etc.)\n\nTry asking something specific like 'What is React?' or 'What is dynamic programming?'"
        };

        // ✅ Normalize user input and find bot response
        const normalizedText = text.trim().toLowerCase();
        const botReply = botResponses[normalizedText] || botResponses["default"];

        // ✅ Save bot response to database (with protection)
        try {
            await Bot.create({
                text: botReply
            });
        } catch (dbError) {
            console.error("Bot save failed (non-critical):", dbError.message);
            // Don't crash — continue to send bot reply
        }

        console.log("Bot Reply:", botReply.substring(0, 50) + "...");

        // ✅ Send response back to frontend (ALWAYS works even if DB save failed)
        return res.status(200).json({
            success: true,
            userMessage: text.trim(),
            botMessage: botReply
        });

    } catch (error) {
        console.error("Error in Message controller:", error);
        return res.status(500).json({ 
            success: false,
            error: "Internal Server Error"
        });
    }
};