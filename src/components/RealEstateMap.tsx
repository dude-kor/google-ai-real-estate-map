import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Plus, Minus, Navigation, Eye, Map as MapIcon, 
  Ruler, GraduationCap, ShoppingBag, HardHat, Building, RefreshCw
} from 'lucide-react';
import { Complex, FilterState } from '../types/realEstate';
import { SUBWAY_STATIONS } from '../data/mockPublicData';

interface RealEstateMapProps {
  complexes: Complex[];
  selectedComplex: Complex | null;
  onSelectComplex: (complex: Complex) => void;
  filters: FilterState;
  onTogglePyeong: () => void;
  onOpenRoadview: () => void;
  mapCenter: { lat: number; lng: number };
}

export const RealEstateMap: React.FC<RealEstateMapProps> = ({
  complexes,
  selectedComplex,
  onSelectComplex,
  filters,
  onTogglePyeong,
  onOpenRoadview,
  mapCenter
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const subwayLayerRef = useRef<L.LayerGroup | null>(null);
  const amenitiesLayerRef = useRef<L.LayerGroup | null>(null);

  // Layer toggles
  const [showSchools, setShowSchools] = useState(false);
  const [showConvenience, setShowConvenience] = useState(false);
  const [showDevelopment, setShowDevelopment] = useState(false);
  const [showBrokers, setShowBrokers] = useState(false);
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite'>('standard');
  const [isMeasuring, setIsMeasuring] = useState(false);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [mapCenter.lat, mapCenter.lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      // CartoDB Positron / OSM tiles (crisp, beautiful urban map style)
      const tileUrl = mapStyle === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      subwayLayerRef.current = L.layerGroup().addTo(map);
      amenitiesLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map alive or clean up
    };
  }, []);

  // Update map style tiles
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = mapStyle === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);
  }, [mapStyle]);

  // 2. Pan to mapCenter if updated
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map) {
      map.setView([mapCenter.lat, mapCenter.lng], map.getZoom(), { animate: true });
    }
  }, [mapCenter.lat, mapCenter.lng]);

  // 3. Render Subway Stations
  useEffect(() => {
    const subwayLayer = subwayLayerRef.current;
    if (!subwayLayer) return;
    subwayLayer.clearLayers();

    SUBWAY_STATIONS.forEach(st => {
      const icon = L.divIcon({
        className: 'custom-subway-icon',
        html: `
          <div style="
            display: flex;
            align-items: center;
            gap: 4px;
            background: white;
            padding: 2px 6px;
            border-radius: 12px;
            border: 1.5px solid ${st.color};
            box-shadow: 0 1px 4px rgba(0,0,0,0.2);
            font-size: 11px;
            font-weight: bold;
            color: #1e293b;
            white-space: nowrap;
          ">
            <span style="
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: ${st.color};
              display: inline-block;
            "></span>
            <span>${st.name}</span>
          </div>
        `,
        iconSize: [80, 24],
        iconAnchor: [40, 12]
      });

      L.marker([st.lat, st.lng], { icon, interactive: false }).addTo(subwayLayer);
    });
  }, []);

  // 4. Render Complex Markers (Matching exact Naver Real Estate speech bubble design)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    complexes.forEach(c => {
      const isSelected = selectedComplex?.id === c.id;

      let markerHtml = '';

      if (isSelected) {
        // Active bubble popup design exactly from the screenshot:
        // Blue speech bubble with complex name, price (e.g. "전세 2.3억"), count ("전세 1"), and links ("실거래 | 단지 | 이야기")
        markerHtml = `
          <div class="seongeun-popup-card" style="
            position: relative;
            background: white;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15);
            width: 170px;
            border: 1px solid #bfdbfe;
            overflow: hidden;
            font-family: 'Noto Sans KR', sans-serif;
            text-align: left;
            cursor: pointer;
            transform: translate(-50%, -100%);
            margin-top: -10px;
          ">
            <!-- Blue Header -->
            <div style="
              background: #2563eb;
              color: white;
              padding: 6px 10px;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: -0.3px;
            ">
              ${c.name}
            </div>

            <!-- Body Price & Count -->
            <div style="padding: 8px 10px;">
              <div style="font-size: 13px; font-weight: 800; color: #0f172a;">
                ${c.representativePrice.text}
              </div>
              <div style="margin-top: 3px;">
                <span style="
                  background: #10b981;
                  color: white;
                  padding: 1px 6px;
                  border-radius: 4px;
                  font-size: 10px;
                  font-weight: 700;
                ">
                  ${c.representativePrice.type} 1
                </span>
              </div>
            </div>

            <!-- Action footer links -->
            <div style="
              display: flex;
              border-top: 1px solid #f1f5f9;
              padding: 5px 10px;
              font-size: 11px;
              color: #475569;
              background: #f8fafc;
              justify-content: space-between;
              font-weight: 500;
            ">
              <span style="cursor: pointer; color: #2563eb;">실거래</span>
              <span style="color: #cbd5e1;">|</span>
              <span style="cursor: pointer;">단지</span>
              <span style="color: #cbd5e1;">|</span>
              <span style="cursor: pointer;">이야기</span>
            </div>

            <!-- Pointer triangle arrow -->
            <div style="
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid #f8fafc;
            "></div>
          </div>
        `;
      } else {
        // Standard unselected marker (clean pill card)
        const isJeonse = c.representativePrice.type === '전세';
        const badgeBg = isJeonse ? '#10b981' : '#2563eb';

        markerHtml = `
          <div style="
            position: relative;
            background: white;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.18);
            border: 1.5px solid ${badgeBg};
            padding: 4px 8px;
            font-family: 'Noto Sans KR', sans-serif;
            text-align: center;
            cursor: pointer;
            white-space: nowrap;
            transform: translate(-50%, -50%);
            transition: all 0.15s ease;
          " onmouseover="this.style.transform='translate(-50%, -50%) scale(1.08)'" onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'">
            <div style="font-size: 11px; font-weight: 700; color: #1e293b; line-height: 1.2;">
              ${c.name}
            </div>
            <div style="font-size: 10px; font-weight: 700; color: ${badgeBg}; margin-top: 2px;">
              ${c.representativePrice.text}
            </div>
          </div>
        `;
      }

      const icon = L.divIcon({
        className: 'custom-complex-marker',
        html: markerHtml,
        iconSize: [1, 1],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([c.lat, c.lng], { icon, zIndexOffset: isSelected ? 1000 : 100 });
      marker.on('click', () => {
        onSelectComplex(c);
      });

      marker.addTo(markersLayer);
    });
  }, [complexes, selectedComplex]);

  // Zoom controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetLocation = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([mapCenter.lat, mapCenter.lng], 15);
    }
  };

  return (
    <div className="relative flex-1 h-full w-full bg-slate-100 overflow-hidden">
      
      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Right Map Toolbar (Matching the exact vertical tool column in screenshot) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 rounded-xl shadow-lg border border-slate-200 text-xs font-semibold text-slate-700">
        
        {/* 평 (Pyeong Toggle) */}
        <button
          onClick={onTogglePyeong}
          className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg transition ${
            filters.isPyeongUnit ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="평형 / m² 단위 전환"
        >
          <span className="text-xs font-bold leading-none">평</span>
          <span className="text-[9px] opacity-80 leading-none mt-0.5">{filters.isPyeongUnit ? '평' : 'm²'}</span>
        </button>

        <div className="w-6 h-[1px] bg-slate-200" />

        {/* 교육 (Schools) */}
        <button
          onClick={() => setShowSchools(!showSchools)}
          className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg transition ${
            showSchools ? 'bg-amber-500 text-white' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="학군 및 초등학교 구역"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="text-[9px] mt-0.5 leading-none">교육</span>
        </button>

        {/* 편의 (Convenience) */}
        <button
          onClick={() => setShowConvenience(!showConvenience)}
          className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg transition ${
            showConvenience ? 'bg-emerald-500 text-white' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="편의시설 (마트/병원)"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="text-[9px] mt-0.5 leading-none">편의</span>
        </button>

        {/* 개발 (Development) */}
        <button
          onClick={() => setShowDevelopment(!showDevelopment)}
          className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg transition ${
            showDevelopment ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="재개발/재건축 개발구역"
        >
          <HardHat className="w-3.5 h-3.5" />
          <span className="text-[9px] mt-0.5 leading-none">개발</span>
        </button>

        {/* 중개 (Brokers) */}
        <button
          onClick={() => setShowBrokers(!showBrokers)}
          className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg transition ${
            showBrokers ? 'bg-purple-600 text-white' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="단지 내 공인중개사"
        >
          <Building className="w-3.5 h-3.5" />
          <span className="text-[9px] mt-0.5 leading-none">중개</span>
        </button>

        <div className="w-6 h-[1px] bg-slate-200" />

        {/* 거리뷰 (Roadview) */}
        <button
          onClick={onOpenRoadview}
          className="w-9 h-9 flex flex-col items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition"
          title="거리뷰(로드뷰)"
        >
          <Eye className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[9px] mt-0.5 leading-none">거리뷰</span>
        </button>

        {/* 지도 (Map Style) */}
        <button
          onClick={() => setMapStyle(mapStyle === 'standard' ? 'satellite' : 'standard')}
          className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg transition ${
            mapStyle === 'satellite' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="지도 스타일 (일반 / 위성)"
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span className="text-[9px] mt-0.5 leading-none">지도</span>
        </button>

        {/* 측정 (Measure) */}
        <button
          onClick={() => {
            setIsMeasuring(!isMeasuring);
            alert('도보 거리 측정 모드가 활성화되었습니다. 지도상의 두 지점을 클릭하세요.');
          }}
          className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg transition ${
            isMeasuring ? 'bg-red-500 text-white' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="거리 및 면적 측정"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span className="text-[9px] mt-0.5 leading-none">측정</span>
        </button>

        <div className="w-6 h-[1px] bg-slate-200" />

        {/* Zoom In & Out */}
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition"
          title="확대"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition"
          title="축소"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetLocation}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition"
          title="현재 위치로 이동"
        >
          <Navigation className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Bottom Center Pill: "매물 1 | 단지 1" (Exactly as in screenshot) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full shadow-xl border border-slate-200/80 flex items-center gap-4 text-xs font-bold text-slate-800">
          <button 
            onClick={() => onSelectComplex(complexes[0])}
            className="flex items-center gap-1.5 hover:text-blue-600 transition"
          >
            <span>매물</span>
            <span className="text-blue-600 font-extrabold">{complexes.reduce((acc, c) => acc + c.listings.length, 0)}</span>
          </button>
          <span className="text-slate-300">|</span>
          <button 
            onClick={() => onSelectComplex(complexes[0])}
            className="flex items-center gap-1.5 hover:text-emerald-600 transition"
          >
            <span>단지</span>
            <span className="text-emerald-600 font-extrabold">{complexes.length}</span>
          </button>
        </div>
      </div>

      {/* Scale Indicator */}
      <div className="absolute bottom-2 right-4 z-20 text-[10px] text-slate-500 bg-white/70 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
        300m
      </div>

    </div>
  );
};
