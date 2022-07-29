import React, { memo } from 'react'

function JMSong() {
    return (
        <div className="w980" style={{ height: '1200px', border: 'solid 1px #d3d3d3' }}>
            JMSong
        </div>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(JMSong, arePropsEqual)