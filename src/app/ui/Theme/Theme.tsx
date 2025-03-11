import { useSelector } from 'react-redux';
import { theme } from '../theme';

//random comment for git commit
export const Theme = ({ children }: any) => {
  const nightMode = useSelector((state) => state.themeReducer.nightMode);
  const classNameString = nightMode
    ? theme.dark.background
    : theme.light.background;

  return <div className={classNameString}>{children}</div>;
};
