import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../store/selector/selector.js';
import { toggleTheme } from '../../store/slice/themeSlice.jsx';
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useEffect} from 'react';

const ThemeSwitcher = () => {
    const savedTheme = JSON.parse(localStorage.getItem("currentTheme"));
    const currentTheme = useSelector(theme);
    console.log("current Theme",currentTheme)
    const dispatch = useDispatch();

    const saveCurrentThemeToLocalStorage = (theme) => {
        localStorage.setItem("currentTheme", JSON.stringify(theme));
    };

    //Permet de garder le theme clique meme avec un refresh : premier rendu
    useEffect(() => {
        if(savedTheme){
            document.body.className = savedTheme === 'dark' ? 'dark-mode' : '';
        }
        else{
            document.body.className = currentTheme === 'dark' ? 'dark-mode' : '';
        }
    }, []);

    useEffect(() => {
        if (currentTheme !== savedTheme) {
            document.body.className = currentTheme === 'dark' ? 'dark-mode' : '';
            saveCurrentThemeToLocalStorage(currentTheme);
        }
    }, [currentTheme]);
    

    const handleSwitchTheme = (e) => {
        e.preventDefault();
        dispatch(toggleTheme())
    }

    return (
        <button className="switchTheme" onClick={handleSwitchTheme}>
            {currentTheme === 'light' ? (
                <>
                    <FaMoon className='icon'/> Dark Mode
                </>
            ) : (
                <>
                    <MdSunny className='icon'/> Light Mode
                </>
            )}
        </button>

    );
};

export default ThemeSwitcher