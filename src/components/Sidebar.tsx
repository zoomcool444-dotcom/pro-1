import React, { useState } from 'react';
import {
  CandlestickChart,
  Headphones,
  MoreHorizontal,
  PenTool,
  Sliders,
  Settings,
  User,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Wallet,
  ArrowDownToLine,
  History,
  TrendingUp,
  Info,
  LogOut,
  Trophy,
  MessageSquare,
  HelpCircle,
  PanelRight,
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'trade' | 'drawings' | 'indicators' | 'settings' | 'account' | 'support';
  onSelectTab: (tab: 'trade' | 'drawings' | 'indicators' | 'settings' | 'account' | 'support') => void;
  onOpenDeposit: () => void;
  onOpenWithdrawal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  indicatorCount: number;
  drawingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenDeposit,
  onOpenWithdrawal,
  soundEnabled,
  onToggleSound,
  indicatorCount,
  drawingCount,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <aside className="w-18 bg-[#141923] border-r border-[#232c3d] flex flex-col justify-between py-3 items-center select-none z-30 shrink-0 relative font-sans">
      {/* Primary Navigation */}
      <div className="flex flex-col items-center gap-2 w-full px-1.5">
        {/* Trade Tab */}
        <button
          onClick={() => onSelectTab('trade')}
          title="Trade"
          className={`w-14 h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'trade'
              ? 'bg-[#0070f3] text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#1d2536]'
          }`}
        >
          <CandlestickChart className="w-5 h-5" />
          <span className="text-xs font-medium mt-0.5">Trade</span>
        </button>

        {/* Support */}
        <button
          onClick={() => onSelectTab('support')}
          title="Support"
          className={`w-14 h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'support'
              ? 'bg-[#0070f3] text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#1d2536]'
          }`}
        >
          <Headphones className="w-5 h-5" />
          <span className="text-xs font-medium mt-0.5">Support</span>
        </button>

        {/* Account Profile Tab */}
        <button
          onClick={() => onSelectTab('account')}
          title="My Account"
          className={`w-14 h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'account'
              ? 'bg-[#0070f3] text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#1d2536]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs font-medium mt-0.5">Account</span>
        </button>

        {/* Tournaments Tab */}
        <button
          onClick={() => {}}
          title="Tournaments"
          className="w-14 h-12 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-white hover:bg-[#1d2536] transition-all cursor-pointer relative"
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[11px] font-medium mt-0.5 leading-none">Tournaments</span>
          <span className="absolute top-1 right-1.5 bg-[#0070f3] text-[10px] text-white font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
            3
          </span>
        </button>

        {/* More (...) with flyout menu */}
        <div className="relative">
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            title="More Options"
            className={`w-14 h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              showMoreMenu
                ? 'bg-[#1d2536] text-white'
                : 'text-slate-400 hover:text-white hover:bg-[#1d2536]'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-xs font-medium mt-0.5">More</span>
          </button>

          {showMoreMenu && (
            <div className="absolute left-16 top-0 w-52 bg-[#181c27] border border-[#2a3245] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in text-sm text-slate-200">
              <button
                onClick={() => {
                  onOpenDeposit();
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#202738] hover:text-white transition-colors cursor-pointer"
              >
                <Wallet className="w-4.5 h-4.5 text-emerald-400" />
                <span className="font-medium">Deposit</span>
              </button>
              <button
                onClick={() => {
                  onOpenWithdrawal();
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#202738] hover:text-white transition-colors cursor-pointer"
              >
                <ArrowDownToLine className="w-4.5 h-4.5 text-cyan-400" />
                <span className="font-medium">Withdrawal</span>
              </button>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#202738] hover:text-white transition-colors cursor-pointer"
              >
                <History className="w-4.5 h-4.5 text-slate-400" />
                <span className="font-medium">Transactions</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('drawings');
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#202738] hover:text-white transition-colors cursor-pointer"
              >
                <PenTool className="w-4.5 h-4.5 text-blue-400" />
                <span className="font-medium">Drawing Tools</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('indicators');
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#202738] hover:text-white transition-colors cursor-pointer"
              >
                <Sliders className="w-4.5 h-4.5 text-emerald-400" />
                <span className="font-medium">Indicators</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('settings');
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#202738] hover:text-white transition-colors cursor-pointer"
              >
                <Settings className="w-4.5 h-4.5 text-slate-400" />
                <span className="font-medium">Platform Settings</span>
              </button>
              <div className="border-t border-[#232938] my-1.5" />
              <button
                onClick={() => setShowMoreMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#202738] text-red-400 hover:text-red-300 transition-colors cursor-pointer font-medium"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Utilities Area */}
      <div className="flex flex-col items-center gap-2.5 w-full px-1.5">
        {/* 2x2 Grid of 4 Control Icons */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#10141e] border border-[#222a3d] rounded-xl w-14">
          {/* 1. Fullscreen expand/collapse */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="w-5.5 h-5.5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1c2436] rounded transition-colors cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* 2. Panel toggle */}
          <button
            onClick={() => onSelectTab('drawings')}
            title="Drawings / Layout"
            className="w-5.5 h-5.5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1c2436] rounded transition-colors cursor-pointer"
          >
            <PanelRight className="w-3.5 h-3.5" />
          </button>

          {/* 3. Settings gear cog */}
          <button
            onClick={() => onSelectTab('settings')}
            title="Settings"
            className={`w-5.5 h-5.5 flex items-center justify-center rounded transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#0070f3] text-white'
                : 'text-slate-400 hover:text-white hover:bg-[#1c2436]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

          {/* 4. Sound toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute' : 'Unmute'}
            className="w-5.5 h-5.5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1c2436] rounded transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>

        {/* JOIN US Button */}
        <button
          onClick={() => {}}
          title="Join Us"
          className="w-14 h-12 rounded-xl bg-[#131924] hover:bg-[#1a2232] border border-[#232c3f] flex flex-col items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer group shadow-xs"
        >
          <MessageSquare className="w-4.5 h-4.5 text-blue-400 group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-medium text-slate-200 mt-0.5 leading-none">
            Join Us
          </span>
        </button>

        {/* Help Button */}
        <button
          onClick={() => onSelectTab('support')}
          title="Help & Support"
          className="w-14 h-12 rounded-xl bg-[#00b074] hover:bg-[#009e68] text-white flex flex-col items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <HelpCircle className="w-5 h-5 stroke-[2.2]" />
          <span className="text-xs font-semibold mt-0.5 leading-none">Help</span>
        </button>
      </div>
    </aside>
  );
};
