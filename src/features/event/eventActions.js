import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/common/util/helpers";
import firebase from "../../app/config/firebase";
import { FETCH_EVENTS } from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const profile = getState().firebase.profile;
    const newEvent = createNewEvent(user, event, profile);

    try {
      let createdEvent = await firestore.add("events", newEvent);

      // below properties are used for queries
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        isTutor: true,
        photoURL: user.photoURL
      });
      toastr.success("Success!", "A class has been created");
      return createdEvent;
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();
    try {
      dispatch(asyncActionStart());
      let eventDocRef = firestore.collection("events").doc(event.id);
      let dateEqual = getState().firestore.ordered.events[0].date.isEqual(
        event.date
      );
      if (!dateEqual) {
        let batch = firestore.batch();
        batch.update(eventDocRef, event);

        let eventAttendeeRef = firestore.collection("event_attendee");
        let eventActivityRef = firestore.collection("activity");

        // this query will give all the event attendees lists that matches with the eventId
        let eventAttendeeQuery = await eventAttendeeRef.where(
          "eventId",
          "==",
          event.id
        );

        // this query will give all the event activities that matches with the eventId
        let eventActivityQuery = await eventActivityRef.where(
          "eventId",
          "==",
          event.id
        );

        // get a snapshot of this query (array of events)
        let eventAttendeeQuerySnap = await eventAttendeeQuery.get();

        // get a snapshot of this query (array of event activities)
        let eventActivityQuerySnap = await eventActivityQuery.get();

        // update the eventDate inside the event_attendee collection
        for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
          let eventAttendeeDocRef = await firestore
            .collection("event_attendee")
            .doc(eventAttendeeQuerySnap.docs[i].id);

          batch.update(eventAttendeeDocRef, {
            eventDate: event.date
          });
        }

        // update the eventDate inside the event activity feed collection
        for (let i = 0; i < eventActivityQuerySnap.docs.length; i++) {
          let eventActivityDocRef = await firestore
            .collection("activity")
            .doc(eventActivityQuerySnap.docs[i].id);

          batch.update(eventActivityDocRef, {
            eventDate: event.date
          });
        }

        await batch.commit();
      } else {
        await eventDocRef.update(event);
      }
      //await firestore.update(`events/${event.id}`, event);
      dispatch(asyncActionFinish());
      toastr.success("Success!", "Class has been updated");
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error("Oops", "Something went wrong");
    }
  };
};

// export const deleteEvent = eventId => {
//   return {
//     type: DELETE_EVENT,
//     payload: {
//       eventId
//     }
//   };
// };

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel this class?"
    : "This will reactivate this class. Are you sure?";

  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEventsforDashboard = lastEvent => async (
  dispatch,
  getState
) => {
  let today = new Date();
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection("events");
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastEvent &&
      (await firestore
        .collection("events")
        .doc(lastEvent.id)
        .get());
    let query;

    lastEvent
      ? (query = eventsRef
          .where("date", ">=", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2))
      : (query = eventsRef
          .where("date", ">=", today)
          .orderBy("date")
          .limit(2));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let event = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      events.push(event);
    }
    dispatch({ type: FETCH_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
