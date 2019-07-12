const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => {
  return {
    type: type,
    eventDate: event.date,
    tutorName: event.tutorName,
    subject: event.subject,
    // photoURL: newEvent.photoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    tutorUid: event.tutorUid,
    eventId: id
  };
};

exports.createActivity = functions.firestore
  .document("events/{eventId}")
  .onCreate(event => {
    let newEvent = event.data();

    console.log(newEvent);

    // activity is an object
    const activity = newActivity("newEvent", newEvent, event.id);

    console.log(activity);

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created with ID: ", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity", err);
      });
  });

exports.cancelActivity = functions.firestore
  .document("events/{eventId}")
  .onUpdate((event, context) => {
    let updatedEvent = event.after.data();
    let previousEventData = event.before.data();

    console.log({ event });
    console.log({ context });
    console.log({ updatedEvent });
    console.log({ previousEventData });

    if (
      !updatedEvent.cancelled ||
      updatedEvent.cancelled === previousEventData.cancelled
    )
      return false;

    const activity = newActivity(
      "cancelledEvent",
      updatedEvent,
      context.params.eventId
    );

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created with ID: ", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity", err);
      });
  });
