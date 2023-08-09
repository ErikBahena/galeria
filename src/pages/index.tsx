import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { rawImages } from "../data/images";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  const imageLength = rawImages.length;
  const columnOneImages = rawImages.slice(0, Math.ceil(imageLength / 4));
  const columnTwoImages = rawImages.slice(
    Math.ceil(imageLength / 4),
    Math.ceil(imageLength / 2)
  );
  const columnThreeImages = rawImages.slice(
    Math.ceil(imageLength / 2),
    Math.ceil((imageLength / 4) * 3)
  );
  const columnFourImages = rawImages.slice(Math.ceil((imageLength / 4) * 3));

  const columns = [
    columnOneImages,
    columnTwoImages,
    columnThreeImages,
    columnFourImages,
  ];

  if (!rawImages) {
    return null;
  }

  return (
    <>
      <div className="px-3 md:px-8 lg:px-10">
        <Head>
          <title>La Galeria</title>
          <meta name="description" content="art gallery website" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <Nav firstImageId={rawImages[0] && rawImages[0].id} />

        <main
          className="grid grid-cols-1 gap-3 py-3 md:grid-cols-2
      md:gap-8 md:py-7 lg:grid-cols-3 lg:gap-10 lg:py-10 xl:grid-cols-4"
        >
          {columns.map((column, i) => (
            <div key={i} className="flex flex-col gap-3 md:gap-8 lg:gap-10">
              {column.map((image: any, i: number) => (
                <Link
                  key={image.id}
                  href={`/slideshow/${image.id}`}
                  className="relative flex
          h-min transform cursor-pointer flex-col
          items-center transition duration-300 hover:scale-105
          "
                >
                  {/* adds a gradient to the bottom of the image to make the text more readable */}
                  <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-gray-900"></div>

                  <Image
                    src={image.image}
                    alt={image.title}
                    height={1}
                    width={150}
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-auto w-full"
                  />

                  <div className="absolute bottom-0 left-0 p-4 lg:p-6">
                    <h3 className="text-lg font-bold leading-snug tracking-wide text-white md:text-xl">
                      {image.title}
                    </h3>
                    <p className="text-xs text-gray-300 md:text-sm">
                      {image.artist}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Home;
