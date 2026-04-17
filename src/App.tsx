import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "react-i18next";
import './App.css'
import { Link } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/dist/fullpage.css';

const App: React.FC = () => {
    const { t } = useTranslation();

    const heroVideoRef = useRef<HTMLVideoElement | null>(null);
    const landingVideoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const videos = [heroVideoRef.current, landingVideoRef.current].filter(Boolean) as HTMLVideoElement[];

        const tryPlayAll = () => {
            for (const v of videos) {
                // Some browsers require the muted prop set on the element before play()
                v.muted = true;
                const p = v.play();
                if (p && typeof (p as Promise<void>).catch === 'function') {
                    (p as Promise<void>).catch(() => {
                        // Autoplay can be blocked until first user gesture; ignore.
                    });
                }
            }
        };

        // Try immediately (may succeed if autoplay is allowed)
        tryPlayAll();

        // Retry once we have a user gesture (common requirement on Windows/Chromium)
        const unlock = () => {
            tryPlayAll();
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('keydown', unlock);
            window.removeEventListener('touchstart', unlock);
        };

        window.addEventListener('pointerdown', unlock, { passive: true });
        window.addEventListener('keydown', unlock);
        window.addEventListener('touchstart', unlock, { passive: true });

        const onVisibility = () => {
            if (document.visibilityState === 'visible') tryPlayAll();
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('keydown', unlock);
            window.removeEventListener('touchstart', unlock);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    // Build options as `any` to match runtime fullpage.js config while avoiding strict prop typings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fullpageOptions: any = {
        licenseKey: 'gpl-v3',
        credits: { enabled: true },
        anchors: ['home', 'why-us', 'footer'],
        navigation: true,
        scrollingSpeed: 1100,
        autoScrolling: true,
        fitToSection: true,
        render: () => {
            return (
                <div className="App">
                    <ReactFullpage
                        debug
                        licenseKey="xxxxxxxxxxxxxxxxxxxxxxxxx"
                        credits={{ enabled: true }}
                        anchors={["home","why-us","footer"]}
                        navigation={true}
                        scrollingSpeed={1000}
                        fitToSectionDelay={600}
                        easingcss3="cubic-bezier(0.36, 0, 0.64, 1)"
                        loopTop={false}
                        loopHorizontal={false}
                        scrollOverflow={false}
                        controlArrows={false}
                        render={() => (
                            <div id="fullpage-wrapper" className="bg-white">

                                {/* ───────── HERO ───────── */}
                                <div
                                    className="section hero relative h-screen min-h-screen w-full bg-cover text-white flex flex-col justify-end"
                                >
                                    {/* Hero background video */}
                                    <video
                                        ref={heroVideoRef}
                                        className="hero-video absolute inset-0 w-full h-full object-cover z-0"
                                        autoPlay
                                        data-autoplay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        disableRemotePlayback
                                        poster="/videos/hero.png"
                                        aria-hidden="true"
                                    >
                                        <source src="/videos/hero.mp4" type="video/mp4" />
                                        <source src="/videos/hero.webm" type="video/webm" />
                                        <source src="/videos/hero.png" type="image/png" />
                                    </video>

                                    {/* Dark gradient overlay for contrast (darker mask) */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-black/40 to-black/80 z-10" />

                                    {/* Accent red line at top */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-red z-30" />

                                    <div className="absolute left-0 right-0 bottom-10 sm:bottom-12 md:bottom-16 z-20 px-6 md:px-16 w-full text-left flex flex-col items-start">
                                        <div className="max-w-2xl">
                                            <div className="w-16 h-1 bg-brand-red mb-8" />
                                            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 whitespace-pre-line tracking-tight">
                                                {t("app.slogan")}
                                            </h1>
                                            <p className="text-lg md:text-xl font-light text-white/80 max-w-xl mb-10 leading-relaxed">
                                                {t("app.description")}
                                            </p>
                                            <div className="flex flex-wrap gap-4 justify-start">
                                                <Link
                                                    to="https://qm.qq.com/q/NHfvVvAoyO"
                                                    className="inline-flex items-center gap-3 bg-brand-red text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-widest hover:bg-brand-red-dark transition-colors duration-200"
                                                >
                                                    {t('app.join_qq_btn')}
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14m-7-7 7 7-7 7" />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    to="https://discord.gg/xxc9NfetME"
                                                    className="inline-flex items-center gap-3 bg-brand-red text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-widest hover:bg-brand-red-dark transition-colors duration-200"
                                                >
                                                    {t('app.join_discord_btn')}
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14m-7-7 7 7-7 7" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => window.open("")}
                                                    className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors duration-200"
                                                >
                                                    {t("app.login")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ───────── WHYUS ───────── */}
                                <section className="section relative min-h-screen pt-16 md:pt-32 pb-0 md:pb-0 px-6 md:px-16 bg-cover bg-center flex items-end overflow-hidden">
                                    {/* Background video for WHYUS */}
                                    <video
                                        ref={landingVideoRef}
                                        className="hero-video absolute inset-0 w-full h-full object-cover z-0"
                                        autoPlay
                                        data-autoplay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        disableRemotePlayback
                                        poster="/videos/landing.png"
                                        aria-hidden="true"
                                    >
                                        <source src={"/videos/landing.mp4"} type="video/mp4" />
                                        <source src={"/videos/landing.webm"} type="video/webm" />
                                        <source src={"/videos/landing.png"} type="video/png" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Dark overlay so content is readable */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-black/40 to-black/80 z-10" />

                                    <div className="max-w-6xl mx-auto relative z-20 w-full h-full flex flex-col pb-[140px] md:pb-[220px]">
                                        <div className="w-12 h-1 bg-brand-red mb-4 md:mb-6" />
                                        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3 md:mb-4">
                                            {t("whyus.title")}
                                        </h2>
                                        <p className="text-sm md:text-base text-white/80 max-w-xl mb-0 leading-relaxed">
                                            {t("whyus.description")}
                                        </p>

                                        <div className="mt-auto" />
                                    </div>

                                    {/* absolute band: true bottom placement */}
                                    <div className="absolute left-0 right-0 bottom-6 md:bottom-12 z-30 pointer-events-auto">
                                        <div className="max-w-6xl mx-auto px-6 md:px-16">
                                            <div className="w-full bg-white/8 backdrop-blur-xs border border-white/10 rounded-lg overflow-hidden p-2 md:p-4 shadow-2xl">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                                                    <div className="p-4 md:p-8 border-b md:border-b-0 md:border-r border-white/10 text-white bg-transparent">
                                                        <h3 className="text-lg font-bold mb-3">{t("whyus.title1")}</h3>
                                                        <p className="text-sm leading-relaxed text-white/80">{t("whyus.description1")}</p>
                                                    </div>
                                                    <div className="p-4 md:p-8 border-b md:border-b-0 md:border-r border-white/10 text-white bg-transparent">
                                                        <h3 className="text-lg font-bold mb-3">{t("whyus.title2")}</h3>
                                                        <p className="text-sm leading-relaxed text-white/80">{t("whyus.description2")}</p>
                                                    </div>
                                                    <div className="p-4 md:p-8 text-white bg-transparent">
                                                        <h3 className="text-lg font-bold mb-3">{t("whyus.title3")}</h3>
                                                        <p className="text-sm leading-relaxed text-white/80">{t("whyus.description3")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* ───────── FULL-WIDTH CTA + FOOTER ───────── */}
                                <section className="section relative min-h-screen py-12 sm:py-16 md:py-24 px-6 md:px-16 bg-white overflow-hidden flex items-start">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-brand-red" />

                                    <div className="relative z-10 w-full max-w-6xl mx-auto text-slate-900">
                                        <div className="flex flex-col items-center text-center gap-8 md:gap-12">
                                            <div className="space-y-3">
                                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                                                    {t('footer.partners')}
                                                </h2>
                                            </div>

                                            {/* Partner logos row (auto marquee) */}
                                            <div className="w-full">
                                                <span className="sr-only">{t('footer.partners')}</span>

                                                <div className="partners-marquee">
                                                    <div className="partners-marquee__track">
                                                        {/* set A */}
                                                        <div className="partners-scroll flex gap-5 sm:gap-6 md:gap-8 pb-4 px-1">
                                                            <a target="_blank" rel="noopener noreferrer" href="https://vatsim.net" className="snap-center">
                                                                <div className="flex flex-col items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] md:min-w-[260px] border border-slate-200 rounded-2xl p-6 sm:p-7 bg-white shadow-sm">
                                                                    <img src="/imgs/vatsim_logo.png" alt="VATSIM" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
                                                                    <span className="text-sm sm:text-base font-semibold text-slate-800">VATSIM</span>
                                                                </div>
                                                            </a>
                                                            <a target="_blank" rel="noopener noreferrer" href="https://vatprc.net" className="snap-center">
                                                                <div className="flex flex-col items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] md:min-w-[260px] border border-slate-200 rounded-2xl p-6 sm:p-7 bg-white shadow-sm">
                                                                    <img src="/imgs/vatprc_logo.png" alt="VATPRC" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
                                                                    <span className="text-sm sm:text-base font-semibold text-slate-800">VATPRC</span>
                                                                </div>
                                                            </a>
                                                            <a target="_blank" rel="noopener noreferrer" href="https://www.zhongtaivirtual.com" className="snap-center">
                                                                <div className="flex flex-col items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] md:min-w-[260px] border border-slate-200 rounded-2xl p-6 sm:p-7 bg-white shadow-sm">
                                                                    <img src="/imgs/zhongtai_logo.png" alt="Zhongtai Virtual" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
                                                                    <span className="text-sm sm:text-base font-semibold text-slate-800">虚拟中太 | Zhongtai Virtual</span>
                                                                </div>
                                                            </a>
                                                            <a target="_blank" rel="noopener noreferrer" href="https://www.vplaaf.org" className="snap-center">
                                                                <div className="flex flex-col items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] md:min-w-[260px] border border-slate-200 rounded-2xl p-6 sm:p-7 bg-white shadow-sm">
                                                                    <img className="h-12 sm:h-14 md:h-16 w-auto object-contain bg-slate-900 px-2 rounded" src="https://www.vplaaf.org/docs/logo-pack/logo_standard_500px.png" alt="vPLAAF Logo" />
                                                                    <span className="text-sm sm:text-base font-semibold text-slate-800">虚拟中国空军 | vPLAAF</span>
                                                                </div>
                                                            </a>
                                                        </div>

                                                        {/* set B (duplicate for seamless loop) */}
                                                        <div className="partners-scroll flex gap-5 sm:gap-6 md:gap-8 pb-4 px-1" aria-hidden="true">
                                                            <a target="_blank" rel="noopener noreferrer" href="https://vatsim.net" className="snap-center">
                                                                <div className="flex flex-col items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] md:min-w-[260px] border border-slate-200 rounded-2xl p-6 sm:p-7 bg-white shadow-sm">
                                                                    <img src="/imgs/vatsim_logo.png" alt="" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
                                                                    <span className="text-sm sm:text-base font-semibold text-slate-800">VATSIM</span>
                                                                </div>
                                                            </a>
                                                            <a target="_blank" rel="noopener noreferrer" href="https://vatprc.net" className="snap-center">
                                                                <div className="flex flex-col items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] md:min-w-[260px] border border-slate-200 rounded-2xl p-6 sm:p-7 bg-white shadow-sm">
                                                                    <img src="/imgs/vatprc_logo.png" alt="" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
                                                                    <span className="text-sm sm:text-base font-semibold text-slate-800">VATPRC</span>
                                                                </div>
                                                            </a>
                                                            <a target="_blank" rel="noopener noreferrer" href="https://www.zhongtaivirtual.com" className="snap-center">
                                                                <div className="flex flex-col items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] md:min-w-[260px] border border-slate-200 rounded-2xl p-6 sm:p-7 bg-white shadow-sm">
                                                                    <img src="/imgs/zhongtai_logo.png" alt="" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
                                                                    <span className="text-sm sm:text-base font-semibold text-slate-800">虚拟中太 | Zhongtai Virtual</span>
                                                                </div>
                                                            </a>
                                                            <a target="_blank" rel="noopener noreferrer" href="https://www.vplaaf.org" className="snap-center">
                                                                <div className="flex flex-col items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] md:min-w-[260px] border border-slate-200 rounded-2xl p-6 sm:p-7 bg-white shadow-sm">
                                                                    <img className="h-12 sm:h-14 md:h-16 w-auto object-contain bg-slate-900 px-2 rounded" src="https://www.vplaaf.org/docs/logo-pack/logo_standard_500px.png" alt="" />
                                                                    <span className="text-sm sm:text-base font-semibold text-slate-800">虚拟中国空军 | vPLAAF</span>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer-bottom bar (positioned at bottom of this fullpage section) */}
                                    <div className="absolute left-0 right-0 bottom-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-200">
                                        <div className="max-w-6xl mx-auto px-6 md:px-16 py-4 flex flex-col items-center gap-2 text-sm text-slate-600 text-center">
                                            <div className="w-full">
                                                <Link to="/privacy" className="block text-xs sm:text-sm text-slate-600 hover:text-slate-900 underline">
                                                    {t('footer.privacy')}
                                                </Link>
                                            </div>

                                            <div className="w-full text-[11px] sm:text-[10px] text-slate-600 leading-relaxed">
                                                {t('footer.disclaimer.body')}
                                            </div>

                                            <div className="w-full">
                                                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                                                    &copy; {new Date().getFullYear()} {t('footer.copyright')}.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </section>

                            </div>
                        )}
                    />
                </div>
            );
        }
    };

    return <>
        <Helmet>
            <title>{t("app.title")}</title>
        </Helmet>
        <ReactFullpage {...fullpageOptions} />
    </>;
};

export default App
