import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className="tooltip-container">
      <div 
        className="tooltip-target" 
        onMouseEnter={showTooltip} 
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      {visible && <div className="tooltip-box">{text}</div>}
    </div>
  );
};

export default Tooltip;
