from flask import Flask, send_file, abort, request, jsonify
from flask_cors import CORS
import os
import glob
from prediction_model import colorize_imgs

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'upload'
PREDICTED_FOLDER = 'predicted_imgs_v1'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PREDICTED_FOLDER'] = PREDICTED_FOLDER

@app.route('/health')
def health():
    return 'app is running'


def colorize_all():
    """colorize all images present in UPLOAD_FOLDER
        return the list of names of images stored after colorizing"""
    
    print("inside colorize_all")
    return colorize_imgs(UPLOAD_FOLDER)
    #return ['dd']
    


@app.route('/upload',methods=['POST'])
def upload_images():
    
    """ takes list of files and colorize them and then store it in a folder and
    remove all the uploaded files.
    
    returns the list of names of the stored files """

    
    print("upload_images hit")
    files = request.files.getlist("images")
    for file in files:
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

    image_name_list = colorize_all();

    uploaded_imgs_path = glob.glob(UPLOAD_FOLDER+"/*")
    for img_path in uploaded_imgs_path:
        os.remove(img_path)
    
    response = jsonify(messge="file upload success",namesList = image_name_list)
    response.headers.add("Access-Control-Allow-Origin","*");
    return response



@app.route('/images/<image_name>')
def send_image(image_name):
    try:
        return send_file(PREDICTED_FOLDER+"/"+image_name)
    except FileNotFoundError:
        abort(404)




    
           

if __name__ == '__main__':
    app.run(debug=True)

    
