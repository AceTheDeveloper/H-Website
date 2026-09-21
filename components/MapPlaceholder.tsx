export default function MapPlaceholder() {
  return (
    <div className="relative aspect-[4/3] w-full border border-mist bg-mist/50 md:aspect-auto md:h-full md:min-h-[420px] overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d490.02650810027643!2d122.55218527323332!3d10.718120267085174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee500332f3631%3A0x995de7aff5704c77!2sH%20Breakfast%20to%20Bar!5e0!3m2!1sen!2sph!4v1789955516775!5m2!1sen!2sph"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
