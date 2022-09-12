import { useState } from "react";

const ScrollToTop = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 500) {
            setVisible(true)
        }
        else if (scrolled <= 500) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button onClick={scrollToTop} className={`${visible ? 'fixed bottom-[5%] right-[15%] sm:right-[5%] w-12 h-12 sm:w-10 sm:h-10 rounded-full z-10 border-2 bg-black/60 border-white flex items-center justify-center text-white' : ''}`}>
            <svg fill="white" className=" h-6 w-6 -rotate-90 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" style={{ display: visible ? 'inline' : 'none' }} /></svg>
        </button>
    );
}

export default ScrollToTop;