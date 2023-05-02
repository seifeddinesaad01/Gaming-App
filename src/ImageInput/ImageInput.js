import React from "react";
import ImageUploading from "react-images-uploading";
import "../ImageInput/ImageInput.css";

function ImageInput(props) {
  const { width, onImageChange } = props;
  const [image, setImage] = React.useState(null);

  const onChange = (imageList) => {
    // data for submit
    setImage(imageList[0]);
    const file = imageList[0].file;
    const fileName = file.name;
    onImageChange(fileName);
    console.log(imageList);
    console.log(fileName);


    // const reader = new FileReader();
    // reader.readAsDataURL(image.file);

    // reader.onloadend = () => {
    //   const imageData = reader.result;
    //   // console.log(imageData);
    //   onImageChange(imageData);
    // }


  };
  // const handleAddImage = (e) => {
  //   e.preventDefault();
  //   const reader = new FileReader(); 
  //   reader.readAsDataURL(image.file);

  //   reader.onloadend = () => {
  //     const imageData = reader.result;
  //     console.log(imageData);
  // axios
  //   .post("http://localhost:5000/tournament/create-tournament", {
  //     photo: imageData,
  //     // autres données à envoyer à la backend
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //     // Réinitialiser l'état de l'image
  //     setImage(null);
  //   })
  //   .catch((error) => console.log(error));
  //   };
  // };


  // const handleAddImage = (e) => {
  // Code pour ajouter l'image à la base de données ici
  // e.preventDefault()
  // let formData = new FormData()
  // formData.append('file', image.data)

  
  // try {
  //   const response = await axios.post('http://localhost:5000/user', formData)
  //   if (response) {
  //   setStatus(response.statusText);
  //   console.log("succes d'envoi");
  //   }
  // } catch (error) {
  //   console.error(error)
  //   console.log("echec d'envoi")
  // }
  // };



  return (
    <div className="Inpu">
      <ImageUploading
        multiple={false}
        value={image ? [image] : []}
        onChange={onChange}
        dataURLKey="data_url"
        acceptType={["png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {imageList.length === 0 && (
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Choose photo
              </button>
            )}

            &nbsp;
            {image && (
              <div key={0} className="image-item">
                <img src={image.data_url} alt="" width={width} height="100px" />
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={handleAddImage}>Add photo</button> */}
                  <button onClick={() => onImageUpdate(0)}>Modify</button>
                  <button onClick={() => setImage(null)}>Remove</button>

                </div>
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageInput;
