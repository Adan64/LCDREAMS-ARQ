import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface ComparisonFeature {
  name: string;
  basic: boolean;
  standard: boolean;
  premium: boolean;
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
}

const ComparisonTable = ({ features }: ComparisonTableProps) => {
  const t = useTranslations('Services.comparison.table');

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left font-body text-sm font-body-semibold text-secondary uppercase tracking-wide border-b border-white/10 w-1/4">
              {t('headers.features')}
            </th>
            <th className="p-4 text-center font-body text-sm font-body-semibold text-lcdream-white uppercase tracking-wide border-b border-white/10 w-1/4 bg-white/5">
              {t('headers.basic')}
            </th>
            <th className="p-4 text-center font-body text-sm font-body-semibold text-lcdream-gold uppercase tracking-wide border-b border-lcdream-gold/30 w-1/4 bg-lcdream-gold/10">
              {t('headers.standard')}
            </th>
            <th className="p-4 text-center font-body text-sm font-body-semibold text-lcdream-white uppercase tracking-wide border-b border-white/10 w-1/4 bg-white/5">
              {t('headers.premium')}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="hover:bg-white/5 transition-colors">
              <td className="p-4 border-b border-white/10 font-body text-sm font-body-regular text-lcdream-gray-light">
                {feature.name}
              </td>
              <td className="p-4 border-b border-white/10 text-center bg-white/5">
                {feature.basic ? (
                  <Icon name="CheckIcon" size={20} className="text-lcdream-white mx-auto" />
                ) : (
                  <span className="text-white/20">-</span>
                )}
              </td>
              <td className="p-4 border-b border-lcdream-gold/10 text-center bg-lcdream-gold/5">
                {feature.standard ? (
                  <Icon name="CheckIcon" size={20} className="text-lcdream-gold mx-auto" />
                ) : (
                  <span className="text-white/20">-</span>
                )}
              </td>
              <td className="p-4 border-b border-white/10 text-center bg-white/5">
                {feature.premium ? (
                  <Icon name="CheckIcon" size={20} className="text-lcdream-white mx-auto" />
                ) : (
                  <span className="text-white/20">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;