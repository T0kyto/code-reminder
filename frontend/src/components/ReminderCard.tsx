import React, { FC } from 'react'
import { Reminder } from '../redux/remindersApi'
import classes from './ReminderCard.module.sass'
import {getTimeLabel} from '../utils/timeUtils'

interface reminderCardProps{
	reminder: Reminder
}

const ReminderCard: FC<reminderCardProps> = ({ reminder }) => {
  return (
	<div className={classes.reminderCard}>
		<h1>{reminder.label}</h1>
		<textarea value={reminder.code}></textarea>
		<p>{reminder.marks}</p>
		<div className={classes.infoLine}>
			<p>{getTimeLabel(parseInt(reminder.time))}</p>
			<p>{reminder.language}</p>
		</div>
	</div>
  )
}

export default ReminderCard