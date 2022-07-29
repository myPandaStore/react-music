import React, { memo } from 'react'

function JMAlbum() {
    return (
        <div className="w980" style={{ height: '1200px', border: 'solid 1px #d3d3d3' }}>
            <h2>Album</h2>
        </div>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(JMAlbum, arePropsEqual)