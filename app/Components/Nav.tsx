import Link from "next/link";
const Nav = () => {
  return (
    <header className="relative z-1000 mb-3 flex h-16 w-full flex-row items-center justify-between bg-transparent px-0 py-3 text-black">
      <div className="flex flex-row pt-1 scale-75 justify-center items-center">
       <Link href="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C]">sKINsTRIC </Link>
       [<p className="text-[#1A1B1C83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>]
        </div>
      <button className="inline-flex items-center justify-center font-semibold text-white bg-[#1A1B1C] h-9 px-4 py-2 mx-4 text-[10px] text-primary-foreground shadow transition-colors hover:border border-black hover:bg-white hover:text-black cursor-not-allowed" disabled>
        ENTER CODE
      </button>
    </header>
  );
};

export default Nav;