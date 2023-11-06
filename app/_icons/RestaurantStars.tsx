import Star from "./star";
import StarHalfStroke from "./star-half-stroke";
import StarOutline from "./star-outline";

const RestaurantStars = ({ NthStar }: { NthStar: number }) => {

  let outlinedStar = 5 - NthStar;

  return (
    <div className="flex items-center gap-1">
      { new Array(NthStar-1).fill(0).map((_, i) => (
        <Star key={i} size={20} className="text-orange-400" />
      ))}

      <StarHalfStroke size={20} className="text-orange-400" />
      
      { new Array(outlinedStar).fill(0).map((_, i) => (
        <StarOutline key={i} size={20} className="text-orange-400" />
      ))}
    </div>
  );
}
 
export default RestaurantStars;