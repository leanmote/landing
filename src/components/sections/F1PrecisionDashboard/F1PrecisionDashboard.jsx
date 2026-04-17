import { useRef } from 'react';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import withoutSvg from '../../../../public/illustrations/without.svg';
import withSvg from '../../../../public/illustrations/with.svg';
import './F1PrecisionDashboard.css';

function ChevronSplitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
      <polyline points="9 18 15 12 9 6" transform="translate(6 0)" />
    </svg>
  );
}

function F1PrecisionDashboard() {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const splitRef = useRef(50);
  const draggingRef = useRef(false);
  const rectRef = useRef(null);

  const applySplit = (value) => {
    const clamped = Math.max(6, Math.min(94, value));
    splitRef.current = clamped;
    if (containerRef.current) {
      containerRef.current.style.setProperty('--split', `${clamped}%`);
    }
    if (handleRef.current) {
      handleRef.current.setAttribute('aria-valuenow', String(Math.round(clamped)));
    }
  };

  const updateFromPointer = (clientX) => {
    const rect = rectRef.current ?? containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    applySplit(raw);
  };

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    rectRef.current = containerRef.current?.getBoundingClientRect() ?? null;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    updateFromPointer(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    rectRef.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); applySplit(splitRef.current - 2); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); applySplit(splitRef.current + 2); }
    else if (e.key === 'Home') { e.preventDefault(); applySplit(6); }
    else if (e.key === 'End') { e.preventDefault(); applySplit(94); }
  };

  return (
    <section className="f1-dashboard" id="f1-precision-dashboard">
      <div className="container">
        <div className="f1-dashboard__header">
          <p className="f1-dashboard__eyebrow">DECODE THE OPERATING MODEL</p>
          <SectionTitle as="h2" align="center">
            <span className="f1-dashboard__title-accent-red">The Bottleneck Cycle</span>
            <span> vs. </span>
            <span className="f1-dashboard__title-accent-green">F1 Precision</span>
          </SectionTitle>
          <p className="f1-dashboard__subtitle">
            Drag the center line to compare both operating modes side-by-side.
          </p>
        </div>

        <div ref={containerRef} className="f1-dashboard__split">
          <div className="f1-dashboard__pane f1-dashboard__pane--without">
            <img
              src={import.meta.env.BASE_URL + 'illustrations/without.svg'}
              alt="Bottleneck Cycle — slow, fragmented delivery"
              className="f1-dashboard__image"
              draggable={false}
            />
          </div>

          <div className="f1-dashboard__pane f1-dashboard__pane--with">
            <img
              src={import.meta.env.BASE_URL + 'illustrations/with.svg'}
              alt="F1 Precision — agentic orchestration active"
              className="f1-dashboard__image"
              draggable={false}
            />
          </div>

          <div className="f1-dashboard__divider" aria-hidden="true" />

          <div
            ref={handleRef}
            className="f1-dashboard__handle-wrapper"
            role="slider"
            tabIndex={0}
            aria-label="Reveal Bottleneck Cycle vs F1 Precision"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={50}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
          >
            <div className="f1-dashboard__handle">
              <ChevronSplitIcon />
              <span className="f1-dashboard__handle-label">DECODE_OPERATING_MODEL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default F1PrecisionDashboard;
