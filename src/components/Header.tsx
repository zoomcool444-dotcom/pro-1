import React, { useState } from 'react';
import {
  Wallet,
  ArrowDownToLine,
  ChevronDown,
  RotateCcw,
  Gift,
  User,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Menu,
} from 'lucide-react';
import { AccountState } from '../types';

import { QuotexEmblem } from './QuotexLogo';

interface HeaderProps {
  account: AccountState;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
  onProfileClick: () => void;
  onResetDemoBalance: () => void;
  onSwitchAccountType: (type: 'demo' | 'live') => void;
}

export const Header: React.FC<HeaderProps> = ({
  account,
  onDepositClick,
  onWithdrawClick,
  onProfileClick,
  onResetDemoBalance,
  onSwitchAccountType,
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const currentBalance =
    account.type === 'demo' ? account.demoBalance : account.liveBalance;

  return (
    <header className="h-14 bg-[#141923] border-b border-[#232c3d] px-4 flex items-center justify-between z-30 select-none">
      {/* Brand logo & tagline */}
      <div className="flex items-center gap-3.5">
        <button
          title="Menu"
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1e2536] transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="flex items-center gap-2.5 cursor-pointer">
          <QuotexEmblem size={28} />
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg leading-none">
              QUOTEX
            </span>
            <span className="text-xs font-medium text-slate-400 hidden sm:inline-block leading-none">
              • Web Trading Platform
            </span>
          </div>
        </div>
      </div>

      {/* Promotional bonus banner */}
      <div className="hidden lg:flex items-center gap-2.5 bg-[#142323] border border-[#00b074]/30 rounded-lg px-3 py-1.5 cursor-pointer hover:border-[#00b074]/60 transition-colors"
        onClick={onDepositClick}
      >
        <div className="w-6 h-6 rounded-md bg-[#00b074]/20 flex items-center justify-center text-[#00b074]">
          <Gift className="w-4 h-4" />
        </div>
        <div className="text-sm">
          <span className="text-slate-200">Get a </span>
          <span className="text-[#00b074] font-bold">50% bonus</span>
          <span className="text-slate-200"> on your deposit!</span>
        </div>
        <div className="bg-[#00b074] text-slate-950 font-bold text-xs px-2 py-0.5 rounded shadow-sm">
          50%
        </div>
      </div>

      {/* Right controls: Account, Deposit, Withdrawal, Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative p-1.5 text-slate-400 hover:text-white cursor-pointer transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 bg-[#f97316] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            5
          </span>
        </div>

        {/* Account balance selector */}
        <div className="relative">
          <div className="flex items-center bg-[#121620] hover:bg-[#1a202e] border border-[#232938] rounded-lg px-3 py-1.5 transition-colors">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center gap-2.5 text-left"
            >
              <div>
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  {account.type === 'demo' ? (
                    <span className="text-amber-400">Demo Account</span>
                  ) : (
                    <span className="text-emerald-400">Live Account</span>
                  )}
                </div>
                <div className="text-base sm:text-lg font-bold text-white tabular-nums leading-tight">
                  ${currentBalance.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            </button>
            {account.type === 'demo' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onResetDemoBalance();
                }}
                title="Reset Demo balance to $10,000"
                className="ml-2 p-1 text-slate-400 hover:text-amber-400 hover:bg-[#222a3d] rounded transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Account Dropdown Menu */}
          {showAccountMenu && (
            <div className="absolute right-0 top-13 w-68 bg-[#181c27] border border-[#2a3245] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in">
              <div className="text-xs font-semibold text-slate-400 px-3 py-1.5 border-b border-[#232938]">
                Select Account
              </div>

              {/* Demo Account Option */}
              <div
                onClick={() => {
                  onSwitchAccountType('demo');
                  setShowAccountMenu(false);
                }}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer mt-1 transition-colors ${
                  account.type === 'demo'
                    ? 'bg-[#22293b] border border-amber-500/30'
                    : 'hover:bg-[#1f2536]'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    Demo Account
                    {account.type === 'demo' && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="text-base font-bold text-white tabular-nums mt-0.5">
                    ${account.demoBalance.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
                {/* Reset demo balance button */}
                <button
                  title="Reset Demo balance to $10,000"
                  onClick={(e) => {
                    e.stopPropagation();
                    onResetDemoBalance();
                  }}
                  className="p-1.5 hover:bg-[#2b344a] text-slate-400 hover:text-white rounded-md transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Live Account Option */}
              <div
                onClick={() => {
                  onSwitchAccountType('live');
                  setShowAccountMenu(false);
                }}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer mt-1 transition-colors ${
                  account.type === 'live'
                    ? 'bg-[#22293b] border border-emerald-500/30'
                    : 'hover:bg-[#1f2536]'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    Live Account
                    {account.type === 'live' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div className="text-base font-bold text-white tabular-nums mt-0.5">
                    ${account.liveBalance.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Deposit Button */}
        <button
          onClick={onDepositClick}
          className="flex items-center gap-2 bg-[#00b074] hover:bg-[#009b66] text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold leading-none">
            +
          </div>
          <span>Deposit</span>
          <ChevronDown className="w-4 h-4 opacity-90" />
        </button>

        {/* Withdrawal Button */}
        <button
          onClick={onWithdrawClick}
          className="flex items-center gap-2 bg-[#1f2638] hover:bg-[#283248] text-white border border-[#2b364e] px-4 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <ArrowDownToLine className="w-4 h-4 text-slate-300" />
          <span>Withdrawal</span>
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={onProfileClick}
          title="Profile & Settings"
          className="w-10 h-10 rounded-full bg-[#1e2638] border border-[#2a3650] flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 transition-colors relative"
        >
          <User className="w-4.5 h-4.5" />
          {account.isVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#00b074] border-2 border-[#181c27] flex items-center justify-center">
              <ShieldCheck className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
};
