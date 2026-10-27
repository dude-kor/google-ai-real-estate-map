import React from 'react';
import { X, Navigation, Compass, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Complex } from '../types/realEstate';

interface RoadviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  complex?: Complex | null;
}

export const RoadviewModal: React.FC<RoadviewModalProps> = ({
  isOpen,
  onClose,
  complex
}) => {
  if (!isOpen) return null;

  const title = complex ? `${complex.name} 주변 거리뷰` : '현장 거리뷰 (로드뷰)';
  const address = complex ? complex.address : '서울특별시 영등포구 양평동1가 247 일대';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl h-[75vh] flex flex-col overflow-hidden border border-slate-700">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-bold text-sm text-white">{title}</h3>
            <span className="text-xs text-slate-400 font-mono">({address})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 360 View Container */}
        <div className="relative flex-1 bg-slate-950 overflow-hidden flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=80"
            alt="Roadview panorama"
            className="w-full h-full object-cover brightness-95 contrast-105"
          />

          {/* Compass / Direction Widget */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>북서방향 (315° NW) · 2026년 9월 촬영</span>
          </div>

          {/* Street Name Pill in Scene */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg border border-white/40 flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 fill-white" />
            <span>영등포로 25길 ➔ 양평역 방향 (도보 4분)</span>
          </div>

          {/* On-screen controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-lg border border-white/20 text-white">
            <button className="p-1.5 hover:bg-white/20 rounded transition" title="확대">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-white/20 rounded transition" title="축소">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-white/20 rounded transition" title="전체화면">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>마우스를 드래그하여 주변 360도 경관 및 건물 외관을 확인하세요.</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs"
          >
            거리뷰 종료
          </button>
        </div>

      </div>
    </div>
  );
};
