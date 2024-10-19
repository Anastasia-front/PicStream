// Run it using - node convertJsToTs.js

// import fs from 'fs';
// import path from 'path';
const fs = require('fs');
const path = require('path');
// Function to recursively go through directories
const convertJsToTs = (dirPath) => {
  fs.readdir(dirPath, (error, files) => {
    if (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);

      // Check if the file is a directory or file
      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.error(`Error getting stats for ${filePath}:`, error);
          return;  // Skip this file or directory and continue
        }

        if (stats.isDirectory()) {
          // Recursively process directories
          convertJsToTs(filePath);
        } else if (path.extname(file) === '.js') {
          // If the file is a .js file, rename it to .ts
          const newFilePath = filePath.replace('.js', '.ts');
          fs.rename(filePath, newFilePath, (error) => {
            if (error) {
              console.error(`Error renaming ${filePath} to ${newFilePath}:`, error);
            } else {
              console.log(`Renamed: ${filePath} -> ${newFilePath}`);
            }
          });
        }
      });
    });
  });
};

// Start conversion from the root directory (adjust the path accordingly)
const projectRoot = path.join(__dirname, 'src'); // Adjust this path as needed
convertJsToTs(projectRoot)