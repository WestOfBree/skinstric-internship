"use client";

interface PopupProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAllow?: () => void;
    onDeny?: () => void;
}

const Popup = ({ isOpen, setIsOpen, onAllow, onDeny }: PopupProps) => {
    if (!isOpen) return null;

    const handleDeny = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDeny?.();
        setIsOpen(false);
    };

    const handleAllow = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onAllow?.();
        setIsOpen(false);
    };

    return (
        <div className="absolute z-50 w-88 md:left-90 md:top-[43%]" onClick={(event) => event.stopPropagation()}>
            <div className="bg-[#1A1B1C] pb-2 pt-4 uppercase">
                <h2 className="mb-12 pl-4 text-base font-semibold leading-6 text-white">
                    Allow A.I to access your camera
                </h2>
                <div className="mt-4 flex border-t border-white pt-2">
                    <button type="button" className="px-7 md:translate-x-45 font-normal text-sm tracking-tight leading-4 hover:text-gray-500 py-1 text-[#fcfcfca1] cursor-pointer" onClick={handleDeny}>
                        Deny
                    </button>
                    <button type="button" className="px-5 md:translate-x-45 font-semibold text-sm leading-4 tracking-tight hover:text-gray-300 py-1 text-white cursor-pointer" onClick={handleAllow}>
                        Allow
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;