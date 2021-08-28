import React, { Fragment } from 'react';
import axios from 'axios';

const FileUploader = ()=>{

    // let counter = 1;
    const showPreview = (file,isInp)=>{
        let url;
        if(isInp) url = URL.createObjectURL(file);
        else url = "http://localhost:5000/image";
        

        //can also check extension 
        // console.log(file.type);

        let image = document.createElement("img");
        image.src = url;
        image.height = 500;
        image.width = 500;
        image.style.display = "block";
        //need to add class to partition in 2 groups

        if(isInp) document.getElementById("before").appendChild(image);
        else document.getElementById("after").appendChild(image);
        // if(counter&1) document.getElementById("before").appendChild(image);
        // else document.getElementById("after").appendChild(image);
        // counter++;

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
        simpleFileList.forEach(img=> data.append("image",img));


        const url = "http://localhost:5000/upload";
        axios({
            method: 'post',
            url: url,
            data: data,
            headers: {'Content-Type': 'multipart/form-data' },
            onUploadProgress:onUploadProgress
        }).then(res=>{
            console.log(res.data.image_name);
            showPreview(res.data.image_name,false);
        },err=>{
            console.log("file not uploaded"+err);
        });

        
        
        
    }



    return (
        <Fragment>
            <br/>
            <label htmlFor="files" id="labelButton">Upload Images</label>
           {/* <input type="file" id="files" name="files[]" webkitdirectory="true" multiple hidden/> */}
           <input type="file" id="files" name="files[]" multiple hidden onChange={uploadFiles} accept="image/*"/>
        </Fragment>
    );

}
export default FileUploader;
