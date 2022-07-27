const getHistoryListByDirection = (historyList, direction) => {
  const { _in, _out } = direction;

  if (_in && _out) {
    return historyList;
  } else if (!_in && !_out) {
    return [];
  }

  const _direction = _in ? "in" : _out && "out";

  return historyList.filter((history) => history.direction === _direction);
};

export { getHistoryListByDirection };
