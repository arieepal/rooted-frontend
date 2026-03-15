// utils/api.js

//fake data
let hairProfile = {
  hairType: "4C",
  porosity: "Low",
  goals: "Length retention",
};

let routines = [
  {
    _id: "65f7368dfb74bd6a92114c85",
    name: "Wash Day",
    steps: ["Shampoo", "Deep Condition", "Moisturize"],
    date: "2026-01-30",
  },
];

//hair profile
export const getHairProfile = () => {
  return Promise.resolve(hairProfile);
};

export const updateHairProfile = (updates) => {
  return new Promise((resolve) => {
    hairProfile = { ...hairProfile, ...updates };
    resolve(hairProfile);
  });
};

//hair routine

export const getRoutines = () => {
  return new Promise((resolve) => {
    resolve(routines);
  });
};

export const saveRoutine = (routine) => {
  return new Promise((resolve) => {
    const newRoutine = {
      ...routine,
      _id: crypto.randomUUID(),
    };
    routines.push(newRoutine);
    resolve(newRoutine);
  });
};

export const deleteRoutine = (id) => {
  return new Promise((resolve) => {
    routines = routines.filter((r) => r._id !== id);
    resolve({ message: "Routine deleted" });
  });
};
