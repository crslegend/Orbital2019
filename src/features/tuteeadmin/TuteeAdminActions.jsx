import cuid from "cuid";
import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../async/asyncActions";

export const createTutee = name => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(asyncActionStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    const uid = cuid();
    const admin = firebase.auth().currentUser;

    try {
      let newUser = {
        displayName: name,
        createdAt: firestore.FieldValue.serverTimestamp(),
        userType: "tutee",
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/helpden-ba041.appspot.com/o/user.png?alt=media&token=13ee949b-fe14-46f7-84e3-86dd09ee19f2",
        tuteeUid: uid
      };
      await firestore.set(`users/${uid}`, { ...newUser });
      await firestore.add(
        {
          collection: "users",
          doc: admin.uid,
          subcollections: [{ collection: "tutees" }]
        },
        { ...newUser }
      );
      dispatch(asyncActionFinish());
      toastr.success("Success", "You have registered a new tutee");
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error(
        "Oops",
        "You do not have permission to access this function"
      );
    }
  };
};

export const deleteTutee = tutee => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log(tutee);
  dispatch(asyncActionStart());
  const firebase = getFirebase();
  const firestore = getFirestore();
  const admin = firebase.auth().currentUser;

  try {
    await firestore.delete({
      collection: "users",
      doc: admin.uid,
      subcollections: [{ collection: "tutees", doc: tutee.id }]
    });
    dispatch(asyncActionFinish());
    toastr.success("Success", "Deleted a tutee");
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    toastr.error("Oops", "Something went wrong");
  }
};

export const goingToEventAdmin = event => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(asyncActionStart());
  const firebase = getFirebase();
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: new Date(),
    displayName: profile.displayName,
    isTutor: false,
    photoURL: profile.photoURL
  };

  try {
    // just in case if multiple transactions are happening
    // (Eg. tutor editing class details and tutee join class at the same time)
    // .runTransaction() is use to check whether any changes to event details
    // if there is a change, the method to sign up a tutee to the class will be re-run
    let eventDocRef = firestore.collection("events").doc(event.id);
    let eventAttendeeDocRef = firestore
      .collection("event_attendee")
      .doc(`${event.id}_${user.uid}`);

    await firestore.runTransaction(async transaction => {
      await transaction.get(eventDocRef);
      await transaction.update(eventDocRef, {
        [`attendees.${user.uid}`]: attendee
      });
      await transaction.set(eventAttendeeDocRef, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        isTutor: false,
        photoURL: profile.photoURL
      });
    });

    dispatch(asyncActionFinish());
    toastr.success("Success", "You have signed up for this class");
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    toastr.error("Oops", "Problem signing up to this class");
  }
};
