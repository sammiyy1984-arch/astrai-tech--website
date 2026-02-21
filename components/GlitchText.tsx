import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'div';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Tag = 'span', className = '' }) => {
  return (
    <Tag 
      className={`relative inline-block glitch-hover cursor-default ${className}`} 
      data-text={text}
    >
      {text}
    </Tag>
  );
};

export default GlitchText;