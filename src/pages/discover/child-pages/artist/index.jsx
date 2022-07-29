import React, { memo } from 'react'

function JMArtist() {
  return (
    <div className="w980" style={{height: '1200px', border: 'solid 1px #d3d3d3'}}>
      <h2>Artist</h2>
    </div>
  )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(JMArtist, arePropsEqual)