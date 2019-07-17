export const createNewEvent = (user, event) => {
  return {
    ...event,
    tutorUid: user.uid,
    tutorName: user.displayName,
    tutorPhotoURL: user.photoURL,
    created: new Date(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: new Date(),
        displayName: user.displayName,
        isTutor: true,
        photoURL: user.photoURL
      }
    }
  };
};

export const objectToArray = object => {
  if (object) {
    return Object.entries(object).map(e =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
};
