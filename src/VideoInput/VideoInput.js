import React from "react";
import "../VideoInput/VideoInput.css";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();
  const [videoAdded, setVideoAdded] = React.useState(false);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    setVideoAdded(false);
  };
  //code pour choisir un video à partir de
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const handleAddVideo = () => {
    // Code pour ajouter la vidéo à la base de données ici
  };

  const handleRemoveVideo = () => {
    // Code pour supprimer la vidéo de la base de données ici
    setSource(null);
    setVideoAdded(false);
  };



  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {!source && <button onClick={handleChoose}>Choose video</button>}
      {source && (
        <>
          <video
            className="VideoInput_video"
            height={height}
            width={width}
            controls
            src={source}
          />
          {!videoAdded && (
            <div className="VideoInput_buttons">
              <button onClick={handleAddVideo}>Add video</button>
              <button onClick={handleChoose}>Modifiy</button>
              <button onClick={handleRemoveVideo}>Remove</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
