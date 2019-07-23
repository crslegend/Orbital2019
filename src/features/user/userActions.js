import { toastr } from "react-redux-toastr";
import firebase from "../../app/config/firebase";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../async/asyncActions";
import { FETCH_USER_EVENTS } from "../event/eventConstants";
import cuid from "cuid";

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  const userUid = firebase.auth().currentUser.uid;
  const profile = getState().firebase.profile;

  try {
    await firebase.updateProfile(updatedUser);
    let batch = firestore.batch();

    let eventsRef = firestore.collection("events");
    let eventsActivityRef = firestore.collection("activity");
    let eventAttendeeRef = firestore.collection("event_attendee");

    let eventsQuery = await eventsRef.where("tutorUid", "==", userUid);
    let eventsQuerySnap = await eventsQuery.get(); // get in the form of array

    let eventAttendeeQuery = await eventAttendeeRef.where(
      "userUid",
      "==",
      userUid
    );
    let eventAttendeeQuerySnap = await eventAttendeeQuery.get(); // get in the form of array

    let eventsActivityQuery = await eventsActivityRef.where(
      "tutorUid",
      "==",
      userUid
    );
    let eventsActivityQuerySnap = await eventsActivityQuery.get(); // get in the form of array

    if (profile.userType === "tutor") {
      // batch update for tutor's displayName in events collection
      for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
        let eventsQueryDocRef = await firestore
          .collection("events")
          .doc(eventsQuerySnap.docs[i].id);

        batch.update(eventsQueryDocRef, {
          tutorName: updatedUser.displayName
        });
      }

      // batch update for tutor's displayName in event activity collection
      for (let i = 0; i < eventsActivityQuerySnap.docs.length; i++) {
        let eventsActivityQueryDocRef = await firestore
          .collection("activity")
          .doc(eventsActivityQuerySnap.docs[i].id);

        batch.update(eventsActivityQueryDocRef, {
          tutorName: updatedUser.displayName
        });
      }
    }

    // batch update for both tutor's and tutee's displayName in attendee array
    // which is inside event collection
    for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
      let eventAttendeeQueryDocRef = await firestore
        .collection("events")
        .doc(eventAttendeeQuerySnap.docs[i].data().eventId);
      let event = await eventAttendeeQueryDocRef.get();
      console.log(event);

      batch.update(eventAttendeeQueryDocRef, {
        [`attendees.${userUid}.displayName`]: updatedUser.displayName
      });
    }

    // commit the updates to firestore
    await batch.commit();
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
    displayName: profile.displayName,
    isTutor: false,
    photoURL: profile.photoURL
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
      photoURL: profile.photoURL
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
export const setMainPhoto = photo => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  let userDocRef = firestore.collection("users").doc(user.uid);
  let eventAttendeeRef = firestore.collection("event_attendee");
  let eventActivityRef = firestore.collection("activity");
  try {
    dispatch(asyncActionStart());
    let batch = firestore.batch();

    // batch update the photoURL inside the users collection
    batch.update(userDocRef, {
      photoURL: photo.url
    });

    let eventQuery = await eventAttendeeRef.where("userUid", "==", user.uid);
    let eventQuerySnap = await eventQuery.get(); // get in the form of array

    let eventActivityQuery = await eventActivityRef.where(
      "tutorUid",
      "==",
      user.uid
    );
    let eventActivityQuerySnap = await eventActivityQuery.get(); // get in the form of array

    for (let i = 0; i < eventQuerySnap.docs.length; i++) {
      let eventDocRef = await firestore
        .collection("events")
        .doc(eventQuerySnap.docs[i].data().eventId);

      let event = await eventDocRef.get(); // get in the form of array

      // batch update the photoURL inside the events collection
      if (event.data().tutorUid === user.uid) {
        batch.update(eventDocRef, {
          tutorPhotoURL: photo.url,
          [`attendees.${user.uid}.photoURL`]: photo.url
        });
      } else {
        batch.update(eventDocRef, {
          [`attendees.${user.uid}.photoURL`]: photo.url
        });
      }

      // batch update the photoURL inside the event attendee collection
      let eventAttendeeDocRef = await firestore
        .collection("event_attendee")
        .doc(eventQuerySnap.docs[i].id);

      batch.update(eventAttendeeDocRef, {
        photoURL: photo.url
      });
    }

    // batch update the photoURL inside the event activity collection
    for (let i = 0; i < eventActivityQuerySnap.docs.length; i++) {
      let eventActivityDocRef = await firestore
        .collection("activity")
        .doc(eventActivityQuerySnap.docs[i].id);

      batch.update(eventActivityDocRef, {
        photoURL: photo.url
      });
    }

    // commit the updates to firestore
    await batch.commit();
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem setting main photo");
  }
};
