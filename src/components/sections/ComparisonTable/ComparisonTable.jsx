import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import {
  COMPARISON_GROUPS,
  PLAN_NAMES,
  PRICING_TIERS,
} from '../../../constants/pricing.js';
import './ComparisonTable.css';

const HIGHLIGHTED_PLAN = PRICING_TIERS.findIndex((tier) => tier.highlighted);

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 5 5 9-11" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 12h10" />
    </svg>
  );
}

function renderValue(value) {
  if (value === true) {
    return (
      <span className="comparison__cell-icon comparison__cell-icon--check">
        <CheckIcon />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="comparison__cell-icon comparison__cell-icon--dash">
        <DashIcon />
      </span>
    );
  }
  return <span className="comparison__cell-text">{value}</span>;
}

function ComparisonTable() {
  const { t } = useTranslation('pricing');
  const groupTexts = t('comparison.groups', { returnObjects: true });

  const groups = COMPARISON_GROUPS.map((group, gi) => {
    const text = groupTexts[gi] || {};
    return {
      title: text.title || group.title,
      rows: group.rows.map((row, ri) => ({
        label: (text.rows && text.rows[ri]) || row.label,
        values: row.values,
      })),
    };
  });

  return (
    <section className="comparison" id="pricing-compare">
      <div className="container">
        <div className="comparison__header">
          <p className="comparison__eyebrow">{t('comparison.eyebrow')}</p>
          <SectionTitle as="h2" align="center">
            <span>{t('comparison.title1')}</span>
            <span className="comparison__title-highlight">{t('comparison.titleHighlight')}</span>
            <span>{t('comparison.title2')}</span>
          </SectionTitle>
          <p className="comparison__subtitle">
            {t('comparison.subtitle')}
          </p>
        </div>

        <div className="comparison__table-wrapper">
          <table className="comparison__table">
            <thead>
              <tr className="comparison__row comparison__row--head">
                <th className="comparison__cell comparison__cell--label" scope="col">
                  <span className="comparison__plan-heading">{t('comparison.featuresHeading')}</span>
                </th>
                {PLAN_NAMES.map((name, idx) => (
                  <th
                    key={name}
                    scope="col"
                    className={`comparison__cell comparison__cell--plan${
                      idx === HIGHLIGHTED_PLAN ? ' comparison__cell--highlighted' : ''
                    }`}
                  >
                    <span className="comparison__plan-name">{name}</span>
                    {idx === HIGHLIGHTED_PLAN && (
                      <span className="comparison__plan-badge">{t('comparison.mostPopular')}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {groups.map((group) => (
                <Fragment key={group.title}>
                  <tr className="comparison__row comparison__row--group">
                    <th
                      colSpan={PLAN_NAMES.length + 1}
                      scope="colgroup"
                      className="comparison__group-title"
                    >
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="comparison__row">
                      <th scope="row" className="comparison__cell comparison__cell--label">
                        {row.label}
                      </th>
                      {row.values.map((value, idx) => (
                        <td
                          key={`${row.label}-${idx}`}
                          className={`comparison__cell${
                            idx === HIGHLIGHTED_PLAN ? ' comparison__cell--highlighted' : ''
                          }`}
                        >
                          {renderValue(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ComparisonTable;
