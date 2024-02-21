import { Handler } from '_types/common';
import { useState } from 'react';

export const useSwitch = (
  initialState = false,
): [boolean, Handler, Handler, Handler] => {
  const [isActive, setIsActive] = useState(initialState);
  const onTurnOn = () => setIsActive(true);
  const onTurnOff = () => setIsActive(false);
  const onToggle = () => setIsActive(!isActive);
  return [isActive, onTurnOn, onTurnOff, onToggle];
};
