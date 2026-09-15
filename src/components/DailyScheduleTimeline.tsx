import React, { useState } from 'react';
import { Sun, CloudSun, Sunset, Moon, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { MedicineDetail } from '../types';

interface DailyScheduleTimelineProps {
  medicines: MedicineDetail[];
  scheduleSummary: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    bedtime: string[];
    asNeeded: string[];
  };
}

export const DailyScheduleTimeline: React.FC<DailyScheduleTimelineProps> = ({
  medicines = [],
  scheduleSummary = {
    morning: [],
    afternoon: [],
    evening: [],
    bedtime: [],
    asNeeded: [],
  },
}) => {
  // Let user toggle checkmarks for today's doses as an interactive routine aid
  const [takenDoses, setTakenDoses] = useState<Record<string, boolean>>({});

  const toggleDose = (key: string) => {
    setTakenDoses((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const safeSummary = {
    morning: Array.isArray(scheduleSummary?.morning) ? scheduleSummary.morning : [],
    afternoon: Array.isArray(scheduleSummary?.afternoon) ? scheduleSummary.afternoon : [],
    evening: Array.isArray(scheduleSummary?.evening) ? scheduleSummary.evening : [],
    bedtime: Array.isArray(scheduleSummary?.bedtime) ? scheduleSummary.bedtime : [],
    asNeeded: Array.isArray(scheduleSummary?.asNeeded) ? scheduleSummary.asNeeded : [],
  };

  const safeMedicines = Array.isArray(medicines) ? medicines : [];

  const timeSlots = [
    {
      id: 'morning',
      title: 'Morning',
      timeRange: '7:00 AM – 9:00 AM',
      icon: Sun,
      color: 'amber',
      bgHeader: 'bg-amber-500/10 text-amber-900 border-amber-200',
      iconColor: 'text-amber-600',
      items: safeSummary.morning,
      medicinesList: safeMedicines.filter((m) => m?.scheduleTimes?.morning),
    },
    {
      id: 'afternoon',
      title: 'Afternoon',
      timeRange: '12:00 PM – 2:00 PM',
      icon: CloudSun,
      color: 'sky',
      bgHeader: 'bg-sky-500/10 text-sky-900 border-sky-200',
      iconColor: 'text-sky-600',
      items: safeSummary.afternoon,
      medicinesList: safeMedicines.filter((m) => m?.scheduleTimes?.afternoon),
    },
    {
      id: 'evening',
      title: 'Evening / Dinner',
      timeRange: '6:00 PM – 8:00 PM',
      icon: Sunset,
      color: 'indigo',
      bgHeader: 'bg-indigo-500/10 text-indigo-900 border-indigo-200',
      iconColor: 'text-indigo-600',
      items: safeSummary.evening,
      medicinesList: safeMedicines.filter((m) => m?.scheduleTimes?.evening),
    },
    {
      id: 'bedtime',
      title: 'Bedtime',
      timeRange: '9:30 PM – 11:00 PM',
      icon: Moon,
      color: 'purple',
      bgHeader: 'bg-purple-500/10 text-purple-900 border-purple-200',
      iconColor: 'text-purple-600',
      items: safeSummary.bedtime,
      medicinesList: safeMedicines.filter((m) => m?.scheduleTimes?.bedtime),
    },
    {
      id: 'asNeeded',
      title: 'As Needed (SOS / PRN)',
      timeRange: 'Only when symptoms appear',
      icon: AlertCircle,
      color: 'rose',
      bgHeader: 'bg-rose-500/10 text-rose-900 border-rose-200',
      iconColor: 'text-rose-600',
      items: safeSummary.asNeeded,
      medicinesList: safeMedicines.filter((m) => m?.scheduleTimes?.asNeeded),
    },
  ];

  return (
    <div id="daily-schedule-timeline" className="bg-white rounded-3xl border-2 border-indigo-500/40 shadow-sm overflow-hidden">
      {/* Box Header Banner with Violet & Sunset Clock Routine Theme */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-5 sm:p-7 md:p-8 relative overflow-hidden">
        {/* Subtle diurnal sun & moon orbit glow artwork */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <svg
          className="absolute right-6 top-1/2 -translate-y-1/2 w-48 h-32 text-purple-400/10 pointer-events-none hidden sm:block"
          viewBox="0 0 160 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="80" cy="60" r="45" strokeDasharray="3 3" />
          <circle cx="80" cy="60" r="3" fill="currentColor" />
          <line x1="80" y1="60" x2="80" y2="30" strokeLinecap="round" />
          <line x1="80" y1="60" x2="105" y2="60" strokeLinecap="round" />
          <circle cx="125" cy="60" r="8" fill="currentColor" opacity="0.3" />
          <circle cx="35" cy="60" r="8" fill="currentColor" opacity="0.3" />
        </svg>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2.5 border border-purple-400/30 backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Medication Routine Timeline</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Daily Dosage Schedule
            </h3>
            <p className="text-xs sm:text-sm text-purple-100/80 mt-1 max-w-2xl leading-relaxed">
              Step-by-step chronologically mapped routine from morning to night to ensure zero missed doses and strict meal adherence.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7 md:p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timeSlots.map((slot) => {
          const Icon = slot.icon;
          const hasMeds = (slot.items?.length || 0) > 0 || (slot.medicinesList?.length || 0) > 0;

          return (
            <div
              key={slot.id}
              className={`rounded-xl border p-4.5 flex flex-col justify-between transition-all ${
                hasMeds
                  ? 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  : 'bg-slate-50/20 border-slate-200/50 opacity-60'
              }`}
            >
              <div>
                {/* Slot Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${slot.bgHeader}`}
                    >
                      <Icon className={`w-4 h-4 ${slot.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{slot.title}</h4>
                      <span className="text-[10px] text-slate-400 block">{slot.timeRange}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      hasMeds ? 'bg-white border border-slate-200 text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {slot.medicinesList.length} med{slot.medicinesList.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Medications in this slot */}
                {hasMeds ? (
                  <div className="space-y-2 mt-2">
                    {slot.medicinesList.map((med, mIdx) => {
                      const doseKey = `${slot.id}-${med.name}`;
                      const isTaken = takenDoses[doseKey];

                      return (
                        <div
                          key={mIdx}
                          onClick={() => toggleDose(doseKey)}
                          className={`p-2.5 rounded-lg border text-xs cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                            isTaken
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                              : 'bg-white border-slate-200/80 hover:border-emerald-300 text-slate-800'
                          }`}
                        >
                          <button
                            type="button"
                            className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                              isTaken
                                ? 'bg-emerald-600 text-white'
                                : 'border border-slate-300 text-transparent hover:border-emerald-500'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`font-bold truncate ${
                                  isTaken ? 'line-through text-emerald-800/70' : 'text-slate-900'
                                }`}
                              >
                                {med.name}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 shrink-0 font-medium">
                                {med.dosage}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {med.mealRelationText || med.genericName}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No medications scheduled for this time slot.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};
