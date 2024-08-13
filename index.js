const express = require('express');
const pdf = require('pdf-creator-node');
const path = require('path');
const file = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port =  process.env.PORT || 5000;

//Built in middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(bodyParser.json());



var options = {
    format: "A3",
    orientation: "portrait",
    border: "50mm",
    header: {
        height: "0mm",
    },
    footer: {
        height: "5mm",
    }
};
var html = file.readFileSync("template.html", "utf8");

app.post('/create-pdf',(req,res)=>{
 var data = req.body;

 var document = {
    html: html,
    data: {
      resume: data,
    },
    path: "./Resume.pdf",
    type: "",
  };

  pdf.create(document, options)
  .then((response) => {
    return res.json({message : 'Pdf generated successfully.'});
  })
  .catch((error) => {
    console.error(error);
    return res.json({message : 'There is an error while generating pdf'});
  });
});

app.get('/fetch-pdf',(req,res)=>{
    res.sendFile(`${__dirname}/Resume.pdf`);
   });

app.listen(port, () => console.log(`Server started on port ${port}`));
