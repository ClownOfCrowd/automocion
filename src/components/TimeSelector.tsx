interface TimeSelectorProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
  label?: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ value, onChange, className = '', label }) => {
  // Генерируем временные интервалы с 9:00 до 19:00 с шагом 30 минут
  const generateTimeOptions = () => {
    const options = [];
    // Начинаем с 9 утра и заканчиваем в 19:00
    for (let hour = 9; hour <= 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Пропускаем 19:30, так как последнее время должно быть 19:00
        if (hour === 19 && minute > 0) continue;
        
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        options.push(`${h}:${m}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

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
        <option value="">--:--</option>
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelector; 