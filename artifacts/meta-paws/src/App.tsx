import { useEffect, useState, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Gift,
  Heart,
  Instagram,
  LockKeyhole,
  Menu,
  MessageCircle,
  PawPrint,
  Rocket,
  ShieldCheck,
  Ticket,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const PRESALE_TARGET = '2026-10-05T09:43:13Z';
const externalLinks = {
  telegram: 'https://example.com/telegram',
  twitter: 'https://example.com/twitter',
  instagram: 'https://example.com/instagram',
  discord: 'https://example.com/discord',
  form: 'https://forms.gle/your-google-form-link-here',
};

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Features', href: '#features' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Airdrop', href: '#airdrop' },
];

const allocations = [
  { label: 'Presale', value: 30, amount: '3,000,000,000', color: '#f36b2b' },
  { label: 'Locked (vesting)', value: 40, amount: '4,000,000,000', color: '#ffda55' },
  { label: 'Initial Liquidity', value: 15, amount: '1,500,000,000', color: '#8172dc' },
  { label: 'Lottery & Charity', value: 5, amount: '500,000,000', color: '#d89c77' },
  { label: 'Team & Development', value: 5, amount: '500,000,000', color: '#332950' },
  { label: 'Marketing (immediate)', value: 5, amount: '500,000,000', color: '#63b8a4' },
];

const features = [
  {
    title: 'Daily Lottery',
    emoji: '🎰',
    copy: '2% of every transaction goes to the lottery pool. Every day, one lucky winner takes the prize.',
    button: 'bg-[#f36b2b]',
  },
  {
    title: 'Pet Charity',
    emoji: '🐾💚',
    copy: '1% of every transaction supports real animal shelters. Memes with a mission.',
    button: 'bg-[#ffda55] text-[#332950]',
  },
  {
    title: 'Locked & Transparent',
    emoji: '🔒',
    copy: '40% of supply locked for 90 days, then released monthly over 20 months. No team dump.',
    button: 'bg-[#332950]',
  },
  {
    title: 'Airdrop Rewards',
    emoji: '🎁',
    copy: 'Early supporters and presale buyers can earn free MPAW through our multi-stage airdrop program.',
    button: 'bg-[#f36b2b]',
  },
];

const roadmap = [
  { phase: '01', title: 'Paw Launch', copy: 'Presale & Community, early supporter airdrop.', icon: PawPrint },
  { phase: '02', title: 'Lottery Paws', copy: 'Daily lottery contract activation, transparent draws.', icon: Ticket },
  { phase: '03', title: 'Rescue Mission', copy: 'Official partnerships with animal shelters, monthly charity reports.', icon: Heart },
  { phase: '04', title: 'Meta Paws World', copy: 'Future ecosystem expansion (details to be announced).', icon: Rocket },
];

function scrollToId(id: string, close?: () => void) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  close?.();
}

function Mascot() {
  return (
    <div className="relative flex h-[330px] w-full max-w-[440px] items-center justify-center sm:h-[390px]" aria-label="Cute Persian cat mascot wearing sunglasses and holding a lottery ticket">
      <div className="absolute h-[250px] w-[250px] rounded-full bg-[#ffda55] opacity-70 blur-[1px] sm:h-[320px] sm:w-[320px]" />
      <span className="star left-[8%] top-[17%]" />
      <span className="star right-[10%] top-[11%]" />
      <span className="star right-[3%] bottom-[26%]" />
      <span className="star left-[7%] bottom-[19%]" />
      <div className="relative z-10 text-center">
        <div className="text-[132px] leading-none drop-shadow-[6px_7px_0_#332950] sm:text-[170px]">😎</div>
        <div className="-mt-5 text-[108px] leading-none sm:-mt-8 sm:text-[140px]">🐱</div>
        <div className="absolute -right-4 top-[46%] rotate-[10deg] rounded-lg border-2 border-[#332950] bg-[#ffda55] px-3 py-2 text-left font-mono-custom text-[9px] font-bold leading-tight text-[#332950] shadow-[4px_4px_0_#332950] sm:right-0 sm:px-4 sm:py-3 sm:text-[11px]">
          DAILY DRAW
          <span className="block text-[#f36b2b]">MPAW ✦</span>
          <small className="block mt-1 font-normal">YOU COULD WIN</small>
        </div>
      </div>
      <div className="absolute bottom-[5%] left-[5%] -rotate-12 rounded-full border-2 border-[#332950] bg-[#ffda55] px-4 py-3 text-2xl shadow-[4px_4px_0_#332950]">🐾</div>
      <div className="absolute bottom-[7%] right-[5%] rotate-[10deg] rounded-full border-2 border-[#332950] bg-[#f36b2b] px-4 py-2 font-mono-custom text-[10px] font-bold text-[#fff8e9] shadow-[4px_4px_0_#332950]">PERSIAN POWER</div>
    </div>
  );
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

function Countdown() {
  const [left, setLeft] = useState(timeLeft);
  useEffect(() => {
    const interval = window.setInterval(() => setLeft(timeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <div className="mt-7">
      <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#927c7c]">Presale starts in:</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {Object.entries(left).map(([unit, value]) => (
          <div key={unit} className="min-w-[58px] rounded-xl border border-[#f0b878] bg-[#fff8e9] px-2 py-2 text-center shadow-[2px_3px_0_#f0b878] sm:min-w-[70px]">
            <div className="font-display text-[24px] font-bold leading-none text-[#332950]">{String(value).padStart(2, '0')}</div>
            <div className="mt-1 font-mono-custom text-[8px] uppercase tracking-[.14em] text-[#826e73]">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar fixed inset-x-0 top-0 z-50 border-b border-[#eadcc9]">
      <div className="mx-auto flex h-[73px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <button onClick={() => scrollToId('#top')} className="group flex items-center gap-2.5" data-testid="button-brand-home">
          <span className="grid h-10 w-10 rotate-[-8deg] place-items-center rounded-[13px] border-2 border-[#332950] bg-[#f36b2b] text-lg shadow-[3px_3px_0_#332950] transition-transform group-hover:rotate-[5deg]">🐾</span>
          <span className="font-display text-[21px] font-bold tracking-[-.06em] text-[#332950]">META <span className="text-[#f36b2b]">PAWS</span></span>
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => <button key={link.href} onClick={() => scrollToId(link.href)} className="text-[12px] font-semibold text-[#66586b] transition-colors hover:text-[#f36b2b]" data-testid={`link-nav-${link.label.toLowerCase()}`}>{link.label}</button>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={externalLinks.telegram} target="_blank" rel="noreferrer" className="rounded-full p-2 text-[#66586b] transition hover:bg-[#f7e6ca] hover:text-[#332950]" aria-label="Join Meta Paws on Telegram"><MessageCircle size={18} /></a>
          <a href={externalLinks.twitter} target="_blank" rel="noreferrer" className="rounded-full p-2 text-[#66586b] transition hover:bg-[#f7e6ca] hover:text-[#332950]" aria-label="Follow Meta Paws on Twitter"><span className="text-sm font-bold">𝕏</span></a>
          <button onClick={() => scrollToId('#airdrop')} className="button-pop rounded-full border-2 border-[#332950] bg-[#332950] px-5 py-2.5 font-display text-[12px] font-bold uppercase tracking-[.08em] text-[#fff8e9]">Get the airdrop <ArrowUpRight size={15} className="ml-1 inline" /></button>
        </div>
        <button className="rounded-lg p-2 text-[#332950] md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-[#eadcc9] bg-[#fff8e9] px-5 py-5 md:hidden"><nav className="flex flex-col gap-4">{navLinks.map((link) => <button key={link.href} className="text-left font-display text-lg font-semibold text-[#332950]" onClick={() => scrollToId(link.href, () => setOpen(false))}>{link.label}</button>)}</nav><button onClick={() => scrollToId('#airdrop', () => setOpen(false))} className="mt-5 w-full rounded-full border-2 border-[#332950] bg-[#f36b2b] py-3 font-display font-bold text-[#fff8e9]">Join the airdrop</button></div>}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative grid-paper overflow-hidden border-b border-[#eadcc9] bg-[#fff8e9] pt-[126px]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:px-8 lg:pb-24">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f0b878] bg-[#fff1d5] px-3 py-2 font-mono-custom text-[10px] font-medium uppercase tracking-[.14em] text-[#9c4f2b]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#f36b2b]" /> the internet’s luckiest cat</div>
          <h1 className="font-display text-[64px] font-bold leading-[.9] tracking-[-.08em] text-[#332950] sm:text-[92px]">Meta <span className="text-[#f36b2b]">Paws</span></h1>
          <p className="mt-4 font-display text-[28px] font-semibold tracking-[-.05em] text-[#332950] sm:text-[38px]">Play. Win. Rescue.</p>
          <p className="mt-6 max-w-[510px] text-[16px] leading-[1.65] text-[#66586b] sm:text-[18px]">A meme coin with a real pawpose. Daily lottery, pet charity, and transparent tokenomics.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={externalLinks.telegram} target="_blank" rel="noreferrer" className="button-pop rounded-full border-2 border-[#332950] bg-[#f36b2b] px-6 py-3.5 font-display text-[13px] font-bold uppercase tracking-[.08em] text-[#fff8e9] shadow-[4px_5px_0_#332950]">Join Telegram <ArrowUpRight size={16} className="ml-1 inline" /></a>
            <a href={externalLinks.twitter} target="_blank" rel="noreferrer" className="outline-pop rounded-full border-2 border-[#332950] bg-transparent px-6 py-3.5 font-display text-[13px] font-bold uppercase tracking-[.08em] text-[#332950]">Follow Twitter <ArrowUpRight size={16} className="ml-1 inline" /></a>
          </div>
          <Countdown />
        </div>
        <div className="hero-visual reveal-2 relative flex items-center justify-center lg:justify-end"><div className="absolute right-[4%] top-[2%] font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#927c7c]">MPAW / orbit 01</div><Mascot /></div>
      </div>
      <div className="border-t border-[#eadcc9] bg-[#332950] py-3.5 text-[#fff8e9]"><div className="ticker marquee flex w-max items-center gap-10 font-mono-custom text-[10px] uppercase tracking-[.17em]"><span>✦ community first</span><span>✦ daily lottery</span><span>✦ pet charity</span><span>✦ locked liquidity</span><span>✦ community first</span><span>✦ daily lottery</span><span>✦ pet charity</span><span>✦ locked liquidity</span></div></div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="bg-[#f36b2b] px-5 py-20 text-[#fff8e9] sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-14 max-w-[560px]"><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ffdca9]">01 / why mpaw</p><h2 className="mt-4 font-display text-[48px] font-bold leading-[.95] tracking-[-.07em] sm:text-[67px]">The good stuff<br /><span className="text-[#ffda55]">in every paw.</span></h2></div>
        <div className="space-y-5">
          {features.map((feature, index) => (
            <article key={feature.title} className={`grid items-center gap-6 rounded-[24px] border-2 border-[#ffab60] bg-[#ee6328] p-5 sm:p-7 md:grid-cols-2 ${index % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="flex min-h-[170px] items-center justify-center rounded-2xl border border-[#ffab60] bg-[#d95b28] text-[75px] sm:text-[95px]" aria-hidden="true">{feature.emoji}</div>
              <div className={index % 2 ? 'md:pr-8' : 'md:pl-8'}><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#ffc991]">0{index + 1} / feature</div><h3 className="mt-3 font-display text-[30px] font-bold tracking-[-.05em]">{feature.title}</h3><p className="mt-3 max-w-[430px] text-[15px] leading-[1.6] text-[#ffe7c7]">{feature.copy}</p><a href="#contact" className={`mt-5 inline-flex items-center rounded-full border-2 border-[#332950] px-4 py-2.5 font-display text-[11px] font-bold uppercase tracking-[.08em] text-[#fff8e9] shadow-[3px_3px_0_#332950] transition hover:-translate-y-0.5 ${feature.button}`}>Learn More <ArrowUpRight size={14} className="ml-1" /></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tokenomics() {
  return (
    <section id="tokenomics" className="bg-[#f7e6ca] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#9c4f2b]">02 / receipts on the table</p><h2 className="mt-4 font-display text-[48px] font-bold leading-[.95] tracking-[-.07em] text-[#332950] sm:text-[66px]">Transparent<br /><span className="text-[#f36b2b]">by design.</span></h2></div><p className="max-w-[330px] text-[15px] leading-[1.6] text-[#75666e]">10,000,000,000 MPAW total supply. Every category has a job, and every number is right here.</p></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[.9fr_1.1fr]"><div className="rounded-[25px] border-2 border-[#332950] bg-[#fff8e9] p-6 shadow-[7px_7px_0_#332950] sm:p-8"><div className="flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.17em] text-[#927c7c]">total supply</span><span className="rounded-full bg-[#ffda55] px-3 py-1 font-mono-custom text-[10px] font-bold text-[#332950]">fixed</span></div><p className="mt-4 font-display text-[39px] font-bold tracking-[-.08em] text-[#332950] sm:text-[54px]">10,000,000,000</p><p className="font-mono-custom text-[11px] uppercase tracking-[.12em] text-[#927c7c]">MPAW tokens</p><div className="mt-10 flex h-5 overflow-hidden rounded-full border-2 border-[#332950]">{allocations.map((item) => <span key={item.label} style={{ width: `${item.value}%`, backgroundColor: item.color }} />)}</div><p className="mt-4 text-[13px] leading-relaxed text-[#75666e]">No hidden allocations. No team dump. Just a clear plan for the community.</p></div>
          <div className="space-y-3">{allocations.map((item) => <div key={item.label} className="group flex items-center gap-4 rounded-2xl border border-[#eadcc9] bg-[#fff8e9] p-4 transition hover:translate-x-1 hover:border-[#f36b2b] sm:p-5"><div className="h-11 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /><div className="min-w-0 flex-1"><div className="flex items-baseline justify-between gap-3"><h3 className="font-display text-[16px] font-bold text-[#332950]">{item.label}</h3><strong className="font-display text-[21px] text-[#332950]">{item.value}%</strong></div><p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#927c7c]">{item.amount} tokens</p></div></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return <section id="roadmap" className="bg-[#fff8e9] px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#9c4f2b]">03 / where we’re going</p><h2 className="mt-4 font-display text-[48px] font-bold leading-[.95] tracking-[-.07em] text-[#332950] sm:text-[66px]">A roadmap with<br /><span className="text-[#f36b2b]">real pawprints.</span></h2></div><p className="max-w-[300px] text-[15px] leading-[1.6] text-[#75666e]">One playful step at a time, with the community along for the ride.</p></div><div className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{roadmap.map(({ phase, title, copy, icon: Icon }, index) => <div key={phase} className="card-lift relative rounded-2xl border-2 border-[#eadcc9] bg-[#f7e6ca] p-5"><div className="mb-12 flex items-start justify-between"><div className={`grid h-11 w-11 place-items-center rounded-xl border-2 border-[#332950] ${index === 0 ? 'bg-[#f36b2b] text-[#fff8e9]' : 'bg-[#ffda55] text-[#332950]'}`}><Icon size={19} /></div><span className="font-mono-custom text-[10px] text-[#927c7c]">PHASE {phase}</span></div><h3 className="font-display text-[22px] font-bold leading-tight text-[#332950]">{title}</h3><p className="mt-3 min-h-[67px] text-[13px] leading-[1.55] text-[#75666e]">{copy}</p>{index < roadmap.length - 1 && <div className="step-line absolute -right-[18px] top-10 hidden h-1 w-4 lg:block" />}</div>)}</div></div></section>;
}

function Airdrop() {
  return <section id="airdrop" className="relative overflow-hidden bg-[#332950] px-5 py-20 text-[#fff8e9] sm:px-8 lg:py-28"><div className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border-[45px] border-[#44365e]" /><div className="absolute -bottom-36 -left-24 h-[420px] w-[420px] rounded-full border-[60px] border-[#44365e]" /><div className="relative mx-auto max-w-[1240px]"><div className="grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#c4b5cc]">04 / early supporter rewards</p><h2 className="mt-4 max-w-[650px] font-display text-[49px] font-bold leading-[.94] tracking-[-.07em] sm:text-[70px]">Airdrop —<br /><span className="text-[#ffda55]">Early Supporters</span></h2><p className="mt-6 max-w-[500px] text-[16px] leading-[1.65] text-[#cfc2d4]">Only 5,000 spots available. Complete tasks to earn free MPAW.</p><p className="mt-5 max-w-[500px] text-[15px] leading-[1.65] text-[#cfc2d4]">Top 10 referrers get <strong className="text-[#ffda55]">3,000,000 MPAW each!</strong></p></div><div className="rounded-[26px] border-2 border-[#ffda55] bg-[#fff8e9] p-5 text-[#332950] shadow-[8px_8px_0_#f36b2b] sm:p-7"><div className="flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-[#927c7c]">reward tiers</span><Gift size={22} className="text-[#f36b2b]" /></div><div className="mt-5 space-y-2">{[['First 1,000', '50,000 MPAW'], ['Next 1,000', '25,000 MPAW'], ['Next 1,000', '12,500 MPAW'], ['Next 2,000', '6,250 MPAW']].map(([tier, reward], i) => <div key={`${tier}-${i}`} className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${i === 0 ? 'border-[#f0b878] bg-[#fff1d5]' : 'border-[#eadcc9] bg-[#f7e6ca]'}`}><div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#332950] font-mono-custom text-[10px] font-bold text-[#ffda55]">0{i + 1}</div><p className="flex-1 font-display text-[14px] font-bold">{tier}</p><strong className="font-mono-custom text-[10px] text-[#f36b2b]">{reward}</strong></div>)}</div><a href={externalLinks.form} target="_blank" rel="noreferrer" className="button-pop mt-6 flex w-full items-center justify-center rounded-full border-2 border-[#332950] bg-[#f36b2b] px-5 py-3 font-display text-[12px] font-bold uppercase tracking-[.08em] text-[#fff8e9] shadow-[3px_3px_0_#332950]">I want to be among the first <ArrowUpRight size={15} className="ml-1" /></a></div></div></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const submit = (event: FormEvent) => { event.preventDefault(); if (name.trim() && email.trim()) setSent(true); };
  return <section id="contact" className="rounded-t-[4rem] bg-white px-5 py-20 sm:px-8 lg:py-24"><div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div className="rounded-[28px] border-2 border-[#332950] bg-[#ffda55] p-7 shadow-[6px_6px_0_#332950] sm:p-9"><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#775f32]">05 / stay in the loop</p><h2 className="mt-4 font-display text-[47px] font-bold leading-[.94] tracking-[-.07em] text-[#332950] sm:text-[63px]">Play.<br /><span className="text-[#f36b2b]">Win.</span><br />Rescue.</h2><p className="mt-6 max-w-[360px] text-[15px] leading-[1.6] text-[#66586b]">Meta Paws can help you play, win, and rescue with our unique meme coin ecosystem.</p></div><div className="rounded-[30px] border-2 border-[#332950] bg-[#332950] p-5 shadow-[8px_8px_0_#f36b2b] sm:p-8">{sent ? <div className="flex min-h-[250px] flex-col items-center justify-center text-center text-[#fff8e9]"><div className="grid h-16 w-16 place-items-center rounded-full bg-[#dff3e5] text-[#28754b]"><Check size={29} /></div><h3 className="mt-5 font-display text-2xl font-bold">You’re on the list.</h3><p className="mt-2 text-sm text-[#cfc2d4]">The MPAW team will be in touch soon.</p></div> : <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><label className="font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#cfc2d4]">Name<input value={name} onChange={(event) => setName(event.target.value)} required className="mt-2 w-full rounded-xl border border-[#615578] bg-[#44365e] px-3 py-3 font-sans text-sm text-[#fff8e9] outline-none placeholder:text-[#aa9eb3] focus:border-[#ffda55]" placeholder="A fellow pawrson" /></label><label className="font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#cfc2d4]">Email<input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" className="mt-2 w-full rounded-xl border border-[#615578] bg-[#44365e] px-3 py-3 font-sans text-sm text-[#fff8e9] outline-none placeholder:text-[#aa9eb3] focus:border-[#ffda55]" placeholder="hello@you.com" /></label><div className="flex items-center justify-between sm:col-span-2"><span className="text-[11px] text-[#a7959c]">Newsletter + early access.</span><button className="button-pop rounded-full border-2 border-[#ffda55] bg-[#f36b2b] px-6 py-3 font-display text-[12px] font-bold uppercase tracking-[.08em] text-[#fff8e9] shadow-[3px_3px_0_#ffda55]">Submit <ArrowUpRight size={15} className="ml-1 inline" /></button></div></form>}</div></div></section>;
}

function Footer() {
  return <footer className="bg-[#332950] px-5 pb-8 pt-14 text-[#fff8e9] sm:px-8"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-8 border-b border-[#51436c] pb-10 md:flex-row"><div><button onClick={() => scrollToId('#top')} className="flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-[13px] border-2 border-[#fff8e9] bg-[#f36b2b] text-lg">🐾</span><span className="font-display text-[21px] font-bold tracking-[-.06em]">META <span className="text-[#f36b2b]">PAWS</span></span></button><p className="mt-4 max-w-[300px] text-sm leading-relaxed text-[#b9a8c0]">A meme coin with a pawpose.</p></div><div className="flex flex-wrap gap-x-8 gap-y-3 text-[12px] font-semibold text-[#d4c7d8]">{navLinks.map((link) => <button key={link.href} onClick={() => scrollToId(link.href)} className="transition hover:text-[#ffda55]">{link.label}</button>)}<button onClick={() => scrollToId('#contact')} className="transition hover:text-[#ffda55]">Contact</button></div></div><div className="flex flex-col justify-between gap-3 pt-7 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#93839d] sm:flex-row"><span>© 2026 Meta Paws. A meme coin with a pawpose.</span><span className="flex items-center gap-3"><a href={externalLinks.twitter} target="_blank" rel="noreferrer">Twitter</a><a href={externalLinks.telegram} target="_blank" rel="noreferrer">Telegram</a><a href={externalLinks.instagram} target="_blank" rel="noreferrer"><Instagram size={13} /></a><a href={externalLinks.discord} target="_blank" rel="noreferrer">Discord</a></span></div></div></footer>;
}

function Home() {
  return <div className="noise site-shell min-h-[100dvh]"><Nav /><main><Hero /><Features /><Tokenomics /><Roadmap /><Airdrop /><Contact /></main><Footer /></div>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;