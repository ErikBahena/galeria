import { useRouter } from "next/router";
import { useEffect } from "react";
import { rawImages, ImageType } from "../../data/images";
import Image from "next/image";
import Head from "next/head";
import Nav from "../../components/Nav";

const SlideShowImage = () => {
  const router = useRouter();
  const id = router.query.id as string; // Cast to string

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

  const combinedColumns = columns.flat();

  const currentImage = combinedColumns.find((image) => image.id === id);
  const currentIndex = combinedColumns.findIndex((image) => image.id === id);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % combinedColumns.length;
      const nextImage = combinedColumns[nextIndex];
      if (nextImage) {
        router.push(`/slideshow/${nextImage.id}`);
      }
    }, 10000);

    return () => clearInterval(interval);
  });

  if (!currentImage) {
    return null;
  }

  return (
    <div className="px-3 md:px-8 lg:px-10">
      <Head>
        <title>{currentImage.title} | La Galeria</title>
        <meta name="description" content="art gallery website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />

      <SlideShowCard image={currentImage} />

      <ProgressFooter
        currentIndex={currentIndex}
        currentImage={currentImage}
        combinedColumns={combinedColumns}
        total={imageLength}
      />
    </div>
  );
};

export default SlideShowImage;

const SlideShowCard = ({ image }: { image: ImageType }) => {
  return (
    <main
      className="grid grid-cols-1 gap-3 pt-3 pb-24 md:grid-cols-2 md:gap-8
      md:pb-32 lg:gap-10 lg:pb-40
      "
    >
      {/* image */}
      <div className="relative">
        <Image
          src={image.image}
          alt={image.title}
          width={800}
          height={500}
          loading="eager"
        />

        {/* corner at top right with title */}
        <div
          className="
          absolute bottom-0 right-0 
          bg-white py-2
          px-7
          text-center md:top-0 md:bottom-auto
          md:px-10
            
        md:pb-10 md:pt-2"
        >
          <div>
            <h3 className="text-lg font-bold text-black md:text-4xl">
              {image.title}
            </h3>
            <p className="text-xs text-gray-700 md:text-sm">{image.artist}</p>
          </div>
        </div>
      </div>

      {/* text */}
      <div>
        {/* year */}
        <p className="-mb-5 pr-4 text-right text-5xl font-black text-gray-300/70 md:-mb-10 md:text-9xl">
          {image.year}
        </p>
        <p
          // keep the text format
          className="whitespace-pre-wrap px-4 md:px-0"
        >
          {image.description}
        </p>
      </div>
    </main>
  );
};

const ProgressFooter = ({
  currentIndex,
  currentImage,
  total,
  combinedColumns,
}: {
  currentIndex: number;
  currentImage: ImageType;
  total: number;
  combinedColumns: ImageType[];
}) => {
  const router = useRouter();

  const navigateToImage = (index: number) => {
    const nextIndex = (index + total) % total;
    const nextImage = combinedColumns[nextIndex];
    if (nextImage) {
      router.push(`/slideshow/${nextImage.id}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 mt-10 w-full bg-white">
      <div className="h-[2px] w-full bg-gray-300">
        <div
          className="h-full bg-gray-700"
          style={{ width: `${(currentIndex / total) * 100}%` }}
        ></div>
      </div>

      <div className="flex w-full justify-between p-4 md:px-10 md:py-7">
        {/* title */}
        <div>
          <h3 className="font-bold leading-snug tracking-wide text-black md:text-lg">
            {currentImage.title}
          </h3>
          <p className="text-xs text-gray-700 md:text-sm">
            {currentImage.artist}
          </p>
        </div>

        {/* next and previous buttons */}
        <div className="flex items-center gap-4">
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={() => navigateToImage(currentIndex - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 md:h-8 md:w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={() => navigateToImage(currentIndex + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 md:h-8 md:w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
