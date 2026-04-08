interface ModelBannerProps {
  src: string;
  alt: string;
}

const ModelBanner = ({ src, alt }: ModelBannerProps) => {
  return (
    <section className="w-full">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block"
      />
    </section>
  );
};

export default ModelBanner;
