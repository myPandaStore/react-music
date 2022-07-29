import React, { memo } from 'react'

function JMDjradio() {
  return (
    <div className="w980" style={{height: '1200px', border: 'solid 1px #d3d3d3'}}>
      JMDjradio
    </div>
  )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(JMDjradio, arePropsEqual)