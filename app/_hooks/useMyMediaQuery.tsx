import { useMediaQuery } from "usehooks-ts";

export default function useMyMediaQuery() {

  const xxlScreen =  useMediaQuery('(min-width: 1200px)');
  const xlScreen =  useMediaQuery('(min-width: 992px) and (max-width: 1200px)');
  const lgScreen =  useMediaQuery('(min-width: 768px) and (max-width: 992px)');
  const mdScreen =  useMediaQuery('(min-width: 576px) and (max-width: 768px)');
  const smScreen =  useMediaQuery('(min-width: 420px) and (max-width: 576px)');
  const xsScreen =  useMediaQuery('(min-width: 300px) and (max-width: 420px)');
  
  return { xxlScreen, xlScreen, lgScreen, mdScreen, smScreen, xsScreen };
}