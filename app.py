import streamlit as st
import pandas as pd
import joblib
import warnings
import math

# Suppress harmless sklearn unpickle version warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Page configuration
st.set_page_config(
    page_title="PlaceWise AI | Enterprise Placement Intelligence",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load existing pre-trained model and exact features (strictly preserved)
model = joblib.load("placement_model.pkl")
features = joblib.load("placement_features.pkl")

# -------------------------------------------------------------
# EDITORIAL PRODUCT DESIGN SYSTEM & SOPHISTICATED UI STYLING
# Inspired by polished software showcases (potadot.com.my)
# -------------------------------------------------------------
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

:root {
    --bg-base: #070b14;
    --bg-surface: #0c1220;
    --bg-surface-elevated: #111a2e;
    --bg-card: rgba(16, 24, 44, 0.75);
    --bg-card-hover: rgba(22, 34, 60, 0.9);
    --border-subtle: rgba(255, 255, 255, 0.07);
    --border-strong: rgba(255, 255, 255, 0.12);
    --border-accent: rgba(56, 189, 248, 0.35);
    --accent-sky: #0284c7;
    --accent-sky-light: #38bdf8;
    --accent-indigo: #6366f1;
    --accent-indigo-light: #818cf8;
    --accent-emerald: #10b981;
    --accent-amber: #f59e0b;
    --accent-rose: #f43f5e;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --radius-xl: 28px;
}

html, body, [class*="css"] {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--text-primary);
}

/* Base application canvas */
.stApp {
    background-color: var(--bg-base);
    background-image: 
        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(56, 189, 248, 0.12) 0%, transparent 70%),
        radial-gradient(ellipse 60% 40% at 85% 60%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
        linear-gradient(to bottom, #070b14 0%, #090e1a 50%, #070b14 100%);
    min-height: 100vh;
}

[data-testid="stAppViewContainer"] {
    background: transparent;
}

.block-container {
    max-width: 1220px;
    padding-top: 1.5rem;
    padding-bottom: 5rem;
}

header[data-testid="stHeader"] {
    background: transparent;
}

/* Sidebar Customization */
section[data-testid="stSidebar"] {
    background: #090e1b;
    border-right: 1px solid var(--border-subtle);
}

.sidebar-header-box {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--border-subtle);
    margin-bottom: 22px;
}

.sidebar-logo-mark {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, #0284c7 0%, #6366f1 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
}

.sidebar-brand-name {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ffffff;
    line-height: 1.15;
}

.sidebar-brand-edition {
    font-size: 11px;
    color: var(--accent-sky-light);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.sidebar-nav-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
}

.sidebar-card-panel {
    background: rgba(17, 26, 46, 0.6);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    margin-top: 18px;
}

.sidebar-card-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--accent-sky-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
}

.sidebar-card-body {
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0;
}

/* 1. SOPHISTICATED PRODUCT HERO SECTION */
.product-hero-container {
    position: relative;
    padding: 48px 46px;
    border-radius: var(--radius-xl);
    background: linear-gradient(160deg, rgba(17, 26, 48, 0.85) 0%, rgba(13, 20, 37, 0.95) 100%);
    border: 1px solid var(--border-strong);
    box-shadow: 
        0 24px 60px -15px rgba(0, 0, 0, 0.6),
        0 0 1px 1px rgba(255, 255, 255, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
    margin-bottom: 40px;
    overflow: hidden;
}

.product-hero-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), rgba(99, 102, 241, 0.5), transparent);
}

.hero-content-grid {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 40px;
    align-items: center;
}

@media (max-width: 960px) {
    .hero-content-grid {
        grid-template-columns: 1fr;
        gap: 32px;
    }
}

.hero-tag-cluster {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 18px;
}

.pill-version-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(2, 132, 199, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 4px 12px;
    border-radius: 999px;
    color: var(--accent-sky-light);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.pill-status-live {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.28);
    padding: 4px 12px;
    border-radius: 999px;
    color: #34d399;
    font-size: 11px;
    font-weight: 600;
}

.live-beacon {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #10b981;
    box-shadow: 0 0 8px #10b981;
}

.hero-headline {
    font-size: clamp(34px, 4.2vw, 50px);
    font-weight: 800;
    line-height: 1.14;
    letter-spacing: -0.03em;
    color: #ffffff;
    margin-bottom: 16px;
}

.headline-highlight {
    background: linear-gradient(135deg, #ffffff 30%, #38bdf8 70%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-description-text {
    font-size: 15.5px;
    color: #cbd5e1;
    line-height: 1.65;
    margin-bottom: 28px;
    max-width: 580px;
}

.hero-cta-group {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
}

.btn-primary-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
    color: #ffffff !important;
    text-decoration: none !important;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.01em;
    padding: 12px 24px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 16px rgba(2, 132, 199, 0.35);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary-action:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(2, 132, 199, 0.5);
    filter: brightness(1.08);
}

.btn-secondary-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: #e2e8f0 !important;
    text-decoration: none !important;
    font-weight: 600;
    font-size: 14px;
    padding: 12px 20px;
    border-radius: 10px;
    border: 1px solid var(--border-subtle);
    transition: all 0.25s ease;
}

.btn-secondary-action:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    color: #ffffff !important;
}

/* Layered Product Mockup Frame */
.product-showcase-window {
    background: #0d1527;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 
        0 20px 45px -10px rgba(0, 0, 0, 0.7),
        0 0 1px 1px rgba(255, 255, 255, 0.08);
    overflow: hidden;
    position: relative;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.product-showcase-window:hover {
    transform: translateY(-4px);
    box-shadow: 
        0 28px 55px -12px rgba(0, 0, 0, 0.8),
        0 0 25px rgba(2, 132, 199, 0.15);
}

.window-title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #0a101f;
    border-bottom: 1px solid var(--border-subtle);
}

.window-dots {
    display: flex;
    align-items: center;
    gap: 6px;
}

.window-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
}

.dot-red { background: #ef4444; opacity: 0.8; }
.dot-yellow { background: #f59e0b; opacity: 0.8; }
.dot-green { background: #10b981; opacity: 0.8; }

.window-path-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--text-muted);
}

.window-badge-pill {
    font-size: 10px;
    font-weight: 700;
    color: var(--accent-sky-light);
    background: rgba(2, 132, 199, 0.15);
    padding: 2px 8px;
    border-radius: 4px;
}

.window-body-canvas {
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.mockup-stat-strip {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 12px;
}

.mockup-mini-card {
    background: rgba(17, 26, 48, 0.7);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 12px 14px;
}

.mockup-card-label {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 600;
    margin-bottom: 4px;
}

.mockup-card-value {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.1;
}

.mockup-card-sub {
    font-size: 11px;
    color: #34d399;
    font-weight: 600;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.mockup-competency-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.mockup-bar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: var(--text-secondary);
}

.mockup-mini-track {
    height: 5px;
    width: 100%;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 3px;
}

.mockup-mini-fill {
    height: 100%;
    border-radius: 4px;
}

.mockup-floating-event {
    background: rgba(14, 23, 42, 0.95);
    border: 1px solid rgba(56, 189, 248, 0.25);
    border-radius: 10px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.event-icon-box {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: rgba(16, 185, 129, 0.15);
    color: #34d399;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
}

.event-details-text {
    font-size: 11.5px;
    color: #e2e8f0;
    line-height: 1.35;
}

.event-time-stamp {
    font-size: 10.5px;
    color: var(--text-muted);
}

/* 2. PRODUCT STORYTELLING SECTION (Four Pillars) */
.storytelling-wrapper {
    margin-bottom: 48px;
}

.section-editorial-header {
    margin-bottom: 24px;
}

.editorial-tag {
    font-size: 11.5px;
    font-weight: 700;
    color: var(--accent-sky-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.editorial-title {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
}

.editorial-subtitle {
    font-size: 14.5px;
    color: var(--text-secondary);
    max-width: 680px;
    line-height: 1.6;
}

.bento-story-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.bento-story-card {
    background: linear-gradient(160deg, rgba(16, 25, 46, 0.8) 0%, rgba(11, 18, 33, 0.9) 100%);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.bento-story-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: transparent;
    transition: background 0.3s ease;
}

.bento-story-card:hover {
    transform: translateY(-4px);
    border-color: rgba(56, 189, 248, 0.3);
    box-shadow: 
        0 18px 36px -10px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(2, 132, 199, 0.1);
}

.bento-story-card:hover::before {
    background: linear-gradient(90deg, #0284c7, #6366f1);
}

.bento-card-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent-sky-light);
    margin-bottom: 12px;
}

.bento-card-title {
    font-size: 18px;
    font-weight: 750;
    color: #ffffff;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
}

.bento-card-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 16px;
}

.bento-card-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    border-top: 1px solid var(--border-subtle);
    padding-top: 14px;
}

.meta-pill {
    font-size: 11px;
    font-weight: 600;
    color: #cbd5e1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-subtle);
    padding: 3px 9px;
    border-radius: 6px;
}

/* 3. CANDIDATE INTELLIGENCE STUDIO (Form & Inputs) */
.studio-container {
    background: rgba(13, 20, 36, 0.7);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-xl);
    padding: 32px 34px;
    margin-bottom: 40px;
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.4);
}

.studio-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-subtle);
}

.studio-title-block h3 {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 4px 0;
    letter-spacing: -0.02em;
}

.studio-title-block p {
    font-size: 13.5px;
    color: var(--text-secondary);
    margin: 0;
}

.studio-model-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(2, 132, 199, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--accent-sky-light);
    font-family: 'JetBrains Mono', monospace;
}

div[data-testid="stVerticalBlockBorderWrapper"] {
    border: 1px solid var(--border-subtle) !important;
    border-radius: var(--radius-md) !important;
    background: rgba(16, 25, 46, 0.6) !important;
    padding: 12px 18px 20px 18px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.category-badge-title {
    font-size: 13.5px;
    font-weight: 750;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 10px 0 12px 0;
    display: flex;
    align-items: center;
    gap: 6px;
}

/* Custom form submission button */
.stButton > button,
.stFormSubmitButton > button {
    width: 100%;
    min-height: 52px;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 12px;
    background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%) !important;
    color: #ffffff !important;
    font-weight: 750;
    font-size: 15.5px;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 6px 20px rgba(2, 132, 199, 0.35);
    margin-top: 18px;
}

.stButton > button:hover,
.stFormSubmitButton > button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(2, 132, 199, 0.5);
    filter: brightness(1.1);
}

/* 4. PREDICTION RESULTS & GAUGE PRESENTATION */
.outcome-dashboard-panel {
    background: linear-gradient(160deg, rgba(16, 26, 48, 0.9) 0%, rgba(11, 18, 33, 0.95) 100%);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-xl);
    padding: 32px;
    margin-top: 24px;
    box-shadow: 0 18px 45px -10px rgba(0, 0, 0, 0.5);
}

.gauge-display-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 10px;
}

.gauge-svg-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
}

.gauge-svg-element {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
}

.gauge-bg-ring {
    fill: none;
    stroke: rgba(255, 255, 255, 0.06);
    stroke-width: 13;
}

.gauge-val-ring {
    fill: none;
    stroke-width: 13;
    stroke-linecap: round;
    stroke-dasharray: 440;
    stroke-dashoffset: var(--target-offset);
    transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);
    filter: drop-shadow(0 0 12px rgba(2, 132, 199, 0.45));
}

.gauge-center-stack {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    pointer-events: none;
}

.gauge-percent-text {
    font-size: 40px;
    font-weight: 850;
    color: #ffffff;
    line-height: 1;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: -0.03em;
}

.gauge-tier-pill {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #38bdf8;
    margin-top: 8px;
    background: rgba(2, 132, 199, 0.14);
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 3px 10px;
    border-radius: 999px;
}

div[data-testid="stMetric"] {
    background: rgba(16, 26, 48, 0.7);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 18px 20px;
    transition: all 0.25s ease;
}

div[data-testid="stMetric"]:hover {
    border-color: rgba(56, 189, 248, 0.4);
    transform: translateY(-2px);
}

div[data-testid="stMetricLabel"] {
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 600;
}

div[data-testid="stMetricValue"] {
    color: #ffffff;
    font-size: 28px;
    font-weight: 800;
    font-family: 'JetBrains Mono', monospace;
}

.transparency-advisory-box {
    background: rgba(10, 16, 29, 0.75);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 16px 20px;
    margin-top: 18px;
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 1.6;
}

/* 5. SKILL GAP ANALYZER STYLING */
.competency-card-panel {
    background: rgba(16, 26, 48, 0.75);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 26px;
    margin: 20px 0;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

.competency-item-row {
    margin-bottom: 18px;
}

.competency-header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
}

.competency-title {
    font-size: 13.5px;
    font-weight: 700;
    color: #f1f5f9;
}

.competency-numeric-tag {
    font-size: 12px;
    color: var(--text-secondary);
    font-family: 'JetBrains Mono', monospace;
}

.competency-badge-tag {
    font-size: 10px;
    font-weight: 750;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.badge-optimal {
    background: rgba(16, 185, 129, 0.14);
    color: #34d399;
    border: 1px solid rgba(16, 185, 129, 0.35);
}

.badge-adequate {
    background: rgba(245, 158, 11, 0.14);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.35);
}

.badge-gap {
    background: rgba(244, 63, 94, 0.14);
    color: #fb7185;
    border: 1px solid rgba(244, 63, 94, 0.35);
}

.competency-track-bar {
    background: rgba(255, 255, 255, 0.06);
    border-radius: 999px;
    height: 7px;
    width: 100%;
    overflow: hidden;
}

.competency-fill-bar {
    height: 100%;
    border-radius: 999px;
    width: var(--target-width);
    transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.insight-columns-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin-top: 18px;
}

.insight-capsule-card {
    background: rgba(13, 22, 40, 0.7);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 20px;
    transition: all 0.25s ease;
}

.insight-capsule-card:hover {
    transform: translateY(-2px);
    border-color: rgba(56, 189, 248, 0.3);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
}

.card-strength { border-left: 3px solid #10b981; }
.card-gap { border-left: 3px solid #f43f5e; }
.card-action { border-left: 3px solid #6366f1; }

.capsule-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14.5px;
    font-weight: 750;
    color: #ffffff;
    margin-bottom: 8px;
}

.capsule-body {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0;
}

.action-domain-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    color: #a5b4fc;
    background: rgba(99, 102, 241, 0.12);
    border: 1px solid rgba(99, 102, 241, 0.3);
    padding: 3px 9px;
    border-radius: 6px;
    margin-top: 12px;
}

/* 6. CONNECTED ROADMAP TIMELINE */
.roadmap-timeline-spine-wrapper {
    position: relative;
    padding-left: 40px;
    margin: 22px 0 28px 0;
}

.roadmap-vertical-spine {
    position: absolute;
    top: 24px;
    bottom: 30px;
    left: 18px;
    width: 2px;
    background: linear-gradient(180deg, #0284c7 0%, #6366f1 100%);
    opacity: 0.6;
}

.roadmap-node-container {
    position: relative;
    margin-bottom: 24px;
}

.roadmap-node-circle {
    position: absolute;
    left: -40px;
    top: 16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #090e1a;
    border: 2px solid #0284c7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 800;
    color: #ffffff;
    box-shadow: 0 0 14px rgba(2, 132, 199, 0.35);
    z-index: 2;
    transition: all 0.25s ease;
}

.roadmap-node-container:hover .roadmap-node-circle {
    border-color: #6366f1;
    box-shadow: 0 0 18px rgba(99, 102, 241, 0.5);
    transform: scale(1.05);
}

.roadmap-content-card {
    background: linear-gradient(160deg, rgba(16, 26, 48, 0.75) 0%, rgba(11, 18, 33, 0.85) 100%);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 22px 24px;
    transition: all 0.25s ease;
}

.roadmap-content-card:hover {
    border-color: rgba(99, 102, 241, 0.35);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.3);
}

.roadmap-header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.phase-indicator-pill {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 3px 10px;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.12);
    border: 1px solid rgba(99, 102, 241, 0.3);
    color: #a5b4fc;
}

.roadmap-goal-heading {
    font-size: 13.5px;
    color: #e2e8f0;
    margin-bottom: 14px;
    line-height: 1.5;
}

.roadmap-outcome-callout {
    background: rgba(9, 15, 28, 0.7);
    border-left: 3px solid #0284c7;
    padding: 10px 14px;
    border-radius: 0 8px 8px 0;
    margin-top: 14px;
    font-size: 12.5px;
    color: var(--text-secondary);
}

/* 7. UNIVERSITY BENCHMARKS STYLING */
.cu-stat-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 16px;
    margin: 16px 0 22px 0;
}

.cu-stat-box {
    background: linear-gradient(160deg, rgba(16, 25, 46, 0.75) 0%, rgba(11, 18, 33, 0.85) 100%);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 20px;
    position: relative;
    transition: all 0.25s ease;
}

.cu-stat-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #0284c7, #6366f1);
}

.cu-stat-box:hover {
    transform: translateY(-3px);
    border-color: rgba(56, 189, 248, 0.4);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
}

.cu-box-badge {
    font-size: 11px;
    font-weight: 700;
    color: var(--accent-sky-light);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
}

.cu-box-num {
    font-size: 28px;
    font-weight: 850;
    color: #ffffff;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.15;
    margin-bottom: 4px;
}

.cu-box-desc {
    color: var(--text-secondary);
    font-size: 12px;
    line-height: 1.5;
}

.recruiter-pill-cluster {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
}

.recruiter-chip {
    background: rgba(18, 29, 52, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 12px;
    color: #e2e8f0;
    font-weight: 600;
    transition: all 0.2s ease;
}

.recruiter-chip:hover {
    border-color: var(--accent-sky-light);
    color: #ffffff;
    transform: translateY(-1px);
}

.platform-footer {
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
    padding-top: 40px;
    letter-spacing: 0.02em;
    border-top: 1px solid var(--border-subtle);
    margin-top: 48px;
}

/* Reduced Motion Accessibility */
@media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
</style>
""", unsafe_allow_html=True)


# -------------------------------------------------------------
# GRAPHICS ENGINE: NATIVE VECTOR RADAR CHART (Zero Dependencies)
# -------------------------------------------------------------
def generate_radar_chart_svg(categories, values):
    """
    Constructs a responsive, high-DPI vector Radar Chart aligned with the editorial palette.
    """
    cx, cy, R = 150, 150, 95
    N = len(categories)
    angles = [-math.pi / 2 + i * (2 * math.pi / N) for i in range(N)]

    # Concentric background polygon grids at 25%, 50%, 75%, 100%
    grid_svg = ""
    for level in [25, 50, 75, 100]:
        r = (level / 100.0) * R
        pts = " ".join(f"{cx + r * math.cos(a):.1f},{cy + r * math.sin(a):.1f}" for a in angles)
        grid_svg += f'<polygon points="{pts}" fill="none" stroke="rgba(255, 255, 255, 0.07)" stroke-width="1" />'

    # Spoke lines and labels
    spokes_svg = ""
    labels_svg = ""
    for i, a in enumerate(angles):
        x_end = cx + R * math.cos(a)
        y_end = cy + R * math.sin(a)
        spokes_svg += f'<line x1="{cx}" y1="{cy}" x2="{x_end:.1f}" y2="{y_end:.1f}" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />'

        lx = cx + (R + 25) * math.cos(a)
        ly = cy + (R + 25) * math.sin(a)
        cos_val = math.cos(a)
        anchor = "middle" if abs(cos_val) < 0.25 else ("start" if cos_val > 0 else "end")
        labels_svg += f'<text x="{lx:.1f}" y="{ly:.1f}" text-anchor="{anchor}" fill="#cbd5e1" font-size="11" font-weight="700" dominant-baseline="central">{categories[i]}</text>'

    # Data polygon & markers
    data_pts_list = []
    markers_svg = ""
    for i, val in enumerate(values):
        clamped_val = max(5.0, min(100.0, float(val)))
        r = (clamped_val / 100.0) * R
        px = cx + r * math.cos(angles[i])
        py = cy + r * math.sin(angles[i])
        data_pts_list.append(f"{px:.1f},{py:.1f}")
        markers_svg += f'<circle cx="{px:.1f}" cy="{py:.1f}" r="4" fill="#6366f1" stroke="#ffffff" stroke-width="1.5" />'

    poly_pts = " ".join(data_pts_list)

    svg_content = f"""
    <svg viewBox="0 0 300 300" style="width: 100%; max-width: 300px; display: block; margin: 0 auto;">
        {grid_svg}
        {spokes_svg}
        <polygon points="{poly_pts}" fill="rgba(2, 132, 199, 0.22)" stroke="#38bdf8" stroke-width="2.2" />
        {markers_svg}
        {labels_svg}
    </svg>
    """
    return svg_content


# -------------------------------------------------------------
# SKILL GAP ANALYZER & ROADMAP LOGIC (Strictly Preserved)
# -------------------------------------------------------------
def analyze_skill_gaps(data):
    cgpa = data["cgpa"]
    ssc = data["ssc"]
    hsc = data["hsc"]
    aptitude = data["aptitude"]
    soft_skills = data["soft_skills"]
    internships = data["internships"]
    projects = data["projects"]
    workshops = data["workshops"]
    extracurricular = data["extracurricular"]
    training = data["training"]

    cgpa_pct = min(100.0, max(0.0, (cgpa / 10.0) * 100.0))
    aptitude_pct = min(100.0, max(0.0, float(aptitude)))
    project_pct = min(100.0, max(0.0, (projects / 4.0) * 100.0))
    internship_pct = min(100.0, max(0.0, (internships / 2.0) * 100.0))
    soft_pct = min(100.0, max(0.0, (soft_skills / 5.0) * 100.0))

    training_score = 50.0 if training == "Yes" else 0.0
    workshop_score = min(35.0, (workshops / 2.0) * 35.0)
    extra_score = 15.0 if extracurricular == "Yes" else 0.0
    prep_pct = min(100.0, training_score + workshop_score + extra_score)

    dimensions = [
        {
            "name": "Academic Standing",
            "score_str": f"{cgpa:.1f} / 10.0 CGPA",
            "pct": cgpa_pct,
            "status": "Optimal" if cgpa >= 7.5 else "Critical Gap",
            "badge_class": "badge-optimal" if cgpa >= 7.5 else "badge-gap",
            "color": "linear-gradient(90deg, #059669, #10b981)" if cgpa >= 7.5 else "linear-gradient(90deg, #e11d48, #fb7185)"
        },
        {
            "name": "Aptitude & Analytical Score",
            "score_str": f"{aptitude} / 100 Marks",
            "pct": aptitude_pct,
            "status": "Optimal" if aptitude >= 75 else ("Developing" if aptitude >= 60 else "Critical Gap"),
            "badge_class": "badge-optimal" if aptitude >= 75 else ("badge-adequate" if aptitude >= 60 else "badge-gap"),
            "color": "linear-gradient(90deg, #0284c7, #38bdf8)" if aptitude >= 75 else ("linear-gradient(90deg, #d97706, #fbbf24)" if aptitude >= 60 else "linear-gradient(90deg, #e11d48, #fb7185)")
        },
        {
            "name": "Practical Project Portfolio",
            "score_str": f"{projects} Completed",
            "pct": project_pct,
            "status": "Optimal" if projects >= 3 else ("Developing" if projects >= 2 else "Critical Gap"),
            "badge_class": "badge-optimal" if projects >= 3 else ("badge-adequate" if projects >= 2 else "badge-gap"),
            "color": "linear-gradient(90deg, #0284c7, #38bdf8)" if projects >= 3 else ("linear-gradient(90deg, #d97706, #fbbf24)" if projects >= 2 else "linear-gradient(90deg, #e11d48, #fb7185)")
        },
        {
            "name": "Workplace & Internship Exposure",
            "score_str": f"{internships} Completed",
            "pct": internship_pct,
            "status": "Optimal" if internships >= 2 else ("Developing" if internships == 1 else "Critical Gap"),
            "badge_class": "badge-optimal" if internships >= 2 else ("badge-adequate" if internships == 1 else "badge-gap"),
            "color": "linear-gradient(90deg, #0284c7, #38bdf8)" if internships >= 2 else ("linear-gradient(90deg, #d97706, #fbbf24)" if internships == 1 else "linear-gradient(90deg, #e11d48, #fb7185)")
        },
        {
            "name": "Communication & Soft Skills",
            "score_str": f"{soft_skills:.1f} / 5.0 Rating",
            "pct": soft_pct,
            "status": "Optimal" if soft_skills >= 4.0 else ("Developing" if soft_skills >= 3.5 else "Critical Gap"),
            "badge_class": "badge-optimal" if soft_skills >= 4.0 else ("badge-adequate" if soft_skills >= 3.5 else "badge-gap"),
            "color": "linear-gradient(90deg, #0284c7, #38bdf8)" if soft_skills >= 4.0 else ("linear-gradient(90deg, #d97706, #fbbf24)" if soft_skills >= 3.5 else "linear-gradient(90deg, #e11d48, #fb7185)")
        },
        {
            "name": "Training & Certifications",
            "score_str": f"{workshops} Certs · Training: {training}",
            "pct": prep_pct,
            "status": "Optimal" if prep_pct >= 75 else ("Developing" if prep_pct >= 50 else "Critical Gap"),
            "badge_class": "badge-optimal" if prep_pct >= 75 else ("badge-adequate" if prep_pct >= 50 else "badge-gap"),
            "color": "linear-gradient(90deg, #0284c7, #38bdf8)" if prep_pct >= 75 else ("linear-gradient(90deg, #d97706, #fbbf24)" if prep_pct >= 50 else "linear-gradient(90deg, #e11d48, #fb7185)")
        }
    ]

    strengths = []
    if cgpa >= 7.5:
        strengths.append({
            "title": "Solid Academic Performance",
            "desc": f"Your CGPA of {cgpa:.1f} comfortably meets eligibility screening cutoffs for most campus recruiters. Consistent secondary scores (SSC: {ssc}%, HSC: {hsc}%) reinforce academic reliability."
        })
    if aptitude >= 75:
        strengths.append({
            "title": "Aptitude & Analytical Preparedness",
            "desc": f"Scoring {aptitude}/100 indicates quick numerical, logical, and problem-solving readiness, which is essential to clear initial online elimination rounds."
        })
    if projects >= 3:
        strengths.append({
            "title": "Substantial Project Proof-of-Work",
            "desc": f"With {projects} completed projects, you provide interviewers with tangible codebases and architecture designs to discuss during technical deep-dives."
        })
    if internships >= 1:
        strengths.append({
            "title": "Industrial Workplace Experience",
            "desc": f"Having {internships} internship(s) proves exposure to real engineering workflows, corporate teamwork, and project accountability."
        })
    if soft_skills >= 4.0:
        strengths.append({
            "title": "High Communication Competency",
            "desc": f"A soft skills rating of {soft_skills:.1f}/5.0 demonstrates confidence, articulateness, and interpersonal adaptability for HR and managerial rounds."
        })
    if workshops >= 2:
        strengths.append({
            "title": "Verified Industry Upskilling",
            "desc": f"Completing {workshops} workshops/certifications demonstrates initiative to learn modern tools and specialized technologies beyond the syllabus."
        })
    if training == "Yes":
        strengths.append({
            "title": "Campus Recruitment Training Foundation",
            "desc": "Participation in formal placement training gives you familiarity with timed corporate test patterns, interview etiquette, and group discussion formats."
        })
    if extracurricular == "Yes":
        strengths.append({
            "title": "Holistic Extracurricular Profile",
            "desc": "Active participation in student chapters, clubs, or sports highlights leadership, multitasking, and peer collaboration outside academics."
        })

    if not strengths:
        strengths.append({
            "title": "Academic Foundation in Progress",
            "desc": "You have an active academic baseline. Following the recommended action plan below will quickly establish distinctive profile strengths."
        })

    gaps = []
    if aptitude < 75:
        gaps.append({
            "title": "Aptitude Assessment Performance",
            "priority": "High Priority",
            "desc": f"Aptitude score of {aptitude}/100 is below the typical 75+ benchmark. First-round elimination tests heavily filter candidates on quantitative and logical speed."
        })
    if projects < 2:
        gaps.append({
            "title": "Limited Practical Project Proof",
            "priority": "High Priority",
            "desc": f"Having only {projects} project(s) leaves technical interviewers with minimal artifacts to evaluate your hands-on coding, architecture, and deployment skills."
        })
    if internships == 0:
        gaps.append({
            "title": "Zero Industrial / Internship Experience",
            "priority": "High Priority",
            "desc": "Without formal internship exposure, recruiters must evaluate workplace readiness solely on coursework, requiring an exceptionally strong project portfolio."
        })
    if soft_skills < 3.5:
        gaps.append({
            "title": "Communication & Behavioral Articulation",
            "priority": "Medium Priority",
            "desc": f"Soft skills rating of {soft_skills:.1f}/5.0 suggests potential hesitation during behavioral questions, group discussions, or explaining complex technical decisions aloud."
        })
    if training == "No":
        gaps.append({
            "title": "Absence of Placement Training",
            "priority": "Medium Priority",
            "desc": "Without formal campus recruitment training, you may be unfamiliar with company-specific assessment formats, time-pacing strategies, and interview scenarios."
        })
    if workshops < 2:
        gaps.append({
            "title": "Few Verifiable Technical Certifications",
            "priority": "Medium Priority",
            "desc": f"With only {workshops} workshop/certification, your resume lacks external verification of specialized skills in cloud, data, or modern frameworks."
        })
    if cgpa < 7.5:
        gaps.append({
            "title": "CGPA Near Screening Thresholds",
            "priority": "High Priority",
            "desc": f"Current CGPA of {cgpa:.1f} is near or below eligibility cutoffs (commonly 7.0–7.5+) enforced by select premier tech and consulting companies."
        })

    if not gaps:
        gaps.append({
            "title": "No Critical Profile Bottlenecks Detected",
            "priority": "Advancement",
            "desc": "Your self-reported metrics satisfy or exceed standard campus hiring benchmarks. Focus on advanced domain specializations, open-source work, and system design."
        })

    actions = []
    if aptitude < 75:
        actions.append({
            "title": "Daily Timed Aptitude Practice",
            "focus": "Aptitude & Assessment",
            "desc": "Dedicate 45 minutes daily to quantitative and logical reasoning problems on IndiaBIX or LeetCode. Focus on speed drills in Percentages, Time & Work, and Data Interpretation."
        })
    if projects < 2:
        actions.append({
            "title": "Build & Deploy an End-to-End Application",
            "focus": "Practical Engineering",
            "desc": "Architect a full-stack, data, or domain application solving a genuine problem. Push clean, modular code to GitHub and provide a live deployment link in your resume."
        })
    if internships == 0:
        actions.append({
            "title": "Optimize Resume & Target Internship Applications",
            "focus": "Industry Exposure",
            "desc": "Format an ATS-tailored resume highlighting capstone projects and technical coursework. Apply to 10+ entry-level startup internships or open-source programs on LinkedIn/Wellfound."
        })
    if soft_skills < 3.5:
        actions.append({
            "title": "Conduct Structured Mock Behavioral Interviews",
            "focus": "Soft Skills & Articulation",
            "desc": "Practice answering standard HR and situational questions using the STAR method (Situation, Task, Action, Result). Record yourself to polish tone, pacing, and clarity."
        })
    if training == "No":
        actions.append({
            "title": "Simulate Company-Specific Placement Tests",
            "focus": "Placement Readiness",
            "desc": "Study previous placement test patterns for major recruiters and simulate 2 full-length timed assessments to master question pacing under strict exam constraints."
        })
    if workshops < 2:
        actions.append({
            "title": "Earn an Industry-Recognized Cloud/Tech Credential",
            "focus": "Skill Upskilling",
            "desc": "Enroll in and complete a reputable foundational certification (e.g., AWS Certified Cloud Practitioner, Azure Fundamentals, or specialized engineering track) to validate your capabilities."
        })
    if cgpa < 7.5:
        actions.append({
            "title": "Elevate Semester Grades & Master Core CS Concepts",
            "focus": "Academic Foundation",
            "desc": "Focus on upcoming semester exams to raise your cumulative CGPA. Build modular revision notes on core subjects (DBMS, OS, OOP, Data Structures) for technical interviews."
        })

    if not actions:
        actions.append({
            "title": "Practice Advanced System Design & Algorithmic Problem Solving",
            "focus": "Dream Tier Preparation",
            "desc": "Solve medium/hard algorithmic problems on LeetCode and study low-level/high-level system design patterns to compete for top-tier product and software engineering roles."
        })

    radar_labels = ["Academics", "Aptitude", "Projects", "Internships", "Soft Skills", "Readiness"]
    radar_values = [cgpa_pct, aptitude_pct, project_pct, internship_pct, soft_pct, prep_pct]
    radar_svg = generate_radar_chart_svg(radar_labels, radar_values)

    return {
        "dimensions": dimensions,
        "strengths": strengths,
        "gaps": gaps,
        "actions": actions,
        "radar_svg": radar_svg
    }


def generate_personalized_roadmap(data):
    cgpa = data["cgpa"]
    aptitude = data["aptitude"]
    soft_skills = data["soft_skills"]
    internships = data["internships"]
    projects = data["projects"]
    workshops = data["workshops"]
    extracurricular = data["extracurricular"]
    training = data["training"]

    # Week 1
    w1_tasks = []
    if cgpa < 7.5:
        w1_tasks.append("Review core engineering/CS fundamentals (DBMS, OS, OOP, Data Structures) to ensure strong conceptual command for initial technical screenings.")
    else:
        w1_tasks.append("Synthesize modular concept cheat-sheets for core technical subjects (Data Structures, OOP, DBMS) for rapid interview recall.")

    if aptitude < 75:
        w1_tasks.append("Complete diagnostic timed assessments in Quantitative Aptitude (Number Systems, Percentages, Time & Work) to identify topics causing delays.")
    else:
        w1_tasks.append("Take 2 advanced mixed-topic aptitude assessments under strict 45-minute timed constraints to maintain high speed and accuracy.")

    if soft_skills < 3.5 or training == "No":
        w1_tasks.append("Draft and record a structured 90-second professional elevator pitch ('About Me') emphasizing technical passion and academic projects.")
    else:
        w1_tasks.append("Refine your professional portfolio summary and prepare two concise stories demonstrating initiative and teamwork in technical environments.")

    w1 = {
        "number": "01",
        "title": "Week 1 · Core Diagnostics & Technical Fundamentals",
        "badge": "Phase 1: Foundation",
        "goal": "Audit core technical competencies, establish diagnostic baselines, and assemble core self-presentation materials.",
        "tasks": w1_tasks,
        "outcome": "Clear identification of focus areas, refreshed fundamental concepts, and a polished introductory self-presentation."
    }

    # Week 2
    w2_tasks = []
    if projects < 2:
        w2_tasks.append("Design and begin developing a practical, full-stack or domain-specific application solving a genuine problem, with modular repository structure.")
        w2_tasks.append("Write comprehensive documentation (README, architecture diagram, setup steps) and push clean git commits to a public GitHub repository.")
    else:
        w2_tasks.append(f"Audit your {projects} existing project repositories: ensure live deployment links, clean documentation, and measurable metrics on achievements.")
        w2_tasks.append("Enhance your flagship project with an advanced capability (e.g., unit tests, API caching, or containerized Docker configuration) to discuss in deep-dive interviews.")

    if workshops < 2:
        w2_tasks.append("Enroll in and begin a focused technical micro-certification or practical workshop in high-demand domains (e.g., Cloud, REST APIs, or Applied ML).")
    else:
        w2_tasks.append(f"Consolidate and showcase your {workshops} certifications on LinkedIn and resume with verifiable credential IDs and key skill tags.")

    if internships == 0:
        w2_tasks.append("Format an ATS-compatible technical resume highlighting academic projects, key coursework, and relevant tools in lieu of formal work experience.")
    else:
        w2_tasks.append(f"Frame your {internships} internship experience(s) using the STAR (Situation, Task, Action, Result) method with quantified outcomes.")

    w2 = {
        "number": "02",
        "title": "Week 2 · Practical Projects & Portfolio Development",
        "badge": "Phase 2: Execution",
        "goal": "Strengthen technical project proof-of-work, establish verifiable portfolio artifacts, and align documentation with industry standards.",
        "tasks": w2_tasks[:3],
        "outcome": "Publicly accessible project artifacts, an ATS-optimized resume, and documented technical capabilities ready for recruiters."
    }

    # Week 3
    w3_tasks = []
    if aptitude < 75:
        w3_tasks.append("Solve 30–45 daily practice problems focusing on Logical Reasoning, Data Interpretation, and verbal comprehension on platforms like IndiaBIX or GeeksforGeeks.")
    else:
        w3_tasks.append("Solve medium-difficulty algorithmic problems on LeetCode/HackerRank focusing on Arrays, HashMaps, Trees, and Dynamic Programming.")

    if internships == 0:
        w3_tasks.append("Research and create a target list of 15 companies hiring campus graduates/interns; draft tailored cover letters and reach out to alumni on LinkedIn.")
    else:
        w3_tasks.append("Connect with 5 alumni or industry professionals working at target hiring organizations to gain insight into their technical screening expectations.")

    if training == "No":
        w3_tasks.append("Study standard campus recruitment test patterns (e.g., TCS NQT, Infosys, Cognizant, or product firm styles) and simulate two full mock exams.")
    else:
        w3_tasks.append("Review past placement training notes and practice solving corporate assessment questions under 60-minute time restrictions.")

    w3 = {
        "number": "03",
        "title": "Week 3 · Assessment Drills & Targeted Outreach",
        "badge": "Phase 3: Assessment",
        "goal": "Sharpen high-speed problem-solving skills under test pressure and initiate proactive professional outreach.",
        "tasks": w3_tasks,
        "outcome": "Measurably higher aptitude test scores, consistent time management under exam conditions, and active networking channels."
    }

    # Week 4
    w4_tasks = []
    if soft_skills < 3.5 or training == "No":
        w4_tasks.append("Conduct at least 2 mock interviews with a mentor or peer covering top behavioral questions (handling failure, managing tight deadlines, team conflicts).")
        w4_tasks.append("Practice technical whiteboard explanations: speak your thought process clearly aloud while writing code or explaining an algorithm.")
    else:
        w4_tasks.append("Participate in a comprehensive peer mock technical round, defending architectural decisions made in your flagship projects.")
        w4_tasks.append("Prepare strategic questions to ask the interviewer regarding tech stack evolution, team culture, and engineering onboarding.")

    if extracurricular == "Yes":
        w4_tasks.append("Formulate two concrete behavioral examples highlighting leadership, initiative, and conflict resolution from student club, sports, or hackathon activities.")
    else:
        w4_tasks.append("Structure situational examples demonstrating adaptability, teamwork, and accountability drawn from college coursework or lab groups.")

    w4 = {
        "number": "04",
        "title": "Week 4 · Mock Interviews & Placement Readiness",
        "badge": "Phase 4: Synthesis",
        "goal": "Simulate real-world hiring rounds, eliminate interview anxiety, and solidify communication under evaluation pressure.",
        "tasks": w4_tasks,
        "outcome": "Fluent articulation of technical and personal strengths, polished interview etiquette, and high readiness for campus drives."
    }

    return [w1, w2, w3, w4]


# -------------------------------------------------------------
# SIDEBAR NAVIGATION & SYSTEM SPECS
# -------------------------------------------------------------
with st.sidebar:
    st.markdown("""
    <div class="sidebar-header-box">
        <div class="sidebar-logo-mark">⚡</div>
        <div>
            <div class="sidebar-brand-name">PlaceWise AI</div>
            <div class="sidebar-brand-edition">Enterprise Intelligence</div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown('<div class="sidebar-nav-title">Platform View Mode</div>', unsafe_allow_html=True)
    nav_choice = st.radio(
        label="View Mode",
        options=["Placement Intelligence Suite", "University Benchmarks Only", "Architecture & Documentation"],
        index=0,
        label_visibility="collapsed"
    )

    st.markdown("""
    <div class="sidebar-card-panel">
        <div class="sidebar-card-label">Machine Learning Core</div>
        <p class="sidebar-card-body">
            <strong>Architecture:</strong> Logistic Regression Classifier<br>
            <strong>Feature Space:</strong> 10 Standardized Input Vectors<br>
            <strong>Inference Latency:</strong> &lt; 15ms
        </p>
    </div>
    <div class="sidebar-card-panel">
        <div class="sidebar-card-label">Data Provenance</div>
        <p class="sidebar-card-body">
            Official university metrics reflect verified records published by Chandigarh University (cuchd.in/placements) and are maintained separate from student ML inferences.
        </p>
    </div>
    """, unsafe_allow_html=True)


# -------------------------------------------------------------
# 1. SOPHISTICATED PRODUCT HERO WITH INTERFACE PREVIEW
# -------------------------------------------------------------
st.markdown("""
<div class="product-hero-container">
    <div class="hero-content-grid">
        <div>
            <div class="hero-tag-cluster">
                <div class="pill-version-tag">PlaceWise AI v2.4</div>
                <div class="pill-status-live">
                    <span class="live-beacon"></span>
                    Model Live & Operational
                </div>
            </div>
            <h1 class="hero-headline">
                Predictive Placement <br><span class="headline-highlight">Intelligence Platform</span>
            </h1>
            <p class="hero-description-text">
                PlaceWise AI synthesizes academic trajectories, practical engineering artifacts, and corporate assessment metrics into precision placement forecasts, multi-dimensional skill diagnostics, and actionable career sprints.
            </p>
            <div class="hero-cta-group">
                <a href="#candidate-intelligence-studio" class="btn-primary-action">
                    <span>Launch Candidate Studio</span>
                    <span>&darr;</span>
                </a>
                <a href="#platform-storytelling" class="btn-secondary-action">
                    <span>Explore Product Capabilities</span>
                    <span>&rarr;</span>
                </a>
            </div>
        </div>
        <div>
            <!-- Layered Interface Showcase Mockup -->
            <div class="product-showcase-window">
                <div class="window-title-bar">
                    <div class="window-dots">
                        <span class="window-dot dot-red"></span>
                        <span class="window-dot dot-yellow"></span>
                        <span class="window-dot dot-green"></span>
                    </div>
                    <div class="window-path-label">analytics.session / student-0482</div>
                    <div class="window-badge-pill">ACTIVE INFERENCE</div>
                </div>
                <div class="window-body-canvas">
                    <div class="mockup-stat-strip">
                        <div class="mockup-mini-card">
                            <div class="mockup-card-label">Placement Likelihood</div>
                            <div class="mockup-card-value">88.4%</div>
                            <div class="mockup-card-sub">▲ Optimal Readiness</div>
                        </div>
                        <div class="mockup-mini-card">
                            <div class="mockup-card-label">Assessment Match</div>
                            <div class="mockup-competency-list">
                                <div>
                                    <div class="mockup-bar-row">
                                        <span>Aptitude (85/100)</span>
                                        <span style="color: #38bdf8;">85%</span>
                                    </div>
                                    <div class="mockup-mini-track">
                                        <div class="mockup-mini-fill" style="width: 85%; background: #38bdf8;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="mockup-bar-row">
                                        <span>Projects (3 Deployed)</span>
                                        <span style="color: #10b981;">75%</span>
                                    </div>
                                    <div class="mockup-mini-track">
                                        <div class="mockup-mini-fill" style="width: 75%; background: #10b981;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mockup-floating-event">
                        <div class="event-icon-box">✓</div>
                        <div style="flex: 1;">
                            <div class="event-details-text"><strong>Career Roadmap:</strong> Phase 01 Diagnostic Sprint Active</div>
                            <div class="event-time-stamp">Automated milestone tracker initialized</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)


# -------------------------------------------------------------
# 2. PRODUCT STORYTELLING SHOWCASE (The Four Core Capabilities)
# -------------------------------------------------------------
st.markdown('<div id="platform-storytelling"></div>', unsafe_allow_html=True)

if nav_choice in ["Placement Intelligence Suite", "Architecture & Documentation"]:
    st.markdown("""
    <div class="storytelling-wrapper">
        <div class="section-editorial-header">
            <div class="editorial-tag">✦ Product Architecture</div>
            <div class="editorial-title">Engineered for Actionable Placement Outcomes</div>
            <div class="editorial-subtitle">
                PlaceWise AI combines statistical machine learning with transparent diagnostic frameworks to transition students from guesswork to structured recruitment readiness.
            </div>
        </div>
        <div class="bento-story-grid">
            <div class="bento-story-card">
                <div class="bento-card-num">01 / ML PREDICTOR</div>
                <div class="bento-card-title">Dual-Class Probabilistic Classifier</div>
                <div class="bento-card-desc">
                    Trained on verified candidate cohorts across 10 academic and technical dimensions to calculate realistic placement likelihood without oversimplified assumptions.
                </div>
                <div class="bento-card-meta">
                    <span class="meta-pill">Logistic Regression</span>
                    <span class="meta-pill">Calibrated Proba</span>
                </div>
            </div>
            <div class="bento-story-card">
                <div class="bento-card-num">02 / SKILL GAP ANALYZER</div>
                <div class="bento-card-title">6-Dimensional Competency Audit</div>
                <div class="bento-card-desc">
                    Contrasts individual scores against corporate screening thresholds to isolate profile bottlenecks across aptitude, applied projects, soft skills, and training.
                </div>
                <div class="bento-card-meta">
                    <span class="meta-pill">Vector Radar Chart</span>
                    <span class="meta-pill">Rule-Based Gaps</span>
                </div>
            </div>
            <div class="bento-story-card">
                <div class="bento-card-num">03 / CAREER ROADMAP</div>
                <div class="bento-card-title">Personalized 4-Week Sprint Plan</div>
                <div class="bento-card-desc">
                    Translates diagnostic deficits into an actionable 4-week timeline with weekly goals, specific tasks, expected outcomes, and interactive checkbox tracking.
                </div>
                <div class="bento-card-meta">
                    <span class="meta-pill">4 Sprint Phases</span>
                    <span class="meta-pill">Stateful Checklists</span>
                </div>
            </div>
            <div class="bento-story-card">
                <div class="bento-card-num">04 / BENCHMARKS</div>
                <div class="bento-card-title">Institutional Placement Ground-Truth</div>
                <div class="bento-card-desc">
                    Grounded recruitment data from Chandigarh University providing macroeconomic context, verified package records, and top visiting recruiter networks.
                </div>
                <div class="bento-card-meta">
                    <span class="meta-pill">1,300+ Corporates</span>
                    <span class="meta-pill">Verified Data</span>
                </div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)


# -------------------------------------------------------------
# 3. CANDIDATE INTELLIGENCE STUDIO (Prediction Workspace)
# -------------------------------------------------------------
st.markdown('<div id="candidate-intelligence-studio"></div>', unsafe_allow_html=True)

if nav_choice in ["Placement Intelligence Suite"]:
    st.markdown("""
    <div class="studio-container">
        <div class="studio-header">
            <div class="studio-title-block">
                <h3>Candidate Intelligence Studio</h3>
                <p>Input candidate academic history, technical projects, and assessment records for real-time model evaluation.</p>
            </div>
            <div class="studio-model-indicator">
                <span>●</span> MODEL_CLASSIFIER_V1
            </div>
        </div>
    """, unsafe_allow_html=True)

    with st.form("placement_form"):
        # Section 1: Academic Performance
        st.markdown('<div class="category-badge-title">📚 Category 01 · Academic Foundations</div>', unsafe_allow_html=True)
        col_a1, col_a2, col_a3 = st.columns(3)
        with col_a1:
            cgpa = st.slider(
                "CGPA (Grade Point Average)", 0.0, 10.0, 8.0, 0.1,
                help="Cumulative Grade Point Average on a 10.0 scale"
            )
        with col_a2:
            ssc = st.slider(
                "Secondary School (SSC %)", 0, 100, 85,
                help="10th Standard percentage"
            )
        with col_a3:
            hsc = st.slider(
                "Higher Secondary (HSC %)", 0, 100, 80,
                help="12th Standard percentage"
            )

        st.divider()

        # Section 2: Technical Skills & Experience
        st.markdown('<div class="category-badge-title">💻 Category 02 · Technical Skills & Experience</div>', unsafe_allow_html=True)
        col_s1, col_s2 = st.columns(2)
        with col_s1:
            aptitude = st.slider(
                "Aptitude Test Score (0–100)", 0, 100, 80,
                help="Score in quantitative, logical, and verbal assessments"
            )
            internships = st.number_input(
                "Formal Internships Completed", 0, 10, 2,
                help="Total corporate or research internships completed"
            )
        with col_s2:
            soft_skills = st.slider(
                "Soft Skills Rating (0.0–5.0)", 0.0, 5.0, 4.0, 0.1,
                help="Assessed communication, presentation, and behavioral rating"
            )
            projects = st.number_input(
                "Completed Engineering Projects", 0, 20, 3,
                help="Substantive independent, coursework, or capstone projects"
            )

        st.divider()

        # Section 3: Professional Training & Co-Curriculars
        st.markdown('<div class="category-badge-title">🎯 Category 03 · Training & Extracurriculars</div>', unsafe_allow_html=True)
        col_t1, col_t2, col_t3 = st.columns(3)
        with col_t1:
            workshops = st.number_input(
                "Certifications & Workshops", 0, 20, 2,
                help="Completed technical certifications and bootcamps"
            )
        with col_t2:
            extracurricular = st.selectbox(
                "Extracurricular Engagement", ["Yes", "No"],
                help="Active involvement in clubs, sports, or hackathons"
            )
        with col_t3:
            training = st.selectbox(
                "Placement Training Completed", ["Yes", "No"],
                help="Formal participation in campus placement readiness courses"
            )

        st.markdown("")
        submitted = st.form_submit_button("⚡ Run Placement Intelligence Evaluation", use_container_width=True)

    st.markdown("</div>", unsafe_allow_html=True)

    # Execution flow upon form submission
    if submitted:
        student = pd.DataFrame([{
            "CGPA": cgpa,
            "Internships": internships,
            "Projects": projects,
            "Workshops/Certifications": workshops,
            "AptitudeTestScore": aptitude,
            "SoftSkillsRating": soft_skills,
            "ExtracurricularActivities": 1 if extracurricular == "Yes" else 0,
            "PlacementTraining": 1 if training == "Yes" else 0,
            "SSC_Marks": ssc,
            "HSC_Marks": hsc
        }], columns=features)

        # Exact model inference (strictly preserved)
        pred_val = model.predict(student)[0]
        prob_val = model.predict_proba(student)[0]

        # Store in session state for persistent interaction
        st.session_state["has_prediction"] = True
        st.session_state["student_record"] = {
            "cgpa": cgpa,
            "ssc": ssc,
            "hsc": hsc,
            "aptitude": aptitude,
            "soft_skills": soft_skills,
            "internships": internships,
            "projects": projects,
            "workshops": workshops,
            "extracurricular": extracurricular,
            "training": training,
        }
        st.session_state["prediction"] = pred_val
        st.session_state["probabilities"] = prob_val

    # -------------------------------------------------------------
    # 4. PREDICTION RESULTS & IMPACTFUL GAUGE
    # -------------------------------------------------------------
    if st.session_state.get("has_prediction", False):
        student_record = st.session_state["student_record"]
        prediction = st.session_state["prediction"]
        probabilities = st.session_state["probabilities"]
        placed_probability = float(probabilities[1]) * 100
        not_placed_probability = float(probabilities[0]) * 100

        circumference = 440.0
        clamped_prob = max(0.0, min(100.0, placed_probability))
        gauge_offset = circumference * (1.0 - (clamped_prob / 100.0))
        stroke_color_start = "#0284c7" if prediction == 1 else "#f59e0b"
        stroke_color_end = "#6366f1" if prediction == 1 else "#ef4444"
        badge_label = "Optimal Placement Tier" if prediction == 1 else "Development Tier"

        st.markdown("""
        <div class="outcome-dashboard-panel">
            <div class="section-editorial-header">
                <div class="editorial-tag">✦ Predictive Evaluation</div>
                <div class="editorial-title">Placement Assessment Results</div>
            </div>
        """, unsafe_allow_html=True)

        if prediction == 1:
            st.success("🎉 **Model Verdict: Placed Candidate** — The evaluated profile demonstrates high statistical alignment with historical campus hiring criteria.")
        else:
            st.warning("⚡ **Model Verdict: Development Candidate** — The profile demonstrates growth opportunities across technical projects, aptitude, or placement training.")

        col_g1, col_g2 = st.columns([1.1, 1.4])

        with col_g1:
            st.markdown(f"""
            <div class="gauge-display-container">
                <div class="gauge-svg-wrapper">
                    <svg class="gauge-svg-element" viewBox="0 0 180 180">
                        <defs>
                            <linearGradient id="editorialGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="{stroke_color_start}" />
                                <stop offset="100%" stop-color="{stroke_color_end}" />
                            </linearGradient>
                        </defs>
                        <circle class="gauge-bg-ring" cx="90" cy="90" r="70" />
                        <circle class="gauge-val-ring" cx="90" cy="90" r="70" 
                                stroke="url(#editorialGaugeGrad)" 
                                stroke-dasharray="{circumference}" 
                                style="--target-offset: {gauge_offset:.1f};" />
                    </svg>
                    <div class="gauge-center-stack">
                        <div class="gauge-percent-text">{placed_probability:.1f}%</div>
                        <div class="gauge-tier-pill">{badge_label}</div>
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)

        with col_g2:
            st.metric("Estimated Placement Likelihood", f"{placed_probability:.1f}%")
            st.metric("Estimated Non-Placement Probability", f"{not_placed_probability:.1f}%")
            st.progress(int(round(placed_probability)))

        st.markdown(f"""
            <div class="transparency-advisory-box">
                <strong>Executive Assessment:</strong> {'The student profile demonstrates a robust academic foundation and verifiable practical projects, placing them favorably for standard corporate hiring.' if prediction == 1 else 'The predictive model highlights that targeted upskilling in aptitude test drills, hands-on application repositories, and placement training can substantially raise placement odds.'}<br><br>
                <span style="font-size: 11.5px; color: var(--text-muted);">
                    ℹ️ <strong>Transparency Advisory:</strong> Probabilities are machine learning estimates based on historical training data. Predictions serve strictly as guidance and do not guarantee corporate recruitment or official university eligibility.
                </span>
            </div>
        </div>
        """, unsafe_allow_html=True)

        # -------------------------------------------------------------
        # 5. SKILL GAP ANALYZER COMPONENT
        # -------------------------------------------------------------
        analysis_data = analyze_skill_gaps(student_record)

        st.markdown("""
        <div style="margin-top: 36px;"></div>
        <div class="section-editorial-header">
            <div class="editorial-tag">✦ Multi-Dimensional Diagnostics</div>
            <div class="editorial-title">Skill Gap Analyzer</div>
            <div class="editorial-subtitle">
                Systematic competency evaluation identifying validated strengths, screening gaps, and prioritized next steps.
            </div>
        </div>
        """, unsafe_allow_html=True)

        st.markdown("""
        <div class="competency-card-panel">
            <div style="font-size: 15px; font-weight: 750; color: #f8fafc; margin-bottom: 20px;">
                Candidate Competency Matrix & Radar Distribution
            </div>
        """, unsafe_allow_html=True)

        col_radar, col_bars = st.columns([1.1, 1.3])

        with col_radar:
            st.markdown(f'<div style="display:flex; justify-content:center;">{analysis_data["radar_svg"]}</div>', unsafe_allow_html=True)
            st.caption("Six-dimensional competency footprint normalized against campus hiring baselines.")

        with col_bars:
            for dim in analysis_data["dimensions"]:
                st.markdown(f"""
                <div class="competency-item-row">
                    <div class="competency-header-flex">
                        <span class="competency-title">{dim['name']}</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="competency-numeric-tag">{dim['score_str']}</span>
                            <span class="competency-badge-tag {dim['badge_class']}">{dim['status']}</span>
                        </div>
                    </div>
                    <div class="competency-track-bar">
                        <div class="competency-fill-bar" style="--target-width: {dim['pct']:.1f}%; background: {dim['color']};"></div>
                    </div>
                </div>
                """, unsafe_allow_html=True)

        st.markdown("</div>", unsafe_allow_html=True)

        # Structured Insight Tabs
        tab_strengths, tab_gaps, tab_actions = st.tabs([
            f"✦ Validated Strengths ({len(analysis_data['strengths'])})",
            f"✦ Priority Growth Gaps ({len(analysis_data['gaps'])})",
            f"✦ Actionable Recommendations ({len(analysis_data['actions'])})"
        ])

        with tab_strengths:
            st.markdown('<div class="insight-columns-grid">', unsafe_allow_html=True)
            for item in analysis_data["strengths"]:
                st.markdown(f"""
                <div class="insight-capsule-card card-strength">
                    <div class="capsule-header">
                        <span style="color: #10b981;">✔</span>
                        <span>{item['title']}</span>
                    </div>
                    <p class="capsule-body">{item['desc']}</p>
                </div>
                """, unsafe_allow_html=True)
            st.markdown('</div>', unsafe_allow_html=True)

        with tab_gaps:
            st.markdown('<div class="insight-columns-grid">', unsafe_allow_html=True)
            for item in analysis_data["gaps"]:
                st.markdown(f"""
                <div class="insight-capsule-card card-gap">
                    <div class="capsule-header">
                        <span style="color: #f43f5e;">▲</span>
                        <span>{item['title']}</span>
                    </div>
                    <p class="capsule-body">{item['desc']}</p>
                </div>
                """, unsafe_allow_html=True)
            st.markdown('</div>', unsafe_allow_html=True)

        with tab_actions:
            st.markdown('<div class="insight-columns-grid">', unsafe_allow_html=True)
            for item in analysis_data["actions"]:
                st.markdown(f"""
                <div class="insight-capsule-card card-action">
                    <div class="capsule-header">
                        <span style="color: #6366f1;">➔</span>
                        <span>{item['title']}</span>
                    </div>
                    <p class="capsule-body">{item['desc']}</p>
                    <span class="action-domain-tag">Focus: {item['focus']}</span>
                </div>
                """, unsafe_allow_html=True)
            st.markdown('</div>', unsafe_allow_html=True)

        # -------------------------------------------------------------
        # 6. PERSONALIZED 4-WEEK CAREER ROADMAP
        # -------------------------------------------------------------
        st.markdown("""
        <div style="margin-top: 40px;"></div>
        <div class="section-editorial-header">
            <div class="editorial-tag">✦ Structured Sprint Plan</div>
            <div class="editorial-title">Personalized Career Roadmap</div>
            <div class="editorial-subtitle">
                A 4-week preparation plan generated from candidate attributes with interactive milestone progress tracking.
            </div>
        </div>
        """, unsafe_allow_html=True)

        roadmap_weeks = generate_personalized_roadmap(student_record)

        total_tasks = sum(len(week["tasks"]) for week in roadmap_weeks)
        completed_tasks = sum(
            1 for w_idx, week in enumerate(roadmap_weeks)
            for t_idx, _ in enumerate(week["tasks"])
            if st.session_state.get(f"task_wk_{w_idx}_t_{t_idx}", False)
        )
        progress_percentage = int(round((completed_tasks / total_tasks) * 100)) if total_tasks > 0 else 0

        # Progress Overview Bar
        st.markdown(f"""
        <div class="competency-card-panel" style="padding: 16px 20px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="font-size: 14px; font-weight: 700; color: #f8fafc;">
                    ⚡ Sprint Completion: {completed_tasks} of {total_tasks} Actionable Items Finished
                </div>
                <div style="background: rgba(2, 132, 199, 0.14); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-size: 12px; font-weight: 700; padding: 2px 10px; border-radius: 999px;">
                    {progress_percentage}% Completed
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        st.progress(progress_percentage)
        st.caption("Check off items as you complete each task during your 4-week preparation cycle.")

        # Connected Timeline Layout
        st.markdown('<div class="roadmap-timeline-spine-wrapper"><div class="roadmap-vertical-spine"></div>', unsafe_allow_html=True)

        for w_idx, week in enumerate(roadmap_weeks):
            st.markdown(f"""
            <div class="roadmap-node-container">
                <div class="roadmap-node-circle">{week['number']}</div>
                <div class="roadmap-content-card">
                    <div class="roadmap-header-line">
                        <div style="font-size: 15.5px; font-weight: 750; color: #ffffff;">{week['title']}</div>
                        <div class="phase-indicator-pill">{week['badge']}</div>
                    </div>
                    <div class="roadmap-goal-heading">
                        <strong>Weekly Goal:</strong> {week['goal']}
                    </div>
            """, unsafe_allow_html=True)

            with st.container():
                st.markdown("**Actionable Tasks:**")
                for t_idx, task_text in enumerate(week["tasks"]):
                    chk_key = f"task_wk_{w_idx}_t_{t_idx}"
                    st.checkbox(task_text, key=chk_key)

            st.markdown(f"""
                    <div class="roadmap-outcome-callout">
                        <strong>🏁 Expected Outcome:</strong> {week['outcome']}
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)

        st.markdown('</div>', unsafe_allow_html=True)

    else:
        # Initial state before first prediction run
        st.markdown("""
        <div class="product-hero-container" style="padding: 34px 28px; text-align: center; margin: 24px 0;">
            <div style="font-size: 28px; margin-bottom: 8px;">📊</div>
            <div style="font-weight: 800; font-size: 17px; color: #f1f5f9; margin-bottom: 6px;">
                Candidate Intelligence Studio Standing By
            </div>
            <div style="font-size: 13.5px; color: var(--text-secondary); max-width: 580px; margin: 0 auto; line-height: 1.6;">
                Configure the candidate parameters in the form above and click <strong>⚡ Run Placement Intelligence Evaluation</strong> to generate the calibrated placement likelihood gauge, multi-dimensional skill diagnostics, and customized 4-week career sprint plan.
            </div>
        </div>
        """, unsafe_allow_html=True)


# -------------------------------------------------------------
# 7. CHANDIGARH UNIVERSITY PLACEMENT BENCHMARKS
# -------------------------------------------------------------
if nav_choice in ["Placement Intelligence Suite", "University Benchmarks Only"]:
    st.markdown("""
    <div style="margin-top: 48px;"></div>
    <div class="section-editorial-header">
        <div class="editorial-tag">✦ Institutional Benchmark Data</div>
        <div class="editorial-title">Chandigarh University · Official Placement Statistics</div>
        <div class="editorial-subtitle">
            Verified institutional benchmarks published by Chandigarh University (cuchd.in/placements). Kept strictly distinct from individual student ML inferences.
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="cu-stat-layout">
        <div class="cu-stat-box">
            <div class="cu-box-badge">International Apex</div>
            <div class="cu-box-num">₹1.7 Cr</div>
            <div class="cu-box-desc">Highest International Package secured by engineering graduates</div>
        </div>
        <div class="cu-stat-box">
            <div class="cu-box-badge">National Apex</div>
            <div class="cu-box-num">₹59.9 LPA</div>
            <div class="cu-box-desc">Highest National Package across technology & engineering streams</div>
        </div>
        <div class="cu-stat-box">
            <div class="cu-box-badge">Corporate Engagement</div>
            <div class="cu-box-num">1,300+</div>
            <div class="cu-box-desc">Corporate recruiters visiting campus, including 300+ Fortune 500 MNCs</div>
        </div>
        <div class="cu-stat-box">
            <div class="cu-box-badge">Offer Volume</div>
            <div class="cu-box-num">9,000+</div>
            <div class="cu-box-desc">Total job and internship offers generated across academic cycles</div>
        </div>
        <div class="cu-stat-box">
            <div class="cu-box-badge">Management Domain</div>
            <div class="cu-box-num">₹28 LPA</div>
            <div class="cu-box-desc">Highest package secured in MBA and corporate management domains</div>
        </div>
        <div class="cu-stat-box">
            <div class="cu-box-badge">Multi-Offer Portfolios</div>
            <div class="cu-box-num">Top Tier</div>
            <div class="cu-box-desc">Substantial volume of eligible candidates securing multi-offer portfolios</div>
        </div>
    </div>

    <div class="transparency-advisory-box">
        <div>
            <strong>Official Source Verification:</strong> All institutional figures reflect historical placement highlights published directly on the official portal at <a href="https://www.cuchd.in/placements/" target="_blank" style="color: #38bdf8; text-decoration: underline;">cuchd.in/placements</a>. Institutional metrics serve as macroeconomic reference points and do not alter individual student predictions.
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("**Select Corporate Recruitment Partners**")
    st.markdown("""
    <div class="recruiter-pill-cluster">
        <span class="recruiter-chip">Microsoft</span>
        <span class="recruiter-chip">Amazon</span>
        <span class="recruiter-chip">Google</span>
        <span class="recruiter-chip">IBM</span>
        <span class="recruiter-chip">SAP Labs</span>
        <span class="recruiter-chip">Deloitte</span>
        <span class="recruiter-chip">Bank of America</span>
        <span class="recruiter-chip">Cognizant</span>
        <span class="recruiter-chip">Capgemini</span>
        <span class="recruiter-chip">Wipro</span>
        <span class="recruiter-chip">Qualcomm</span>
        <span class="recruiter-chip">Intel</span>
    </div>
    """, unsafe_allow_html=True)


# -------------------------------------------------------------
# 8. ARCHITECTURE & DOCUMENTATION VIEW
# -------------------------------------------------------------
if nav_choice == "Architecture & Documentation":
    st.markdown("""
    <div class="studio-container" style="margin-top: 24px;">
        <div class="studio-header">
            <div class="studio-title-block">
                <h3>Technical Documentation & Model Specifications</h3>
                <p>System architecture, feature vectors, and transparency guidelines for PlaceWise AI.</p>
            </div>
            <div class="studio-model-indicator">DOCS_V2.4</div>
        </div>
        
        <div style="font-size: 14px; line-height: 1.7; color: #cbd5e1;">
            <p><strong>Overview:</strong> PlaceWise AI is an educational decision-support application built using Scikit-Learn and Streamlit. It uses a 10-feature classifier to provide probabilistic assessments of candidate placement readiness.</p>
            
            <h4 style="color: #38bdf8; margin-top: 18px;">Feature Vector Ordering (Preserved Strictly):</h4>
            <ol style="margin-left: 20px;">
                <li><code>CGPA</code> (Float, 0.0 – 10.0)</li>
                <li><code>Internships</code> (Integer, 0 – 10)</li>
                <li><code>Projects</code> (Integer, 0 – 20)</li>
                <li><code>Workshops/Certifications</code> (Integer, 0 – 20)</li>
                <li><code>AptitudeTestScore</code> (Integer, 0 – 100)</li>
                <li><code>SoftSkillsRating</code> (Float, 0.0 – 5.0)</li>
                <li><code>ExtracurricularActivities</code> (Binary, 0 or 1)</li>
                <li><code>PlacementTraining</code> (Binary, 0 or 1)</li>
                <li><code>SSC_Marks</code> (Integer, 0 – 100)</li>
                <li><code>HSC_Marks</code> (Integer, 0 – 100)</li>
            </ol>
            
            <h4 style="color: #38bdf8; margin-top: 18px;">Diagnostic Components:</h4>
            <ul>
                <li><strong>Placement Likelihood Gauge:</strong> Calibrated probability metric generated directly from <code>model.predict_proba()</code>.</li>
                <li><strong>Skill Gap Analyzer:</strong> Independent, rule-based competency analysis assessing 6 key dimensions against standard corporate hiring expectations.</li>
                <li><strong>Personalized Career Roadmap:</strong> 4-week structured sprint plan prioritizing candidate growth areas with stateful progress tracking.</li>
                <li><strong>Institutional Benchmarks:</strong> Grounded data from Chandigarh University (cuchd.in/placements).</li>
            </ul>
        </div>
    </div>
    """, unsafe_allow_html=True)


# -------------------------------------------------------------
# FOOTER
# -------------------------------------------------------------
st.markdown("""
<div class="platform-footer">
    <strong>PlaceWise AI</strong> · Enterprise Student Placement Intelligence & Career Readiness Platform<br>
    Built with Streamlit & Scikit-Learn · Academic Guidance & Planning Only · All Rights Reserved
</div>
""", unsafe_allow_html=True)
