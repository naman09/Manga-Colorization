import tensorflow as tf
import os 
import glob
from tensorflow.keras.models import load_model
from matplotlib import pyplot as plt

generator = load_model('./model/generator.h5',compile=False)


def generate_images(model, input_dataset):
    prediction = model(input_dataset, training=True)
    plt.figure(figsize=(15,15))

    display_list = [prediction[0]]
    title = ['Predicted Image']

    plt.subplot(1, 1, 1)
    #plt.title(title[0])
    
    # getting the pixel values between [0, 1] to plot it.
    plt.imshow(display_list[0] * 0.5 + 0.5)

    plt.axis('off')
    
    all_saved_imgs_path = glob.glob("./predicted_imgs_v1/predicted*.jpg")
    save_count = len(all_saved_imgs_path)

    img_name = 'predicted'+str(save_count)+'.jpg';
    print("saving"+img_name)
    
    plt.savefig('./predicted_imgs_v1/'+ img_name)

    return img_name
    #plt.show()

#loads the image in appropriate format
def read_jpg(path):
    img = tf.io.read_file(path)
    img = tf.image.decode_jpeg(img, channels=3)
    return img



def normalize(input_image):
    input_image = tf.cast(input_image, tf.float32)/127.5 - 1
    return input_image


    
def colorize_single(img_path):
    img_name = 'null'
    img = read_jpg(img_path)
    #print(img.shape)
    img = tf.image.resize(img, (2*256, 1*256))
    img = normalize(img)
    img_dataset = tf.expand_dims(img,0)
    #print(img.shape)
    img_name = generate_images(generator, img_dataset)
    return img_name

#colorize all loaded images and save them
def colorize_imgs(imgs_path):
    
    input_imgs = glob.glob(imgs_path+"/*")

    img_name_list = []
        
    for img_path in input_imgs:
        last_img_name = colorize_single(img_path)
        img_name_list.append(last_img_name)

    return img_name_list
