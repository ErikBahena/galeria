import Image from "next/image";
import Link from "next/link";

const Nav = ({ firstImageId }: { firstImageId?: string }) => {
  return (
    <nav className="flex flex-wrap items-center justify-between border-b border-gray-200 py-4 text-black lg:py-7">
      {/* title */}
      <div className="flex items-center gap-2">
        {/* icon */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="La Galeria"
            width={50}
            height={50}
          />
        </Link>

        <Link href="/" className="text-2xl font-black tracking-tighter">
          La Galeria
        </Link>
      </div>

      {/* start slideshow */}
      <Link
        className="pt-[6px] text-sm uppercase tracking-widest text-gray-500 hover:text-gray-600"
        href={`
        ${firstImageId ? `/slideshow/${firstImageId}` : "/"}
        `}
      >
        {firstImageId ? "Start Slideshow" : "Gallery"}
      </Link>
    </nav>
  );
};

export default Nav;
