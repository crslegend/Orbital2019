export const createNewEvent = (user, event, profile) => {
  return {
    ...event,
    tutorUid: user.uid,
    tutorName: profile.displayName,
    tutorPhotoURL: profile.photoURL,
    created: new Date(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: new Date(),
        displayName: profile.displayName,
        isTutor: true,
        photoURL: profile.photoURL
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
