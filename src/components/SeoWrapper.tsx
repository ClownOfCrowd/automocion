import React from 'react';
import { SEOHead } from './SEO/SEOHead';

interface SeoWrapperProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SeoWrapper: React.FC<SeoWrapperProps> = ({ title, description, keywords }) => {
  return (
    <SEOHead 
      title={title}
      description={description}
      keywords={keywords}
    />
  );
};

export default SeoWrapper; 