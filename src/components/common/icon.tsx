
/**
 * @name SearchIcon
 * @description SearchIcon component renders a search icon SVG.
 * @returns {JSX.Element} - The rendered ActiveChannelPage component.
 */
export const SearchIcon: React.FC = () => {

    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.65001 2.69922C10.3838 2.69922 12.6 4.91541 12.6 7.64922C12.6 8.77271 12.2257 9.80878 11.595 10.6395L15.3273 14.3719C15.5909 14.6355 15.5909 15.0629 15.3273 15.3265C15.0877 15.5662 14.7127 15.5879 14.4484 15.3919L14.3727 15.3265L10.6403 11.5942C9.80957 12.2249 8.7735 12.5992 7.65001 12.5992C4.9162 12.5992 2.70001 10.383 2.70001 7.64922C2.70001 4.91541 4.9162 2.69922 7.65001 2.69922ZM7.65001 4.04922C5.66179 4.04922 4.05001 5.66099 4.05001 7.64922C4.05001 9.63744 5.66179 11.2492 7.65001 11.2492C9.63824 11.2492 11.25 9.63744 11.25 7.64922C11.25 5.66099 9.63824 4.04922 7.65001 4.04922Z"
                fill="#94A3B8"
            />
        </svg>
    )
}

/**
 * @name FilterIcon
 * @description FilterIcon component renders a filter icon SVG.
 * @returns {JSX.Element} - The rendered FilterIcon component.
 */
export const FilterIcon: React.FC = () => {
    return (
        <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.2083 8.00023H5.91246M2.27829 8.00023H0.791626M2.27829 8.00023C2.27829 7.51842 2.46969 7.05635 2.81038 6.71566C3.15107 6.37497 3.61315 6.18357 4.09496 6.18357C4.57677 6.18357 5.03885 6.37497 5.37954 6.71566C5.72023 7.05635 5.91163 7.51842 5.91163 8.00023C5.91163 8.48204 5.72023 8.94412 5.37954 9.28481C5.03885 9.6255 4.57677 9.8169 4.09496 9.8169C3.61315 9.8169 3.15107 9.6255 2.81038 9.28481C2.46969 8.94412 2.27829 8.48204 2.27829 8.00023ZM16.2083 13.5061H11.4183M11.4183 13.5061C11.4183 13.988 11.2264 14.4506 10.8857 14.7914C10.5449 15.1321 10.0827 15.3236 9.60079 15.3236C9.11898 15.3236 8.65691 15.1313 8.31622 14.7906C7.97552 14.45 7.78413 13.9879 7.78413 13.5061M11.4183 13.5061C11.4183 13.0241 11.2264 12.5624 10.8857 12.2216C10.5449 11.8808 10.0827 11.6894 9.60079 11.6894C9.11898 11.6894 8.65691 11.8808 8.31622 12.2215C7.97552 12.5622 7.78413 13.0243 7.78413 13.5061M7.78413 13.5061H0.791626M16.2083 2.4944H13.6208M9.98663 2.4944H0.791626M9.98663 2.4944C9.98663 2.01259 10.178 1.55051 10.5187 1.20982C10.8594 0.869133 11.3215 0.677734 11.8033 0.677734C12.0419 0.677734 12.2781 0.724724 12.4985 0.81602C12.7189 0.907316 12.9192 1.04113 13.0879 1.20982C13.2566 1.37852 13.3904 1.57878 13.4817 1.79919C13.573 2.0196 13.62 2.25583 13.62 2.4944C13.62 2.73297 13.573 2.9692 13.4817 3.18961C13.3904 3.41002 13.2566 3.61028 13.0879 3.77898C12.9192 3.94767 12.7189 4.08149 12.4985 4.17278C12.2781 4.26408 12.0419 4.31107 11.8033 4.31107C11.3215 4.31107 10.8594 4.11967 10.5187 3.77898C10.178 3.43829 9.98663 2.97621 9.98663 2.4944Z"
                stroke="#1E293B"
                strokeMiterlimit="10"
                strokeLinecap="round"
            />
        </svg>
    )
}

 
/**
 * @name HandIcon
 * @description HandIcon component renders a hand icon SVG.
 * @returns {JSX.Element} - The rendered HandIcon component.
 */
export const HandIcon: React.FC = () => {
    return (
        <svg
            className="absolute inset-y-0 left-3 top-3 flex items-center text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9095A1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg> 
    )
}

/**
 * @name EMAILIcon
 * @description EMAILIcon component renders an email icon SVG.
 * @returns {JSX.Element} - The rendered EMAILIcon component.
 */
export const EMAILIcon: React.FC = () => {
    return (
        <svg
            className="absolute inset-y-0 left-3 top-3 flex items-center text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9095A1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg> 
    )
}


/**
 * @name LockIcon
 * @description LockIcon component renders an lock icon SVG.
 * @returns {JSX.Element} - The rendered LockIcon component.
 */
export const LockIcon: React.FC = () => {
    return (
        <svg
            className="absolute inset-y-0 left-3 top-3 flex items-center text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9095A1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 9.28564L4.99998 9.28564C4.211 9.28564 3.57141 9.92524 3.57141 10.7142L3.57141 16.4285C3.57141 17.2175 4.211 17.8571 4.99998 17.8571L15 17.8571C15.789 17.8571 16.4286 17.2175 16.4286 16.4285V10.7142C16.4286 9.92524 15.789 9.28564 15 9.28564Z" stroke="#9095A1" strokeWidth="1.71429" strokeMiterlimit="10" strokeLinecap="square"/>
            <path d="M9.99998 15.0002C10.789 15.0002 11.4286 14.3606 11.4286 13.5716C11.4286 12.7827 10.789 12.1431 9.99998 12.1431C9.211 12.1431 8.57141 12.7827 8.57141 13.5716C8.57141 14.3606 9.211 15.0002 9.99998 15.0002Z" stroke="#9095A1" strokeWidth="1.71429" strokeMiterlimit="10" strokeLinecap="square"/>
            <path d="M13.5714 6.42847V5.71418C13.5808 4.77649 13.2173 3.87349 12.561 3.20375C11.9046 2.53401 11.0091 2.15237 10.0714 2.14275H10C9.06233 2.13342 8.15933 2.4969 7.48958 3.15324C6.81984 3.80959 6.4382 4.70507 6.42859 5.64275V6.42847" stroke="#9095A1" strokeWidth="1.71429" strokeMiterlimit="10" strokeLinecap="square"/>
        </svg> 
    )
}


/**
 * @name EyeOff
 * @description EyeOff component renders an eye off icon SVG.
 * @returns {JSX.Element} - The rendered EyeOff component.
 */
export const EyeOff: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9095A1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye-off border-0"
        >
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
        <path d="m2 2 20 20" />
        </svg> 
    )
}

/**
 * @name Eye
 * @description Eye component renders an eye icon SVG.
 * @returns {JSX.Element} - The rendered Eye component.
 */
export const Eye: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9095A1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye border-0"
        >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

/**
 * @name LoadingIcon
 * @description LoadingIcon component renders a spinning loading icon SVG.
 * @returns {JSX.Element} - The rendered LoadingIcon component.
 */
export const LoadingIcon: React.FC = () => {
    return (
        <svg
            className="animate-spin h-5 w-5 text-white mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            ></circle>
            <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
            ></path>
        </svg>
    )
}

/**
 * @name TickIcon
 * @description TickIcon component renders a tick icon SVG.
 * @returns {JSX.Element} - The rendered TickIcon component.
 */
export const TickIcon: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            >
            <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
            />
        </svg>
    )
}


/**
 * @name SignoutIcon
 * @description SignoutIcon component renders a sign-out icon SVG.
 * @returns {JSX.Element} - The rendered SignoutIcon component.
 */
export const SignoutIcon: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    )
}

/**
 * @name AddIcon
 * @description AddIcon component renders an add icon SVG.
 * @returns {JSX.Element} - The rendered AddIcon component.
 */
export const AddIcon: React.FC = () => {
    return (
        <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.5 1V15M1.5 8H15.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

/**
 * @name CopyIcon
 * @description CopyIcon component renders a copy icon SVG.
 * @returns {JSX.Element} - The rendered CopyIcon component.
 */
export const CopyIcon: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F81E1E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-copy"
            >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    )
}

/**
 * @name KeyRoundIcon
 * @description KeyRoundIcon component renders a key icon with a rounded design SVG.
 * @returns {JSX.Element} - The rendered KeyRoundIcon component.
 */
export const KeyRoundIcon: React.FC = () => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F81E1E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-key-round"
        >
          <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
          <circle cx="16.5" cy="7.5" r=".5" fill="#F81E1E" />
        </svg>
    )
}

