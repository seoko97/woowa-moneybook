const checkValidByDataToData = (_new, _prev) => {
  for (const key in _new) {
    const nV = _new[key];
    const pV = _prev[key];

    if (nV !== pV) return false;
  }
  return true;
};

export { checkValidByDataToData };
