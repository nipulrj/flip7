import { Icon, Heart, Zap, CircleFadingPlus } from 'lucide-react';

export function GameCard({ value, text, color, special, add, back }) {
  const colorStyles = {
    green: 'border-green-400 text-green-700',
    yellow: 'border-yellow-400 text-yellow-700',
    orange: 'border-orange-400 text-orange-700',
    purple: 'border-purple-400 text-purple-700',
    red: 'border-red-400 text-red-700',
    blue: 'border-sky-400 text-sky-700',
  }[color] || 'border-gray-300 text-gray-700';

  const cardBackground = back
    ? 'bg-gradient-to-br from-sky-200 via-sky-400 to-sky-600'
    : 'bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200';

  const iconColor = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
    red: 'text-red-400',
    blue: 'text-sky-400',
  }[color] || 'text-gray-400';

  const numberCard = !special && !add;

    const specialIcons = {
        "Flip Three": Zap,
        "Freeze": Zap,
        "Second Chance": Heart,
    };
    
    let i = null;
    if(special) { i = specialIcons[special]; }
    if(add) { i = CircleFadingPlus }
    const Icon = i ? i : null;


  return (
    <div
      className={`relative w-32 h-48 rounded-2xl border-4 ${colorStyles} flex flex-col items-center justify-center shadow-md ${cardBackground}`}
      style={{
        clipPath:
          'polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)',
      }}
    >
      <div className="absolute w-5 h-5 bg-amber-50 rounded-full -top-2 left-1/2 -translate-x-1/2 border border-gray-300"></div>
      <div className="absolute w-5 h-5 bg-amber-50 rounded-full -bottom-2 left-1/2 -translate-x-1/2 border border-gray-300"></div>
      <div className="absolute w-5 h-5 bg-amber-50 rounded-full top-1/2 -translate-y-1/2 -left-2 border border-gray-300"></div>
      <div className="absolute w-5 h-5 bg-amber-50 rounded-full top-1/2 -translate-y-1/2 -right-2 border border-gray-300"></div>

      {!back && (special || add) && (
        <>
          <Icon className={`absolute top-2 left-2 w-4 h-4 opacity-60 ${iconColor}`} />
          <Icon className={`absolute bottom-2 right-2 w-4 h-4 opacity-60 ${iconColor}`} />
        </>
      )}

      {!back && !special && (
        <>
          <div className="text-5xl font-extrabold mb-2 drop-shadow-sm">{value}</div>
          <div className="uppercase text-sm tracking-wide font-semibold">{text}</div>
        </>
      )}

      {!back && special && (
        <div className="text-center px-3">
          <div className="text-3xl font-extrabold mb-1">{special}</div>
          <div className="text-xs uppercase tracking-wide opacity-70">Action Card</div>
        </div>
      )}

      {!back && add && (
        <div className="text-center px-3">
          <div className="text-3xl font-extrabold mb-1">{add}</div>
          <div className="text-xs uppercase tracking-wide opacity-70">Add Card</div>
        </div>
      )}

      {back && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center font-bold">
          <div className="text-4xl mb-1">FLIP</div>
          <div className="text-2xl">7</div>
        </div>
      )}

      <div className="absolute inset-0 border-[3px] border-white rounded-2xl pointer-events-none opacity-30"></div>
    </div>
  );
}
