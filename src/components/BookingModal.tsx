import React, { useEffect, useState } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingDetails: {
        movieName: string;
        poster: string;
        showtimeDate: string;
        showtimeTime: string;
        screen: number;
        seatNumbers: number[];
        duration: number;
    };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, bookingDetails }) => {
    const [show, setShow] = useState(false);
    const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-10');

    console.log("Booking details: ", bookingDetails);
    useEffect(() => {
        let animationTimeout: NodeJS.Timeout;
        
        if (isOpen) {
            setShow(true);
            // Delay the animation start slightly for a smoother appearance
            animationTimeout = setTimeout(() => {
                setAnimationClass('opacity-100 translate-y-0');
            }, 10);
        } else {
            setAnimationClass('opacity-0 translate-y-10');
            // Keep modal in DOM during exit animation
            animationTimeout = setTimeout(() => {
                setShow(false);
            }, 500); // Match this with the transition duration
        }
        
        return () => clearTimeout(animationTimeout);
    }, [isOpen]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
            {/* Backdrop overlay with fade transition */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out ${
                    isOpen ? 'bg-opacity-75' : 'bg-opacity-0'
                }`} 
                onClick={onClose}
            />

            {/* Modal Content with floating transition */}
            <div
                className={`relative bg-white dark:bg-gray-900 rounded-lg max-w-md w-full mx-auto shadow-xl transform transition-all duration-500 ease-out ${animationClass}`}
            >
                {/* Success Icon with bounce animation */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="rounded-full bg-green-500 p-4 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="px-6 pt-16 pb-6">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Booking Successful!</h2>

                    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                        {/* Poster with slight hover effect */}
                        <div className="sm:w-1/3 transition-transform duration-300 hover:scale-105">
                            <img src={bookingDetails.poster} alt={bookingDetails.movieName} className="w-full h-auto rounded-lg shadow-md object-cover" />
                        </div>

                        {/* Details */}
                        <div className="sm:w-2/3 space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{bookingDetails.movieName}</h3>

                            <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                <InfoRow icon="calendar" text={bookingDetails.showtimeDate} />
                                <InfoRow icon="clock" text={bookingDetails.showtimeTime} />
                                <InfoRow icon="screen" text={`Screen ${bookingDetails.screen}`} />
                                <InfoRow icon="seat" text={`Seat Number: ${bookingDetails.seatNumbers.join(', ')}`} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 text-center text-gray-700 dark:text-gray-300">
                        <p>Your e-ticket has been sent to your email address.</p>
                        <p className="text-sm">Please arrive 15 minutes before showtime.</p>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, text }: { icon: string; text: string }) => {
    const icons: Record<string, string> = {
        calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        screen: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        seat: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    };

    return (
        <div className="flex items-start transition-all duration-300 ease-in-out hover:translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[icon]} />
            </svg>
            <span>{text}</span>
        </div>
    );
};

export default BookingModal;
