import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../store/selector/selector.js';
import { toggleTheme } from '../../store/slice/themeSlice.jsx';
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useEffect } from 'react';

const ThemeSwitcher = () => {
    const currentTheme = useSelector(theme);
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.className = currentTheme === 'dark' ? 'dark-mode' : '';
    }, [currentTheme]);

    return (
        <button className="switchTheme"  onClick={() => dispatch(toggleTheme())}>
        {currentTheme === 'light' ? (
    <>
                        <FaMoon /> Dark Mode

    
    </>
    ) : (
        <>
        <MdSunny /> Light Mode
        </>
    )}
        </button>

    );
};

export default ThemeSwitcher