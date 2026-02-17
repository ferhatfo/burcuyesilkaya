import Image from 'next/image';

export default function MultiPageHeader({ subtitle, title, isImage, imgUrl, isMap }) {
  return (
    <section className="relative from-[#f5f5f5] py-8 md:py-12 bg-[#7900C6] rounded-b-[30px]">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-full">
          <h6 className="text-sm md:text-base font-medium text-white mb-2 md:mb-3 break-words">
            {subtitle}
          </h6>
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-[32px] text-white font-bold leading-tight break-words">
            {title}
          </h2>
        </div>
        {
          isImage && (
            <div className="relative mt-6 md:mt-0 md:absolute md:right-0 max-w-full md:max-w-[400px] lg:max-w-[500px]">
              <Image
                src={imgUrl}
                alt={title}
                className="object-cover max-h-[350px] md:max-h-[400px] lg:max-h-[500px] w-full"
                width={487}
                height={731}
                priority
              />
            </div>
          )
        }
        {
          isMap && (
            <div className='relative mt-6 md:mt-0 md:absolute md:top-1/2 md:right-0 w-full md:w-auto min-w-0 md:min-w-[300px] lg:min-w-[400px] xl:min-w-[500px]'>
              <div className="aspect-video md:aspect-auto md:h-[300px] lg:h-[400px]">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.844961209441!2d30.712854475624127!3d36.89405706240356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c385ad2cd2a333%3A0x659df6f9321048b0!2sDermatolog%20Dr.%20Burcu%20Ye%C5%9Filkaya!5e0!3m2!1str!2str!4v1771191599181!5m2!1str!2str" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          )
        }
      </div>
    </section>
  );
}