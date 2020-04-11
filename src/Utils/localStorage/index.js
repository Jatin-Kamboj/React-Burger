export const set = (name, object) => localStorage.setItem(name, object);
export const remove = (name) => localStorage.removeItem(name);
export const get = (name) => localStorage.getItem(name);
