import React from 'react';
import { Home, Zap, Tv2, Clock, ThumbsUp, PlaySquare, History, ChevronDown, UserSquare2 } from 'lucide-react';
import { subscriptions } from '../data/mockData';
import clsx from 'clsx';

export function Sidebar({ isZenMode, isSidebarOpen }) {
  // If Zen mode is ON, we hide the sidebar completely or just make it very discreet.
  // The requirement says "removes the Sidebar".
  if (isZenMode) return null;

  return (
    <aside className={clsx(
        "bg-youtube-black h-[calc(100vh-56px)] overflow-y-auto w-60 fixed left-0 top-14 pb-4 px-3 hidden md:flex flex-col gap-2 z-40 transition-transform",
        // Ideally we would handle mobile drawer here too, but for now we stick to desktop layout mainly
    )}>
        {/* Main Links */}
        <SidebarSection>
            <SidebarItem icon={Home} label="Home" active />
            <SidebarItem icon={Zap} label="Shorts" />
            <SidebarItem icon={Tv2} label="Subscriptions" />
        </SidebarSection>

        <div className="border-t border-gray-700 my-2" />

        {/* You Section */}
        <SidebarSection title="You">
            <SidebarItem icon={History} label="History" />
            <SidebarItem icon={PlaySquare} label="Your videos" />
            <SidebarItem icon={Clock} label="Watch later" />
            <SidebarItem icon={ThumbsUp} label="Liked videos" />
        </SidebarSection>

        <div className="border-t border-gray-700 my-2" />

        {/* Subscriptions */}
        <div className="px-3 py-2">
            <h3 className="text-base font-semibold mb-2 ml-1">Subscriptions</h3>
            {subscriptions.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-3 px-2 py-2 hover:bg-youtube-hover rounded-lg cursor-pointer">
                    <img src={sub.avatar} className="w-6 h-6 rounded-full" alt={sub.name} />
                    <span className="text-sm truncate">{sub.name}</span>
                </div>
            ))}
            <div className="flex items-center gap-3 px-2 py-2 hover:bg-youtube-hover rounded-lg cursor-pointer">
                <ChevronDown size={20} />
                <span className="text-sm">Show more</span>
            </div>
        </div>
    </aside>
  );
}

function SidebarSection({ children, title }) {
    return (
        <div className="flex flex-col">
            {title && (
                 <div className="px-3 py-2 flex items-center hover:bg-youtube-hover rounded-lg cursor-pointer group">
                    <span className="font-semibold text-base">{title}</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
                 </div>
            )}
            {children}
        </div>
    )
}

function SidebarItem({ icon: Icon, label, active }) {
    return (
        <div className={clsx(
            "flex items-center gap-5 px-3 py-2 rounded-lg cursor-pointer",
            active ? "bg-youtube-hover font-medium" : "hover:bg-youtube-hover"
        )}>
            <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
            <span className="text-sm">{label}</span>
        </div>
    )
}
