'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import '@/app/datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useArticles } from '@/hooks/useArticles';
import { FiCalendar, FiX } from 'react-icons/fi';

const DatePicker = () => {
	const { selectedDate, setSelectedDate } = useArticles();
	const [isOpen, setIsOpen] = useState(false);

	const handleDayClick = (date: Date | undefined) => {
		setSelectedDate(date);
		setIsOpen(false);
	};

	const clearDate = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedDate(undefined);
	};

	return (
		<div className="relative w-full">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between px-4 py-2 text-left bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600">
				<div className="flex items-center">
					<FiCalendar className="mr-2" />
					<span>{selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Select a date'}</span>
				</div>
				{selectedDate && (
					<div
						onClick={clearDate}
						className="p-1 rounded-full hover:bg-neutral-700">
						<FiX size={16} />
					</div>
				)}
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="mt-2 origin-top absolute w-full z-10"
						style={{ overflow: 'hidden' }}>
						<DayPicker
							mode="single"
							selected={selectedDate}
							onSelect={handleDayClick}
							initialFocus
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default DatePicker;
