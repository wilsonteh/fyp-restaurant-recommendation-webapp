import { useMediaQuery } from "usehooks-ts";

export default function useMyMediaQuery() {

  const xlScreenAbv =  useMediaQuery('(min-width: 1200px)');
  const lgScreenAbv =  useMediaQuery('(min-width: 992px)');
  const mdScreenAbv =  useMediaQuery('(min-width: 768px)');
  const smScreenAbv =  useMediaQuery('(min-width: 576px)');
  const xsScreenAbv =  useMediaQuery('(min-width: 420px)');
  const xxsScreenAbv =  useMediaQuery('(min-width: 300px)');
  
  return { xlScreenAbv, lgScreenAbv, mdScreenAbv, smScreenAbv, xsScreenAbv, xxsScreenAbv };
}