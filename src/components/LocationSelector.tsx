import { Location, locations } from '../data/locations';
import { useTranslation } from 'react-i18next';

interface LocationSelectorProps {
  value: string;
  onChange: (locationId: string) => void;
  className?: string;
  label?: string;
  placeholder?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  value, 
  onChange, 
  className = '', 
  label,
  placeholder = 'Seleccionar ubicación'
}) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-premium-silver mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-premium-black dark:text-white shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm"
      >
        <option value="">{placeholder}</option>
        <option value="Vila-seca">{t('booking.locationOptions.Vila-seca')}</option>
        <option value="Tarragona">{t('booking.locationOptions.Tarragona')}</option>
        <option value="Reus">{t('booking.locationOptions.Reus')}</option>
        <option value="Salou">{t('booking.locationOptions.Salou')}</option>
        <option value="La Pineda">{t('booking.locationOptions.La Pineda')}</option>
        <option value="Cambrils">{t('booking.locationOptions.Cambrils')}</option>
      </select>
    </div>
  );
};

export default LocationSelector; 