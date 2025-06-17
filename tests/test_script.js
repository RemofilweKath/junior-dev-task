// Test script
const http = require('http');

// Test data
const testCases = [
  { data: "example" },
  { data: "hello" },
  { data: "programming" },
  { data: "abc" },
  { data: "thisisfun" }
];

function testEndpoint(testData, callback) {
  const postData = JSON.stringify(testData);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/sort-string',
    method: 'POST',
    headers: {
      'Content-Type': 'vercel/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        callback(null, response);
      } catch (error) {
        callback(error, null);
      }
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.write(postData);
  req.end();
}

console.log('Testing API endpoint...\n');

// Run tests
testCases.forEach((testCase, index) => {
  setTimeout(() => {
    console.log(`Test ${index + 1}: Testing with "${testCase.data}"`);
    
    testEndpoint(testCase, (error, response) => {
      if (error) {
        console.error(`Error:`, error.message);
      } else {
        console.log(`Response:`, response);
        console.log(`Expected sorted characters: [${testCase.data.split('').sort().map(c => `"${c}"`).join(', ')}]`);
      }
      console.log('---');
    });
  }, index * 500);
});