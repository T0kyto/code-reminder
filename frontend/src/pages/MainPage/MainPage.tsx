import React, {useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { eraseUser } from '../../redux/userSlice'
import { useAddReminderMutation, useGetRemindersQuery } from '../../redux/remindersApi'
import { Navigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import reminderCard from '../../components/ReminderCard'
import ReminderCard from '../../components/ReminderCard'
import classes from './MainPage.module.sass'
import Sorter from '../../components/controls/Sorter/Sorter'
import Filter from '../../components/controls/Filter/Filter'

export type checkboxValues = {label: string, checked: boolean}[]

const MainPage = () => {
	
	const user = useAppSelector(store => store.user)
	const dispatch = useAppDispatch()

	const {data = []} = useGetRemindersQuery(user.uid ? user.uid : '')
	const [addReminder, {}] = useAddReminderMutation()

	const sorterOptions = ['Newest', 'Oldest']
	const [sorterValue, setSorterValue] = useState<string>('Newest')

	const [languageFlags, setLangageFlags] = useState<checkboxValues>([
		{label: "Python", checked: true},
		{label: "C++", checked: true},
		{label: "JavaScript", checked: true},
		{label: "Java", checked: true},
		{label: "C#", checked: true}
	])
	const [markFlags, setMarkFlags] = useState<checkboxValues>([
		{label: "Algorithms", checked: true},
		{label: "Web", checked: true},
		{label: "Data Science", checked: true},
		{label: "Backend", checked: true},
		{label: "Frontend", checked: true},
		{label: "Databases", checked: true}
	])
	

	const [searchQuery, setSearchQuery] = useState<string>('')

	const handleLogOut = () => {
		dispatch(eraseUser())
	}

	// const handleAddClick = async () => {
	

	// 	const data = new FormData()
	// 	data.append('id', nanoid())
	// 	data.append('uid', user.uid ? user.uid : '')
	// 	data.append('label', label)
	// 	data.append('marks', marks)
	// 	data.append('code', code)
	// 	data.append('language', language)
	// 	data.append('time', new Date().getTime().toString())
	// 	await addReminder(data).unwrap()
	// 	.then(res => console.log(res))
	// }

	const handleLanguageChange = (label: string) => {
		setLangageFlags(languageFlags.map(elem => {
			return elem.label === label 
			? {label: elem.label, checked: !elem.checked}
			: elem
		}))
		console.log(languageFlags)
	}
	const handleMarksChange = (label: string) => {
		setMarkFlags(markFlags.map(elem => {
			return elem.label === label 
			? {label: elem.label, checked: !elem.checked}
			: elem
		}))
	}

  return (

		user.username ? 
			<div className={classes.mainPage}>
				<div className={classes.sortingFiltering}>
					<Sorter 
					label='Sort' 
					sorterOptions={sorterOptions}
					setValue={setSorterValue}
					value={sorterValue}
					/>
					<Filter 
					label='Languages' 
					onChange={handleLanguageChange}
					value={languageFlags}
					/>
					<Filter
					label='Marks'
					onChange={handleMarksChange}
					value={markFlags}
					/>

				</div>
				<div className={classes.remindersArea}>
					<button onClick={() => {}}>Add reminder</button>
					<div className={classes.searchControls}>
						<input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
						<button onClick={() => {}}>Search</button>
					</div>
					<div className={classes.remindersList}>
						{data.map(elem =>  <ReminderCard reminder={elem}/>)}
					</div>
				</div>

			</div>
		 : <Navigate to='login'/>

  )
}

export default MainPage