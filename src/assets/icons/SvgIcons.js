
export const LikedIconOff = (props, stroke) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M22 9C22 5.69 19.65 3 16.75 3C14.65 3 12.84 4.42 12 6.46C11.16 4.42 9.35 3 7.25 3C4.35 3 2 5.69 2 9C2 10.45 2.5 11.73 3.11 12.85C4.34 15.22 6.8 18.11 11.48 20.86C11.79 21.04 12.2 21.04 12.51 20.86C17.18 18.11 19.71 15.28 20.94 12.92C21.55 11.75 22 10.46 22 9Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

export const LikedIconOn = (props, stroke) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M22 9C22 5.69 19.65 3 16.75 3C14.65 3 12.84 4.42 12 6.46C11.16 4.42 9.35 3 7.25 3C4.35 3 2 5.69 2 9C2 10.45 2.5 11.73 3.11 12.85C4.34 15.22 6.8 18.11 11.48 20.86C11.79 21.04 12.2 21.04 12.51 20.86C17.18 18.11 19.71 15.28 20.94 12.92C21.55 11.75 22 10.46 22 9Z" fill="#F63C4A" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

export const SizeIcon = (props, stroke) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <rect vectorEffect="non-scaling-stroke" x="2.7" y="2.7" width="18.6" height="18.6" rx=".1" stroke={stroke} strokeWidth="1.4"></rect>
    <path vectorEffect="non-scaling-stroke" d="M6.7 11V6.7H11m6.3 6.3v4.3H13" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"></path>
  </svg>
);

export const RoomIcon = (props, stroke) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <rect vectorEffect="non-scaling-stroke" x="2.7" y="2.7" width="18.6" height="18.6" rx=".1" stroke={stroke} strokeWidth="1.4"></rect>
    <path vectorEffect="non-scaling-stroke" d="M2.5 16H15" stroke={stroke} strokeWidth="1.4"></path>
    <path vectorEffect="non-scaling-stroke" d="M15 2.7v18.6" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"></path>
  </svg>
);

export const ParkingIcon = (props, stroke) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <circle vectorEffect="non-scaling-stroke" cx="12" cy="12" r="9.3" stroke={stroke} strokeWidth="1.4" />
    <path vectorEffect="non-scaling-stroke" d="M9.5 16V8H13a2.5 2.5 0 0 1 0 5H9.5" stroke={stroke} strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

export const FloorIcon = (props, stroke) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path vectorEffect="non-scaling-stroke" d="M19.3 21.5V2.8a.1.1 0 0 0-.1-.1H4.8a.1.1 0 0 0-.1.1v18.7" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"></path>
    <path vectorEffect="non-scaling-stroke" d="M2 21.3h20M8 7h3m2 0h3m-8 4h3m2 0h3m-8 4h3m2 0h3" stroke={stroke} strokeWidth="1.4"></path>
  </svg>
);

export const DateIcon = (props, stroke) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path vectorEffect="non-scaling-stroke" d="M17 2v4.4M7 2v4.4" stroke={stroke} strokeWidth="1.4" strokeLinejoin="bevel"></path>
    <path vectorEffect="non-scaling-stroke" d="M2.7 4.4a.1.1 0 0 1 .1-.1h18.4a.1.1 0 0 1 .1.1v15.8a.1.1 0 0 1-.1.1H2.8a.1.1 0 0 1-.1-.1V4.4Z" stroke={stroke} strokeWidth="1.4"></path>
    <path vectorEffect="non-scaling-stroke" d="M2.5 9h19" stroke={stroke} strokeWidth="1.4" strokeLinejoin="bevel"></path>
  </svg>
);

// --- SNS LOGO ICONS ---
export const KakaoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C13.9888 2 15.8283 2.38095 17.5184 3.14284C19.2085 3.90473 20.5447 4.94076 21.5268 6.25089C22.5089 7.56098 23 8.99005 23 10.538C23 12.086 22.5089 13.5171 21.5268 14.8313C20.5447 16.1454 19.2106 17.1834 17.5245 17.9453C15.8385 18.7072 13.997 19.0882 12 19.0882C11.3698 19.0882 10.7191 19.0438 10.048 18.9551C7.13428 20.9465 5.58335 21.9543 5.3951 21.9785C5.30506 22.0108 5.2191 22.0067 5.13727 21.9664C5.10452 21.9422 5.07998 21.91 5.0636 21.8696C5.04723 21.8293 5.03906 21.7931 5.03906 21.7608V21.7125C5.08819 21.398 5.46056 20.0879 6.15626 17.7821C4.57664 17.0081 3.32236 15.9821 2.39342 14.7042C1.46447 13.4264 1 12.0376 1 10.538C1 8.99005 1.49107 7.56098 2.47322 6.25089C3.45536 4.94076 4.79148 3.90473 6.48158 3.14284C8.17168 2.38095 10.0112 2 12 2Z" fill="#000000"/>
  </svg>
);

export const NaverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15.2048 12.6338L8.532 3H3V21H8.79525V11.3662L15.468 21H21V3H15.2048V12.6338Z" fill="#FFFFFF"/>
  </svg>
);

export const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23.0001C14.97 23.0001 17.46 22.0201 19.28 20.3401L15.71 17.5701C14.73 18.2301 13.48 18.6301 12 18.6301C9.13999 18.6301 6.70999 16.7001 5.83999 14.1001H2.17999V16.9401C3.98999 20.5301 7.69999 23.0001 12 23.0001Z" fill="#34A853"/>
    <path d="M5.84 14.0901C5.62 13.4301 5.49 12.7301 5.49 12.0001C5.49 11.2701 5.62 10.5701 5.84 9.91007V7.07007H2.18C1.43 8.55007 1 10.2201 1 12.0001C1 13.7801 1.43 15.4501 2.18 16.9301L5.03 14.7101L5.84 14.0901Z" fill="#FBBC05"/>
    <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.69999 1 3.98999 3.47 2.17999 7.07L5.83999 9.91C6.70999 7.31 9.13999 5.38 12 5.38Z" fill="#EA4335"/>
  </svg>
);

export const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20.4273 8.4997C19.7044 8.93984 19.1055 9.55528 18.6868 10.2884C18.2681 11.0215 18.0433 11.8484 18.0333 12.6915C18.0361 13.6404 18.3187 14.5677 18.8461 15.3584C19.3734 16.1491 20.1223 16.7686 21 17.14C20.654 18.2508 20.1418 19.3034 19.4808 20.2624C18.535 21.6169 17.546 22.9714 16.0412 22.9714C14.5364 22.9714 14.1495 22.1017 12.4153 22.1017C10.724 22.1017 10.1222 23 8.74678 23C7.37134 23 6.41098 21.7453 5.30745 20.2054C3.84963 18.0483 3.04843 15.5185 3 12.9196C3 8.64201 5.79472 6.37523 8.54632 6.37523C10.0082 6.37523 11.2262 7.33052 12.1433 7.33052C13.0176 7.33052 14.3791 6.31823 16.0416 6.31823C16.8964 6.29622 17.7435 6.48368 18.5083 6.86409C19.2731 7.24451 19.9321 7.8062 20.4273 8.4997ZM12.2583 6.07579C12.1573 6.07549 12.0565 6.06597 11.9573 6.04735C11.9293 5.91606 11.9149 5.78225 11.9143 5.64803C11.9621 4.54455 12.3926 3.4916 13.1325 2.66815C13.963 1.71914 15.127 1.12228 16.3858 1C16.4157 1.14541 16.4301 1.29356 16.4288 1.44198C16.4015 2.56753 15.9866 3.64963 15.2536 4.50741C14.8872 4.95716 14.4328 5.32811 13.9179 5.59772C13.403 5.86734 12.8383 6.02999 12.2583 6.07579Z" fill="#FFFFFF"/>
  </svg>
);