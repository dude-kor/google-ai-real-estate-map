import React, { useState } from 'react';
import { X, Database, Key, Check, Download, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { RealTransaction } from '../types/realEstate';

interface OpenDataApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: RealTransaction[];
  selectedDong: string;
}

export const OpenDataApiModal: React.FC<OpenDataApiModalProps> = ({
  isOpen,
  onClose,
  transactions,
  selectedDong
}) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [endpoint, setEndpoint] = useState('RTMSDataSvcAptTradeDev');
  const [dealYmd, setDealYmd] = useState('202610');
  const [lawdCd, setLawdCd] = useState('11560'); // 영등포구

  if (!isOpen) return null;

  const handleSaveKey = () => {
    localStorage.setItem('molit_api_key', apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['계약일', '계약년도', '구분', '거래금액(원)', '전용면적(m²)', '층수', '등기일'];
    const rows = transactions.map(t => [
      t.contractDate,
      t.contractYear,
      t.tradeType,
      t.priceWon,
      t.exclusiveAreaM2,
      `${t.floor}층`,
      t.registrationDate || '-'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `실거래가_공공데이터_${selectedDong}_${dealYmd}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `실거래가_공공데이터_${selectedDong}_${dealYmd}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-blue-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">국토교통부 실거래가 공개데이터 연동 센터</h3>
              <p className="text-xs text-blue-200">
                공공데이터포털(data.go.kr) 오픈 API 연동 및 데이터 내보내기
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
          
          {/* API Key configuration */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800 flex items-center gap-1.5 text-xs">
                <Key className="w-3.5 h-3.5 text-blue-600" />
                공공데이터포털 인증키(Service Key) 설정
              </label>
              <a
                href="https://www.data.go.kr"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                키 발급받기
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="인증키(일반 인증키 또는 Decoding 키)를 입력하세요"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shrink-0 flex items-center gap-1"
              >
                {saved ? <Check className="w-3.5 h-3.5" /> : null}
                {saved ? '저장됨' : '저장'}
              </button>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              * 키를 입력하지 않아도 사전 수집된 영등포구 양평동·당산동·목동 일대의 실제 국토부 실거래 표본 데이터가 기본 탑재되어 실시간 작동합니다.
            </p>
          </div>

          {/* Endpoints specification */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-700">지원 중인 공공데이터 API 엔드포인트</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div 
                onClick={() => setEndpoint('RTMSDataSvcAptTradeDev')}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  endpoint === 'RTMSDataSvcAptTradeDev' ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">국토교통부 아파트매매 실거래 상세자료</div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">RTMSDataSvcAptTradeDev</div>
              </div>
              <div 
                onClick={() => setEndpoint('RTMSDataSvcOffiRent')}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  endpoint === 'RTMSDataSvcOffiRent' ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">국토교통부 오피스텔 전월세 실거래가</div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">RTMSDataSvcOffiRent</div>
              </div>
            </div>
          </div>

          {/* Filter Parameters */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <div>
              <label className="text-slate-600 block mb-1">법정동 시군구코드 (LAWD_CD)</label>
              <input
                type="text"
                value={lawdCd}
                onChange={(e) => setLawdCd(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono"
              />
              <span className="text-[10px] text-slate-500">11560 = 서울시 영등포구</span>
            </div>
            <div>
              <label className="text-slate-600 block mb-1">계약년월 (DEAL_YMD)</label>
              <input
                type="text"
                value={dealYmd}
                onChange={(e) => setDealYmd(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono"
              />
              <span className="text-[10px] text-slate-500">YYYYMM 형식 (예: 202610)</span>
            </div>
          </div>

          {/* Export section */}
          <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-200 flex items-center justify-between">
            <div>
              <h5 className="font-bold text-emerald-950 text-xs">현재 필터링된 공공 실거래 데이터 다운로드</h5>
              <p className="text-xs text-emerald-700 mt-0.5">
                {selectedDong} 기준 총 {transactions.length}건의 실거래가 데이터셋
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportCsv}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition flex items-center gap-1 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                CSV 다운로드
              </button>
              <button
                onClick={handleExportJson}
                className="px-3 py-1.5 text-xs font-semibold bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 rounded-lg transition flex items-center gap-1 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                JSON
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900 rounded-lg shadow-xs"
          >
            확인
          </button>
        </div>

      </div>
    </div>
  );
};
