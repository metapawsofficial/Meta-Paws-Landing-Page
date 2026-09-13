import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Gift,
  Heart,
  Instagram,
  LockKeyhole,
  Menu,
  MessageCircle,
  PawPrint,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import catHero from '@assets/1788713757627_1788808724547.png';
import catBadge from '@assets/20260906_173531_1788808708585.jpg';

const queryClient = new QueryClient();
const PRESALE_TARGET = '2026-10-05T09:43:13Z';
const externalLinks = {
  telegram: 'https://t.me/mpawofficialx',
  twitter: 'https://x.com/MPAWofficialx',
  instagram: 'https://www.instagram.com/mpawofficialx?stkn=MTB3aTlyYjN4bno4Mg==',
  discord: 'https://discord.gg/FJn227UyRQ',
  tiktok: 'https://www.tiktok.com/@metapaws46?_r=1&_t=ZS-99YQVin4DqO',
  email: 'mailto:Metapawsofficial@gmail.com',
  whitepaper: 'https://drive.google.com/file/d/1qesn7ilPL3qttXBK12D_D4wfjthVpQK9/view',
  form: 'https://zesty-madeleine-b1931b.netlify.app',
  bscScan: 'https://bscscan.com/',
  contractAddress: '0x0000000000000000000000000000000000000000',
};
const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Features', href: '#features' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Airdrop', href: '#airdrop' },
];
const allocations = [
  { label: 'Presale', value: 30, amount: '3,000,000,000', color: '#5bdcff' },
  { label: 'Locked (vesting)', value: 40, amount: '4,000,000,000', color: '#f3a5ea' },
  { label: 'Initial Liquidity', value: 15, amount: '1,500,000,000', color: '#9b83ff' },
  { label: 'Lottery & Charity', value: 5, amount: '500,000,000', color: '#f7d27c' },
  { label: 'Team & Development', value: 5, amount: '500,000,000', color: '#5a477d' },
  { label: 'Marketing (immediate)', value: 5, amount: '500,000,000', color: '#74d8bf' },
];
const features = [
  { title: 'Daily Lottery', copy: '2% of every transaction goes to the lottery pool. Every day, one lucky winner takes the prize.', icon: Ticket, accent: 'cyan' },
  { title: 'Pet Charity', copy: '1% of every transaction supports real animal shelters. Memes with a mission.', icon: Heart, accent: 'pink' },
  { title: 'Locked & Transparent', copy: '40% of supply locked for 90 days, then released monthly over 20 months. No team dump.', icon: LockKeyhole, accent: 'gold' },
  { title: 'Airdrop Rewards', copy: 'Early supporters and presale buyers can earn free MPAW through our multi-stage airdrop program.', icon: Gift, accent: 'violet' },
];
const roadmap = [
  { phase: '01', title: 'Paw Launch', copy: 'Presale & community, early airdrop, and PancakeSwap listing.', icon: PawPrint },
  { phase: '02', title: 'Lottery Paws', copy: 'Daily lottery activation, token burn system, referral contests & influencer partnerships.', icon: Ticket },
  { phase: '03', title: 'Rescue Mission', copy: 'Building an animal shelter, annual charity events, and transparent monthly reports.', icon: Heart },
  { phase: '04', title: 'Meta Paws World', copy: 'Major exchange listings including MEXC, Gate.io, and more.', icon: Sparkles },
  { phase: '05', title: 'To the Moon', copy: 'Top 100 coin, bigger lotteries, and ecosystem expansion with games, NFTs, and more.', icon: Rocket },
];

function scrollToId(id: string, close?: () => void) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  close?.();
}

function timeLeft() {
  const difference = Math.max(0, Date.parse(PRESALE_TARGET) - Date.now());
  const totalSeconds = Math.floor(difference / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Countdown({ compact = false }: { compact?: boolean }) {
  const [left, setLeft] = useState(timeLeft);
  useEffect(() => {
    const interval = window.setInterval(() => setLeft(timeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);
  const units = Object.entries(left);
  return (
    <div className={compact ? 'mt-0' : 'mt-8'} role="status" aria-live="polite" aria-label="Live presale countdown" data-testid="countdown-presale">
      <p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#b9a7d2]">Presale starts in</p>
      <div className={`countdown-rings mt-4 ${compact ? 'countdown-rings--compact' : ''}`}>
        {units.map(([unit, value], index) => (
          <div key={unit} className="countdown-ring-wrap" data-testid={`countdown-${unit}`}>
            <div className="countdown-ring" style={{ '--ring-progress': `${Math.max(18, 100 - index * 16)}%` } as CSSProperties}>
              <div className="countdown-ring__value">{String(value).padStart(2, '0')}</div>
            </div>
            <div className="countdown-ring__label">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandMark() {
  return <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#7ddfff]/50 bg-[#5bdcff]/15 text-[#7ddfff] shadow-[0_0_18px_rgba(91,220,255,.25)]"><PawPrint size={18} /></span>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar fixed inset-x-3 top-3 z-50 rounded-2xl border px-3 sm:inset-x-5 sm:top-4 lg:inset-x-8" data-testid="navigation">
      <div className="mx-auto flex h-[58px] max-w-[1180px] items-center justify-between">
        <button onClick={() => scrollToId('#top')} className="group flex items-center gap-2.5" data-testid="button-brand-home">
          <BrandMark />
          <span className="font-display text-[16px] font-bold tracking-[-.04em] text-[#f8efff]">META <span className="text-[#6ddfff]">PAWS</span></span>
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => <button key={link.href} onClick={() => scrollToId(link.href)} className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#c0addb] transition-colors hover:text-[#7de5ff]" data-testid={`link-nav-${link.label.toLowerCase()}`}>{link.label}</button>)}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <a href={externalLinks.telegram} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[#d9c8ef] transition hover:border-[#6ddfff]/60 hover:text-[#6ddfff]" aria-label="Join Meta Paws on Telegram" data-testid="link-telegram-nav"><MessageCircle size={16} /></a>
          <a href={externalLinks.twitter} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[#d9c8ef] transition hover:border-[#f3a5ea]/60 hover:text-[#f3a5ea]" aria-label="Follow Meta Paws on Twitter" data-testid="link-twitter-nav"><span className="font-display text-xs font-bold">X</span></a>
          <a href={externalLinks.whitepaper} target="_blank" rel="noreferrer" className="hidden rounded-full border border-[#74defb]/35 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[.1em] text-[#bdefff] transition hover:border-[#74defb] hover:bg-[#74defb]/10 sm:inline-flex" data-testid="link-whitepaper-nav">Whitepaper <ArrowUpRight size={13} className="ml-1 inline" /></a>
          <button onClick={() => scrollToId('#airdrop')} className="button-glow rounded-full bg-[#d98de0] px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[.1em] text-[#241337]" data-testid="button-airdrop-nav">Get the airdrop <ArrowUpRight size={13} className="ml-1 inline" /></button>
        </div>
        <button className="rounded-lg p-2 text-[#e8d9f7] sm:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" data-testid="button-menu">{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {open && <div className="border-t border-white/10 px-2 py-4 sm:hidden"><nav className="flex flex-col gap-3">{navLinks.map((link) => <button key={link.href} className="rounded-xl px-3 py-2 text-left font-display text-base font-semibold text-[#eee2fa]" onClick={() => scrollToId(link.href, () => setOpen(false))} data-testid={`link-mobile-${link.label.toLowerCase()}`}>{link.label}</button>)}</nav><button onClick={() => scrollToId('#airdrop', () => setOpen(false))} className="mt-3 w-full rounded-full bg-[#d98de0] py-3 font-display text-xs font-bold uppercase tracking-[.1em] text-[#241337]" data-testid="button-mobile-airdrop">Join the airdrop</button></div>}
    </header>
  );
}

function BuyNowButton() {
  const [isLive, setIsLive] = useState(false);
  useEffect(() => {
    const check = () => setIsLive(Date.parse(PRESALE_TARGET) - Date.now() <= 0);
    check();
    const interval = window.setInterval(check, 1000);
    return () => window.clearInterval(interval);
  }, []);
  if (!isLive) {
    return (
      <button disabled className="inline-flex cursor-not-allowed items-center rounded-full border border-[#75ddff]/30 bg-[#75ddff]/5 px-5 py-3.5 font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#75ddff]/40" title="Contract will be live after presale starts">
        Buy Now <LockKeyhole size={13} className="ml-1" />
      </button>
    );
  }
  return (
    <a href={externalLinks.bscScan} target="_blank" rel="noreferrer" className="button-glow inline-flex items-center rounded-full bg-[#5bdcff] px-5 py-3.5 font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#21113b]">
      Buy Now <ArrowUpRight size={15} className="ml-1" />
    </a>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-scene relative overflow-hidden border-b border-[#9d78ce]/20 pt-[112px]" data-testid="section-hero">
      <div className="relative mx-auto grid min-h-[720px] max-w-[1240px] items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:px-10 lg:pb-20">
        <div className="reveal relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8edfff]/30 bg-[#75ddff]/10 px-3 py-2 font-mono-custom text-[9px] uppercase tracking-[.17em] text-[#8fe8ff]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7de5ff]" /> the internet's luckiest cat</div>
          <h1 className="font-display text-[65px] font-bold leading-[.86] tracking-[-.09em] text-[#fbf3ff] sm:text-[93px]">Meta<br /><span className="bg-gradient-to-r from-[#73e1ff] via-[#bba2ff] to-[#f2a4df] bg-clip-text text-transparent">Paws</span></h1>
          <p className="mt-6 max-w-[480px] font-display text-[22px] font-medium leading-tight text-[#eadcf8] sm:text-[28px]">Play. Win. Rescue.</p>
          <p className="mt-4 max-w-[470px] text-[14px] leading-[1.8] text-[#b9a7d2] sm:text-[16px]">A meme coin with a real pawpose. Daily lottery, pet charity, and transparent tokenomics.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={externalLinks.telegram} target="_blank" rel="noreferrer" className="button-glow inline-flex items-center rounded-full bg-[#75ddff] px-5 py-3.5 font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#21113b]" data-testid="link-telegram-hero">Join Telegram <ArrowUpRight size={15} className="ml-1" /></a>
             <a href={externalLinks.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-[#efb2e6]/55 bg-white/5 px-5 py-3.5 font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#f7e8ff] transition hover:bg-white/10" data-testid="link-twitter-hero">Follow Twitter <ArrowUpRight size={15} className="ml-1" /></a>
             <a href={externalLinks.whitepaper} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-[#74defb]/35 bg-[#74defb]/5 px-5 py-3.5 font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#bdefff] transition hover:border-[#74defb] hover:bg-[#74defb]/10" data-testid="link-whitepaper-hero">Whitepaper <ArrowUpRight size={15} className="ml-1" /></a>
          </div>
        </div>
          <div className="relative flex min-h-[460px] items-center justify-center lg:min-h-[590px]" data-testid="hero-art">
          <div className="orbit absolute h-[370px] w-[370px] border-dashed border-[#b98bff]/25 sm:h-[500px] sm:w-[500px]" />
          <div className="orbit absolute h-[260px] w-[260px] border-[#71ddff]/25 sm:h-[370px] sm:w-[370px]" />
          <div className="absolute h-[230px] w-[230px] rounded-full bg-[#7754d4]/25 blur-3xl sm:h-[340px] sm:w-[340px]" />
            <div className="countdown-hero-panel absolute right-[1%] top-[8%] z-10 w-full max-w-[450px] rotate-[2deg]" data-testid="hero-presale-panel">
              <div className="countdown-hero-panel__header"><span>presale / live signal</span><Sparkles size={13} /></div>
              <div className="countdown-hero-panel__rings"><Countdown compact /></div>
              <div className="countdown-hero-panel__footer"><span>MPAW / countdown archive</span><span className="text-[#74defb]">01 — 05</span></div>
            </div>
            <div className="hero-logo-core float-slow absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2" data-testid="hero-logo-core">
              <div className="hero-logo-core__halo" />
              <div className="hero-logo-core__ring hero-logo-core__ring--outer" />
              <div className="hero-logo-core__ring hero-logo-core__ring--inner" />
              <img src={catHero} alt="Meta Paws central cat logo" className="hero-logo-core__image" data-testid="img-central-logo" />
              <span className="hero-logo-core__label">MPAW / CENTRAL PAW</span>
            </div>
            <div className="image-card float absolute bottom-[3%] left-[1%] z-30 w-[112px] rotate-[-10deg] bg-[#28184d] p-1.5 sm:bottom-[5%] sm:left-[2%] sm:w-[148px]">
             <img src={catBadge} alt="Meta Paws cat mascot wearing sunglasses" className="h-[136px] w-full rounded-[1.2rem] object-cover sm:h-[178px]" data-testid="img-hero-mascot" />
             <div className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-[#1b1239]/75 px-2 py-1 font-mono-custom text-[7px] uppercase tracking-[.12em] text-[#e9ddf7] backdrop-blur-md">MPAW / orbit 01</div>
           </div>
           <div className="glass absolute right-[2%] top-[8%] z-30 rounded-2xl px-3 py-2 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#91e9ff] sm:right-[8%]">MPAW / 001 <Sparkles size={12} className="ml-1 inline" /></div>
           <div className="absolute bottom-[14%] right-[1%] z-20 rounded-2xl border border-[#f0a9e4]/40 bg-[#ed9fdc]/15 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[.1em] text-[#f7d8f3] backdrop-blur-md sm:bottom-[16%] sm:right-[5%]">MPAW</div>
          </div>
      </div>
      <div className="relative border-y border-white/10 bg-[#0c0820]/45 py-3"><div className="ticker marquee flex w-max items-center gap-10 font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#c2b0dc]"><span>community first</span><span className="text-[#76defb]">daily lottery</span><span className="text-[#efaae0]">pet charity</span><span className="text-[#f7d27c]">locked liquidity</span><span>community first</span><span className="text-[#76defb]">daily lottery</span><span className="text-[#efaae0]">pet charity</span><span className="text-[#f7d27c]">locked liquidity</span></div></div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="section-night relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32" data-testid="section-features">
      <div className="absolute -right-36 top-16 h-[430px] w-[430px] rounded-full bg-[#7642aa]/15 blur-3xl" />
      <div className="relative mx-auto max-w-[1120px]">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#73ddfa]">01 / the night garden</p><h2 className="mt-4 font-display text-[48px] font-bold leading-[.9] tracking-[-.08em] text-[#fbf3ff] sm:text-[70px]">Good things<br /><span className="text-[#e9a4dd]">grow here.</span></h2></div><p className="max-w-[310px] text-[14px] leading-[1.75] text-[#b5a3cd]">A playful ecosystem built around chance, care, and a community that knows how to have fun.</p></div>
         <div className="feature-infographic" data-testid="feature-visual-module">
           <div className="feature-infographic__connector feature-infographic__connector--vertical" />
           <div className="feature-infographic__connector feature-infographic__connector--horizontal" />
           <div className="feature-hub">
             <div className="feature-hub__icon"><PawPrint size={28} /></div>
             <span className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#f8efff]">Meta Paws</span>
             <strong className="font-display text-[20px] leading-none text-[#74defb]">ecosystem</strong>
             <div className="mt-3 flex gap-1.5"><i className="signal-dot signal-dot--cyan" /><i className="signal-dot signal-dot--pink" /><i className="signal-dot signal-dot--gold" /><i className="signal-dot signal-dot--violet" /></div>
           </div>
           <div className="feature-infographic__grid">
             {features.map((feature, index) => {
               const Icon = feature.icon;
               return <article key={feature.title} className={`feature-blueprint feature-blueprint--${feature.accent}`} data-testid={`card-feature-${index + 1}`}>
                 <div className="feature-blueprint__cap"><span className="feature-blueprint__index">0{index + 1}</span><Icon size={23} strokeWidth={1.5} /></div>
                 <div className="font-mono-custom text-[9px] uppercase tracking-[.17em] text-[#a999be]">feature / signal</div>
                 <h3 className="mt-2 font-display text-[23px] font-bold tracking-[-.05em] text-[#f8edff]">{feature.title}</h3>
                 <p className="mt-2 text-[13px] leading-[1.65] text-[#b9a8cf]">{feature.copy}</p>
                 <button onClick={() => scrollToId('#contact')} className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[.1em] text-[#eadef7] transition hover:border-[#76defb]/60 hover:text-[#76defb]" data-testid={`button-feature-${index + 1}`}>Learn more <ArrowUpRight size={13} className="ml-1" /></button>
               </article>;
             })}
           </div>
         </div>
      </div>
    </section>
  );
}

function Tokenomics() {
  return (
    <section id="tokenomics" className="section-dusk line-art px-5 py-24 sm:px-8 lg:py-32" data-testid="section-tokenomics">
      <div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#f0b2e3]">02 / receipts on the table</p><h2 className="mt-4 font-display text-[48px] font-bold leading-[.9] tracking-[-.08em] text-[#f8efff] sm:text-[69px]">Transparent<br /><span className="text-[#74defb]">by design.</span></h2></div><p className="max-w-[340px] text-[14px] leading-[1.75] text-[#b9a9cf]">10,000,000,000 MPAW total supply. Every category has a job, and every number is right here.</p></div>
          <div className="mt-12">
           <div className="tokenomics-board" data-testid="tokenomics-visual-module">
             <div className="tokenomics-board__eyebrow">allocation map / fixed supply</div>
             <div className="token-wheel" data-testid="allocation-bar">
               <div className="token-wheel__core"><PawPrint size={26} /><strong>MPAW</strong><span>10B supply</span></div>
             </div>
             <div className="tokenomics-board__labels">
                {allocations.slice(0, 6).map((item, index) => <div className="token-chip" key={item.label} style={{ '--chip-color': item.color } as CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><div><b>{item.label}</b><small>{item.amount} tokens</small></div><strong>{item.value}%</strong></div>)}
             </div>
              <div className="mt-7 flex flex-col gap-2 border-t border-white/10 px-1 pt-5 font-mono-custom text-[8px] uppercase tracking-[.13em] text-[#a797bc] sm:flex-row sm:items-center sm:justify-between"><span>six locked lanes / no hidden allocations</span><span className="text-[#f7d27c]">10B MPAW total supply</span></div>
           </div>
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return <section id="roadmap" className="section-night relative px-5 py-24 sm:px-8 lg:py-32" data-testid="section-roadmap"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#74defb]">03 / where we're going</p><h2 className="mt-4 font-display text-[48px] font-bold leading-[.9] tracking-[-.08em] text-[#f9efff] sm:text-[68px]">A roadmap with<br /><span className="text-[#efa6df]">real pawprints.</span></h2></div><p className="max-w-[300px] text-[14px] leading-[1.75] text-[#b9a7d2]">One playful step at a time, with the community along for the ride.</p></div><div className="roadmap-layout mt-14" data-testid="roadmap-visual-module"><div className="roadmap-graphic"><div className="roadmap-graphic__rail" />{roadmap.map(({ phase, title, copy, icon: Icon }, index) => <article className={`roadmap-step roadmap-step--${index + 1}`} key={phase} data-testid={`card-roadmap-${phase}`}><div className="roadmap-step__number">{phase}</div><div className="roadmap-step__icon"><Icon size={19} /></div><div><strong>{title}</strong><p>{copy}</p><span>{index === 0 ? 'in motion' : 'next horizon'}</span></div></article>)}</div></div></div></section>;
}

 function Airdrop() {
  return <section id="airdrop" className="section-rose relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32" data-testid="section-airdrop"><div className="absolute -right-36 -top-36 h-[500px] w-[500px] rounded-full border-[1px] border-[#ef9edc]/20 shadow-[0_0_100px_rgba(239,158,220,.12)]" /><div className="absolute -bottom-48 -left-48 h-[520px] w-[520px] rounded-full border-[1px] border-[#71defd]/20" /><div className="relative mx-auto max-w-[900px]"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#74defb]">04 / early supporter rewards</p><h2 className="mt-4 max-w-[650px] font-display text-[49px] font-bold leading-[.9] tracking-[-.08em] text-[#f9efff] sm:text-[72px]">Airdrop —<br /><span className="text-[#efa5df]">Early Supporters</span></h2><p className="mt-6 max-w-[500px] text-[15px] leading-[1.75] text-[#c2b1d3]">Only 5,000 spots available. Complete tasks to earn free MPAW.</p><p className="mt-5 max-w-[500px] text-[15px] leading-[1.75] text-[#c2b1d3]">Top 10 referrers get <strong className="text-[#f7d27c]">3,000,000 MPAW each!</strong></p><div className="airdrop-ladder mt-9" data-testid="airdrop-visual-module"><div className="airdrop-ladder__line" />{[['First 1,000', '50,000 MPAW'], ['Next 1,000', '25,000 MPAW'], ['Next 1,000', '12,500 MPAW'], ['Next 2,000', '6,250 MPAW']].map(([tier, reward], index) => <div className={`airdrop-step airdrop-step--${index + 1}`} key={`${tier}-${index}`}><div className="airdrop-step__number">{index + 1}</div><div className="airdrop-step__copy"><strong>{tier}</strong><span>{reward}</span></div><div className="airdrop-step__spark">{index === 0 ? <Gift size={18} /> : <Sparkles size={17} />}</div></div>)}</div><a href={externalLinks.form} target="_blank" rel="noreferrer" className="button-glow mt-7 inline-flex items-center rounded-full bg-[#75ddff] px-5 py-3.5 font-display text-[11px] font-bold uppercase tracking-[.08em] text-[#201137]" data-testid="link-airdrop-form">Claim Your Free MPAW <ArrowUpRight size={15} className="ml-1" /></a></div></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const submit = (event: FormEvent) => { event.preventDefault(); if (name.trim() && email.trim()) setSent(true); };
  return <section id="contact" className="relative overflow-hidden rounded-t-[3rem] bg-[#0c0820] px-5 py-20 sm:px-8 lg:py-28" data-testid="section-contact"><div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[.76fr_1.24fr] lg:items-center"><div className="relative overflow-hidden rounded-[2rem] border border-[#efa5df]/35 bg-gradient-to-br from-[#412467] to-[#1b123b] p-7 sm:p-10"><div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#ef9fdd]/15 blur-2xl" /><p className="relative font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#74defb]">05 / stay in the loop</p><h2 className="relative mt-4 font-display text-[48px] font-bold leading-[.86] tracking-[-.08em] text-[#f9efff] sm:text-[65px]">Play.<br /><span className="text-[#74defb]">Win.</span><br />Rescue.</h2><p className="relative mt-6 max-w-[360px] text-[14px] leading-[1.7] text-[#bfaed0]">Meta Paws can help you play, win, and rescue with our unique meme coin ecosystem.</p><div className="relative mt-8 flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#efa5df]"><ShieldCheck size={15} /> community signal active</div></div><div className="glass rounded-[2rem] p-5 sm:p-8">{sent ? <div className="flex min-h-[260px] flex-col items-center justify-center text-center" data-testid="status-contact-success"><div className="grid h-16 w-16 place-items-center rounded-full bg-[#75ddff]/15 text-[#75ddff]"><Check size={29} /></div><h3 className="mt-5 font-display text-2xl font-bold text-[#f9efff]">You're on the list.</h3><p className="mt-2 text-sm text-[#b9a8c9]">The MPAW team will be in touch soon.</p></div> : <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" data-testid="form-contact"><label className="font-mono-custom text-[9px] uppercase tracking-[.1em] text-[#bca9cd]">Name<input value={name} onChange={(event) => setName(event.target.value)} required className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 font-sans text-sm text-[#f9efff] outline-none placeholder:text-[#877a99] focus:border-[#75ddff]" placeholder="A fellow pawrson" data-testid="input-contact-name" /></label><label className="font-mono-custom text-[9px] uppercase tracking-[.1em] text-[#bca9cd]">Email<input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 font-sans text-sm text-[#f9efff] outline-none placeholder:text-[#877a99] focus:border-[#75ddff]" placeholder="hello@you.com" data-testid="input-contact-email" /></label><div className="flex items-center justify-between sm:col-span-2"><span className="text-[11px] text-[#8f809d]">Newsletter + early access.</span><button type="submit" className="button-glow inline-flex items-center rounded-full bg-[#efa5df] px-6 py-3 font-display text-[11px] font-bold uppercase tracking-[.08em] text-[#241338]" data-testid="button-contact-submit">Submit <Send size={14} className="ml-1" /></button></div></form>}</div></div></section>;
}

function SocialLinks() {
  return <section className="social-strip px-5 py-10 sm:px-8" data-testid="section-social-links"><div className="mx-auto flex max-w-[1240px] flex-col gap-5 rounded-[2rem] border border-[#7cdfff]/20 bg-[#15102f]/70 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#74defb]">official channels</p><p className="mt-2 text-sm text-[#bca9cd]">Follow the pack, read the whitepaper, and stay close to the pawpose.</p></div><div className="flex flex-wrap items-center gap-2"><a href={externalLinks.whitepaper} target="_blank" rel="noreferrer" className="social-link social-link--primary" data-testid="link-social-whitepaper">Whitepaper <ArrowUpRight size={13} /></a><a href={externalLinks.telegram} target="_blank" rel="noreferrer" className="social-link" data-testid="link-social-telegram">Telegram</a><a href={externalLinks.twitter} target="_blank" rel="noreferrer" className="social-link" data-testid="link-social-twitter">X</a><a href={externalLinks.instagram} target="_blank" rel="noreferrer" className="social-link" data-testid="link-social-instagram">Instagram</a><a href={externalLinks.discord} target="_blank" rel="noreferrer" className="social-link" data-testid="link-social-discord">Discord</a><a href={externalLinks.tiktok} target="_blank" rel="noreferrer" className="social-link" data-testid="link-social-tiktok">TikTok</a><a href={externalLinks.email} className="social-link" data-testid="link-social-email">Email</a></div></div></section>;
}

function Footer() {
  return <footer className="border-t border-white/10 bg-[#0a0719] px-5 pb-8 pt-12 text-[#f8efff] sm:px-8"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row"><div><button onClick={() => scrollToId('#top')} className="flex items-center gap-2.5" data-testid="button-footer-home"><BrandMark /><span className="font-display text-[16px] font-bold tracking-[-.04em]">META <span className="text-[#74defb]">PAWS</span></span></button><p className="mt-4 max-w-[300px] text-sm leading-relaxed text-[#9585a7]">A meme coin with a pawpose.</p></div><div className="flex flex-wrap gap-x-7 gap-y-3 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#bca9cd]">{navLinks.map((link) => <button key={link.href} onClick={() => scrollToId(link.href)} className="transition hover:text-[#75ddff]" data-testid={`link-footer-${link.label.toLowerCase()}`}>{link.label}</button>)}<button onClick={() => scrollToId('#contact')} className="transition hover:text-[#75ddff]" data-testid="link-footer-contact">Contact</button></div></div><div className="flex flex-col justify-between gap-3 pt-7 font-mono-custom text-[9px] uppercase tracking-[.1em] text-[#766a85] sm:flex-row"><span>© 2026 Meta Paws. A meme coin with a pawpose.</span><span className="flex items-center gap-4"><a href={externalLinks.twitter} target="_blank" rel="noreferrer" data-testid="link-footer-twitter">Twitter</a><a href={externalLinks.telegram} target="_blank" rel="noreferrer" data-testid="link-footer-telegram">Telegram</a><a href={externalLinks.instagram} target="_blank" rel="noreferrer" aria-label="Meta Paws on Instagram" data-testid="link-footer-instagram"><Instagram size={13} /></a><a href={externalLinks.discord} target="_blank" rel="noreferrer" data-testid="link-footer-discord">Discord</a></span></div></div></footer>;
}

function Home() {
  return <div className="noise site-shell min-h-[100dvh]"><Nav /><main><Hero /><Features /><Tokenomics /><Roadmap /><Airdrop /><Contact /><SocialLinks /></main><Footer /></div>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;