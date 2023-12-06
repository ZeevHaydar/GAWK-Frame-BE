//handlers.js

const path = require('path');
const fs = require('fs');


function traverseInterface(folderPath, app) {

    const files = fs.readdirSync(folderPath, {withFileTypes: true});
    files.forEach((file)=>{
        const filePath = path.join(folderPath, file.name);
        if (file.isDirectory()){
            traverseInterface(filePath, app);
        } else if (file.isFile() && filePath.endsWith(".js")){
            const methods = require(filePath);
            methods.forEach(({method, URI, execute})=> {
                app[method](URI, (req,res)=> {
                    try {
                        execute(req, res);
                      } catch (error) {
                        console.error(error);
                        if (!res.headersSent) {
                          res.status(500).json({ error: 'Internal Server Error' });
                        }
                      }
                });

                console.log(`Route created for ${method.toUpperCase()} ${URI}`);
            })
        }
    })
}

module.exports = traverseInterface;