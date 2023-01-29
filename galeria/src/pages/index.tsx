import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "../utils/api";

let rawImages = [
  {
    id: 1,
    title: "Starry Night",
    artist: "Vincent van Gogh",
    year: 1889,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    description: "The Starry Night is an oil on canvas by the Dutch post-impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an idealized village. It has been in the permanent collection of the Museum of Modern Art in New York City since 1941, acquired through the Lillie P. Bliss Bequest. Widely regarded as Van Gogh's magnum opus, The Starry Night is one of the most recognized paintings in the history of Western culture. It has been featured in several movies, including Vincent & Theo (1990), Lust for Life (1956), and A&E Biography: Vincent van Gogh (2000). It was also the inspiration for the cover of the 1977 album Houses of the Holy by the rock band Led Zeppelin. "
  },
  {
    id: 2,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: 1931,
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    description: "The Persistence of Memory is a 1931 painting by Spanish surrealist artist Salvador Dalí. It depicts soft, pocket watch-like clocks melting in the hot sun. The painting is one of Dalí's best-known works, and is often described as his most famous. It is currently in the collection of the Museum of Modern Art in New York City. The painting was inspired by a dream that Dalí had in 1930, in which he saw a landscape of mountains and a valley, with a group of clocks in the valley. The clocks were melting, and the melting clocks were forming a group of human figures. Dalí later described the dream as follows: "
  },
  {
    id: 3,
    title: "The Scream",
    artist: "Edvard Munch",
    year: 1893,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/330px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    description: "The Scream is an expressionist painting created by Norwegian artist Edvard Munch in 1893. It is one of the most famous paintings in the history of art. The painting depicts a figure with an agonized expression against a landscape with a reddish sky. It is in oil, tempera and pastel on cardboard. The figure is believed to be Munch himself, and the landscape is thought to be a view of the Oslo fjord. The painting is in the collection of the Munch Museum in Oslo, Norway. "
  },
  {
    id: 5,
    title: "The Night Watch",
    artist: "Rembrandt",
    year: 1642,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/570px-The_Night_Watch_-_HD.jpg",
    description: "The Night Watch is a 1642 painting by the Dutch Golden Age artist Rembrandt. It is a large-scale history painting depicting a militia company of the civic guard of Amsterdam called the 'Night Watch'. The painting is in the collection of the Rijksmuseum in Amsterdam. The Night Watch is one of the most famous paintings in the world. It is one of the most visited paintings in the Rijksmuseum, and is one of the most popular tourist attractions in the Netherlands. "
  },
  {
    id: 6,
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: 1495,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/525px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
    description: "The Last Supper is a late 15th-century mural painting by Leonardo da Vinci housed by the refectory of the Convent of Santa Maria delle Grazie in Milan. It is one of the world's most famous paintings. The painting represents the scene of The Last Supper of Jesus with his twelve apostles on the eve of his crucifixion. It is the culmination of Leonardo's monochrome period. The painting is a centerpiece of the museum, and the main tourist attraction in Milan. "
  },
  {
    id: 7,
    title: "The Mona Lisa",
    artist: "Leonardo da Vinci",
    year: 1503,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/405px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    description: "The Mona Lisa is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci. It is considered an archetypal masterpiece of the Italian Renaissance, and has been described as the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world. The painting's novel qualities include the subject's enigmatic expression, the monumentality of the composition, the subtle modelling of forms, and the atmospheric illusionism. "
  },
  {
    id: 8,
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: 1907,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/450px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    description: "test"
  },
  {
    id: 9,
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    year: 1486,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/600px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    description: "The Birth of Venus is a painting by the Italian Renaissance artist Sandro Botticelli. It depicts the goddess Venus arriving at the shore after her birth, when she had emerged from the sea fully-grown. The painting is in the Uffizi Gallery in Florence, Italy. It is one of Botticelli's best known works, and one of the most reproduced works of art in the world. "
  },
  {
    id: 10,
    title: "Hokusai's Great Wave",
    artist: "Katsushika Hokusai",
    year: 1831,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/600px-The_Great_Wave_off_Kanagawa.jpg",
    description: "test"
  },
  {
    id: 11,
    title: "Impression, Sunrise",
    artist: "Claude Monet",
    year: 1872,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/600px-Monet_-_Impression%2C_Sunrise.jpg",
    description: "test"
  },
  {
    id: 13,
    title: "Lady with an Ermine",
    artist: "Leonardo da Vinci",
    year: 1489,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/360px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg",
    description: "test"
  },
  {
    id: 14,
    title: "The Milkmaid",
    artist: "Johannes Vermeer",
    year: 1658,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg/387px-Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
    description: "test"
  },
  {
    id: 15,
    title: "Ludwig van Beethoven",
    artist: "Joseph Karl Stieler",
    year: 1820,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/330px-Beethoven.jpg",
    description: "Ludwig van Beethoven[n 1] (baptised 17 December 1770 – 26 March 1827) was a German composer and pianist. Beethoven remains one of the most admired composers in the history of Western music; his works rank amongst the most performed of the classical music repertoire and span the transition from the Classical period to the Romantic era in classical music. His career has conventionally been divided into early, middle, and late periods. His early period, during which he forged his craft, is typically considered to have lasted until 1802. From 1802 to around 1812, his middle period showed an individual development from the styles of Joseph Haydn and Wolfgang Amadeus Mozart, and is sometimes characterized as heroic. During this time, he began to grow increasingly deaf. In his late period, from 1812 to 1827, he extended his innovations in musical form and expression."
  },
  {
    id: 16,
    title: "Elizabeth Bowes-Lyon",
    artist: "Dorothy Wilding",
    year: 1937,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Queen_Elizabeth_the_Queen_Mother_portrait.jpg/330px-Queen_Elizabeth_the_Queen_Mother_portrait.jpg",
    description: "Elizabeth Bowes-Lyon (née Bowes; 4 August 1900 – 30 March 2002) was the wife of King George VI and the mother of Queen Elizabeth II. She was the last Empress consort of India and the first Queen consort of the United Kingdom of Great Britain and Northern Ireland and the British Dominions beyond the Seas. She was the longest-serving consort of a reigning British monarch, and the longest-lived British monarch's consort, until her death in 2002."
  },
]

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [images, setImages] = useState<any>([]);
  const [slideShowPlaying, setSlideShowPlaying] = useState(false);
  const [slideShowInterval, setSlideShowInterval] = useState(6000);
  const [slideShowIndex, setSlideShowIndex] = useState(0);

  if (!images) return <div>Loading...</div>

  const imageLength = images.length;
  const columnOneImages = images.slice(0, Math.ceil(imageLength / 4));
  const columnTwoImages = images.slice(
    Math.ceil(imageLength / 4),
    Math.ceil(imageLength / 2)
  );
  const columnThreeImages = images.slice(
    Math.ceil(imageLength / 2),
    Math.ceil((imageLength / 4) * 3)
  );
  const columnFourImages = images.slice(Math.ceil((imageLength / 4) * 3));

  const columns = [
    columnOneImages,
    columnTwoImages,
    columnThreeImages,
    columnFourImages,
  ];

  const combinedColumns = columns.reduce((acc, column) => {
    return acc.concat(column);
  }, []);

  const currentImage = combinedColumns[slideShowIndex];

  useEffect(() => {
    // scramble images
    const scrambledImages = rawImages.sort(() => Math.random() - 0.5);

    // set images
    setImages(scrambledImages);
  }, []);

  useEffect(() => {
    if (slideShowPlaying) {
      const interval = setInterval(() => {
        setSlideShowIndex((prevIndex) => {
          if (prevIndex === combinedColumns.length - 1) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        });
      }, slideShowInterval);

      return () => clearInterval(interval);
    }
  }, [slideShowPlaying, slideShowInterval]);

  const handleToggleSlideShow = () => {
    setSlideShowPlaying(!slideShowPlaying);
  };

  return (
    <div className="px-3 md:px-8 lg:px-10">
      <Head>
        <title>La Galeria</title>
        <meta name="description" content="art gallery website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex items-center justify-between flex-wrap py-4 lg:py-7 text-black border-b border-gray-200">
        {/* title */}
        <Link href="/" className="text-3xl font-black tracking-tighter">La Galeria</Link>

        {/* start slideshow */}
        <button className="text-gray-400 tracking-widest text-sm uppercase"
          onClick={handleToggleSlideShow}
        >
          {slideShowPlaying ? "Stop Slideshow" : "Start Slideshow"}
        </button>
      </nav>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      gap-3 py-3 md:gap-8 md:py-7 lg:gap-10 lg:py-10">
        {!slideShowPlaying &&
          <>
            {columns.map((column) => (
              <div className="flex flex-col gap-3 md:gap-8 lg:gap-10">
                {column.map((image: any) => (
                  <div key={image.id} className={`relative h-min
          hover:scale-105 transform transition duration-300
          flex flex-col items-center
          `}>
                    {/* adds a gradient to the bottom of the image to make the text more readable */}
                    <div className="absolute bottom-0 w-full left-0 h-1/3 bg-gradient-to-t from-gray-900"></div>

                    <Image src={image.image} alt={image.title}
                      width={800}
                      height={500}
                      loading="eager"
                      style={{ width: '100%', height: 'auto' }}
                    />

                    <div className="absolute bottom-0 left-0 p-4 lg:p-6">
                      <h3 className="text-white font-bold text-lg md:text-xl leading-snug tracking-wide">{image.title}</h3>
                      <p className="text-gray-300 text-xs md:text-sm">{image.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        }
      </main>
      {slideShowPlaying &&
        <SlideShowCard image={currentImage} />
      }
    </div>
  );
};

export default Home;


const SlideShowCard = ({ image }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 lg:gap-10
    // changes t
    ">
      {/* image */}
      <div className="relative">
        <Image src={image.image} alt={image.title}
          width={800}
          height={500}
          loading="eager"
          style={{ width: '100%', height: 'auto' }}
        />

        {/* corner at top right with title */}
        <div className="
        absolute bottom-0 right-0 
        md:top-0 md:bottom-auto
        pb-7 md:pb-14 pt-2 px-7 md:px-14
      bg-white text-center">
          <div>
            <h3 className="text-black font-bold text-lg md:text-4xl">{image.title}</h3>
            <p className="text-gray-700 text-xs md:text-sm">{image.artist}</p>
          </div>
        </div>
      </div>

      {/* text */}
      <div>
        {/* year */}
        <p className="text-gray-300/70 -mb-5 md:-mb-10 text-5xl md:text-9xl font-black text-right pr-4">{image.year}</p>
        <p>
          {image.description}
        </p>

      </div>
    </div>

  )
}

