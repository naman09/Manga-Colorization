import React, { Fragment } from 'react';
import axios from 'axios';

const BACKEND_URL = "http://localhost:5000/images/";
const FileUploader = ()=>{
    
    const displayImages = (inputFile,predictedImageName)=>{
        let image,tableData,tableRow;
        tableRow = document.createElement("tr");
        
        image = document.createElement("img");
        image.src = URL.createObjectURL(inputFile);
        tableData = document.createElement("td");
        tableData.appendChild(image);
        tableRow.appendChild(tableData);

        image = document.createElement("img");
        image.src = BACKEND_URL + predictedImageName;
        tableData = document.createElement("td");
        tableData.appendChild(image);
        tableRow.appendChild(tableData);
    
        
    
        document.getElementById("mybody").appendChild(tableRow);
        
    }


    const display = (files,namesList)=>{
        for(let i=0;i<files.length;i++){
            displayImages(files[i],namesList[i]);
        }
        // for(let i in namesList){
        //     displayImages(files[i],namesList[i]);
        // }
    }
    
    const onUploadProgress = (progressEvent) =>{
        const {loaded,total} = progressEvent;
        const percent = Math.floor((loaded*100)/total);
        console.log(`${loaded/1000}kb of ${total/1000}kb | ${percent}%`);
        let bar = document.getElementById("bar");
        bar.style.width = percent+"%";
        if(percent === 100){
            setTimeout(()=>{bar.style.width = "0%";},2000);
            
        }
    }
    
    const uploadFiles = (e)=>{
        // console.log(e);
        const fileList = e.target.files;
        // console.log(fileList);
        
        // console.log(data);

        let simpleFileList = [];
        for(let i=0;i<fileList.length;i++){
            // showPreview(fileList[i],true);
            simpleFileList.push(fileList[i]);
        }
        // console.log(simpleFileList);
        let data = new FormData();
        simpleFileList.forEach(img=> data.append("images",img));


        const url = "http://localhost:5000/upload";
        axios({
            method: 'post',
            url: url,
            data: data,
            headers: {'Content-Type': 'multipart/form-data' },
            onUploadProgress:onUploadProgress
        }).then(res=>{
            console.log("dsada");
            console.log(res.data.namesList);

            display(fileList,res.data.namesList);
        },err=>{
            console.log("file not uploaded"+err);
        });

        
        
        
    }



    return (
        <Fragment>
            <br/>
            <label htmlFor="files" id="labelButton">Upload Images</label>
           {/* <input type="file" id="files" name="files[]" webkitdirectory="true" multiple hidden/> */}
           <input type="file" id="files" name="files[]" multiple hidden onChange={uploadFiles} accept="image/*" />
        </Fragment>
    );

}
export default FileUploader;
