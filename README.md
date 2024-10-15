# My Node Project

A simple Node.js REST API implementing CRUD operations for managing items. This API allows you to create, read, update, and delete items using HTTP requests.


 Features

- Create new items
- Retrieve all items
- Update existing items by ID
- Delete items by ID

 Technologies

- Node.js
- HTTP modules
- File System (fs) for data storage in JSON format

 Installation

1. Clone the repository:
   https://github.com/Gcina-jpy/rest-api.git
 
   cd rest-api

2. install dependencies ;
npm install (using this command)

3. start server : 
node index.js

HOW TO GET,CREATE,UPDATE AND DELETE ITEMS

Get All Items
URL: /items
Method: GET
Response: Returns a JSON array of all items.

Create an Item
URL: /items
Method: POST
Response: Returns the created item with an auto-incremented ID.

Update an Item
URL: /items/:id
Method: PUT
Response: Returns the updated item. If the item is not found, returns a 404 error.

Delete an Item
URL: /items/:id
Method: DELETE
Response: Returns a message confirming deletion. If the item is not found, returns a 404 error.
Usage

To interact with the API, you can use tools like Postman or cURL.
