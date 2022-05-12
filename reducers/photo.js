export default function (listPhoto = [], action) {
  // Save Photo
  if (action.type == "savePhoto") {
    var listPhotoCopy = [...listPhoto];
    listPhotoCopy.push(action.photo);
    return listPhotoCopy;
    // Delete Photo
  } else if (action.type == "deletePhoto") {
    console.log(action.POI);
    var listPhoto = (action) => {
      action.POI.filter(
        (e) =>
          e.photo.url != action.photo.url
      );
    };
    return listPhoto;
  } else {
    return listPhoto;
  }
}
