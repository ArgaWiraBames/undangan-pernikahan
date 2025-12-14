'use client'
import { useState } from "react";

function BankCard({ bank, number, name }: { bank: string, number: string, name: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!number) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-wedding-secondary/20 flex flex-col items-center gap-3 w-full max-w-xs">
      <p className="font-bold text-xl text-wedding-primary uppercase">{bank}</p>
      <div className="text-center">
        <p className="text-gray-500 text-sm">No. Rekening:</p>
        <p className="font-mono text-lg font-bold text-gray-800 tracking-wider my-1">{number}</p>
        <p className="text-sm text-gray-600">a.n {name}</p>
      </div>
      <button 
        onClick={handleCopy}
        className="text-xs bg-wedding-bg text-wedding-primary px-4 py-2 rounded-full font-bold hover:bg-wedding-secondary hover:text-white transition-colors"
      >
        {copied ? "Berhasil Disalin!" : "Salin No. Rek"}
      </button>
    </div>
  );
}

export default function GiftSection({ data }: { data: any }) {
  return (
    <section className="py-20 px-6 bg-wedding-bg text-center">
      <h2 className="font-serif text-3xl text-wedding-primary mb-2">Wedding Gift</h2>
      <p className="text-sm text-gray-600 mb-10 max-w-md mx-auto">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <BankCard bank={data.bank1} number={data.norek1} name={data.atasnama1} />
        <BankCard bank={data.bank2} number={data.norek2} name={data.atasnama2} />
      </div>

      {data.alamatKado && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-sm max-w-md mx-auto">
          <p className="font-bold text-wedding-primary mb-2">Kirim Kado Fisik:</p>
          <p className="text-gray-600 text-sm leading-relaxed">{data.alamatKado}</p>
        </div>
      )}
    </section>
  );
}