import Link from 'next/link';
import { MapPinIcon, ClockIcon, FloralCorner } from "@/components/Icons"; 
import Reveal from "@/components/Reveal"; // Import animasi

type EventProps = {
  title: string;
  date: string;
  location: string;
  address: string;
  mapsUrl: string;
};

function EventCard({ title, date, location, address, mapsUrl }: EventProps) {
  const eventDate = new Date(date);
  
  return (
    <div className="bg-white p-8 md:p-10 rounded-t-full rounded-b-[3rem] border border-wedding-secondary/20 shadow-lg flex flex-col items-center text-center gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
      
      {/* Efek Hiasan Hover */}
      <div className="absolute top-0 w-full h-2 bg-wedding-secondary/20 group-hover:bg-wedding-secondary transition-colors"></div>

      <h3 className="text-3xl font-serif text-wedding-primary tracking-wide mt-4">
        {title}
      </h3>
      
      <div className="border-y border-wedding-secondary/20 py-4 w-full">
        <p className="font-serif text-4xl text-wedding-primary">
          {eventDate.getDate()} {eventDate.toLocaleDateString("id-ID", { month: 'long' })}
        </p>
        <p className="font-sans text-sm tracking-[0.2em] uppercase mt-1 text-wedding-primary/60">
          {eventDate.getFullYear()}
        </p>
      </div>

      <div className="flex items-center gap-2 text-wedding-primary font-medium bg-wedding-bg px-5 py-2 rounded-full">
        <ClockIcon className="w-5 h-5 text-wedding-secondary" />
        <span>
            {eventDate.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} WIB
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex items-center gap-2 text-wedding-primary font-bold text-lg">
           <MapPinIcon className="w-6 h-6 text-wedding-secondary" />
           <span>{location}</span>
        </div>
        <p className="text-sm text-gray-500 max-w-[220px] mx-auto leading-relaxed">
          {address}
        </p>
      </div>

      {mapsUrl && (
        <Link 
          href={mapsUrl} 
          target="_blank"
          className="mt-4 px-8 py-3 bg-wedding-primary text-white rounded-full text-xs uppercase tracking-widest hover:bg-wedding-secondary transition-colors duration-300 shadow-md"
        >
          Google Maps
        </Link>
      )}
    </div>
  );
}

export default function EventSection({ data }: { data: any }) {
  return (
    <section className="py-24 px-4 bg-wedding-bg overflow-hidden">
      
      <Reveal>
        <div className="flex justify-center mb-6">
           <FloralCorner className="w-12 h-12 text-wedding-secondary/60 rotate-45" />
        </div>
        <h2 className="text-center text-3xl md:text-5xl font-script text-wedding-primary mb-16 drop-shadow-sm">
          Save The Date
        </h2>
      </Reveal>
      
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 px-4">
        {/* Kartu Akad (Muncul Duluan) */}
        <Reveal delay="delay-100">
          <EventCard 
            title="Akad Nikah"
            date={data.waktuAkad}
            location={data.lokasiAkad}
            address={data.alamatAkad}
            mapsUrl={data.mapsAkad}
          />
        </Reveal>

        {/* Kartu Resepsi (Muncul Belakangan) */}
        <Reveal delay="delay-300">
          <EventCard 
            title="Resepsi"
            date={data.waktuResepsi}
            location={data.lokasiResepsi}
            address={data.alamatResepsi}
            mapsUrl={data.mapsResepsi}
          />
        </Reveal>
      </div>
    </section>
  );
}