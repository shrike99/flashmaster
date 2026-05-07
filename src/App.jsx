import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

/* ─────────────────────────────────────────────────────────────────────────────
   SLEEK BLACK & WHITE FLASHCARD APP - SHADCN NAVBAR EDITION
   Design System: shadcn/ui inspired
   Color Scheme: Pure monochrome with blue accents
   Typography: Inter for everything
───────────────────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}

[data-theme="dark"] {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}

html, body, #root {
  height: 100%;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─── LAYOUT ───────────────────────────────────────────────────────────────── */
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.navbar {
  border-bottom: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 0;
  display: flex;
  align-items: center;
  height: 56px;
  flex-shrink: 0;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 100%;
  border-right: 1px solid hsl(var(--border));
  min-width: 200px;
}

.navbar-logo {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: hsl(var(--foreground));
}

.navbar-nav {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 6px;
  gap: 1px;
}

.navbar-actions {
  display: flex;
  gap: 2px;
  align-items: center;
  padding: 0 16px;
  border-left: 1px solid hsl(var(--border));
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  height: 36px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  white-space: nowrap;
  position: relative;
}

.nav-link:hover {
  background: hsl(var(--accent));
  color: hsl(var(--foreground));
}

.nav-link.active {
  color: hsl(var(--foreground));
  background: hsl(var(--accent));
  font-weight: 500;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -14px;
  left: 0;
  right: 0;
  height: 2px;
  background: hsl(var(--primary));
  border-radius: 2px 2px 0 0;
}

.main {
  flex: 1;
  overflow-y: auto;
  background: hsl(var(--background));
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px;
}

@media (max-width: 639px) {
  .main-content {
    padding: 32px 20px;
  }
}

@media (min-width: 640px) {
  .main-content {
    padding: 56px 48px;
  }
}

@media (min-width: 1024px) {
  .main-content {
    padding: 64px 64px;
  }
}

/* ─── COMPONENTS ───────────────────────────────────────────────────────────── */

/* Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  border: 1px solid transparent;
  font-family: inherit;
}

.btn:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.btn-default {
  height: 40px;
  padding: 0 20px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.btn-default:hover {
  opacity: 0.9;
}

.btn-outline {
  height: 40px;
  padding: 0 20px;
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}

.btn-outline:hover {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.btn-ghost {
  height: 40px;
  padding: 0 16px;
  background: transparent;
  color: hsl(var(--foreground));
}

.btn-ghost:hover {
  background: hsl(var(--accent));
}

.btn-destructive {
  height: 40px;
  padding: 0 20px;
  background: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}

.btn-destructive:hover {
  opacity: 0.9;
}

.btn-sm {
  height: 36px;
  padding: 0 16px;
  font-size: 13px;
}

.btn-icon {
  height: 40px;
  width: 40px;
  padding: 0;
}

.btn-icon-sm {
  height: 36px;
  width: 36px;
  padding: 0;
}

/* Card */
.card {
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 24px 24px 0;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.card-description {
  font-size: 13px;
  color: hsl(var(--muted-foreground));
  margin-top: 4px;
}

.card-content {
  padding: 24px;
}

/* Input */
.input {
  display: flex;
  height: 40px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 0 14px;
  font-size: 14px;
  color: hsl(var(--foreground));
  outline: none;
  transition: all 0.15s;
  font-family: inherit;
}

.input:focus {
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 3px hsl(var(--ring) / 0.1);
}

.input::placeholder {
  color: hsl(var(--muted-foreground));
}

.textarea {
  display: flex;
  min-height: 100px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 14px;
  font-size: 14px;
  color: hsl(var(--foreground));
  outline: none;
  transition: all 0.15s;
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;
}

.textarea:focus {
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 3px hsl(var(--ring) / 0.1);
}

.textarea::placeholder {
  color: hsl(var(--muted-foreground));
}

/* Label */
.label {
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 10px;
  color: hsl(var(--foreground));
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid transparent;
}

.badge-default {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.badge-outline {
  border-color: hsl(var(--border));
}

.badge-destructive {
  background: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}

/* Separator */
.separator {
  height: 1px;
  background: hsl(var(--border));
  margin: 20px 0;
}

/* ─── PAGE LAYOUT ──────────────────────────────────────────────────────────── */
.page-header {
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.025em;
  margin-bottom: 8px;
  line-height: 1.2;
}

.page-description {
  font-size: 15px;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
}

.page-actions {
  display: flex;
  gap: 10px;
  margin-top: 24px;
  flex-wrap: wrap;
}

/* ─── CARDS GRID ───────────────────────────────────────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

@media (min-width: 640px) {
  .cards-grid {
    gap: 24px;
  }
}

.flashcard {
  position: relative;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

.flashcard:hover {
  border-color: hsl(var(--foreground) / 0.2);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.flashcard-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: hsl(var(--muted));
  border-bottom: 1px solid hsl(var(--border));
}

.flashcard-body {
  padding: 24px;
  min-height: 160px;
}

.flashcard-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.flashcard-question {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 16px;
}

.flashcard-answer {
  font-size: 14px;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
  padding-top: 16px;
  border-top: 1px solid hsl(var(--border));
}

.flashcard-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.flashcard:hover .flashcard-actions {
  opacity: 1;
}

.status-indicator {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-success {
  background: hsl(120 100% 35%);
}

.status-error {
  background: hsl(var(--destructive));
}

/* ─── CREATOR ──────────────────────────────────────────────────────────────── */
.creator-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.creator-card {
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  padding: 24px;
  transition: all 0.2s;
}

.creator-card.focused {
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.1);
}

.creator-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.creator-number {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: hsl(var(--muted-foreground));
}

.creator-section {
  margin-bottom: 20px;
}

.creator-section:last-child {
  margin-bottom: 0;
}

.creator-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .creator-grid {
    grid-template-columns: 1fr;
  }
}

.field-wrapper {
  display: flex;
  flex-direction: column;
}

/* ─── STUDY MODE ───────────────────────────────────────────────────────────── */
.study-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (min-width: 640px) {
  .study-container {
    padding: 0 32px;
  }
}

.study-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.study-info h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 6px;
  line-height: 1.2;
}

.study-info p {
  font-size: 14px;
  color: hsl(var(--muted-foreground));
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: hsl(var(--secondary));
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 36px;
}

.progress-fill {
  height: 100%;
  background: hsl(var(--primary));
  border-radius: 999px;
  transition: width 0.3s;
}

.study-card-wrapper {
  perspective: 1200px;
  margin-bottom: 24px;
}

.study-card {
  position: relative;
  min-height: 400px;
  transition: transform 0.4s ease;
  transform-style: preserve-3d;
  cursor: pointer;
  user-select: none;
  transform: rotateY(0deg);
}

.study-card.flipped {
  transform: rotateY(180deg);
}

.study-card.swipeable {
  cursor: grab;
}

.study-card.swipeable:active {
  cursor: grabbing;
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-face-back {
  transform: rotateY(180deg);
}

.card-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: hsl(var(--muted));
  border-bottom: 1px solid hsl(var(--border));
  cursor: zoom-in;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-image.loaded {
  opacity: 1;
}

.card-body {
  flex: 1;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: hsl(var(--muted-foreground));
  margin-bottom: 16px;
}

.card-text {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
}

.card-hint {
  font-size: 13px;
  color: hsl(var(--muted-foreground));
  margin-top: 24px;
}

.swipe-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 72px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  z-index: 10;
}

.swipe-left {
  left: 60px;
  color: hsl(var(--destructive));
}

.swipe-right {
  right: 60px;
  color: hsl(120 100% 35%);
}

.study-actions {
  display: flex;
  gap: 16px;
  margin-top: 28px;
}

.study-actions .btn {
  flex: 1;
}

.keyboard-hint {
  text-align: center;
  margin-top: 28px;
  font-size: 13px;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
}

.kbd {
  display: inline-block;
  background: hsl(var(--muted));
  border: 1px solid hsl(var(--border));
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 12px;
  font-family: 'Inter', monospace;
  margin: 0 3px;
  font-weight: 500;
}

/* ─── STATS ────────────────────────────────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

.stat-card {
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  padding: 24px;
}

.stat-value {
  font-size: 36px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 13px;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.history-section h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  transition: all 0.2s;
}

.history-item:hover {
  border-color: hsl(var(--foreground) / 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.history-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.history-result {
  font-size: 15px;
  font-weight: 500;
}

.history-date {
  font-size: 13px;
  color: hsl(var(--muted-foreground));
}

.history-score {
  font-size: 15px;
  font-weight: 600;
}

/* ─── MODAL ────────────────────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.2s;
}

.modal {
  width: 500px;
  max-width: 94vw;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  animation: slideUp 0.3s;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 0 24px 24px;
}

.field {
  margin-bottom: 16px;
}

.field:last-child {
  margin-bottom: 0;
}

/* ─── UTILITIES ────────────────────────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 80px 32px;
  color: hsl(var(--muted-foreground));
}

.empty-state p {
  font-size: 15px;
  line-height: 1.6;
}

.tabs {
  display: inline-flex;
  height: 36px;
  padding: 4px;
  background: hsl(var(--muted));
  border-radius: 6px;
}

.tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 4px;
  background: transparent;
  border: none;
  color: hsl(var(--foreground));
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.tab.active {
  background: hsl(var(--background));
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.toast {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-size: 13px;
  font-weight: 500;
  animation: slideIn 0.3s;
}

.zoom-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  cursor: zoom-out;
}

.zoom-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

.thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid hsl(var(--border));
  margin-top: 12px;
  position: relative;
  display: block;
}

.thumbnail-delete {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
  cursor: pointer;
}

/* Markdown */
.markdown {
  font-size: 14px;
  line-height: 1.6;
}

.markdown p {
  margin: 0.5em 0;
}

.markdown p:first-child {
  margin-top: 0;
}

.markdown p:last-child {
  margin-bottom: 0;
}

.markdown strong {
  font-weight: 600;
}

.markdown code {
  background: hsl(var(--muted));
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Inter', monospace;
}

.markdown pre {
  background: hsl(var(--muted));
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0.5em 0;
}

.markdown pre code {
  background: none;
  padding: 0;
}

.markdown ul,
.markdown ol {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.markdown li {
  margin: 0.25em 0;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes swipeOut {
  to {
    opacity: 0;
    transform: translateX(var(--swipe-x)) translateY(20px) rotate(var(--swipe-r));
  }
}

.swipe-out {
  animation: swipeOut 0.3s ease forwards;
}
`;

/* ── Icons ─────────────────────────────────────────────────────────────────── */
const Icon = ({ name, size = 20, className = '' }) => {
	const icons = {
		cards: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<rect x="8" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
				<path d="M6 6v12a2 2 0 002 2h8" stroke="currentColor" strokeWidth="2" />
				<path d="M4 8v12a2 2 0 002 2h8" stroke="currentColor" strokeWidth="2" />
			</svg>
		),
		plus: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			</svg>
		),
		chart: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<rect x="7" y="10" width="3" height="10" fill="currentColor" />
				<rect x="13" y="6" width="3" height="14" fill="currentColor" />
			</svg>
		),
		moon: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
			</svg>
		),
		sun: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<circle cx="12" cy="12" r="5" fill="currentColor" />
				<path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			</svg>
		),
		x: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			</svg>
		),
		check: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		edit: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		trash: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6m4-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			</svg>
		),
		shuffle: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		clock: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
				<path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		target: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
				<circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
				<circle cx="12" cy="12" r="2" fill="currentColor" />
			</svg>
		),
		rotate: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		image: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
				<circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
				<path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		alert: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M12 9v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			</svg>
		),
		download: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		upload: (
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
				<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	};

	return icons[name] || null;
};

/* ── Utils ─────────────────────────────────────────────────────────────────── */
function parseCloze(t) {
	const o = [];
	const re = /\{([^}]+)\}/g;
	let l = 0,
		m;
	while ((m = re.exec(t)) !== null) {
		if (m.index > l) o.push({ type: 'text', val: t.slice(l, m.index) });
		o.push({ type: 'blank', val: m[1] });
		l = re.lastIndex;
	}
	if (l < t.length) o.push({ type: 'text', val: t.slice(l) });
	return o;
}

const getNextReview = (card, correct) => {
	const now = Date.now();
	const ease = card.ease || 2.5;
	const interval = card.interval || 1;

	if (correct) {
		const newInterval = interval === 1 ? 3 : Math.round(interval * ease);
		const newEase = Math.min(ease + 0.1, 3.0);
		return {
			nextReview: now + newInterval * 24 * 60 * 60 * 1000,
			interval: newInterval,
			ease: newEase,
		};
	} else {
		return {
			nextReview: now + 10 * 60 * 1000,
			interval: 1,
			ease: Math.max(ease - 0.2, 1.3),
		};
	}
};

const isDue = (card) => {
	if (!card.nextReview) return true;
	return Date.now() >= card.nextReview;
};

const useLocalStorage = (key, init) => {
	const [val, setVal] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : init;
		} catch {
			return init;
		}
	});

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(val));
		} catch (e) {
			console.error(e);
		}
	}, [key, val]);

	return [val, setVal];
};

const DEMO_CARDS = [
	{ id: 1, type: 'basic', q: 'What is the **capital** of France?', a: 'Paris is the capital and largest city of France.', imgs: [], imgSide: 'both', nextReview: null, interval: 1, ease: 2.5 },
	{ id: 2, type: 'basic', q: 'Who wrote *Romeo and Juliet*?', a: 'William Shakespeare wrote Romeo and Juliet in the early 1590s.', imgs: [], imgSide: 'both', nextReview: null, interval: 1, ease: 2.5 },
	{ id: 3, type: 'cloze', template: 'The {Pythagorean theorem} states that in a right triangle, {a² + b² = c²}.', imgs: [], imgSide: 'both', nextReview: null, interval: 1, ease: 2.5 },
];

/* ── PAGES ─────────────────────────────────────────────────────────────────── */

// MY CARDS PAGE
function MyCardsPage() {
	const [cards, setCards] = useLocalStorage('flashcards', DEMO_CARDS);
	const [history, setHistory] = useLocalStorage('history', []);
	const [editing, setEditing] = useState(null);
	const [study, setStudy] = useState('idle');
	const [studyDeck, setStudyDeck] = useState([]);
	const [si, setSi] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [results, setResults] = useState({});
	const [clozeAnswers, setClozeAnswers] = useState({});
	const [clozeChecked, setClozeChecked] = useState(false);
	const [zoomImg, setZoomImg] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [imageLoaded, setImageLoaded] = useState({});
	const cardRef = useRef(null);
	const editImgRef = useRef();

	const readImgs = (files, cb) => {
		const total = files.length;
		const srcs = [];
		Array.from(files).forEach((f) => {
			const r = new FileReader();
			r.onload = (e) => {
				srcs.push(e.target.result);
				if (srcs.length === total) cb(srcs);
			};
			r.readAsDataURL(f);
		});
	};

	const saveEdit = () => {
		setCards((cs) => cs.map((c) => (c.id === editing.id ? editing : c)));
		setEditing(null);
	};

	const del = (id, e) => {
		e.stopPropagation();
		setCards((cs) => cs.filter((c) => c.id !== id));
	};

	const dueCards = cards.filter(isDue);

	const startStudy = (ids) => {
		setStudyDeck(ids);
		setSi(0);
		setFlipped(false);
		setResults({});
		setClozeAnswers({});
		setClozeChecked(false);
		setImageLoaded({});
		setStudy('studying');
	};

	const markResult = (res) => {
		const id = studyDeck[si];
		const card = cards.find((c) => c.id === id);
		const correct = res === 'right';

		const srData = getNextReview(card, correct);
		setCards((cs) => cs.map((c) => (c.id === id ? { ...c, ...srData } : c)));

		const newResults = { ...results, [id]: res };
		setResults(newResults);

		if (si < studyDeck.length - 1) {
			// Reset all card state when moving to next card
			setFlipped(false);
			setClozeAnswers({});
			setClozeChecked(false);
			setDragOffset({ x: 0, y: 0 });
			setImageLoaded({});
			setIsDragging(false);
			
			// Reset card transform if it exists
			if (cardRef.current) {
				cardRef.current.style.transform = '';
			}
			
			// Move to next card
			setSi((i) => i + 1);
		} else {
			const right = Object.values(newResults).filter((v) => v === 'right').length;
			const wrong = Object.values(newResults).filter((v) => v === 'wrong').length;
			setHistory((h) => [{ date: new Date().toISOString(), right, wrong, total: studyDeck.length }, ...h.slice(0, 19)]);
			setStudy('results');
		}
	};

	const checkCloze = () => {
		const card = cards.find((c) => c.id === studyDeck[si]);
		const blanks = parseCloze(card.template).filter((p) => p.type === 'blank');
		const correct = blanks.filter((b) => (clozeAnswers[b.val] || '').trim().toLowerCase() === b.val.toLowerCase()).length;
		setClozeChecked(true);
		if (correct === blanks.length) setTimeout(() => markResult('right'), 800);
	};

	// Keyboard shortcuts
	useEffect(() => {
		if (study !== 'studying') return;

		const handleKey = (e) => {
			if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

			const currentCard = cards.find((c) => c.id === studyDeck[si]);
			const isCloze = currentCard?.type === 'cloze';

			// For cloze cards, don't allow keyboard shortcuts while checking answers
			if (isCloze) return;

			if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
				e.preventDefault();
				setFlipped((f) => !f);
			} else if ((e.key === 'ArrowLeft' || e.key === '1') && flipped) {
				e.preventDefault();
				markResult('wrong');
			} else if ((e.key === 'ArrowRight' || e.key === '2') && flipped) {
				e.preventDefault();
				markResult('right');
			}
		};

		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [study, flipped, si, studyDeck, cards]);

	// Swipe handlers
	const handleDragStart = (e) => {
		if (!flipped) return;
		setIsDragging(true);
		const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
		const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
		setDragStart({ x: clientX, y: clientY });
	};

	const handleDragMove = (e) => {
		if (!isDragging) return;
		const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
		const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
		const x = clientX - dragStart.x;
		const y = clientY - dragStart.y;
		setDragOffset({ x, y });

		if (cardRef.current) {
			const rotate = x / 20;
			cardRef.current.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) rotateY(180deg)`;
		}
	};

	const handleDragEnd = () => {
		if (!isDragging) return;
		setIsDragging(false);

		const threshold = 120;
		if (Math.abs(dragOffset.x) > threshold) {
			const direction = dragOffset.x > 0 ? 'right' : 'wrong';

			if (cardRef.current) {
				const finalX = dragOffset.x > 0 ? 1000 : -1000;
				const finalR = dragOffset.x > 0 ? 30 : -30;
				cardRef.current.style.setProperty('--swipe-x', `${finalX}px`);
				cardRef.current.style.setProperty('--swipe-r', `${finalR}deg`);
				cardRef.current.classList.add('swipe-out');

				setTimeout(() => {
					markResult(direction);
					if (cardRef.current) {
						cardRef.current.classList.remove('swipe-out');
						cardRef.current.style.transform = '';
					}
				}, 300);
			}
		} else {
			if (cardRef.current) {
				cardRef.current.style.transform = 'rotateY(180deg)';
			}
			setDragOffset({ x: 0, y: 0 });
		}
	};

	const handleCardClick = () => {
		// Don't flip if we just finished dragging
		if (Math.abs(dragOffset.x) > 5 || Math.abs(dragOffset.y) > 5) {
			return;
		}
		setFlipped((f) => !f);
	};

	// Reset flipped state when card index changes
	useEffect(() => {
		setFlipped(false);
	}, [si]);

	const wrongCards = cards.filter((c) => results[c.id] === 'wrong');

	/* ── STUDY VIEW ── */
	if (study === 'studying') {
		const card = cards.find((c) => c.id === studyDeck[si]);
		const isCloze = card.type === 'cloze';
		const pct = Math.round((si / studyDeck.length) * 100);
		const showImgFront = card.imgs?.[0] && (card.imgSide === 'question' || card.imgSide === 'both');
		const showImgBack = card.imgs?.[0] && (card.imgSide === 'answer' || card.imgSide === 'both');
		const swipeOpacity = Math.min(Math.abs(dragOffset.x) / 120, 1);

		if (isCloze) {
			const parts = parseCloze(card.template);
			const blanks = parts.filter((p) => p.type === 'blank');
			const correct = blanks.filter((b) => (clozeAnswers[b.val] || '').trim().toLowerCase() === b.val.toLowerCase()).length;

			return (
				<div className="study-container">
					{zoomImg && (
						<div className="zoom-overlay" onClick={() => setZoomImg(null)}>
							<img src={zoomImg} className="zoom-image" alt="" />
						</div>
					)}

					<div className="study-header">
						<div className="study-info">
							<h1>Study Mode</h1>
							<p>
								{si + 1} of {studyDeck.length}
							</p>
						</div>
						<button className="btn btn-outline btn-sm" onClick={() => setStudy('idle')}>
							Exit
						</button>
					</div>

					<div className="progress-bar">
						<div className="progress-fill" style={{ width: `${pct}%` }} />
					</div>

					<div className="card">
						{showImgFront && (
							<img
								src={card.imgs[0]}
								className={`card-image${imageLoaded[`${si}-front`] ? ' loaded' : ''}`}
								alt=""
								onLoad={() => setImageLoaded((prev) => ({ ...prev, [`${si}-front`]: true }))}
								onClick={(e) => {
									e.stopPropagation();
									setZoomImg(card.imgs[0]);
								}}
							/>
						)}
						<div className="card-content" style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<div style={{ fontSize: '18px', lineHeight: '2', textAlign: 'center' }}>
								{parts.map((p, i) =>
									p.type === 'text' ? (
										<span key={i}>{p.val}</span>
									) : (
										<span key={i}>
											{clozeChecked ? (
												<>
													<span
														style={{
															borderBottom: 'none',
															color: (clozeAnswers[p.val] || '').trim().toLowerCase() === p.val.toLowerCase() ? 'hsl(120 100% 35%)' : 'hsl(var(--destructive))',
															fontWeight: 600,
														}}
													>
														{clozeAnswers[p.val] || '—'}
													</span>
													{(clozeAnswers[p.val] || '').trim().toLowerCase() !== p.val.toLowerCase() && <span style={{ color: 'hsl(120 100% 35%)', fontWeight: 500, marginLeft: '8px' }}>({p.val})</span>}
												</>
											) : (
												<input
													className="input"
													style={{
														display: 'inline-block',
														width: Math.max(100, p.val.length * 11),
														height: '32px',
														textAlign: 'center',
														margin: '0 4px',
													}}
													value={clozeAnswers[p.val] || ''}
													onChange={(e) => setClozeAnswers((a) => ({ ...a, [p.val]: e.target.value }))}
												/>
											)}
										</span>
									),
								)}
							</div>
						</div>
					</div>

					{!clozeChecked ? (
						<div className="study-actions">
							<button className="btn btn-default" onClick={checkCloze}>
								Check Answers
							</button>
						</div>
					) : (
						<div className="study-actions">
							<div style={{ flex: 1, textAlign: 'center', fontSize: '14px', color: correct === blanks.length ? 'hsl(120 100% 35%)' : 'hsl(var(--destructive))', fontWeight: 600 }}>
								{correct}/{blanks.length} correct
							</div>
							<button className="btn btn-destructive" onClick={() => markResult('wrong')}>
								<Icon name="x" size={16} />
								Wrong
							</button>
							<button className="btn btn-default" style={{ background: 'hsl(120 100% 35%)', color: 'white' }} onClick={() => markResult('right')}>
								<Icon name="check" size={16} />
								Right
							</button>
						</div>
					)}

					<div className="keyboard-hint">
						<span className="kbd">Space</span> flip ·<span className="kbd">←</span> or <span className="kbd">1</span> wrong ·<span className="kbd">→</span> or <span className="kbd">2</span> right
					</div>
				</div>
			);
		}

		return (
			<div className="study-container">
				{zoomImg && (
					<div className="zoom-overlay" onClick={() => setZoomImg(null)}>
						<img src={zoomImg} className="zoom-image" alt="" />
					</div>
				)}

				<div className="study-header">
					<div className="study-info">
						<h1>Study Mode</h1>
						<p>
							{si + 1} of {studyDeck.length}
						</p>
					</div>
					<button className="btn btn-outline btn-sm" onClick={() => setStudy('idle')}>
						Exit
					</button>
				</div>

				<div className="progress-bar">
					<div className="progress-fill" style={{ width: `${pct}%` }} />
				</div>

				<div className="study-card-wrapper" key={`card-${si}-${studyDeck[si]}`} onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd}>
					<div ref={cardRef} className={`study-card${flipped ? ' flipped' : ''}${flipped ? ' swipeable' : ''}`} onClick={handleCardClick}>
						{flipped && (
							<>
								<div className="swipe-indicator swipe-left" style={{ opacity: dragOffset.x < 0 ? swipeOpacity : 0 }}>
									✕
								</div>
								<div className="swipe-indicator swipe-right" style={{ opacity: dragOffset.x > 0 ? swipeOpacity : 0 }}>
									✓
								</div>
							</>
						)}

						<div className="card-face">
							{showImgFront && (
								<img
									src={card.imgs[0]}
									className={`card-image${imageLoaded[`${si}-front`] ? ' loaded' : ''}`}
									alt=""
									onLoad={() => setImageLoaded((prev) => ({ ...prev, [`${si}-front`]: true }))}
									onClick={(e) => {
										e.stopPropagation();
										setZoomImg(card.imgs[0]);
									}}
								/>
							)}
							<div className="card-body">
								<div className="card-label">Question</div>
								<div className="card-text markdown">
									<ReactMarkdown>{card.q}</ReactMarkdown>
								</div>
								<div className="card-hint">Click or press Space to flip</div>
							</div>
						</div>

						<div className="card-face card-face-back">
							{showImgBack && (
								<img
									src={card.imgs[0]}
									className={`card-image${imageLoaded[`${si}-back`] ? ' loaded' : ''}`}
									alt=""
									onLoad={() => setImageLoaded((prev) => ({ ...prev, [`${si}-back`]: true }))}
									onClick={(e) => {
										e.stopPropagation();
										setZoomImg(card.imgs[0]);
									}}
								/>
							)}
							<div className="card-body">
								<div className="card-label">Answer</div>
								<div className="card-text markdown">
									<ReactMarkdown>{card.a}</ReactMarkdown>
								</div>
								<div className="card-hint">Click or press Space to flip back</div>
							</div>
						</div>
					</div>
				</div>

				{flipped ? (
					<div className="study-actions">
						<button className="btn btn-destructive" onClick={() => markResult('wrong')}>
							<Icon name="x" size={16} />
							Wrong
						</button>
						<button className="btn btn-default" style={{ background: 'hsl(120 100% 35%)', color: 'white' }} onClick={() => markResult('right')}>
							<Icon name="check" size={16} />
							Right
						</button>
					</div>
				) : (
					<div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>Flip the card first, then mark your result</div>
				)}

				<div className="keyboard-hint">
					<span className="kbd">Space</span> or <span className="kbd">↑</span>/<span className="kbd">↓</span> flip ·<span className="kbd">←</span> or <span className="kbd">1</span> wrong ·<span className="kbd">→</span> or <span className="kbd">2</span> right · Drag left/right to swipe
				</div>
			</div>
		);
	}

	/* ── RESULTS VIEW ── */
	if (study === 'results') {
		const rightCount = Object.values(results).filter((v) => v === 'right').length;
		const wrongCount = Object.values(results).filter((v) => v === 'wrong').length;
		const score = Math.round((rightCount / studyDeck.length) * 100);

		return (
			<div className="study-container">
				<div className="study-header">
					<div className="study-info">
						<h1>Session Complete</h1>
						<p>{studyDeck.length} cards reviewed</p>
					</div>
					<button className="btn btn-outline btn-sm" onClick={() => setStudy('idle')}>
						Done
					</button>
				</div>

				<div className="stats-grid">
					<div className="stat-card">
						<div className="stat-value" style={{ color: 'hsl(120 100% 35%)' }}>
							{rightCount}
						</div>
						<div className="stat-label">Correct</div>
					</div>
					<div className="stat-card">
						<div className="stat-value" style={{ color: 'hsl(var(--destructive))' }}>
							{wrongCount}
						</div>
						<div className="stat-label">Incorrect</div>
					</div>
					<div className="stat-card">
						<div className="stat-value">{score}%</div>
						<div className="stat-label">Score</div>
					</div>
				</div>

				<div className="page-actions">
					<button className="btn btn-outline" onClick={() => setStudy('idle')}>
						Back to Cards
					</button>
					<button className="btn btn-outline" onClick={() => startStudy(studyDeck)}>
						<Icon name="rotate" size={16} />
						Redo Round
					</button>
					{wrongCount > 0 && (
						<button
							className="btn btn-destructive"
							onClick={() =>
								startStudy(
									Object.keys(results)
										.filter((k) => results[k] === 'wrong')
										.map(Number),
								)
							}
						>
							<Icon name="target" size={16} />
							Study {wrongCount} Wrong
						</button>
					)}
					<button className="btn btn-default" onClick={() => startStudy(cards.map((c) => c.id))}>
						Study All Cards
					</button>
				</div>
			</div>
		);
	}

	/* ── MAIN VIEW ── */
	return (
		<div>
			{showToast && (
				<div className="toast">
					<Icon name="check" size={16} />
					{toastMessage}
				</div>
			)}

			<div className="page-header">
				<h1 className="page-title">My Cards</h1>
				<p className="page-description">
					{cards.length} cards total · {dueCards.length} due for review
				</p>

				<div className="page-actions">
					<button className="btn btn-ghost" onClick={() => setCards((cs) => [...cs].sort(() => Math.random() - 0.5))}>
						<Icon name="shuffle" size={16} />
						Shuffle
					</button>
					<button
						className="btn btn-outline"
						onClick={() => {
							const dataStr = JSON.stringify(cards, null, 2);
							const blob = new Blob([dataStr], { type: 'application/json' });
							const url = URL.createObjectURL(blob);
							const link = document.createElement('a');
							link.href = url;
							link.download = `flashcards-${new Date().toISOString().split('T')[0]}.json`;
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
							URL.revokeObjectURL(url);
						}}
					>
						<Icon name="download" size={16} />
						Export
					</button>
					<button
						className="btn btn-outline"
						onClick={() => {
							const input = document.createElement('input');
							input.type = 'file';
							input.accept = '.json';
							input.onchange = (e) => {
								const file = e.target.files[0];
								if (!file) return;
								const reader = new FileReader();
								reader.onload = (event) => {
									try {
										const importedCards = JSON.parse(event.target.result);
										if (Array.isArray(importedCards)) {
											const maxId = Math.max(...cards.map((c) => c.id), 0);
											const newCards = importedCards.map((c, i) => ({
												...c,
												id: maxId + i + 1,
											}));
											setCards((cs) => [...cs, ...newCards]);
											setToastMessage(`Successfully imported ${newCards.length} card${newCards.length === 1 ? '' : 's'}`);
											setShowToast(true);
											setTimeout(() => setShowToast(false), 3000);
										}
									} catch (err) {
										setToastMessage('Error importing cards: Invalid file format');
										setShowToast(true);
										setTimeout(() => setShowToast(false), 3000);
									}
								};
								reader.readAsText(file);
							};
							input.click();
						}}
					>
						<Icon name="upload" size={16} />
						Import
					</button>
					{dueCards.length > 0 && (
						<button className="btn btn-outline" onClick={() => startStudy(dueCards.map((c) => c.id))}>
							<Icon name="clock" size={16} />
							Review {dueCards.length} Due
						</button>
					)}
					{wrongCards.length > 0 && (
						<button className="btn btn-destructive" onClick={() => startStudy(wrongCards.map((c) => c.id))}>
							Retry {wrongCards.length} Wrong
						</button>
					)}
					<button className="btn btn-default" onClick={() => startStudy(cards.map((c) => c.id))}>
						Study All
					</button>
				</div>
			</div>

			{cards.length === 0 ? (
				<div className="empty-state">
					<p>No flashcards yet. Go to "Add Cards" to create your first one!</p>
				</div>
			) : (
				<div className="cards-grid">
					{cards.map((card) => {
						const isCloze = card.type === 'cloze';
						const res = results[card.id];
						const due = isDue(card);

						return (
							<div key={card.id} className="flashcard">
								{res && <div className={`status-indicator ${res === 'right' ? 'status-success' : 'status-error'}`} />}
								{card.imgs?.[0] && <img src={card.imgs[0]} className="flashcard-image" alt="" />}

								<div className="flashcard-body">
									<div className="flashcard-badges">
										{isCloze && <span className="badge badge-default">Cloze</span>}
										{due && <span className="badge badge-destructive">Due</span>}
									</div>

									{isCloze ? (
										<div className="flashcard-question">
											{parseCloze(card.template).map((p, i) =>
												p.type === 'text' ? (
													<span key={i}>{p.val}</span>
												) : (
													<span key={i} style={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}>
														...
													</span>
												),
											)}
										</div>
									) : (
										<>
											<div className="flashcard-question markdown">
												<ReactMarkdown>{card.q}</ReactMarkdown>
											</div>
											<div className="flashcard-answer markdown">
												<ReactMarkdown>{card.a}</ReactMarkdown>
											</div>
										</>
									)}
								</div>

								<div className="flashcard-actions">
									<button
										className="btn btn-ghost btn-icon-sm"
										onClick={(e) => {
											e.stopPropagation();
											setEditing({ ...card, imgs: [...(card.imgs || [])], imgSide: card.imgSide || 'both' });
										}}
									>
										<Icon name="edit" size={14} />
									</button>
									<button className="btn btn-ghost btn-icon-sm" onClick={(e) => del(card.id, e)}>
										<Icon name="trash" size={14} />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{editing && (
				<div className="modal-overlay" onClick={() => setEditing(null)}>
					<div className="modal" onClick={(e) => e.stopPropagation()}>
						<div className="modal-header">
							<span className="modal-title">Edit Card</span>
							<button className="btn btn-ghost btn-icon-sm" onClick={() => setEditing(null)}>
								<Icon name="x" size={16} />
							</button>
						</div>

						<div className="modal-body">
							{editing.type === 'basic' ? (
								<>
									<div className="field">
										<label className="label">Question</label>
										<textarea className="textarea" rows={3} value={editing.q} onChange={(e) => setEditing((ed) => ({ ...ed, q: e.target.value }))} />
									</div>
									<div className="field">
										<label className="label">Answer</label>
										<textarea className="textarea" rows={4} value={editing.a} onChange={(e) => setEditing((ed) => ({ ...ed, a: e.target.value }))} />
									</div>
								</>
							) : (
								<div className="field">
									<label className="label">Template</label>
									<textarea className="textarea" rows={3} value={editing.template} onChange={(e) => setEditing((ed) => ({ ...ed, template: e.target.value }))} />
								</div>
							)}

							<div className="field">
								<label className="label">Image (optional)</label>
								<button className="btn btn-outline" style={{ width: '100%' }} onClick={() => editImgRef.current.click()}>
									<Icon name="image" size={16} />
									{editing.imgs?.length ? 'Change image' : 'Add image'}
								</button>
								<input ref={editImgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => readImgs(e.target.files, (srcs) => setEditing((ed) => ({ ...ed, imgs: srcs })))} />
							</div>

							{editing.imgs?.length > 0 && (
								<>
									<div style={{ position: 'relative', display: 'inline-block' }}>
										<img src={editing.imgs[0]} className="thumbnail" alt="" />
										<button className="thumbnail-delete" onClick={() => setEditing((ed) => ({ ...ed, imgs: [] }))}>
											×
										</button>
									</div>

									<div className="field">
										<label className="label">Show image on</label>
										<div className="tabs">
											<button className={`tab${editing.imgSide === 'question' ? ' active' : ''}`} onClick={() => setEditing((ed) => ({ ...ed, imgSide: 'question' }))}>
												Question
											</button>
											<button className={`tab${editing.imgSide === 'answer' ? ' active' : ''}`} onClick={() => setEditing((ed) => ({ ...ed, imgSide: 'answer' }))}>
												Answer
											</button>
											<button className={`tab${editing.imgSide === 'both' ? ' active' : ''}`} onClick={() => setEditing((ed) => ({ ...ed, imgSide: 'both' }))}>
												Both
											</button>
										</div>
									</div>
								</>
							)}
						</div>

						<div className="modal-footer">
							<button className="btn btn-outline" onClick={() => setEditing(null)}>
								Cancel
							</button>
							<button className="btn btn-default" onClick={saveEdit}>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

// ADD CARDS PAGE
function AddCardsPage() {
	const [cards, setCards] = useLocalStorage('flashcards', DEMO_CARDS);
	const [showToast, setShowToast] = useState(false);
	const [creatorCards, setCreatorCards] = useState([{ id: 1, type: 'basic', q: '', a: '', imgs: [], imgSide: 'both' }]);
	const [focusedCard, setFocusedCard] = useState(null);
	const nid = useRef(Math.max(...cards.map((c) => c.id), 0) + 1);
	const creatorId = useRef(2);
	const imgRefs = useRef({});
	const cardRefs = useRef({});

	const readImgs = (files, cb) => {
		if (!files || files.length === 0) return;
		const total = files.length;
		const srcs = [];
		Array.from(files).forEach((f) => {
			const r = new FileReader();
			r.onload = (e) => {
				srcs.push(e.target.result);
				if (srcs.length === total) cb(srcs);
			};
			r.readAsDataURL(f);
		});
	};

	const handlePaste = (e, cardId) => {
		const items = e.clipboardData?.items;
		if (!items) return;

		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf('image') !== -1) {
				e.preventDefault();
				const blob = items[i].getAsFile();
				if (blob) {
					readImgs([blob], (srcs) => updateCreatorCard(cardId, 'imgs', srcs));
				}
				break;
			}
		}
	};

	useEffect(() => {
		const handleGlobalPaste = (e) => {
			if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

			const items = e.clipboardData?.items;
			if (!items) return;

			for (let i = 0; i < items.length; i++) {
				if (items[i].type.indexOf('image') !== -1) {
					e.preventDefault();
					const blob = items[i].getAsFile();
					if (blob && creatorCards.length > 0) {
						const lastCardId = creatorCards[creatorCards.length - 1].id;
						readImgs([blob], (srcs) => updateCreatorCard(lastCardId, 'imgs', srcs));
					}
					break;
				}
			}
		};

		window.addEventListener('paste', handleGlobalPaste);
		return () => window.removeEventListener('paste', handleGlobalPaste);
	}, [creatorCards]);

	const isCardComplete = (card) => {
		if (card.type === 'cloze') {
			return card.template?.trim();
		}
		return card.q.trim() && (card.a.trim() || (card.imgs && card.imgs.length > 0));
	};

	// Handle Tab key to add new card
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Tab' && !e.shiftKey) {
				const lastCard = creatorCards[creatorCards.length - 1];
				if (isCardComplete(lastCard)) {
					e.preventDefault();
					addCreatorCard();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [creatorCards]);

	const addCreatorCard = () => {
		const newCardId = creatorId.current++;
		setCreatorCards((c) => [...c, { id: newCardId, type: 'basic', q: '', a: '', imgs: [], imgSide: 'both' }]);

		// Focus the new card after a brief delay
		setTimeout(() => {
			const newCardElement = cardRefs.current[newCardId];
			if (newCardElement) {
				newCardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
				const firstInput = newCardElement.querySelector('textarea');
				if (firstInput) {
					firstInput.focus();
				}
			}
		}, 100);
	};

	const updateCreatorCard = (id, field, value) => {
		setCreatorCards((cs) => cs.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
	};

	const removeCreatorCard = (id) => {
		if (creatorCards.length > 1) {
			setCreatorCards((cs) => cs.filter((c) => c.id !== id));
			delete imgRefs.current[id];
			delete cardRefs.current[id];
		}
	};

	const saveAllCards = () => {
		const valid = creatorCards.filter(isCardComplete);

		if (valid.length === 0) return;

		const newCards = valid.map((c) => {
			return {
				id: nid.current++,
				type: c.type,
				q: c.q || '',
				a: c.a || '',
				template: c.template || '',
				imgs: c.imgs || [],
				imgSide: c.imgSide || 'both',
				nextReview: null,
				interval: 1,
				ease: 2.5,
			};
		});

		setCards((cs) => [...cs, ...newCards]);
		setCreatorCards([{ id: creatorId.current++, type: 'basic', q: '', a: '', imgs: [], imgSide: 'both' }]);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 2000);
	};

	return (
		<div>
			{showToast && (
				<div className="toast">
					<Icon name="check" size={16} />
					Cards saved successfully
				</div>
			)}

			<div className="page-header">
				<h1 className="page-title">Add Flashcards</h1>
				<p className="page-description">
					Create multiple cards • Markdown supported • Paste images • Press <span className="kbd">Tab</span> to add new card
				</p>
			</div>

			<div className="creator-list">
				{creatorCards.map((card, idx) => (
					<div
						key={card.id}
						ref={(el) => (cardRefs.current[card.id] = el)}
						className={`creator-card${focusedCard === card.id ? ' focused' : ''}`}
						onPaste={(e) => handlePaste(e, card.id)}
						onFocus={() => setFocusedCard(card.id)}
						onBlur={(e) => {
							// Only unfocus if we're not focusing another element within the same card
							if (!e.currentTarget.contains(e.relatedTarget)) {
								setFocusedCard(null);
							}
						}}
						tabIndex={0}
					>
						<div className="creator-header">
							<span className="creator-number">Card {idx + 1}</span>
							{creatorCards.length > 1 && (
								<button className="btn btn-ghost btn-icon-sm" onClick={() => removeCreatorCard(card.id)}>
									<Icon name="trash" size={14} />
								</button>
							)}
						</div>

						<div className="creator-section">
							<div className="tabs">
								<button className={`tab${card.type === 'basic' ? ' active' : ''}`} onClick={() => updateCreatorCard(card.id, 'type', 'basic')}>
									Basic
								</button>
								<button className={`tab${card.type === 'cloze' ? ' active' : ''}`} onClick={() => updateCreatorCard(card.id, 'type', 'cloze')}>
									Cloze
								</button>
							</div>
						</div>

						{card.type === 'basic' ? (
							<div className="creator-section">
								<div className="creator-grid">
									<div className="field-wrapper">
										<label className="label">Question</label>
										<textarea className="textarea" rows={4} placeholder="Enter question..." value={card.q} onChange={(e) => updateCreatorCard(card.id, 'q', e.target.value)} />
									</div>
									<div className="field-wrapper">
										<label className="label">Answer {card.imgs?.length > 0 ? '(optional)' : ''}</label>
										<textarea className="textarea" rows={4} placeholder="Enter answer or add image below..." value={card.a} onChange={(e) => updateCreatorCard(card.id, 'a', e.target.value)} />
									</div>
								</div>
							</div>
						) : (
							<div className="creator-section">
								<label className="label">Template</label>
								<textarea className="textarea" rows={3} placeholder="The {capital} of France is {Paris}" value={card.template || ''} onChange={(e) => updateCreatorCard(card.id, 'template', e.target.value)} />
								<div style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginTop: '8px' }}>Wrap blanks in {'{curly braces}'}</div>
							</div>
						)}

						<div className="creator-section">
							<div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
								<button className="btn btn-outline btn-sm" onClick={() => imgRefs.current[card.id]?.click()}>
									<Icon name="image" size={14} />
									{card.imgs?.length ? 'Change' : 'Add'} image
								</button>
								{!card.imgs?.length && <span style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}>or paste from clipboard</span>}
								<input ref={(el) => (imgRefs.current[card.id] = el)} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => readImgs(e.target.files, (srcs) => updateCreatorCard(card.id, 'imgs', srcs))} />

								{card.imgs?.length > 0 && (
									<div className="tabs">
										<button className={`tab${card.imgSide === 'question' ? ' active' : ''}`} onClick={() => updateCreatorCard(card.id, 'imgSide', 'question')}>
											Q
										</button>
										<button className={`tab${card.imgSide === 'answer' ? ' active' : ''}`} onClick={() => updateCreatorCard(card.id, 'imgSide', 'answer')}>
											A
										</button>
										<button className={`tab${card.imgSide === 'both' ? ' active' : ''}`} onClick={() => updateCreatorCard(card.id, 'imgSide', 'both')}>
											Both
										</button>
									</div>
								)}
							</div>

							{card.imgs?.length > 0 && (
								<div style={{ position: 'relative', display: 'inline-block', marginTop: '12px' }}>
									<img src={card.imgs[0]} className="thumbnail" alt="" />
									<button className="thumbnail-delete" onClick={() => updateCreatorCard(card.id, 'imgs', [])}>
										×
									</button>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			<div className="page-actions">
				<button className="btn btn-outline" onClick={addCreatorCard}>
					<Icon name="plus" size={16} />
					Add Another Card
				</button>
				<button className="btn btn-default" onClick={saveAllCards}>
					Save All Cards
				</button>
			</div>
		</div>
	);
}

// STATS PAGE
function StatsPage() {
	const [history, setHistory] = useLocalStorage('history', []);
	const [cards, setCards] = useLocalStorage('flashcards', DEMO_CARDS);
	const [showResetModal, setShowResetModal] = useState(false);

	const totalStudied = history.reduce((acc, h) => acc + h.total, 0);
	const totalRight = history.reduce((acc, h) => acc + h.right, 0);
	const totalWrong = history.reduce((acc, h) => acc + h.wrong, 0);
	const accuracy = totalStudied > 0 ? Math.round((totalRight / totalStudied) * 100) : 0;
	const dueCards = cards.filter(isDue).length;

	const resetStats = () => {
		setHistory([]);
		setCards((cs) => cs.map((c) => ({ ...c, nextReview: null, interval: 1, ease: 2.5 })));
		setShowResetModal(false);
	};

	return (
		<div>
			<div className="page-header">
				<h1 className="page-title">Statistics</h1>
				<p className="page-description">Track your progress over time</p>

				<div className="page-actions">
					<button className="btn btn-destructive" onClick={() => setShowResetModal(true)}>
						<Icon name="alert" size={16} />
						Reset All Stats
					</button>
				</div>
			</div>

			<div className="stats-grid">
				<div className="stat-card">
					<div className="stat-value">{cards.length}</div>
					<div className="stat-label">Total Cards</div>
				</div>
				<div className="stat-card">
					<div className="stat-value">{dueCards}</div>
					<div className="stat-label">Due for Review</div>
				</div>
				<div className="stat-card">
					<div className="stat-value">{totalStudied}</div>
					<div className="stat-label">Cards Studied</div>
				</div>
				<div className="stat-card">
					<div className="stat-value" style={{ color: 'hsl(120 100% 35%)' }}>
						{totalRight}
					</div>
					<div className="stat-label">Correct</div>
				</div>
				<div className="stat-card">
					<div className="stat-value" style={{ color: 'hsl(var(--destructive))' }}>
						{totalWrong}
					</div>
					<div className="stat-label">Incorrect</div>
				</div>
				<div className="stat-card">
					<div className="stat-value">{accuracy}%</div>
					<div className="stat-label">Accuracy</div>
				</div>
			</div>

			<div className="history-section">
				<h2>Study History</h2>
				{history.length === 0 ? (
					<div className="empty-state">
						<p>No study sessions yet. Start studying to see your history!</p>
					</div>
				) : (
					<div className="history-list">
						{history.map((h, i) => {
							const score = Math.round((h.right / h.total) * 100);
							const date = new Date(h.date);
							const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
							const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

							return (
								<div key={i} className="history-item">
									<div className="history-info">
										<div className="history-result">
											{h.right}/{h.total} correct
										</div>
										<div className="history-date">
											{dateStr} at {timeStr}
										</div>
									</div>
									<div className="history-score" style={{ color: score >= 70 ? 'hsl(120 100% 35%)' : 'hsl(var(--destructive))' }}>
										{score}%
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>

			{showResetModal && (
				<div className="modal-overlay" onClick={() => setShowResetModal(false)}>
					<div className="modal" onClick={(e) => e.stopPropagation()}>
						<div className="modal-header">
							<span className="modal-title">Reset All Statistics?</span>
							<button className="btn btn-ghost btn-icon-sm" onClick={() => setShowResetModal(false)}>
								<Icon name="x" size={16} />
							</button>
						</div>

						<div className="modal-body">
							<p>This will clear all study history and reset spaced repetition data for all cards. Your cards will not be deleted. This action cannot be undone.</p>
						</div>

						<div className="modal-footer">
							<button className="btn btn-outline" onClick={() => setShowResetModal(false)}>
								Cancel
							</button>
							<button className="btn btn-destructive" onClick={resetStats}>
								<Icon name="alert" size={16} />
								Reset Everything
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

// APP
const PAGES = [
	{ id: 'cards', label: 'My Cards', icon: 'cards' },
	{ id: 'add', label: 'Add Cards', icon: 'plus' },
	{ id: 'stats', label: 'Statistics', icon: 'chart' },
];

export default function App() {
	const [page, setPage] = useState('cards');
	const [theme, setTheme] = useLocalStorage('theme', 'light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

	return (
		<>
			<style>{css}</style>
			<div className="app">
				<nav className="navbar">
					<div className="navbar-brand">
						<Icon name="cards" size={20} />
						<span className="navbar-logo">FlashMaster</span>
					</div>

					<div className="navbar-nav">
						{PAGES.map((p) => (
							<button key={p.id} className={`nav-link${page === p.id ? ' active' : ''}`} onClick={() => setPage(p.id)}>
								<Icon name={p.icon} size={16} />
								{p.label}
							</button>
						))}
					</div>

					<div className="navbar-actions">
						<button className="btn btn-ghost btn-icon" onClick={toggleTheme}>
							<Icon name={theme === 'light' ? 'moon' : 'sun'} size={18} />
						</button>
					</div>
				</nav>

				<main className="main">
					<div className="main-content">
						{page === 'cards' && <MyCardsPage />}
						{page === 'add' && <AddCardsPage />}
						{page === 'stats' && <StatsPage />}
					</div>
				</main>
			</div>
		</>
	);
}
