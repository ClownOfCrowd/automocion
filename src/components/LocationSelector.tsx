import React from 'react';
import { Location, locations } from '../data/locations';

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
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-premium-silver mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-premium-black dark:text-white shadow-sm py-3 px-4 text-base ${className}`}
      >
        <option value="">{placeholder}</option>
        <optgroup label="Aeropuertos">
          {locations
            .filter(location => location.isAirport)
            .map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
        </optgroup>
        <optgroup label="Ciudades">
          {locations
            .filter(location => !location.isAirport)
            .map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
        </optgroup>
      </select>
    </div>
  );
};

export default LocationSelector; 