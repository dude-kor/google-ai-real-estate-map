import React, { useState } from 'react';
import { 
  X, Bell, Star, Share2, Phone, Building2, MapPin, 
  Calendar, CheckCircle, ChevronDown, RefreshCw, 
  Info, TrendingUp, Users, School, Car, Flame, ExternalLink, MessageSquare
} from 'lucide-react';
import { Complex, TradeType } from '../types/realEstate';
import { formatWonToKorean, formatArea } from '../utils/formatters';

interface ComplexDetailDrawerProps {
  complex: Complex | null;
  onClose: () => void;
  isPyeong: boolean;
  onTogglePyeong: () => void;
  onOpenRoadview: () => void;
}

export const ComplexDetailDrawer: React.FC<ComplexDetailDrawerProps> = ({
  complex,
  onClose,
  isPyeong,
  onTogglePyeong,
  onOpenRoadview
}) => {
  const [activeTab, setActiveTab] = useState<'시세' | '매물' | '단지정보' | '중개사' | '이야기'>('시세');
  const [selectedTradeMode, setSelectedTradeMode] = useState<TradeType>('매매');
  const [selectedUnitIdx, setSelectedUnitIdx] = useState(0);
  const [chartPeriod, setChartPeriod] = useState<'1년' | '3년' | '5년' | '7년'>('1년');
  const [isStarred, setIsStarred] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

  if (!complex) return null;

  const currentUnit = complex.units[selectedUnitIdx] || complex.units[0];

  return (
    <aside 
      aria-label="단지 상세정보"
      className="w-[420px] max-w-[95vw] h-full bg-white border-r border-slate-200 flex flex-col z-20 shadow-xl overflow-hidden select-text"
    >
      
      {/* 1. Header Bar with Complex Name & Close */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {complex.name}
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">

        {/* 2. Broker Advertisement Banner (Exactly as in screenshot) */}
        {complex.featuredBroker && (
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center gap-3">
            <img
              src={complex.featuredBroker.avatarUrl}
              alt={complex.featuredBroker.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900 truncate">
                  {complex.featuredBroker.agencyName}
                </span>
                <span className="text-[10px] text-slate-400 border border-slate-200 px-1 rounded">광고 ⓘ</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 truncate">
                {complex.featuredBroker.description}
              </p>
            </div>
            <a
              href={`tel:${complex.featuredBroker.phone}`}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition shrink-0"
              title="전화 문의"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* 3. Complex Main Overview */}
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {complex.name}
              </h1>
              <div className="text-xs text-slate-600 mt-1 font-medium flex items-center flex-wrap gap-x-2 gap-y-1">
                <span>{complex.propertyType}</span>
                <span className="text-slate-300">|</span>
                <span>{complex.households}세대</span>
                <span className="text-slate-300">|</span>
                <span>{complex.builtYearMonth} ({complex.ageYears}년차)</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span>용적률 {complex.floorAreaRatio}%</span>
                <span className="text-slate-300">|</span>
                <span>건폐율 {complex.buildingCoverage}%</span>
              </div>
            </div>

            {/* Notification / Star / Share */}
            <div className="flex items-center gap-2 text-slate-400">
              <button
                onClick={() => setIsNotified(!isNotified)}
                className={`p-1.5 rounded-full hover:bg-slate-100 transition ${isNotified ? 'text-blue-600 bg-blue-50' : ''}`}
                title="알림 받기"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsStarred(!isStarred)}
                className={`p-1.5 rounded-full hover:bg-slate-100 transition ${isStarred ? 'text-amber-500 fill-amber-500 bg-amber-50' : ''}`}
                title="관심 단지 등록"
              >
                <Star className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('단지 링크가 복사되었습니다.');
                }}
                className="p-1.5 rounded-full hover:bg-slate-100 transition"
                title="공유하기"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 4. Trade Type Counters (매매 2, 전세 1, 월세 0, 단기 0) */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <button
              onClick={() => {
                setActiveTab('매물');
                setSelectedTradeMode('매매');
              }}
              className="py-2 px-1 text-center border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 rounded-lg transition"
            >
              <div className="text-xs text-slate-600">매매</div>
              <div className="text-sm font-bold text-blue-600">{complex.counts.sale}</div>
            </button>
            <button
              onClick={() => {
                setActiveTab('매물');
                setSelectedTradeMode('전세');
              }}
              className="py-2 px-1 text-center border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 rounded-lg transition"
            >
              <div className="text-xs text-slate-600">전세</div>
              <div className="text-sm font-bold text-emerald-600">{complex.counts.jeonse}</div>
            </button>
            <button
              onClick={() => {
                setActiveTab('매물');
                setSelectedTradeMode('월세');
              }}
              className="py-2 px-1 text-center border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
            >
              <div className="text-xs text-slate-500">월세</div>
              <div className="text-sm font-bold text-slate-700">{complex.counts.monthly}</div>
            </button>
            <button
              onClick={() => {
                setActiveTab('매물');
                setSelectedTradeMode('단기');
              }}
              className="py-2 px-1 text-center border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
            >
              <div className="text-xs text-slate-500">단기</div>
              <div className="text-sm font-bold text-slate-700">{complex.counts.short}</div>
            </button>
          </div>
        </div>

        {/* 5. Main Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white sticky top-[53px] z-10 px-4">
          {(['시세', '매물', '단지정보', '중개사', '이야기'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 text-center transition ${
                activeTab === tab
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: 시세 (Market Price & Real Transactions) */}
        {activeTab === '시세' && (
          <div className="p-5 space-y-6">
            
            {/* Filter pills: 매매 dropdown, area dropdown, pyeong conversion */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={selectedTradeMode}
                  onChange={(e) => setSelectedTradeMode(e.target.value as TradeType)}
                  className="appearance-none bg-slate-900 text-white font-medium text-xs px-3 py-2 pr-7 rounded-lg cursor-pointer hover:bg-slate-800"
                >
                  <option value="매매">매매</option>
                  <option value="전세">전세</option>
                  <option value="월세">월세</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white/70 absolute right-2 top-2.5 pointer-events-none" />
              </div>

              <div className="relative flex-1">
                <select
                  value={selectedUnitIdx}
                  onChange={(e) => setSelectedUnitIdx(Number(e.target.value))}
                  className="appearance-none w-full bg-slate-900 text-white font-medium text-xs px-3 py-2 pr-7 rounded-lg cursor-pointer hover:bg-slate-800 truncate"
                >
                  {complex.units.map((unit, idx) => (
                    <option key={unit.id} value={idx}>
                      {isPyeong ? `${unit.exclusivePyeong}평` : unit.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white/70 absolute right-2 top-2.5 pointer-events-none" />
              </div>

              <button
                onClick={onTogglePyeong}
                className="px-2.5 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {isPyeong ? 'm²' : '평'}
              </button>
            </div>

            {/* Price section with duration toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-800">시세</span>
                <span className="text-xs text-slate-500">동일면적 {selectedTradeMode}</span>
              </div>

              {/* Time Range Pills: 1년, 3년, 5년, 7년 */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                {(['1년', '3년', '5년', '7년'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                      chartPeriod === period
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              {/* Price Chart Preview or Notice */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="h-32 flex items-end gap-2 pt-4 px-2">
                  {complex.marketPriceTrends.map((t, i) => {
                    const price = selectedTradeMode === '매매' ? t.avgSalePrice : t.avgJeonsePrice;
                    const maxP = Math.max(...complex.marketPriceTrends.map(x => selectedTradeMode === '매매' ? x.avgSalePrice : x.avgJeonsePrice));
                    const heightPercent = Math.max(20, Math.round((price / maxP) * 100));

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div 
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-blue-500 hover:bg-blue-600 rounded-t transition-all group-hover:shadow-md cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 group-hover:text-slate-700">
                          {t.quarter}
                        </span>
                        
                        {/* Hover Tooltip */}
                        <div className="absolute -top-9 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20">
                          {formatWonToKorean(price, true)} ({t.volume}건)
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-200/80 text-center">
                  <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>최근 실거래가 기반 시장 평균 추정치</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 실거래가 (Real Transaction Section - Exact replica of screenshot table) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">실거래가</h3>
                <span className="text-xs text-slate-500">동일면적 {selectedTradeMode}</span>
              </div>

              {/* Group By Year */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-2">2021년 계약</div>
                  
                  {/* Table Header */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2 px-3">계약일</th>
                          <th className="py-2 px-2 text-center">등기일</th>
                          <th className="py-2 px-3 text-center">층</th>
                          <th className="py-2 px-3 text-right">가격</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {complex.historicalTransactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-2.5 px-3 font-mono text-slate-700">
                              {tx.contractDate}
                            </td>
                            <td className="py-2.5 px-2 text-center text-slate-400 font-mono">
                              {tx.registrationDate || '-'}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-700">
                              {tx.floor}층
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <div className="flex items-center justify-end gap-1 font-bold text-slate-900">
                                {tx.isHighest && (
                                  <span className="text-[10px] font-medium text-red-500 bg-red-50 px-1 py-0.2 rounded border border-red-200">
                                    최고
                                  </span>
                                )}
                                {tx.isLowest && (
                                  <span className="text-[10px] font-medium text-blue-500 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                                    최저
                                  </span>
                                )}
                                <span>{formatWonToKorean(tx.priceWon, false)}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Information Callout */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    국토교통부 부동산 실거래가 공개시스템(RTMS) 공공데이터와 매일 실시간 동기화되는 공인 실거래 자료입니다.
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: 매물 (Active Listings) */}
        {activeTab === '매물' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>총 <strong>{complex.listings.length}개</strong>의 확인된 매물</span>
              <button 
                onClick={onOpenRoadview}
                className="text-blue-600 font-medium hover:underline flex items-center gap-1"
              >
                단지 현장 거리뷰 보기
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {complex.listings.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-slate-200 hover:border-blue-400 rounded-xl bg-white shadow-xs transition space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                          item.tradeType === '전세' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.tradeType}
                        </span>
                        <span className="text-base font-extrabold text-slate-900">
                          {formatWonToKorean(item.priceWon, false)}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center flex-wrap gap-x-2 gap-y-0.5">
                    <span>{item.floor}/{item.totalFloors}층</span>
                    <span className="text-slate-300">·</span>
                    <span>{formatArea(item.exclusiveAreaM2, isPyeong)}</span>
                    <span className="text-slate-300">·</span>
                    <span>{item.direction}</span>
                    <span className="text-slate-300">·</span>
                    <span>관리비 {item.maintenanceFee}만</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.features.map((feat, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        #{feat}
                      </span>
                    ))}
                  </div>

                  {/* Broker action */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{item.brokerAgency}</span>
                    <a
                      href={`tel:${item.brokerPhone}`}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-1 transition"
                    >
                      <Phone className="w-3 h-3" />
                      문의하기
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 단지정보 (Complex Specs) */}
        {activeTab === '단지정보' && (
          <div className="p-5 space-y-5 text-xs text-slate-700">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">건물 및 단지 정보</h4>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">총 세대수</span>
                  <span className="font-semibold text-slate-900">{complex.households}세대</span>
                </div>
                <div>
                  <span className="text-slate-400 block">사용승인일</span>
                  <span className="font-semibold text-slate-900">{complex.builtYearMonth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">용적률 / 건폐율</span>
                  <span className="font-semibold text-slate-900">{complex.floorAreaRatio}% / {complex.buildingCoverage}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block">주차대수</span>
                  <span className="font-semibold text-slate-900">세대당 {complex.parkingPerHousehold}대</span>
                </div>
                <div>
                  <span className="text-slate-400 block">난방 방식</span>
                  <span className="font-semibold text-slate-900">{complex.heatingType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">건설사</span>
                  <span className="font-semibold text-slate-900">{complex.builder}</span>
                </div>
              </div>
            </div>

            {/* School & Subway */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">교통 및 학군 정보</h4>
              
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-amber-600" />
                  배정 초등학교
                </div>
                <div className="text-slate-600">
                  {complex.schoolInfo.name} ({complex.schoolInfo.type}) · 도보 {complex.schoolInfo.walkMinutes}분
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  인근 지하철역
                </div>
                <div className="space-y-1">
                  {complex.subwayStations.map((st, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-600">
                      <span>{st.line} {st.name}</span>
                      <span className="font-semibold text-slate-800">도보 {st.distanceMinutes}분</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-slate-400 block mb-1">도로명 주소</div>
              <div className="font-medium text-slate-800">{complex.address}</div>
            </div>

          </div>
        )}

        {/* TAB 4: 중개사 (Brokers) */}
        {activeTab === '중개사' && (
          <div className="p-5 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">단지 전담 및 인근 공인중개사사무소</h4>
            
            <div className="p-4 border border-blue-200 bg-blue-50/40 rounded-xl space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={complex.featuredBroker.avatarUrl}
                  alt={complex.featuredBroker.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900">{complex.featuredBroker.agencyName}</div>
                  <div className="text-xs text-slate-600 mt-0.5">대표: {complex.featuredBroker.repName}</div>
                  <div className="text-xs text-blue-600 font-semibold">{complex.featuredBroker.phone}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                "{complex.featuredBroker.description}"
              </p>

              <div className="flex gap-2">
                <a
                  href={`tel:${complex.featuredBroker.phone}`}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg text-center transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  전화 상담하기
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 이야기 (Community Stories) */}
        {activeTab === '이야기' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">주민 리뷰 & 현장 이야기</h4>
              <button 
                onClick={() => alert('리뷰 작성 기능이 준비 중입니다.')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                + 이야기 작성
              </button>
            </div>

            <div className="space-y-3">
              {complex.stories.map((story) => (
                <div key={story.id} className="p-3.5 border border-slate-200 rounded-xl space-y-2 bg-white">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{story.author}</span>
                    <span className="text-slate-400">{story.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    ★ {story.rating} <span className="text-slate-400 font-normal">({story.category})</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {story.content}
                  </p>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                    <span>도움돼요 {story.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
