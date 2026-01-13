import { getDB } from './src/lib/db/index.js';

async function testData() {
  console.log('Testing database connection and queries...');
  
  try {
    const db = await getDB();
    console.log('Connected to database successfully');
    
    // Test 1: Get all published posts
    console.log('\n=== ALL PUBLISHED POSTS ===');
    const posts = await db.query('SELECT id, title, author FROM post WHERE status = "published";');
    console.log('Posts:', JSON.stringify(posts, null, 2));
    
    // Test 2: Get all users
    console.log('\n=== ALL USERS ===');
    const users = await db.query('SELECT id, name, slug FROM user;');
    console.log('Users:', JSON.stringify(users, null, 2));
    
    // Test 3: Check specific author
    console.log('\n=== SPECIFIC AUTHOR QUERY ===');
    const author = await db.query('SELECT * FROM user WHERE slug = "arawi-aura";');
    console.log('Author result:', JSON.stringify(author, null, 2));
    
    // Test 4: Check posts by author
    console.log('\n=== POSTS BY AUTHOR ===');
    if (author[0]?.[0]) {
      const authorId = author[0][0].id;
      console.log('Author ID:', authorId);
      const postsByAuthor = await db.query(
        'SELECT id, title FROM post WHERE status = "published" AND author = $authorId;',
        { authorId }
      );
      console.log('Posts by author:', JSON.stringify(postsByAuthor, null, 2));
    }
    
  } catch (error) {
    console.error('Error testing data:', error);
  }
}

testData();