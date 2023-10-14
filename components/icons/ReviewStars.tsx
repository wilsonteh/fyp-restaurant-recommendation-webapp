import Star from "./star";
import StarOutline from "./star-outline";

const ReviewStars = ({ Nstar }: { Nstar: number }) => {

  let outlinedStar = 5 - Nstar;

  return (
    <div className="flex items-center gap-1">
      { new Array(Nstar).fill(0).map((_, i) => (
        <Star key={i} fill="orange" />
      ))}

      { new Array(outlinedStar).fill(0).map((_, i) => (
        <StarOutline key={i} fill="orange" />
      ))}
    </div>
  );
}
 
export default ReviewStars;