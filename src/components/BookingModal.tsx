import React from 'react';

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
    };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, bookingDetails }) => {
    if (!isOpen) return null;
    console.log("BookingModal received bookingDetails:", bookingDetails);


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Booking Successful!</h2>
                <img src={bookingDetails.poster} alt={bookingDetails.movieName} />
                <p><strong>Movie:</strong> {bookingDetails.movieName}</p>
                <p><strong>Showtime:</strong> {bookingDetails.showtimeDate} at {bookingDetails.showtimeTime}</p>
                <p><strong>Screen:</strong> {bookingDetails.screen}</p>
                <p><strong>Seats:</strong> {bookingDetails.seatNumbers.join(', ')}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BookingModal;