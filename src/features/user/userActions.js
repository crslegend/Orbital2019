import { toastr } from "react-redux-toastr";
import firebase from "../../app/config/firebase";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../async/asyncActions";
import { FETCH_EVENTS, FETCH_USER_EVENTS } from "../event/eventConstants";
import cuid from "cuid";

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();
  const { isLoaded, isEmpty, ...updatedUser } = user;

  try {
    await firebase.updateProfile(updatedUser);
    // console.log(updatedUser);
    // console.log(user);
    // let userDocRef = firestore.collection("users").doc(user.uid);

    // if (
    //   getState().firestore.ordered.events[0].tutorName !==
    //   updatedUser.displayName
    // ) {
    //   let batch = firestore.batch();
    //   batch.update(userDocRef, updatedUser);

    //   let eventsRef = firestore.collection("events");
    //   let eventActivityRef = firestore.collection("activity");

    //   let eventsQuery = await eventsRef.where("tutorUid", "==", user.uid);

    //   let eventsQuerySnap = await eventsQuery.get();

    //   for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
    //     let eventsQueryDocRef = await firestore
    //       .collection("events")
    //       .doc(eventsQuerySnap.docs[i].id);

    //     batch.update(eventsQueryDocRef, {
    //       tutorName: updatedUser.displayName
    //     });
    //   }
    //   await batch.commit();
    // } else {
    //   userDocRef.update(updatedUser);
    // }

    toastr.success("Success", "Your profile has been updated");
  } catch (error) {
    console.log(error);
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    displayName: user.displayName,
    isTutor: false
  };

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee
    });
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      isTutor: false,
      photoURL: user.photoURL
    });
    toastr.success("Success", "You have signed up for this class");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem signing up to this class");
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success("Success", "You have removed yourself from this class");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date();
  let eventsRef = firestore.collection("event_attendee");
  let query;
  switch (activeTab) {
    case 1: // past classes
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc");
      break;
    case 2: // future classes
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", ">=", today)
        .orderBy("eventDate");
      break;
    case 3: // classes tutored
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("isTutor", "==", true)
        .orderBy("eventDate", "desc");
      break;
    default:
      query = eventsRef
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc");
  }
  try {
    let querySnap = await query.get();
    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let event = await firestore
        .collection("events")
        .doc(querySnap.docs[i].data().eventId)
        .get();
      events.push({ ...event.data(), id: event.id });
    }
    dispatch({ type: FETCH_USER_EVENTS, payload: { events } });

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

// user action for photo upload
export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    // upload file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    // get userdoc
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has pp else update profile
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    // add image to firestore
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError);
  }
};

// user action to delete photo
export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};

// user action to change main profile photo, no need firestore
export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem setting main photo");
  }
};
