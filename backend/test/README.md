## ✅ Tests & Coverage

### 📦 Tech Stack
- Jest
- Supertest
- MongoDB Memory Server
- Mockingoose

### 📋 How to Run
```bash
npm install
npm test


### Test results
bash
```

npm run backend:test

> blogging-website@0.1.0 backend:test
> jest --coverage

 PASS  backend/test/unit/postController.test.js
  ● Console

    console.log
      { page: 1, limit: 4, status: 'published' }

      at log (backend/api/controllers/postControllers.js:6:17)

    console.log
      {
        posts: [
          {
            title: 'Test',
            content: 'Content',
            author: 'Author',
            status: 'published',
            tags: [],
            _id: new ObjectId('6859aea21411a9b3b28866bc'),
            createdAt: 2025-06-23T19:44:34.895Z,
            updatedAt: 2025-06-23T19:44:34.895Z
          }
        ],
        totalPages: 1,
        currentPage: 1,
        total: 1
      }

      at log (backend/api/controllers/postControllers.js:14:17)

 PASS  backend/test/integration/postRoutes.test.js
 PASS  backend/test/api/postApi.test.js
  ● Console

    console.log
      {}

      at log (backend/api/controllers/postControllers.js:6:17)

    console.log
      {
        posts: [
          {
            _id: new ObjectId('6859aea41b91c5053fc72ee5'),
            title: 'Test',
            content: 'Some content here for testing',
            author: 'Test Author',
            status: 'published',
            tags: [],
            createdAt: 2025-06-23T19:44:36.396Z,
            updatedAt: 2025-06-23T19:44:36.400Z,
            slug: 'test'
          }
        ],
        totalPages: 1,
        currentPage: 1,
        total: 1
      }

      at log (backend/api/controllers/postControllers.js:14:17)

---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------|---------|----------|---------|---------|-------------------
All files      |   44.33 |     23.8 |   27.27 |   52.22 |                   
 backend       |      90 |      100 |       0 |      90 |                   
  app.js       |      90 |      100 |       0 |      90 | 16                
 ...ontrollers |   26.58 |     22.5 |   22.22 |   33.33 |                   
  ...ollers.js |   26.58 |     22.5 |   22.22 |   33.33 | ...,77-97,102-111 
 ...api/routes |     100 |      100 |     100 |     100 |                   
  ...Routes.js |     100 |      100 |     100 |     100 |                   
 ...end/models |     100 |       50 |     100 |     100 |                   
  Post.js      |     100 |       50 |     100 |     100 | 47                
---------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.451 s
```


### 🖼️ Test Coverage Screenshots




![Unit Test](https://raw.githubusercontent.com/GauravKesh/blog-api-server/refs/heads/main/backend/test/test_images/1.png)
![Integration Test](https://raw.githubusercontent.com/GauravKesh/blog-api-server/refs/heads/main/backend/test/test_images/2.png)
![API Test](https://raw.githubusercontent.com/GauravKesh/blog-api-server/refs/heads/main/backend/test/test_images/3.png)
