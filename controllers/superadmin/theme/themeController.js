const Theme = require('../../../models/superadmin/themeModel');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

async function loadTheme(req, res) {
  try {
    res.status(200).render('admin/loadTheme.ejs');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
}

async function createTheme(req, res) {
  try {
    const name = req.body.name;

    // Check if the request contains a file
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Sanitize folder name by replacing spaces with underscores
    const sanitizedFolderName = name;

    // Create a folder for the theme inside the 'themes' directory
    const themeFolder = path.join(__dirname, `../../../public/themes/${sanitizedFolderName}`);

    // Check if the theme folder already exists
    if (fs.existsSync(themeFolder)) {
      return res.status(400).send('Theme folder already exists.');
    }

    // Create the 'themes' directory if it doesn't exist
    const themesDirectory = path.join(__dirname, '../../../public/'); 
    
    if (!fs.existsSync(themesDirectory)) {
      fs.mkdirSync(themesDirectory);
    }

    // Create the theme folder before extracting files
    fs.mkdirSync(themeFolder, { recursive: true });

    // Extract all files to the theme folder
    const zip = new AdmZip(req.file.path);
    zip.extractAllTo(themeFolder, /*overwrite*/ true);

    // Save theme information to the database
    const themeData = new Theme({
      name,
      theme: themeFolder, // You may want to adjust this based on your data model
    });

    await themeData.save();
    
    const watcher = chokidar.watch(themesDirectory, { ignoreInitial: true });
    watcher.on('unlink', (deletedFilePath) => {
      if (deletedFilePath === path.join(themeFolder, 'deleteMarker')) {
        // A file has been deleted, delete the corresponding entry from the database
        Theme.findOneAndRemove({ theme: themeFolder }, (err) => {
          if (err) {
            console.error('Error deleting theme from the database:', err);
          } else {
            console.log('Theme deleted from the database.');
          }
        });
      }
    });

   
    // Send a success response to the client
    res.status(200).send('Theme added successfully');
  } catch (error) {
    console.error(error.message);

    // Send an error response to the client
    res.status(500).send('Internal Server Error');
  }
}


async function showTheme(req,res){
  try{
   const themes = await Theme.find({});
   if(!themes){
    res.status(200).send("no theme found")
   } 
   res.status(200).render('admin/showtheme.ejs', {themes})
  }catch(error){
    console.log(error.message);
  }
}   

async function showthemecontent(req, res) {
  try {
    const themeName = req.params.name;
    const requestedFile = req.params.file || 'index.html'; // Use wildcard parameter to capture any file, default to 'index.html'

    // Find the theme details from the database based on the theme name
    const themeDetails = await Theme.findOne({ name: themeName });

    if (!themeDetails) {
      return res.status(404).send('Theme not found');
    }

    const themeFolderPath = themeDetails.theme;

    // Append the themeName and requestedFile to the themeFolderPath
    const filePath = path.join(themeFolderPath, themeName, requestedFile);

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      res.status(200).send(fileContent);
    } else {
      res.status(404).send(`File not found: ${requestedFile}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
}




// async function showThemeContent(req,res){
//   try{ 
//     const themename = req.body.name;
//    const themePath = req.body.themePath; 
//    console.log(themePath);
//    const indexPath = path.join(themePath, 'index.html'); 


//    if(fs.existsSync(indexPath)){
//    const indexContent = fs.readFileSync(indexPath, 'utf8');
//    res.status(200).send(indexContent);
//    }else{
//     res.status(200).send("Index file is not found");
//    }


//   }catch (error) {
//     console.error(error.message);
//     res.status(500).send('Internal Server Error');
//   }
// }

module.exports = {
  loadTheme,
  createTheme,
  showTheme,
  showthemecontent,
  // showThemeContent,
};
