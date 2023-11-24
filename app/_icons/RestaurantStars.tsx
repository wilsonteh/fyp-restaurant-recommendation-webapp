import StarIcon from "./star";
import StarHalfStrokeIcon from "./star-half-stroke";
import StarOutlineIcon from "./star-outline";

const RestaurantStars = ({ NthStar }: { NthStar: number }) => {

  let outlinedStar = 5 - NthStar;

  return (
    <div className="flex items-center gap-1">
      { new Array(NthStar-1).fill(0).map((_, i) => (
        <StarIcon key={i} size={20} className="text-orange-400" />
      ))}

      <StarHalfStrokeIcon size={20} className="text-orange-400" />
      
      { new Array(outlinedStar).fill(0).map((_, i) => (
        <StarOutlineIcon key={i} size={20} className="text-orange-400" />
      ))}
    </div>
  );
}
 
export default RestaurantStars;