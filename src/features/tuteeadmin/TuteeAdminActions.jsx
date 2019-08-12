import cuid from "cuid";
import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../async/asyncActions";
import { closeModal } from "../modals/modalActions.js";

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

export const goingToEventAdmin = (event, tutees) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(asyncActionStart());
  const firebase = getFirebase();
  const firestore = firebase.firestore();
  const admin = firebase.auth().currentUser;
  const attendees = [];

  // adding tutee details into event object
  tutees.forEach(async tutee => {
    let attendee = {
      going: true,
      joinDate: new Date(),
      displayName: tutee.displayName,
      isTutor: false,
      photoURL: tutee.photoURL
    };

    attendees.push(tutee);

    try {
      // just in case if multiple transactions are happening
      // (Eg. tutor editing class details and tutee join class at the same time)
      // .runTransaction() is use to check whether any changes to event details
      // if there is a change, the method to sign up a tutee to the class will be re-run
      let eventDocRef = firestore.collection("events").doc(event.id);
      let eventAttendeeDocRef = firestore
        .collection("event_attendee")
        .doc(`${event.id}_${tutee.tuteeUid}`);

      await firestore.runTransaction(async transaction => {
        await transaction.get(eventDocRef);
        await transaction.update(eventDocRef, {
          [`attendees.${tutee.tuteeUid}`]: attendee
        });

        await transaction.set(eventAttendeeDocRef, {
          eventId: event.id,
          userUid: tutee.tuteeUid,
          eventDate: event.date,
          isTutor: false,
          photoURL: tutee.photoURL
        });
      });
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      dispatch(closeModal());
      toastr.error("Oops", "Problem signing up to this class");
    }
  });

  // storing event id and respective tutees in user collection "events"
  // .set will overwrite current array of tutees
  let adminDocRef = firestore
    .collection("users")
    .doc(admin.uid)
    .collection("events")
    .doc(event.id);

  await adminDocRef.set({
    attendees: attendees
  });

  dispatch(asyncActionFinish());
  dispatch(closeModal());
  toastr.success("Success", "Update successful");
};

export const cancelGoingToEventAdmin = (event, initialArr) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch(asyncActionStart());
  const firestore = getFirestore();

  initialArr.forEach(async tuteeId => {
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${tuteeId}`]: firestore.FieldValue.delete()
      });
      await firestore.delete(`event_attendee/${event.id}_${tuteeId}`);
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  })
  
};
