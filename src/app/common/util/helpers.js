export const createNewEvent = (user, event) => {
  return {
    ...event,
    tutorUid: user.uid,
    tutorName: user.displayName,
    created: new Date(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: new Date(),
        displayName: user.displayName,
        isTutor: true
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
