import React, { useState } from 'react';
import { 
  MapPin, 
  Building, 
  Compass, 
  Users, 
  Clock, 
  Search, 
  Layers, 
  ExternalLink, 
  ShieldCheck, 
  Navigation,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CampusBlock } from '../../types';

interface CampusMapViewProps {
  blocks: CampusBlock[];
}

export const CampusMapView: React.FC<CampusMapViewProps> = ({
  blocks,
}) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string>('block-34');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || blocks[1];

  // Filtered rooms search
  const filteredBlocks = blocks.filter(b => {
    if (categoryFilter !== 'All' && b.category !== categoryFilter) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchesName = b.name.toLowerCase().includes(query) || b.number.toLowerCase().includes(query);
    const matchesRooms = b.keyRooms.some(r => r.name.toLowerCase().includes(query) || r.number.toLowerCase().includes(query));
    const matchesDepts = b.departments.some(d => d.toLowerCase().includes(query));
    return matchesName || matchesRooms || matchesDepts;
  });

  return (
    <div className="space-y-7 pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
            <Compass size={14} />
            <span>Collegiate Spatial Intelligence</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172D29]">
            Interactive Campus Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#85877F] leading-relaxed">
            Spatial directory of the four primary academic and cultural centers: Blocks 32, 34, 36 and the grand Unipolis Arena.
          </p>
        </div>

        {/* Live Active Block Badge */}
        <div className="p-4 rounded-xl bg-[#172D29] text-[#F0EBDD] border border-[#B99A6A]/30 min-w-[260px] flex items-center space-x-3.5 shadow-academic-dark">
          <div className="w-10 h-10 rounded-lg bg-[#213B33] border border-[#B99A6A]/40 flex items-center justify-center text-[#B99A6A]">
            <Building size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#87988A] block">Selected Landmark</span>
            <span className="font-editorial text-base font-bold text-[#FAF7EE] block">{selectedBlock.number}</span>
            <span className="text-[11px] text-[#D8CBB5]/80 truncate block">{selectedBlock.openHours}</span>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search size={16} className="absolute left-3.5 top-3 text-[#85877F]" />
          <input
            type="text"
            placeholder="Search blocks, rooms (e.g. LH 302, Systems Lab), or departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FCFAF4] border border-[#D8CBB5] rounded-xl text-xs text-[#172D29] placeholder-[#85877F] focus:outline-none focus:ring-1 focus:ring-[#B99A6A]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Academics & Labs', 'Lecture Complex', 'Research & Seminar', 'Auditorium & Events'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border ${
                categoryFilter === cat 
                  ? 'bg-[#172D29] text-[#FAF7EE] border-[#172D29]' 
                  : 'bg-[#FAF6ED] text-[#292B28] border-[#D8CBB5] hover:bg-[#EAE2D1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. INTERACTIVE MAP SCHEMATIC & DETAIL SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left: Custom SVG Vector Campus Map (Span 7) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#E8DFCF] p-4 sm:p-6 border border-[#D8CBB5] shadow-academic flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#172D29] flex items-center space-x-1.5">
              <Navigation size={14} className="text-[#B99A6A]" />
              <span>Campus Grounds Schematic Layout</span>
            </span>
            <span className="text-[10px] font-mono text-[#85877F] bg-[#FCFAF4] px-2 py-0.5 rounded border border-[#D8CBB5]">
              Scale 1 : 2500
            </span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#DDD3C0] border border-[#C5B79F] shadow-inner p-2">
            <svg 
              viewBox="0 0 800 600" 
              className="w-full h-full select-none"
            >
              <defs>
                {/* Grass / Lawn Pattern */}
                <pattern id="lawn" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#CBD4CD" opacity="0.4" />
                  <circle cx="2" cy="2" r="1" fill="#87988A" opacity="0.3" />
                </pattern>

                {/* Road styling */}
                <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#172D29" floodOpacity="0.1" />
                </filter>
              </defs>

              {/* Background Grounds */}
              <rect width="800" height="600" fill="#E6DDCF" />

              {/* Central Green Quad Lawns */}
              <path d="M 280 180 L 520 180 L 520 400 L 280 400 Z" fill="url(#lawn)" rx="16" />
              <text x="400" y="295" textAnchor="middle" fill="#87988A" fontSize="13" fontFamily="DM Serif Display" fontStyle="italic" letterSpacing="2">
                THE FOUNDER'S CENTRAL QUADRANGLE
              </text>

              {/* Paved Walkways and Roads */}
              {/* Horizontal Main Avenues */}
              <rect x="50" y="240" width="700" height="28" fill="#F0EBDD" rx="6" />
              <rect x="50" y="440" width="700" height="28" fill="#F0EBDD" rx="6" />

              {/* Vertical Corridors */}
              <rect x="180" y="80" width="24" height="440" fill="#F0EBDD" rx="6" />
              <rect x="388" y="80" width="24" height="440" fill="#F0EBDD" rx="6" />
              <rect x="596" y="80" width="24" height="440" fill="#F0EBDD" rx="6" />

              {/* Walkway Dashed Hairlines */}
              <line x1="60" y1="254" x2="740" y2="254" stroke="#B99A6A" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
              <line x1="60" y1="454" x2="740" y2="454" stroke="#B99A6A" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />

              {/* Campus Central Fountain */}
              <circle cx="400" cy="254" r="16" fill="#87988A" opacity="0.6" stroke="#172D29" strokeWidth="2" />
              <circle cx="400" cy="254" r="8" fill="#F0EBDD" />

              {/* BUILDING 1: BLOCK 32 (Computing Labs) */}
              <g 
                onClick={() => setSelectedBlockId('block-32')}
                className="cursor-pointer group"
              >
                <rect 
                  x="80" y="90" width="160" height="120" rx="8" 
                  fill={selectedBlockId === 'block-32' ? '#172D29' : '#213B33'}
                  stroke={selectedBlockId === 'block-32' ? '#B99A6A' : 'rgba(185, 154, 106, 0.4)'}
                  strokeWidth={selectedBlockId === 'block-32' ? 3 : 1.5}
                  className="transition-all"
                />
                <text x="160" y="140" textAnchor="middle" fill="#FAF7EE" fontSize="16" fontFamily="DM Serif Display" fontWeight="bold">
                  BLOCK 32
                </text>
                <text x="160" y="160" textAnchor="middle" fill="#B99A6A" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
                  COMPUTING LABS
                </text>
                {/* Status Indicator */}
                <circle cx="220" cy="110" r="5" fill="#EF4444" />
              </g>

              {/* BUILDING 2: BLOCK 34 (Lecture Complex) */}
              <g 
                onClick={() => setSelectedBlockId('block-34')}
                className="cursor-pointer group"
              >
                <rect 
                  x="300" y="70" width="200" height="140" rx="8" 
                  fill={selectedBlockId === 'block-34' ? '#172D29' : '#213B33'}
                  stroke={selectedBlockId === 'block-34' ? '#B99A6A' : 'rgba(185, 154, 106, 0.4)'}
                  strokeWidth={selectedBlockId === 'block-34' ? 3 : 1.5}
                  className="transition-all"
                />
                <text x="400" y="130" textAnchor="middle" fill="#FAF7EE" fontSize="18" fontFamily="DM Serif Display" fontWeight="bold">
                  BLOCK 34
                </text>
                <text x="400" y="152" textAnchor="middle" fill="#B99A6A" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
                  CENTRAL LECTURE HALLS
                </text>
                <circle cx="480" cy="90" r="5" fill="#10B981" />
              </g>

              {/* BUILDING 3: BLOCK 36 (Research & Senate) */}
              <g 
                onClick={() => setSelectedBlockId('block-36')}
                className="cursor-pointer group"
              >
                <rect 
                  x="560" y="90" width="160" height="120" rx="8" 
                  fill={selectedBlockId === 'block-36' ? '#172D29' : '#213B33'}
                  stroke={selectedBlockId === 'block-36' ? '#B99A6A' : 'rgba(185, 154, 106, 0.4)'}
                  strokeWidth={selectedBlockId === 'block-36' ? 3 : 1.5}
                  className="transition-all"
                />
                <text x="640" y="140" textAnchor="middle" fill="#FAF7EE" fontSize="16" fontFamily="DM Serif Display" fontWeight="bold">
                  BLOCK 36
                </text>
                <text x="640" y="160" textAnchor="middle" fill="#B99A6A" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
                  ADVANCED RESEARCH
                </text>
                <circle cx="700" cy="110" r="5" fill="#10B981" />
              </g>

              {/* BUILDING 4: UNIPOLIS ARENA & CULTURAL CENTER */}
              <g 
                onClick={() => setSelectedBlockId('unipolis')}
                className="cursor-pointer group"
              >
                {/* Curved Grand Amphitheater Footprint */}
                <path 
                  d="M 260 480 Q 400 440 540 480 L 520 570 Q 400 550 280 570 Z" 
                  fill={selectedBlockId === 'unipolis' ? '#172D29' : '#1C332D'}
                  stroke={selectedBlockId === 'unipolis' ? '#B99A6A' : 'rgba(185, 154, 106, 0.5)'}
                  strokeWidth={selectedBlockId === 'unipolis' ? 3 : 1.5}
                  className="transition-all"
                />
                <text x="400" y="515" textAnchor="middle" fill="#FAF7EE" fontSize="18" fontFamily="DM Serif Display" fontWeight="bold">
                  UNIPOLIS
                </text>
                <text x="400" y="534" textAnchor="middle" fill="#B99A6A" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1.5">
                  GRAND ARENA & CONVENTION
                </text>
                <circle cx="510" cy="495" r="5" fill="#F59E0B" />
              </g>

              {/* Secondary Landmarks */}
              {/* Central Library */}
              <rect x="80" y="320" width="80" height="80" rx="6" fill="#87988A" opacity="0.6" stroke="#213B33" strokeWidth="1" />
              <text x="120" y="365" textAnchor="middle" fill="#172D29" fontSize="9" fontFamily="sans-serif" fontWeight="bold">LIBRARY</text>

              {/* Dining Hall */}
              <rect x="640" y="320" width="80" height="80" rx="6" fill="#87988A" opacity="0.6" stroke="#213B33" strokeWidth="1" />
              <text x="680" y="365" textAnchor="middle" fill="#172D29" fontSize="9" fontFamily="sans-serif" fontWeight="bold">DINING</text>
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-[#85877F] pt-2 border-t border-[#D8CBB5]">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Available (&lt;65%)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Moderate</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>High Occupancy (&gt;80%)</span>
              </span>
            </div>
            <span>Click any building to inspect floors</span>
          </div>
        </div>

        {/* Right: Selected Block Deep Inspector Panel (Span 5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A6A]">
                  {selectedBlock.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  selectedBlock.crowdLevel === 'Low' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                  selectedBlock.crowdLevel === 'Moderate' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                  'bg-rose-100 text-rose-900 border-rose-300'
                }`}>
                  {selectedBlock.crowdLevel} Crowd ({selectedBlock.capacityPct}%)
                </span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-[#172D29]">
                {selectedBlock.number}: {selectedBlock.name}
              </h3>
              <p className="text-xs text-[#85877F] mt-1 leading-relaxed">
                {selectedBlock.subtitle}
              </p>
            </div>

            <p className="text-xs text-[#292B28]/90 leading-relaxed p-3 rounded-xl bg-[#FAF6ED] border border-[#D8CBB5]">
              {selectedBlock.description}
            </p>

            {/* Operating Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAF6ED] border border-[#D8CBB5]">
                <span className="text-[10px] uppercase font-bold text-[#85877F] block">Hours</span>
                <span className="font-bold text-[#172D29] mt-0.5 block">{selectedBlock.openHours}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF6ED] border border-[#D8CBB5]">
                <span className="text-[10px] uppercase font-bold text-[#85877F] block">Vertical Levels</span>
                <span className="font-bold text-[#172D29] mt-0.5 block">{selectedBlock.floors} Storeys</span>
              </div>
            </div>

            {/* Key Rooms & Floor Directory */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-2">
                Prominent Rooms & Amphitheaters
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {selectedBlock.keyRooms.map((room) => (
                  <div 
                    key={room.number}
                    className="p-2.5 rounded-lg bg-[#FAF6ED] border border-[#D8CBB5]/70 flex items-center justify-between text-xs hover:border-[#B99A6A] transition-colors"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#172D29] mr-2">{room.number}</span>
                      <span className="text-[#292B28]">{room.name}</span>
                    </div>
                    <span className="text-[10px] text-[#85877F] font-semibold">{room.floor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments Housed */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1.5">
                Departments Housed
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedBlock.departments.map((dept, i) => (
                  <span key={i} className="text-[11px] bg-[#EAE2D1] text-[#172D29] px-2.5 py-0.5 rounded-md font-medium">
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#D8CBB5] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#85877F]">
              Direct outdoor transit: &lt; 4 min walk
            </span>
            <button
              onClick={() => alert(`Directions calculated from Tagore Hall to ${selectedBlock.number}. Walk south through Founder's Quadrangle.`)}
              className="px-3.5 py-1.5 rounded-lg bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE] text-xs font-bold transition-colors flex items-center space-x-1"
            >
              <Navigation size={12} className="text-[#B99A6A]" />
              <span>Get Directions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
