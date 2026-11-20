import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Clock, 
  Flame, 
  Star, 
  Award, 
  Check, 
  ThumbsUp, 
  MessageSquare,
  Sparkles,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';
import { DailyMessMenu, MessMeal } from '../../types';

interface MessMenuViewProps {
  weeklyMenu: DailyMessMenu[];
  onRateMeal?: (mealId: string, rating: number) => void;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const MessMenuView: React.FC<MessMenuViewProps> = ({
  weeklyMenu,
  onRateMeal,
}) => {
  const [selectedDay, setSelectedDay] = useState<typeof days[number]>('Thursday');
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<string, boolean>>({});
  const [selectedMealType, setSelectedMealType] = useState<'All' | 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner'>('All');

  const currentDayData = weeklyMenu.find(m => m.day === selectedDay) || weeklyMenu[3];

  const handleRate = (mealId: string, star: number) => {
    setUserRatings(prev => ({ ...prev, [mealId]: star }));
    if (onRateMeal) onRateMeal(mealId, star);
  };

  const handleFeedback = (mealId: string) => {
    setFeedbackSubmitted(prev => ({ ...prev, [mealId]: true }));
  };

  // Lunch chef special for featured card
  const featuredMeal = currentDayData.meals.Lunch;

  const mealSlots: Array<'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner'> = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
  const displayedMeals = selectedMealType === 'All' 
    ? mealSlots.map(type => currentDayData.meals[type]) 
    : [currentDayData.meals[selectedMealType]];

  return (
    <div className="space-y-7 pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
            <UtensilsCrossed size={14} />
            <span>Collegiate Dining Hall & Nutrition Guild</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172D29]">
            Daily Mess Curation & Menu
          </h2>
          <p className="text-xs sm:text-sm text-[#85877F] leading-relaxed">
            Freshly prepared artisanal menus served across central dining commons with wholesome vegetarian and Jain culinary options.
          </p>
        </div>

        {/* Meal Rating Metric */}
        <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#B99A6A]/30 min-w-[240px] text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block">
            Weekly Satisfaction Index
          </span>
          <div className="flex items-center justify-end space-x-2 mt-1">
            <span className="font-editorial text-3xl font-bold text-[#172D29]">4.72</span>
            <div className="flex text-[#B99A6A]">
              <Star size={16} fill="#B99A6A" />
              <Star size={16} fill="#B99A6A" />
              <Star size={16} fill="#B99A6A" />
              <Star size={16} fill="#B99A6A" />
              <Star size={16} fill="#B99A6A" />
            </div>
          </div>
          <span className="text-[11px] text-[#85877F]">Based on 1,480 verified student reviews</span>
        </div>
      </div>

      {/* 2. CHEF'S DAILY HIGHLIGHT SPECIAL BANNER */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#172D29] to-[#213B33] text-[#F0EBDD] border border-[#B99A6A]/35 shadow-academic-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
            <Award size={14} />
            <span>{selectedDay}'s Chef Signature • {featuredMeal.mealType}</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#FAF7EE]">
            {featuredMeal.specialBadge || "Executive Chef's Curation"}
          </h3>
          <p className="text-xs sm:text-sm text-[#D8CBB5]/90 leading-relaxed font-sans">
            {featuredMeal.items.join(' • ')}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#D8CBB5]/80">
            <span className="flex items-center space-x-1">
              <Clock size={13} className="text-[#B99A6A]" />
              <span>{featuredMeal.timeSlot}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Flame size={13} className="text-amber-400" />
              <span>{featuredMeal.calories} kcal ({featuredMeal.proteinGrams}g Protein)</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-end justify-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B99A6A] mb-1">
            Community Rating
          </span>
          <div className="flex items-center space-x-1.5 font-bold text-lg text-[#FAF7EE] bg-[#122421] px-3.5 py-1.5 rounded-xl border border-[#B99A6A]/30">
            <Star size={16} fill="#B99A6A" className="text-[#B99A6A]" />
            <span>{featuredMeal.rating.toFixed(1)} / 5.0</span>
            <span className="text-xs text-[#87988A] font-normal">({featuredMeal.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* 3. DAY SELECTOR & MEAL FILTER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Days Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto p-1.5 rounded-xl bg-[#FAF6ED] border border-[#D8CBB5]">
          {days.map((day) => {
            const isSelected = selectedDay === day;
            const isToday = day === 'Thursday';
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#172D29] text-[#FAF7EE] shadow-sm'
                    : 'text-[#292B28] hover:text-[#172D29] hover:bg-[#EAE2D1]'
                }`}
              >
                <span>{day}</span>
                {isToday && (
                  <span className={`ml-1.5 text-[9px] uppercase px-1.5 py-0.2 rounded font-extrabold ${
                    isSelected ? 'bg-[#B99A6A] text-[#172D29]' : 'bg-[#172D29] text-[#FAF7EE]'
                  }`}>
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Meal Type Filter */}
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {(['All', 'Breakfast', 'Lunch', 'Snacks', 'Dinner'] as const).map(type => (
            <button
              key={type}
              onClick={() => setSelectedMealType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                selectedMealType === type 
                  ? 'bg-[#172D29] text-[#FAF7EE] border-[#172D29]' 
                  : 'bg-[#FCFAF4] text-[#292B28] border-[#D8CBB5] hover:bg-[#EAE2D1]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MEAL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedMeals.map((meal) => {
          const userStar = userRatings[meal.id] || 0;
          const isFeedbackSent = feedbackSubmitted[meal.id];

          return (
            <div 
              key={meal.id}
              className="p-6 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic hover:border-[#B99A6A]/60 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block">
                      {meal.timeSlot}
                    </span>
                    <h4 className="font-editorial text-2xl font-bold text-[#172D29]">
                      {meal.mealType}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {meal.dietaryTags.map((tag, i) => (
                      <span 
                        key={i} 
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          tag === 'Chef Special' ? 'bg-[#B99A6A]/20 text-[#172D29] border-[#B99A6A]/40' :
                          tag === 'Jain Friendly' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                          'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Items List */}
                <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#D8CBB5]/80 my-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-2">
                    Catering Service Items
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#292B28]">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B99A6A]" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutrition info */}
                <div className="flex items-center justify-between text-xs text-[#85877F] px-1 py-2">
                  <span className="flex items-center space-x-1">
                    <Flame size={13} className="text-amber-500" />
                    <span>Est. {meal.calories} kcal</span>
                  </span>
                  <span>{meal.proteinGrams}g Quality Protein</span>
                </div>
              </div>

              {/* Interactive Rating & Review Section */}
              <div className="mt-4 pt-4 border-t border-[#D8CBB5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F] block mb-1">
                    Rate This Meal
                  </span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRate(meal.id, star)}
                        className="p-1 hover:scale-110 transition-transform"
                        title={`Rate ${star} Stars`}
                      >
                        <Star 
                          size={18} 
                          className={star <= (userStar || Math.round(meal.rating)) ? 'text-[#B99A6A]' : 'text-[#D8CBB5]'}
                          fill={star <= (userStar || Math.round(meal.rating)) ? '#B99A6A' : 'none'}
                        />
                      </button>
                    ))}
                    {userStar > 0 && (
                      <span className="text-xs font-bold text-[#172D29] ml-2">You: {userStar}★</span>
                    )}
                  </div>
                </div>

                <div>
                  {isFeedbackSent ? (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg inline-flex items-center space-x-1">
                      <Check size={14} />
                      <span>Feedback Logged</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleFeedback(meal.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF6ED] hover:bg-[#EAE2D1] border border-[#D8CBB5] text-xs font-bold text-[#172D29] transition-colors flex items-center space-x-1.5"
                    >
                      <ThumbsUp size={13} className="text-[#B99A6A]" />
                      <span>Compliment Kitchen</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
