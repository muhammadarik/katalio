'use client';

import React, { useState, useEffect, useRef } from 'react';

// ─── KOMPONEN FAQ ITEM (Dipisah agar state toggle lebih rapi) ────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-q" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <em className="faq-ico">{isOpen ? '−' : '+'}</em>
      </div>
      <div className="faq-a">{answer}</div>
    </div>
  );
}

// ─── KOMPONEN UTAMA LANDING PAGE ─────────────────────────────────────────────
export default function LandingPage() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // ─── 1. HANDLE SCROLL NAVIGATION ────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── 2. HANDLE SCROLL REVEAL ANIMATION ──────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Observasi semua elemen dengan class 'reveal'
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    // Stagger animation untuk grid items
    const staggerTargets = [
      { parent: '.steps-row', child: '.step-cell' },
      { parent: '.feat-grid', child: '.feat-card' },
      { parent: '.proof-grid', child: '.proof-card' },
      { parent: '.tmpl-scroll', child: '.tmpl-card' },
      { parent: '.price-grid', child: '.price-card' },
      { parent: '.pain-items', child: '.pain-item' },
      { parent: '.stats-row', child: '.stat-box' },
    ];

    staggerTargets.forEach(({ parent, child }) => {
      document.querySelectorAll(parent).forEach((grid) => {
        grid.querySelectorAll(child).forEach((c, i) => {
          (c as HTMLElement).style.transitionDelay = `${i * 0.07}s`;
        });
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── CSS STYLES ─────────────────────────────────────────────────────── */}
      <style jsx global>{`
        /* ─── TOKENS ─────────────────────────────────── */
        :root {
          --cream: #f7f4ef;
          --cream2: #efe9df;
          --cream3: #e5ddd0;
          --stone: #c8bfb0;
          --muted: #9e9488;
          --body: #3d3730;
          --heading: #1e1a15;
          --terra: #c4623a;
          --terra-l: #e8876a;
          --terra-d: #a04e2c;
          --amber: #d4920a;
          --green: #3a7d5c;
          --border: rgba(0, 0, 0, 0.08);
          --shadow: 0 2px 24px rgba(60, 40, 20, 0.08);
          --shadow-lg: 0 8px 48px rgba(60, 40, 20, 0.13);
        }
        /* ─── RESET ──────────────────────────────────── */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background: var(--cream);
          color: var(--body);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
        }
        h1,
        h2,
        h3,
        h4 {
          font-family: 'Playfair Display', serif;
          color: var(--heading);
          line-height: 1.2;
        }
        img {
          display: block;
          max-width: 100%;
        }
        a {
          text-decoration: none;
        }
        /* ─── NAV ────────────────────────────────────── */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(247, 244, 239, 0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          height: 64px;
          transition: box-shadow 0.2s;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 1.35rem;
          color: var(--heading);
          letter-spacing: -0.5px;
        }
        .nav-logo span {
          color: var(--terra);
        }
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }
        .nav-links a {
          color: var(--muted);
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: var(--heading);
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn-ghost {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--body);
          padding: 8px 18px;
          border-radius: 8px;
          border: 1px solid var(--border);
          transition: background 0.2s;
        }
        .btn-ghost:hover {
          background: var(--cream2);
        }
        .btn-main {
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          padding: 9px 20px;
          border-radius: 8px;
          background: var(--terra);
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 2px 8px rgba(196, 98, 58, 0.3);
        }
        .btn-main:hover {
          background: var(--terra-d);
          transform: translateY(-1px);
        }
        /* ─── HERO ───────────────────────────────────── */
        .hero {
          padding: 144px 60px 80px;
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          min-height: 100vh;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 20px;
        }
        .eyebrow-line {
          width: 28px;
          height: 1.5px;
          background: var(--terra);
          flex-shrink: 0;
        }
        h1.hero-title {
          font-size: clamp(2.6rem, 4.5vw, 4rem);
          font-weight: 900;
          margin-bottom: 22px;
          letter-spacing: -1px;
          color: var(--heading);
        }
        h1.hero-title em {
          font-style: italic;
          color: var(--terra);
        }
        .hero-sub {
          font-size: 1.05rem;
          color: var(--muted);
          line-height: 1.75;
          max-width: 480px;
          margin-bottom: 36px;
          font-weight: 400;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .btn-hero {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          padding: 13px 28px;
          border-radius: 10px;
          background: var(--terra);
          box-shadow: 0 4px 16px rgba(196, 98, 58, 0.35);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .btn-hero:hover {
          background: var(--terra-d);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(196, 98, 58, 0.4);
        }
        .btn-hero-ghost {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--body);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .btn-hero-ghost:hover {
          color: var(--terra);
        }
        .hero-trust {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.82rem;
          color: var(--muted);
        }
        .trust-avatars {
          display: flex;
        }
        .trust-av {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid var(--cream);
          margin-left: -8px;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #fff;
        }
        .trust-av:first-child {
          margin-left: 0;
        }
        .av1 {
          background: #c4623a;
        }
        .av2 {
          background: #3a7d5c;
        }
        .av3 {
          background: #d4920a;
        }
        .av4 {
          background: #7c6a9e;
        }
        /* Hero visual */
        .hero-visual {
          position: relative;
          animation: floatY 5s ease-in-out infinite;
        }
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        /* Phone mockup */
        .phone-wrap {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .phone {
          width: 260px;
          height: 500px;
          background: #1a1612;
          border-radius: 36px;
          border: 8px solid #2a241e;
          box-shadow: var(--shadow-lg), 0 0 0 1px rgba(255, 255, 255, 0.06);
          overflow: hidden;
          position: relative;
        }
        .phone-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 24px;
          background: #1a1612;
          border-radius: 0 0 18px 18px;
          z-index: 10;
        }
        .phone-screen {
          width: 100%;
          height: 100%;
          background: var(--cream);
          overflow-y: auto;
        }
        .phone-screen::-webkit-scrollbar {
          display: none;
        }
        .p-header {
          background: #fff;
          padding: 36px 16px 16px;
          border-bottom: 1px solid var(--border);
          text-align: center;
        }
        .p-logo-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--terra);
          margin: 0 auto 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
          font-family: 'Playfair Display', serif;
        }
        .p-biz-name {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--heading);
          margin-bottom: 2px;
        }
        .p-biz-sub {
          font-size: 0.68rem;
          color: var(--muted);
        }
        .p-cats {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding: 10px 14px;
          background: #fff;
          border-bottom: 1px solid var(--border);
        }
        .p-cats::-webkit-scrollbar {
          display: none;
        }
        .p-cat {
          flex-shrink: 0;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 0.68rem;
          font-weight: 600;
          background: var(--cream2);
          color: var(--muted);
          border: 1px solid var(--border);
          white-space: nowrap;
        }
        .p-cat.active {
          background: var(--terra);
          color: #fff;
          border-color: var(--terra);
        }
        .p-products {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .p-prod {
          background: #fff;
          border-radius: 12px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
        }
        .p-prod-img {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }
        .pi1 {
          background: #fef3ee;
        }
        .pi2 {
          background: #f0f7f3;
        }
        .pi3 {
          background: #fef9ee;
        }
        .pi4 {
          background: #f0f3fe;
        }
        .p-prod-info {
          flex: 1;
          min-width: 0;
        }
        .p-prod-name {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--heading);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 3px;
        }
        .p-prod-price {
          font-size: 0.7rem;
          color: var(--terra);
          font-weight: 700;
        }
        .p-prod-badge {
          font-size: 0.58rem;
          background: #fef3ee;
          color: var(--terra);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          white-space: nowrap;
        }
        /* Floating cards */
        .float-card {
          position: absolute;
          background: #fff;
          border-radius: 12px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          padding: 12px 14px;
          font-size: 0.75rem;
          animation: popIn 0.5s ease both;
        }
        .fc-scan {
          left: -90px;
          top: 120px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .fc-scan .fc-num {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--terra);
        }
        .fc-scan .fc-label {
          color: var(--muted);
          font-size: 0.68rem;
        }
        .fc-new {
          right: -80px;
          bottom: 140px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
          flex-shrink: 0;
          animation: pulse 2s infinite;
        }
        .fc-new span {
          color: var(--muted);
          font-size: 0.68rem;
        }
        .fc-new strong {
          display: block;
          color: var(--heading);
          font-size: 0.72rem;
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
          }
        }
        /* ─── SECTION COMMONS ────────────────────────── */
        .section {
          padding: 96px 60px;
        }
        .section-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 16px;
        }
        .label::before {
          content: '';
          width: 20px;
          height: 1.5px;
          background: var(--terra);
          flex-shrink: 0;
        }
        h2.sec-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          margin-bottom: 14px;
          letter-spacing: -0.5px;
        }
        h2.sec-title em {
          font-style: italic;
          color: var(--terra);
        }
        .sec-sub {
          font-size: 1rem;
          color: var(--muted);
          max-width: 520px;
          line-height: 1.75;
        }
        /* ─── PAIN SECTION ───────────────────────────── */
        .pain-section {
          background: var(--cream2);
          border-top: 1px solid var(--cream3);
          border-bottom: 1px solid var(--cream3);
        }
        .pain-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid var(--cream3);
          border-radius: 20px;
          overflow: hidden;
          margin-top: 52px;
          background: #fff;
          box-shadow: var(--shadow);
        }
        .pain-side {
          padding: 48px;
        }
        .pain-side.before {
          border-right: 1px solid var(--cream3);
        }
        .pain-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .badge-before {
          background: #fee2e2;
          color: #b91c1c;
        }
        .badge-after {
          background: #dcfce7;
          color: #166534;
        }
        .pain-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .pain-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 0.92rem;
          line-height: 1.6;
        }
        .pain-icon {
          flex-shrink: 0;
          margin-top: 2px;
          font-size: 1rem;
        }
        .pain-item.neg {
          color: #7f1d1d;
        }
        .pain-item.pos {
          color: #14532d;
        }
        /* ─── HOW IT WORKS ───────────────────────────── */
        .steps-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 56px;
          background: var(--cream3);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--cream3);
        }
        .step-cell {
          background: #fff;
          padding: 40px 36px;
          transition: background 0.2s;
          position: relative;
        }
        .step-cell:hover {
          background: var(--cream);
        }
        .step-num-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .step-num {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--terra);
          color: #fff;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .step-dur {
          font-size: 0.72rem;
          color: var(--muted);
          font-weight: 500;
        }
        .step-cell h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--heading);
        }
        .step-cell p {
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.7;
        }
        .step-connector {
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background: var(--terra);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.7rem;
          z-index: 2;
        }
        .step-cell:last-child .step-connector {
          display: none;
        }
        /* ─── FEATURES ───────────────────────────────── */
        .feat-section {
          background: var(--heading);
        }
        .feat-section .label {
          color: var(--terra-l);
        }
        .feat-section .label::before {
          background: var(--terra-l);
        }
        .feat-section h2.sec-title {
          color: #f7f4ef;
        }
        .feat-section h2.sec-title em {
          color: var(--terra-l);
        }
        .feat-section .sec-sub {
          color: rgba(247, 244, 239, 0.5);
        }
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          margin-top: 56px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .feat-card {
          background: rgba(255, 255, 255, 0.03);
          padding: 36px 32px;
          transition: background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .feat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--terra-l), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feat-card:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .feat-card:hover::before {
          opacity: 1;
        }
        .feat-card.span2 {
          grid-column: span 2;
        }
        .feat-emo {
          font-size: 1.8rem;
          margin-bottom: 18px;
          display: block;
        }
        .feat-card h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #f7f4ef;
          margin-bottom: 10px;
        }
        .feat-card p {
          font-size: 0.875rem;
          color: rgba(247, 244, 239, 0.5);
          line-height: 1.75;
        }
        .feat-tag {
          display: inline-block;
          margin-top: 14px;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
          background: rgba(196, 98, 58, 0.2);
          color: var(--terra-l);
          border: 1px solid rgba(196, 98, 58, 0.3);
        }
        /* Inline URL demo inside feat */
        .url-demo {
          margin-top: 20px;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.78rem;
          font-family: monospace;
          color: rgba(247, 244, 239, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .url-highlight {
          color: var(--terra-l);
          font-weight: 700;
        }
        /* ─── SOCIAL PROOF ───────────────────────────── */
        .proof-section {
          background: var(--cream2);
          border-top: 1px solid var(--cream3);
          border-bottom: 1px solid var(--cream3);
        }
        .proof-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 52px;
        }
        .proof-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid var(--border);
          padding: 28px;
          box-shadow: var(--shadow);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .proof-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .proof-stars {
          color: var(--amber);
          font-size: 0.78rem;
          margin-bottom: 14px;
        }
        .proof-quote {
          font-size: 0.92rem;
          line-height: 1.75;
          color: var(--body);
          margin-bottom: 20px;
          font-style: italic;
        }
        .proof-quote strong {
          font-style: normal;
          color: var(--heading);
        }
        .proof-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .proof-av {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.78rem;
          color: #fff;
        }
        .pa1 {
          background: var(--terra);
        }
        .pa2 {
          background: var(--green);
        }
        .pa3 {
          background: var(--amber);
        }
        .proof-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--heading);
        }
        .proof-role {
          font-size: 0.75rem;
          color: var(--muted);
        }
        .proof-business {
          font-size: 0.72rem;
          color: var(--terra);
          font-weight: 600;
          margin-top: 2px;
        }
        /* Stats row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          margin-top: 52px;
          background: var(--cream3);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--cream3);
        }
        .stat-box {
          background: #fff;
          padding: 32px 28px;
          text-align: center;
        }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem;
          font-weight: 900;
          color: var(--heading);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-num span {
          color: var(--terra);
        }
        .stat-label {
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 400;
        }
        /* ─── TEMPLATE SECTION ───────────────────────── */
        .tmpl-section {
        }
        .tmpl-intro {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .tmpl-scroll {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .tmpl-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: #fff;
          box-shadow: var(--shadow);
          transition: transform 0.25s, box-shadow 0.25s;
          cursor: pointer;
        }
        .tmpl-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        .tmpl-thumb {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          position: relative;
        }
        .tmpl-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(196, 98, 58, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s;
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .tmpl-card:hover .tmpl-thumb-overlay {
          opacity: 1;
        }
        .tmpl-body {
          padding: 18px 20px 20px;
        }
        .tmpl-name {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 4px;
          color: var(--heading);
        }
        .tmpl-cat {
          font-size: 0.75rem;
          color: var(--muted);
          margin-bottom: 14px;
        }
        .tmpl-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tmpl-price {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--terra);
        }
        .tmpl-price.free {
          color: var(--green);
        }
        .tmpl-sold {
          font-size: 0.72rem;
          color: var(--muted);
        }
        /* ─── PRICING ────────────────────────────────── */
        .price-section {
          background: var(--cream2);
          border-top: 1px solid var(--cream3);
        }
        .pricing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 32px 0;
          font-size: 0.875rem;
          color: var(--muted);
        }
        .toggle-track {
          width: 44px;
          height: 24px;
          background: var(--terra);
          border-radius: 100px;
          position: relative;
          cursor: pointer;
          transition: background 0.2s;
        }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.2s;
        }
        .badge-save {
          background: var(--green);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 100px;
        }
        .price-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 8px;
        }
        .price-card {
          background: #fff;
          border-radius: 18px;
          border: 1px solid var(--border);
          padding: 28px 24px;
          box-shadow: var(--shadow);
          transition: transform 0.25s, box-shadow 0.25s;
          position: relative;
        }
        .price-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .price-card.popular {
          border-color: var(--terra);
          border-width: 2px;
          background: #fff;
        }
        .pop-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--terra);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 100px;
          white-space: nowrap;
          letter-spacing: 0.04em;
        }
        .plan-tier {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: 12px;
        }
        .plan-amount {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--heading);
          line-height: 1;
        }
        .plan-period {
          font-size: 0.78rem;
          color: var(--muted);
          margin: 4px 0 12px;
        }
        .plan-desc {
          font-size: 0.82rem;
          color: var(--muted);
          padding-bottom: 18px;
          margin-bottom: 18px;
          border-bottom: 1px solid var(--border);
          line-height: 1.6;
        }
        .plan-feats {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 24px;
        }
        .plan-feats li {
          font-size: 0.82rem;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: var(--body);
          line-height: 1.5;
        }
        .plan-feats li::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .plan-feats li.no {
          color: var(--stone);
        }
        .plan-feats li.no::before {
          content: '–';
          color: var(--stone);
        }
        .plan-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 11px;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 700;
          border: 1.5px solid var(--border);
          color: var(--body);
          background: #fff;
          transition: all 0.2s;
          cursor: pointer;
        }
        .plan-btn:hover {
          background: var(--cream);
          border-color: var(--stone);
        }
        .plan-btn.main {
          background: var(--terra);
          border-color: var(--terra);
          color: #fff;
          box-shadow: 0 4px 14px rgba(196, 98, 58, 0.3);
        }
        .plan-btn.main:hover {
          background: var(--terra-d);
        }
        /* ─── FAQ ────────────────────────────────────── */
        .faq-section {
        }
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 52px;
          align-items: start;
        }
        .faq-left h3 {
          font-size: 1.3rem;
          margin-bottom: 14px;
          color: var(--heading);
        }
        .faq-left p {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.75;
          margin-bottom: 24px;
        }
        .faq-contact {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--terra);
          border-bottom: 1px solid var(--terra);
          padding-bottom: 1px;
          transition: color 0.2s;
        }
        .faq-contact:hover {
          color: var(--terra-d);
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .faq-item {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: #fff;
          overflow: hidden;
        }
        .faq-q {
          padding: 16px 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--heading);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .faq-q:hover {
          color: var(--terra);
        }
        .faq-ico {
          color: var(--stone);
          flex-shrink: 0;
          transition: transform 0.3s;
          font-style: normal;
          font-size: 1rem;
        }
        .faq-item.open .faq-ico {
          transform: rotate(45deg);
        }
        .faq-a {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s;
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.75;
          padding: 0 20px;
        }
        .faq-item.open .faq-a {
          max-height: 200px;
          padding: 0 20px 18px;
        }
        /* ─── CTA ────────────────────────────────────── */
        .cta-section {
          background: var(--heading);
          padding: 96px 60px;
          text-align: center;
        }
        .cta-section .label {
          color: var(--terra-l);
        }
        .cta-section .label::before {
          background: var(--terra-l);
        }
        .cta-section h2 {
          font-size: clamp(2rem, 4vw, 3.2rem);
          color: var(--cream);
          margin-bottom: 16px;
        }
        .cta-section h2 em {
          color: var(--terra-l);
        }
        .cta-section p {
          color: rgba(247, 244, 239, 0.5);
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto 36px;
          line-height: 1.75;
        }
        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .btn-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          background: var(--terra);
          color: #fff;
          box-shadow: 0 4px 20px rgba(196, 98, 58, 0.4);
          transition: background 0.2s, transform 0.15s;
        }
        .btn-cta:hover {
          background: var(--terra-d);
          transform: translateY(-2px);
        }
        .btn-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          border: 1px solid rgba(247, 244, 239, 0.15);
          color: rgba(247, 244, 239, 0.7);
          transition: background 0.2s;
        }
        .btn-cta-ghost:hover {
          background: rgba(247, 244, 239, 0.06);
        }
        .cta-fine {
          margin-top: 24px;
          font-size: 0.78rem;
          color: rgba(247, 244, 239, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .cta-fine span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        /* ─── FOOTER ─────────────────────────────────── */
        footer {
          background: var(--heading);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 56px 60px 32px;
        }
        .foot-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .foot-brand p {
          font-size: 0.85rem;
          color: rgba(247, 244, 239, 0.4);
          line-height: 1.75;
          margin: 14px 0 20px;
          max-width: 260px;
        }
        .foot-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 1.3rem;
          color: var(--cream);
        }
        .foot-logo span {
          color: var(--terra-l);
        }
        .foot-socials {
          display: flex;
          gap: 8px;
        }
        .s-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(247, 244, 239, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          transition: all 0.2s;
        }
        .s-btn:hover {
          background: rgba(247, 244, 239, 0.06);
          color: var(--cream);
        }
        .foot-col h5 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(247, 244, 239, 0.5);
          margin-bottom: 14px;
        }
        .foot-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .foot-col a {
          font-size: 0.84rem;
          color: rgba(247, 244, 239, 0.4);
          transition: color 0.2s;
        }
        .foot-col a:hover {
          color: var(--cream);
        }
        .foot-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .foot-bottom p {
          font-size: 0.78rem;
          color: rgba(247, 244, 239, 0.3);
        }
        .foot-bottom a {
          color: rgba(247, 244, 239, 0.3);
          font-size: 0.78rem;
          transition: color 0.2s;
        }
        .foot-bottom a:hover {
          color: var(--cream);
        }
        /* ─── SCROLL REVEAL ──────────────────────────── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* ─── RESPONSIVE ─────────────────────────────── */
        @media (max-width: 1024px) {
          nav {
            padding: 0 28px;
          }
          .hero {
            padding: 120px 28px 60px;
            gap: 48px;
          }
          .section {
            padding: 72px 28px;
          }
          .feat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .feat-card.span2 {
            grid-column: span 1;
          }
          .price-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .foot-top {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          footer {
            padding: 48px 28px 24px;
          }
          .cta-section {
            padding: 72px 28px;
          }
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .hero {
            grid-template-columns: 1fr;
            gap: 48px;
            padding-top: 100px;
          }
          .hero-visual {
            order: -1;
          }
          .phone {
            width: 220px;
            height: 420px;
          }
          .fc-scan {
            left: -60px;
          }
          .fc-new {
            right: -55px;
            bottom: 100px;
          }
          .pain-grid {
            grid-template-columns: 1fr;
          }
          .pain-side.before {
            border-right: none;
            border-bottom: 1px solid var(--cream3);
          }
          .steps-row {
            grid-template-columns: 1fr;
          }
          .feat-grid {
            grid-template-columns: 1fr;
          }
          .proof-grid {
            grid-template-columns: 1fr;
          }
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
          .tmpl-scroll {
            grid-template-columns: 1fr 1fr;
          }
          .price-grid {
            grid-template-columns: 1fr;
          }
          .faq-grid {
            grid-template-columns: 1fr;
          }
          .foot-top {
            grid-template-columns: 1fr 1fr;
          }
          .foot-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .tmpl-scroll {
            grid-template-columns: 1fr;
          }
          .stats-row {
            grid-template-columns: 1fr 1fr;
          }
          .hero-stats {
            gap: 16px;
          }
        }
      `}</style>

      {/* ─── NAV ────────────────────────────────────── */}
      <nav style={{ boxShadow: isNavScrolled ? '0 2px 20px rgba(60,40,20,0.08)' : 'none' }}>
        <a href="#" className="nav-logo">
          kata<span>lio</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#cara-kerja">Cara Kerja</a>
          </li>
          <li>
            <a href="#fitur">Fitur</a>
          </li>
          <li>
            <a href="#template">Template</a>
          </li>
          <li>
            <a href="#harga">Harga</a>
          </li>
        </ul>
        <div className="nav-right">
          <a href="#" className="btn-ghost">
            Masuk
          </a>
          <a href="#harga" className="btn-main">
            Coba Gratis
          </a>
        </div>
      </nav>

      {/* ─── HERO ───────────────────────────────────── */}
      <div className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="eyebrow-line"></span>
            Katalog Digital untuk UMKM Indonesia
          </div>
          <h1 className="hero-title">
            Pelanggan scan QR,<br />
            langsung lihat<br />
            <em>semua produk Anda.</em>
          </h1>
          <p className="hero-sub">
            Berhenti kirim foto satu-satu ke WhatsApp. Buat katalog digital profesional dalam 10
            menit — ada QR-nya, ada linknya, dan tampilannya bikin pelanggan lebih percaya.
          </p>
          <div className="hero-actions">
            <a href="#harga" className="btn-hero">
              Buat Katalog Gratis
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#cara-kerja" className="btn-hero-ghost">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M10 8l6 4-6 4V8z" />
              </svg>
              Lihat cara kerjanya
            </a>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              <div className="trust-av av1">SR</div>
              <div className="trust-av av2">BH</div>
              <div className="trust-av av3">DP</div>
              <div className="trust-av av4">MR</div>
            </div>
            <span>
              Sudah dipakai <strong>2.800+ pemilik bisnis</strong> di seluruh Indonesia
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="phone-wrap">
            {/* Floating cards */}
            <div className="float-card fc-scan">
              <div className="fc-num">147</div>
              <div className="fc-label">QR di-scan hari ini</div>
            </div>
            <div className="float-card fc-new">
              <div className="fc-dot"></div>
              <div>
                <strong>Pelanggan baru</strong>
                <span>Membuka katalog Anda</span>
              </div>
            </div>
            {/* Phone */}
            <div className="phone">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="p-header">
                  <div className="p-logo-box">KN</div>
                  <div className="p-biz-name">Kopi Nusantara</div>
                  <div className="p-biz-sub">Café & Roastery · Bandung</div>
                </div>
                <div className="p-cats">
                  <div className="p-cat active">☕ Kopi</div>
                  <div className="p-cat">🥤 Non-Kopi</div>
                  <div className="p-cat">🍞 Makanan</div>
                  <div className="p-cat">🎁 Paket</div>
                </div>
                <div className="p-products">
                  <div className="p-prod">
                    <div className="p-prod-img pi1">☕</div>
                    <div className="p-prod-info">
                      <div className="p-prod-name">Kopi Tubruk Gayo</div>
                      <div className="p-prod-price">Rp 22.000</div>
                    </div>
                    <div className="p-prod-badge">Terlaris</div>
                  </div>
                  <div className="p-prod">
                    <div className="p-prod-img pi2">🌿</div>
                    <div className="p-prod-info">
                      <div className="p-prod-name">Matcha Latte Premium</div>
                      <div className="p-prod-price">Rp 35.000</div>
                    </div>
                  </div>
                  <div className="p-prod">
                    <div className="p-prod-img pi3">🥐</div>
                    <div className="p-prod-info">
                      <div className="p-prod-name">Croissant Mentega</div>
                      <div className="p-prod-price">Rp 28.000</div>
                    </div>
                    <div className="p-prod-badge">Baru</div>
                  </div>
                  <div className="p-prod">
                    <div className="p-prod-img pi4">🫐</div>
                    <div className="p-prod-info">
                      <div className="p-prod-name">Blueberry Smoothie</div>
                      <div className="p-prod-price">Rp 32.000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PAIN SECTION ───────────────────────────── */}
      <section className="section pain-section">
        <div className="section-inner">
          <div className="reveal">
            <div className="label">Masalah yang Anda Rasakan</div>
            <h2 className="sec-title">
              Masih kirim foto produk<br />
              satu per satu ke <em>WhatsApp?</em>
            </h2>
            <p className="sec-sub">
              Pemilik bisnis Indonesia rata-rata menghabiskan 2–3 jam sehari hanya untuk menjawab
              pertanyaan produk yang berulang. Katalio selesaikan ini.
            </p>
          </div>
          <div className="pain-grid reveal">
            <div className="pain-side before">
              <div className="pain-badge badge-before">😩 Sebelum Katalio</div>
              <ul className="pain-items">
                <li className="pain-item neg">
                  <span className="pain-icon">📸</span>
                  <span>
                    Kirim foto produk satu-satu ke setiap pelanggan yang tanya di WhatsApp
                  </span>
                </li>
                <li className="pain-item neg">
                  <span className="pain-icon">😓</span>
                  <span>
                    Jawab pertanyaan "ada menu apa?" berkali-kali setiap hari — melelahkan
                  </span>
                </li>
                <li className="pain-item neg">
                  <span className="pain-icon">📄</span>
                  <span>
                    Menu cetak mahal dan harus cetak ulang setiap ada perubahan harga
                  </span>
                </li>
                <li className="pain-item neg">
                  <span className="pain-icon">😤</span>
                  <span>
                    Pelanggan tidak tahu semua produk yang ada karena tidak ada tempat yang lengkap
                  </span>
                </li>
                <li className="pain-item neg">
                  <span className="pain-icon">📉</span>
                  <span>
                    Kehilangan penjualan karena pelanggan tidak tau produk lain yang bisa mereka
                    beli
                  </span>
                </li>
              </ul>
            </div>
            <div className="pain-side after">
              <div className="pain-badge badge-after">😌 Sesudah Katalio</div>
              <ul className="pain-items">
                <li className="pain-item pos">
                  <span className="pain-icon">📱</span>
                  <span>
                    Pelanggan scan QR di meja → lihat semua produk langsung di HP mereka
                  </span>
                </li>
                <li className="pain-item pos">
                  <span className="pain-icon">🔗</span>
                  <span>
                    Share satu link ke WhatsApp dan semua produk sudah tersaji dengan rapi
                  </span>
                </li>
                <li className="pain-item pos">
                  <span className="pain-icon">⚡</span>
                  <span>
                    Update harga atau tambah produk baru dalam hitungan detik — tanpa cetak ulang
                  </span>
                </li>
                <li className="pain-item pos">
                  <span className="pain-icon">🌐</span>
                  <span>
                    Punya halaman katalog profesional di <strong>namabisnis.katalio.id</strong>{' '}
                    milik sendiri
                  </span>
                </li>
                <li className="pain-item pos">
                  <span className="pain-icon">📈</span>
                  <span>
                    Pelanggan temukan sendiri produk yang mereka mau — Anda fokus melayani
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────── */}
      <section className="section" id="cara-kerja">
        <div className="section-inner">
          <div className="reveal">
            <div className="label">Cara Kerja</div>
            <h2 className="sec-title">
              Siap dalam <em>10 menit.</em>
              <br />
              Serius, semudah itu.
            </h2>
            <p className="sec-sub">
              Tidak ada kode, tidak ada teknis yang ribet. Kalau bisa pakai Instagram, Anda pasti
              bisa pakai Katalio.
            </p>
          </div>
          <div className="steps-row reveal">
            <div className="step-cell">
              <div className="step-num-wrap">
                <div className="step-num">1</div>
                <span className="step-dur">⏱ 2 menit</span>
              </div>
              <h3>Daftar & beri nama toko Anda</h3>
              <p>
                Masukkan nama bisnis, pilih subdomain Anda — misalnya{' '}
                <strong>kopinusantara.katalio.id</strong> — dan upload logo. Selesai, toko Anda
                sudah ada di internet.
              </p>
              <div className="step-connector">→</div>
            </div>
            <div className="step-cell">
              <div className="step-num-wrap">
                <div className="step-num">2</div>
                <span className="step-dur">⏱ 5 menit</span>
              </div>
              <h3>Masukkan produk dan harga</h3>
              <p>
                Tambahkan foto, nama, dan harga produk Anda. Kelompokkan per kategori supaya
                pelanggan mudah cari. Bisa tambah atau ubah kapan saja.
              </p>
              <div className="step-connector">→</div>
            </div>
            <div className="step-cell">
              <div className="step-num-wrap">
                <div className="step-num">3</div>
                <span className="step-dur">⏱ 3 menit</span>
              </div>
              <h3>Download QR & sebar ke mana saja</h3>
              <p>
                QR code Anda otomatis jadi. Cetak dan tempel di meja, kasir, atau etalase. Share
                juga linknya ke WhatsApp dan Instagram Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ───────────────────────────────── */}
      <section className="section feat-section" id="fitur">
        <div className="section-inner">
          <div className="reveal">
            <div className="label">Fitur</div>
            <h2 className="sec-title">
              Semua yang bisnis Anda<br />
              butuhkan, sudah <em>ada.</em>
            </h2>
            <p className="sec-sub">
              Tidak perlu plugin tambahan. Tidak perlu developer. Semua fitur penting sudah
              tersedia dari hari pertama.
            </p>
          </div>
          <div className="feat-grid reveal">
            <div className="feat-card span2">
              <span className="feat-emo">🔗</span>
              <h3>Subdomain Nama Bisnis Anda — Profesional & Mudah Diingat</h3>
              <p>
                Setiap bisnis mendapat alamat sendiri di internet. Tidak perlu beli domain, tidak
                perlu setting hosting. Langsung aktif saat Anda selesai daftar.
              </p>
              <div className="url-demo">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  style={{ opacity: 0.4 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
                </svg>
                <span className="url-highlight">kopinusantara</span>.katalio.id
              </div>
              <span className="feat-tag">Custom domain di plan Pro</span>
            </div>
            <div className="feat-card">
              <span className="feat-emo">📊</span>
              <h3>Tahu Berapa Kali QR Anda Di-scan</h3>
              <p>
                Lihat data kunjungan katalog Anda secara real-time. Produk apa yang paling banyak
                dilihat? Jam berapa paling ramai? Semua ada di dashboard Anda.
              </p>
            </div>
            <div className="feat-card">
              <span className="feat-emo">⚡</span>
              <h3>Update Produk, Langsung Tampil</h3>
              <p>
                Harga naik? Produk habis? Tambah menu baru? Edit di dashboard dan perubahan
                langsung muncul di halaman pelanggan — QR-nya tidak perlu diganti.
              </p>
            </div>
            <div className="feat-card">
              <span className="feat-emo">🎨</span>
              <h3>Pilih Template Sesuai Bisnis Anda</h3>
              <p>
                Tersedia puluhan template yang dirancang khusus per kategori bisnis. Café,
                restoran, fashion, kecantikan — semuanya ada dan bisa langsung pakai.
              </p>
            </div>
            <div className="feat-card">
              <span className="feat-emo">🤖</span>
              <h3>Deskripsi Produk Ditulis AI</h3>
              <p>
                Tidak tahu harus nulis apa? Upload foto dan nama produk, AI Katalio akan tulis
                deskripsi yang menarik dan persuasif dalam Bahasa Indonesia untuk Anda.
              </p>
              <span className="feat-tag">Fitur Pro</span>
            </div>
            <div className="feat-card">
              <span className="feat-emo">📲</span>
              <h3>QR Code Siap Download & Cetak</h3>
              <p>
                QR code Anda tersedia dalam format PNG dan PDF resolusi tinggi — siap langsung
                dicetak di percetakan terdekat atau dikirim ke desainer Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ───────────────────────────── */}
      <section className="section proof-section">
        <div className="section-inner">
          <div className="reveal">
            <div className="label">Cerita Nyata</div>
            <h2 className="sec-title">
              Pemilik bisnis seperti Anda<br />
              sudah <em>merasakannya.</em>
            </h2>
          </div>
          <div className="stats-row reveal">
            <div className="stat-box">
              <div className="stat-num">
                2.8<span>rb+</span>
              </div>
              <div className="stat-label">Bisnis aktif di Katalio</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">
                48<span>rb+</span>
              </div>
              <div className="stat-label">Produk sudah terdaftar</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">
                91<span>%</span>
              </div>
              <div className="stat-label">Pengguna merasakan lebih hemat waktu</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">
                4.9<span>★</span>
              </div>
              <div className="stat-label">Rating kepuasan rata-rata</div>
            </div>
          </div>
          <div className="proof-grid reveal">
            <div className="proof-card">
              <div className="proof-stars">★★★★★</div>
              <p className="proof-quote">
                "Dulu tiap hari paling sedikit 30 chat WA yang tanya menu. Sekarang tinggal balas
                'cek link di bio' dan selesai. <strong>Waktu saya kembali buat hal yang lebih
                penting.</strong>"
              </p>
              <div className="proof-author">
                <div className="proof-av pa1">SR</div>
                <div>
                  <div className="proof-name">Sari Rahayu, 34 tahun</div>
                  <div className="proof-business">🍳 Warung Sari Rasa — Yogyakarta</div>
                  <div className="proof-role">Pengguna Katalio selama 8 bulan</div>
                </div>
              </div>
            </div>
            <div className="proof-card">
              <div className="proof-stars">★★★★★</div>
              <p className="proof-quote">
                "QR di meja café saya langsung jadi conversation starter. Tamu sering bilang
                <strong>'wah keren ada QR menu-nya'</strong> — padahal saya setup-nya cuma 15
                menit."
              </p>
              <div className="proof-author">
                <div className="proof-av pa2">BH</div>
                <div>
                  <div className="proof-name">Bagas Hananto, 28 tahun</div>
                  <div className="proof-business">☕ Kopi Nusantara — Bandung</div>
                  <div className="proof-role">Pengguna Katalio selama 5 bulan</div>
                </div>
              </div>
            </div>
            <div className="proof-card">
              <div className="proof-stars">★★★★★</div>
              <p className="proof-quote">
                "Saya jualan baju, foto produk banyak banget. Dulu mesti kirim satu-satu. Sekarang
                share satu link, <strong>pelanggan scroll sendiri dan pesan sendiri.</strong> Omzet
                naik 35%."
              </p>
              <div className="proof-author">
                <div className="proof-av pa3">DP</div>
                <div>
                  <div className="proof-name">Dewi Puspita, 31 tahun</div>
                  <div className="proof-business">👗 Butik Cantik Dewi — Surabaya</div>
                  <div className="proof-role">Pengguna Katalio selama 11 bulan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEMPLATE ───────────────────────────────── */}
      <section className="section" id="template">
        <div className="section-inner">
          <div className="tmpl-intro reveal">
            <div>
              <div className="label">Template Marketplace</div>
              <h2 className="sec-title">
                Tampilan yang bikin<br />
                pelanggan <em>betah scrolling.</em>
              </h2>
              <p className="sec-sub">
                Pilih dari koleksi template yang dirancang untuk bisnis nyata, bukan sekadar
                terlihat bagus.
              </p>
            </div>
            <a
              href="#"
              className="btn-ghost"
              style={{ height: 'fit-content', whiteSpace: 'nowrap' }}
            >
              Lihat semua template →
            </a>
          </div>
          <div className="tmpl-scroll reveal">
            <div className="tmpl-card">
              <div
                className="tmpl-thumb"
                style={{ background: 'linear-gradient(135deg,#2c1810,#5a3020)' }}
              >
                ☕
                <div className="tmpl-thumb-overlay">Lihat Preview</div>
              </div>
              <div className="tmpl-body">
                <div className="tmpl-name">Brewcraft</div>
                <div className="tmpl-cat">Café & Kopi · Warm Dark Theme</div>
                <div className="tmpl-foot">
                  <span className="tmpl-price">Rp 49.000</span>
                  <span className="tmpl-sold">🔥 214 digunakan</span>
                </div>
              </div>
            </div>
            <div className="tmpl-card">
              <div
                className="tmpl-thumb"
                style={{ background: 'linear-gradient(135deg,#f0f7f3,#d4ede2)' }}
              >
                🌿
                <div className="tmpl-thumb-overlay">Lihat Preview</div>
              </div>
              <div className="tmpl-body">
                <div className="tmpl-name">Verdant</div>
                <div className="tmpl-cat">Kuliner Sehat & Herbal · Clean Light</div>
                <div className="tmpl-foot">
                  <span className="tmpl-price free">Gratis</span>
                  <span className="tmpl-sold">⭐ 4.9 · 189 pengguna</span>
                </div>
              </div>
            </div>
            <div className="tmpl-card">
              <div
                className="tmpl-thumb"
                style={{ background: 'linear-gradient(135deg,#1a1a2e,#2d2d4e)' }}
              >
                👗
                <div className="tmpl-thumb-overlay">Lihat Preview</div>
              </div>
              <div className="tmpl-body">
                <div className="tmpl-name">Styla</div>
                <div className="tmpl-cat">Fashion & Aksesoris · Minimalis</div>
                <div className="tmpl-foot">
                  <span className="tmpl-price">Rp 79.000</span>
                  <span className="tmpl-sold">🔥 178 digunakan</span>
                </div>
              </div>
            </div>
            <div className="tmpl-card">
              <div
                className="tmpl-thumb"
                style={{ background: 'linear-gradient(135deg,#fef3ee,#fde0d0)' }}
              >
                🍱
                <div className="tmpl-thumb-overlay">Lihat Preview</div>
              </div>
              <div className="tmpl-body">
                <div className="tmpl-name">Nusantara</div>
                <div className="tmpl-cat">Kuliner Lokal · Warm Indonesian</div>
                <div className="tmpl-foot">
                  <span className="tmpl-price">Rp 49.000</span>
                  <span className="tmpl-sold">🔥 326 digunakan</span>
                </div>
              </div>
            </div>
            <div className="tmpl-card">
              <div
                className="tmpl-thumb"
                style={{ background: 'linear-gradient(135deg,#f5f0fa,#e8daf5)' }}
              >
                💆
                <div className="tmpl-thumb-overlay">Lihat Preview</div>
              </div>
              <div className="tmpl-body">
                <div className="tmpl-name">Serenity</div>
                <div className="tmpl-cat">Spa & Kecantikan · Soft Luxury</div>
                <div className="tmpl-foot">
                  <span className="tmpl-price">Rp 99.000</span>
                  <span className="tmpl-sold">⭐ 5.0 · 94 pengguna</span>
                </div>
              </div>
            </div>
            <div className="tmpl-card">
              <div
                className="tmpl-thumb"
                style={{ background: 'linear-gradient(135deg,#f7f4ef,#ede5d8)' }}
              >
                🎁
                <div className="tmpl-thumb-overlay">Lihat Preview</div>
              </div>
              <div className="tmpl-body">
                <div className="tmpl-name">Gifted</div>
                <div className="tmpl-cat">Hampers & Souvenir · Elegant</div>
                <div className="tmpl-foot">
                  <span className="tmpl-price free">Gratis</span>
                  <span className="tmpl-sold">🔥 145 digunakan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────────── */}
      <section className="section price-section" id="harga">
        <div className="section-inner">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="label" style={{ justifyContent: 'center' }}>
              Harga
            </div>
            <h2 className="sec-title">
              Mulai gratis. Bayar kalau<br />
              sudah <em>benar-benar butuh.</em>
            </h2>
            <p className="sec-sub" style={{ margin: '0 auto 8px' }}>
              Tidak ada kontrak. Tidak ada biaya tersembunyi. Upgrade atau downgrade kapan saja.
            </p>
            <div className="pricing-toggle">
              <span>Bulanan</span>
              <div className="toggle-track">
                <div className="toggle-thumb"></div>
              </div>
              <span>
                Tahunan <span className="badge-save">Hemat 2 Bulan</span>
              </span>
            </div>
          </div>
          <div className="price-grid reveal">
            {/* FREE */}
            <div className="price-card">
              <div className="plan-tier">Free</div>
              <div className="plan-amount">Rp 0</div>
              <div className="plan-period">Selamanya gratis</div>
              <p className="plan-desc">
                Cocok untuk bisnis yang baru mau coba go-digital pertama kali.
              </p>
              <ul className="plan-feats">
                <li>1 halaman katalog</li>
                <li>Maks. 20 produk</li>
                <li>Subdomain katalio.id</li>
                <li>QR code download</li>
                <li>2 template gratis</li>
                <li className="no">Analytics kunjungan</li>
                <li className="no">Custom domain</li>
                <li className="no">Fitur AI</li>
              </ul>
              <a href="#" className="plan-btn">
                Mulai Gratis
              </a>
            </div>
            {/* STARTER */}
            <div className="price-card">
              <div className="plan-tier">Starter</div>
              <div className="plan-amount">Rp 49rb</div>
              <div className="plan-period">/bulan · tagih bulanan</div>
              <p className="plan-desc">
                Untuk toko aktif yang sudah punya pelanggan dan mau tampil lebih serius.
              </p>
              <ul className="plan-feats">
                <li>3 halaman katalog</li>
                <li>Maks. 100 produk</li>
                <li>Subdomain katalio.id</li>
                <li>QR code + download HD</li>
                <li>Semua template gratis</li>
                <li>Analytics 30 hari</li>
                <li className="no">Custom domain</li>
                <li className="no">Fitur AI</li>
              </ul>
              <a href="#" className="plan-btn">
                Pilih Starter
              </a>
            </div>
            {/* PRO */}
            <div className="price-card popular">
              <div className="pop-badge">Paling Banyak Dipilih</div>
              <div className="plan-tier">Pro</div>
              <div className="plan-amount">Rp 129rb</div>
              <div className="plan-period">/bulan · tagih bulanan</div>
              <p className="plan-desc">
                Untuk bisnis yang serius tumbuh dan mau kelihatan profesional dari semua sisi.
              </p>
              <ul className="plan-feats">
                <li>Katalog & produk tak terbatas</li>
                <li>Custom domain sendiri</li>
                <li>QR custom branding & warna</li>
                <li>Semua template + premium</li>
                <li>Analytics lengkap + export</li>
                <li>AI deskripsi produk</li>
                <li>Chatbot AI untuk katalog</li>
                <li>Prioritas support WA</li>
              </ul>
              <a href="#" className="plan-btn main">
                Pilih Pro
              </a>
            </div>
            {/* BUSINESS */}
            <div className="price-card">
              <div className="plan-tier">Business</div>
              <div className="plan-amount" style={{ fontSize: '1.6rem' }}>
                Hubungi Kami
              </div>
              <div className="plan-period">Harga sesuai kebutuhan</div>
              <p className="plan-desc">
                Untuk franchise, chain store, atau bisnis dengan banyak outlet dan tim.
              </p>
              <ul className="plan-feats">
                <li>Multi-outlet & lokasi</li>
                <li>White label (brand sendiri)</li>
                <li>Dedicated account manager</li>
                <li>Integrasi custom (API)</li>
                <li>Semua fitur AI penuh</li>
                <li>Pelatihan tim onboarding</li>
                <li>SLA & uptime guarantee</li>
                <li>Invoice & billing custom</li>
              </ul>
              <a href="#" className="plan-btn">
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────── */}
      <section className="section faq-section">
        <div className="section-inner">
          <div className="faq-grid">
            <div className="faq-left reveal">
              <div className="label">FAQ</div>
              <h2 className="sec-title">
                Ada yang masih<br />
                <em>ditanyakan?</em>
              </h2>
              <p>
                Pertanyaan di bawah ini adalah yang paling sering ditanyakan calon pengguna baru.
                Kalau masih ada yang belum terjawab, tim kami siap membantu.
              </p>
              <a href="#" className="faq-contact">
                Chat dengan kami via WhatsApp
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="faq-list reveal">
              <FaqItem
                question="Apakah pelanggan saya perlu download aplikasi untuk lihat katalog?"
                answer="Tidak perlu sama sekali. Halaman katalog Katalio terbuka langsung di browser HP pelanggan — sama seperti buka website biasa. Cukup scan QR atau klik link, langsung muncul."
              />
              <FaqItem
                question="Kalau saya ganti harga atau tambah produk, QR-nya berubah?"
                answer="Tidak berubah. QR code Anda permanen — mengarah ke alamat katalog Anda yang tetap. Apapun yang Anda ubah di dashboard (harga, foto, produk baru), semua langsung tampil tanpa perlu cetak QR baru. Ini salah satu keuntungan terbesar dibanding menu cetak."
              />
              <FaqItem
                question="Saya tidak paham teknologi. Apa bisa pakai Katalio?"
                answer="Bisa! Katalio dibuat untuk pemilik bisnis — bukan programmer. Kalau Anda bisa pakai Instagram, Anda pasti bisa pakai Katalio. Ada panduan langkah-demi-langkah dan tim support WA yang siap bantu kalau ada kendala."
              />
              <FaqItem
                question="Apakah ada batas foto atau ukuran gambar produk?"
                answer="Di plan Free dan Starter, setiap produk bisa upload 1 foto utama hingga 5MB. Di plan Pro ke atas, Anda bisa upload hingga 5 foto per produk dan sistem otomatis mengoptimalkan ukuran gambar agar katalog tetap cepat dibuka pelanggan."
              />
              <FaqItem
                question="Bisa pakai domain sendiri seperti menu.namabisnis.com?"
                answer="Bisa, tersedia mulai plan Pro. Anda tinggal masukkan domain Anda di dashboard Katalio, ikuti panduan DNS yang kami sediakan (biasanya 5 menit), dan katalog Anda akan bisa diakses dari domain Anda sendiri."
              />
              <FaqItem
                question="Katalio cocok untuk bisnis apa saja selain kuliner?"
                answer="Katalio cocok untuk semua bisnis yang punya produk atau jasa untuk ditampilkan: toko fashion, salon kecantikan, toko oleh-oleh, bengkel, laundry, florist, toko elektronik, usaha catering, toko aksesoris, dan masih banyak lagi. Selama Anda punya produk yang mau ditunjukkan ke pelanggan, Katalio bisa bantu."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────── */}
      <section className="cta-section">
        <div className="reveal">
          <div className="label" style={{ justifyContent: 'center' }}>
            Mulai Sekarang
          </div>
          <h2>
            Pelanggan Anda menunggu<br />
            katalog yang <em>lebih baik.</em>
          </h2>
          <p>
            Bergabung dengan 2.800+ pemilik bisnis yang sudah pakai Katalio. Gratis untuk mulai,
            tidak perlu kartu kredit.
          </p>
          <div className="cta-actions">
            <a href="#" className="btn-cta">
              Buat Katalog Sekarang — Gratis
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#" className="btn-cta-ghost">
              Tanya dulu via WhatsApp
            </a>
          </div>
          <div className="cta-fine">
            <span>
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>{' '}
              Tanpa kartu kredit
            </span>
            <span>
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>{' '}
              Siap dalam 10 menit
            </span>
            <span>
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>{' '}
              Bisa cancel kapan saja
            </span>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────── */}
      <footer>
        <div className="foot-top">
          <div className="foot-brand">
            <div className="foot-logo">
              kata<span>lio</span>
            </div>
            <p>
              Platform katalog digital untuk UMKM dan bisnis Indonesia. Buat, share, dan kelola
              katalog produk Anda dengan mudah — tanpa keahlian teknis.
            </p>
            <div className="foot-socials">
              <a href="#" className="s-btn">
                ig
              </a>
              <a href="#" className="s-btn">
                tt
              </a>
              <a href="#" className="s-btn">
                yt
              </a>
              <a href="#" className="s-btn">
                wa
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Produk</h5>
            <ul>
              <li>
                <a href="#">Fitur</a>
              </li>
              <li>
                <a href="#">Template</a>
              </li>
              <li>
                <a href="#">Harga</a>
              </li>
              <li>
                <a href="#">Roadmap</a>
              </li>
              <li>
                <a href="#">API untuk Developer</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Perusahaan</h5>
            <ul>
              <li>
                <a href="#">Tentang Kami</a>
              </li>
              <li>
                <a href="#">Blog & Tips Bisnis</a>
              </li>
              <li>
                <a href="#">Karir</a>
              </li>
              <li>
                <a href="#">Program Afiliasi</a>
              </li>
              <li>
                <a href="#">Hubungi Kami</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Bantuan</h5>
            <ul>
              <li>
                <a href="#">Pusat Bantuan</a>
              </li>
              <li>
                <a href="#">Tutorial Video</a>
              </li>
              <li>
                <a href="#">Status Layanan</a>
              </li>
              <li>
                <a href="#">Syarat & Ketentuan</a>
              </li>
              <li>
                <a href="#">Kebijakan Privasi</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <p>© 2025 Katalio. Dibuat dengan ❤️ di Indonesia.</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#">Syarat & Ketentuan</a>
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Kebijakan Cookie</a>
          </div>
          <p>🇮🇩 Indonesia</p>
        </div>
      </footer>
    </>
  );
}