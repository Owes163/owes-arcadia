import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

const images = Object.values(
  import.meta.glob("../assets/Gallery/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  })
);

const Gallery = () => {

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (preview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [preview]);

  return (
    <section className="min-h-screen bg-black text-white py-24 px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-20">
          Game <span className="text-purple-500">Gallery</span>
        </h1>

        {/* GALLERY GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {images.map((img, index) => (

            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-pointer"
            >

              {/* IMAGE */}
              <img
                src={img}
                alt="gallery"
                onClick={() => setPreview(img)}
                className="w-full h-[220px] object-cover transition duration-500 group-hover:scale-110"
              />

              {/* DOWNLOAD */}
              <a
                href={img}
                download
                className="absolute top-3 right-3 bg-black/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FiDownload size={18} />
              </a>

            </div>

          ))}

        </div>

      </div>

      {/* FULLSCREEN PREVIEW */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999]"
          onClick={() => setPreview(null)}
        >

          <img
            src={preview}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
          />

        </div>
      )}

    </section>
  );
};

export default Gallery;