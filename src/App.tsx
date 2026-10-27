import React, { useState, useMemo } from 'react';
import { TopFilterBar } from './components/TopFilterBar';
import { RealEstateMap } from './components/RealEstateMap';
import { ComplexDetailDrawer } from './components/ComplexDetailDrawer';
import { StreamlitCodeModal } from './components/StreamlitCodeModal';
import { OpenDataApiModal } from './components/OpenDataApiModal';
import { RoadviewModal } from './components/RoadviewModal';
import { INITIAL_COMPLEXES, SEOUL_REGIONS } from './data/mockPublicData';
import { Complex, FilterState } from './types/realEstate';
import { Menu, ChevronRight } from 'lucide-react';

const STREAMLIT_APP_CODE = `"""
한국 부동산 공공데이터 지도 및 실거래가 조회 웹 애플리케이션
(Korea Real Estate Public Open Data Map & Transaction Explorer)

실행 방법:
  1. pip install -r requirements.txt
  2. streamlit run streamlit_app.py
"""

import streamlit as st
import pandas as pd
import folium
from streamlit_folium import st_folium
import plotly.express as px
import plotly.graph_objects as go
import requests
import xml.etree.ElementTree as ET

# 1. Page Configuration
st.set_page_config(
    page_title="부동산 공공데이터 지도 포털 | Naver Real Estate Style",
    page_icon="🏢",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for Naver Real Estate style aesthetics
st.markdown("""
<style>
    .main-title {
        font-size: 1.6rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 0.2rem;
    }
    .sub-title {
        font-size: 0.9rem;
        color: #64748b;
        margin-bottom: 1.2rem;
    }
    .metric-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 8px;
    }
</style>
""", unsafe_allow_html=True)

# 2. Public Open Data Fetcher & Dataset
@st.cache_data
def load_base_complex_data():
    return [
        {
            "id": "complex-seongeun",
            "name": "성은하우징",
            "type": "오피스텔",
            "sido": "서울특별시",
            "sigungu": "영등포구",
            "dong": "양평동1가",
            "address": "서울특별시 영등포구 영등포로 25-1",
            "lat": 37.5248,
            "lng": 126.8912,
            "households": 14,
            "built_year": "2020. 4.",
            "far": 249,
            "bcr": 59,
            "trade_type": "전세",
            "rep_price_text": "전세 2.3억",
            "rep_price_won": 230000000,
            "exclusive_area_m2": 32.37,
            "pyeong": 9.8,
            "subway": "양평역 5호선 도보 4분",
            "subway_min": 4,
            "broker": "타워(단지내)공인중개사사무소 (02-2633-8949)",
            "transactions": [
                {"date": "2021.01.28", "floor": "2층", "price": 233000000, "price_text": "2억 3,300", "type": "매매", "note": "최고/최저"},
                {"date": "2021.01.28", "floor": "3층", "price": 233000000, "price_text": "2억 3,300", "type": "매매", "note": "최고/최저"},
                {"date": "2021.01.18", "floor": "2층", "price": 233000000, "price_text": "2억 3,300", "type": "매매", "note": "-"},
                {"date": "2023.05.12", "floor": "4층", "price": 240000000, "price_text": "2억 4,000", "type": "매매", "note": "최고가"},
                {"date": "2024.03.15", "floor": "3층", "price": 230000000, "price_text": "2억 3,000", "type": "전세", "note": "신규계약"}
            ]
        },
        {
            "id": "complex-samho",
            "name": "양평삼호",
            "type": "아파트",
            "sido": "서울특별시",
            "sigungu": "영등포구",
            "dong": "양평동1가",
            "address": "서울특별시 영등포구 선유로 87",
            "lat": 37.5278,
            "lng": 126.8945,
            "households": 915,
            "built_year": "1996. 10.",
            "far": 268,
            "bcr": 19,
            "trade_type": "매매",
            "rep_price_text": "매매 10.2억",
            "rep_price_won": 1020000000,
            "exclusive_area_m2": 84.92,
            "pyeong": 25.7,
            "subway": "양평역 5호선 도보 3분",
            "subway_min": 3,
            "broker": "삼호단지내공인중개사 (02-2679-1122)",
            "transactions": [
                {"date": "2026.09.18", "floor": "14층", "price": 1040000000, "price_text": "10억 4,000", "type": "매매", "note": "신고가"},
                {"date": "2026.07.05", "floor": "8층", "price": 530000000, "price_text": "5억 3,000", "type": "전세", "note": "-"}
            ]
        }
    ]

# 3. Sidebar Filters
st.sidebar.header("🔍 부동산 매물 & 실거래가 필터")
complexes = load_base_complex_data()

sigungu_options = ["전체", "영등포구", "양천구"]
selected_sigungu = st.sidebar.selectbox("시/군/구 선택", sigungu_options, index=1)

dong_options = ["전체", "양평동1가", "양평동2가", "당산동5가", "문래동3가"]
selected_dong = st.sidebar.selectbox("법정동 선택", dong_options, index=1)

trade_type_options = ["전체", "매매", "전세", "월세"]
selected_trade_type = st.sidebar.radio("거래 유형", trade_type_options, index=2, horizontal=True)

property_types = ["아파트", "오피스텔", "재건축", "빌라/연립"]
selected_property_types = st.sidebar.multiselect(
    "매물 유형", property_types, default=["아파트", "오피스텔"]
)

st.sidebar.subheader("💰 가격 범위 (보증금 / 매매가)")
max_price_eok = st.sidebar.slider("최대 금액 (억원 단위)", min_value=1.0, max_value=30.0, value=4.0, step=0.5)

unit_choice = st.sidebar.radio("면적 단위", ["전용면적 (m²)", "평수 (평)"], horizontal=True)
area_range = st.sidebar.slider("전용면적 범위 (m²)", 20.0, 180.0, (30.0, 100.0), step=5.0)

# Filter dataset
filtered = [
    c for c in complexes
    if (selected_sigungu == "전체" or c["sigungu"] == selected_sigungu)
    and (selected_dong == "전체" or c["dong"] == selected_dong)
    and (selected_trade_type == "전체" or c["trade_type"] == selected_trade_type)
    and (c["type"] in selected_property_types)
    and (c["rep_price_won"] <= max_price_eok * 100000000)
    and (area_range[0] <= c["exclusive_area_m2"] <= area_range[1])
]

# 4. Map & Content
st.markdown('<div class="main-title">🏢 한국 부동산 공공데이터 지도 포털</div>', unsafe_allow_html=True)
c1, c2, c3 = st.columns(3)
c1.metric("검색된 단지 수", f"{len(filtered)}개 단지")
c2.metric("선택 지역", f"{selected_sigungu} {selected_dong}")
c3.metric("최대 예산", f"~{max_price_eok}억원")

col_map, col_detail = st.columns([6, 4])
with col_map:
    center_lat = filtered[0]["lat"] if filtered else 37.5255
    center_lng = filtered[0]["lng"] if filtered else 126.8920
    m = folium.Map(location=[center_lat, center_lng], zoom_start=15, tiles="CartoDB positron")
    for c in filtered:
        folium.Marker(
            location=[c["lat"], c["lng"]],
            popup=f"{c['name']} - {c['rep_price_text']}",
            tooltip=c["name"]
        ).add_to(m)
    st_folium(m, width="100%", height=500)

with col_detail:
    if filtered:
        st.write(f"### {filtered[0]['name']}")
        st.write(f"대표가격: {filtered[0]['rep_price_text']}")
        st.dataframe(pd.DataFrame(filtered[0]["transactions"]))
`;

const REQUIREMENTS_TXT = `streamlit>=1.36.0
folium>=0.16.0
streamlit-folium>=0.20.0
pandas>=2.2.0
requests>=2.31.0
plotly>=5.22.0
`;

export default function App() {
  // Filters state initialized to match the user's uploaded screenshot
  const [filters, setFilters] = useState<FilterState>({
    sido: '서울특별시',
    sigungu: '영등포구',
    dong: '양평동1가',
    onlyThisDong: true,
    selectedTradeType: '전세',
    selectedPropertyTypes: ['아파트', '오피스텔', '재건축'],
    maxPriceWon: 400000000, // 보증금 ~4억
    minPriceWon: 0,
    minExclusiveAreaM2: 30,
    maxExclusiveAreaM2: 70, // 전용 60m²~69m²
    minHouseholds: 0,
    maxBuiltYears: 0,
    maxSubwayWalkMinutes: 0,
    nearSubwayOnly: false,
    isPyeongUnit: false,
    viewMode: 'complex',
    showRealTransactionOverlay: true
  });

  // Selected complex for detail drawer
  const [selectedComplex, setSelectedComplex] = useState<Complex | null>(INITIAL_COMPLEXES[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Map center coordinates
  const [mapCenter, setMapCenter] = useState({ lat: 37.5255, lng: 126.8920 });

  // Modals state
  const [isStreamlitModalOpen, setIsStreamlitModalOpen] = useState(false);
  const [isOpenDataModalOpen, setIsOpenDataModalOpen] = useState(false);
  const [isRoadviewModalOpen, setIsRoadviewModalOpen] = useState(false);

  // Filter complexes
  const filteredComplexes = useMemo(() => {
    return INITIAL_COMPLEXES.filter((c) => {
      if (filters.onlyThisDong && c.dong !== filters.dong) return false;
      if (c.sigungu !== filters.sigungu && filters.sigungu !== '전체') return false;
      if (filters.selectedPropertyTypes.length > 0 && !filters.selectedPropertyTypes.includes(c.propertyType)) return false;
      if (filters.maxPriceWon > 0 && c.representativePrice.amountWon > filters.maxPriceWon) return false;
      if (filters.minHouseholds > 0 && c.households < filters.minHouseholds) return false;
      if (filters.nearSubwayOnly) {
        const hasNearStation = c.subwayStations.some(s => s.distanceMinutes <= 5);
        if (!hasNearStation) return false;
      }
      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSelectRegion = (sido: string, sigungu: string, dong: string, lat: number, lng: number) => {
    setFilters(prev => ({ ...prev, sido, sigungu, dong }));
    setMapCenter({ lat, lng });
  };

  const handleSelectComplex = (complex: Complex) => {
    setSelectedComplex(complex);
    setIsDrawerOpen(true);
    setMapCenter({ lat: complex.lat, lng: complex.lng });
  };

  const handleTogglePyeong = () => {
    setFilters(prev => ({ ...prev, isPyeongUnit: !prev.isPyeongUnit }));
  };

  // Real transactions for open data export
  const allFilteredTransactions = useMemo(() => {
    return filteredComplexes.flatMap(c => c.historicalTransactions);
  }, [filteredComplexes]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 text-slate-800">
      
      {/* 1. Top Navigation & Filter Bar */}
      <TopFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSelectRegion={handleSelectRegion}
        onOpenStreamlitModal={() => setIsStreamlitModalOpen(true)}
        onOpenOpenDataModal={() => setIsOpenDataModalOpen(true)}
        totalFilteredCount={filteredComplexes.length}
      />

      {/* 2. Main Content: Left Detail Drawer & Map */}
      <main className="flex-1 flex relative overflow-hidden">
        
        {/* Left Side Drawer */}
        {isDrawerOpen && (
          <ComplexDetailDrawer
            complex={selectedComplex}
            onClose={() => setIsDrawerOpen(false)}
            isPyeong={filters.isPyeongUnit}
            onTogglePyeong={handleTogglePyeong}
            onOpenRoadview={() => setIsRoadviewModalOpen(true)}
          />
        )}

        {/* Floating Open Drawer Button when collapsed */}
        {!isDrawerOpen && selectedComplex && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="absolute top-4 left-4 z-20 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold transition"
          >
            <Menu className="w-4 h-4 text-blue-600" />
            <span>{selectedComplex.name} 정보 열기</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}

        {/* Real Estate Map */}
        <RealEstateMap
          complexes={filteredComplexes}
          selectedComplex={selectedComplex}
          onSelectComplex={handleSelectComplex}
          filters={filters}
          onTogglePyeong={handleTogglePyeong}
          onOpenRoadview={() => setIsRoadviewModalOpen(true)}
          mapCenter={mapCenter}
        />

      </main>

      {/* 3. Python Streamlit Code & Exporter Modal */}
      <StreamlitCodeModal
        isOpen={isStreamlitModalOpen}
        onClose={() => setIsStreamlitModalOpen(false)}
        streamlitCode={STREAMLIT_APP_CODE}
        requirementsTxt={REQUIREMENTS_TXT}
      />

      {/* 4. Public Open Data API & Export Modal */}
      <OpenDataApiModal
        isOpen={isOpenDataModalOpen}
        onClose={() => setIsOpenDataModalOpen(false)}
        transactions={allFilteredTransactions}
        selectedDong={filters.dong}
      />

      {/* 5. Roadview Street View Simulation Modal */}
      <RoadviewModal
        isOpen={isRoadviewModalOpen}
        onClose={() => setIsRoadviewModalOpen(false)}
        complex={selectedComplex}
      />

    </div>
  );
}
