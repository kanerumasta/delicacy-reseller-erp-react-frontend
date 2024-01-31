
import React from 'react'
import PropTypes from 'prop-types'



export const Row = ({x, y,width,height,bg,className,children}) => {

	const style = {
		'background' : bg || 'transparent',
		'width' : width ||'100%',
		'height' : height ||'auto',
		'display' : 'flex',
		'justifyContent' : x || 'center',
		'alignItems' : y || 'center'
	}

	return (
		<div className={className} style={style}>
			{children}
		</div>
	)

}

export const Column = ({x, y, width,height,bg, children}) => {

	const style = {
		'background' : bg || 'transparent',
		'height' : height ||'auto',
		'width' : width ||'100%',
		'display' : 'flex',
		'flexDirection' : 'column',
		'justifyContent' : y || 'center',
		'alignItems' : x || 'center'
	}

	return (
		<div className={'column'} style={style}>
			{children}
		</div>
	)
}

Row.propTypes = {
	x : PropTypes.string,
	y : PropTypes.string,
	width : PropTypes.string,
	height : PropTypes.string,
	bg : PropTypes.string,
	children : PropTypes.node
}

Column.propTypes = {
	x : PropTypes.string,
	y : PropTypes.string,
	width : PropTypes.string,
	height : PropTypes.string,
	bg : PropTypes.string,
	children : PropTypes.node
}


