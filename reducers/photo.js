export default function (listPhoto = [], action) {
  // Save Photo
  if (action.type == "savePhoto") {
    var listPhotoCopy = [...listPhoto];
    listPhotoCopy.push({
      uri: action.photo.photo.url,
      gender: action.photo.resultDetection[0].gender,
      age: action.photo.resultDetection[0].age,
    });
    console.log(listPhotoCopy);
    return listPhotoCopy;
    // Delete Photo
  } else if (action.type == "deletePhoto") {
    console.log(action.POI);
    var listPhoto = (action) => {
      action.POI.filter((e) => e.photo.url != action.photo.url);
    };
    return listPhoto;
  } else {
    return listPhoto;
  }
}
