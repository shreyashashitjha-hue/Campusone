import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Plus, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Tag, 
  ShieldCheck, 
  HelpCircle,
  X
} from 'lucide-react';
import { LostFoundItem } from '../../types';

interface LostFoundViewProps {
  items: LostFoundItem[];
  onAddItem: (newItem: LostFoundItem) => void;
  onClaimItem: (itemId: string) => void;
}

export const LostFoundView: React.FC<LostFoundViewProps> = ({
  items,
  onAddItem,
  onClaimItem,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showReportModal, setShowReportModal] = useState(false);
  const [claimModalItem, setClaimModalItem] = useState<LostFoundItem | null>(null);
  const [claimVerificationText, setClaimVerificationText] = useState('');
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Form states for reporting
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');
  const [reportTitle, setReportTitle] = useState('');
  const [reportCategory, setReportCategory] = useState<LostFoundItem['category']>('Electronics');
  const [reportLocation, setReportLocation] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportContact, setReportContact] = useState('');
  const [reportEmail, setReportEmail] = useState('');

  // Filtering
  const filteredItems = items.filter(item => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim()) return;

    const newItem: LostFoundItem = {
      id: `lf-${Date.now()}`,
      type: reportType,
      title: reportTitle.trim(),
      category: reportCategory,
      location: reportLocation.trim() || 'Block 34 Complex',
      dateReported: 'Just now',
      description: reportDescription.trim() || 'Reported on CampusOne registry.',
      status: 'unclaimed',
      contactPerson: reportContact.trim() || 'Student Desk',
      contactEmail: reportEmail.trim() || 'student@campusone.edu'
    };

    onAddItem(newItem);
    setShowReportModal(false);
    // Reset form
    setReportTitle('');
    setReportDescription('');
    setReportLocation('');
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimModalItem) {
      onClaimItem(claimModalItem.id);
      setClaimSuccess(true);
      setTimeout(() => {
        setClaimSuccess(false);
        setClaimModalItem(null);
        setClaimVerificationText('');
      }, 1800);
    }
  };

  return (
    <div className="space-y-7 pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
            <Compass size={14} />
            <span>Campus Property Custody Registry</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172D29]">
            Lost & Found Noticeboard
          </h2>
          <p className="text-xs sm:text-sm text-[#85877F] leading-relaxed">
            Report misplaced textbooks, electronics, ID cards and belongings across Blocks 32, 34, 36 and Unipolis with verified handover logs.
          </p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE] text-xs font-bold transition-all flex items-center space-x-2 shadow-academic-dark"
        >
          <Plus size={16} className="text-[#B99A6A]" />
          <span>Report Lost or Found Item</span>
        </button>
      </div>

      {/* 2. TOOLBAR: SEARCH & TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-[#FAF6ED] border border-[#D8CBB5]">
          {(['all', 'lost', 'found'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-[#172D29] text-[#FAF7EE] shadow-sm'
                  : 'text-[#85877F] hover:text-[#172D29]'
              }`}
            >
              {tab === 'all' ? 'All Notices' : tab === 'lost' ? 'Lost Items' : 'Found Items'}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-2.5 text-[#85877F]" />
          <input
            type="text"
            placeholder="Search items, location (e.g. Block 34, Library)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FCFAF4] border border-[#D8CBB5] rounded-xl text-xs text-[#172D29] placeholder-[#85877F] focus:outline-none focus:ring-1 focus:ring-[#B99A6A]"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#FAF6ED] border border-[#D8CBB5] text-[#172D29] text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="IDs & Wallets">IDs & Wallets</option>
          <option value="Bags & Keys">Bags & Keys</option>
          <option value="Books & Stationery">Books & Stationery</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* 3. ITEMS GRID */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] text-[#85877F]">
          <Compass size={36} className="mx-auto mb-2 text-[#B99A6A]" />
          <h4 className="font-editorial text-lg font-bold text-[#172D29]">No Items Found</h4>
          <p className="text-xs mt-1">No reported property matches your active query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isLost = item.type === 'lost';
            const isClaimed = item.status === 'claimed';

            return (
              <div 
                key={item.id}
                className="p-5 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] hover:border-[#B99A6A]/70 shadow-sm flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isLost 
                        ? 'bg-rose-100 text-rose-900 border-rose-300' 
                        : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}>
                      {isLost ? 'Missing Item' : 'Found & Secured'}
                    </span>

                    <span className="text-[10px] text-[#85877F] font-mono">
                      {item.dateReported}
                    </span>
                  </div>

                  <h4 className="font-editorial text-lg font-bold text-[#172D29] leading-snug mt-1">
                    {item.title}
                  </h4>

                  <span className="inline-block text-[11px] font-semibold text-[#B99A6A] bg-[#FAF6ED] px-2 py-0.5 rounded border border-[#B99A6A]/30 mt-1">
                    {item.category}
                  </span>

                  <p className="text-xs text-[#292B28]/80 leading-relaxed mt-2.5 mb-3 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="space-y-1 text-xs text-[#85877F] pt-2 border-t border-[#D8CBB5]/60">
                    <div className="flex items-center space-x-1.5">
                      <MapPin size={12} className="text-[#172D29]" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Mail size={12} className="text-[#172D29]" />
                      <span className="truncate">{item.contactEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D8CBB5] flex items-center justify-between">
                  {isClaimed ? (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg inline-flex items-center space-x-1">
                      <CheckCircle2 size={13} />
                      <span>Returned to Owner</span>
                    </span>
                  ) : (
                    <>
                      <span className="text-[11px] text-[#85877F] font-semibold">
                        Status: <strong className="text-[#172D29]">Unclaimed</strong>
                      </span>

                      <button
                        onClick={() => setClaimModalItem(item)}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF6ED] hover:bg-[#EAE2D1] border border-[#B99A6A]/50 text-xs font-bold text-[#172D29] transition-colors"
                      >
                        {isLost ? 'Found this?' : 'Claim Item'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* REPORT ITEM MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-[#0E1D1A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCFAF4] border border-[#B99A6A]/40 rounded-2xl max-w-lg w-full p-6 shadow-academic-lg animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8CBB5]">
              <h3 className="font-editorial text-xl font-bold text-[#172D29]">
                Register Lost or Found Notice
              </h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="p-1 rounded text-[#85877F] hover:text-[#172D29]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                  Report Type
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setReportType('lost')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      reportType === 'lost' ? 'bg-rose-100 text-rose-900 border-rose-300' : 'bg-[#FAF6ED] text-[#85877F]'
                    }`}
                  >
                    I Lost Something
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('found')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      reportType === 'found' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-[#FAF6ED] text-[#85877F]'
                    }`}
                  >
                    I Found An Item
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leather Wallet with Student ID card"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full bg-[#FAF6ED] border border-[#D8CBB5] rounded-lg px-3 py-2 text-[#172D29] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                    Category
                  </label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value as LostFoundItem['category'])}
                    className="w-full bg-[#FAF6ED] border border-[#D8CBB5] rounded-lg px-3 py-2 text-[#172D29] focus:outline-none"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="IDs & Wallets">IDs & Wallets</option>
                    <option value="Bags & Keys">Bags & Keys</option>
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Block 34 • LH 302"
                    value={reportLocation}
                    onChange={(e) => setReportLocation(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-[#D8CBB5] rounded-lg px-3 py-2 text-[#172D29] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                  Detailed Description (Distinguishing Marks)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe scratches, color, stickers or contents for ownership verification..."
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  className="w-full bg-[#FAF6ED] border border-[#D8CBB5] rounded-lg px-3 py-2 text-[#172D29] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={reportContact}
                    onChange={(e) => setReportContact(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-[#D8CBB5] rounded-lg px-3 py-2 text-[#172D29] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                    University Email
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@campusone.edu"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-[#D8CBB5] rounded-lg px-3 py-2 text-[#172D29] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#D8CBB5]">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#85877F] hover:bg-[#EAE2D1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE] text-xs font-bold"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLAIM ITEM VERIFICATION MODAL */}
      {claimModalItem && (
        <div className="fixed inset-0 z-50 bg-[#0E1D1A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCFAF4] border border-[#B99A6A]/40 rounded-2xl max-w-md w-full p-6 shadow-academic-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8CBB5]">
              <h3 className="font-editorial text-lg font-bold text-[#172D29]">
                Ownership Claim Verification
              </h3>
              <button 
                onClick={() => setClaimModalItem(null)}
                className="p-1 rounded text-[#85877F] hover:text-[#172D29]"
              >
                <X size={18} />
              </button>
            </div>

            {claimSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 size={40} className="mx-auto text-emerald-600 animate-bounce" />
                <h4 className="font-editorial text-lg font-bold text-[#172D29]">Claim Dispatched & Logged!</h4>
                <p className="text-xs text-[#85877F]">
                  Notification sent to {claimModalItem.contactEmail}. You may collect the item at Security Post / Help Desk with valid student ID.
                </p>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-4 mt-4 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF6ED] border border-[#D8CBB5]">
                  <span className="text-[10px] uppercase font-bold text-[#85877F] block">Claiming:</span>
                  <span className="font-editorial text-base font-bold text-[#172D29]">{claimModalItem.title}</span>
                  <span className="text-[11px] text-[#85877F] block mt-0.5">{claimModalItem.location}</span>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                    Describe Distinctive Identifying Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide proof of ownership (e.g., serial number, wallpaper, contents inside)..."
                    value={claimVerificationText}
                    onChange={(e) => setClaimVerificationText(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-[#D8CBB5] rounded-lg px-3 py-2 text-[#172D29] focus:outline-none"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setClaimModalItem(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#85877F]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#B99A6A] hover:bg-[#CEB184] text-[#172D29] text-xs font-bold"
                  >
                    Submit Verification Claim
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
