import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "../ui/Button";
import VideoPreview from "../ui/VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;

  const nextVdRef = useRef(null);
  const heroContainerRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos >= totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // 🎬 Video click transition
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current?.play(),
        });

        gsap.from("#current-video", {
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  // 🎥 Scroll animation
  useGSAP(() => {
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div
      ref={heroContainerRef}
      className="relative h-screen w-full overflow-hidden bg-[#070b1a]"
    >
      {/* Loader */}
      {loading && (
        <div className="flex-center absolute z-[100] h-full w-full bg-[#070b1a]">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Video Frame */}
      <div
        id="video-frame"
        className="relative z-10 h-full w-full overflow-hidden bg-[#070b1a]"
      >
        {/* Mini Preview */}
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <VideoPreview>
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                id="current-video"
                className="size-64 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </VideoPreview>
        </div>

        {/* Next Video */}
        <video
          ref={nextVdRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          id="next-video"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* Background Video */}
        <video
          src={getVideoSrc(
            currentIndex === totalVideos - 1 ? 1 : currentIndex
          )}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoLoad}
        />

         <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          A<b>R</b>CADIA
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              O<b>W</b>ES
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Gaming World <br /> Unleash the Play Economy
            </p>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;