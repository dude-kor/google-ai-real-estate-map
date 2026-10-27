import React, { useState } from 'react';
import { X, Copy, Check, Download, Terminal, Play, FileCode, ExternalLink, Info } from 'lucide-react';

interface StreamlitCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  streamlitCode: string;
  requirementsTxt: string;
}

export const StreamlitCodeModal: React.FC<StreamlitCodeModalProps> = ({
  isOpen,
  onClose,
  streamlitCode,
  requirementsTxt
}) => {
  const [activeTab, setActiveTab] = useState<'app' | 'requirements' | 'guide' | 'simulator'>('app');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center font-mono font-bold text-lg">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Python Streamlit Framework Source Code</h3>
                <span className="px-2 py-0.5 text-xs bg-red-500 text-white font-medium rounded-full">Streamlit Ready</span>
              </div>
              <p className="text-xs text-slate-400">
                국토교통부 공공데이터 연동 & Folium 지도 기반의 순수 파이썬 Streamlit 코드입니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>안내:</strong> 클라우드 AI Studio 웹 환경에서는 브라우저 렌더링을 위해 본 미리보기가 구동되며, 
              동시에 로컬 또는 Streamlit Cloud에서 <strong>100% 순수 Python Streamlit</strong>으로 즉시 실행할 수 있도록 <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">streamlit_app.py</code> 파일이 프로젝트 루트에 저장되었습니다.
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between px-6 bg-slate-100 border-b border-slate-200">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('app')}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
                activeTab === 'app'
                  ? 'border-red-500 text-red-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              streamlit_app.py
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
                activeTab === 'requirements'
                  ? 'border-red-500 text-red-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              requirements.txt
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
                activeTab === 'guide'
                  ? 'border-red-500 text-red-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              로컬 실행 가이드
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'app' && (
              <>
                <button
                  onClick={() => handleCopy(streamlitCode)}
                  className="px-2.5 py-1 text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 rounded shadow-xs flex items-center gap-1 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? '복사됨' : '코드 복사'}
                </button>
                <button
                  onClick={() => handleDownload('streamlit_app.py', streamlitCode)}
                  className="px-2.5 py-1 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded shadow-xs flex items-center gap-1 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  파일 다운로드
                </button>
              </>
            )}
            {activeTab === 'requirements' && (
              <button
                onClick={() => handleDownload('requirements.txt', requirementsTxt)}
                className="px-2.5 py-1 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded shadow-xs flex items-center gap-1 transition"
              >
                <Download className="w-3.5 h-3.5" />
                requirements.txt 다운로드
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 font-mono text-xs text-slate-300">
          {activeTab === 'app' && (
            <pre className="whitespace-pre overflow-x-auto leading-relaxed selection:bg-red-500 selection:text-white">
              <code>{streamlitCode}</code>
            </pre>
          )}

          {activeTab === 'requirements' && (
            <div className="space-y-4">
              <div className="text-slate-400 text-xs mb-2">필요한 파이썬 패키지 목록:</div>
              <pre className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-green-400">
                <code>{requirementsTxt}</code>
              </pre>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-6 text-slate-200 font-sans">
              <div className="bg-slate-900 p-5 rounded-lg border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  1. 로컬 환경에서 파이썬 Streamlit 구동하기 (3단계)
                </h4>
                
                <div className="space-y-2 text-xs">
                  <p className="text-slate-400">Step 1: 파이썬 가상환경 생성 (권장)</p>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">
                    python -m venv venv{"\n"}
                    # Windows: venv\Scripts\activate{"\n"}
                    # Mac/Linux: source venv/bin/activate
                  </pre>

                  <p className="text-slate-400 mt-3">Step 2: 의존성 패키지 설치</p>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">
                    pip install -r requirements.txt
                  </pre>

                  <p className="text-slate-400 mt-3">Step 3: Streamlit 앱 실행</p>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">
                    streamlit run streamlit_app.py
                  </pre>
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">🌐 공공데이터포털 실시간 API 키 등록 방법</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1. <a href="https://www.data.go.kr" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">공공데이터포털(data.go.kr)</a>에 접속하여 <strong>국토교통부 아파트매매 실거래자료</strong> 또는 <strong>오피스텔 매매/전월세 실거래자료</strong> 오픈 API 활용신청을 합니다.<br />
                  2. 발급받은 일반 인증키(Encoding/Decoding)를 사이드바의 API 키 입력창에 넣으면 실시간 공공데이터를 즉시 호출하여 지도에 시각화합니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            파일 경로: <code className="font-mono bg-slate-200 px-1 py-0.5 rounded">./streamlit_app.py</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900 rounded shadow-xs"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
