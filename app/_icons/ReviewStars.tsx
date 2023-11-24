import StarIcon from "./star";
import StarOutlineIcon from "./star-outline";

const ReviewStars = ({ 
  Nstar 
} : { 
  Nstar: number 
}) => {

  let outlinedStar = 5 - Nstar;

  return (
    <div className="flex items-center gap-1">
      { new Array(Nstar).fill(0).map((_, i) => (
        <StarIcon key={i} size={20} className="text-orange-500" />
      ))}

      { new Array(outlinedStar).fill(0).map((_, i) => (
        <StarOutlineIcon key={i} size={20} className="text-orange-500" />
      ))}
    </div>
  );
}
 
export default ReviewStars;