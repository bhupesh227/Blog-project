import bodyParser from "body-parser";
import { render } from "ejs";
import express from "express";
import path, { join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import { v4 as uuidv4} from "uuid";

const app=express();
const port =3000;
const __dirname=path.dirname(fileURLToPath(import.meta.url));


// Define the storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Save directly to 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));//Ensure that each file has a unique name, even if multiple files with the same name are uploaded
        //cb(null, file.originalname);                         //Save with the original file name
    }
});


app.use(express.static("public"));
app.use( express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Path to data.json
const dataPath = path.join(__dirname, 'data', 'data.json');

// Configure multer for file uploads
const upload = multer({ storage });

// Load existing data from data.json  // Read data from data.json
const loadData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Save data to data.json  // write data
const saveData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};


app.get("/",(req,res)=>{
    const data = loadData();
    res.render('index', { data });
});

app.get("/Create",(req,res)=>{
    res.render("new.ejs");
});

app.get("/Posts",(req,res)=>{
    const data =loadData();
    res.render("posts.ejs",{data });
});


app.post("/submit",upload.single('image'),(req,res)=>{
    const id= uuidv4();                                     //generate a unigue UUid for each blog
    const { name, title, paragraph } = req.body;

    const image = req.file ? `${req.file.filename}` : '';  // Use the filename of the uploaded file
    const date= new Date().toLocaleDateString();
    const newData = { image, name, title, paragraph, date,id };
    const data = loadData();
    data.push(newData);
    saveData(data);
    res.redirect('/');
});

//edit call
app.get("/edit/:id",(req,res)=>{
    const datas = loadData();
    const data= datas.find(data => data.id=== req.params.id);
    if (!data) {
        return res.status(404).send("blog not found");
    }
    res.render("edit.ejs",{
        data
    });
});

// Update post
app.post('/update/:id',upload.single('image'), (req, res) => {
    const datas = loadData();
    const data= datas.find(data => data.id=== req.params.id);
    if (!data) {
        return res.status(404).send("blog not found");
    }
    //update blog properties
    data.name=req.body.name;
    data.title=req.body.title;
    data.paragraph=req.body.paragraph;

    if (req.file) {
        data.image= req.file.filename; //update imagge if a new one was uploaded
    }

    //save the updated blog to data.json
    saveData(datas);
    res.redirect('/');
});

//delete button 
app.get("/delete/:id",(req,res)=>{
    const datas=loadData();
    const dataIndex=datas.findIndex(data=>data.id===req.params.id);
    const image = req.file ? `${req.file.filename}` : ''; 
    const url=join(__dirname,'uploads',image);
    if(dataIndex<-1){
        return res.status(404).send("blog not found to delete");
    }
        datas.splice(dataIndex,1);
        saveData(datas)
        
        // fs.unlink(url,(err)=>{
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log("file deleted successfully")
        // });
        res.redirect('/');
});

    //about
app.get("/about",(req,res)=>{
    res.render("about.ejs");
});
 

app.listen(port,()=>{
    console.log(`port ${port} is working`);
});