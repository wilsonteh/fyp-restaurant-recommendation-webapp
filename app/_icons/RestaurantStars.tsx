import Star from "./star";
import StarHalfStroke from "./star-half-stroke";
import StarOutline from "./star-outline";

const RestaurantStars = ({ NthStar }: { NthStar: number }) => {

  let outlinedStar = 5 - NthStar;

  return (
    <div className="flex items-center gap-1">
      { new Array(NthStar-1).fill(0).map((_, i) => (
        <Star key={i} fill="orange" />
      ))}

      <StarHalfStroke fill="orange" />
      
      { new Array(outlinedStar).fill(0).map((_, i) => (
        <StarOutline key={i} fill="orange" />
      ))}
    </div>
  );
}
 
export default RestaurantStars;