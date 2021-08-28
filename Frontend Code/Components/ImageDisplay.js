import React from 'react';

imageNameList = ['predicted18.jpg','predicted19.jpg','predicted20.jpg'];

// takes list of image names and using table component display them
const ImageDisplay = ()=>{
    
    return;
}

BACKEND_URL = "http:localhost:5000/images/";

const displayImage = (inputFile,predictedImageName)=>{
    let image,tableData,tableRow;
    tableRow = document.createElement("tr");

    image = document.createElement("img");
    image.src = BACKEND_URL + predictedImageName;
    tableData = document.createElement("tr");
    tableData.appendChild(image);
    tableRow.appendChiled(tableData);

    image = document.createElement("img");
    image.src = URL.createObjectURL(inputFile);
    tableData = document.createElement("tr");
    tableData.appendChild(image);
    tableRow.appendChiled(tableData);

    document.getElementById("mybody").appendChild(tableRow);
    
}