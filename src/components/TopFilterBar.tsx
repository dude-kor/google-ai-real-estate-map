import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, Star, RefreshCw, SlidersHorizontal, 
  MapPin, Check, Code2, Database, ChevronRight, Layers, HelpCircle
} from 'lucide-react';
import { FilterState, PropertyType, TradeType } from '../types/realEstate';
import { SEOUL_REGIONS } from '../data/mockPublicData';
import { formatWonToKorean } from '../utils/formatters';

interface TopFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSelectRegion: (sido: string, sigungu: string, dong: string, lat: number, lng: number) => void;
  onOpenStreamlitModal: () => void;
  onOpenOpenDataModal: () => void;
  totalFilteredCount: number;
}

export const TopFilterBar: React.FC<TopFilterBarProps> = ({
  filters,
  onFilterChange,
  onSelectRegion,
  onOpenStreamlitModal,
  onOpenOpenDataModal,
  totalFilteredCount
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const currentRegion = SEOUL_REGIONS.find(r => r.sigungu === filters.sigungu) || SEOUL_REGIONS[0];

  return (
    <header 
      ref={containerRef}
      aria-label="필터 및 검색 도구"
      className="h-[56px] bg-white border-b border-slate-200 px-3 flex items-center justify-between text-xs font-medium z-30 relative select-none shadow-xs"
    >
      
      {/* Left items: Region selector & quick dong toggle */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Region Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('region')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-900 font-bold text-sm transition"
          >
            <Star className="w-3.5 h-3.5 text-slate-400 hover:text-amber-500 cursor-pointer" />
            <span>{filters.sigungu} {filters.dong}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {activeDropdown === 'region' && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                서울시 주요 구 / 동 선택
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {SEOUL_REGIONS.map((region) => (
                  <div key={region.sigungu} className="border-b border-slate-100 pb-2 last:border-b-0">
                    <div className="font-bold text-slate-900 mb-1">{region.sigungu}</div>
                    <div className="flex flex-wrap gap-1">
                      {region.dongs.map((d) => (
                        <button
                          key={d}
                          onClick={() => {
                            onSelectRegion(region.sido, region.sigungu, d, region.center.lat, region.center.lng);
                            setActiveDropdown(null);
                          }}
                          className={`px-2 py-1 rounded text-xs transition ${
                            filters.sigungu === region.sigungu && filters.dong === d
                              ? 'bg-blue-600 text-white font-bold'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Button: "양평동1가만 보기" (Directly as in screenshot) */}
        <button
          onClick={() => onFilterChange({ onlyThisDong: !filters.onlyThisDong })}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
            filters.onlyThisDong
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          {filters.dong}만 보기
        </button>
      </div>

      {/* Middle Filter Pills (Matches screenshot exactly) */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-2 scrollbar-none flex-1 max-w-[calc(100vw-540px)]">

        {/* 1. 전체 (All) */}
        <button
          onClick={() => onFilterChange({ selectedTradeType: '전체' })}
          className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
            filters.selectedTradeType === '전체'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          전체
        </button>

        {/* 2. 전세 (Active in screenshot) */}
        <button
          onClick={() => onFilterChange({ selectedTradeType: '전세' })}
          className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
            filters.selectedTradeType === '전세'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          전세
        </button>

        {/* 3. 매매 */}
        <button
          onClick={() => onFilterChange({ selectedTradeType: '매매' })}
          className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
            filters.selectedTradeType === '매매'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          매매
        </button>

        {/* 4. 월세 */}
        <button
          onClick={() => onFilterChange({ selectedTradeType: '월세' })}
          className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
            filters.selectedTradeType === '월세'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          월세
        </button>

        {/* 5. Property Type Dropdown: 아파트, 재건축, 아파트 분양권 ∨ */}
        <div className="relative shrink-0">
          <button
            onClick={() => toggleDropdown('propType')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
              filters.selectedPropertyTypes.length > 0
                ? 'bg-slate-900 text-white font-bold'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>
              {filters.selectedPropertyTypes.length > 2 
                ? '아파트, 재건축, 아파트 분양권' 
                : filters.selectedPropertyTypes.join(', ')}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activeDropdown === 'propType' && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 space-y-2">
              <div className="text-[11px] font-bold text-slate-400">매물 유형 다중선택</div>
              {(['아파트', '오피스텔', '재건축', '분양권', '빌라/연립', '원룸/투룸'] as PropertyType[]).map((type) => {
                const isSelected = filters.selectedPropertyTypes.includes(type);
                return (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer py-1 px-1 rounded hover:bg-slate-50 text-slate-700 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        const next = isSelected
                          ? filters.selectedPropertyTypes.filter(t => t !== type)
                          : [...filters.selectedPropertyTypes, type];
                        onFilterChange({ selectedPropertyTypes: next });
                      }}
                      className="rounded border-slate-300 text-slate-900 focus:ring-0"
                    />
                    <span>{type}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Price Range Dropdown: 보증금 ~4억 ∨ */}
        <div className="relative shrink-0">
          <button
            onClick={() => toggleDropdown('price')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
              filters.maxPriceWon > 0
                ? 'bg-slate-900 text-white font-bold'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>
              {filters.maxPriceWon > 0 
                ? `보증금 ~${formatWonToKorean(filters.maxPriceWon, true)}` 
                : '가격 전체'}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activeDropdown === 'price' && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">최대 금액 설정</span>
                <span className="text-blue-600 font-bold">
                  {filters.maxPriceWon === 0 ? '무제한' : formatWonToKorean(filters.maxPriceWon, false)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2000000000"
                step="50000000"
                value={filters.maxPriceWon}
                onChange={(e) => onFilterChange({ maxPriceWon: Number(e.target.value) })}
                className="w-full accent-slate-900"
              />
              <div className="grid grid-cols-4 gap-1 pt-1 text-[11px]">
                {[100000000, 200000000, 300000000, 400000000, 600000000, 1000000000, 1500000000, 0].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      onFilterChange({ maxPriceWon: val });
                      setActiveDropdown(null);
                    }}
                    className={`py-1 rounded text-center border transition ${
                      filters.maxPriceWon === val 
                        ? 'bg-slate-900 text-white border-slate-900 font-bold' 
                        : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {val === 0 ? '전체' : `~${formatWonToKorean(val, true)}`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 7. Exclusive Area: 전용 60m²~69m² ∨ */}
        <div className="relative shrink-0">
          <button
            onClick={() => toggleDropdown('area')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
              filters.minExclusiveAreaM2 > 0 || filters.maxExclusiveAreaM2 < 200
                ? 'bg-slate-900 text-white font-bold'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>
              {filters.isPyeongUnit
                ? `${Math.round(filters.minExclusiveAreaM2 * 0.3025)}~${Math.round(filters.maxExclusiveAreaM2 * 0.3025)}평`
                : `전용 ${filters.minExclusiveAreaM2}~${filters.maxExclusiveAreaM2}m²`}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activeDropdown === 'area' && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">전용 면적 설정</span>
                <button
                  onClick={() => onFilterChange({ isPyeongUnit: !filters.isPyeongUnit })}
                  className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  {filters.isPyeongUnit ? 'm²로 변경' : '평형으로 변경'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: '전체 면적', min: 0, max: 300 },
                  { label: '~33m² (10평 이하)', min: 0, max: 33 },
                  { label: '33~60m² (10~18평)', min: 33, max: 60 },
                  { label: '60~69m² (18~21평)', min: 60, max: 69 },
                  { label: '69~85m² (21~25평)', min: 69, max: 85 },
                  { label: '85m² 이상 (25평+)', min: 85, max: 300 }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onFilterChange({ minExclusiveAreaM2: item.min, maxExclusiveAreaM2: item.max });
                      setActiveDropdown(null);
                    }}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-left text-slate-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 8. 단지정보 ∨ */}
        <div className="relative shrink-0">
          <button
            onClick={() => toggleDropdown('complexInfo')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 border transition ${
              filters.minHouseholds > 0
                ? 'bg-slate-900 text-white font-bold border-slate-900'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{filters.minHouseholds > 0 ? `${filters.minHouseholds}세대↑` : '단지정보'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activeDropdown === 'complexInfo' && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 space-y-2">
              <div className="text-[11px] font-bold text-slate-400">최소 세대수</div>
              {[0, 100, 300, 500, 1000].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    onFilterChange({ minHouseholds: num });
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left py-1.5 px-2 rounded text-xs transition ${
                    filters.minHouseholds === num ? 'bg-slate-900 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {num === 0 ? '세대수 무관' : `${num}세대 이상`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 9. 역세권 ∨ */}
        <button
          onClick={() => onFilterChange({ nearSubwayOnly: !filters.nearSubwayOnly })}
          className={`px-3 py-1.5 rounded-lg border font-medium transition shrink-0 ${
            filters.nearSubwayOnly
              ? 'bg-slate-900 text-white font-bold border-slate-900'
              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          역세권 {filters.nearSubwayOnly ? '✓' : ''}
        </button>

      </div>

      {/* Right controls: Python Streamlit code, Open Data API, and Mode toggles */}
      <div className="flex items-center gap-2 shrink-0 pl-2">
        
        {/* Python Streamlit Framework Code Exporter Button */}
        <button
          onClick={onOpenStreamlitModal}
          className="px-3 py-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 hover:opacity-90 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs transition"
          title="요청하신 순수 Python Streamlit 코드 보기 & 다운로드"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Python Streamlit</span>
        </button>

        {/* Open Data Portal Settings */}
        <button
          onClick={onOpenOpenDataModal}
          className="px-2.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center gap-1.5 transition"
          title="국토교통부 공공데이터 연동 & CSV 내보내기"
        >
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">공공데이터</span>
        </button>

        {/* View Switches (매물 / 단지 - exactly as in screenshot top-right) */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => onFilterChange({ viewMode: 'listing' })}
            className={`px-3 py-1 rounded-md text-xs font-bold transition ${
              filters.viewMode === 'listing'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            매물
          </button>
          <button
            onClick={() => onFilterChange({ viewMode: 'complex' })}
            className={`px-3 py-1 rounded-md text-xs font-bold transition ${
              filters.viewMode === 'complex'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            단지
          </button>
        </div>

      </div>

    </header>
  );
};
