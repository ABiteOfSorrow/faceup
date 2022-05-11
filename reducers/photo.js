export default function (listPhoto = [], action) {
  // Save Photo
  if (action.type == "savePhoto") {
    var listPhoto = action.Photo;
    return listPhoto;
    // Delete Photo
  } else if (action.type == "deletePhoto") {
    console.log(action.POI);
    var listPhoto = (action) => {
      action.POI.filter(
        (e) =>
          e.Photo.latitude != action.Photo.latitude &&
          e.Photo.longitude != action.Photo.longitude
      );
    };
    return listPhoto;
  } else {
    return listPhoto;
  }
}
