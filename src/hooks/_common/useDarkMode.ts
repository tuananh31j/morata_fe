import { useCallback, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { darkMode } from '~/store/slice/themeSlice';

const useDarkTheme = () => {
    const [darkTheme, setDarkTheme] = useLocalStorage('dark_mode', false);
    const theme = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();

    const addClass = useCallback(
        (bodyElement: DOMTokenList, className: string) => {
            bodyElement.add(className);
            dispatch(darkMode(true));
        },
        [dispatch]
    );

    const removeClass = useCallback(
        (bodyElement: DOMTokenList, className: string) => {
            bodyElement.remove(className);
            dispatch(darkMode(false));
        },
        [dispatch]
    );

    useEffect(() => {
        const bodyElement = window.document.body.classList;
        const className = 'dark';
        if (darkTheme) {
            addClass(bodyElement, className);
        } else {
            removeClass(bodyElement, className);
        }
    }, [darkTheme, addClass, removeClass, theme]);

    return [darkTheme, setDarkTheme];
};

export default useDarkTheme;
