import Link from 'next/link';

// Kita definisikan tipe datanya biar TypeScript tidak marah
type EventProps = {
  title: string;
  date: string; // String ISO dari Sanity
  location: string;
  address: string;
  mapsUrl: string;
};

// Komponen Kartu Kecil
function EventCard({ title, date, location, address, mapsUrl }: EventProps) {
  const eventDate = new Date(date);
  
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-3xl font-serif text-wedding-primary mb-2">{title}</h3>
      
      {/* Tampilan Tanggal & Jam */}
      <div className="bg-wedding-bg px-4 py-2 rounded-lg">
        <p className="font-bold text-gray-800">
          {eventDate.toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p className="text-wedding-secondary font-bold text-xl">
          {eventDate.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} WIB
        </p>
      </div>

      <div className="text-gray-600 mt-2">
        <p className="font-bold text-lg">{location}</p>
        <p className="text-sm max-w-[250px] mx-auto">{address}</p>
      </div>

      {mapsUrl && (
        <Link 
          href={mapsUrl} 
          target="_blank"
          className="mt-4 px-6 py-2 bg-wedding-primary text-white rounded-full text-sm hover:bg-opacity-90 transition"
        >
          Lihat Google Maps
        </Link>
      )}
    </div>
  );
}

export default function EventSection({ data }: { data: any }) {
  return (
    <section className="py-20 px-4 bg-wedding-bg">
      <h2 className="text-center text-4xl font-script text-wedding-secondary mb-12">
        Save The Date
      </h2>
      
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Kartu Akad */}
        <EventCard 
          title="Akad Nikah"
          date={data.waktuAkad}
          location={data.lokasiAkad}
          address={data.alamatAkad}
          mapsUrl={data.mapsAkad}
        />

        {/* Kartu Resepsi */}
        <EventCard 
          title="Resepsi"
          date={data.waktuResepsi}
          location={data.lokasiResepsi}
          address={data.alamatResepsi}
          mapsUrl={data.mapsResepsi}
        />
      </div>
    </section>
  );
}