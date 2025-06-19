const MenuIcon:React.FC<{isChecked:boolean,handleCheckboxChange:()=>void}> = ({isChecked,handleCheckboxChange}) => {
    return (
        <div className="absolute z-50 top-3 right-3">
            {/* Embed custom CSS for the SVG animation.
          Tailwind CSS doesn't directly support stroke-dasharray/offset animations. */}
            <style>
                {`
        /* Base styling for the hamburger label */
        .hamburger {
          cursor: pointer;
        }

        /* Hide the actual checkbox input */
        .hamburger input {
          display: none;
        }

        /* Styling for the SVG container */
        .hamburger svg {
          height: 3em; /* Sets the overall size of the SVG icon */
          /* Apply Tailwind's transition timing to the transform property */
          transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Styling for the SVG path lines */
        .line {
          fill: none;
          stroke: black; /* Line color */
          stroke-linecap: round; /* Rounded line ends */
          stroke-linejoin: round; /* Rounded line joints */
          stroke-width: 3; /* Thickness of the lines */
          /* Define transitions for stroke-dasharray and stroke-dashoffset */
          transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Specific dash array for the top and bottom lines in their default state */
        .line-top-bottom {
          stroke-dasharray: 12 63;
        }

        /* Styles when the checkbox is checked (triggered by the React state) */
        .hamburger input:checked + svg {
          transform: rotate(-45deg); /* Rotates the entire SVG */
        }

        /* Specific dash array and offset for the top and bottom lines when checked,
           creating the "X" effect */
        .hamburger input:checked + svg .line-top-bottom {
          stroke-dasharray: 20 300;
          stroke-dashoffset: -32.42;
        }
        `}
            </style>

            {/* The main hamburger menu label.
          Using a label makes the entire area clickable for the checkbox. */}
            <label className="hamburger">
                {/* The hidden checkbox input. Its 'checked' state is controlled by React. */}
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                {/* The SVG icon for the hamburger/cross animation */}
                <svg viewBox="0 0 32 32">
                    {/* Top and Bottom lines */}
                    <path
                        className="line line-top-bottom"
                        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    ></path>
                    {/* Middle line */}
                    <path className="line" d="M7 16 27 16"></path>
                </svg>
            </label>
        </div>
    );
}

export default MenuIcon;