const fs = require('fs');
const path = require('path');

// Define a function to delete a file
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw err;
        }       
    });
}
function deleteAllFile(filePath) {
    console.log(filePath);
    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Loop through the list of files and delete each one
        files.forEach(file => {
            const filePath = path.join(directoryPath, file);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully:', filePath);
                }
            });
        });
    });
}
// Export the deleteFile function so it can be used in other modules
module.exports = { deleteFile, deleteAllFile };