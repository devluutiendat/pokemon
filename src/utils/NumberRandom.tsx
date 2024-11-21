export const handleRandom = ({
  max,
  radomnumber,
}: {
  max: number;
  radomnumber: number[];
}) => {
  const newRandoms: Set<number> = new Set(radomnumber);

  while (newRandoms.size < max) {
    let numberRadom = Math.floor(Math.random() * 1025) + 1;
    newRandoms.add(numberRadom);
  }

  const randomArray = Array.from(newRandoms).slice(radomnumber.length);
  return randomArray;
};
