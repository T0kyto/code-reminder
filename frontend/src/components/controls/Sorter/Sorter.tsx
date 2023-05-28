import React, { FC } from 'react'
import classes from './Sorter.module.sass'

interface sorterProps{
	label: string
	sorterOptions: string[]
	setValue: (value: string) => void
	value: string
}

const Sorter:FC<sorterProps> = ({label, sorterOptions, setValue, value}) => {
  return (
	<div className={classes.sorter}>
		<h1>{label}</h1>

		<div className={classes.options}>
			{sorterOptions.map(option => 
			<div className={option}>
				<input
				type='radio'
				className={classes.radio}
				checked={option === value}
				value={option}
				onChange={(event) => setValue(event.target.value)}
				key={option}
				id={option}
				/>
				<label htmlFor={option}>{option}</label>
			</div>)}
		</div>
	</div>
  )
}

export default Sorter