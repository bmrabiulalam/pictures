import {
  ADD_IMAGE,
  DELETE_IMAGE,
  GalleryAction,
  GalleryImage,
  GET_IMAGES,
} from "./../types/galleryTypes";
import { ThunkAction } from "redux-thunk";
import { User } from "../types/authTypes";
import { RootState } from "..";
import firebase from "../../firebase/config";

export type GalleryThunk = ThunkAction<void, RootState, unknown, GalleryAction>;

// Add/upload image
export const addImage = (
  files: FileList,
  user: User | null,
  onProgress: (num: number, file: File) => void
): GalleryThunk => {
  return async (dispatch) => {
    Array.from(files).forEach(async (file: File) => {
      const filePath = `images/${user?.id}/${new Date().getTime()}-${
        file.name
      }`;
      const storageRef = firebase.storage().ref(filePath);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress, file);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(async (downloadURL) => {
              try {
                const data: GalleryImage = {
                  imageUrl: downloadURL,
                  fileName: file.name,
                  filePath: filePath,
                  uploaderName: user?.firstName,
                  uploaderId: user?.id,
                  createdAt: new Date().getTime(),
                };
                const ref = await firebase
                  .firestore()
                  .collection("gallery")
                  .add(data);
                data.id = ref.id;
                dispatch({ type: ADD_IMAGE, payload: data });
              } catch (err) {
                console.log(err);
              }
            })
            .catch((err) => console.log(err));
        }
      );
    });
  };
};

// Get image
export const getImage = (): GalleryThunk => {
  return async (dispatch) => {
    try {
      const docs = await firebase.firestore().collection("gallery").get();
      const arr: GalleryImage[] = [];
      docs.forEach((doc) => {
        const {
          createdAt,
          fileName,
          filePath,
          imageUrl,
          uploaderName,
          uploaderId,
        } = doc.data();
        arr.push({
          createdAt,
          fileName,
          filePath,
          imageUrl,
          uploaderName,
          uploaderId,
          id: doc.id,
        });
      });
      dispatch({ type: GET_IMAGES, payload: arr });
    } catch (error) {
      console.log(error);
    }
  };
};

// Delete image
export const deleteImage = (
  image: GalleryImage,
  onSuccess: () => void
): GalleryThunk => {
  return async (dispatch) => {
    try {
      const imageRef = firebase.storage().ref().child(image.filePath);
      await imageRef.delete();
      await firebase.firestore().collection("gallery").doc(image.id).delete();
      dispatch({ type: DELETE_IMAGE, payload: image });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
};
