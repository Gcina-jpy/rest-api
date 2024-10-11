const http = require('http');
const fs = require('fs');


const port = 4000;
const dataFilePath = './items.json';


// Helper function to read data from JSON file
const readItems = () => {
try {
const data = fs.readFileSync(dataFilePath, 'utf-8');
return JSON.parse(data || '[]');
} catch (error) {
console.error('Error reading items:', error);
return [];
}
};


// Helper function to write data to JSON file
const writeItems = (items) => {
try {
fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2), 'utf-8');
} catch (error) {
console.error('Error writing items:', error);
}
};


const server = http.createServer((req, res) => {
const url = req.url;
const method = req.method;


if (method === 'GET' && url === '/items') {
// Read: Retrieve all items
const items = readItems();
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify(items));
}


else if (method === 'POST' && url === '/items') {
// Create: Add a new item
let body = '';
req.on('data', chunk => {
body += chunk.toString();
});


req.on('end', () => {
  const newItem = JSON.parse(body);
  const items = readItems();
  newItem.id = items.length ? items[items.length - 1].id + 1 : 1; // Auto-increment ID
  items.push(newItem);
  writeItems(items);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newItem));
});

    
  

}


else if (method === 'PUT' && url.startsWith('/items/')) {
// Update: Update an existing item by id
const id = parseInt(url.split('/').pop());
let body = '';
req.on('data', chunk => {
body += chunk.toString();
});


req.on('end', () => {
  const updatedItem = JSON.parse(body);
  const items = readItems();
  const index = items.findIndex(item => item.id === id);

  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    writeItems(items);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items[index]));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Item not found' }));
  }
});

    
  

}


else if (method === 'DELETE' && url.startsWith('/items/')) {
// Delete: Remove an item by id
const id = parseInt(url.split('/').pop());
const items = readItems();
const index = items.findIndex(item => item.id === id);


if (index !== -1) {
  items.splice(index, 1);
  writeItems(items);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Item deleted' }));
} else {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Item not found' }));
}

    
  

}


else {
// Handle unknown routes
res.writeHead(404, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ error: 'Route not found' }));
}
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

