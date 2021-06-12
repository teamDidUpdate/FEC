import React from 'react';

const Feature = (props) => {
  return (
    <div>
      {props.features &&
          <div className="feature-container">
            {props.features.map((f) => <div key={f.feature}> ✓&nbsp; {f.value}</div>)}
          </div>
      }
    </div>
  );
};

export default Feature;