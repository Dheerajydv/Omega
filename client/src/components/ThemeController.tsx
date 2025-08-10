const ThemeController = () => {
    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content max-h-60 overflow-y-auto bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
            >
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Default"
                        value="default"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Retro"
                        value="retro"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Cyberpunk"
                        value="cyberpunk"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Valentine"
                        value="valentine"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Aqua"
                        value="aqua"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Bumblebee"
                        value="bumblebee"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Emerald"
                        value="emerald"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Corporate"
                        value="corporate"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Synthwave"
                        value="synthwave"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Halloween"
                        value="halloween"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Garden"
                        value="garden"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Forest"
                        value="forest"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Lofi"
                        value="lofi"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="Pastel"
                        value="pastel"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="fantasy"
                        value="fantasy"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="wireframe"
                        value="wireframe"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="black"
                        value="black"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="luxury"
                        value="luxury"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="dracula"
                        value="dracula"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="cmyk"
                        value="cmyk"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="autumn"
                        value="autumn"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="business"
                        value="business"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="acid"
                        value="acid"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="lemonade"
                        value="lemonade"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="night"
                        value="night"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="coffee"
                        value="coffee"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="winter"
                        value="winter"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="dim"
                        value="dim"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="nord"
                        value="nord"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="sunset"
                        value="sunset"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="caramellatte"
                        value="caramellatte"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="abyss"
                        value="abyss"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-ghost justify-start"
                        aria-label="silk"
                        value="silk"
                    />
                </li>
            </ul>
        </div>
    );
};
export default ThemeController;
