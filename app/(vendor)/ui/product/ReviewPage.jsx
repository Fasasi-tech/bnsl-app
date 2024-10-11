import React from 'react'
import { FaStar } from "react-icons/fa";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const ReviewPage = ({reviews}) => {
    const formatDate = (dateString) => {
        const options = {
          month: 'short',    // "Jun"
          day: 'numeric',    // "24"
          year: 'numeric',   // "2024"
          hour: 'numeric',   // "4"
          minute: 'numeric', // "51"
          hour12: true       // "PM"
        };
      
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
      };


  return (
    <div className='mt-4 '>
       
        {
            reviews.length > 0 ? (reviews.map((review,i) => (
                <div key={i} className='border-b-2 pb-2 mb-4'>
                   
                    <p className='flex justify-start gap-2 text-yellow-400'>  {review.ratings > 0 &&
                            [...Array(review.ratings)].map((_, index) => (
                            <FaStar key={index} />
                            ))}
                    </p>
                    <p className='mt-4 text-md font-semibold'>{review.review}</p>
                    <p className='text-gray-400 text-sm'>{formatDate(review.createdAt)}</p>
                    <div className='flex items-center gap-2 justify-start mt-4'>
                        <Avatar>
                            <AvatarImage src={review.user?.image?.url} alt='user-image' />
                            <AvatarFallback>{`${review.user?.firstName?.toUpperCase().slice(0,1)}${review.user?.lastName?.toUpperCase().slice(0,1)}`}</AvatarFallback>
                        </Avatar>
                        <p className='text-sm font-semibold'>{review.user.firstName}{' '}{review.user.lastName}</p>
                    </div>
                </div>
                
            ))):<p>No reviews yet</p>
        }
    </div>
  )
}

export default ReviewPage