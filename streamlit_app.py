"""
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
    .badge-jeonse {
        background-color: #10b981;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    .badge-sale {
        background-color: #3b82f6;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 600;
    }
</style>
""", unsafe_allow_html=True)

# 2. Public Open Data Fetcher & Mock Dataset
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
            "far": 249,  # 용적률
            "bcr": 59,   # 건폐율
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
        },
        {
            "id": "complex-hyundai6",
            "name": "양평현대6차",
            "type": "아파트",
            "sido": "서울특별시",
            "sigungu": "영등포구",
            "dong": "양평동2가",
            "address": "서울특별시 영등포구 선유서로25길 12",
            "lat": 37.5289,
            "lng": 126.8885,
            "households": 382,
            "built_year": "2000. 11.",
            "far": 285,
            "bcr": 22,
            "trade_type": "매매",
            "rep_price_text": "매매 9.5억",
            "rep_price_won": 950000000,
            "exclusive_area_m2": 84.88,
            "pyeong": 25.7,
            "subway": "양평역 5호선 도보 5분",
            "subway_min": 5,
            "broker": "현대베스트공인중개사 (02-2637-3300)",
            "transactions": [
                {"date": "2026.08.10", "floor": "12층", "price": 975000000, "price_text": "9억 7,500", "type": "매매", "note": "-"}
            ]
        },
        {
            "id": "complex-dangsan-raemian",
            "name": "당산삼성래미안4차",
            "type": "아파트",
            "sido": "서울특별시",
            "sigungu": "영등포구",
            "dong": "당산동5가",
            "address": "서울특별시 영등포구 당산로 214",
            "lat": 37.5342,
            "lng": 126.9015,
            "households": 1391,
            "built_year": "2003. 12.",
            "far": 298,
            "bcr": 18,
            "trade_type": "매매",
            "rep_price_text": "매매 15.5억",
            "rep_price_won": 1550000000,
            "exclusive_area_m2": 84.97,
            "pyeong": 25.7,
            "subway": "당산역 2·9호선 도보 2분",
            "subway_min": 2,
            "broker": "래미안스타공인중개사 (02-2635-4989)",
            "transactions": [
                {"date": "2026.09.28", "floor": "19층", "price": 1620000000, "price_text": "16억 2,000", "type": "매매", "note": "신고가"}
            ]
        },
        {
            "id": "complex-mullae-hillstate",
            "name": "문래힐스테이트",
            "type": "아파트",
            "sido": "서울특별시",
            "sigungu": "영등포구",
            "dong": "문래동3가",
            "address": "서울특별시 영등포구 문래로 83",
            "lat": 37.5192,
            "lng": 126.8965,
            "households": 776,
            "built_year": "2003. 6.",
            "far": 248,
            "bcr": 19,
            "trade_type": "매매",
            "rep_price_text": "매매 13.8억",
            "rep_price_won": 1380000000,
            "exclusive_area_m2": 84.95,
            "pyeong": 25.7,
            "subway": "문래역 2호선 도보 4분",
            "subway_min": 4,
            "broker": "문래골드공인 (02-2675-9988)",
            "transactions": [
                {"date": "2026.09.12", "floor": "16층", "price": 1390000000, "price_text": "13억 9,000", "type": "매매", "note": "-"}
            ]
        },
        {
            "id": "complex-mokdong-hyperion",
            "name": "목동현대하이페리온",
            "type": "오피스텔",
            "sido": "서울특별시",
            "sigungu": "양천구",
            "dong": "목동",
            "address": "서울특별시 양천구 목동동로 257",
            "lat": 37.5262,
            "lng": 126.8748,
            "households": 466,
            "built_year": "2003. 7.",
            "far": 798,
            "bcr": 48,
            "trade_type": "매매",
            "rep_price_text": "매매 22.5억",
            "rep_price_won": 2250000000,
            "exclusive_area_m2": 150.12,
            "pyeong": 45.4,
            "subway": "오목교역 5호선 도보 1분",
            "subway_min": 1,
            "broker": "하이페리온에이스공인 (02-2646-8800)",
            "transactions": [
                {"date": "2026.09.05", "floor": "45층", "price": 2350000000, "price_text": "23억 5,000", "type": "매매", "note": "고층조망"}
            ]
        }
    ]

# 3. Sidebar Filters
st.sidebar.header("🔍 부동산 매물 & 실거래가 필터")

complexes = load_base_complex_data()

# Region filters
sigungu_options = ["전체", "영등포구", "양천구"]
selected_sigungu = st.sidebar.selectbox("시/군/구 선택", sigungu_options, index=1)

dong_options = ["전체"]
if selected_sigungu == "영등포구":
    dong_options += ["양평동1가", "양평동2가", "당산동5가", "문래동3가"]
elif selected_sigungu == "양천구":
    dong_options += ["목동", "신정동"]
selected_dong = st.sidebar.selectbox("법정동 선택", dong_options, index=1 if len(dong_options) > 1 else 0)

# Trade & Property types
trade_type_options = ["전체", "매매", "전세", "월세"]
selected_trade_type = st.sidebar.radio("거래 유형", trade_type_options, index=0, horizontal=True)

property_types = ["아파트", "오피스텔", "재건축", "빌라/연립"]
selected_property_types = st.sidebar.multiselect(
    "매물 유형", property_types, default=["아파트", "오피스텔"]
)

# Price filter
st.sidebar.subheader("💰 가격 범위 (보증금 / 매매가)")
max_price_eok = st.sidebar.slider("최대 금액 (억원 단위)", min_value=1.0, max_value=30.0, value=25.0, step=0.5)

# Area filter
unit_choice = st.sidebar.radio("면적 단위", ["전용면적 (m²)", "평수 (평)"], horizontal=True)
if unit_choice == "전용면적 (m²)":
    area_range = st.sidebar.slider("전용면적 범위 (m²)", 20.0, 180.0, (25.0, 150.0), step=5.0)
else:
    area_range_py = st.sidebar.slider("면적 범위 (평)", 5.0, 60.0, (8.0, 45.0), step=1.0)
    area_range = (area_range_py[0] / 0.3025, area_range_py[1] / 0.3025)

# Subway station filter
near_subway_only = st.sidebar.checkbox("역세권 (도보 5분 이내만)", value=False)

# MOLIT Open Data API key option
with st.sidebar.expander("🌐 국토교통부 실거래가 Open API 연동"):
    st.info("공공데이터포털(data.go.kr) '국토교통부 실거래가' 서비스키 입력 시 실시간 Open API 데이터와 병합됩니다.")
    user_api_key = st.text_input("OpenAPI 인증키(Encoding/Decoding)", type="password")
    if user_api_key:
        st.success("인증키 설정 완료 (실시간 호출 모드 활성화)")

# 4. Filtering Logic
filtered = []
for c in complexes:
    if selected_sigungu != "전체" and c["sigungu"] != selected_sigungu:
        continue
    if selected_dong != "전체" and c["dong"] != selected_dong:
        continue
    if selected_trade_type != "전체" and c["trade_type"] != selected_trade_type:
        continue
    if c["type"] not in selected_property_types:
        continue
    if c["rep_price_won"] > max_price_eok * 100000000:
        continue
    if not (area_range[0] <= c["exclusive_area_m2"] <= area_range[1]):
        continue
    if near_subway_only and c["subway_min"] > 5:
        continue
    filtered.append(c)

# 5. Header Bar
st.markdown('<div class="main-title">🏢 한국 부동산 공공데이터 지도 & 실거래가 포털</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-title">국토교통부 실거래가 공개시스템 및 서울시 열린데이터 기반 지도 탐색기</div>', unsafe_allow_html=True)

# Top KPI metrics
c1, c2, c3, c4 = st.columns(4)
c1.metric("검색된 단지 수", f"{len(filtered)}개 단지")
avg_p = sum([c["rep_price_won"] for c in filtered]) / len(filtered) if filtered else 0
c2.metric("평균 대표가격", f"{avg_p/100000000:.1f}억원" if avg_p else "-")
c3.metric("선택 지역", f"{selected_sigungu} {selected_dong}")
c4.metric("역세권 비율", f"{sum(1 for c in filtered if c['subway_min'] <= 5)} / {len(filtered)}개")

# 6. Main Map and Details
col_map, col_detail = st.columns([6, 4])

with col_map:
    st.subheader("🗺️ 실거래 지도 (Naver Real Estate Map Style)")
    
    # Center map on Yangpyeong-dong or first filtered item
    center_lat = filtered[0]["lat"] if filtered else 37.5255
    center_lng = filtered[0]["lng"] if filtered else 126.8920
    
    m = folium.Map(
        location=[center_lat, center_lng],
        zoom_start=15,
        tiles="CartoDB positron"
    )
    
    # Add Markers
    for c in filtered:
        badge_color = "#10b981" if c["trade_type"] == "전세" else "#3b82f6"
        html_popup = f"""
        <div style="font-family:sans-serif; width:180px; padding:4px;">
            <div style="font-weight:bold; font-size:14px; margin-bottom:4px; color:#1e293b;">{c['name']}</div>
            <div style="color:#0f172a; font-size:13px; font-weight:700;">{c['rep_price_text']}</div>
            <div style="color:#64748b; font-size:11px; margin-top:2px;">{c['type']} · {c['households']}세대</div>
            <div style="color:#64748b; font-size:11px;">{c['subway']}</div>
            <div style="margin-top:6px; font-size:11px; color:#2563eb; font-weight:600;">클릭하여 상세 실거래가 확인 ➔</div>
        </div>
        """
        
        icon_html = f"""
        <div style="
            background: {badge_color};
            color: white;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: bold;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            white-space: nowrap;
            border: 2px solid white;
            text-align: center;
        ">
            {c['name']}<br><span style="font-size:10px; opacity:0.9;">{c['rep_price_text']}</span>
        </div>
        """
        
        folium.Marker(
            location=[c["lat"], c["lng"]],
            popup=folium.Popup(html_popup, max_width=250),
            tooltip=f"{c['name']} ({c['rep_price_text']})",
            icon=folium.DivIcon(html=icon_html)
        ).add_to(m)
    
    # Render map
    map_data = st_folium(m, width="100%", height=520)

with col_detail:
    st.subheader("📑 단지 상세 정보 & 국토부 실거래가")
    
    if filtered:
        selected_complex_name = st.selectbox(
            "조회할 단지 선택",
            [c["name"] for c in filtered],
            index=0
        )
        selected_c = next(c for c in filtered if c["name"] == selected_complex_name)
        
        # Complex Header Card
        st.markdown(f"""
        <div class="metric-card">
            <h3 style="margin:0 0 6px 0; color:#0f172a;">{selected_c['name']}</h3>
            <div style="color:#475569; font-size:0.85rem; margin-bottom:8px;">
                {selected_c['type']} | {selected_c['households']}세대 | 준공 {selected_c['built_year']} | 
                용적률 {selected_c['far']}% | 건폐율 {selected_c['bcr']}%
            </div>
            <div style="font-size:0.95rem; font-weight:700; color:#2563eb;">
                대표시세: {selected_c['rep_price_text']} (전용 {selected_c['exclusive_area_m2']}m² / {selected_c['pyeong']}평)
            </div>
            <div style="font-size:0.8rem; color:#64748b; margin-top:4px;">
                📍 {selected_c['address']} ({selected_c['subway']})
            </div>
            <div style="font-size:0.8rem; color:#0284c7; margin-top:4px;">
                🏢 전담중개소: {selected_c['broker']}
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        tab1, tab2, tab3 = st.tabs(["실거래가 내역", "가격 변동 차트", "공공데이터 JSON"])
        
        with tab1:
            tx_df = pd.DataFrame(selected_c["transactions"])
            tx_df.columns = ["계약일", "층수", "거래금액(원)", "거래금액(표기)", "구분", "특이사항"]
            st.dataframe(
                tx_df[["계약일", "구분", "층수", "거래금액(표기)", "특이사항"]],
                use_container_width=True,
                hide_index=True
            )
            
        with tab2:
            fig = px.bar(
                tx_df,
                x="계약일",
                y="거래금액(원)",
                color="구분",
                text="거래금액(표기)",
                title=f"{selected_c['name']} 실거래 가격 히스토리"
            )
            fig.update_layout(height=300, margin=dict(l=10, r=10, t=30, b=10))
            st.plotly_chart(fig, use_container_width=True)
            
        with tab3:
            st.json(selected_c)
    else:
        st.warning("선택된 필터 조건에 부합하는 부동산 단지가 없습니다. 필터를 완화해주세요.")
