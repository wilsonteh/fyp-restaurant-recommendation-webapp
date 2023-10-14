import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  
}
 
const ReviewList = () => {
  return (
    <div className="">
      <h1>Reviews (1,464)</h1>
      
      {/* Dropdown filter */}

      <ReviewItem />
    </div>
  );
}
 
export default ReviewList;